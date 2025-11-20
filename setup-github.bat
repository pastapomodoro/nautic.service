@echo off
REM Script batch per inizializzare Git e fare push su GitHub

echo Cercando Git...

REM Cerca git nei percorsi comuni
set GIT_EXE=
where git >nul 2>&1
if %ERRORLEVEL% == 0 (
    set GIT_EXE=git
    goto :found_git
)

if exist "C:\Program Files\Git\cmd\git.exe" (
    set "GIT_EXE=C:\Program Files\Git\cmd\git.exe"
    goto :found_git
)

if exist "C:\Program Files (x86)\Git\cmd\git.exe" (
    set "GIT_EXE=C:\Program Files (x86)\Git\cmd\git.exe"
    goto :found_git
)

echo Git non trovato!
echo Per favore installa Git da: https://git-scm.com/download/win
echo Dopo l'installazione, riavvia il terminale e riesegui questo script.
pause
exit /b 1

:found_git
echo Git trovato: %GIT_EXE%
echo.

echo Inizializzazione repository Git...
if not exist .git (
    "%GIT_EXE%" init
    echo Repository Git inizializzato.
) else (
    echo Repository Git gia inizializzato.
)

echo.
echo Aggiunta file al repository...
"%GIT_EXE%" add .

echo.
echo Creazione commit iniziale...
"%GIT_EXE%" commit -m "Initial commit"

if %ERRORLEVEL% == 0 (
    echo Commit creato con successo!
) else (
    echo Nessun file da committare o commit gia esistente.
)

echo.
echo Configurazione remote repository...
set REPO_URL=https://github.com/pastapomodoro/nauticservice.git

"%GIT_EXE%" remote get-url origin >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo Remote 'origin' gia configurato, aggiornamento...
    "%GIT_EXE%" remote set-url origin %REPO_URL%
) else (
    echo Aggiunta remote 'origin'...
    "%GIT_EXE%" remote add origin %REPO_URL%
)

echo Remote configurato: %REPO_URL%

echo.
echo Configurazione branch 'main'...
"%GIT_EXE%" branch -M main

echo.
echo Push su GitHub...
echo NOTA: Potrebbe essere richiesta l'autenticazione GitHub
"%GIT_EXE%" push -u origin main

if %ERRORLEVEL% == 0 (
    echo.
    echo ============================================================
    echo SUCCESSO! Il progetto e stato pushato su GitHub!
    echo Repository: %REPO_URL%
    echo ============================================================
) else (
    echo.
    echo ============================================================
    echo Push fallito. Possibili cause:
    echo 1. Autenticazione GitHub richiesta
    echo 2. Credenziali non configurate
    echo.
    echo Per risolvere:
    echo - Configura le credenziali: git config --global user.name "TuoNome"
    echo - Configura l'email: git config --global user.email "tua@email.com"
    echo - Usa un Personal Access Token invece della password
    echo - Oppure esegui manualmente: git push -u origin main
    echo ============================================================
)

pause

