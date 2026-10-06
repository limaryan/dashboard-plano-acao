# Dashboard Plano de Ação — V6.8

Versão de teste com a nova funcionalidade **Teste previstos**, voltada à leitura automática da planilha do Plano de Ação.

## Teste previstos

- Importação de `.xls`, `.xlsx` e CSV compatível.
- Leitura automática das colunas:
  - F — Superveniência
  - K — Prazo
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
