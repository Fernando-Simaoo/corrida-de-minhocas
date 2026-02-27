<?php
// Avisa que a resposta será em JSON
header('Content-Type: application/json');

// Traz a conexão com o banco
require 'conexao.php';

// Lê o JSON que o JavaScript vai mandar no corpo da requisição
$dados = json_decode(file_get_contents("php://input"), true);

// Verifica se os dados chegaram certinho
if(isset($dados['id']) && isset($dados['nome']) && isset($dados['cor'])) {
    
    $id = $dados['id'];
    $nome = $dados['nome'];
    $cor = $dados['cor'];
    $progresso = 0;
    $velocidade = 1;

    // Prepara a injeção no SQL (Os "?" protegem contra SQL Injection)
    $stmt = $conn->prepare("INSERT INTO minhocas (id, nome, cor, progresso, velocidadeBase) VALUES (?, ?, ?, ?, ?)");
    
    // "issdd" = Integer, String, String, Double, Double
    $stmt->bind_param("issdd", $id, $nome, $cor, $progresso, $velocidade);

    // Executa e responde ao JavaScript
    if($stmt->execute()) {
        echo json_encode(["status" => "sucesso", "mensagem" => "Minhoca gravada no MySQL com sucesso!"]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Erro no banco: " . $stmt->error]);
    }
    
    $stmt->close();
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Dados incompletos. Faltou ID, nome ou cor."]);
}

$conn->close();
?>