# Aether Engine V3.5 | Cinematic Planetary Simulation

Aether Engine is a professional-grade, GPU-driven procedural universe platform. It combines high-fidelity volumetric atmospheric rendering with an intelligent Digital Twin architecture to create planetary-scale environments with AAA visual fidelity and real-time observability.

## 🚀 Key Features

- **GPU-Driven Rendering**: 12M+ vegetation instances using `glMultiDrawElementsIndirect` and compute-based frustum culling.
- **Cinematic Atmosphere**: Froxel-based volumetric clouds, Nishita atmospheric scattering, and real-time SSGI/SSR.
- **Digital Twin AI**: Real-time sensor fusion and Pareto-based biome optimization for ecological stability.
- **Professional Cockpit**: High-fidelity React/Tailwind control panel with live telemetry and AI-suggested world tuning.

## 🛠️ Technical Stack

- **Simulation Core**: C++20, OpenGL 4.6, CMake, Ninja.
- **GUI Interface**: React 18, TypeScript, Vite, TailwindCSS.
- **Shaders**: GLSL (Compute-Centric Pipeline).

## 📂 Project Structure

- `/Engine`: Core C++ simulation, rendering, and AI managers.
- `/GUI`: React-based World Control Panel modules.
- `/shaders`: GPU compute and fragment shaders.
- `launch_aether.ps1`: Unified system ignition script.

## 📖 Quick Start

1. Install **Node.js**, **CMake**, and **Ninja**.
2. Run the ignition script:
   ```powershell
   ./launch_aether.ps1
   ```
3. Access the World Control Panel at `http://localhost:5173`.

---
*Developed as part of the Aether Procedural Graphics Milestone.*
