<?php
// Avisa que a resposta será em JSON
header('Content-Type: application/json');

// Traz a conexão com o banco
require 'conexao.php';

// Lê o pacote JSON enviado pelo JavaScript
$dados = json_decode(file_get_contents("php://input"), true);

// Verifica se recebemos o trio completo: ID, Nome e Cor
if(isset($dados['id']) && isset($dados['nome']) && isset($dados['cor'])) {
    
    $id = $dados['id'];
    $nome = $dados['nome'];
    $cor = $dados['cor'];

    // Prepara o comando UPDATE. O "WHERE id = ?" garante que só a minhoca certa vai mudar
    $stmt = $conn->prepare("UPDATE minhocas SET nome = ?, cor = ? WHERE id = ?");
    
    // "ssi" significa String (nome), String (cor), Integer (id)
    $stmt->bind_param("ssi", $nome, $cor, $id);

    // Executa o comando e responde pro JS
    if($stmt->execute()) {
        echo json_encode(["status" => "sucesso", "mensagem" => "Minhoca atualizada no MySQL com sucesso!"]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Erro no banco: " . $stmt->error]);
    }
    
    $stmt->close();
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Dados incompletos para atualização. Faltou ID, nome ou cor."]);
}

$conn->close();
?>