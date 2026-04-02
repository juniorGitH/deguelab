@echo off
echo ========================================
echo   DEGUE LAB - Demarrage
echo ========================================
echo.

cd /d "%~dp0"

echo Lancement du serveur de developpement...
echo.
echo Le site sera disponible sur: http://localhost:1234
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.

call npm start
