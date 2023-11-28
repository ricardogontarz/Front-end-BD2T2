<?php
require_once('C:\xampp\htdocs\vendas\php\TCPDF-main\tcpdf.php');

// Dados da tabela (substitua pelos seus dados dinâmicos)
$dados = [
    ['ID', 'Nome do Produto', 'Preço', 'Descrição', 'Quantidade no Estoque'],
    [1, 'Produto A', 19.99, 'Descrição A', 50],
    [2, 'Produto B', 29.99, 'Descrição B', 30],
    // Adicione mais linhas conforme necessário
];

// Instancie a classe TCPDF
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// Adicione uma página ao PDF
$pdf->AddPage();

// Crie a tabela no PDF
$html = '<table border="1">';
foreach ($dados as $linha) {
    $html .= '<tr>';
    foreach ($linha as $celula) {
        $html .= '<td>' . $celula . '</td>';
    }
    $html .= '</tr>';
}
$html .= '</table>';

// Adicione a tabela ao PDF
$pdf->writeHTML($html, true, false, true, false, '');

// Defina o nome do arquivo
$nomeArquivo = 'relatorio_produtos.pdf';

// Saída do PDF para o navegador
$pdf->Output($nomeArquivo, 'D');
