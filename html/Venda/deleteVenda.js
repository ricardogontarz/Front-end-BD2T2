

//navbar

toggleButton.addEventListener('click', () => {
    navbar.classList.toggle('open');
    conteudo.style.marginLeft = navbar.classList.contains('open') ? '250px' : '0';
   // document.getElementById('tabelaVendas').style.width = navbar.classList.contains('open') ? '95%' : '100%';
});
//


const api = 'http://localhost:8081/api/itens/1';

// Função para obter dados da API
const obterDadosDaAPI = async () => {
  try {
    const resposta = await fetch(api);

    if (!resposta.ok) {
      throw new Error(`Erro na requisição: ${resposta.status}`);
    }

    const dados = await resposta.json();
    return dados.data;
  } catch (erro) {
    console.error('Erro ao obter dados da API:', erro);
    throw erro;
  }
};

// Função para inicializar a tabela com os dados obtidos
const inicializarTabela = async () => {
  try {
    // Obter dados da API
    const dadosDaAPI = await obterDadosDaAPI();

    // Mapear os dados para o formato esperado pelo DataTable
    const dadosParaDataTable = [
      [
        dadosDaAPI.codigo.toString(),
        dadosDaAPI.horario.toString(),
        dadosDaAPI.valor_total.toString(),
        dadosDaAPI.funcionarios_cod.toString()
      ]
    ];

    // Inicializar DataTable com os dados
    const tabelaProdutos = new DataTable('#tabelaItens', {
      columns: [
        { title: 'ID' },
        { title: 'ID Produto' },
        { title: 'Produto' },
        { title: 'Quantidade' },
        { title: 'Valor Parcial' }
      ],
      data: dadosParaDataTable
    });
  } catch (erro) {
    console.error('Erro ao inicializar a tabela:', erro);
  }
};

// Chamar a função para inicializar a tabela
inicializarTabela();
// Adicione a função para redirecionar para outra página
function redirecionarParaPagina(id) {
    window.location.href = `http://127.0.0.1:5500/Venda/Item/item.html?id=${id}`;
  }

// produto.js


//
