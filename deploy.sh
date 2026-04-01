#!/bin/bash

# ESTO ES CRUCIAL: Nos movemos a la carpeta correcta primero
cd /home/pepe/Documentos/antigravity/scratch/portfolio || exit

# 1. Configurar la identidad de Git (solo correo de prueba si no tienes uno)
if [ -z "$(git config --global user.email)" ]; then
    echo "Configurando email y nombre predeterminados en git..."
    git config --global user.email "aleman@github.com"
    git config --global user.name "Alekey-boop"
fi

# 2. Variables para GitHub
GITHUB_USER="Alekey-boop"
REPO_NAME="portfolio" # Debe coincidir con el repositorio que creaste en GitHub
GITHUB_URL="https://github.com/$GITHUB_USER/$REPO_NAME.git"

echo "=========================================="
echo "Preparando para subir a: $GITHUB_URL"
echo "=========================================="

# 3. Inicializar y subir código de esta carpeta
git init
git add .
git commit -m "feat: portfolio inicial finalizado"
git branch -M main

# Remover el remote origin si ya existía para evitar errores
git remote remove origin 2>/dev/null
git remote add origin $GITHUB_URL

# Subir a GitHub
echo "Subiendo archivos... (Si pide contraseña o error de autenticación, ocupa tu token de GitHub)"
git push -u origin main

# 4. Iniciar servidor local (cambié al puerto 8080 porque el 8000 se quedó pillado)
echo ""
echo "======================================================="
echo "[✔] Proceso de GitHub terminado."
echo ""
echo "Iniciando servidor local para el navegador..."
echo "👉 Abre este enlace para ver tu portafolio: http://localhost:8080"
echo "Para apagar el servidor y salir, presiona: Ctrl + C"
echo "======================================================="
python3 -m http.server 8080
