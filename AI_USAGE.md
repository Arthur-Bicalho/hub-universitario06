# AI_USAGE.md

(Arthur Bicalho Angelo)

Uso de IA declarado neste desafio. Ferramenta utilizada em todas as etapas: **Claude (Anthropic)**, via claude.ai.

O uso variou por etapa: em investigação de bugs, a IA foi usada como par de raciocínio e para interpretar logs/testes, evitando fornecer diagnósticos prontos quando isso reduziria o valor da investigação própria; em geração de código de features novas (dashboard) e em apoio de processo (Git/GitHub, Issues, PRs), a IA gerou artefatos que contribuissem para o desenvolvimento do produto, sempre revisados e testados localmente antes do commit.

---

## 1. Bug: `GET /api/activities/{id}` retorna 500 em vez de 404

**Etapa:** investigação e correção.

**Objetivo dos prompts:** interpretar a saída de `./mvnw test` (assertion de falha e dump do MockMvc); identificar os significados dos codigos de erro como '500' e '404'; posteriormente, confirmação da causa raiz e do código de correção.

**Sugestão aceita:** a IA identificou que `IllegalArgumentException` estava mapeada para 500 em `GlobalExceptionHandler` e propôs alterar o mapeamento para 404 (`HttpStatus.NOT_FOUND`), preservando a mensagem de erro já existente. Alteração de uma linha, sem criação de exceção nova.

**Arquivos influenciados:**
- `apps/backend/src/main/java/br/edu/hub/exception/GlobalExceptionHandler.java`

**Como validei:** rodei `./mvnw test -Dtest=ActivityControllerTest` localmente e confirmei `shouldReturn404ForUnknownActivity` passando, sem quebrar os demais testes da classe.

---

## 2. Bug: inscrição aceita em atividade `FULL` ou `CLOSED`

**Etapa:** investigação, confirmação de causa raiz e correção.

**Objetivo dos prompts:** confirmar hipótese de causa raiz identificada por mim após leitura do código de `RegistrationService`; posteriormente, diferenciação da mensagem de erro por status (`"Activity is full"` / `"Activity is closed"`).

**Sugestões aceitas e adaptadas:**
- Aceito: uso de `IllegalStateException` (exceção nativa do Java) em vez de criar uma classe de exceção própria, com handler novo em `GlobalExceptionHandler` retornando 409.
- Adaptado: a versão inicial usava uma única condição (`status != OPEN`) com mensagem fixa; a pedido, foi ajustada para duas condições separadas (`FULL` e `CLOSED`), cada uma com mensagem própria.

**Arquivos influenciados:**
- `apps/backend/src/main/java/br/edu/hub/service/RegistrationService.java`
- `apps/backend/src/main/java/br/edu/hub/exception/GlobalExceptionHandler.java`

**Como validei:** rodei `./mvnw test -Dtest=ActivityControllerTest` (9/9 passando) e testes manuais via `curl` contra atividades `FULL` e `CLOSED` reais do catálogo, confirmando 409 em ambos os casos e 201 preservado para atividades `OPEN`.

---

## 3. Feature: busca de atividades por título/descrição

**Etapa:** revisão de código (Pull Request).

**Objetivo dos prompts:** revisão do PR de implementação da busca (backend: `ActivityRepository`/`ActivityService`; frontend: `activityService.ts`/`useActivities.ts`), buscando bugs não cobertos pelos testes existentes.

**Observação registrada, não bloqueante:** caracteres curinga de SQL (`%`, `_`) não são escapados no termo de busca — risco de borda aceito conscientemente, sem impacto de segurança.

**Arquivos influenciados (por outra colaboradora, revisados por mim com apoio de IA):**
- `apps/backend/src/main/java/br/edu/hub/repository/ActivityRepository.java`
- `apps/backend/src/main/java/br/edu/hub/service/ActivityService.java`
- `apps/frontend/src/services/activityService.ts`
- `apps/frontend/src/hooks/useActivities.ts`

**Como validei:** rodei `./mvnw test -Dtest=ActivityControllerTest` localmente (9/9 passando) antes de aprovar o PR.

---

## 4. Feature: indicadores no Dashboard

**Etapa:** geração de código completo (feature nova).

**Objetivo dos prompts, em sequência:** popular o dashboard vazio com vagas disponíveis e datas das atividades; depois, expandir para calendário completo incluindo atividades `FULL`/`CLOSED` com status explícito; depois, identificação visual por categoria (cor de enquadramento, sem agrupamento em seções).

**Sugestões aceitas:**
- Estrutura geral: card de resumo (total de vagas, somando apenas atividades `OPEN`) + lista cronológica completa.
- Uso de cor na borda esquerda de cada item para identificar a categoria, com legenda.
- Reaproveitamento do endpoint `GET /api/activities` já existente, sem necessidade de mudança de backend.


**Arquivos influenciados:**
- `apps/frontend/src/utils/activity.ts` (novas funções: `getOpenActivitiesSortedByDate`, `getAllActivitiesSortedByDate`, `getTotalAvailableSpots`, `categoryColors`)
- `apps/frontend/src/pages/DashboardPage.tsx` (reescrito)
- `apps/frontend/src/styles.css` (estilos novos para cards, badges de status e legenda de categorias)
- `apps/frontend/src/utils/activity.test.ts` (6 testes novos cobrindo as funções acima)

**Como validei:**
- `npx tsc -b --force`, `npm run lint`, `npm run build`, `npm test` — todos limpos antes do commit.
- Reproduzi um bug real de posicionamento de CSS (bloco colado dentro de uma `@media query` existente por engano durante uma colagem manual), diagnosticado a partir de evidência da aba Network do navegador, e corrigido restaurando a estrutura correta do arquivo.
- Conferência visual manual no navegador após cada rodada de ajuste (espaçamento, cores por categoria, badges de status).

---

## 5. Processo: Git, GitHub, Issues e Pull Requests

**Etapa:** apoio operacional durante todo o desafio (não geração de código de produto).

**Objetivo dos prompts:** estruturação de Issues no formato contexto/reprodução/causa raiz/critério de aceite; nomenclatura de branches (`fix/...`, `feat/...`, `chore/...`); descrições de PR; diagnóstico de erros de Git (heredoc mal fechado, mudanças feitas na branch errada, remoto de fork).

**Resultado:** todas as Issues e descrições de PR deste repositório foram estruturadas com apoio da IA a partir de evidências que eu mesmo coletei (logs de teste, saídas de `curl`, prints do DevTools).

**Arquivos influenciados:** nenhum arquivo de código; Issues e descrições de PR no GitHub.

**Como validei:** conferência manual de cada Issue/PR antes de publicar, e verificação da seção "Development" no GitHub para confirmar o vínculo `Closes #N` antes de cada merge.

---

## 6. Chore: `.gitignore` ausente

**Etapa:** diagnóstico estrutural e correção.

**Objetivo do prompt:** investigar por que artefatos de build apareciam como "untracked" persistentemente, e por que arquivos de gerenciador de pacote incorreto (`pnpm-lock.yaml`, `pnpm-workspace.yaml`) existiam no projeto.

**Resultado:** a IA identificou que o projeto não possuía `.gitignore` em nenhum nível e gerou o conteúdo cobrindo `target/`, `data/`, `node_modules/`, `dist/`, arquivos de IDE e OS.

**Arquivos influenciados:**
- `.gitignore` (novo)

**Como validei:** `git ls-files | grep -E "node_modules|target|dist|data"` para confirmar que nada indevido já estava rastreado antes do merge; conferência de que os artefatos desapareceram da listagem de untracked após a criação do arquivo.

---

## Observação geral sobre revisão

Em nenhuma etapa o código gerado ou sugerido pela IA foi commitado sem antes rodar a suíte de testes local (`./mvnw test` / `npm test`), lint (`npm run lint`) e build (`npm run build` / `./mvnw compile`) e, nos casos de interface, sem conferência visual manual no navegador. Nas etapas de investigação de bugs (#1, #3, #5), optei por não solicitar a causa raiz pronta antes de eu mesmo ler o código e formar uma hipótese, para preservar o valor da investigação própria exigida pelo desafio.
