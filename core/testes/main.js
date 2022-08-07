$(document).ready(function () {
    getPais();
    initMaterialize();
    criarUser();
    validacao();
    userLogin();
    alterarPerfil();
    validaUserAlterarPerfil();
    alterarPass();
    fechaModalOnClick();
    /////index//////
    getCategoria();
    maximizarJanela();
    setResposta();
    preView();
    getAllRespostaTopico();
    getUserSession();
    editarRespostaTopico();
    closeUuserModalAlteração();
    getData();
    getSub_categoria();
    setCriarTopico();

});
function userLogin() {
    document.querySelector('#btn_login').addEventListener('click', function (e) {
        e.preventDefault();
        let textEmailregex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        let emailLogin = document.querySelector("input[name=emailLogin]").value;
        let passLogin = document.querySelector("input[name=passLogin]").value;
        debugger
        if (emailLogin.trim() === "") {
            document.querySelector("#email_validator").textContent = "Entrez l'e-mail";
            incorrectEmail();
            return false;
        }
        if(!textEmailregex.test(emailLogin)){
            document.querySelector("#email_validator").textContent = "Entrer un email valide";
            incorrectEmail();
            return false;
        }
        if (passLogin.trim() === "") {
            document.querySelector("#pass_validator").textContent = "Entrer le mot de passe";
            incorrectPass();
            return false;
        }
        let formData = new FormData(document.querySelector('#form_login'));
        formData.append('accao', 'userLogin')
        console.log(formData.get('emailLogin'));
        fetch('../core/Request.php', {
            method: 'POST',
            body: formData
        }).then((response) => {
            console.log(response);
            return response.json();
        }).then((jsonData) => {
            console.log(jsonData);
        });
    });
}
//pre format code//



//materialize//

function initMaterialize() {

    $('.sidenav').sidenav();
    $('select').formSelect({
        allowHtml: true
    });


    $('.modal-criar-conta').modal();
    $('.modal-registo-efetuado').modal(

    );

    $('.modal-login').modal();
    $('.modal-criar-reposta').modal({
        opacity: 0,
    });
    $('.modal-criar-topico').modal({
        opacity: 0,
    });
    $('.modal-editar-reposta-topico').modal({
        opacity: 0,
    });
    $('.modal-foto-invalida').modal();
    $('.modal-false-alteracoes-perfil').modal();
    $('.modal-true-alteracoes-perfil').modal({
        dismissible: false,
    });
    $('.modal-eliminar-topico').modal();
    $('.modal-true-alteracoes-pass').modal({
        dismissible: false,
    }
    );
    $('.collapsible').collapsible();

    $('.dropdown-trigger').dropdown({
        coverTrigger: false,

    });
    $('.btn-seleciona-categorias').dropdown({
        closeOnClick: false,
        coverTrigger: false,

    });
    $('.btn-dropdown-pesquisa').dropdown({
        closeOnClick: false,
        coverTrigger: false,


    });

    $('.tabs').tabs();
    $('.tooltipped').tooltip();

    $(document).ready(function () {

        $('.datepicker').datepicker({
            container: 'body',
            closeOnClick: false,
            dismissible: false

        });
    });


}



var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos < currentScrollPos) {
        document.getElementById("nav_bar").style.top = "0px";
    }
    if (currentScrollPos === 0) {
        document.getElementById("nav_bar").style.top = "30px";
    }
    prevScrollpos = currentScrollPos;
}
//get country API//
function getPais() {
    //chama o método ajax //
    $.ajax({
        type: "GET",
        dataType: 'JSON',
        //end point da web api//
        url: "https://restcountries.com/v3.1/all",
        success: function (reposta) {
            debugger
            console.log(reposta);
            let i = 1;
            let option = $('.pais-input');
            let alterar_pais = $('.alterar-pais');
            $(option).append("<option disabled selected>Selecione o país</option>");
            console.log(reposta);
            $.each(reposta, function (i, value) {
                $(option).append("<option data-icon='" + value.flags.png + "'>" + value.name.common + "</option>");
                $(alterar_pais).append("<option data-icon='" + value.flags.png + "'>" + value.name.common + "</option>");
            });
            option.formSelect();
            alterar_pais.formSelect();
        }
    });
}
// função para criar user //
function criarUser() {
    $(document).on('click', '#criar_cliente', function (event) {
        event.preventDefault();
        if (validaPass() === false || validaPass2() === false || $('#email_span_val').html() !== 'OK' || $('#userName-span').html() !== 'OK') {
            return false;
        }
        let formData = new FormData($('#form_criar_conta')[0]);
        formData.append('accao', 'criaconta')
        console.log(formData.get('email'));
        $.ajax({
            url: '../core/Request.php',
            type: 'POST',
            processData: false,
            contentType: false,
            data: formData,
            beforeSend: function () {
                $('#criar_cliente').html('<i><img src="../public/assets/images/gif/load.gif" class="load-gif-criar-conta"/></i> CRIAR CONTA');
            },
            success: function (data) {
                console.log(data);
                debugger
                if (data === 'foto exede 2MB') {
                    $('#foto_val_input').removeClass().addClass('validate-inv');
                    $('#span_valida_img').html('Verifique tamanho da foto, superior a 2MB');
                    $('#criar_cliente').html('CRIAR CONTA');
                    return false;
                }
                $('#criar_cliente').html('CRIAR CONTA');
                $('.modal-criar-conta').modal('close');
                $('.modal-registo-efetuado').modal('open');
            }
        });
    });
}

// função para validar a password //
function validaPass() {

    let valida = true
    let pass = $('input[name="pass1"]').val();
    if ($.trim(pass.length) < 8) {

        $('#password').removeClass().addClass('validate-inv');
        $('#span-valida-pass').html('Comprimento da password deve ter no minimo 8 caracteres')
        valida = false;
    }
    if (!pass.match(".*[A-Z].*")) {
        $('#password').removeClass().addClass('validate-inv');
        $('#span-valida-pass').html('A pass deve ter pelo menos uma letra em maiuscula')
        valida = false;
    }
    if (!pass.match(".*[a-z].*")) {
        $('#password').removeClass().addClass('validate-inv');
        $('#span-valida-pass').html('A pass deve ter pelo menos uma letra em minusculo')
        valida = false;
    }

    if ($('input[name="pass1"]').val() === "") {
        $('#password').removeClass().addClass('pass1');
        $('#span-valida-pass').html('Senha deve ter pelo menos 8 caracteres, uma letra maiuscula, uma letra minuscula e um caracter especial')
        valida = false;
    }

    if ($.trim(pass.length) > 8 && $.trim(pass).match(".*[A-Z].*") && $.trim(pass.match(".*[a-z].*"))) {
        $('#password').removeClass().addClass('validate-val');
        $('#span-valida-pass').html('OK')
        valida = true;
    }
    return valida;
}
// função para validar a password de confirmação //
function validaPass2() {
    debugger
    let valida = true
    if ($.trim($('input[name="pass2"]').val()) === $.trim($('input[name="pass1"]').val())) {
        $('#password2').removeClass().addClass('validate-val');
        $('#span-valida-pass2').html('OK')
        valida = true;

    }
    if ($.trim($('input[name="pass2"]').val()) !== $.trim($('input[name="pass1"]').val())) {
        $('#password2').removeClass().addClass('validate-inv');
        $('#span-valida-pass2').html('A confirmação deve ser igual á password');
        valida = false;
    }
    if ($.trim($('input[name="pass2"]').val().length) < 1) {
        $('#password2').removeClass().addClass('pass1');
        $('#span-valida-pass2').html('');
        valida = false;
    }
    return valida;
}


// valida email//
function validaEmail() {
    let regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    let email = $.trim($('input[name="email"]').val());
    if (email === "") {
        $('#email').removeClass().addClass('validate');
        $('#email_span_val').html('Nunca visível');
        return false;
    }

    if (!regex.test($.trim($('input[name="email"]').val()))) {
        $('#email').removeClass().addClass('validate-inv');
        $('#email_span_val').html('Por favor introduza um email válido');
        return false;
    }
    debugger

    $.ajax({
        url: '../core/Request.php',
        type: 'POST',
        data: '&accao=validaemail&email=' + email,
        success: function (data) {
            debugger
            if (data !== "") {

                if (parseInt(data) === 1) {
                    $('#email').removeClass().addClass('validate-inv');
                    $('#email_span_val').html('Email já se encontra registado, verifique se está correto ou efetue login');
                    return false;
                }
                if (parseInt(data) === 0) {
                    $('#email').removeClass().addClass('validate-val');
                    $('#email_span_val').html('OK');
                }
            }
        }
    });
}
//valida se user existe //
function validaUser() {
    let userName = $.trim($('input[name="userName"]').val());
    if (userName === "") {
        $('#userName').removeClass().addClass('validate');
        $('#userName-span').html('Nome de utilizador');
        return false;
    }


    $.ajax({
        url: '../core/Request.php',
        type: 'POST',
        data: '&accao=validaUser&userName=' + userName,
        success: function (data) {
            debugger
            if (data !== "") {

                if (parseInt(data) === 1) {
                    $('#userName').removeClass().addClass('validate-inv');
                    $('#userName-span').html('Username não disponivel, tente outro');
                    return false;
                }
                if (parseInt(data) === 0) {
                    $('#userName').removeClass().addClass('validate-val');
                    $('#userName-span').html('OK');
                }
            }
        }
    });
}



// valida o tipo de imagem //
function validaImg() {
    let valida = false;
    debugger
    let regex = /\.(gif|jpe?g|tiff?|png)$/i;
    if (!regex.test($.trim($('input[name="foto"]').val()))) {
        $('#foto_val_input').removeClass().addClass('file-path validate-inv');
        $('#span_valida_img').html('Selecione uma imagem válida, jpeg, jpg ou png');
        valida = false;
    } else {
        $('#foto_val_input').removeClass().addClass('file-path validate-val');
        $('#span_valida_img').html('OK');
        valida = true;

    }
    return valida;
}

// função para efetuar login //

function userLogin() {

    $(document).on('click', '#btn_login', function (event) {
        event.preventDefault();
        debugger
        if ($.trim($('input[name="nomeUserLogin"]').val()) === "") {
            $('#nome_user_login').removeClass().addClass('validate-inv');
            $('#span_valida_user').html('* Preencha o username');
            return false;
        }
        if ($.trim($('input[name="userPassLogin"]').val()) === "") {
            $('#user_pass_login').removeClass().addClass('validate-inv');
            $('#span_valida_login').html('* Preencha a password');
            return false;
        }
        let formData = new FormData($('#form_login')[0]);
        debugger
        formData.append('accao', 'login');
        $.ajax({
            url: '../core/Request.php',
            type: 'POST',
            processData: false,
            contentType: false,
            data: formData,
            beforeSend: function () {
                $('#btn_login').html('<i><img src="../public/assets/images/gif/load.gif" class="load-gif-criar-conta"/></i> LOGIN');
            },
            success: function (response) {
                debugger
                if (parseInt(response) === 0) {
                    $('#user_pass_login').removeClass().addClass('validate-inv');
                    $('#nome_user_login').removeClass().addClass('validate-inv');
                    $('#span_valida_login').html('User ou password errados');
                    $('#btn_login').html('LOGIN');
                    return false;
                } else {
                    $('.modal-login').modal('close');
                    $('#btn_login').html('LOGIN');
                    location.reload();
                }
            }
        });
    });
}

// valida user alterar perfil //

function validaUserAlterarPerfil() {

    let userNamePerfil = $.trim($('input[name="alterarUser"]').val());

    debugger
    if (userNamePerfil === "") {
        $('#alterar_user').removeClass().addClass('validate-inv');
        $('#alterar_user_span').html('* Campo obrigatório');
        return false;
    }
    $.ajax({
        url: '../core/Request.php',
        type: 'POST',
        data: '&accao=validaUserPerfil&userNamePerfil=' + userNamePerfil,
        success: function (data) {
            debugger
            if (data !== "") {

                if (parseInt(data) === 1) {
                    $('#alterar_user').removeClass().addClass('validate-inv');
                    $('#alterar_user_span').html('Username não disponivel, tente outro');
                    return false;
                }
                if (parseInt(data) === 0 || parseInt(data) === 2) {
                    if ($('#alterar_user').prop("disabled") === true) {

                    } else {
                        $('#alterar_user').removeClass().addClass('validate-val');
                        $('#alterar_user_span').html('OK');
                    }
                }
            }
        }
    });
}

// valida user alterar nome  //

function validaNomeAlterarPerfil() {
    let userNamePerfil = $.trim($('input[name="alterarNome"]').val());
    if (userNamePerfil === "") {
        $('#alterar_nome').removeClass().addClass('validate-inv');
        $('#alterar_nome_span').html('* Campo obrigatório');
        return false;
    } else {
        $('#alterar_nome').removeClass().addClass('validate-val');
        $('#alterar_nome_span').html('OK');
    }
}
let valorInicialUser = $('#alterar_user').val();
let valorInicialNome = $('#alterar_nome').val();
let valorInicialPais = $('#alterar_pais').val();



function alterarPerfil() {
    $(document).on('click', '#guardar_alteracoes_perfil', function (evt) {
        debugger
        evt.preventDefault();

        if ($('#alterar_user').val() === valorInicialUser && $('#alterar_nome').val() === valorInicialNome && $(".pais_atual_option").val() === valorInicialPais) {
            $('.modal-false-alteracoes-perfil').modal('open');
            return false;
        }
        let formData = new FormData($('#form_alterar_perfil')[0]);

        formData.append('accao', 'alterarPerfil');
        $.ajax({
            url: '../core/Request.php',
            type: 'POST',
            processData: false,
            contentType: false,
            data: formData,
            beforeSend: function () {
                $('#guardar_alteracoes_perfil').html('<i><img src="../public/assets/images/gif/load.gif" class="load-gif-criar-conta"/></i> Guardar alteraçãoes');
            },
            success: function (data) {
                debugger
                console.log(data);
                $('#guardar_alteracoes_perfil').html('Guardar alteraçãoes');
                if (data === "Erro no request alterarUser") {
                    $('.modal-false-alteracoes-perfil').modal('open');
                    return false;
                }
                if (data === "sem alteracoes") {
                    $('.modal-false-alteracoes-perfil').modal('open');
                    return false;
                }
                if (data === 'erro na foto') {
                    $('#foto_val_input_alterar').removeClass().addClass('validate-inv');
                    $('#span_valida_img_alterar').html('Formato não suportado, introduza uma foto com formato suportado.');

                    return false;
                }
                if (data === 'foto exede 2MB') {
                    $('#foto_val_input_alterar').removeClass().addClass('validate-inv');
                    $('#span_valida_img_alterar').html('Verifique tamanho da foto, superior a 2MB');

                    return false;
                }
                if (data === 'user existe') {
                    $('#alterar_user').removeClass().addClass('validate-inv');
                    $('#alterar_user_span').html('Username não disponivel, tente outro');

                    return false;
                }
                if (data === 'sem sessao') {
                    $('.modal-true-alteracoes-perfil').modal('open');
                }

            }
        });
    });

}

function closeUuserModalAlteração() {
    $(document).on('click', '#concluirAlteracaoUser', function () {
        $('.modal-true-alteracoes-perfil').modal('close');
        window.location.replace('index.php');
    });
}

function validaPassNova() {

    let valida = true
    let pass = $('input[name="alterarNovaPass"]').val();
    if ($.trim(pass.length) < 8) {

        $('#alterar_nova_pass').removeClass().addClass('validate-inv');
        $('#span-valida-altera-nova-pass').html('Comprimento da password deve ter no minimo 8 caracteres')
        valida = false;
    }
    if (!pass.match(".*[A-Z].*")) {
        $('#alterar_nova_pass').removeClass().addClass('validate-inv');
        $('#span-valida-altera-nova-pass').html('A pass deve ter pelo menos uma letra em maiuscula')
        valida = false;
    }
    if (!pass.match(".*[a-z].*")) {
        $('#alterar_nova_pass').removeClass().addClass('validate-inv');
        $('#span-valida-altera-nova-pass').html('A pass deve ter pelo menos uma letra em minusculo')
        valida = false;
    }

    if ($('input[name="alterarNovaPass"]').val() === "") {
        $('#alterar_nova_pass').removeClass().addClass('alterarNovaPass');
        $('#span-valida-altera-nova-pass').html('Senha deve ter pelo menos 8 caracteres, uma letra maiuscula, uma letra minuscula e um caracter especial')
        valida = false;
    }

    if ($.trim(pass.length) > 8 && $.trim(pass).match(".*[A-Z].*") && $.trim(pass.match(".*[a-z].*"))) {
        $('#alterar_nova_pass').removeClass().addClass('validate-val');
        $('#span-valida-altera-nova-pass').html('OK')
        valida = true;
    }
    return valida;
}

function validaPassNova2() {
    debugger
    let valida = true
    if ($.trim($('input[name="alterarConfirmarPass"]').val()) === $.trim($('input[name="alterarNovaPass"]').val())) {
        $('#alterar_confirmar_pass').removeClass().addClass('validate-val');
        $('#span-valida-confirma-altera-pass').html('OK');
        valida = true;

    }
    if ($.trim($('input[name="alterarConfirmarPass"]').val()) !== $.trim($('input[name="alterarNovaPass"]').val())) {
        $('#alterar_confirmar_pass').removeClass().addClass('validate-inv');
        $('#span-valida-confirma-altera-pass').html('A confirmação deve ser igual á password');
        valida = false;
    }
    if ($.trim($('input[name="alterarConfirmarPass"]').val().length) < 1) {
        $('#alterar_confirmar_pass').removeClass().addClass('alterarNovaPass');
        $('#span-valida-confirma-altera-pass').html('');
        valida = false;
    }
    return valida;
}



function alterarPass() {
    $(document).on('click', '#guardar_alteracoes_pass', function (evt) {
        debugger
        evt.preventDefault();


        if (validaPassNova() === false || validaPassNova2() === false || $.trim($('#pass_atual').val()) === "") {
            return false;
        }

        let formData = new FormData($('#form_alterar_pass')[0]);
        formData.append('accao', 'alterarPass');
        $.ajax({
            url: '../core/Request.php',
            type: 'POST',
            processData: false,
            contentType: false,
            data: formData,
            beforeSend: function () {
                $('#guardar_alteracoes_pass').html('<i><img src="../public/assets/images/gif/load.gif" class="load-gif-criar-conta"/></i> Guardar alteraçãoes');
            },
            success: function (data) {
                $('#guardar_alteracoes_pass').html('Guardar alteraçãoes');
                console.log(data);
                if (data === 'pass atual errada') {
                    $('#pass_atual').removeClass().addClass('validate-inv');
                    $('#span-valida-atual-pass').html('Password atual errada. Introduza a sua password.');
                    return false;
                } else {
                    $('#pass_atual').removeClass().addClass('validate-val');
                    $('#span-valida-atual-pass').html('OK')

                }
                if (data === 'nova pass igual') {
                    $('#alterar_nova_pass').removeClass().addClass('validate-inv');
                    $('#span-valida-altera-nova-pass').html('Password deve ser diferente da atual.');
                } else {
                    $('#alterar_nova_pass').removeClass().addClass('validate-val');
                    $('#span-valida-altera-nova-pass').html('OK');
                }
                if (data === 'sem sessao') {
                    $('.modal-true-alteracoes-pass').modal('open');

                }
            }
        });
    });
}

function fechaModalOnClick() {
    $(document).on('click', '#close_modal_altera_pass', function () {
        window.location.replace('index.php');
    });
}


function validacao() {

    $(document).on('click', '.close-error-reposta-vazia', function () {
        $('.div-erro-reposta').empty().hide();
    });
    $('input[name="pass1"]').keyup(function () {
        validaPass();
        validaPass2();
    });
    $('input[name="pass2"]').keyup(function () {
        validaPass2();
    });
    $('input[name="alterarNovaPass"]').keyup(function () {
        validaPassNova();
        validaPassNova2();
    });
    $('input[name="alterarConfirmarPass"]').keyup(function () {
        validaPassNova2();
    });
    $(document).on('keyup', 'input[name="email"]', function () {
        validaEmail();
    });
    $('input[name="foto"]').change(function () {
        validaImg();
    });
    $('input[name="userName"]').keyup(function () {
        validaUser();
    });
    $('input[name="alterarUser"]').keyup(function () {
        validaUserAlterarPerfil();
    });
    $('input[name="alterarNome"]').keyup(function () {
        validaNomeAlterarPerfil();
    });
    $('input[name="nomeUserLogin"]').click(function () {
        $('#nome_user_login').removeClass().addClass('validate');
        $('#span_valida_user').html('');
    });
    $('input[name="userPassLogin"]').click(function () {
        $('#user_pass_login').removeClass().addClass('validate');
        $('#span_valida_login').html('');
    });

    let valorInicialUser = $('#alterar_user').val();
    $('#alterar_user_fa-edit').click(function () {

        if ($('#alterar_user').prop("disabled") === true) {
            $('#alterar_user').prop("disabled", false);
            $('#alterar_user').addClass("validate");
            $('#alterar_user_fa-edit').addClass('user-editar-fa');
        } else {
            if ($('#alterar_user').val() === "") {
                return false;
            } else {
                $('#alterar_user').prop("disabled", true);
                $('#alterar_user').removeClass();
                $('#alterar_user').val(valorInicialUser);
                $('#alterar_user_fa-edit').removeClass('user-editar-fa');
                $('#alterar_user_span').html("");
            }

        }
    });
    let valorInicialNome = $('#alterar_nome').val();
    $('#alterar_nome_fa-edit').click(function () {

        if ($('#alterar_nome').prop("disabled") === true) {
            $('#alterar_nome').prop("disabled", false);
            $('#alterar_nome').addClass("validate");
            $('#alterar_nome_fa-edit').addClass("user-editar-fa");
        } else {
            if ($('#alterar_nome').val() === "") {
                return false;
            } else {
                $('#alterar_nome').prop("disabled", true);
                $('#alterar_nome').removeClass();
                $('#alterar_nome').val(valorInicialNome);
                $('#alterar_nome_fa-edit').removeClass("user-editar-fa");
            }
        }
    });
    $('#alterar_pais').prop("disabled", true)
    let valorInicialPais = $('.alterar-pais-div ul li span').html();
    $('#alterar_pais_fa-edit').click(function () {

        if ($('#alterar_pais').prop("disabled") === true) {
            $('#alterar_pais').prop("disabled", false);
            $('#alterar_pais').addClass("validate");
            $('#alterar_pais_fa-edit').addClass('user-editar-fa');
            getPais();
        } else {
            $('#alterar_pais').prop("disabled", true);
            $('.alterar-pais-div input').prop("disabled", true);
            $('#alterar_pais').removeClass("validate");
            $('.alterar-pais-div ul li span').html(valorInicialPais);
            $('#alterar_pais_fa-edit').removeClass("user-editar-fa");
        }
    });


    $('#pass_atual').prop("disabled", true)
    let pass_atual = $('#pass_atual').val();
    $('#alterar_pass_fa-edit').click(function () {

        if ($('#pass_atual').prop("disabled") === true) {
            $('#pass_atual').prop("disabled", false);
            $('#alterar_nova_pass').prop("disabled", false);
            $('#alterar_confirmar_pass').prop("disabled", false);
            $('#pass_atual').addClass("validate");
            $('#alterar_pass_fa-edit').addClass('user-editar-fa');

        } else {
            $('#pass_atual').prop("disabled", true);
            $('#alterar_nova_pass').prop("disabled", true);
            $('#alterar_confirmar_pass').prop("disabled", true);
            $('#pass_atual').removeClass();
            $('#alterar_nova_pass').removeClass();
            $('#alterar_confirmar_pass').removeClass();
            $('#alterar_nova_pass').val("");
            $('#alterar_confirmar_pass').val("");
            $('#span-valida-altera-nova-pass').html("");
            $('#span-valida-confirma-altera-pass').html("");
            $('.pass-atual').val(pass_atual);
            $('#alterar_pass_fa-edit').removeClass("user-editar-fa");
            $('#alterar_pass_fa-edit').html("");
        }
    });
}


//////////////////////////////index ////////////////////////////////////////////////////

function getCategoria() {

    $.ajax({
        url: '../core/Request.php',
        type: 'POST',
        data: 'accao=getCategoria',
        success: function (data) {

            let option = $('.selecionar-categoria');
            $(option).append("<option data-icon='../public/assets/images/icon-programacao.png' class='left'><div class='square'></div> Programação</option>");

            $.each(data, function (i, value) {
                $(option).append("<option>" + value.name + "</option>");

            });

            option.formSelect();

        }
    });
}



$(document).ready(function () {
    debugger
    $('#resposta').trumbowyg({
        plugins: {
            resizimg: {
                minSize: 64,
                step: 16,
            }
        },
        btns: [
            ['strong'],
            ['em'],
            ['upload'],
            ['unorderedList'],
            ['orderedList'],
            ['emoji'],
            ['viewHTML', 'preformatted'],
            ['removeformat'],
            ['fullscreen']
        ],


        plugins: {

            upload: {
                serverPath: '../core/Request.php',
                fileFieldName: 'fileToUpload',
                urlPropertyName: 'url',

            }
        }
    });
});

$(document).ready(function () {
    debugger
    $('#criar_topico').trumbowyg({
        plugins: {
            resizimg: {
                minSize: 64,
                step: 16,
            }
        },
        btns: [
            ['strong'],
            ['em'],
            ['upload'],
            ['unorderedList'],
            ['orderedList'],
            ['emoji'],
            ['viewHTML', 'preformatted'],
            ['removeformat'],
            ['fullscreen']
        ],


        plugins: {

            upload: {
                serverPath: '../core/Request.php',
                fileFieldName: 'fileToUpload',
                urlPropertyName: 'url',

            }
        }
    });
});

$(document).ready(function () {
    debugger
    $('#editar_resposta_topico').trumbowyg({
        plugins: {
            resizimg: {
                minSize: 64,
                step: 16,
            }
        },
        btns: [
            ['strong'],
            ['em'],
            ['upload'],
            ['unorderedList'],
            ['orderedList'],
            ['emoji'],
            ['viewHTML', 'preformatted'],
            ['removeformat'],
            ['fullscreen']
        ],


        plugins: {

            upload: {
                serverPath: '../core/Request.php',
                fileFieldName: 'fileToUpload',
                urlPropertyName: 'url',

            }
        }
    });
});
function maximizarJanela() {
    $(document).on('click', '#maximiza_resposta', function () {
        debugger
        $('.modal-criar-reposta').css("height", "100%");
        $('#maximiza_resposta').addClass('minimiza-resposta');
        $('#maximiza_resposta').removeAttr('id');
        $('.trumbowyg-box').css('height', '500px');
        $('.trumbowyg-editor').css('height', '461px');


    });

    $(document).on('click', '.minimiza-resposta', function () {
        debugger
        $('.modal-criar-reposta').css("height", "50%");
        $('.minimiza-resposta').attr('id', 'maximiza_resposta');
        $('.minimiza-resposta').removeClass('minimiza-resposta');
        $('.trumbowyg-box').css('height', '185px');
        $('.trumbowyg-editor').css('height', '145px');


    });
}

//guarda resposta na BD //
function setResposta() {
    $(document).on('click', '#btn_salvar_resposta', function () {
        debugger
        let reposta = $('#resposta').val();
        console.log(reposta);

        if ($.trim(reposta) === "") {
            const newLocal = 500;
            $('.div-erro-reposta').empty().hide().append('<span class="erro-reposta-vazio">Reposta não pode estar vazia <i class="close-error-reposta-vazia fas fa-window-close"></i></span>').fadeIn(newLocal);
            return false;
        }

        let formData = new FormData($('#form_criar_reposta')[0]);
        formData.append('accao', 'setResposta');
        formData.append('id_topico', $('.id_topico_form').attr('id'));
        formData.getAll('resposta');
        console.log(formData);

        $.ajax({
            url: '../core/Request.php',
            type: 'POST',
            processData: false,
            contentType: false,
            data: formData,
            beforeSend: function () {
                $('#btn_salvar_resposta').html('<i><img src="../public/assets/images/gif/load.gif" class="load-gif-criar-conta"/></i> Responder');
            },
            success: function (data) {
                debugger
                console.log(data);
                $('#btn_salvar_resposta').html('<i class="fas fa-reply"></i> Responder');
                $('#resposta').val("");
                $('.trumbowyg-editor').html('');
                $('.modal-criar-reposta').modal('close');
                getAllRespostaTopico();

            }
        });
    });
}
$('code').each(function () {
    var that = $(this);
    // cache the content of 'code'
    var html = that.html().trim();
    that.empty();
    // escape the content
    that.text(html);
});


//preView //
function preView() {
    $(document).on('keyup', '.trumbowyg-editor', function () {
        debugger
        $('.pre-view').html($('#resposta').val());
        $('.pre-view').html($('#criar_topico').val());

    });
}
//verifica login//
function getUserSession() {

    const session = $.ajax({
        url: '../core/Request.php',
        type: 'POST',
        async: false,
        data: 'accao=getUserSession',
        success: function (data) {

        }
    });
    return session;
}

//get respostas from topico //
function getAllRespostaTopico() {
    const id_topico = $('.titulo_nome_topico').attr('id');

    $.ajax({
        url: '../core/Request.php',
        type: 'POST',
        data: 'accao=getAllRespostaTogpico&id_topico=' + id_topico,
        success: function (data) {
            debugger

            if (data != "") {
                const resposta = JSON.parse(data);

                console.log(resposta);
                const div = $('.respostas-div');
                let divAppend = "";
                $.each(resposta, function (i, value) {
                    divAppend += '<div class="timelineCont div-resposta">';

                    if (value.foto !== "default.jpg") {
                        divAppend += '<div>';
                        divAppend += '<div style="position: absolute;" class="user-foto">';
                        divAppend += '<img class="tooltipped inline" src="../public/assets/images/users/' + value.foto + '" data-position="top" data-tooltip="' + value.nome + '" />';
                        divAppend += '</div>';

                    } else {
                        divAppend += '<div>';
                        divAppend += '<div style="position: absolute;" class="tooltipped inline user-default-foto" data-position="top" data-tooltip="' + value.nome + '"/>';
                        divAppend += '<span>' + value.nome.substring(0, 1).toUpperCase() + '</span>';
                        divAppend += '</div>';

                    }

                    if (value.ownerResposta === true) {
                        divAppend += '<span style="margin-left: 50px; font-size: 18px;font-weight: bold; color: #8e8e8e;">' + value.nome + '</span>';
                        divAppend += '<span style="float: right;">' + value.data_criacao_dias + 'd</span>';
                    } else {
                        divAppend += '<span style="margin-left: 50px; font-size: 18px;font-weight: bold; color: #8e8e8e;">' + value.nome + '</span>';
                        divAppend += '<span style="float: right;">' + value.data_criacao_dias + 'd</span>';
                    }
                    if (parseInt(value.contador_edit_resposta) !== 0) {
                        divAppend += '<span  style="float: right;color: #ea9700;"class="tooltipped" data-position="top" data-tooltip="Edição pela última vez a ' + value.data_atualizacao_reposta + '">'
                        divAppend += '<span style="float: right;color: #ea9700;"><i class="fas fa-pen"></i>&#xA0;&#xA0;</span>';
                        divAppend += '<span style="float: right;color: #ea9700;">' + value.contador_edit_resposta + '&#xA0;</span>';
                        divAppend += '</span>';
                    }

                    divAppend += '</div>';
                    divAppend += '<div style="margin: 30px 0px 30px 50px; text-align: justify;">';
                    divAppend += value.resposta;
                    divAppend += '</div>';
                    if (value.ownerResposta === false) {
                        divAppend += '<div>';
                        divAppend += '<a class="btn-flat btn-small waves-effect Default right modal-trigger btn-responder" href="#modal_criar_reposta"><i class="fas fa-reply"></i> Responder</a><br>';
                        divAppend += '</div>';
                    }
                    if (value.ownerResposta === true) {
                        divAppend += '<div style="display: flow-root;">';
                        divAppend += '<button class="btn-flat btn-small waves-effect Default right modal-trigger right btn-eliminar-topico" data-target="modal_eliminar_topico"><i class="far fa-trash-alt"></i></button>';
                        divAppend += '<a href="#modal_editar_reposta_topico" class="btn-flat btn-small waves-effect Default right modal-trigger right btn-responder"><i class="fas fa-pencil-alt"></i></a>';
                        divAppend += '</div>';
                    }
                    divAppend += '</div>';


                    divAppend += '</div>';


                });
                div.empty().append(divAppend);
                $('.tooltipped').tooltip();
            }
        }
    });
}


function editarRespostaTopico() {
    const reposta = $('#editar_resposta_topico').val();
    const tituloTopico = $('input[name="edit_nome_topico"]').val();
    $(document).on('click', '#btn_editar_resposta_topico', function () {


        if ($.trim(tituloTopico) === "") {
            const newLocal = 500;
            $('.div-erro-reposta').empty().hide().append('<span class="erro-reposta-vazio">Titulo do tópico não não pode estar vazio <i class="close-error-reposta-vazia fas fa-window-close"></i></span>').fadeIn(newLocal);
            return false;
        }

        if ($.trim(reposta) === "") {
            const newLocal = 500;
            $('.div-erro-reposta').empty().hide().append('<span class="erro-reposta-vazio">Reposta não pode estar vazia <i class="close-error-reposta-vazia fas fa-window-close"></i></span>').fadeIn(newLocal);
            return false;
        }
        if ($.trim(reposta) === $.trim($('#editar_resposta_topico').val()) && $.trim(tituloTopico) === $.trim($('input[name="edit_nome_topico"]').val())) {
            const newLocal = 500;
            $('.div-erro-reposta').empty().hide().append('<span class="erro-reposta-vazio">Não efetuou alterações <i class="close-error-reposta-vazia fas fa-window-close"></i></span>').fadeIn(newLocal);
            return false;
        }


        let formData = new FormData($('#form_editar_reposta_topico')[0]);
        formData.append('accao', 'editarRespostaTopico');
        formData.append('id_topico', $('.id_topico_form').attr('id'));

        console.log(formData);

        $.ajax({
            url: '../core/Request.php',
            type: 'POST',
            processData: false,
            contentType: false,
            data: formData,
            beforeSend: function () {
                $('#btn_editar_resposta_topico').html('<i><img src="../public/assets/images/gif/load.gif" class="load-gif-criar-conta"/></i> Responder');
            },
            success: function (data) {
                debugger
                console.log(data);
                $('#btn_editar_resposta_topico').html('<i class="fas fa-pencil-alt"></i> efetuar alterações');
                $('.modal-editar-reposta-topico').modal('close');
                location.reload();


            }
        });
    });
}


// lançar função caso alteração de datas //



function pesquisaTopicos() {
    let pesquisa = $('input[name="inputPesquisaHeader"]').val();
    let dataInicio = $('input[name="dataInicio"]').val();
    let dataFim = $('input[name="dataFim"]').val();
    $.ajax({
        url: '../core/Request.php',
        type: 'POST',

        data: '&accao=pesquisa&pesquisar=' + pesquisa + '&datainicio=' + dataInicio + '&datafim=' + dataFim,
        beforeSend: function () {

        },
        success: function (data) {
            console.log(data);
            if (data === "null") {
                let divApeend = $('.div-append-pesquisa-topicos');
                divApeend.empty();
                return false;
            }

            if (data !== "") {

                let jsonParse = JSON.parse(data);
                debugger
                let divApeend = $('.div-append-pesquisa-topicos');
                let div = "";
                divApeend.empty();
                $.each(jsonParse, function (i, value) {
                    div += '<div class="row fluid div-pesquisa-topico">'
                    div += ' <a  href="?a=topico&name=' + value.nome_topico + '&id_topico=' + value.id_topico + '">';
                    div += '<div class="col m12 l12 ">';
                    div += '<p style="color:#2fa8fe; margin: 2px; font-weight:600">' + value.nome_topico + '</p>';
                    div += '<span style="color:' + value.cor_referencia_categoria + ';transform: scale(0.7,1);width: 10px;" class="' + value.font_awesome_categoria + '"></span>';
                    div += '<span style="color:' + value.cor_referencia_sub_categoria + ';transform: scale(0.7,1);width: 3px;" class="' + value.font_awesome_sub_categoria + '"></span></span>&#xA0;&#xA0;<span>' + value.nome_sub_categoria + '</span>&#xA0';

                    debugger
                    if (value.texto_topico.length > 200) {
                        let texto = value.texto_topico.substring(0, 200).replace(/&/g, '&amp;')
                            .replace(/<[\/\!]*?[^<>]*?>/gi, '')
                            .replace(/<style[^>]*?>.*?<\/style>/gi, '')
                            .replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '')
                            .replace(/&nbsp;/g, '')
                            .concat('...');
                        div += '<p style="font-size: 12px">' + texto + '</p>';
                    } else {
                        div += '<p style="font-size: 12px">' + value.texto_topico + '</p>';
                    }
                    div += '</div>';
                    div += '</a>';
                    div += '</div>';


                });
                divApeend.empty().append(div);
            }


        }
    });
}

function getData() {
    $(document).on('keyup', '#nome_pesquisa', function () {
        debugger
        pesquisaTopicos();
    });

    $(document).on('change', '#input_pesquisa_data_inicio', function () {
        debugger
        pesquisaTopicos();
    });
    $(document).on('change', '#input_pesquisa_data_fim', function () {
        pesquisaTopicos();
    });


}

//Criar tópico //

function getSub_categoria() {


    debugger
    $(document).on('change', '#criarTopicoCategoria-option', function () {

        const id_categoria = $(this).val();
        $.ajax({
            url: '../core/Request.php',
            type: 'POST',

            data: '&accao=getSubCategoria&id_categoria='+id_categoria,

            success: function (data) {
                console.log(data);
                debugger
                if(data!=='sem subcategorias'){
                    let selectSubCategoria = $('#criarSubCategoria-option');
                    let jsonParse = JSON.parse(data);
                    selectSubCategoria.empty().append('<option  value="" disabled selected>SubCategoria</option>')
                    $.each(jsonParse, function(i, value){
                        debugger
                        selectSubCategoria.append('<option value="'+value.id_sub_categoria+'"><i style="color:'+value.cor_referencia_sub_categoria+'" class="'+value.font_awesome+'"></i> '+value.nome_sub_categoria+'</option>');
                    });
                    selectSubCategoria.formSelect();
                }
            }
        });
    });

}



function setCriarTopico() {


    debugger
    $(document).on('click', '#btn_salvar_topico', function () {
        const topico = $('#criar_topico').val();
        const tituloTopico = $('input[name="criar_titulo_topico"]').val();
        const TopicoCategoria = $('#criarTopicoCategoria-option').val();
        const TopicoSubCategoria = $('#criarSubCategoria-option').val();
        if ($.trim(tituloTopico) === "") {
            const newLocal = 500;
            $('.div-erro-reposta').empty().hide().append('<span class="erro-reposta-vazio">Titulo do tópico não pode estar vazio <i class="close-error-reposta-vazia fas fa-window-close"></i></span>').fadeIn(newLocal);
            return false;
        }

        if ($.trim(TopicoCategoria) === "") {
            const newLocal = 500;
            $('.div-erro-reposta').empty().hide().append('<span class="erro-reposta-vazio">Categoria não pode estar vazia <i class="close-error-reposta-vazia fas fa-window-close"></i></span>').fadeIn(newLocal);
            return false;
        }
        if ($.trim(TopicoSubCategoria) === "") {
            const newLocal = 500;
            $('.div-erro-reposta').empty().hide().append('<span class="erro-reposta-vazio">Subcategoria não pode estar vazia <i class="close-error-reposta-vazia fas fa-window-close"></i></span>').fadeIn(newLocal);
            return false;
        }
        
        if ($.trim(topico) === "") {
            const newLocal = 500;
            $('.div-erro-reposta').empty().hide().append('<span class="erro-reposta-vazio">Conteudo do tópico não pode estar vazio <i class="close-error-reposta-vazia fas fa-window-close"></i></span>').fadeIn(newLocal);
            return false;
        }

        let formData = new FormData($('#form_criar_topico')[0]);
        formData.append('accao', 'setCriarTopico');
        $.ajax({
            url: '../core/Request.php',
            type: 'POST',
            processData: false,
            contentType: false,
            data: formData,

            success: function (data) {
                console.log(data);
     
            }
        });
    });

}