document.addEventListener('DOMContentLoaded', function () {
    // URL da API
    const API_URL = 'C:/xampp/htdocs/vendas/php/api/produto/lista.php';


    // Elemento da tabela de produtos
    const tabelaProdutos = document.getElementById('tabelaProdutos');

    // Função para carregar produtos da API
    const carregarProdutos = () => {
        fetch('/vendas/php/api/produto/lista.php')
            .then(response => response.json())
            .then(data => {
                tabelaProdutos.innerHTML = '';

                if (data && data.length > 0) {
                    data.forEach(product => {
                        const row = tabelaProdutos.insertRow();
                        const [cellID, cellNome, cellPreco, cellDescricao, cellQuantidade, cellAcoes] = Array.from({ length: 6 }, (_, index) =>
                            row.insertCell(index)
                        );

                        // Preenche as células da tabela
                        cellID.textContent = product.produto_id;
                        cellNome.textContent = product.nome;
                        cellPreco.textContent = `R$ ${product.preco}`;
                        cellDescricao.textContent = product.descricao;
                        cellQuantidade.textContent = product.quantidade_estoque;

                        // Cria botões de edição e exclusão
                        const linkEditar = criarBotao('edit', 'light edita', product.produto_id);
                        const linkExcluir = criarBotao('delete', 'danger exclui', product.produto_id);

                        // Adiciona os botões à célula "Ações"
                        cellAcoes.appendChild(linkEditar);
                        cellAcoes.appendChild(criarEspacoEntre());
                        cellAcoes.appendChild(linkExcluir);

                        // Define ouvintes de eventos para os botões
                        linkExcluir.addEventListener('click', () => {
                            const productId = linkExcluir.getAttribute('data-product-id');
                            window.location.href= `excluiProduto.html?id=${productId}`;
                            
                        });

                        linkEditar.addEventListener('click', () => {
                            const productId = linkEditar.getAttribute('data-product-id');
                            window.location.href = `editaProduto.html?id=${productId}`;
                            
                        });
                    });
                } else {
                    criarLinhaVazia();
                }
            })
            .catch(error => {
                console.error('Erro ao carregar produtos:', error);
            });
    };

    // Função para criar botões
    const criarBotao = (icon, className, productId) => {
        const link = document.createElement('button');
        link.className = `btn btn-${className}`;
        link.setAttribute('data-product-id', productId);
        link.innerHTML = `<span class="material-symbols-outlined">${icon}</span>`;
        return link;
    };

    // Função para criar espaço entre elementos
    const criarEspacoEntre = () => {
        const espaceEntre = document.createElement('span');
        espaceEntre.textContent = "  ";
        return espaceEntre;
    };

    // Função para criar uma linha vazia na tabela
    const criarLinhaVazia = () => {
        const emptyRow = tabelaProdutos.insertRow();
        const emptyCell = emptyRow.insertCell(0);
        emptyCell.colSpan = 6;
        emptyCell.textContent = 'Nenhum produto encontrado.';
    };

    // Função para preencher o formulário de edição com dados do produto
    const preencherFormulario = (produtoId) => {
        fetch(`${API_URL}?id=${produtoId}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const produto = data.find(product => product.produto_id == produtoId);

                    if (produto) {
                        document.getElementById('produto_id').value = produto.produto_id;
                        document.getElementById('nome_form_editar').value = produto.nome;
                        document.getElementById('descricao_form_editar').value = produto.descricao;
                        document.getElementById('preco_form_editar').value = produto.preco;
                        document.getElementById('quantidade_estoque_form_editar').value = produto.quantidade_estoque;
                    } else {
                        console.error('Produto não encontrado.');
                    }
                } else {
                    console.error('Nenhum produto encontrado.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar detalhes do produto:', error);
            });
    };


    // Carrega a lista de produtos ao carregar a página
    carregarProdutos();


});

const navbar = document.getElementById('navbar');
const conteudo = document.getElementById('conteudo');
const toggleButton = document.getElementById('toggleButton');

toggleButton.addEventListener('click', () => {
    navbar.classList.toggle('open');
    conteudo.style.marginLeft = navbar.classList.contains('open') ? '250px' : '0';
});

const btnEditar = document.getElementsByClassName('.edita');

const btnPDF = document.getElementById('gerarPDFTabela');
btnPDF.addEventListener('click', () => {
    // Criação do PDF usando jsPDF e html2pdf
    const pdfElement = document.getElementById('tabelaPDF');

    const options = {
        margin: [10,10,10,10],
        filename: "tabelaProdutos.pdf",
        html2canvas: {scale: 2},
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },

    };
    html2pdf().set(options).from(pdfElement).save();
});

// produto.js


//
