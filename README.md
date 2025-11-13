# NEWSHUB

Esse repositório é um teste técnico, o objetivo é desenvolver uma aplicação de notícias.

## BAIXANDO

```sh
git clone git@github.com:fcrfabiano/NEWSHUB.git
cd NEWSHUB
```

## INSTALANDO DEPENDÊNCIAS

```sh
npm install
```

ou

```sh
yarn
```

## RODANDO O PROJETO

```sh
npm run dev
```

ou

```sh
yarn dev
```

## TECNOLOGIAS

- Next.js (App Router)
- Typescript
- Zod
- Shadcn
- Tailwind

## ARQUITETURA

```
OFICINA_BRASIL_2025/
├─ app/
│  ├─ news/
│  │  ├─ page.tsx            # /news?page=&category=
│  │  └─ [id]/
│  │     └─ page.tsx         # /news/:id
│  ├─ forum/
│     └─ page.tsx            # /forum?q=
│  └─ api/
│     ├─ news.ts             # opcional: proxy/facade para Algolia
├─ components/
│  ├─ TopicForm.tsx
│  ├─ TopicCard.tsx
│  ├─ NewsDetailContent.tsx
│  ├─ NavLink.tsx
│  ├─ NavBar.tsx
│  ├─ HtmlContent.tsx
│  ├─ NewsCard.tsx
├─ └─ ui/                            # shadcn componentes
├─ lib/
│  ├─ application-settings.ts        # url da api
│  ├─ http-client.ts                 # cliente http
│  ├─ utils.ts                       # utilidades
│  ├─ storage.ts                     # local storage
│  └─ similarity.ts                  # função de similaridade
├─ types/
│  └─ index.ts
├─ mappers/
│  └─ hn-api.mapper.ts
├─ schemas/
│  ├─ hn-api.schema.ts
│  ├─ news.schema.ts
│  └─ topic.schema.ts
├─ hooks/
│  └─ useToast.ts
```
