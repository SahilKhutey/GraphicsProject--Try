# Aether Engine Dashboard Launcher
$ErrorActionPreference = "Stop"

Write-Host "--- LAUNCHING AETHER DASHBOARD ---" -ForegroundColor Cyan

if (!(Test-Path "node_modules")) {
    Write-Host "[GUI] Installing dependencies..." -ForegroundColor Yellow
    npm install
}

$dashboard = Join-Path (Get-Location).Path "dashboard_standalone.html"

if (!(Test-Path $dashboard)) {
    throw "Missing dashboard_standalone.html"
}

Write-Host "[GUI] Opening standalone dashboard..." -ForegroundColor Green
Start-Process $dashboard
