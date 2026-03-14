#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', '.env');

function setLocalhost() {
    let envContent = fs.readFileSync(envPath, 'utf-8');

    // Set APP_HOST to localhost
    envContent = envContent.replace(/APP_HOST=.+/, 'APP_HOST=localhost');

    fs.writeFileSync(envPath, envContent, 'utf-8');
    console.log('✓ Configured for localhost development');
}

setLocalhost();
