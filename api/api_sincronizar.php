<?php
header('Content-Type: application/json');
require 'conexao.php';

// Recebe o array inteiro de minhocas do LocalStorage
$dadosLocais = json_decode(file_get_contents("php://input"), true);

// 1. Sincroniza do Front para o Banco (O Salva-vidas)
if (is_array($dadosLocais)) {
    // O comando ON DUPLICATE KEY UPDATE faz a mágica de criar se não existir, ou atualizar se já existir
    $stmt = $conn->prepare("INSERT INTO minhocas (id, nome, cor, progresso, velocidadeBase) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE nome = VALUES(nome), cor = VALUES(cor), progresso = VALUES(progresso), velocidadeBase = VALUES(velocidadeBase)");

    foreach ($dadosLocais as $m) {
        if(isset($m['id']) && isset($m['nome']) && isset($m['cor'])) {
            $prog = isset($m['progresso']) ? $m['progresso'] : 0;
            $vel = isset($m['velocidadeBase']) ? $m['velocidadeBase'] : 1;
            
            $stmt->bind_param("issdd", $m['id'], $m['nome'], $m['cor'], $prog, $vel);
            $stmt->execute();
        }
    }
    $stmt->close();
}

// 2. Puxa a verdade absoluta do Banco para devolver ao Front
$sql = "SELECT * FROM minhocas";
$resultado = $conn->query($sql);
$minhocasAtualizadas = array();

if ($resultado && $resultado->num_rows > 0) {
    while($linha = $resultado->fetch_assoc()) {
        $minhocasAtualizadas[] = $linha;
    }
}

// Devolve o pacote completo
echo json_encode(["status" => "sucesso", "minhocas" => $minhocasAtualizadas]);
$conn->close();
?>