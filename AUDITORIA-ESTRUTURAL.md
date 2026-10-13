# Auditoria estrutural — V6.8.8

## Problemas identificados na base V6.8.7

1. **Sidebar e grade:** a largura da sidebar era gravada diretamente em `#app.style.gridTemplateColumns`. Isso tem prioridade sobre a regra CSS `body.sidebar-collapsed #app`, então adicionar a classe de recolhimento nem sempre zerava a primeira coluna.
2. **Largura mínima do dashboard:** `.dashboard` tinha `min-width: 1000px`. Ao recolher a sidebar, a Apresentação de Resultados podia continuar maior que a área disponível e aparentar estar cortada.
3. **Altura forçada da grade:** regras anteriores mantinham `grid-template-rows: repeat(4, minmax(0, 1fr))`, altura fixa e alinhamento esticado, o que comprimia cartões com mais setores.
4. **Cartões e linhas:** os cartões usavam `overflow:hidden`, o que podia ocultar conteúdo quando a altura era comprimida.
5. **Impressão/PDF:** havia regra A4 com altura fixa e `overflow:hidden`, que podia cortar conteúdo além da página.
6. **PNG:** a exportação usa uma cópia do relatório com estilos próprios; a cópia precisa de largura controlada, altura automática e linhas que crescem pelo conteúdo.

## Correções implementadas

- Sincronizada a largura inline de `#app` com o estado aberto/recolhido da sidebar.
- Adicionada classe de escopo para a Apresentação de Resultados, evitando alterar os outros módulos.
- Removida a largura mínima de 1000px apenas na Apresentação de Resultados.
- Mantido o arranjo 2 colunas x 4 linhas em telas grandes, com alturas automáticas.
- Permitida quebra de linha dos nomes e expansão vertical dos cartões/linhas.
- PNG e impressão/PDF passam a usar altura automática e transbordamento visível.
- Em telas estreitas, a grade muda para uma coluna para evitar corte horizontal.

## Verificações realizadas

- `node --check js/app.js`: aprovado.
- Referência a `js/app.js` no `index.html`: presente.
- ZIP: integridade verificada.
- Base de dados: 8 grupos e 63 setores confirmados.

## Limitação da validação

A validação foi estática (código, estrutura, dados e arquivo ZIP). A renderização final em navegador, captura PNG e impressão/PDF ainda precisam ser conferidas no ambiente de publicação antes de considerar a versão aprovada visualmente.
