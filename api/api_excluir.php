<?php
header('Content-Type: application/json');
require 'conexao.php';

$dados = json_decode(file_get_contents("php://input"), true);

if(isset($dados['id'])) {
    
    $id = $dados['id'];

    // Comando letal: Apaga a linha onde o ID bate
    $stmt = $conn->prepare("DELETE FROM minhocas WHERE id = ?");
    
    // "i" = Integer (id)
    $stmt->bind_param("i", $id);

    if($stmt->execute()) {
        if($stmt->affected_rows > 0) {
            echo json_encode(["status" => "sucesso", "mensagem" => "Minhoca deletada do MySQL!"]);
        } else {
            echo json_encode(["status" => "alerta", "mensagem" => "Nenhuma minhoca encontrada com esse ID para excluir."]);
        }
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Erro no banco: " . $stmt->error]);
    }
    
    $stmt->close();
} else {
    echo json_encode(["status" => "erro", "mensagem" => "ID não fornecido para exclusão."]);
}

$conn->close();
?>