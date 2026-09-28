# Dashboard Plano de Ação — V6

Aplicação web estática para GitHub Pages, sem banco de dados e sem custos de hospedagem além do próprio domínio, se houver.

## Novidades da V5.2

- Novo dashboard **Ações com Custo**.
- Campo manual **Ações totais do plano**.
- **Ações com custo** informadas manualmente no resumo geral.
- **Concluídas com custo** informadas manualmente no resumo geral.
- Percentual geral e por superintendência calculado automaticamente.
- Quando não houver ações com custo, o indicador mostra **N/A / Sem ações com custo**.
- Superintendências são apenas detalhamento e não alimentam o total geral, evitando dupla contagem de ações compartilhadas.
- Removidas as legendas auxiliares abaixo dos três cards superiores de custo.
- Todos os valores numéricos iniciais começam em **0**.
- Botão **Zerar valores** preserva nomes, meses, diretorias, superintendências e textos.
- Barra lateral pode ser recolhida e possui scroll independente do dashboard.
- Botão **Baixar Excel** exporta os dados em um arquivo `.xlsx` com abas separadas.
- Backup em JSON continua disponível.

## Abas exportadas para Excel

- Resumo
- Visao Geral
- Consolidado
- SG Diretorias
- Acoes com Custo

## Publicar no GitHub Pages

Suba o conteúdo desta pasta para a raiz do mesmo repositório usado anteriormente. Se o GitHub Pages já estiver configurado em `main / (root)`, basta substituir os arquivos e fazer o commit.

## Observação sobre Excel

A exportação `.xlsx` usa a biblioteca SheetJS Community Edition carregada pelo navegador através de CDN. Portanto, o usuário precisa estar conectado à internet no momento da exportação.


## Correção V5.2
- Indicadores de ações com custo agora exibem **N/A — Sem ações com custo** quando o total de ações com custo é 0, inclusive nos cards por superintendência.


## Novidades da V6 — Apresentação de Resultados

- Nova aba **Apresentação de Resultados** integrada ao mesmo dashboard.
- Oito grupos iniciais cadastrados exatamente conforme o cronograma fornecido.
- Edição de título e subtítulo do relatório.
- Edição de nome e data dos grupos.
- Edição de setores e horários.
- Adição e exclusão de grupos e setores.
- Reordenação de grupos e setores com controles ↑ / ↓.
- Pré-visualização em tempo real no próprio dashboard.
- Botão **Imprimir / PDF** usando a impressão do navegador.
- Validação de data, setor e horários antes da impressão.
- Exportação Excel agora inclui a aba **Apresentacao**.
- Backup JSON inclui os dados da apresentação.
- As funcionalidades anteriores da V5.2 permanecem disponíveis.

### Publicação

Substitua os arquivos da versão anterior pela pasta da V6 no mesmo repositório do GitHub Pages e faça um novo commit.
