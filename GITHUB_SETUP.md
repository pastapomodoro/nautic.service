# Comandi Git per push su GitHub

## Se Git è installato, esegui questi comandi manualmente:

```bash
# 1. Inizializza il repository (se non già fatto)
git init

# 2. Aggiungi tutti i file
git add .

# 3. Crea il commit iniziale
git commit -m "Initial commit"

# 4. Aggiungi il remote repository
git remote add origin https://github.com/pastapomodoro/nauticservice.git

# 5. Rinomina il branch a main
git branch -M main

# 6. Push su GitHub
git push -u origin main
```

## Configurazione iniziale Git (se non già fatto):

```bash
git config --global user.name "Tuo Nome"
git config --global user.email "tua@email.com"
```

## Autenticazione GitHub:

GitHub non accetta più password per HTTPS. Devi usare un **Personal Access Token**:

1. Vai su: https://github.com/settings/tokens
2. Crea un nuovo token con permessi `repo`
3. Usa il token come password quando richiesto

## Alternativa con SSH:

Se preferisci SSH invece di HTTPS:

```bash
# Cambia il remote a SSH
git remote set-url origin git@github.com:pastapomodoro/nauticservice.git

# Poi fai il push
git push -u origin main
```

