# Gaúchos Hair Itu — site premium

Site institucional da Gaúchos Hair Itu em **React + Vite / Node.js**, responsivo e sem tickers, contadores fictícios ou estatísticas decorativas.

## GitHub Pages: `main` / `(root)`

O site **compilado** está na raiz da branch `main`:

- `index.html` — HTML publicado (não depende do Vite no navegador)
- `assets/` — JavaScript e CSS compilados
- `favicon.svg`, `404.html` — arquivos estáticos
- `.nojekyll` — impede que o GitHub Pages tente processar os arquivos via Jekyll

**Configuração no GitHub:** `Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save`.

O workflow `.github/workflows/build-root.yml` executa o build e grava o resultado na raiz automaticamente quando o código-fonte é alterado. Ele também tenta definir a origem do Pages por API; se a conta não autorizar a mudança automática, use a configuração acima. O endereço esperado é:

https://lzzamboniofc.github.io/GauchosHair/

## Código-fonte editável

O **código React** agora fica em `site/`, separado dos arquivos HTML/CSS/JS publicados:

- `site/index.html` — HTML de origem do Vite
- `site/src/main.jsx` — componentes e comportamento
- `site/src/style.css` — estilos
- `site/src/content.js` — textos, links e dados da barbearia
- `site/public/` — imagens e arquivos estáticos originais
- `vite.config.js` — entrada `site/` e saída `dist/`

### Rodar localmente

Requer Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

Para gerar a versão estática em `dist/`:

```bash
npm run build
```

Em um novo push alterando os fontes de `site/`, o GitHub Actions recompila o projeto e atualiza automaticamente o `index.html` e `assets/` da raiz. Não edite diretamente os arquivos gerados; edite os originais em `site/`.

## Personalização

Abra `site/src/content.js` para atualizar:

| Campo | Conteúdo |
| --- | --- |
| `logo` | Logotipo oficial autorizado |
| `appbarber` | Link direto da barbearia no AppBarber |
| `instagram` | Perfil oficial |
| `whatsapp`, `address`, `hours` | Somente dados verificados |
| `mapsUrl`, `mapEmbedUrl` | Rota e mapa oficial |
| `heroImage`, `aboutImage`, `experienceImage` | Fotos reais do local |
| `services`, `professionals` | Serviços e equipe confirmados |
| `gallery`, `reviews`, `transformations` | Material real autorizado |
| `faq` | Respostas validadas com a barbearia |

Para fotos, prefira WebP/AVIF e coloque os arquivos em `site/public/images/`.

**Antes de apresentar como site oficial:** confirmar identidade visual, serviços, profissionais, endereço, horário, avaliações e link do AppBarber. Até isso acontecer, o site não inventa essas informações e oferece consulta pelo Instagram.
