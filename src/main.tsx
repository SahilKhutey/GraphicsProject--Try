import React from 'react';
import ReactDOM from 'react-dom/client';
import AetherEngineWorldControlPanel from '../GUI/AetherEngineWorldControlPanel';
import './index.css';

console.log("AETHER_ENGINE: IGNITING_GUI_ROOT");

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AetherEngineWorldControlPanel />
  </React.StrictMode>
);

console.log("AETHER_ENGINE: GUI_MOUNT_SUCCESS");
