import { defineConfig } from 'vite';
// Para GitHub Pages em /NOME-DO-REPOSITORIO/, defina VITE_BASE=/NOME-DO-REPOSITORIO/ no build.
export default defineConfig({base: process.env.VITE_BASE || '/'});
