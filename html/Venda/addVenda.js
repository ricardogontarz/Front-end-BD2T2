//navbar


toggleButton.addEventListener('click', () => {
    navbar.classList.toggle('open');
    conteudo.style.marginLeft = navbar.classList.contains('open') ? '250px' : '0';
    document.getElementById('tabelaVendas').style.width = navbar.classList.contains('open') ? '100%' : '100%';
});
//


// Função para preencher o select com dados da API
// Função para preencher o select com dados da API
// Função para preencher o select com dados da API
async function preencherSelect(url, select) {
    try {
        // Verifique se o elemento foi encontrado
        if (!select) {
            console.error('Erro: Elemento de select não encontrado.');
            return;
        }

        const response = await fetch(url);
        const data = await response.json();

        console.log('Dados da API:', data);

        // Limpa as opções existentes
        select.innerHTML = '<option value="">Selecione uma opção</option>';

        // Verifica se 'data' é um array
        if (Array.isArray(data.data)) {
            // Preenche o select com os dados da API
            data.data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.codigo.toString(); // Substitua 'id' pelo campo desejado da API
                option.textContent = (select.name === 'itens') ? item.descricao : item.nome; // Substitua 'nome' pelo campo desejado da API
                select.appendChild(option);
            });
        } else {
            console.error('Erro: A propriedade "data" não é um array.');
        }
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

// Função para criar um novo item
async function criarNovoItem() {
    const container = document.getElementById('itensContainer');
    const novoItemContainer = document.createElement('div');
    novoItemContainer.className = 'input-group input-group-sm mb-3 item-container';

    const novoSelect = document.createElement('select');
    novoSelect.name = 'itens';
    novoSelect.className = 'form-control';
    novoSelect.setAttribute('aria-label', 'multiple select example');

    // Preencher o novo select com dados da API antes de adicioná-lo ao DOM
    await preencherSelect('http://localhost:8081/api/produtos', novoSelect);

    const novoInput = document.createElement('input');
    novoInput.type = 'number';
    novoInput.min = '1';
    novoInput.placeholder = 'Quantidade';
    novoInput.className = 'form-control';
    novoInput.setAttribute('aria-label', 'Sizing example input');

    novoItemContainer.appendChild(novoSelect);
    novoItemContainer.appendChild(novoInput);
    container.appendChild(novoItemContainer);
}

// Chama a função para preencher o select de funcionários ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
    preencherSelect('http://localhost:8081/api/funcionarios', document.getElementById('funcionario'));
    preencherSelect('http://localhost:8081/api/produtos', document.getElementById('itens'));
});

// Adiciona um novo conjunto de selects ao clicar no botão "Mais"
document.querySelector('.btnAddItem').addEventListener('click', criarNovoItem);

// Adiciona um ouvinte de evento para o formulário
const form = document.querySelector('.form-deleta');
if (form) {
    form.addEventListener('submit', cadastrarVenda);
}

async function cadastrarVenda(event) {
    try {
        event.preventDefault();

        const funcionarioSelect = document.getElementById('funcionario');
        const itensContainer = document.getElementById('itensContainer');
        const totalInput = document.getElementById('total');
        const horarioInput = document.getElementById('horario');

        // Obtenha o valor do campo de data/hora e converta para o formato desejado
        const horario = horarioInput ? new Date(horarioInput.value).toString() : null;

        const vendaData = {
            horario: horario,
            valor_total: 0,
            funcionarios_cod: funcionarioSelect.value
        };

        vendaData.itens = Array.from(itensContainer.querySelectorAll('.item-container')).map(itemContainer => {
            const select = itemContainer.querySelector('select');
            const input = itemContainer.querySelector('input');

            return {
                produto: select.value,
                quantidade: input.value || 1,
            };
        });

        // Realiza o POST para a API de vendas
        const vendaResponse = await fetch('http://localhost:8081/api/vendas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vendaData),
        });

        if (!vendaResponse.ok) {
            throw new Error('Erro ao cadastrar a venda.');
        }

        const codVenda = await obterUltimoCodigoVenda();

        if (codVenda) {
            await criarItensAssociados(vendaData.itens, codVenda);
            alert('Venda cadastrada com sucesso!');
            window.location.href = '../Venda/venda.html';
        } else {
            throw new Error('Erro ao obter o código da última venda.');
        }
    } catch (error) {
        console.error('Erro ao cadastrar a venda:', error.message || error);
        alert('Erro ao cadastrar a venda. Consulte o console para mais informações.');
    }
}

async function obterUltimoCodigoVenda() {
    try {
        const ultimaVendaResponse = await fetch('http://localhost:8081/api/vendas/');
        const vendasResponse = await ultimaVendaResponse.json();

        // Verifica se a resposta contém dados e se é um array
        if (vendasResponse && vendasResponse.data && Array.isArray(vendasResponse.data)) {
            const vendasClone = [...vendasResponse.data];

            vendasClone.sort((a, b) => new Date(b.horario) - new Date(a.horario));

            if (vendasClone.length > 0) {
                return vendasClone[0].codigo;
            } else {
                throw new Error('Nenhuma venda encontrada.');
            }
        } else {
            throw new Error('Resposta da API inválida.');
        }
    } catch (error) {
        throw new Error(`Erro ao obter o código da última venda: ${error.message || error}`);
    }
}

async function criarItensAssociados(itens, codVenda) {
    const itensPromises = itens.map(async item => {
        const valorParcial = calcularValorParcial(item);

        if (isNaN(valorParcial)) {
            console.error('Erro ao calcular o valor parcial do item.');
            return;
        }

        const itemData = {
            quantidade: item.quantidade,
            valor_parcial: valorParcial,
            vendas_cod: codVenda,
            produtos_cod: item.produto,
        };

        const itemResponse = await fetch('http://localhost:8081/api/itens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData),
        });

        if (!itemResponse.ok) {
            console.error('Erro ao cadastrar um item.');
        }
    });

    await Promise.all(itensPromises);
}

// Restante do código permanece inalterado

function calcularValorParcial(item) {
    const valorProduto = parseFloat(item.produto);
    const quantidade = parseFloat(item.quantidade);

    if (isNaN(valorProduto) || isNaN(quantidade)) {
        console.error('Erro ao converter valores para números.');
        return 0;
    }

    return valorProduto * quantidade;
}