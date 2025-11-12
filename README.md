# OFICINA_BRASIL_2025

Esse repositório é um teste técnico, o objetivo é desenvolver uma aplicação de notícias.

## TECNOLOGIAS

- Next.js
- Typescript
- SSE ou Websocket (ainda decidindo)

## ARQUITETURA

```
OFICINA_BRASIL_2025/
├─ data/
│  └─ topics.json
├─ app/
│  ├─ news/
│  │  ├─ page.tsx           # /news?page=&category=
│  │  └─ [id].tsx            # /news/[id]
│  ├─ forum.tsx              # /forum?q=
│  └─ api/
│     ├─ news.ts             # opcional: proxy/facade para Algolia HN
│     └─ topics/
│        ├─ index.ts         # GET/POST topics
│        └─ stream.ts        # SSE stream
├─ components/
│  ├─ TopicList.tsx
│  ├─ TopicForm.tsx
│  └─ NewsCard.tsx
├─ lib/
│  ├─ topicsStore.ts        # lógica de leitura/escrita do JSON + broadcast SSE
│  └─ similarity.ts         # função de similaridade
├─ types/
│  └─ index.ts
```

## ROTAS

- `/news` — lista de notícias por categoria (?category=) com SSR e paginação.
- `/news/[id]` — detalhe da notícia + tópicos vinculados + botão criar tópico (form).
- `/api/topics` — cria / lista tópicos (persistência em arquivo JSON).
- *SSE* `(/api/topics/stream)` — notifica clientes em tempo real quando surgem tópicos (para atualizar lista em tempo real).
- `/forum?q=` — busca textual simples por tópicos (título/conteúdo, case-insensitive).

##
