# Aether Engine Unified Launch & Orchestration Script
# V3.5 Production Standard

Write-Host "--- AETHER ENGINE V3.5 IGNITION ---" -ForegroundColor Indigo

# 1. Dependency Verification
Write-Host "[1/3] Verifying Infrastructure..." -ForegroundColor Cyan

$NINJA_PATH = Join-Path $PSScriptRoot "ninja.exe"
if (-not (Test-Path $NINJA_PATH)) {
    Write-Host "[ERROR] ninja.exe not found in project root. Please ensure binary deployment was successful." -ForegroundColor Red
    exit 1
}

# Check for C++ Compiler
$CL_PATH = Get-Command cl.exe -ErrorAction SilentlyContinue
if (-not $CL_PATH) {
    Write-Host "[CRITICAL] No C++ Compiler (cl.exe) detected." -ForegroundColor Red
    Write-Host "ACTION REQUIRED: Please install 'Desktop development with C++' via Visual Studio Installer." -ForegroundColor Yellow
    Write-Host "LINK: https://visualstudio.microsoft.com/visual-cpp-build-tools/" -ForegroundColor Cyan
    # Proceed to launch GUI anyway
}

# 2. Simulation Engine Build
Write-Host "[2/3] Building Aethelgard C++ Backend..." -ForegroundColor Cyan
if ($CL_PATH) {
    if (-not (Test-Path "build")) { New-Item -ItemType Directory -Path "build" }
    Set-Location build
    cmake -G "Ninja" -DCMAKE_MAKE_PROGRAM=$NINJA_PATH ..
    & $NINJA_PATH
    Set-Location ..
} else {
    Write-Host "[SKIP] Skipping C++ Build: No compiler found. Launching GUI-only mode." -ForegroundColor Yellow
}

# 3. GUI Ignition
Write-Host "[3/3] Launching World Control Panel..." -ForegroundColor Cyan
# Start Vite in the background
Start-Process powershell -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command npx vite --port 5173 --host" -WindowStyle Minimized

Write-Host ""
Write-Host "[SUCCESS] Aether Engine Systems Primed." -ForegroundColor Green
Write-Host "[ACCESS] Dashboard: http://localhost:5173" -ForegroundColor Indigo
Write-Host "[NOTICE] Central Viewport will remain black until C++ Backend is compiled." -ForegroundColor Yellow
