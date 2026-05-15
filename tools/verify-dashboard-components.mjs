import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

const checks = [
  {
    name: 'launch icon asset exists',
    pass: () => existsSync(join(root, 'public', 'aether-launch-icon.svg')),
  },
  {
    name: 'web app manifest exists',
    pass: () => existsSync(join(root, 'public', 'manifest.webmanifest')),
  },
  {
    name: 'index wires favicon and manifest',
    pass: () => {
      const html = readFileSync(join(root, 'index.html'), 'utf8');
      return html.includes('/aether-launch-icon.svg') && html.includes('/manifest.webmanifest');
    },
  },
  {
    name: 'production build emits CSS',
    pass: () => readdirSync(join(root, 'dist', 'assets')).some((file) => file.endsWith('.css')),
  },
  {
    name: 'production build includes launch metadata',
    pass: () => {
      const html = readFileSync(join(root, 'dist', 'index.html'), 'utf8');
      return html.includes('aether-launch-icon.svg') && html.includes('manifest.webmanifest');
    },
  },
  {
    name: 'dashboard renders the launch icon',
    pass: () => readFileSync(join(root, 'GUI', 'AetherEngineWorldControlPanel.tsx'), 'utf8').includes('alt="Aether Engine"'),
  },
  {
    name: 'dashboard launcher exists',
    pass: () => existsSync(join(root, 'launch_dashboard.ps1')),
  },
  {
    name: 'standalone dashboard exists and is interactive',
    pass: () => {
      const source = readFileSync(join(root, 'dashboard_standalone.html'), 'utf8');
      return ['data-tab', 'data-preset', 'data-module', 'Export Planet', 'aether-launch-icon.svg'].every((token) => source.includes(token));
    },
  },
  {
    name: 'component controls expose stateful actions',
    pass: () => {
      const source = readFileSync(join(root, 'GUI', 'AetherEngineWorldControlPanel.tsx'), 'utf8');
      return [
        'setSelectedPreset',
        'handleRefresh',
        'handleExport',
        'toggleRenderModule',
        'setViewOverlayEnabled',
        'setLayersVisible',
        'setSettingsOpen',
      ].every((token) => source.includes(token));
    },
  },
];

let failed = 0;

for (const check of checks) {
  const ok = check.pass();
  console.log(`${ok ? 'PASS' : 'FAIL'} ${check.name}`);
  if (!ok) failed += 1;
}

if (failed > 0) {
  process.exitCode = 1;
}
