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
  
  // State for dynamic parameters
  const [worldParams, setWorldParams] = useState({
    'Planet Radius': 6371,
    'Surface Gravity': 9.8,
    'Rotation Period': 24,
    'Axial Tilt': 23.5,
  });

  const [climateParams, setClimateParams] = useState({
    'Global Temp': 15,
    'Humidity': 65,
    'Wind Intensity': 12,
    'Pressure': 101.3,
  });

  const [ecosystemParams, setEcosystemParams] = useState({
    'Veg Density': 0.72,
    'Biome Diversity': 0.85,
    'Soil Moisture': 0.6,
    'Fauna Activity': 0.4,
  });

  const [renderModules, setRenderModules] = useState({
    SSAO: true,
    SSR: true,
    SSGI: true,
    TAA: true,
    FSR3: false,
    DLSS: false,
  });

  const tabs = [
    { name: 'World', icon: Globe, params: worldParams, setter: setWorldParams, limits: { 'Planet Radius': 12000, 'Surface Gravity': 25, 'Rotation Period': 100, 'Axial Tilt': 90 } },
    { name: 'Climate', icon: Wind, params: climateParams, setter: setClimateParams, limits: { 'Global Temp': 50, 'Humidity': 100, 'Wind Intensity': 100, 'Pressure': 200 } },
    { name: 'Ecosystem', icon: Trees, params: ecosystemParams, setter: setEcosystemParams, limits: { 'Veg Density': 1, 'Biome Diversity': 1, 'Soil Moisture': 1, 'Fauna Activity': 1 } },
    { name: 'Oceans', icon: Waves, params: { 'Wave Height': 1.2, 'Tide Level': 0.4, 'Salinity': 35, 'Clarity': 0.9 }, limits: { 'Wave Height': 10, 'Tide Level': 5, 'Salinity': 50, 'Clarity': 1 } },
    { name: 'Atmosphere', icon: Cloud, params: { 'Cloud Cover': 0.45, 'Ozone Density': 0.6, 'Rayleigh': 1.0, 'Mie': 1.0 }, limits: { 'Cloud Cover': 1, 'Ozone Density': 1, 'Rayleigh': 5, 'Mie': 5 } },
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

  const updateParam = (tabName: string, key: string, value: number) => {
    const tab = tabs.find(t => t.name === tabName);
    if (tab && tab.setter) {
      tab.setter(prev => ({ ...prev, [key]: value }));
    }
  };

  const currentTab = tabs.find(t => t.name === activeTab) || tabs[0];

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
            <h1 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">Aether Engine V3.6</h1>
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
              {/* Dynamic Viewport Background */}
              <div className="absolute inset-0 bg-[#020205]">
                <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 50%, #4f46e5 0%, transparent 70%)' }} />
                <div className="cyber-grid absolute inset-0 opacity-10" />
                <div className="nebula absolute inset-0 opacity-30 blur-[100px]" />
              </div>
              
              {/* Simulation Placeholder Content */}
              <div className="relative flex h-full w-full flex-col items-center justify-center text-center">
                <div className="relative mb-8">
                  <div className="absolute -inset-4 animate-pulse rounded-full bg-indigo-500/20 blur-xl" />
                  <Globe className="relative h-24 w-24 text-indigo-400 transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="max-w-md space-y-2 px-6">
                  <h2 className="text-xl font-bold tracking-tight text-white uppercase italic">Aether Simulation Engine</h2>
                  <p className="text-sm font-light text-zinc-400">Real-time Procedural Universe Generation Stream Active</p>
                  <div className="mt-4 flex items-center justify-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-300">Synchronizing Local Solver</span>
                  </div>
                </div>
              </div>

              {/* Viewport Overlays */}
              <div className="absolute top-8 left-8 flex flex-col space-y-3">
                {viewOverlayEnabled && <div className="flex items-center space-x-3 rounded-full border border-white/5 bg-black/60 px-4 py-1.5 backdrop-blur-xl">
                  <Activity className="h-3 w-3 text-green-400" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Engine Status: Optimal</span>
                </div>}
                {viewOverlayEnabled && <div className="flex items-center space-x-3 rounded-full border border-white/5 bg-black/60 px-4 py-1.5 backdrop-blur-xl">
                  <span className="text-[10px] font-medium text-zinc-300 uppercase">Buffer: 4096x2160 HDR</span>
                </div>}
              </div>

              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                <div className="space-y-2 rounded-2xl bg-black/40 p-4 backdrop-blur-md border border-white/5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Camera Coordinates</p>
                  <div className="flex space-x-6">
                    <div>
                       <span className="text-[10px] text-zinc-500 font-mono">LAT:</span>
                       <span className="ml-2 text-sm font-mono font-bold text-white">42.88N</span>
                    </div>
                    <div>
                       <span className="text-[10px] text-zinc-500 font-mono">LON:</span>
                       <span className="ml-2 text-sm font-mono font-bold text-white">12.44E</span>
                    </div>
                    <div>
                       <span className="text-[10px] text-zinc-500 font-mono">ALT:</span>
                       <span className="ml-2 text-sm font-mono font-bold text-white">12,400m</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                   <button
                     aria-label="Toggle View Overlay"
                     aria-pressed={viewOverlayEnabled}
                     onClick={() => setViewOverlayEnabled(!viewOverlayEnabled)}
                     className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-white backdrop-blur-xl transition-all hover:scale-105 active:scale-95 ${
                       viewOverlayEnabled ? 'ring-1 ring-indigo-400 shadow-lg shadow-indigo-500/20' : 'opacity-40 hover:bg-white/10'
                     }`}
                   >
                     <Eye className="h-5 w-5" />
                   </button>
                   <button
                     aria-label="Toggle Layers"
                     aria-pressed={layersVisible}
                     onClick={() => setLayersVisible(!layersVisible)}
                     className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-white backdrop-blur-xl transition-all hover:scale-105 active:scale-95 ${
                       layersVisible ? 'ring-1 ring-indigo-400 shadow-lg shadow-indigo-500/20' : 'opacity-40 hover:bg-white/10'
                     }`}
                   >
                     <Layers className="h-5 w-5" />
                   </button>
                </div>
              </div>
            </div>

            {/* Right Controls Panel */}
            <div className="col-span-12 lg:col-span-4 flex flex-col space-y-6 overflow-hidden">
              
              {/* Presets Card */}
              <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6 shadow-xl">
                 <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">World Templates</h3>
                    <RefreshCw className="h-3 w-3 text-zinc-600 hover:text-indigo-400 cursor-pointer transition-colors" />
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    {presets.map((preset) => (
                      <button
                        key={preset}
                        aria-pressed={selectedPreset === preset}
                        onClick={() => {
                          setSelectedPreset(preset);
                          setExportStatus('Ready');
                        }}
                        className={`flex flex-col items-start rounded-2xl border p-3 text-left transition-all ${
                          selectedPreset === preset
                            ? 'border-indigo-500/50 bg-indigo-500/10 text-white ring-1 ring-indigo-500/20'
                            : 'border-zinc-800/50 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/50'
                        }`}
                      >
                         <span className="mb-1 text-[10px] font-bold uppercase opacity-50 tracking-tighter">Preset</span>
                         <span className="text-xs font-semibold leading-tight">{preset}</span>
                      </button>
                    ))}
                 </div>
              </div>

              {/* Dynamic Property Inspector */}
              <div className="flex-1 flex flex-col rounded-[2rem] border border-zinc-800 bg-zinc-950 shadow-xl overflow-hidden">
                 <div className="border-b border-zinc-800 p-6 flex items-center justify-between bg-zinc-900/20">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">{activeTab} Controls</h3>
                      <p className="text-[10px] text-zinc-600 font-medium">Fine-tuning procedural primitives</p>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-zinc-500 border border-zinc-800">
                      <Settings className="h-4 w-4" />
                    </div>
                 </div>

                 <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8">
                    {activeTab === 'Rendering' ? (
                       <div className="space-y-6">
                          <h4 className="text-[10px] font-bold uppercase tracking-tighter text-zinc-600">Advanced Modules</h4>
                          <div className="grid grid-cols-2 gap-3">
                             {Object.keys(renderModules).map((toggle) => (
                               <button
                                 key={toggle}
                                 aria-pressed={renderModules[toggle as keyof typeof renderModules]}
                                 onClick={() => toggleRenderModule(toggle)}
                                 className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
                                   renderModules[toggle as keyof typeof renderModules]
                                     ? 'border-indigo-500/30 bg-indigo-500/5 text-zinc-200'
                                     : 'border-zinc-800 bg-zinc-900/30 text-zinc-500 opacity-50'
                                 }`}
                               >
                                 <span className="text-[11px] font-bold">{toggle}</span>
                                 <div className={`h-2 w-2 rounded-full transition-all ${renderModules[toggle as keyof typeof renderModules] ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-zinc-700'}`} />
                               </button>
                             ))}
                          </div>
                       </div>
                    ) : activeTab === 'Metrics' ? (
                       <div className="space-y-8">
                          <div className="grid grid-cols-2 gap-4">
                             <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4">
                                <p className="mb-1 text-[10px] font-bold text-zinc-500 uppercase">GPU Load</p>
                                <p className="text-xl font-mono font-bold text-white">42%</p>
                             </div>
                             <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4">
                                <p className="mb-1 text-[10px] font-bold text-zinc-500 uppercase">VRAM</p>
                                <p className="text-xl font-mono font-bold text-white">6.2GB</p>
                             </div>
                          </div>
                          
                          <div className="space-y-3">
                             <h4 className="text-[10px] font-bold uppercase tracking-tighter text-zinc-600">Telemetry Stream</h4>
                             <div className="space-y-2 font-mono text-[9px]">
                                {[
                                  { label: 'SIM_STEP', val: '0.016ms', status: 'OK' },
                                  { label: 'RENDER_QUEUE', val: '24ms', status: 'HIGH' },
                                  { label: 'COMPUTE_PASS', val: '4.2ms', status: 'OK' },
                                  { label: 'IO_LATENCY', val: '0.1ms', status: 'OK' }
                                ].map(row => (
                                  <div key={row.label} className="flex justify-between border-b border-zinc-800/50 pb-2">
                                     <span className="text-zinc-500">{row.label}</span>
                                     <div className="flex space-x-3">
                                        <span className="text-zinc-300">{row.val}</span>
                                        <span className={row.status === 'OK' ? 'text-green-500' : 'text-amber-500'}>[{row.status}]</span>
                                     </div>
                                  </div>
                                ))}
                             </div>
                          </div>
                       </div>
                    ) : (
                      <div className="space-y-7">
                        {Object.entries(currentTab.params || {}).map(([key, val]) => (
                          <div key={key} className="space-y-4">
                            <div className="flex justify-between items-end">
                              <div>
                                <span className="block text-[11px] font-bold text-zinc-400 uppercase tracking-tight">{key}</span>
                              </div>
                              <span className="font-mono text-sm font-bold text-indigo-400">{val}</span>
                            </div>
                            <div className="group relative h-2 w-full rounded-full bg-zinc-900 border border-zinc-800/50">
                               <input 
                                 type="range"
                                 min="0"
                                 max={currentTab.limits?.[key as keyof typeof currentTab.limits] || 100}
                                 step={val < 2 ? "0.01" : "1"}
                                 value={val}
                                 onChange={(e) => updateParam(activeTab, key, parseFloat(e.target.value))}
                                 className="absolute inset-0 z-20 w-full cursor-pointer opacity-0"
                               />
                               <div 
                                 className="absolute h-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all group-hover:from-indigo-500 group-hover:to-indigo-300" 
                                 style={{ width: `${(val / (currentTab.limits?.[key as keyof typeof currentTab.limits] || 100)) * 100}%` }} 
                               />
                            </div>
                          </div>
                        ))}
                        
                        <div className="mt-8 rounded-2xl bg-indigo-500/5 p-4 border border-indigo-500/10">
                           <div className="mb-2 flex items-center justify-between">
                              <h4 className="text-[10px] font-bold uppercase tracking-tighter text-indigo-400">AI Intelligence Feed</h4>
                              <Zap className="h-3 w-3 text-indigo-500 animate-pulse" />
                           </div>
                           <p className="text-[10px] text-indigo-300 leading-relaxed font-medium">
                              <span className="font-bold">SUGGESTION:</span> Current {activeTab.toLowerCase()} parameters optimized for high-density procedural rendering. No further adjustments required for stability.
                           </p>
                        </div>
                      </div>
                    )}
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Global Footer / Status Bar --- */}
        <footer className="flex h-12 items-center justify-between border-t border-zinc-800 bg-zinc-950 px-8 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className={`h-2 w-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-zinc-600'}`} />
              <span>{isPlaying ? 'Simulation Stable' : 'Simulation Paused'}</span>
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
            <span className="hidden md:inline">Instances: <span className="text-zinc-200">12.4M</span></span>
            <span>Preset: <span className="text-zinc-200">{selectedPreset}</span></span>
            <div className="h-3 w-px bg-zinc-800" />
            <span className="text-indigo-400 flex items-center space-x-2">
               <Activity className="h-3 w-3" />
               <span>Antigravity_Intelligence_Active</span>
            </span>
          </div>
        </footer>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
        
        .cyber-grid {
          background-image: linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .nebula {
          background: radial-gradient(circle at 30% 30%, #4f46e5 0%, transparent 40%),
                      radial-gradient(circle at 70% 60%, #7c3aed 0%, transparent 40%),
                      radial-gradient(circle at 40% 80%, #2563eb 0%, transparent 40%);
          animation: nebula-shift 20s ease-in-out infinite alternate;
        }

        @keyframes nebula-shift {
          from { transform: scale(1) translate(0, 0); }
          to { transform: scale(1.1) translate(5%, 5%); }
        }
      `}} />
    </div>
  );
}
