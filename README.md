# Front — Escritório Thais Monteiro

Landing page da **Dra. Thais Monteiro — Advocacia Criminal** (Uberaba - MG).

Desenvolvido por [E9 Soluções](https://www.e9solucoes.com.br/).

## Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- Deploy na Vercel (`vercel.json` com rewrite para SPA)

## Rodando localmente

Requer **Node.js 18+**.

```sh
npm install
npm run start   # servidor de desenvolvimento em http://localhost:8080
npm run build   # build de produção em dist/
```

## Configuração

| Onde | O quê |
|---|---|
| `src/lib/contact.ts` | WhatsApp, e-mail e mensagem padrão dos botões |
| `.env` → `SITE_URL` | Domínio de produção. Quando definido, o build gera URL canônica, `og:image`, `sitemap.xml` e a linha `Sitemap:` do `robots.txt` |
| `vite.config.ts` | Plugin de SEO (JSON-LD do escritório, tags dependentes do domínio) |

## Estrutura da página

`src/pages/Index.tsx` monta as seções, na ordem:
Hero → Missão → Atuação Especializada → Como Funciona o Atendimento → Credenciais → Sobre → Galeria → FAQ → Contato.

O blog (`src/pages/Blog.tsx` e `src/components/BlogSection.tsx`) está oculto até haver artigos publicados.
