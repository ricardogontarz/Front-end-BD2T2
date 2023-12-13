
document.addEventListener('DOMContentLoaded', function() {
//navbar


toggleButton.addEventListener('click', () => {
    navbar.classList.toggle('open');
    conteudo.style.marginLeft = navbar.classList.contains('open') ? '250px' : '0';
   document.getElementById('tabelaItens').style.width = navbar.classList.contains('open') ? '100%' : '100%';
});
//


const api = 'http://localhost:8081/api/itens';
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

const obterIdDaUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
};

// Função para inicializar a tabela com os dados obtidos
const inicializarTabela = async () => {
  try {
    // Obter o ID da URL
    const idDaUrl = obterIdDaUrl();

    // Verificar se o ID da URL está presente
    if (!idDaUrl) {
      console.error('ID da URL não encontrado.');
      return;
    }

    // Obter dados da API
    const dadosDaAPI = await obterDadosDaAPI();

    // Filtrar os dados com base no ID da URL
    const dadosFiltrados = dadosDaAPI.filter(item => item.vendas_cod == idDaUrl);

    // Mapear os dados filtrados para o formato esperado pelo DataTable
    const dadosParaDataTable = dadosFiltrados.map(venda => [
      venda.codigo.toString(),
      venda.quantidade.toString(),
      venda.valor_parcial.toString(),
      venda.produtos_cod.toString(),
    ]);

    // Inicializar DataTable com os dados filtrados
    const tabelaVendas = new DataTable('#tabelaItens', {
      columns: [
        { title: 'ID' },
        { title: 'Quantidade' },
        { title: 'Valor Parcial' },
        { title: 'ID Produto' }
      ],
      data: dadosParaDataTable
    });

  } catch (erro) {
    console.error('Erro ao inicializar a tabela:', erro);
  }
};


// Chamar a função para inicializar a tabela
inicializarTabela();


document.getElementById('vendaId').textContent = obterIdDaUrl();

});

//
