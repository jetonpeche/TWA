<?php
    require '../header.php';
    require '../dialogueBD.php';

    $diag = new DialogueBD();

    echo json_encode($diag->ListerCommandant());
?>