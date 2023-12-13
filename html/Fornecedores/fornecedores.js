

//navbar


toggleButton.addEventListener('click', () => {
  navbar.classList.toggle('open');
  conteudo.style.marginLeft = navbar.classList.contains('open') ? '250px' : '0';
  document.getElementById('tabelaFornecedores').style.width = navbar.classList.contains('open') ? '100%' : '100%';
});
//

const api = 'http://localhost:8081/api/fornecedores/';

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

    if (!dadosDaAPI) {
      console.error('Dados da API não disponíveis.');
      return;
    }

    // Mapear os dados para o formato esperado pelo DataTable
    const dadosParaDataTable = dadosDaAPI.map(produto => [
      produto.codigo.toString(),
      produto.nome
    ]);

    // Inicializar DataTable com os dados
    const tabelaProdutos = new DataTable('#tabelaFornecedores', {
      columns: [
        { title: 'ID' },
        { title: 'Nome' }
      ],
      data: dadosParaDataTable
    });
  } catch (erro) {
    console.error('Erro ao inicializar a tabela:', erro);
  }
};

// Chamar a função para inicializar a tabela
inicializarTabela();

      

// produto.js


//
