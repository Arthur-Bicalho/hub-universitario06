# Hub Universitário — Contexto e especificação do produto

## Visão geral

O Hub Universitário é uma plataforma de extensão criada para reunir, em um único lugar, oportunidades oferecidas dentro da universidade.

Antes do projeto, informações sobre oficinas, palestras, minicursos, eventos e projetos de extensão ficavam espalhadas entre murais, redes sociais, grupos de mensagens e páginas de diferentes departamentos. Estudantes frequentemente descobriam uma atividade tarde demais, não sabiam se ainda havia vagas ou precisavam preencher formulários distintos para cada organização.

O produto busca reduzir essa fragmentação. A experiência ideal é simples: descobrir uma atividade relevante, compreender seus detalhes e realizar a inscrição com confiança.

## História do projeto

O Hub começou como iniciativa conjunta de um projeto de extensão da área de tecnologia, representantes estudantis e setores que organizam atividades acadêmicas.

A primeira equipe realizou entrevistas informais com estudantes e organizadores e construiu uma versão inicial do portal. Essa versão validou o catálogo centralizado e permitiu importar atividades de demonstração, consultar detalhes e iniciar o fluxo de inscrições.

Com o encerramento do ciclo anterior, o código foi transferido para uma nova equipe antes da estabilização completa. A documentação técnica ficou incompleta, algumas demandas atravessaram apenas parte das camadas e determinados comportamentos deixaram de acompanhar as regras do produto.

O repositório deste desafio representa exatamente esse momento: existe um produto reconhecível e utilizável, mas ele precisa ser investigado, estabilizado e evoluído.

## Objetivos do produto

- Facilitar a descoberta de atividades universitárias.
- Apresentar informações confiáveis sobre data, local, responsável e disponibilidade.
- Permitir inscrições simples, sem exigir autenticação nesta etapa.
- Evitar inscrições acima da capacidade disponível.
- Manter interface, API e banco de dados consistentes após cada operação.
- Oferecer uma base clara para futuras funcionalidades acadêmicas.

## Pessoas usuárias

### Estudante

Quer encontrar atividades compatíveis com seus interesses, verificar vagas e realizar uma inscrição sem depender de formulários externos.

Principais necessidades:

- navegar por oportunidades.
- distinguir categorias e situação da atividade.
- encontrar uma atividade pelo conteúdo.
- consultar informações completas.
- saber quantas vagas ainda existem.
- receber confirmação ou erro compreensível ao se inscrever.

### Organizador de atividade

É a pessoa, setor ou coletivo responsável por uma oportunidade. Precisa que informações publicadas sejam claras e que a capacidade seja respeitada.

### Equipe de extensão

Mantém o produto e acompanha sua adoção. Precisa de código compreensível, regras testadas e uma base que possa evoluir sem serviços externos obrigatórios.

## Escopo desta versão

Esta etapa do produto não possui autenticação, autorização, pagamentos, envio de e-mail ou integração obrigatória com sistemas institucionais.

O escopo essencial é:

- catálogo de atividades.
- consulta de detalhes.
- filtros e busca.
- inscrição de estudantes.
- consulta das inscrições de uma atividade.
- atualização coerente da disponibilidade.
- respostas previsíveis para erros de entrada, recurso e regra de negócio.

Funcionalidades adicionais são bem-vindas quando preservam esse núcleo e possuem justificativa de produto.

## Domínio

### Activity

Representa uma atividade oferecida à comunidade acadêmica.

| Campo | Significado |
|---|---|
| `id` | Identificador único |
| `title` | Nome curto da atividade |
| `description` | Explicação completa |
| `category` | Tipo da oportunidade |
| `status` | Situação atual para o estudante |
| `capacity` | Quantidade máxima de inscrições |
| `registeredCount` | Quantidade confirmada de inscrições |
| `organizer` | Pessoa, setor ou coletivo responsável |
| `location` | Local de realização |
| `date` | Data e horário da atividade |
| `createdAt` | Data de criação do registro |
| `updatedAt` | Data da última atualização |

Categorias reconhecidas:

- `WORKSHOP` — oficina prática.
- `LECTURE` — palestra.
- `COURSE` — curso ou minicurso.
- `EXTENSION_PROJECT` — projeto de extensão.
- `EVENT` — evento acadêmico ou comunitário.

Status reconhecidos:

- `OPEN` — atividade disponível para inscrição.
- `FULL` — capacidade atingida.
- `CLOSED` — inscrições encerradas ou atividade concluída.

### Registration

Representa a inscrição confirmada de um estudante.

| Campo | Significado |
|---|---|
| `id` | Identificador único |
| `activityId` | Atividade associada |
| `studentName` | Nome do estudante |
| `studentEmail` | E-mail informado |
| `createdAt` | Momento da inscrição |

## Regras de negócio

### Capacidade e disponibilidade

A quantidade de vagas restantes é calculada por:

```text
remainingSpots = max(capacity - registeredCount, 0)
```

Regras invariantes:

- `capacity` deve ser positiva.
- `registeredCount` não deve ficar negativo.
- uma inscrição confirmada aumenta `registeredCount` uma única vez.
- quando `registeredCount >= capacity`, o status aplicável é `FULL`.
- uma atividade lotada não pode receber outra inscrição confirmada.
- uma atividade `CLOSED` não deve ser apresentada como disponível para inscrição.
- falhas de validação ou regra de negócio não podem deixar alterações parciais no banco.

### Consistência da interface

Depois de uma operação bem-sucedida, todas as informações visíveis relacionadas devem convergir para o novo estado sem exigir recarregamento manual da página.

Isso inclui, conforme o fluxo:

- total de inscritos.
- vagas restantes.
- status da atividade.
- lista de inscrições.
- cards ou indicadores que utilizem os mesmos dados.

### Validação de inscrição

- Nome é obrigatório e deve representar um valor não vazio adequado para identificação.
- E-mail é obrigatório e deve possuir formato válido.
- A atividade deve existir.
- A atividade deve aceitar novas inscrições.
- Respostas de erro devem ser compreensíveis para o frontend e não expor detalhes internos.

## Jornadas essenciais

### Descobrir atividades

1. O estudante abre o portal.
2. A aplicação apresenta as oportunidades disponíveis com estado de carregamento apropriado.
3. Cada card mostra título, categoria, data, responsável, capacidade, inscritos, vagas e status.
4. Erros de comunicação com a API são exibidos sem quebrar a página.

### Filtrar por categoria

1. O estudante escolhe “Todas” ou uma categoria específica.
2. “Todas” apresenta o conjunto completo recebido para a listagem.
3. Uma categoria específica apresenta somente atividades pertencentes àquela categoria.
4. A contagem exibida acompanha os itens visíveis.

### Buscar atividades

1. O estudante informa um termo de busca.
2. A consulta considera título e descrição, sem diferenciar letras maiúsculas e minúsculas.
3. A busca é realizada pela API, permitindo que o comportamento continue correto com um catálogo maior.
4. Limpar o termo recupera a listagem completa.
5. Nenhum resultado é tratado como estado vazio, não como erro.

### Consultar detalhes

1. O estudante seleciona uma atividade.
2. A página apresenta descrição, categoria, data, local, organizador, capacidade, inscritos, vagas e status.
3. Um identificador inexistente é tratado como recurso não encontrado, e não como falha interna do servidor.
4. A pessoa consegue retornar à listagem sem perder a compreensão do fluxo.

### Realizar inscrição

1. O estudante abre uma atividade disponível.
2. Informa nome e e-mail.
3. Frontend e backend validam os dados dentro de suas responsabilidades.
4. O backend confirma a inscrição e atualiza a atividade em uma operação consistente.
5. A interface informa sucesso e apresenta imediatamente os novos números.
6. Em caso de atividade lotada, fechada, inexistente ou payload inválido, nenhuma inscrição é criada e uma mensagem adequada é apresentada.

## Contrato HTTP esperado

Prefixo da API: `/api`.

```http
GET   /api/activities
GET   /api/activities?search={term}
GET   /api/activities/{id}
PATCH /api/activities/{id}
POST  /api/activities/{id}/registrations
GET   /api/activities/{id}/registrations
```

Convenções esperadas:

- `200 OK` para consultas e atualizações bem-sucedidas.
- `201 Created` para inscrição criada.
- `400 Bad Request` para entrada inválida.
- `404 Not Found` para recurso inexistente.
- erro de negócio apropriado, como `409 Conflict`, quando a operação conflita com o estado atual.
- corpo JSON de erro com pelo menos uma propriedade `message` compreensível.

O contrato pode ser expandido por novas funcionalidades, desde que permaneça coerente e documentado.

## Ordenação e datas

Para a seção de próximas atividades, eventos futuros devem aparecer da data mais próxima para a mais distante. Atividades encerradas podem ser mantidas no catálogo quando isso fizer sentido, desde que não sejam confundidas com oportunidades abertas.

Datas são armazenadas e transportadas com informação suficiente para que o frontend apresente data e horário no formato local do usuário.

## Arquitetura atual

```text
Navegador
   ↓
React + TypeScript + Vite
   ↓ HTTP/JSON
Spring Boot + Spring Web
   ↓
Service / regras de negócio
   ↓
Spring Data JPA
   ↓
H2 em arquivo
```

O frontend utiliza React Router para navegação, TanStack Query para estado servidor e Axios para comunicação HTTP.

O backend utiliza uma arquitetura direta:

```text
controller/
service/
repository/
entity/
dto/
exception/
config/
```

A simplicidade é intencional. Mudanças devem melhorar o produto sem introduzir abstrações desproporcionais ao tamanho do projeto.

## Persistência e dados de demonstração

O banco H2 funciona em modo arquivo e é inicializado automaticamente. A base contém atividades abertas, próximas da lotação, lotadas e encerradas, distribuídas entre todas as categorias.

Os dados existem para permitir exploração de diferentes cenários. A aplicação não deve depender de configuração manual do banco nem de serviços externos.

## Requisitos de qualidade

- O projeto deve continuar compilando com Java 21 e Node.js 20 ou superior.
- Backend e frontend devem poder ser executados separadamente.
- Docker pode ser adicionado como alternativa, nunca como requisito único.
- Regras de negócio críticas devem permanecer no backend.
- Componentes de interface devem tratar loading, erro, sucesso e estados vazios quando aplicável.
- Alterações devem preservar tipagem e evitar duplicação desnecessária.
- Exceções devem ser traduzidas para respostas HTTP previsíveis.
- Operações que modificam múltiplos registros relacionados devem ser consistentes.
- Testes devem proteger as decisões mais relevantes da entrega.

## Fora de escopo obrigatório

- autenticação e autorização.
- integração com login institucional.
- pagamentos.
- envio real de e-mails.
- serviços em nuvem.
- filas, cache distribuído ou microsserviços.
- migração obrigatória para outro banco.

Esses temas somente devem ser adicionados quando houver justificativa forte, recorte compatível com o desafio e execução local simples.

## Possibilidades de evolução

O produto pode evoluir em muitas direções: gestão de inscrições, indicadores, novos fluxos para atividades lotadas, melhorias de acessibilidade, observabilidade, empacotamento, experiência de busca ou outras necessidades identificadas durante a exploração.

Essas possibilidades não formam um backlog pronto. Cabe ao participante formular o problema, definir critérios de aceite e justificar o valor da proposta.

## Definição de pronto

Uma alteração está pronta quando:

- atende à regra ou necessidade declarada na Issue.
- preserva os fluxos existentes.
- apresenta erros de maneira adequada.
- possui testes proporcionais ao risco.
- compila e executa no ambiente documentado.
- pode ser validada por outra pessoa seguindo o Pull Request.
- não depende de configuração não documentada.
- possui decisões e limitações relevantes registradas.
- declara eventual uso de inteligência artificial conforme o `CHALLENGE.md`.

## Como usar este documento

Este arquivo descreve o produto esperado, não o estado garantido da implementação atual. Divergências entre esta especificação e o comportamento observado devem ser investigadas.

Use evidências do código, dos testes, da API, da interface e do banco para formular suas Issues. Quando existir ambiguidade real, registre a interpretação adotada e a justificativa técnica no Pull Request.
