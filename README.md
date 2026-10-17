# Gaúchos Hair Itu — site premium

Site institucional **React + Vite, em ambiente Node.js**. Reformulação com foco em mobile-first e conteúdo honesto: nenhum ticker/marquee, número decorativo, contadores ou avaliações fictícias. Não inclui backend nem agenda própria.

## Execução

Requer Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Publicação

- **Vercel / Netlify**: `npm run build` → pasta `dist`.
- **Hospedagem na raiz**: `npm run build`, envie o conteúdo de `dist`.
- **GitHub Pages (`main` / `/root`)**: existe workflow `.github/workflows/pages.yml`; configure **Settings → Pages → Build and deployment → GitHub Actions**. Ele detecta o nome do repositório para ajustar a base do Vite automaticamente. Não publique a pasta `src` diretamente como site estático; o build é necessário.
- **GitHub Pages com domínio personalizado**: ajuste `VITE_BASE=/` no workflow e configure o domínio conforme as regras do GitHub.

## O que editar

Abra `src/content.js`. Ele contém todas as configurações do cliente:

| Campo | O que colocar |
| --- | --- |
| `logo` | `/images/logo-oficial.webp` |
| `appbarber` | URL **do estabelecimento**, confirmada pela barbearia |
| `whatsapp`, `address`, `hours`, `mapsUrl`, `mapEmbedUrl` | Apenas dados oficiais confirmados |
| `heroImage`, `aboutImage`, `experienceImage` | Fotografia real autorizada; arquivos em `public/images/` |
| `services` | Lista real com nome, descrição, fotos e preço/duração opcionais |
| `professionals` | Profissionais reais, com imagem e especialidade |
| `gallery` | Fotos autorizadas e classificadas |
| `reviews` | Avaliações verificáveis, com fonte |
| `transformations` | Pares reais de fotos autorizadas de antes/depois |
| `faq` | Revise com a equipe as políticas de atendimento |

**Fotos**: recomendamos WebP/AVIF, corte adequado e compressão antes do upload. Caso uma foto não exista, o site apresenta um espaço editorial identificável como pendente — não usa foto aleatória de outra empresa.

**Agendamento**: sem a URL oficial do AppBarber, os CTAs exibem **“Consultar agendamento”** e levam ao Instagram oficial, com aviso explicativo via título acessível. Após inserir a URL, mudam automaticamente para **“Agendar pelo AppBarber”**.

**Cores e logo**: o monograma GH e a paleta verde grafite/cobre são proposta provisória de design, **não a identidade oficial validada**. Substitua pelas cores e logo oficiais assim que disponíveis.

## Checklist antes de publicar como site oficial

- [ ] Inserir logo original e fotografias reais autorizadas.
- [ ] Validar serviços, equipe, política de atrasos, pagamento e horários.
- [ ] Colar e testar a URL oficial de agendamento AppBarber.
- [ ] Confirmar endereço e o link real de navegação; somente então ativar mapa.
- [ ] Adicionar avaliações reais e verificar autorização de uso.
- [ ] Atualizar política de privacidade caso haja nova integração.
- [ ] Definir domínio canônico, `og:image` real, eventual telefone e `LocalBusiness` com informações verificadas.
- [ ] Remover do rodapé a observação “site demonstrativo” depois da validação.

Não são usados cookies próprios de tracking ou scripts de estatísticas no projeto. Fontes externas são carregadas pelo Google Fonts.
