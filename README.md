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
