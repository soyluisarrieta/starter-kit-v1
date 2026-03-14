#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getLocalIP } from './get-local-ip.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', '.env');

function updateEnvFile() {
    const localIP = getLocalIP();
    let envContent = fs.readFileSync(envPath, 'utf-8');

    // Update APP_HOST with detected IP
    envContent = envContent.replace(/APP_HOST=.+/, `APP_HOST=${localIP}`);

    fs.writeFileSync(envPath, envContent, 'utf-8');
    console.log(`✓ Configured for LAN access at http://${localIP}:8000`);
}

updateEnvFile();
