# Hub Universitário — Desafio Full Stack

Você acaba de entrar para a equipe responsável pelo Hub Universitário, um produto de extensão que centraliza oportunidades acadêmicas para estudantes.

A plataforma foi iniciada por outra equipe e já possui código, banco, interface e testes. O produto, porém, ainda está em fase de estabilização. Existem comportamentos incorretos, fluxos incompletos e oportunidades de evolução.

Sua missão é compreender o produto, investigar o repositório e entregar melhorias com qualidade. Não haverá uma lista pronta informando exatamente o que corrigir ou implementar: a capacidade de descobrir problemas, confrontar o código com as regras do produto e priorizar trabalho faz parte da avaliação.

Antes de começar, leia o [PROJECT.md](./PROJECT.md). Ele contém a história, o domínio, as jornadas e as expectativas funcionais do produto e deve ser tratado como fonte de verdade.

## Prazo

A entrega poderá ser realizada até **domingo, 23 de agosto de 2026, às 23h59**, no horário de Brasília (`America/Sao_Paulo`).


Entregas ou commits posteriores ao prazo poderão ser desconsiderados.

## O que será avaliado

- compreensão de código existente.
- investigação e reprodução de problemas.
- leitura das regras de produto.
- priorização dentro de tempo limitado.
- qualidade de Java, TypeScript e React.
- integração entre frontend, API e persistência.
- tratamento de erros e validação.
- uso e criação de testes.
- organização com Git e GitHub.
- clareza na comunicação técnica.

Não será avaliado apenas o volume de código. Uma entrega menor, correta, bem testada e bem explicada pode ser mais valiosa do que várias alterações incompletas.

## Sua investigação

O repositório não apresenta um backlog explícito aos participantes. Para construir o seu backlog:

1. Leia `PROJECT.md` e identifique as regras essenciais do produto.
2. Execute backend e frontend seguindo o `README.md`.
3. Explore as jornadas como uma pessoa usuária.
4. Consulte diretamente os endpoints quando isso ajudar a isolar o problema.
5. Execute os testes e interprete tanto os testes verdes quanto os que falham.
6. Compare comportamento observado, código, testes e expectativas do produto.
7. Registre cada descoberta relevante como bug, funcionalidade incompleta ou oportunidade de melhoria.
8. Priorize o que consegue entregar com qualidade dentro do tempo disponível.

Nem toda inconsistência tem a mesma importância. Considere impacto para o estudante, integridade dos dados, frequência do fluxo, risco técnico e custo de implementação.

## Entrega mínima obrigatória

Sua entrega deve demonstrar pelo menos dois fluxos completos de trabalho:

- uma correção de bug descoberta durante a investigação.
- uma funcionalidade essencial ausente ou incompleta, identificada a partir das regras do produto.

Para isso:

- crie pelo menos duas Issues, uma de bug e uma de feature.
- use pelo menos duas branches, uma para cada fluxo.
- abra pelo menos dois Pull Requests.
- relacione cada PR à Issue correspondente com `Closes #...` ou `Fixes #...`.
- descreva o problema, a investigação, a solução e como testar.
- não desenvolva diretamente na `main`.

Itens relacionados podem ser agrupados quando houver justificativa técnica. Não é necessário corrigir tudo o que encontrar.

## Melhorias autorais

Depois de atender à entrega mínima, você pode propor e implementar outras funcionalidades que façam sentido para o Hub Universitário.

Não existe uma lista fechada de extras. Uma boa proposta deve:

- resolver uma necessidade coerente com a história do produto.
- apresentar critérios de aceite antes da implementação.
- respeitar a arquitetura e as restrições descritas em `PROJECT.md`.
- preservar os fluxos existentes.
- incluir validação e testes proporcionais ao risco.
- explicar decisões, limitações e possíveis próximos passos.

Funcionalidades maiores podem ser entregues parcialmente, desde que o recorte esteja utilizável e claramente documentado. Infraestrutura opcional, como empacotamento em containers, também pode ser proposta, mas não deve tornar Docker obrigatório para executar o projeto.

## Uso de inteligência artificial

O uso de ferramentas de inteligência artificial é permitido para investigação, explicações, geração ou revisão de código, criação de testes e documentação.

O uso deve ser declarado de forma transparente em um arquivo `AI_USAGE.md` na raiz do repositório ou em uma seção claramente identificada nos Pull Requests. A documentação deve informar, no mínimo:

- ferramentas e modelos utilizados.
- em quais etapas a IA foi utilizada.
- resumo dos principais prompts ou objetivos solicitados.
- sugestões aceitas, adaptadas ou rejeitadas.
- arquivos ou partes da solução influenciados.
- como o participante revisou e validou o resultado.

Não é necessário publicar conversas completas nem informações sensíveis. O objetivo é permitir que a equipe compreenda o processo de trabalho e diferencie assistência de decisão técnica.

O participante continua responsável por todo o conteúdo entregue. Código gerado por IA deve ser compreendido, revisado, testado e compatível com as regras do projeto. Uso não documentado ou incapacidade de explicar a própria solução poderá impactar a avaliação qualitativa.

## Qualidade e testes

Execute antes de cada Pull Request:

```bash
cd apps/backend && ./mvnw test
cd apps/frontend && npm test
cd apps/frontend && npm run lint
cd apps/frontend && npm run build
```

A suíte faz parte da investigação. Alguns testes iniciais podem expressar comportamentos que o produto ainda não atende. Ao concluir uma alteração, os testes relacionados devem ficar verdes sem quebrar os fluxos existentes.

Adicione testes quando eles ajudarem a demonstrar uma regra, uma correção ou um cenário de erro. Não é esperada cobertura exaustiva dentro do tempo do desafio.

## Git e GitHub

Crie nomes de branch que comuniquem a intenção, por exemplo:

```text
fix/descricao-curta-do-problema
feat/descricao-curta-da-funcionalidade
```

Prefira commits pequenos e compreensíveis:

```text
fix: describe the corrected behavior
feat: add the selected product capability
test: cover the relevant business rule
```

Cada Pull Request deve conter:

- contexto e problema identificado.
- resumo técnico da solução.
- Issue relacionada.
- instruções de teste.
- evidências relevantes.
- riscos, limitações ou decisões importantes.
- declaração de uso de IA, quando aplicável.

Não há templates prontos. A forma como você organiza Issues e Pull Requests também faz parte da avaliação.

## Checklist de entrega

- [ ] Li o contexto e as regras em `PROJECT.md`.
- [ ] Executei e explorei a aplicação antes de alterar o código.
- [ ] Registrei ao menos uma Issue de bug e uma de feature.
- [ ] Trabalhei em pelo menos duas branches.
- [ ] Abri pelo menos dois Pull Requests associados às Issues.
- [ ] Documentei como testar cada entrega.
- [ ] Executei build, lint e testes relevantes.
- [ ] Documentei o uso de inteligência artificial ou declarei que não utilizei.
- [ ] Finalizei a entrega até 23/08/2026 às 23h59, horário de Brasília.

## Encerramento

Queremos observar como você entra em um produto que já existe: como aprende o domínio, encontra problemas, escolhe prioridades, valida hipóteses e comunica uma solução revisável.

Entregue qualidade antes de quantidade.
