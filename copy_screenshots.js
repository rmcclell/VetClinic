const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\cvt10\\.gemini\\antigravity\\brain\\c38faaad-d061-4ab1-aa99-7765e2b81198';
const destDir = path.join(process.cwd(), 'docs', 'screenshots');

const mappings = {
  'client_info_light_1777515435778.png': 'client_info_light.png',
  'client_info_dark_1777515666619.png': 'client_info_dark.png',
  'edit_profile_light_1777515450736.png': 'client_edit_light.png',
  'edit_profile_dark_1777515682452.png': 'client_edit_dark.png',
  'add_message_light_1777515486313.png': 'client_messaging_add_light.png',
  'add_task_light_1777515509945.png': 'client_tasks_add_light.png',
  'add_reminder_light_1777515528526.png': 'client_reminders_add_light.png',
  'send_form_light_1777515546735.png': 'client_forms_add_light.png',
  'create_invoice_light_1777515565903.png': 'client_financial_invoice_light.png',
  'new_estimate_light_1777515594780.png': 'client_financial_estimate_light.png',
  'new_reservation_light_1777515622642.png': 'client_boarding_add_light.png'
};

Object.entries(mappings).forEach(([src, dest]) => {
  const srcPath = path.join(srcDir, src);
  const destPath = path.join(destDir, dest);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} to ${dest}`);
  } else {
    console.warn(`File not found: ${srcPath}`);
  }
});
