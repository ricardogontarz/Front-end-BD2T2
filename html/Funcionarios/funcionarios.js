

//navbar


toggleButton.addEventListener('click', () => {
  navbar.classList.toggle('open');
  conteudo.style.marginLeft = navbar.classList.contains('open') ? '250px' : '0';
  document.getElementById('tabelaFuncionarios').style.width = navbar.classList.contains('open') ? '100%' : '100%';
});
//


const api = 'http://localhost:8081/api/funcionarios';

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
   // Mapear os dados para o formato esperado pelo DataTable
const dadosParaDataTable = dadosDaAPI.map(venda => [
  venda.codigo.toString(),
  venda.nome,
  venda.cpf.toString(),
  venda.funcao.toString(),
]);

// Inicializar DataTable com os dados
const tabelaVendas = new DataTable('#tabelaFuncionarios', {
  columns: [
      { title: 'ID' },
      { title: 'Nome' },
      { title: 'CPF' },
      { title: 'Função' }
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
