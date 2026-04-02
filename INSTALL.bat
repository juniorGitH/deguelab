@echo off
echo ========================================
echo   DEGUE LAB - Installation
echo ========================================
echo.

cd /d "%~dp0"

echo Installation des dependances...
call npm install

echo.
echo ========================================
echo Installation terminee!
echo Pour lancer le site, executez: START.bat
echo ========================================
pause
