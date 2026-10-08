# Dashboard Plano de Ação — V6.8.1

Versão de teste com a nova funcionalidade **Teste previstos**, voltada à leitura automática da planilha do Plano de Ação.

## Teste previstos

- Importação de `.xls`, `.xlsx` e CSV compatível.
- Arquivos `.xls` exportados como HTML são lidos diretamente pela tabela, evitando perda silenciosa de linhas.
- Leitura automática das colunas:
  - F — Superintendência (aceita também Superveniência)
  - K — Prazo original
  - L — Reprogramação
  - M — Data Real
  - N — Status
- Filtro por mês, ano ou período personalizado.
- Filtro por superintendência.
- Filtro de situação para a tabela detalhada.
- Cálculo automático de Previstas, Realizadas, Reprogramadas, Pendentes e Canceladas.
- Regra temporal baseada no Prazo original:
  - ação com prazo no período e Data Real até o fim do período = realizada;
  - conclusão antes do prazo também conta como realizada no mês do prazo;
  - conclusão alguns dias depois do prazo, mas até o fim do período, também conta como realizada;
  - sem Data Real e com Reprogramação = reprogramada;
  - sem Data Real/Reprogramação = pendente;
  - Status de cancelamento = cancelada.
- Ações com múltiplas superintendências aparecem em cada superintendência no detalhamento, mas são contadas uma única vez no total geral.
- Exportação do resultado filtrado para Excel.
- Impressão/PDF do relatório automático.

As funcionalidades anteriores do dashboard foram preservadas.

## Correções da V6.8.1

- O mês/período é selecionado exclusivamente pelo **Prazo original**.
- A seleção de ações previstas ocorre antes da classificação em realizada, reprogramada, pendente ou cancelada.
- Datas em formato brasileiro, ISO e número serial do Excel são normalizadas.
- Anos malformados como `0026` são normalizados para `2026` para não excluir silenciosamente a ação.
- O cabeçalho é localizado pelos nomes das colunas, sem depender apenas de posições fixas.
- A coluna de Superintendência reconhece `Superintendência` e `Superveniência`.
- A importação mostra a quantidade de ações carregadas e informa linhas sem Prazo válido.
- Foi adicionada uma conferência do período: ações selecionadas pelo Prazo original x ações classificadas.
- O total de Previstas agora é exatamente a quantidade de ações cujo Prazo original está dentro do período selecionado.

### Teste de referência com a planilha de 06/10/2026

A planilha atual contém **2.447 ações** e, considerando exclusivamente o Prazo original:

- Fevereiro/2026: **15 ações previstas**
- Março/2026: **104 ações previstas**

Esses números são usados como conferência da correção; não são valores fixados no código.
