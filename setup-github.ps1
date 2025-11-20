# Script per inizializzare Git e pushare su GitHub
# Cerca Git nei percorsi comuni

$gitPaths = @(
    "C:\Program Files\Git\bin\git.exe",
    "C:\Program Files (x86)\Git\bin\git.exe",
    "$env:LOCALAPPDATA\Programs\Git\bin\git.exe",
    "$env:ProgramFiles\Git\cmd\git.exe",
    "$env:ProgramFiles(x86)\Git\cmd\git.exe"
)

$gitExe = $null
foreach ($path in $gitPaths) {
    if (Test-Path $path) {
        $gitExe = $path
        break
    }
}

# Prova anche a trovarlo nel PATH
if (-not $gitExe) {
    try {
        $gitExe = Get-Command git -ErrorAction Stop | Select-Object -ExpandProperty Source
    } catch {
        Write-Host "Git non trovato nei percorsi comuni." -ForegroundColor Yellow
    }
}

if (-not $gitExe) {
    Write-Host "`nGit non trovato sul sistema." -ForegroundColor Red
    Write-Host "`nPer installare Git:" -ForegroundColor Yellow
    Write-Host "1. Scarica Git da: https://git-scm.com/download/win" -ForegroundColor Cyan
    Write-Host "2. Installa Git" -ForegroundColor Cyan
    Write-Host "3. Riavvia il terminale e riprova" -ForegroundColor Cyan
    Write-Host "`nOppure aggiungi Git al PATH manualmente." -ForegroundColor Yellow
    exit 1
}

Write-Host "Git trovato: $gitExe" -ForegroundColor Green
Write-Host "`nInizializzazione repository Git..." -ForegroundColor Cyan

# Cambia nella directory del progetto
$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectPath

# Inizializza Git se non esiste già
if (-not (Test-Path ".git")) {
    & $gitExe init
    Write-Host "Repository Git inizializzata" -ForegroundColor Green
} else {
    Write-Host "Repository Git già esistente" -ForegroundColor Green
}

# Aggiungi tutti i file
Write-Host "`nAggiunta file..." -ForegroundColor Cyan
& $gitExe add .

# Verifica se ci sono modifiche da committare
$status = & $gitExe status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "Nessuna modifica da committare" -ForegroundColor Green
} else {
    Write-Host "`nCreazione commit..." -ForegroundColor Cyan
    & $gitExe commit -m "Initial commit: Nautic Service website with Shopify integration"
    Write-Host "Commit creato" -ForegroundColor Green
}

# Chiedi l'URL della repository GitHub
Write-Host "`nConfigurazione repository remota..." -ForegroundColor Cyan
$repoUrl = Read-Host "Incolla l'URL della repository GitHub (es: https://github.com/username/repo.git) o premi Enter per usare quella esistente"

# Verifica se esiste già un remote
$remoteExists = & $gitExe remote get-url origin 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "Remote origin già configurato: $remoteExists" -ForegroundColor Green
    if (-not [string]::IsNullOrWhiteSpace($repoUrl)) {
        Write-Host "Aggiornamento remote..." -ForegroundColor Yellow
        & $gitExe remote set-url origin $repoUrl
        Write-Host "Remote aggiornato" -ForegroundColor Green
    }
} else {
    if ([string]::IsNullOrWhiteSpace($repoUrl)) {
        Write-Host "`nNessun remote configurato. Per aggiungere un remote:" -ForegroundColor Yellow
        Write-Host "   git remote add origin https://github.com/username/repo.git" -ForegroundColor Cyan
        Write-Host "   git branch -M main" -ForegroundColor Cyan
        Write-Host "   git push -u origin main" -ForegroundColor Cyan
        exit 0
    } else {
        & $gitExe remote add origin $repoUrl
        Write-Host "Remote origin aggiunto" -ForegroundColor Green
    }
}

# Imposta il branch principale
Write-Host "`nConfigurazione branch..." -ForegroundColor Cyan
& $gitExe branch -M main

# Push su GitHub
Write-Host "`nPush su GitHub..." -ForegroundColor Cyan
& $gitExe push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nPush completato con successo!" -ForegroundColor Green
    Write-Host "`nRepository disponibile su GitHub" -ForegroundColor Cyan
} else {
    Write-Host "`nErrore durante il push. Verifica:" -ForegroundColor Yellow
    Write-Host "   - Le credenziali GitHub sono configurate correttamente" -ForegroundColor Cyan
    Write-Host "   - Hai i permessi per pushare sulla repository" -ForegroundColor Cyan
    Write-Host "   - La repository esiste su GitHub" -ForegroundColor Cyan
}
