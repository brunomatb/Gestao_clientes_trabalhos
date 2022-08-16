<?php
//coleção de rotas //
$rotas = [
    'login' => 'login@login',
    'inicio' => 'main@index',
    'user_options' =>'user@userOptions',
    'clients' => 'cliente@getClients',
    'client' => 'cliente@getClient',
    'history_clients' => 'cliente@getHistoryClients',
    'deleted_client' =>'cliente@getDeletedClient',
    'trabalhos' => 'trabalho@getWorks',
    'colaboradores' => 'colaborador@getColaboradores'
];
    //define a rota padrão//
$acao = $rotas['inicio'];

    //se está defenido o método get da url o parametro a///
if(isset($_GET['a'])){
    //se a key do get de 'a' não esta dentro do array associativo
    if(!key_exists($_GET['a'], $rotas)){
    // a acao passa a ser o indice do array associativo de rotas onde o inicio corresponde a main@home//
        $acao = $rotas['inicio'];
    //caso contrario a variavel get recebe o que vem da query string do metodo get de 'a'//
    }else{
        $get = $_GET['a'];   
        // a variavel acao recebe o indice de rotas que vem do get de 'a'//
        $acao = $rotas[$get];
    }
}
// é feito um split da variavel "acao" que contem um indice do array associativo rotas//
$split = explode('@',$acao);
// a variavel controlador recebe o que esta na pasta controllers com o primeiro nome do valor do indice de rotas
$controlador = '\\core\\Controllers\\'.ucfirst($split[0].'Controller');
//variavel metodo recebe o segundo valor do split de acao//
$metodo = $split[1];
// a variavel ctr cria um novo controlador //
$ctr = new $controlador();
// executa o metodo dentro do controlador//
$ctr->$metodo();