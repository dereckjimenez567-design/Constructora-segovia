@echo off
chcp 65001 >nul
title Constructora Segovia - Servidor Web
cd /d "%~dp0"

echo.
echo   Iniciando la pagina de Constructora Segovia...
echo.

REM Verificar que Node.js este instalado
where node >nul 2>nul
if errorlevel 1 (
    echo   [ERROR] No se encontro Node.js en este equipo.
    echo   Descarguelo gratis en: https://nodejs.org
    echo.
    pause
    exit /b
)

REM Abrir el navegador en la pagina (espera 2 segundos a que arranque el servidor)
start "" cmd /c "timeout /t 2 >nul & start http://localhost:8080"

REM Iniciar el servidor (esta ventana queda abierta mientras la pagina funciona)
node "%~dp0server.js"

pause
