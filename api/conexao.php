




<?php
//LINK DE CONEXAO
// http://localhost/Trabalho-Web/paginas/gerenciamento.html

// Configurações padrão do XAMPP
$servidor = "localhost";
$usuario = "root";
$senha = ""; // No XAMPP a senha do root vem vazia por padrão
$banco = "minhocas"; // ATENÇÃO: Se você deu outro nome pro banco no Workbench, mude aqui!

// Cria a conexão
$conn = new mysqli($servidor, $usuario, $senha, $banco);

// Checa se deu erro e avisa
if ($conn->connect_error) {
    die("A conexão falhou. O XAMPP está ligado? Erro: " . $conn->connect_error);
}
?>