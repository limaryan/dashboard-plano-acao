# Dashboard Plano de Ação — V5

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
