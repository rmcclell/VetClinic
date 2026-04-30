const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:4200';
const CLIENT_ID = 2; // Michael Chen
const PATIENT_ID = 3; // Buddy
const OUTPUT_DIR = path.join(__dirname, '..', 'screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const routes = [
  { path: '/#/dashboard', name: 'dashboard' },
  { path: '/#/patients', name: 'patients' },
  { path: '/#/clients', name: 'owners' },
  { path: '/#/tasks', name: 'tasks' },
  { path: '/#/messages', name: 'messages' },
  { path: '/#/invoices', name: 'invoices' },
  { path: '/#/appointments', name: 'appointments' },
  { path: '/#/settings', name: 'settings' },
  // Patient details
  { path: `/#/patients/${PATIENT_ID}/history`, name: 'patient_history' },
  {
    path: `/#/patients/${PATIENT_ID}/vaccinations`,
    name: 'patient_vaccinations',
  },
  {
    path: `/#/patients/${PATIENT_ID}/prescriptions`,
    name: 'patient_prescriptions',
  },
  {
    path: `/#/patients/${PATIENT_ID}/appointments`,
    name: 'patient_appointments',
  },
  { path: `/#/patients/${PATIENT_ID}/boarding`, name: 'patient_boarding' },
  { path: `/#/patients/${PATIENT_ID}/tasks`, name: 'patient_tasks' },
  { path: `/#/patients/${PATIENT_ID}/invoices`, name: 'patient_invoices' },
  { path: `/#/patients/${PATIENT_ID}/forms`, name: 'patient_forms' },
  { path: `/#/patients/${PATIENT_ID}/reminders`, name: 'patient_reminders' },
  { path: `/#/patients/${PATIENT_ID}/labs`, name: 'patient_labs' },
  { path: `/#/patients/${PATIENT_ID}/estimates`, name: 'patient_estimates' },
  // Client details
  { path: `/#/clients/${CLIENT_ID}/info`, name: 'client_info' },
  { path: `/#/clients/${CLIENT_ID}/patients`, name: 'client_patients' },
  { path: `/#/clients/${CLIENT_ID}/financial`, name: 'client_financial' },
  { path: `/#/clients/${CLIENT_ID}/tasks`, name: 'client_tasks' },
  { path: `/#/clients/${CLIENT_ID}/appointments`, name: 'client_appointments' },
  { path: `/#/clients/${CLIENT_ID}/boarding`, name: 'client_boarding' },
  { path: `/#/clients/${CLIENT_ID}/reminders`, name: 'client_reminders' },
  { path: `/#/clients/${CLIENT_ID}/forms`, name: 'client_forms' },
  { path: `/#/clients/${CLIENT_ID}/messaging`, name: 'client_messaging' },
];

async function generateScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  console.log('Starting screenshot generation...');

  for (const theme of ['light', 'dark']) {
    console.log(`\nCapturing in ${theme} mode...`);

    // First, set the theme
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const isDarkMode = await page.evaluate(
      () =>
        document.documentElement.classList.contains('dark') ||
        document.documentElement.classList.contains('dark-theme'),
    );

    if (
      (theme === 'dark' && !isDarkMode) ||
      (theme === 'light' && isDarkMode)
    ) {
      console.log(`Toggling theme to ${theme}...`);
      await page.click('button[aria-label*="Switch to"]');
      await page.waitForTimeout(500); // Wait for transition
    }

    // Capture each route
    for (const route of routes) {
      console.log(`  Capturing ${route.name} (${route.path})...`);
      
      // 1. Navigate via hash change
      await page.evaluate((path) => {
        window.location.hash = path.replace('/#', '');
      }, route.path);
      
      try {
        // 2. Wait for URL to match AND all spinners to be gone
        await page.waitForFunction((targetPath) => {
          const currentHash = window.location.hash;
          const targetHash = targetPath.replace('/#', '');
          const urlMatches = currentHash.includes(targetHash);
          
          // Check for any loading indicators
          const hasSpinner = !!document.querySelector('mat-spinner, mat-progress-spinner, .mat-mdc-progress-spinner');
          
          // Check for main content markers (at least one should be present)
          const contentMarkers = ['app-dashboard', 'app-patient-details', 'app-client-details', 'app-patients-page', 'app-clients-page', 'app-clinic-settings', 'table', 'mat-card'];
          const hasContent = contentMarkers.some(sel => !!document.querySelector(sel));

          return urlMatches && !hasSpinner && hasContent;
        }, route.path, { timeout: 25000 });
        
        // 3. Final buffer for Material tab animations and data binding
        await page.waitForTimeout(4000);
      } catch (e) {
        console.warn(`    Warning: Timeout waiting for ${route.name}. Capturing as-is.`);
      }

      await page.screenshot({
        path: path.join(OUTPUT_DIR, `${route.name}_${theme}.png`),
        fullPage: false,
      });
    }

    // Special case: User Settings Dialog
    console.log(`  Capturing user_settings...`);
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    await page.click('button[aria-label="Open user settings"]');
    await page.waitForSelector('mat-dialog-container');
    await page.waitForTimeout(1000); // Increased buffer for dialog animation
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `user_settings_${theme}.png`),
      fullPage: false,
    });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
  }

  await browser.close();
  console.log('\nFinished! Screenshots saved to docs/screenshots');
}

generateScreenshots().catch((err) => {
  console.error('Error generating screenshots:', err);
  process.exit(1);
});
