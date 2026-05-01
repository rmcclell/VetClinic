const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Configurations
const BASE_URL = 'http://localhost:4200';
const CLIENT_ID = 1;
const PATIENT_ID = 1; 
const OUTPUT_DIR = path.join(process.cwd(), 'docs', 'assets', 'screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// --- RICH MOCK DATA ---
const MOCK_CONFIG = { id: 1, name: 'Springfield Vet Clinic', logoUrl: null, units: 'imperial', taxRate: 8.5, currency: 'USD' };
const MOCK_PATIENT = { id: 1, name: 'Luna', species: 'Cat', breed: 'Siamese', sex: 'Female', weight: 8.5, microchipNumber: '985112000123456', color: 'Seal Point', birthDate: '2020-05-15', clientId: 1, photoUrl: null, client: { id: 1, firstName: 'Sarah', lastName: 'Jenkins', phone: '555-0123' } };
const MOCK_CLIENT = { id: 1, firstName: 'Sarah', lastName: 'Jenkins', email: 'sarah.j@example.com', phone: '555-0123', active: true, address: '123 Maple St, Springfield', patients: [MOCK_PATIENT] };
const MOCK_HISTORY = [{ id: 1, type: 'SOAP', status: 'Locked', date: '2024-01-15', details: 'Annual Wellness Exam.', doctor: { name: 'Dr. Smith', initials: 'SS' } }];
const MOCK_VACCINATIONS = [{ id: 1, name: 'Rabies 3yr', date: '2024-01-15', dueDate: '2027-01-15', status: 'Current' }];
const MOCK_INVOICES = [{ id: 1, invoiceNumber: 'INV-1001', date: '2024-01-15', description: 'Wellness Exam', status: 'Paid', amount: 85.00, items: [] }];

async function setupMocks(page) {
  const fulfill = (d) => ({ status: 200, contentType: 'application/json', body: JSON.stringify(d) });
  await page.route('**/api/**', r => r.fulfill(fulfill([])));
  await page.route('**/api/config', r => r.fulfill(fulfill(MOCK_CONFIG)));
  await page.route(url => url.pathname.includes('/patients/1'), r => r.fulfill(fulfill(MOCK_PATIENT)));
  await page.route(url => url.pathname.includes('/clients/1') || url.pathname.includes('/owners/1'), r => r.fulfill(fulfill(MOCK_CLIENT)));
  await page.route(url => url.pathname.endsWith('/patients'), r => r.fulfill(fulfill([MOCK_PATIENT])));
  await page.route(url => url.pathname.endsWith('/clients'), r => r.fulfill(fulfill([MOCK_CLIENT])));
  await page.route(url => url.pathname.endsWith('/owners'), r => r.fulfill(fulfill([MOCK_CLIENT])));
  await page.route('**/history', r => r.fulfill(fulfill(MOCK_HISTORY)));
  await page.route('**/vaccinations', r => r.fulfill(fulfill(MOCK_VACCINATIONS)));
  await page.route('**/invoices', r => r.fulfill(fulfill(MOCK_INVOICES)));
}

async function captureRoute(browserState, route, theme) {
  if (!browserState.browser || !browserState.browser.isConnected()) {
    browserState.browser = await chromium.launch({ 
      headless: true,
      args: ['--disable-dev-shm-usage', '--no-sandbox']
    });
  }

  const context = await browserState.browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 });
  const page = await context.newPage();

  try {
    await setupMocks(page);
    page.on('console', msg => {
      if (msg.text().includes('Syncing')) console.log(`      [Browser] ${msg.text()}`);
      else if (msg.type() === 'error') console.log(`      [Browser error] ${msg.text()}`);
    });

    await page.addInitScript(({t}) => {
      window.localStorage.setItem('theme', t);
      window.localStorage.setItem('auth_token', 'mock-token');
    }, {t: theme});

    console.log(`  -> ${route.name}`);
    await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'load', timeout: 30000 });
    
    await page.evaluate((t) => {
      document.documentElement.className = t;
      document.body.className = t;
    }, theme);

    await page.addStyleTag({ content: `*, *::before, *::after { transition: none !important; animation: none !important; }` });

    const componentMarkers = {
      'dashboard': 'app-dashboard',
      'patients': 'app-patients-page',
      'owners': 'app-clients-page',
      'settings': 'app-clinic-settings',
      'patient_history': 'app-patient-history',
      'patient_vaccinations': 'app-patient-vaccinations',
      'patient_invoices': 'app-patient-invoices',
      'client_info': 'app-client-info',
      'client_patients': 'app-client-patients'
    };

    const marker = componentMarkers[route.name] || 'body';
    const isTable = ['patients', 'owners', 'patient_history', 'patient_vaccinations', 'patient_invoices', 'client_patients'].includes(route.name);

    await page.waitForFunction((args) => {
      const comp = document.querySelector(args.marker);
      const spinner = document.querySelector('mat-spinner, .mat-mdc-progress-spinner, .loading-spinner');
      const isVisible = comp && (!spinner || spinner.offsetWidth === 0);
      
      // Strict content check
      let hasContent = false;
      if (comp) {
        if (args.isTable) {
          // Require at least one row in the table
          hasContent = !!comp.querySelector('mat-row, tr.mat-mdc-row, tbody tr');
        } else {
          // General content markers
          hasContent = !!comp.querySelector('mat-card, .grid, .p-6, h1, h2');
        }
      }
      
      if (!isVisible || !hasContent) {
        console.log(`Syncing ${args.name}: Marker=${args.marker}, Visible=${!!isVisible}, Content=${hasContent}`);
      }
      return isVisible && hasContent;
    }, { marker, isTable, name: route.name }, { timeout: 15000 }).catch(() => {
      console.warn(`    Warning: Synchronization incomplete for ${route.name}.`);
    });

    await page.waitForTimeout(2000); 
    await page.mouse.move(0, 0);
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${route.name}_${theme}.png`) });

  } catch (err) {
    console.error(`    Error in ${route.name}: ${err.message}`);
  } finally {
    await context.close().catch(() => {});
  }
}

async function generateScreenshots() {
  const browserState = { browser: null };
  const routes = [
    { path: '/#/dashboard', name: 'dashboard' },
    { path: '/#/patients', name: 'patients' },
    { path: '/#/clients', name: 'owners' },
    { path: '/#/settings', name: 'settings' },
    { path: `/#/patients/${PATIENT_ID}/history`, name: 'patient_history' },
    { path: `/#/patients/${PATIENT_ID}/vaccinations`, name: 'patient_vaccinations' },
    { path: `/#/patients/${PATIENT_ID}/invoices`, name: 'patient_invoices' },
    { path: `/#/clients/${CLIENT_ID}/info`, name: 'client_info' },
    { path: `/#/clients/${CLIENT_ID}/patients`, name: 'client_patients' },
    { path: `/#/clients/${CLIENT_ID}/financial`, name: 'client_financial' },
    { path: `/#/clients/${CLIENT_ID}/messaging`, name: 'client_messaging' },
    { path: '/#/settings/branding', name: 'user_settings' },
  ];

  console.log('Starting screenshot generation (STRICT SYNC MODE)...\n');

  for (const theme of ['light', 'dark']) {
    console.log(`\nCapturing in ${theme} mode...`);
    for (const route of routes) {
      await captureRoute(browserState, route, theme);
    }
  }

  if (browserState.browser) await browserState.browser.close();
  console.log('\nScreenshot generation complete!');
}

generateScreenshots().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
