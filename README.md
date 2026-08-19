# Hub Universitário

## Sobre o projeto

O Hub Universitário é um portal para estudantes descobrirem oficinas, palestras, cursos, eventos e projetos de extensão. 

A aplicação já oferece listagem, filtros, detalhes, inscrições e consulta de participantes. Alguns comportamentos precisam ser investigados e partes do produto ainda estão incompletas. Antes de começar, leia o [contexto do produto](./PROJECT.md) e as [instruções do desafio](./CHALLENGE.md).

## Tecnologias

- Frontend: React 19, TypeScript, Vite, React Router, TanStack Query, Axios, CSS e Vitest.
- Backend: Java 21, Spring Boot, Spring Web, Spring Data JPA, Bean Validation, Maven e H2.
- Qualidade: ESLint, React Testing Library, JUnit 5 e MockMvc.

## Arquitetura

O monorepo mantém os dois aplicativos independentes:

```text
Browser → React/Vite (:5173) → API REST/Spring Boot (:8080) → H2 em arquivo
```

O backend usa uma organização direta por responsabilidade (`controller`, `service`, `repository`, `entity`, `dto`, `exception` e `config`). O frontend separa páginas, componentes, hooks de dados, serviços HTTP, tipos, rotas e utilitários.

## Pré-requisitos

- Java 21 (`java -version`)
- Node.js 20 ou superior e npm (`node --version` e `npm --version`)
- Git
- Conexão com a internet apenas na primeira instalação das dependências

Não é necessário instalar Maven, Docker ou configurar um banco de dados.

## Como executar

Em dois terminais, execute o backend e o frontend conforme as seções abaixo. Como alternativa, em macOS/Linux, use:

```bash
./start.sh
```

Depois acesse [http://localhost:5173](http://localhost:5173). A API responde em [http://localhost:8080/api/activities](http://localhost:8080/api/activities).

## Frontend

```bash
cd apps/frontend
npm install
npm run dev
```

Comandos úteis:

```bash
npm run build
npm run lint
npm test
```

Se a API estiver em outro endereço, defina `VITE_API_URL`, incluindo o sufixo `/api`.

## Backend

macOS/Linux:

```bash
cd apps/backend
./mvnw spring-boot:run
```

Windows:

```powershell
cd apps/backend
mvnw.cmd spring-boot:run
```

O Maven Wrapper baixa o Maven 3.9.11 automaticamente na primeira execução.

## Banco de dados

O H2 é criado automaticamente em `apps/backend/data/` e recebe 12 atividades com diferentes categorias, datas, capacidades e status. As inscrições iniciais também são geradas. Nenhuma configuração manual é necessária.

Para reiniciar os dados, pare o backend e remova somente os arquivos dentro de `apps/backend/data/`, eles serão recriados na próxima inicialização.

O console H2 está disponível em [http://localhost:8080/h2-console](http://localhost:8080/h2-console):

```text
JDBC URL: jdbc:h2:file:./data/hub-universitario
User: sa
Password: (vazio)
```

## Testes

Backend:

```bash
cd apps/backend
./mvnw test
```

Frontend:

```bash
cd apps/frontend
npm test
```

A suíte faz parte do desafio: há testes verdes que protegem fluxos existentes e testes que descrevem comportamentos ainda não atendidos. Portanto, a suíte inicial pode terminar com falhas de asserção conhecidas. Erros de compilação, importação ou inicialização não são esperados.

## Estrutura do repositório

```text
.
├── apps
│   ├── backend
│   │   ├── .mvn/wrapper
│   │   ├── src/main
│   │   ├── src/test
│   │   ├── mvnw
│   │   └── pom.xml
│   └── frontend
│       ├── src
│       │   ├── components
│       │   ├── hooks
│       │   ├── pages
│       │   ├── routes
│       │   ├── services
│       │   ├── test
│       │   ├── types
│       │   └── utils
│       └── package.json
├── CHALLENGE.md
├── PROJECT.md
├── README.md
└── start.sh
```

## Code Day

Leia o [PROJECT.md](./PROJECT.md) e o [CHALLENGE.md](./CHALLENGE.md), explore o produto e construa seu próprio backlog a partir das discrepâncias encontradas. O foco está em investigação, priorização, qualidade da solução, testes, organização e comunicação técnica.

A entrega poderá ser realizada até **23 de agosto de 2026, às 23h59**, no horário de Brasília. 

O uso de inteligência artificial é permitido, desde que seja declarado e documentado conforme a seção correspondente do `CHALLENGE.md`. O participante permanece responsável por compreender, revisar e validar tudo o que entregar.

## Fluxo GitHub

Durante o Code Day, crie no mínimo duas Issues (uma de bug e uma de feature), trabalhe em pelo menos duas branches e abra dois Pull Requests associados às Issues. A organização e a clareza desses registros fazem parte da avaliação, portanto não há templates prontos no repositório.

Branches sugeridas:

```text
fix/activity-capacity-refresh
feat/activity-registration
```

Commits claros e pequenos são preferíveis. Conventional Commits é recomendado, mas não obrigatório.
