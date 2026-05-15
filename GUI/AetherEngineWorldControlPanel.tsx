import React, { useState } from 'react';

// Zero-Dependency Icon Library (Embedded SVG Paths)
const Icons = {
  Globe: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Wind: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 4c0 2.66 2 4 4 4h8"/><path d="M12 14c.3 0 2 0 2-2 0-1.5-1.5-2-3-2H3"/><path d="M8 20c.3 0 5 0 5-2 0-3-4.5-3-4.5-3H3"/></svg>,
  Cloud: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19c2.5 0 4.5-2 4.5-4.5 0-2.3-1.7-4.1-3.9-4.5A7 7 0 1 0 5 13c0 .2 0 .4.1.6A4.5 4.5 0 1 0 4 22h13.5z"/></svg>,
  Trees: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 11 1.1-1.1c.5-.5 1.3-.5 1.8 0L15 11"/><path d="m11 15 1.1-1.1c.5-.5 1.3-.5 1.8 0L15 15"/><path d="m11 19 1.1-1.1c.5-.5 1.3-.5 1.8 0L15 19"/><path d="M12 2v20"/><path d="M3 12h18"/><path d="M5 18h14"/><path d="M7 6h10"/></svg>,
  Waves: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>,
  Zap: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Activity: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Settings: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Layers: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  BarChart3: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>,
  Maximize2: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>,
  ChevronRight: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Play: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Pause: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
  RefreshCw: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l5.64 5.64A9 9 0 0 0 20.49 15"/></svg>,
  Eye: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
};

const {
  Wind,
  Cloud,
  Trees,
  Waves,
  Zap,
  Activity,
  Settings,
  Layers,
  Globe,
  BarChart3,
  Maximize2,
  ChevronRight,
  Play,
  Pause,
  RefreshCw,
  Eye,
} = Icons;

export default function AetherEngineWorldControlPanel() {
  const [activeTab, setActiveTab] = useState('World');
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState('Earth-like 01');
  const [viewOverlayEnabled, setViewOverlayEnabled] = useState(true);
  const [layersVisible, setLayersVisible] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [exportStatus, setExportStatus] = useState('Ready');
  const [lastRefresh, setLastRefresh] = useState('Not refreshed');
  const [renderModules, setRenderModules] = useState({
    SSAO: true,
    SSR: true,
    SSGI: true,
    TAA: true,
  });

  const tabs = [
    { name: 'World', icon: Globe },
    { name: 'Climate', icon: Wind },
    { name: 'Ecosystem', icon: Trees },
    { name: 'Oceans', icon: Waves },
    { name: 'Atmosphere', icon: Cloud },
    { name: 'Rendering', icon: Zap },
    { name: 'Metrics', icon: BarChart3 }
  ];
  const presets = ['Earth-like 01', 'Alien Tundra', 'Volcanic Rift', 'Tropical Archipelago'];

  const handleRefresh = () => {
    setLastRefresh(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  };

  const handleExport = () => {
    setExportStatus(`Queued: ${selectedPreset}`);
  };

  const toggleRenderModule = (moduleName: string) => {
    setRenderModules((current) => ({
      ...current,
      [moduleName]: !current[moduleName],
    }));
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-black font-sans text-zinc-100 antialiased selection:bg-indigo-500/30">
      {/* --- Sidebar Navigation --- */}
      <aside className="flex w-20 flex-col items-center border-r border-zinc-800 bg-zinc-950 py-6">
        <div className="mb-10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/20">
          <img src="/aether-launch-icon.svg" alt="Aether Engine" className="h-full w-full" />
        </div>
        
        <nav className="flex flex-1 flex-col space-y-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                aria-label={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${
                  isActive ? 'bg-zinc-800 text-indigo-400' : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300'
                }`}
              >
                {Icon ? <Icon className="h-5 w-5" /> : <div className="h-2 w-2 rounded-full bg-indigo-500" />}
                {isActive && (
                  <div className="absolute -left-0.5 h-6 w-1 rounded-full bg-indigo-500" />
                )}
                <span className="absolute left-16 z-50 origin-left scale-0 rounded-md bg-zinc-800 px-3 py-1 text-xs text-white shadow-xl transition-all group-hover:scale-100">
                  {tab.name}
                </span>
              </button>
            );
          })}
        </nav>

        <button
          aria-label={settingsOpen ? 'Close Settings' : 'Open Settings'}
          aria-pressed={settingsOpen}
          onClick={() => setSettingsOpen(!settingsOpen)}
          className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
            settingsOpen ? 'bg-zinc-800 text-indigo-400' : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300'
          }`}
        >
          <Settings className="h-5 w-5" />
        </button>
      </aside>

      {/* --- Main Workspace --- */}
      <main className="relative flex flex-1 flex-col overflow-hidden">
        {/* Header / Command Bar */}
        <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950/50 px-8 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <h1 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">Aether Engine V3.5</h1>
            <div className="h-4 w-px bg-zinc-800" />
            <span className="text-sm font-medium text-zinc-200">Session: Procedural_Planet_01</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              aria-label={isPlaying ? 'Pause Simulation' : 'Play Simulation'}
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              aria-label="Refresh Simulation"
              onClick={handleRefresh}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <div className="h-4 w-px bg-zinc-800" />
            <button onClick={handleExport} className="flex items-center space-x-2 rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all">
              <span>{exportStatus === 'Ready' ? 'Export Planet' : exportStatus}</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </header>

        {/* Viewport and Simulation Controls */}
        <div className="flex flex-1 overflow-hidden p-6">
          <div className="grid flex-1 grid-cols-12 gap-6">
            
            {/* Viewport Container */}
            <div className="group relative col-span-12 lg:col-span-8 overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent" />
              
              {/* Simulation Placeholder / Canvas */}
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex flex-col items-center space-y-4 opacity-20">
                  <Maximize2 className="h-12 w-12 text-indigo-400" />
                  <span className="text-sm font-light tracking-widest uppercase">Aether_Simulation_Stream_Active</span>
                </div>
              </div>

              {/* Viewport Overlays */}
              <div className="absolute top-6 left-6 flex items-center space-x-3">
                {viewOverlayEnabled && <div className="flex items-center space-x-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 backdrop-blur-md">
                  <Activity className="h-3 w-3 text-green-400" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Live Telemetry</span>
                </div>}
                {viewOverlayEnabled && <div className="flex items-center space-x-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 backdrop-blur-md">
                  <span className="text-[10px] font-medium text-zinc-300 uppercase">Res: 4K Native</span>
                </div>}
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-zinc-400">Position</p>
                  <p className="text-lg font-mono font-bold text-white">X: 142.4  Y: 2.1  Z: -89.4</p>
                </div>
                <div className="flex space-x-2">
                   <button
                     aria-label="Toggle View Overlay"
                     aria-pressed={viewOverlayEnabled}
                     onClick={() => setViewOverlayEnabled(!viewOverlayEnabled)}
                     className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-all ${
                       viewOverlayEnabled ? 'ring-1 ring-indigo-400/60' : 'opacity-50 hover:bg-white/10'
                     }`}
                   >
                     <Eye className="h-4 w-4" />
                   </button>
                   <button
                     aria-label="Toggle Layers"
                     aria-pressed={layersVisible}
                     onClick={() => setLayersVisible(!layersVisible)}
                     className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-all ${
                       layersVisible ? 'ring-1 ring-indigo-400/60' : 'opacity-50 hover:bg-white/10'
                     }`}
                   >
                     <Layers className="h-4 w-4" />
                   </button>
                </div>
              </div>
            </div>

            {/* Right Controls Panel */}
            <div className="col-span-12 lg:col-span-4 flex flex-col space-y-6 overflow-y-auto pr-2 custom-scrollbar">
              
              {/* Presets Card */}
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">
                 <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">World Presets</h3>
                 <div className="grid grid-cols-1 gap-2">
                   {presets.map((preset) => (
                     <button
                       key={preset}
                       aria-pressed={selectedPreset === preset}
                       onClick={() => {
                         setSelectedPreset(preset);
                         setExportStatus('Ready');
                       }}
                       className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                         selectedPreset === preset
                           ? 'border-indigo-500/70 bg-indigo-500/10 text-white'
                           : 'border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:border-indigo-500/50 hover:bg-zinc-800'
                       }`}
                     >
                        <span>{preset}</span>
                        <ChevronRight className="h-4 w-4 text-zinc-600" />
                     </button>
                   ))}
                 </div>
              </div>

              {/* Dynamic Property Inspector */}
              <div className="flex-1 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">
                 <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">{activeTab} Controls</h3>
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-zinc-800 text-zinc-400">
                      <Settings className="h-3 w-3" />
                    </div>
                 </div>

                 <div className="space-y-6">
                    {/* Placeholder Sliders */}
                    {[
                      { name: 'Global Temperature', value: 24, unit: '°C' },
                      { name: 'Atmospheric Humidity', value: 65, unit: '%' },
                      { name: 'Vegetation Density', value: 0.8, unit: '' },
                      { name: 'Erosion Intensity', value: 1.2, unit: 'm/s' }
                    ].map((param) => (
                      <div key={param.name} className="space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-zinc-400">{param.name}</span>
                          <span className="font-mono text-indigo-400">{param.value}{param.unit}</span>
                        </div>
                        <div className="relative h-1.5 w-full rounded-full bg-zinc-800">
                           <div 
                             className="absolute h-full rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50" 
                             style={{ width: `${(param.value / (param.unit === '°C' ? 50 : (param.unit === '%' ? 100 : 2))) * 100}%` }} 
                           />
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t border-zinc-800">
                       <h4 className="mb-4 text-[10px] font-bold uppercase tracking-tighter text-zinc-600">Rendering Modules</h4>
                       <div className="grid grid-cols-2 gap-2">
                          {Object.keys(renderModules).map((toggle) => (
                            <button
                              key={toggle}
                              aria-pressed={renderModules[toggle]}
                              onClick={() => toggleRenderModule(toggle)}
                              className={`flex items-center justify-between rounded-lg border px-3 py-2 text-[10px] font-bold ${
                                renderModules[toggle]
                                  ? 'border-zinc-800 bg-zinc-900/30 text-zinc-400'
                                  : 'border-red-500/30 bg-red-950/20 text-red-200'
                              }`}
                            >
                              <span>{toggle}</span>
                              <div className={`h-1.5 w-1.5 rounded-full ${renderModules[toggle] ? 'bg-green-500' : 'bg-red-400'}`} />
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-800">
                       <div className="mb-3 flex items-center justify-between">
                          <h4 className="text-[10px] font-bold uppercase tracking-tighter text-indigo-400">AI Intelligence Feed</h4>
                          <span className="text-[8px] font-mono text-indigo-500/50">SOLVER_ACTIVE</span>
                       </div>
                       <div className="space-y-2">
                          <div className="rounded-lg bg-indigo-500/5 p-3 border border-indigo-500/10">
                             <p className="text-[10px] text-indigo-300 leading-relaxed font-medium">
                                <span className="font-bold">SUGGESTION:</span> Increase moisture levels by 14% to stabilize vegetation density in Tundra biomes.
                             </p>
                          </div>
                          <div className="flex items-center justify-between px-2 text-[9px] font-mono text-zinc-500">
                             <span>ECOLOGICAL_ENTROPY</span>
                             <span className="text-zinc-300">0.024</span>
                          </div>
                          <div className="flex items-center justify-between px-2 text-[9px] font-mono text-zinc-500">
                             <span>STRUCTURAL_STABILITY</span>
                             <span className="text-green-400">OPTIMAL</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Global Footer / Status Bar --- */}
        <footer className="flex h-12 items-center justify-between border-t border-zinc-800 bg-zinc-950 px-8 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span>Simulation Stable</span>
            </div>
            <div className="h-3 w-px bg-zinc-800" />
            <div className="flex items-center space-x-4">
              <span className="text-zinc-400">FPS: <span className="text-white">144.2</span></span>
              <span className="text-zinc-400">LATENCY: <span className="text-white">0.4ms</span></span>
              <span className="text-zinc-400">REFRESH: <span className="text-white">{lastRefresh}</span></span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <span>Terrain Chunks: <span className="text-zinc-200">128 Active</span></span>
            <span>Instances: <span className="text-zinc-200">12.4M</span></span>
            <span>Preset: <span className="text-zinc-200">{selectedPreset}</span></span>
            <span>Layers: <span className="text-zinc-200">{layersVisible ? 'Visible' : 'Hidden'}</span></span>
            {settingsOpen && <span>Settings: <span className="text-zinc-200">Open</span></span>}
            <div className="h-3 w-px bg-zinc-800" />
            <span className="text-indigo-400">Antigravity_Engine_AI_Active</span>
          </div>
        </footer>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
      `}} />
    </div>
  );
}
