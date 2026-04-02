@echo off
echo ========================================
echo   DEGUE LAB - Build Production
echo ========================================
echo.

cd /d "%~dp0"

echo Creation du build de production...
call npm run build

echo.
echo ========================================
echo Build termine!
echo Les fichiers sont dans le dossier: dist/
echo ========================================
pause
