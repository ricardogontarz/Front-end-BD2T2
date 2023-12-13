

//navbar


toggleButton.addEventListener('click', () => {
    navbar.classList.toggle('open');
    conteudo.style.marginLeft = navbar.classList.contains('open') ? '250px' : '0';
  document.getElementById('tabelaVendas').style.width = navbar.classList.contains('open') ? '100%' : '100%';
});
//


const api = 'http://localhost:8081/api/vendas/';

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
    venda.horario.toString(),
    venda.valor_total.toString(),
    `<div style="text-align: center;">
        <button onclick="window.location.href='http://127.0.0.1:5500/Venda/Item/item.html?id=${venda.codigo}'" class="btn btn_lista">
            <span class="material-symbols-outlined">lists</span>
        </button>
        <button onclick="deletarVenda(${venda.codigo})" class="btn btn_delete" style="margin-left: 5px; color: red;">
            <span class="material-symbols-outlined">delete</span>
        </button>
    </div>`
  ]);
  

// Inicializar DataTable com os dados
const tabelaVendas = new DataTable('#tabelaVendas', {
  columns: [
      { title: 'ID' },
      { title: 'Data' },
      { title: 'Valor Total' },
      { title: 'Ações' }
  ],
  data: dadosParaDataTable
});

  } catch (erro) {
    console.error('Erro ao inicializar a tabela:', erro);
  }
};

//backup
 // Seu botão de backup
 var btnBackup = document.getElementById('btnBackup');
 var apiBackup = 'http://localhost:8081/api/backup/'

 // Adiciona um ouvinte de evento de clique ao botão
 btnBackup.addEventListener('click', function (event) {
   // Impede o comportamento padrão do link
   event.preventDefault();


   // Chamada à API usando o método fetch
   fetch(`${apiBackup}`, {
     method: 'POST', // ou 'GET' ou 'PUT' ou 'DELETE', dependendo da sua API
     headers: {
       'Content-Type': 'application/json', // Certifique-se de ajustar o tipo de conteúdo conforme necessário
       // Adicione quaisquer outros cabeçalhos necessários aqui
     },
     // Adicione qualquer corpo de requisição necessário aqui, por exemplo, dados JSON
     // body: JSON.stringify({}),
   })
   .then(response => {
     if (!response.ok) {
       throw new Error('Erro na chamada da API');
     }
     // Lida com o sucesso da chamada da API
     console.log('Backup realizado com sucesso!');
   })
   .catch(error => {
     // Lida com erros na chamada da API
     console.error('Erro ao realizar o backup:', error.message);
   });
 });


// Chamar a função para inicializar a tabela
inicializarTabela();

// Função para deletar uma venda
const deletarVenda = async (codigoVenda) => {
  try {
    const url = `http://localhost:8081/api/vendas/${codigoVenda}`;
    const resposta = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!resposta.ok) {
      throw new Error(`Erro na requisição: ${resposta.status}`);
    }

    // Optionally, you can handle the success case here

    alert(`Venda ${codigoVenda} deletada com sucesso.`);
    window.location.reload();
  } catch (erro) {
    console.error('Erro ao deletar a venda:', erro);
    throw erro;
  }
};
// Adicione a função para redirecionar para outra página
// produto.js


//
