
const navbar = document.getElementById('navbar');
const conteudo = document.getElementById('conteudo');
const toggleButton = document.getElementById('toggleButton');

toggleButton.addEventListener('click', () => {
    navbar.classList.toggle('open');
    conteudo.style.marginLeft = navbar.classList.contains('open') ? '250px' : '0';
});

const preencherFormulario = () => {
    // Extract the produtoId from the URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const produtoId = params.id;

    console.log(produtoId)
    // Check if the produtoId is available in the URL
    if (!produtoId) {
        console.error('ID do produto não encontrado na URL.');
        return;
    }

    // Fetch and populate form fields
    fetch('http://localhost/vendas/php/api/produto/lista.php')
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const produto = data.find(product => product.produto_id == produtoId);

                if (produto) {
                    document.getElementById('produto_id').value = produto.produto_id;
                    document.getElementById('produto_id').readOnly = true;
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


// Call the function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', preencherFormulario);
