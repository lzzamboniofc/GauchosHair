import { defineConfig } from 'vite';

// Código-fonte em /site. A raiz do repositório contém o site estático
// já compilado para GitHub Pages: main / (root).
export default defineConfig({
  root: 'site',
  publicDir: 'public',
  base: process.env.VITE_BASE || '/GauchosHair/',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
});
