const gerarPDFButton = document.getElementById('gerarPDFTabela');

// Evento de clique para gerar PDF
gerarPDFButton.addEventListener('click', function () {
    const pdf = new jsPDF();
    const tabela = document.getElementById('tabelaProdutos'); // Use o ID correto da sua tabela de produtos
    pdf.autoTable({ html: tabela });
    pdf.save('tabela.pdf');
});
