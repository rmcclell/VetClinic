const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Configurations
const BASE_URL = 'http://localhost:4200';
const CLIENT_ID = 1;
const PATIENT_ID = 1; 
const OUTPUT_DIR = path.join(process.cwd(), 'docs', 'screenshots');

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
  await page.route(url => url.pathname.includes('/clients/1') || url.pathname.includes('/clients/1'), r => r.fulfill(fulfill(MOCK_CLIENT)));
  await page.route(url => url.pathname.endsWith('/patients'), r => r.fulfill(fulfill([MOCK_PATIENT])));
  await page.route(url => url.pathname.endsWith('/clients'), r => r.fulfill(fulfill([MOCK_CLIENT])));
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
      window.localStorage.setItem('user-theme', t);
      window.localStorage.setItem('auth_token', 'mock-token');
    }, {t: theme});

    console.log(`  -> ${route.name}`);
    await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'load', timeout: 30000 });
    
    await page.evaluate((t) => {
      if (t === 'dark') {
        document.documentElement.classList.add('dark-theme', 'dark');
        document.body.classList.add('dark-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark-theme', 'dark');
        document.body.classList.remove('dark-theme', 'dark');
      }
    }, theme);

    await page.addStyleTag({ content: `*, *::before, *::after { transition: none !important; animation: none !important; }` });

    const componentMarkers = {
      'dashboard': 'app-dashboard',
      'patients': 'app-patients-page',
      'clients': 'app-clients-page',
      'settings': 'app-clinic-settings',
      'client_info': 'app-client-info',
      'tasks': 'app-tasks-page',
      'messages': 'app-messages-page',
      'invoices': 'app-invoices-page',
      'appointments': 'app-appointments-page'
    };

    const markerKey = route.name.replace(/_(add|print)$/, '');
    // Dynamically match tabs to their component tags
    let marker = componentMarkers[markerKey];
    if (!marker && markerKey.startsWith('patient_')) {
      const tabName = markerKey.replace('patient_', '');
      marker = `app-patient-${tabName.replace('_', '-')}`;
    } else if (!marker && markerKey.startsWith('client_')) {
      const tabName = markerKey.replace('client_', '');
      marker = `app-client-${tabName.replace('_', '-')}`;
    }
    marker = marker || 'body';

    const isTable = ['patients', 'clients', 'tasks', 'invoices', 'appointments'].includes(markerKey) || markerKey.startsWith('patient_') || markerKey.startsWith('client_');

    await page.waitForFunction((args) => {
      const comp = document.querySelector(args.marker);
      const spinner = document.querySelector('mat-spinner, .mat-mdc-progress-spinner, .loading-spinner');
      const isVisible = comp && (!spinner || spinner.offsetWidth === 0);
      
      // Strict content check
      let hasContent = false;
      if (comp) {
        if (args.isTable) {
          // Require at least one row in the table, or the no-data row, or a card
          hasContent = !!comp.querySelector('mat-row, tr.mat-mdc-row, tbody tr, tr.mat-mdc-no-data-row, mat-card, .grid');
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

    if (route.action) {
      await route.action(page);
      await page.waitForTimeout(1000); // Wait for dialog animation
    }

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
  const patientTabs = [
    'history', 'vaccinations', 'prescriptions', 'appointments', 
    'boarding', 'tasks', 'estimates', 'forms', 'invoices', 'labs', 'reminders'
  ];

  const routes = [
    { path: '/#/dashboard', name: 'dashboard' },
    { path: '/#/patients', name: 'patients' },
    { path: '/#/clients', name: 'clients' },
    { path: '/#/settings', name: 'settings' },
    { path: '/#/tasks', name: 'tasks' },
    { path: '/#/messages', name: 'messages' },
    { path: '/#/invoices', name: 'invoices' },
    { path: '/#/appointments', name: 'appointments' }
  ];

  for (const tab of patientTabs) {
    routes.push({ path: `/#/patients/${PATIENT_ID}/${tab}`, name: `patient_${tab}` });
    routes.push({ 
      path: `/#/patients/${PATIENT_ID}/${tab}`, 
      name: `patient_${tab}_add`,
      action: async (page) => {
        const addBtn = page.locator('button', { hasText: /Add /i });
        if (await addBtn.count() > 0) {
          await addBtn.first().click();
        } else {
          const primaryBtn = page.locator('button[color="primary"]');
          if (await primaryBtn.count() > 0) {
            await primaryBtn.first().click();
          }
        }
        await page.waitForSelector('mat-dialog-container', { state: 'visible' });
      }
    });
    routes.push({ 
      path: `/#/patients/${PATIENT_ID}/${tab}`, 
      name: `patient_${tab}_print`,
      action: async (page) => {
        await page.click('button[matTooltip="Print"]');
        await page.waitForSelector('mat-dialog-container', { state: 'visible' });
      }
    });
  }

  const clientTabsWithAdd = [
    'patients', 'financial', 'appointments', 'boarding', 
    'tasks', 'reminders', 'forms', 'messaging'
  ];

  routes.push({ path: `/#/clients/${CLIENT_ID}/info`, name: 'client_info' });

  for (const tab of clientTabsWithAdd) {
    routes.push({ path: `/#/clients/${CLIENT_ID}/${tab}`, name: `client_${tab}` });
    routes.push({ 
      path: `/#/clients/${CLIENT_ID}/${tab}`, 
      name: `client_${tab}_add`,
      action: async (page) => {
        const addBtn = page.locator('mat-tab-nav-panel button', { hasText: /Add /i });
        if (await addBtn.count() > 0) {
          await addBtn.first().click();
        } else {
          const primaryBtn = page.locator('mat-tab-nav-panel button[color="primary"]');
          if (await primaryBtn.count() > 0) {
            await primaryBtn.first().click();
          }
        }
        await page.waitForSelector('mat-dialog-container', { state: 'visible' });
      }
    });
  }

  routes.push(
    { path: '/#/settings/branding', name: 'user_settings' }
  );

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
