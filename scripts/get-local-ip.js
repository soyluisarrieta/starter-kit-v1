import os from 'os';

export function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        const ifaces = interfaces[name];
        if (!ifaces) continue;
        for (const iface of ifaces) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}
