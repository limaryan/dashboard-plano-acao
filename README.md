# Dashboard Plano de Ação — Versão 2

Aplicação web estática e editável para geração dos dashboards de acompanhamento do Plano de Ação.

## Novidades da V2

- Donuts mensais com as quatro categorias em cores: RL (verde), RP (azul), CA (amarelo) e PD (vermelho).
- Título "EVOLUÇÃO MENSAL" editável no painel.
- Título "CONCLUSÃO POR SUPERINTENDÊNCIA" editável no painel.
- Títulos dos dois dashboards editáveis separadamente.
- Subtítulo, período e data editáveis.
- Siglas e nomes de RL/RP/CA/PD editáveis.
- Adição e exclusão de meses e unidades.
- Exportação e importação dos dados em JSON.
- Salvamento automático no navegador.
- Compatibilidade de importação com JSON da V1.

## Publicar no GitHub Pages

1. Crie ou abra seu repositório no GitHub.
2. Envie todo o conteúdo desta pasta para a raiz do repositório.
3. Em `Settings > Pages`, selecione `Deploy from a branch`.
4. Selecione `main` e `/ (root)`.
5. Clique em `Save` e aguarde a publicação.

## Atualizar uma instalação da V1

Você pode substituir no repositório os arquivos `index.html`, `css/style.css`, `js/app.js`, `js/charts.js`, `js/calculations.js` e `README.md` pelos arquivos desta versão.

Os dados da V2 são armazenados sob uma nova chave no navegador. Caso queira reaproveitar dados da V1, exporte o JSON antigo e importe-o pela V2; a aplicação faz a conversão automaticamente.


## Novidades da versão 3
- No Panorama Consolidado, **Ações previstas** e **Ações realizadas** são calculadas automaticamente pela soma das superintendências/diretorias.
- **Ações totais do projeto** e **Realizadas até o período** são campos manuais e independentes do gráfico.
- Meses com **0 ações previstas** mostram **N/A** e a mensagem **Sem ações previstas no mês**. Os percentuais só são calculados quando o total previsto do mês é maior que zero.

## V4 — SG por Diretoria
- Removido o símbolo antes dos títulos.
- Novo dashboard SG por Diretoria.
- SG Geral aparece em destaque com evolução mensal maior.
- Cada diretoria possui sua própria evolução mensal em formato menor.
- Diretorias iniciais: Renata, Afra, Felipe e Paulo.
- É possível adicionar, excluir e renomear diretorias.
- PV = RL + RP + CA + PD.
- Quando PV = 0, o gráfico mostra N/A e informa que não há ações previstas.
