$(document).ready(function () {
    var fullHeight = function () {
        return $(window).resize(function () {
            $('.js-fullheight').css('height', $(window).height());
        });
    };
    fullHeight();
    console.log(fullHeight().innerWidth());

    if (fullHeight().innerWidth() < 991.98) {
        debugger
        document.querySelector('#sidebar').classList.remove('active');
        document.querySelector('#content').classList.add('active_content');
    }
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#content').toggleClass('active_content');
    });

    $.datetimepicker.setLocale('fr');
    dataInicio();
    moment().format();
    dataInicioEditWork();
    dataFimEditWork();
});


function dataInicio() {
    var data = ""
    $('#date_timepicker_start').datetimepicker({
        value: '',
        minDate: 0
    });
    $('#date_timepicker_start').on('change', function () {
        data = document.querySelector("#date_timepicker_start").value;
        if (data !== "") {
            const m1 = moment(new Date(data));
            var new_date = moment(m1).add(1, 'days').format("YYYY/MM/DD HH:mm");
            dataFim(new_date);
        }
    });

}

function dataFim(data) {
    $('#date_timepicker_end').datetimepicker({
        value: '',
        minDate: data,
        defaultDate: data
    });
}

function dataInicioEditWork() {
    var data = ""
    $('#date_Edit_Work_timepicker_start').datetimepicker({
        value: '',
        minDate: 0
    });
    $('#date_Edit_Work_timepicker_start').on('change', function () {
        data = document.querySelector("#date_Edit_Work_timepicker_start").value;
        if (data !== "") {
            const m1 = moment(new Date(data));
            var new_date = moment(m1).add(1, 'days').format("YYYY/MM/DD HH:mm");
            dataFimEditWork(new_date);
        }
    });

}

function dataFimEditWork(data) {
    $('#date_Edit_Work_timepicker_end').datetimepicker({
        value: '',
        minDate: data,
        defaultDate: data
    });
}

//carregar funções quando dom estiver carregada//
document.addEventListener('DOMContentLoaded', function () {
    userLogin();
    getUserDetails();
    updateUserDetails();
    updateUserPass();
    initiToolTip();
    estadoEditWork();

});

//inciar tooltip Bootstrap//
function initiToolTip() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
}
//validations////
function incorrectInput(spanValidator, inputName) {
    debugger
    let spanEmailValidator = document.querySelector("#" + spanValidator);
    document.querySelector("" + inputName.nodeName + "[name=" + inputName.name + "]").focus();
    document.querySelector("" + inputName.nodeName + "[name=" + inputName.name + "]").style.border = "1px solid #e8a3a3";
    spanEmailValidator.style.color = "red";
    spanEmailValidator.border = "red";
}

function inputOk(spanValidator, inputName) {
    document.querySelector("" + inputName.nodeName + "[name=" + inputName.name + "]").style.border = "2px solid #6bbaec";
    document.querySelector("#" + spanValidator).textContent = "";
}

//on keyup clean inputs//
function onChangedInputs(input) {

    inputOk(input.nextElementSibling.id, input);
}
function estadoEditWork() {
    const select = document.querySelector('.select-estado-edit');
    if (select) {

        select.addEventListener('change', (e) => {
            e.preventDefault();
            estadoEditWorkValues(select);
        })
    }
}
function estadoEditWorkValues(select) {
    let inputs = document.querySelector('#form_EditWork');
    if (select.value === 'Fermé') {
        for (let input of inputs) {
            if (input.name !== 'estadoEditWork') {
                document.getElementsByName(input.name)[0].readOnly = true;
                if (input.name === 'colaboradorEditWork') {
                    document.getElementsByName(input.name)[0].disabled = true;
                }

            }
        }
    } else {
        for (let input of inputs) {
            document.getElementsByName(input.name)[0].readOnly = false;
            if (input.name === 'colaboradorEditWork') {
                document.getElementsByName(input.name)[0].disabled = false;
            }
        }
    }
}

function verifyIntialDateIsEmpty(element) {
    let startDate = document.querySelector('input[name=dataInicioCreateWork]');
    let startDateEditWork = document.querySelector('input[name=dataInicioEditWork]');
    if (startDate.value.trim() === "" && startDateEditWork.value.trim() === "") {
        element.nextElementSibling.style.color = "red";
        element.nextElementSibling.border = "red";
        element.nextElementSibling.textContent = "Sélectionnez d'abord la date de début.";
    }
}

//validate the login values and send the request to the controller

function userLogin() {
    let btn = document.querySelector('#btn_login')

    if (btn) {

        btn.addEventListener('click', function (e) {
            e.preventDefault();
            let emailLogin = document.querySelector("input[name=emailLogin]");
            let passLogin = document.querySelector("input[name=passLogin]");
            if (emailLogin.value.trim() === "") {
                let email_validator = document.querySelector("#email_validator");
                email_validator.textContent = "Entrez l'e-mail";
                incorrectInput(email_validator.id, emailLogin)
                return false;
            }
            if (!testEmailRegex(emailLogin.value)) {
                let email_validator = document.querySelector("#email_validator");
                email_validator.textContent = "Entrer un email valide";
                incorrectInput(email_validator.id, emailLogin)
                return false;
            }
            if (passLogin.value.trim() === "") {
                let pass_validator = document.querySelector("#pass_validator");
                pass_validator.textContent = "Entrer le mot de passe";
                incorrectInput(pass_validator.id, passLogin)
                return false;
            }

            let formData = new FormData(document.querySelector('#form_login'));
            formData.append('accao', 'userLogin')
            fetch('../core/Request.php', {
                method: 'POST',
                body: formData
            }).then((response) => {
                return response.json();
            }).then((jsonData) => {
                console.log(jsonData);
                jsonData.map((v, k) => {
                    if (v.statusResponse === true) {
                        window.location.href = "index.php";
                    }
                    if (v.statusResponse === false || v.statusResponse === 0) {
                        let pass_validator = document.querySelector("#pass_validator");
                        pass_validator.textContent = "Email ou mot de passe incorrect.";
                        incorrectInput(pass_validator.id, passLogin)
                        return false;
                    }
                });
            });
        });
    }
}

// get UserDetails //

function getUserDetails() {
    let formData = new FormData();
    formData.append('accao', 'userDetails')
    fetch('../core/Request.php', {
        method: 'POST',
        body: formData
    }).then((response) => {
        return response.json();
    }).then((jsonResponse) => {
        let divAppend = document.querySelector(".div-user-details");
        if (divAppend) {
            let divUserDetails = "";
            divUserDetails += "<span class='span-details'><b>Nom d'utilisateur:</b></span>";
            divUserDetails += "<span>" + jsonResponse[1].nome + "</span><br>"
            divUserDetails += "<span class='span-details'><b>E-mail:</b></span>";
            divUserDetails += "<span>" + jsonResponse[1].email + "</span><br>"
            divUserDetails += "<span class='span-details'><b>Date de création:</b></span>";
            divUserDetails += "<span>" + jsonResponse[1].data_criacao_user + "</span><br>"
            divUserDetails += "<span class='span-details'><b>Date de modification:</b></span>";
            divUserDetails += "<span>" + jsonResponse[1].data_atualizacao_user + "</span>"
            document.querySelector('input[name=nameUserUpdate]').value = jsonResponse[1].nome;
            document.querySelector('input[name=emailUserUpdate]').value = jsonResponse[1].email;
            divAppend.innerHTML += divUserDetails;
        }
    });

}
//update User
function updateUserDetails() {
    let btn = document.querySelector('#btn_updatdeUserConfirm');
    if (btn) {

        document.querySelector('#btn_updatdeUserConfirm').addEventListener('click', function (e) {
            e.preventDefault();
            var myModalUpdateUser = document.querySelector('#modal_UpdateUser');
            var modal = bootstrap.Modal.getInstance(myModalUpdateUser);

            let nome = document.querySelector('input[name=nameUserUpdate]');
            if (nome.value.trim() === "") {
                modal.hide();
                let name_UpdateValidator = document.querySelector("#name_UpdateValidator");
                name_UpdateValidator.textContent = "Merci d'entrer un nom valide";
                incorrectInput(name_UpdateValidator.id, nome)

                return false;
            }
            let email = document.querySelector('input[name=emailUserUpdate]');
            if (!testEmailRegex(email.value)) {
                let email_UpdateValidator = document.querySelector("#email_UpdateValidator");
                email_UpdateValidator.textContent = "Entrer un email valide";
                modal.hide();
                incorrectInput(email_UpdateValidator.id, email)
                return false;
            }

            let formData = new FormData(document.querySelector('#form_updateUser'));
            formData.append('accao', 'updateUserDetails');
            fetch('../core/Request.php', {
                method: 'POST',
                body: formData
            }).then((response) => {
                return response.json();
            }).then((jsonResponse) => {
                let myModalUpdateUser = document.querySelector('#modal_UpdateUser');
                let modal = bootstrap.Modal.getInstance(myModalUpdateUser);
                modal.hide();
                let divResult = document.querySelector("#resultMessageDiv");
                let result = "";
                let alertType = "";
                let favIcon = "";
                let message = "";
                switch (jsonResponse.status) {
                    case 'Nenhuma alteracao efetuada':
                        message = "Aucune modification apportée.";
                        alertType = "warning";
                        favIcon = "<i class='fa-solid fa-triangle-exclamation fa-xl'></i>";
                        break;
                    case 'alteracao efetuada':
                        message = "Modification effectuée avec succès.";
                        alertType = "success";
                        favIcon = "<i class='fa-solid fa-circle-check fa-xl'></i>";
                        window.location.href = "index.php";
                        break;
                    case 'Email existe':
                        message = "L'e-mail est déjà enregistré, choisissez-en un autre.";
                        alertType = "warning";
                        favIcon = "<i class='fa-solid fa-triangle-exclamation fa-xl'></i>";
                        break;
                }

                result += "<div class='alert alert-" + alertType + " alert-dismissible fade show' role='alert'>";
                result += "" + favIcon + "&nbsp;&nbsp;" + message + "";
                result += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
                result += "</div>";
                divResult.innerHTML = result;

            }).catch((error) => {
                console.log("error: " + error);
                let myModalUpdateUser = document.querySelector('#modal_UpdateUser');
                let modal = bootstrap.Modal.getInstance(myModalUpdateUser);
                modal.hide();
            });

        });
    }
}

function updateUserPass() {
    let btn = document.querySelector('#btn_updatdeUserPassConfirm');
    if (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            let passAtual = document.querySelector('input[name=passAtualUserUpdate]');
            var myModalUpdateUser = document.querySelector('#modal_UpdateUserPass');
            var modal = bootstrap.Modal.getInstance(myModalUpdateUser);
            if (passAtual.value.trim() === "") {
                modal.hide();
                let passAtual_UpdateValidator = document.querySelector("#passAtual_UpdateValidator");
                passAtual_UpdateValidator.textContent = "Entrer un mot de passe";
                incorrectInput(passAtual_UpdateValidator.id, passAtual);
                return false;
            }
            let passUserUpdate = document.querySelector('input[name=passUserUpdate]');
            var pass_UpdateValidator = document.querySelector("#pass_UpdateValidator");
            if (passUserUpdate.value.trim().length < 8) {
                modal.hide();
                pass_UpdateValidator.textContent = "Le mot de passe doit comporter au moins 8 caractères";
                incorrectInput(pass_UpdateValidator.id, passUserUpdate);
                return false;
            }
            if (!passUserUpdate.value.match(".*[A-Z].*")) {
                modal.hide();
                pass_UpdateValidator.textContent = "Le pass doit avoir au moins une majuscule";
                incorrectInput(pass_UpdateValidator.id, passUserUpdate);
                return false;
            }
            if (!passUserUpdate.value.match(".*[a-z].*")) {
                modal.hide();
                pass_UpdateValidator.textContent = "Le pass doit comporter au moins une lettre minuscule";
                incorrectInput(pass_UpdateValidator.id, passUserUpdate);
                return false;
            }
            if (!passUserUpdate.value.match(".*[0-9].*")) {
                modal.hide();
                pass_UpdateValidator.textContent = "Le mot de passe doit comporter au moins un chiffre";
                incorrectInput(pass_UpdateValidator.id, passUserUpdate);
                return false;
            }
            let confirmPassUserUpdate = document.querySelector('input[name=confirmPassUserUpdate]');
            if (confirmPassUserUpdate.value.trim() !== passUserUpdate.value.trim()) {
                modal.hide();
                let confirmPass_UpdateValidator = document.querySelector("#confirmPass_UpdateValidator");
                confirmPass_UpdateValidator.textContent = "La confirmation doit être identique au mot de passe";
                incorrectInput(confirmPass_UpdateValidator.id, confirmPassUserUpdate);
                return false;
            }

            let formData = new FormData(document.querySelector('#form_passUpdateUser'));
            formData.append('accao', 'updateUserPass');
            fetch('../core/Request.php', {
                method: 'POST',
                body: formData
            }).then((response) => {
                return response.json();
            }).then((jsonResponse) => {
                var myModalUpdateUser = document.querySelector('#modal_UpdateUserPass');
                var modal = bootstrap.Modal.getInstance(myModalUpdateUser);
                modal.hide();
                let divResult = document.querySelector("#resultMessageDivUpdatePass");
                let result = "";
                let alertType = "";
                let favIcon = "";
                let message = "";

                switch (jsonResponse.status) {
                    case 'Pass atual errada':
                        let passAtual_UpdateValidator = document.querySelector("#passAtual_UpdateValidator");
                        passAtual_UpdateValidator.textContent = "Mot de passe actuel erroné";
                        let passAtual = document.querySelector('input[name=passAtualUserUpdate]');
                        incorrectInput(passAtual_UpdateValidator.id, passAtual);
                        break;
                    case 'Alteracao efetuada':
                        message = "Modification effectuée avec succès.";
                        alertType = "success";
                        favIcon = "<i class='fa-solid fa-circle-check fa-xl'></i>";
                        window.location.href = "index.php";
                        break;
                    case 'Pass atual e nova iguais':
                        message = "Le nouveau mot de passe ne peut pas être le même que l'actuel.";
                        alertType = "warning";
                        favIcon = "<i class='fa-solid fa-triangle-exclamation fa-xl'></i>";
                        break;
                    case 'Erro na alteraçao da pass':
                        message = "Une erreur s'est produite lors de la modification, contactez votre administrateur.";
                        alertType = "danger";
                        favIcon = "<i class='fa-solid fa-triangle-exclamation fa-xl'></i>";
                        break;
                }
                if (message !== "") {
                    result += "<div class='alert alert-" + alertType + " alert-dismissible fade show' role='alert'>";
                    result += "" + favIcon + "&nbsp;&nbsp;" + message + "";
                    result += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
                    result += "</div>";
                    divResult.innerHTML = result;
                }
            }).catch((error) => {
                console.log(error);
            });

        });
    }
}
////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////         clients        /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
    getClients();
    getClienteDetails();
    validateUpdateCliente();
    updateCliente();
    validateNewCliente();
    getAllTrabalhosClient();
    appendColaboradores();
    createWork();
    limitPagesDataTables();
    softDeleteClient();
    getHistoryClients();
    deleteClient();
    updateWork();
    deleteWork();
    recoveryClient();
    getAllworks();
    createColaborador();
    updateColaborador();
    setColaboradores();
    logout();
    sendEmail();

});

function limitPagesDataTables() {
    $.fn.DataTable.ext.pager.numbers_length = 5;
}
function getClients() {

    let formData = new FormData();
    formData.append('accao', 'getAllClients');
    var pedido = fetch('../core/Request.php', {
        method: 'POST',
        body: formData
    }).then((response) => {
        return response.json();
    }).then((jsonResponse) => {
        let tableId = $('#tableClients');
        tableClients(jsonResponse, tableId);

    }).catch((error) => {
        console.log(error);
    });
    return pedido;
}



function tableClients(jsonResponse, tableId) {

    if (!jsonResponse && !tableId) {
        return false;
    }
    var href = "";
    var tableData = [];
    let btns = [
        {
            extend: 'copyHtml5',
            text: '<span style="color:#d5a75e"><i class="fa-solid fa-copy fa-2xl"></i></span>',
            titleAttr: 'Copy'
        },
        {
            extend: 'excelHtml5',
            text: '<span style="color:#007c01"><i class="fa-solid fa-file-excel fa-2xl"></i></span>',
            titleAttr: 'Excel'
        },
        {
            extend: 'pdfHtml5',
            title: 'Export clients',
            text: '<span style="color:#db0001"><i class="fa-solid fa-file-pdf fa-2xl"></i></span>',
            titleAttr: 'PDF',
            exportOptions: {
                columns: [1, 2, 3, 4, 5]
            }
        }
    ];
    switch (tableId.attr('id')) {
        case 'tableClients':
            href = "../public/index.php?a=client&id=";
            tableData = {
                "valores": [{
                    "data": "id_cliente", render: function (data, type, row, meta) {
                        return "<a href='" + href + data + "' data-bs-toggle='tooltip' data-bs-html='true' title='Détails de l'utilisateur'><i class='fa-solid fa-address-card fa-2xl'></i>&nbsp;<span style='color:green'><i class='fa-solid fa-circle-plus'></i></span></a>";
                    }
                },
                { "data": "nome_cliente" },
                { "data": "movel_cliente" },
                { "data": "email_cliente" },
                { "data": "morada_cliente" },
                { "data": "data_criacao_cliente" }]
            };
            break;
        case 'tableHistoryClients':
            href = "../public/index.php?a=deleted_client&id=";
            tableData = {
                "valores": [
                    {
                        "data": "id_cliente", render: function (data, type, row, meta) {
                            return "<a href='" + href + data + "' data-bs-toggle='tooltip' style='color:rgb(222 70 70)' data-bs-html='true' title='Détails de l'utilisateur'><i class='fa-solid fa-address-card fa-2xl'></i></a>";
                        }
                    },
                    { "data": "nome_cliente" },
                    { "data": "movel_cliente" },
                    { "data": "email_cliente" },
                    { "data": "morada_cliente" },
                    { "data": "data_criacao_cliente" },
                    { "data": "data_eliminacao_cliente" }]
            };
            break;
        case 'tableTrabalhos':
            function colorBar(value) {
                debugger
                let cor = "";
                parseInt(value) < 50 ? cor = "" : cor;
                parseInt(value) > 49 && value < 100 ? cor = "bg-warning" : cor;
                parseInt(value) === 100 ? cor = "bg-success" : cor;
                return cor;
            }

            function url(value) {
                let href = "../public/index.php?a=client&id=";
                parseInt(value) === 0 ? href = "../public/index.php?a=deleted_client&id=" : href;
                return href;
            }

            function setColor(value) {
                let color = "none"
                debugger
                parseInt(value) === 0 ? color = "rgb(222 70 70)" : color;
                return color;
            }
            tableData = {
                "valores": [{
                    "data": "id_cliente", render: function (data, type, row, meta) {
                        return "<a style='color:" + setColor(row.trabalho_ativo) + "; text-decoration: none;' href='" + url(row.trabalho_ativo) + data + "' data-bs-toggle='tooltip' data-bs-html='true' title='Détails de l'utilisateur'><i class='fa-solid fa-address-card fa-2xl'></i> " + row.nome_cliente + "</a>";
                    }
                },
                { "data": "nome_trabalho" },
                { "data": "morada_trabalho" },
                {
                    "data": "estado_trabalho", render: function (data, type, row, meta) {
                        debugger
                        return "<span style='color:" + setColorEstadoTrabalho(data) + "; font-weight: bolder;'>" + data + "</span>";
                    }
                },
                { "data": "colaborador" },
                {
                    "data": "percentagem_Inicio_FimTrabalho", render: function (data, type, row, meta) {
                        return '<div class="progress"><div class="progress-bar ' + colorBar(data) + ' progress-bar-striped" style="width:' + data + '%">' + data + '%</div></div>';
                    }
                }]
            };
            break;
    }

    tableId.dataTable({
        dom: 'Bfrtip',
        processing: true,
        "responsive": true,
        'ColumnDefs': [{
            'targets': [0, 0],
            'orderable': false,
        },
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: 1 }
        ],
        "data": jsonResponse,

        "language": {
            "url": "../public/assets/js/dt_fr-FR.json"
        },
        "columns": tableData.valores,
        buttons: btns,

        destroy: true,
    });
}
function getHistoryClients() {

    let formData = new FormData();
    formData.append('accao', 'getHistoryAllClients');
    var pedido = fetch('../core/Request.php', {
        method: 'POST',
        body: formData
    }).then((response) => {
        return response.json();
    }).then((jsonResponse) => {
        let tableId = $('#tableHistoryClients');
        tableClients(jsonResponse, tableId);

    }).catch((error) => {
        console.log(error);
    });
    return pedido;
}
//////////////////////////////////////////////////////////////
////////////////////Cliente e trabalhos//////////////////////
/////////////////////////////////////////////////////////////
function getClienteDetails() {
    const idcrypt = document.querySelector('.span-edit-cliente');
    if (!idcrypt) {
        return false;
    }
    let formData = new FormData();
    formData.append('id', idcrypt.id);
    formData.append('accao', 'getClienteDetails');
    var pedido = fetch('../core/Request.php', {
        method: 'POST',
        body: formData
    }).then((response) => {
        return response.json();
    }).then((jsonResponse) => {
        const inputs = document.querySelectorAll('#form_clientUpdate input');
        const spanValues = document.querySelectorAll('.span-values-client');
        let titleClientName = document.querySelector('#title-client-name');
        let titleClientNameWrap = document.querySelector('#title-client-name-wrap');
        var spans = [];
        spanValues.forEach((v, k) => {
            spans.push(v);
        });
        spans.push(titleClientName);
        spans.push(titleClientNameWrap);
        valuesClient(jsonResponse, inputs);
        valuesClient(jsonResponse, spans);
    }).catch((error) => {
        console.log(error);
    });
    return pedido;

}

function valuesClient(jsonResponse, inputs) {
    if (jsonResponse.statusResponse !== 0 && inputs && inputs[0] !== undefined) {
        if (inputs[0].tagName === 'SPAN') {
            inputs[0].textContent = jsonResponse.nome_cliente;
            inputs[1].textContent = jsonResponse.email_cliente;
            inputs[2].textContent = jsonResponse.movel_cliente;
            inputs[3].textContent = jsonResponse.telefone_cliente;
            inputs[4].textContent = jsonResponse.morada_cliente;
            inputs[5].textContent = jsonResponse.cidade_cliente;
            inputs[6].textContent = jsonResponse.data_criacao_cliente;
            inputs[7].textContent = jsonResponse.data_atualizacao_cliente
            inputs[8].textContent = jsonResponse.nome_cliente;
            let nome = jsonResponse.nome_cliente.split(" ");
            inputs[9].textContent = nome[0] + " " + nome[nome.length - 1]
        } else {
            inputs[0].value = jsonResponse.nome_cliente;
            inputs[1].value = jsonResponse.email_cliente;
            inputs[2].value = jsonResponse.movel_cliente;
            inputs[3].value = jsonResponse.telefone_cliente;
            inputs[4].value = jsonResponse.morada_cliente;
            inputs[5].value = jsonResponse.cidade_cliente;
        }

    }


}
/////update cliente/////////
function validateUpdateCliente() {
    const btnSubmit = document.querySelector('#btn_confirmUpdatdeClient');
    if (btnSubmit) {
        btnSubmit.addEventListener('click', function (e) {
            var myModalUpdateUser = document.querySelector('#modal_EditClient');
            var modal = bootstrap.Modal.getInstance(myModalUpdateUser);
            var myModalconfirmUpdateClient = document.querySelector('#modal_confirmUpdateClient');
            var modalconfirm = new bootstrap.Modal(myModalconfirmUpdateClient)

            e.preventDefault();

            const nome = document.querySelector('input[name=nomeClienteUpdate]');
            if (nome.value.trim() === "") {

                let validatorNomeClienteUpdate = document.querySelector("#validatorNomeClienteUpdate");
                validatorNomeClienteUpdate.textContent = "Le nom est requis."
                incorrectInput(validatorNomeClienteUpdate.id, nome)
                return false;
            }
            let emailCliente = document.querySelector("input[name=emailClienteUpdate]");
            if (!testEmailRegex(emailCliente.value) && emailCliente.value !== "") {
                let validatorEmailClienteUpdate = document.querySelector("#validatorEmailClienteUpdate");
                validatorEmailClienteUpdate.textContent = "Entrer un email valide.";
                incorrectInput(validatorEmailClienteUpdate.id, emailCliente)
                return false;
            }
            const movel = document.querySelector('input[name=movelClienteUpdate]');
            const testNumberRegex = /^[0-9]*$/;
            console.log(testNumberRegex.test(movel));

            if (!testNumberRegex.test(movel.value)) {
                let validatorMovelClienteUpdate = document.querySelector("#validatorMovelClienteUpdate");
                validatorMovelClienteUpdate.textContent = "Entrez un numéro de mobile valide."
                incorrectInput(validatorMovelClienteUpdate.id, movel)
                return false;
            }
            const telefone = document.querySelector('input[name=telefoneClienteUpdate]');
            if (!testNumberRegex.test(telefone.value)) {
                let validatorTelefoneClienteUpdate = document.querySelector("#validatorTelefoneClienteUpdate");
                validatorTelefoneClienteUpdate.textContent = "Entrez un numéro de téléphone valide";
                incorrectInput(validatorTelefoneClienteUpdate.id, telefone)
                return false;
            }
            const morada = document.querySelector('input[name=moradaClienteUpdate]');
            if (morada.value.trim() === "") {

                let validatorMoradaClienteUpdate = document.querySelector("#validatorMoradaClienteUpdate");
                validatorMoradaClienteUpdate.textContent = "Entrez l'adresse du client."
                incorrectInput(validatorMovelClienteUpdate.id, morada)
                return false;
            }
            modal.hide();
            modalconfirm.show();
        });
    }
}

function updateCliente() {
    const btnSubmit = document.querySelector('#btn_updateClient');
    if (btnSubmit) {
        btnSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            const idcrypt = document.querySelector('.span-edit-cliente');
            let formData = new FormData(document.querySelector('#form_clientUpdate'));
            formData.append('id', idcrypt.id);
            formData.append('accao', 'updateClienteDetails');
            var pedido = fetch('../core/Request.php', {
                method: 'POST',
                body: formData
            }).then((response) => {
                return response.json();
            }).then((jsonResponse) => {
                var modal_confirmCliente = document.querySelector('#modal_confirmCliente');
                var modalconfirm2 = new bootstrap.Modal(modal_confirmCliente)
                var spanBodyConfirmCliente = document.querySelector('#spanBodyConfirmCliente');
                var titleModalConfirmCliente = document.querySelector('.title-modal-confirmCliente');
                if (jsonResponse.status === "Nenhuma alteracao efetuada") {
                    titleModalConfirmCliente.innerHTML = 'Modifier le client <span style="color:orange;"><i class="fa-solid fa-circle-info"></i></span>';
                    spanBodyConfirmCliente.textContent = "Aucune modification n'a été apportée.";
                    modalconfirm2.show();
                    return false;
                }
                if (jsonResponse.status === "Alteracao efetuada") {
                    titleModalConfirmCliente.innerHTML = 'Modifier le client <span style="color:green;"><i class="fa-solid fa-circle-check"></i></span>';
                    spanBodyConfirmCliente.textContent = "Modifications effectuées avec succès";
                    modalconfirm2.show();
                    getClienteDetails();
                    return false;
                }

            }).catch((error) => {
                console.log(error);
            });
            return pedido;
        });
    }
}

function validateNewCliente() {
    const btn_CreateClient = document.querySelector('#btn_CreateClient');

    if (btn_CreateClient) {

        btn_CreateClient.addEventListener('click', function (e) {
            e.preventDefault();
            var modal1 = document.querySelector('#modal_creatNewClient');
            var modal_creatNewClient = bootstrap.Modal.getInstance(modal1);
            var modal2 = document.querySelector('#modal_createClientConfirm');
            var modal_createClientConfirm = new bootstrap.Modal(modal2)

            const nome = document.querySelector('input[name=nomeNewCliente]');
            if (nome.value.trim() === "") {

                let validatorNomeNewCliente = document.querySelector("#validatorNomeNewCliente");
                validatorNomeNewCliente.textContent = "Le nom est requis.";
                incorrectInput(validatorNomeNewCliente.id, nome)
                return false;
            }
            let emailCliente = document.querySelector("input[name=emailNewCliente]");
            if (!testEmailRegex(emailCliente.value) && emailCliente.value !== "") {
                let validatorEmailNewCliente = document.querySelector("#validatorEmailNewCliente");
                validatorEmailNewCliente.textContent = "Entrer un email valide.";
                incorrectInput(validatorEmailNewCliente.id, emailCliente)
                return false;
            }
            const movel = document.querySelector('input[name=movelNewCliente]');
            const testNumberRegex = /^[0-9]*$/;

            if (!testNumberRegex.test(movel.value)) {
                let validatorMovelNewCliente = document.querySelector("#validatorMovelNewCliente");
                validatorMovelNewCliente.textContent = "Entrez un numéro de mobile valide."
                incorrectInput(validatorMovelNewCliente.id, movel);
                return false;
            }
            const telefone = document.querySelector('input[name=telefoneNewCliente]');
            if (!testNumberRegex.test(telefone.value)) {
                let validatorTelefoneNewCliente = document.querySelector("#validatorTelefoneNewCliente");
                validatorTelefoneNewCliente.textContent = "Entrez un numéro de téléphone valide"
                incorrectInput(validatorTelefoneNewCliente.id, telefone);
                return false;
            }
            const morada = document.querySelector('input[name=moradaNewCliente]');
            if (morada.value.trim() === "") {

                let validatorMoradaNewCliente = document.querySelector("#validatorMoradaNewCliente");
                validatorMoradaNewCliente.textContent = "Entrez l'adresse du client.";
                incorrectInput(validatorMoradaNewCliente.id, morada);
                return false;
            }

            let formData = new FormData(document.querySelector("#form_newClient"));
            formData.append('accao', 'createNewClient');
            var pedido = fetch('../core/Request.php', {
                method: 'POST',
                body: formData
            }).then((response) => {
                return response.json();
            }).then((jsonResponse) => {
                modal_creatNewClient.hide();
                var spanIcon = document.querySelector('.span-create-client-confirm-icon');
                var spanText = document.querySelector('#spanCreateCliente');
                if (jsonResponse.status === "Cliente criado") {
                    spanIcon.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
                    spanText.textContent = 'Client créé avec succès';
                    spanIcon.style.color = "green";
                    getClients();
                    modal_createClientConfirm.show();
                }
                if (jsonResponse.status === "Erro na criacao") {
                    spanIcon.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
                    spanText.textContent = 'Erreur lors de la création du client, réessayez plus tard';
                    spanIcon.style.color = "red";
                    modal_createClientConfirm.show();
                }
            }).catch((error) => {
                console.log(error);
            });
            return pedido;
        });
    }
}

function getAllTrabalhosClient() {
    const idcrypt = document.querySelector('.span-edit-cliente');
    if (!idcrypt) {
        return false;
    }
    let formData = new FormData();
    formData.append('id', idcrypt.id);
    formData.append('accao', 'getAllTrabalhosClient');
    var pedido = fetch('../core/Request.php', {
        method: 'POST',
        body: formData
    }).then((response) => {
        return response.json();
    }).then((jsonResponse) => {
        const divAppend = document.querySelector('.div-all-works');
        if (jsonResponse.status === 0) {
            divAppend.innerHTML = "<h3 style='color: gray;'>Pas encore de chantier créé.</h3><hr>";
            console.log(jsonResponse.status)
            return false;
        }

        trabalhoTemplate(jsonResponse, divAppend);

    }).catch((error) => {
        console.log(error);
    });
    return pedido;
}

// delete client permanent //
function deleteClient() {

    let btnClick = document.querySelector('#btn_DeleteClient');
    if (btnClick) {
        btnClick.addEventListener('click', (e) => {
            e.preventDefault();
            debugger
            const idcrypt = document.querySelector('.span-edit-cliente');
            if (!idcrypt) {
                return false;
            }
            let formData = new FormData();
            formData.append('accao', 'deleteClient');
            formData.append('id_cliente', idcrypt.id);
            var pedido = fetch('../core/Request.php', {
                method: 'POST',
                body: formData
            }).then((response) => {
                return response.json();
            }).then((jsonResponse) => {
                const modal_ConfirmDeleteClient = document.querySelector('#modal_confirmDeleteClientP');
                const modalConfirmDeleteClient = bootstrap.Modal.getInstance(modal_ConfirmDeleteClient);
                modalConfirmDeleteClient.hide();
                const modal_confirmCliente = document.querySelector('#modal_confirmCliente');
                const modalconfirm2 = new bootstrap.Modal(modal_confirmCliente)
                var spanBodyConfirmCliente = document.querySelector('#spanBodyConfirmCliente');
                var titleModalConfirmCliente = document.querySelector('.title-modal-confirmCliente');
                if (jsonResponse.status === "Cliente apagado") {
                    getAllTrabalhosClient();
                    titleModalConfirmCliente.innerHTML = 'Supprimé client <span style="color:green;"><i class="fa-solid fa-circle-check"></i></span>';
                    spanBodyConfirmCliente.textContent = "Chantier supprimé avec succès.";
                    modalconfirm2.show();
                    let location = "index.php?a=history_clients";
                    let btn = document.querySelector('#btn_modalConfirmClient');
                    windowLocation(btn, location);
                    return false;
                }
                if (jsonResponse.status === "Cliente nao apagado") {
                    titleModalConfirmCliente.innerHTML = 'Supprimé client <span style="color:orange;"><i class="fa-solid fa-triangle-exclamation"></i></span>';
                    spanBodyConfirmCliente.textContent = "Client modification apportée.";
                    modalconfirm2.show();
                }

            }).catch((error) => {
                console.log(error);
            });
            return pedido;
        });
    }
}
//////trabalhos /////

function trabalhoTemplate(jsonResponse, divAppend) {
    console.log(jsonResponse)
    var div = "";
    var dateNow = new Date().toLocaleString("default", { day: "2-digit", month: "2-digit", year: "numeric" });
    jsonResponse.forEach((v, k) => {
        div += '<div class="div-works" style="border-left: solid 5px ' + setRondomColors() + '">';
        div += '<button class="accordion-button collapsed accord#a613c3ion-button-work" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne' + k + '" aria-expanded="false" aria-controls="collapseOne">';
        div += '<div class="nome-trabalho">';
        div += '<span>' + v.nome_trabalho + '</span>';
        div += '</div>';
        div += '</button>'
        div += '<div id="collapseOne' + k + '" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">';
        div += '<div class="accordion-body">';
        div += '<div class="div-corpo-trabalho">';
        div += '<div class="div-icons-opcoes-trabalho">';
        div += '<span id="' + v.id_trabalho + '" data-bs-toggle="modal" data-bs-target="#modal_editWork" class="btn-span-edit-work" onclick="getWork(this)"><i class="fa-solid fa-pen-to-square fa-xl me-4" ></i></span>';
        div += '<span data-bs-toggle="modal" data-bs-target="#modal_confirmDeleteWork" onclick="setModal(this)"><i class="fa-solid fa-trash-can fa-xl" ></i></span>';
        div += '</div>';
        div += '<div>';
        div += '<div><span class="span-details">Adresse:</span></div>';
        div += '<div class="span-value-word"><span >' + v.morada_trabalho + '</span></div>';
        div += '</div>';
        div += '<div>';
        div += '<div><span class="span-details">Date de création:</span></div>';
        div += '<div class="span-value-word"><span >' + v.data_criacao_trabalho + '</span></div>';
        div += '</div>';
        div += '<div>';
        div += '<div><span class="span-details">Date de mise à jour:</span></div>';
        div += '<div class="span-value-word"><span >' + v.data_atualizacao_trabalho + '</span></div>';
        div += '</div>';
        div += '<div>';
        div += '<div><span class="span-details">Statut:</span></div>';
        div += '<div class="span-value-word"><span >' + v.estado_trabalho + '</span></div>';
        div += '</div>';
        div += '<div>';
        div += '<div><span class="span-details">Raison en attente:</span></div>';
        div += '<div class="span-value-word"><span >' + v.motivo_pendencia + '</span></div>';
        div += '</div>';
        div += '<div>';
        div += '<hr>';
        div += '</div>';
        div += '<div><span class="span-details">Date de début de travail:</span></div>';
        div += '<div class="span-value-word"><span >' + v.data_estimada_inicio + '</span></div>';
        div += '</div>';
        div += '<div>';
        div += '<div><span class="span-details">Date de fin de travail:</span></div>';
        div += '<div class="span-value-word"><span >' + v.data_estimada_fim + '</span></div>';
        div += '</div>';
        div += '<hr>';
        div += '<div>';
        div += '<div><span class="span-details">Travail atrribuè au salarié:</span></div>';
        div += '<div class="span-value-word"><span >' + v.colaborador + '</span></div>';
        div += '</div>';
        div += '<hr>';
        div += '<div style="display:block !important ;">';
        div += '<div><span class="span-details">Informations:</span></div>';
        div += '<div class="div-infomacao-trabalho"><span>' + v.descricao_trabalho + '</span></div>';
        div += '</div>';
        div += '<hr>';
        div += '<div>';
        div += '<span><small><b>' + v.data_estimada_inicio.split(" ")[0] + '</b></small></span>';
        div += '<span style="float:right;"><small><b>' + v.data_estimada_fim.split(" ")[0] + '</b></small></span>';
        div += '</div>';
        div += '<div class="progress">';
        div += '<div class="progress-bar" role="progressbar" aria-valuenow="' + v.percentagem_Inicio_FimTrabalho + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + v.percentagem_Inicio_FimTrabalho + '%;">';
        div += '<span class="sr-only">' + v.percentagem_Inicio_FimTrabalho + '% Complete</span>';
        div += '</div>';
        div += '<span class="progress-type"><small style="color:white">Progress Work</small></span>';
        div += '<span class="progress-completed">' + v.percentagem_Inicio_FimTrabalho + '%</span>';
        div += '</div>';
        div += '</div>';
        div += '</div>';
        div += '</div>';
        div += '</div><br>';
        divAppend.innerHTML = div;
    });
}

function getWork(input) {

    if (input) {

        let formData = new FormData();
        formData.append('accao', 'getWork');
        formData.append('id_trabalho', input.id);
        fetch('../core/Request.php', {
            method: 'POST',
            body: formData
        }).then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            console.log(jsonResponse)
            setWorkDetails(jsonResponse)
        }).catch((error) => {
            console.log(error);
        });
    }
}

function getAllworks() {

    let formData = new FormData();
    formData.append('accao', 'getAllworks');
    fetch('../core/Request.php', {
        method: 'POST',
        body: formData
    }).then((response) => {
        return response.json();
    }).then((jsonResponse) => {

        let tableId = $('#tableTrabalhos');

        tableClients(jsonResponse, tableId);
        console.log(jsonResponse)
    }).catch((error) => {
        console.log(error);
    });

}



function setWorkDetails(values) {
    document.querySelector('input[name=descricaoEditWork]').value = values.nome_trabalho;
    document.querySelector('input[name=descricaoEditWork]').id = values.id_trabalho;
    document.querySelector('input[name=moradaEditWork]').value = values.morada_trabalho;
    document.querySelector('input[name=dataInicioEditWork]').value = values.data_estimada_inicio;
    document.querySelector('input[name=dataFimEditWork]').value = values.data_estimada_fim;
    document.querySelector('textarea[name=informacaoEditWork]').value = values.descricao_trabalho;
    document.querySelector('input[name=motivoPendenciaEditWork]').value = values.motivo_pendencia;

    getColaboradores().then((jsonResponse) => {
        if (jsonResponse.length !== 0) {
            let select = document.querySelector('.select-colaborador-edit');
            let selectEstadoWork = document.querySelector('.select-estado-edit');
            if (!select || !selectEstadoWork) {
                return false;
            }
            let optionColaborador = "";
            let optionStatus = "";
            optionColaborador += '<option selected id="' + values.id_colaborador + '" value="' + values.colaborador + '">' + values.colaborador + '</option>';
            optionStatus += '<option selected value="' + values.estado_trabalho + '">' + values.estado_trabalho + '</option>';
            let estados = ['Ouvert', 'En attente', 'Fermé'];
            for (const estado of estados) {
                if (estado !== values.estado_trabalho) {
                    optionStatus += '<option value="' + estado + '">' + estado + '</option>';
                }
            }
            jsonResponse.forEach((v, k) => {
                if (v.nome_colaborador !== values.colaborador) {
                    optionColaborador += '<option id="' + v.id_colaborador + '" value="' + v.nome_colaborador + '">' + v.nome_colaborador + '</option>';
                }
            });
            selectEstadoWork.innerHTML = optionStatus;
            select.innerHTML = optionColaborador;
        } else {
            let select = document.querySelector('.select-colaborador');
            let optionColaborador = "";
            optionColaborador = "<option selected>Il n'y a pas de collaborateurs, créez-en un première.</option>";
            select.innerHTML = optionColaborador;
        }
        const select = document.querySelector('.select-estado-edit');
        estadoEditWorkValues(select);
    }).catch((error) => {
        console.log(error);
    });
}

function updateWork() {

    let btn = document.querySelector('#btn_confirmEditWork');
    if (!btn) {
        return;
    }


    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const btn = document.querySelector('.span-edit-cliente');
        if (!btn) {
            return false;
        }
        const descricaoEditWork = document.querySelector('input[name=descricaoEditWork]');
        if (descricaoEditWork.value.trim() === "") {

            const validatorDescricaoEditWork = document.querySelector("#validatorDescricaoEditWork");
            validatorDescricaoEditWork.textContent = "Description du chantie est requis.";
            incorrectInput(validatorDescricaoEditWork.id, descricaoEditWork)
            return false;
        }
        const moradaEditWork = document.querySelector('input[name=moradaEditWork]');
        if (moradaEditWork.value.trim() === "") {

            const validatorMoradaEditWork = document.querySelector("#validatorMoradaEditWork");
            validatorMoradaEditWork.textContent = "Adresse du chantie est requis.";
            incorrectInput(validatorMoradaEditWork.id, moradaEditWork)
            return false;
        }
        const dataInicioEditWork = document.querySelector('input[name=dataInicioEditWork]');
        if (dataInicioEditWork.value.trim() === "") {

            const validatorDataInicioEditWork = document.querySelector("#validatorDataInicioEditWork");
            validatorDataInicioEditWork.textContent = "Date de début du chantie est requis.";
            incorrectInput(validatorDataInicioEditWork.id, dataInicioEditWork)
            return false;
        }
        const dataFimEditWork = document.querySelector('input[name=dataFimEditWork]');
        if (dataFimEditWork.value.trim() === "") {

            const validatorDataFimEditWork = document.querySelector("#validatorDataFimEditWork");
            validatorDataFimEditWork.textContent = "Date de fin du chantie est requis.";
            incorrectInput(validatorDataFimEditWork.id, dataFimEditWork)
            return false;
        }
        const colaboradorEditWork = document.querySelector('select[name=colaboradorEditWork]');

        if (colaboradorEditWork.value.trim() === "" || colaboradorEditWork.value.trim() === "Travail atrribuè au salarié") {

            const validatorAtribuidoEditWork = document.querySelector("#validatorAtribuidoEditWork");
            validatorAtribuidoEditWork.textContent = "Travail atrribuè au salarié est requis.";
            incorrectInput(validatorAtribuidoEditWork.id, colaboradorEditWork)
            return false;
        }
        const idColaborador = document.querySelector('select[name=colaboradorEditWork]');
        let formData = new FormData(document.querySelector("#form_EditWork"));
        formData.append('id_cliente', btn.id);
        formData.append('id_colaborador', idColaborador.options[idColaborador.selectedIndex].id);
        formData.append('id_trabalho', document.querySelector('input[name=descricaoEditWork]').id);
        formData.append('accao', 'updateWork');
        pedido = fetch('../core/Request.php', {
            method: 'POST',
            body: formData
        }, colaboradorEditWork.disabled === true ? colaboradorEditWork.disabled === false : "").then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            console.log(jsonResponse)
            const modal_EditWork = document.querySelector('#modal_editWork');
            const modalEditWork = bootstrap.Modal.getInstance(modal_EditWork);
            modalEditWork.hide();
            const modal_confirmCliente = document.querySelector('#modal_confirmCliente');
            const modalconfirm2 = new bootstrap.Modal(modal_confirmCliente)
            var spanBodyConfirmCliente = document.querySelector('#spanBodyConfirmCliente');
            var titleModalConfirmCliente = document.querySelector('.title-modal-confirmCliente');
            if (jsonResponse.status === "Trabalho atualizado") {
                titleModalConfirmCliente.innerHTML = 'Modifier chantier <span style="color:green;"><i class="fa-solid fa-circle-check"></i></span>';
                spanBodyConfirmCliente.textContent = "Chantier modifié avec succès.";
                modalconfirm2.show();
                getAllTrabalhosClient();
                return false;
            }
            if (jsonResponse.status === "Trabalho nao alterado") {
                titleModalConfirmCliente.innerHTML = 'Modifier chantier <span style="color:orange;"><i class="fa-solid fa-triangle-exclamation"></i></span>';
                spanBodyConfirmCliente.textContent = "Aucune modification apportée.";
                modalconfirm2.show();
            }

        }).catch((error) => {
            console.log(error);
        });
    });

}

function createWork() {

    let btn = document.querySelector('#btn_confirmCreateWork');
    if (!btn) {
        return;
    }

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        var idcrypt = document.querySelector('.span-edit-cliente');
        if (!idcrypt) {
            return false;
        }
        const descricaoCreateWork = document.querySelector('input[name=descricaoCreateWork]');
        if (descricaoCreateWork.value.trim() === "") {

            let validatorDescricaoCreateWork = document.querySelector("#validatorDescricaoCreateWork");
            validatorDescricaoCreateWork.textContent = "Description du chantie est requis.";
            incorrectInput(validatorDescricaoCreateWork.id, descricaoCreateWork)
            return false;
        }
        const moradaCreateWork = document.querySelector('input[name=moradaCreateWork]');
        if (moradaCreateWork.value.trim() === "") {

            let validatorMoradaCreateWork = document.querySelector("#validatorMoradaCreateWork");
            validatorMoradaCreateWork.textContent = "Adresse du chantie est requis.";
            incorrectInput(validatorMoradaCreateWork.id, moradaCreateWork)
            return false;
        }
        const dataInicioCreateWork = document.querySelector('input[name=dataInicioCreateWork]');
        if (dataInicioCreateWork.value.trim() === "") {

            let validatorDataInicioCreateWork = document.querySelector("#validatorDataInicioCreateWork");
            validatorDataInicioCreateWork.textContent = "Date de début du chantie est requis.";
            incorrectInput(validatorDataInicioCreateWork.id, dataInicioCreateWork)
            return false;
        }
        const dataFimCreateWork = document.querySelector('input[name=dataFimCreateWork]');
        if (dataFimCreateWork.value.trim() === "") {

            let validatorDataFimCreateWork = document.querySelector("#validatorDataFimCreateWork");
            validatorDataFimCreateWork.textContent = "Date de fin du chantie est requis.";
            incorrectInput(validatorDataFimCreateWork.id, dataFimCreateWork)
            return false;
        }
        const colaboradorCreateWork = document.querySelector('select[name=colaboradorCreateWork]');

        if (colaboradorCreateWork.value.trim() === "" || colaboradorCreateWork.value.trim() === "Travail atrribuè au salarié") {

            let validatorAtribuidoCreateWork = document.querySelector("#validatorAtribuidoCreateWork");
            validatorAtribuidoCreateWork.textContent = "Travail atrribuè au salarié est requis.";
            incorrectInput(validatorAtribuidoCreateWork.id, colaboradorCreateWork)
            return false;
        }
        let idColaborador = document.querySelector('select[name=colaboradorCreateWork]');
        let formData = new FormData(document.querySelector("#form_createWork"));
        formData.append('id_cliente', idcrypt.id);
        formData.append('id_colaborador', idColaborador.options[idColaborador.selectedIndex].id);
        formData.append('accao', 'createWork');
        pedido = fetch('../core/Request.php', {
            method: 'POST',
            body: formData
        }).then((response) => {
            return response.json();
        }).then((jsonResponse) => {

            const modal_createWork = document.querySelector('#modal_createWork');
            const modalCreateWork = bootstrap.Modal.getInstance(modal_createWork);
            modalCreateWork.hide();
            const modal_confirmCliente = document.querySelector('#modal_confirmCliente');
            const modalconfirm2 = new bootstrap.Modal(modal_confirmCliente)

            var spanBodyConfirmCliente = document.querySelector('#spanBodyConfirmCliente');
            var titleModalConfirmCliente = document.querySelector('.title-modal-confirmCliente');
            if (jsonResponse.status === "Trabalho criado") {
                titleModalConfirmCliente.innerHTML = 'Création de chantier <span style="color:green;"><i class="fa-solid fa-circle-check"></i></span>';
                spanBodyConfirmCliente.textContent = "Chantier créé avec succès.";
                modalconfirm2.show();
            }
            getAllTrabalhosClient();
        }).catch((error) => {
            console.log(error);
        });
    });
}



function deleteWork() {
    let btn = document.querySelector('#btn_deleteWork');
    if (!btn) {
        return false;
    }
    debugger
    btn.addEventListener('click', () => {
        let formData = new FormData();
        formData.append('id_trabalho', document.querySelector('.span-information-delete-work').id);
        formData.append('id_cliente', document.querySelector('.span-edit-cliente').id);
        formData.append('accao', 'deleteWork');
        fetch('../core/Request.php', {
            method: 'POST',
            body: formData
        }).then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            const modal_ConfirmDeleteClient = document.querySelector('#modal_confirmDeleteWork');
            const modalConfirmDeleteClient = bootstrap.Modal.getInstance(modal_ConfirmDeleteClient);
            modalConfirmDeleteClient.hide();
            const modal_confirmCliente = document.querySelector('#modal_confirmCliente');
            const modalconfirm2 = new bootstrap.Modal(modal_confirmCliente)
            var spanBodyConfirmCliente = document.querySelector('#spanBodyConfirmCliente');
            var titleModalConfirmCliente = document.querySelector('.title-modal-confirmCliente');
            if (jsonResponse.status === "Trabalho apagado") {
                getAllTrabalhosClient();
                titleModalConfirmCliente.innerHTML = 'Supprimé chantier <span style="color:green;"><i class="fa-solid fa-circle-check"></i></span>';
                spanBodyConfirmCliente.textContent = "Chantier supprimé avec succès.";
                modalconfirm2.show();
                return false;
            }
            if (jsonResponse.status === "Trabalho nao apagado") {
                titleModalConfirmCliente.innerHTML = 'Modifier chantier <span style="color:orange;"><i class="fa-solid fa-triangle-exclamation"></i></span>';
                spanBodyConfirmCliente.textContent = "Chantier modification apportée.";
                modalconfirm2.show();
            }
        }).catch((error) => {

        });
    });
}

function appendColaboradores() {
    getColaboradores().then((jsonResponse) => {
        if (jsonResponse.length !== 0) {
            let select = document.querySelector('.select-colaborador');
            if (!select) {
                return false;
            }
            debugger
            let option = "";
            option += '<option selected>Travail atrribuè au salarié</option>';
            jsonResponse.forEach((v, k) => {
                option += '<option id="' + v.id_colaborador + '" value="' + v.nome_colaborador + '">' + v.nome_colaborador + '</option>';
            });
            select.innerHTML = option;
        } else {
            let select = document.querySelector('.select-colaborador');
            let option = "";
            option = "<option selected>Il n'y a pas de collaborateurs, créez-en un première.</option>";

            select.innerHTML = option;
        }
    }).catch((error) => {
        console.log(error);
    });
}

function softDeleteClient() {
    let btnConfirm = document.querySelector('#btn_softDeleteClient');
    if (btnConfirm) {
        btnConfirm.addEventListener('click', (e) => {
            e.preventDefault();
            const idcrypt = document.querySelector('.span-edit-cliente');
            if (!idcrypt) {
                return false;
            }
            let formData = new FormData();
            formData.append('id_cliente', idcrypt.id);
            formData.append('accao', 'softDeleteClient');
            pedido = fetch('../core/Request.php', {
                method: 'POST',
                body: formData
            }).then((response) => {
                return response.json();
            }).then((jsonResponse) => {
                const modal_confirmDeleteClient = document.querySelector('#modal_confirmDeleteClient');
                const modalConfirmDeleteClient = bootstrap.Modal.getInstance(modal_confirmDeleteClient);
                modalConfirmDeleteClient.hide();
                const modal_confirmCliente = document.querySelector('#modal_confirmCliente');
                const modalconfirm2 = new bootstrap.Modal(modal_confirmCliente)

                var spanBodyConfirmCliente = document.querySelector('#spanBodyConfirmCliente');
                var titleModalConfirmCliente = document.querySelector('.title-modal-confirmCliente');
                if (jsonResponse.status === "Soft deleted") {
                    titleModalConfirmCliente.innerHTML = 'Supprimer le client <span style="color:green;"><i class="fa-solid fa-circle-check"></i></span>';
                    spanBodyConfirmCliente.textContent = "Client supprimé avec succès, mais vous pouvez récupérer le client en accédant à l'onglet clients supprimés.";
                    modalconfirm2.show();
                    let location = "index.php?a=clients";
                    let btn = document.querySelector('#btn_modalConfirmClient');
                    windowLocation(btn, location);

                }
            }).catch((error) => {
                console.log(error);
            });
        });
    }
}

function recoveryClient() {
    let btnConfirm = document.querySelector('#btn_RecoveryClient');
    if (btnConfirm) {
        btnConfirm.addEventListener('click', (e) => {
            e.preventDefault();
            const idcrypt = document.querySelector('.span-edit-cliente');
            if (!idcrypt) {
                return false;
            }
            let formData = new FormData();
            formData.append('id_cliente', idcrypt.id);
            formData.append('accao', 'recoveryClient');
            pedido = fetch('../core/Request.php', {
                method: 'POST',
                body: formData
            }).then((response) => {
                return response.json();
            }).then((jsonResponse) => {
                const modal_confirmRecoveryClient = document.querySelector('#modal_confirmRecoveryClient');
                const modalConfirmRecoveryClient = bootstrap.Modal.getInstance(modal_confirmRecoveryClient);
                modalConfirmRecoveryClient.hide();
                const modal_confirmCliente = document.querySelector('#modal_confirmCliente');
                const modalconfirm2 = new bootstrap.Modal(modal_confirmCliente)

                var spanBodyConfirmCliente = document.querySelector('#spanBodyConfirmCliente');
                var titleModalConfirmCliente = document.querySelector('.title-modal-confirmCliente');
                if (jsonResponse.status === "Cliente recuperado") {
                    titleModalConfirmCliente.innerHTML = 'Récupéré le client <span style="color:green;"><i class="fa-solid fa-circle-check"></i></span>';
                    spanBodyConfirmCliente.textContent = "Client Récupéré avec succès.";
                    modalconfirm2.show();
                    let location = "index.php?a=history_clients";
                    let btn = document.querySelector('#btn_modalConfirmClient');
                    windowLocation(btn, location);

                }
            }).catch((error) => {
                console.log(error);
            });
        });
    }
}


///////colaborador///////
function getColaboradores() {

    let formData = new FormData();
    formData.append('accao', 'getAllColaboradores');
    var pedido = fetch('../core/Request.php', {
        method: 'POST',
        body: formData
    }).then((response) => {
        return response.json();
    });
    return pedido;

}
function setColaboradores() {
    getColaboradores().then((jsonResponse) => {
        console.log(jsonResponse)
        let div = "";
        let divAppend = document.querySelector('.card-colaborador');

        if (divAppend && jsonResponse.length !== 0) {
            jsonResponse.forEach((v, k) => {
                div += '<div class="col-md-6 col-lg-4 col-xl-3">';
                div += '<div class="contact-box center-version">';
                div += '<div class="dropdown dropdown-opcoes-colaborador">';
                div += '<span class="botao-dropdown-opcoes-colaborador" type="button" data-bs-toggle="dropdown" aria-expanded="false">';
                div += '<i class="fa-solid fa-angle-down fa-2xl"></i>';
                div += '</span>';
                div += '<ul class="dropdown-menu">';
                div += '<li>';
                div += '<span id="' + v.id_colaborador + '" data-bs-toggle="modal" data-bs-target="#modal_editColaborador" onclick="getColaborador(this)" class="dropdown-item span-edit-colaborador"><span style="color:#093f95"><i class="fa-solid fa-user-pen"></i></span>&nbsp;Modifier employé</span>';
                div += '</li>';
                div += '<li>';
                div += '<hr class="dropdown-divider">';
                div += '</li>';
                div += '<li>';
                div += '<span class="dropdown-item delete-colaborador" id="btn_deleteColaborador" data-bs-toggle="modal" data-bs-target="#modal_confirmDeleteColaborador" onclick="setModal(this)"><span style="color: rgb(214 55 55);"><i class="fa-solid fa-user-xmark"></i></span>&nbsp;Supprimer employé</span>';
                div += '</li>';
                div += '</ul>';
                div += '</div>';
                div += '<a href="#profile.html">';
                div += '<span class="circle-colaborador" style="background: ' + setRondomColors() + '">' + v.nome_colaborador[0] + (v.nome_colaborador.split(" ").length > 1 ? v.nome_colaborador.split(" ").pop()[0] : "") + '</span>';
                div += '<h3 class="m-b-xs"><strong>' + v.nome_colaborador + '</strong></h3>';
                div += '<div class="font-bold">Email: ' + v.email_colaborador + '</div>';
                div += '<address class="m-t-md">';
                div += 'Adresse: ' + v.morada_colaborador + '<br>';
                div += '<abbr title="Phone">Phone: </abbr>' + v.movel_colaborador;
                div += '</address>';
                div += '</a>';
                div += '<div class="contact-box-footer">';
                div += '<div class="m-t-xs btn-group">';
                div += '<a href="tel:+' + v.movel_colaborador + '"class="btn btn-xs btn-white"><i class="fa fa-phone"></i> Call </a>';
                div += '<a href="mailto:' + v.email_colaborador + '" class="btn btn-xs btn-white"><i class="fa fa-envelope"></i> Email</a>';
                div += '</div>';
                div += '</div>';
                div += '</div>';
                div += '</div>';
                divAppend.innerHTML = div;
            });
        }

    });
}
function getColaborador(input) {

    let nomeColaboradorUpdate = document.querySelector('input[name=nomeColaboradorUpdate]');
    let moradaColaboradorUpdate = document.querySelector('input[name=moradaColaboradorUpdate]');
    let cidadeColaboradorUpdate = document.querySelector('input[name=cidadeColaboradorUpdate]');
    let emailColaboradorUpdate = document.querySelector('input[name=emailColaboradorUpdate]');
    let movelColaboradorUpdate = document.querySelector('input[name=movelColaboradorUpdate]');
    let telefoneColaboradorUpdate = document.querySelector('input[name=telefoneColaboradorUpdate]');
    let inputsArray = [];
    inputsArray.push(nomeColaboradorUpdate, moradaColaboradorUpdate, cidadeColaboradorUpdate, emailColaboradorUpdate, movelColaboradorUpdate, telefoneColaboradorUpdate);
    for (let input of inputsArray) {
        input.value = "";
    }

    let formData = new FormData();
    formData.append('accao', 'getColaborador');
    formData.append('id_colaborador', input.id);
    fetch('../core/Request.php', {
        method: 'POST',
        body: formData
    }).then((response) => {
        return response.json();
    }).then((jsonResponse) => {

        nomeColaboradorUpdate.value = jsonResponse.nome_colaborador;
        moradaColaboradorUpdate.value = jsonResponse.morada_colaborador;
        cidadeColaboradorUpdate.value = jsonResponse.cidade_colaborador;
        emailColaboradorUpdate.value = jsonResponse.email_colaborador;
        movelColaboradorUpdate.value = jsonResponse.movel_colaborador;
        telefoneColaboradorUpdate.value = jsonResponse.telefone_colaborador;
        nomeColaboradorUpdate.setAttribute('id', jsonResponse.id_colaborador);
    }).catch((error) => {
        console.log(error);
    });
}

function createColaborador() {
    const btn_CreateColaborador = document.querySelector('#btn_CreateColaborador');

    if (btn_CreateColaborador) {

        btn_CreateColaborador.addEventListener('click', function (e) {
            e.preventDefault();
            var modal1 = document.querySelector('#modal_creatNewColaborador');
            var modal_creatNewColaborador = bootstrap.Modal.getInstance(modal1);
            const nome = document.querySelector('input[name=nomeNewColaborador]');
            if (nome.value.trim() === "") {

                let validatorNomeNewColaborador = document.querySelector("#validatorNomeNewColaborador");
                validatorNomeNewColaborador.textContent = "Le nom est requis.";
                incorrectInput(validatorNomeNewColaborador.id, nome)
                return false;
            }
            let emailColaborador = document.querySelector("input[name=emailNewColaborador]");
            if (!testEmailRegex(emailColaborador.value) && emailColaborador.value !== "") {
                let validatorEmailNewColaborador = document.querySelector("#validatorEmailNewColaborador");
                validatorEmailNewColaborador.textContent = "Entrer un email valide.";
                incorrectInput(validatorEmailNewColaborador.id, emailColaborador)
                return false;
            }
            const movel = document.querySelector('input[name=movelNewColaborador]');
            const testNumberRegex = /^[0-9]*$/;

            if (!testNumberRegex.test(movel.value)) {
                let validatorMovelNewColaborador = document.querySelector("#validatorMovelNewColaborador");
                validatorMovelNewColaborador.textContent = "Entrez un numéro de mobile valide."
                incorrectInput(validatorMovelNewColaborador.id, movel);
                return false;
            }
            const telefone = document.querySelector('input[name=telefoneNewColaborador]');
            if (!testNumberRegex.test(telefone.value)) {
                let validatorTelefoneNewColaborador = document.querySelector("#validatorTelefoneNewColaborador");
                validatorTelefoneNewColaborador.textContent = "Entrez un numéro de téléphone valide"
                incorrectInput(validatorTelefoneNewColaborador.id, telefone);
                return false;
            }
            const morada = document.querySelector('input[name=moradaNewColaborador]');

            let formData = new FormData(document.querySelector('#form_createColaborador'));
            formData.append('accao', 'createColaborador');
            fetch('../core/Request.php', {
                method: 'POST',
                body: formData
            }).then((response) => {
                return response.json();
            }).then((jsonResponse) => {
                modal_creatNewColaborador.hide();
                var modal2 = document.querySelector('#modal_createColaboradorConfirm');
                var modal_createColaboradorConfirm = new bootstrap.Modal(modal2)
                var spanIcon = document.querySelector('.span-create-colaborador-confirm-icon');
                var spanText = document.querySelector('#spanCreateColaborador');
                if (jsonResponse.status === "Colaborador criado") {
                    spanIcon.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
                    spanText.textContent = 'Employé créé avec succès';
                    spanIcon.style.color = "green";
                    setColaboradores();
                    modal_createColaboradorConfirm.show();
                }
                if (jsonResponse.status === "Erro na criacao") {
                    spanIcon.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
                    spanText.textContent = 'Erreur lors de la création du employé, réessayez plus tard';
                    spanIcon.style.color = "red";
                    modal_createColaboradorConfirm.show();
                }
            }).catch((error) => {
                console.log(error);
            });

        });
    }
}

function updateColaborador() {
    const btn_CreateColaborador = document.querySelector('#btn_updateColaborador');

    if (btn_CreateColaborador) {

        btn_CreateColaborador.addEventListener('click', function (e) {
            e.preventDefault();
            var modal1 = document.querySelector('#modal_editColaborador');
            var modal_creatNewColaborador = bootstrap.Modal.getInstance(modal1);
            const nome = document.querySelector('input[name=nomeColaboradorUpdate]');
            if (nome.value.trim() === "") {

                let validatorNomeNewColaborador = document.querySelector("#validatorNomeColaboradorUpdate");
                validatorNomeNewColaborador.textContent = "Le nom est requis.";
                incorrectInput(validatorNomeNewColaborador.id, nome)
                return false;
            }
            let emailColaborador = document.querySelector("input[name=emailColaboradorUpdate]");
            if (!testEmailRegex(emailColaborador.value) && emailColaborador.value !== "") {
                let validatorEmailNewColaborador = document.querySelector("#validatorEmailColaboradorUpdate");
                validatorEmailNewColaborador.textContent = "Entrer un email valide.";
                incorrectInput(validatorEmailNewColaborador.id, emailColaborador)
                return false;
            }
            const movel = document.querySelector('input[name=movelColaboradorUpdate]');
            const testNumberRegex = /^[0-9]*$/;

            if (!testNumberRegex.test(movel.value)) {
                let validatorMovelNewColaborador = document.querySelector("#validatorMovelColaboradorUpdate");
                validatorMovelNewColaborador.textContent = "Entrez un numéro de mobile valide."
                incorrectInput(validatorMovelNewColaborador.id, movel);
                return false;
            }
            const telefone = document.querySelector('input[name=telefoneColaboradorUpdate]');
            if (!testNumberRegex.test(telefone.value)) {
                let validatorTelefoneNewColaborador = document.querySelector("#validatorTelefoneColaboradorUpdate");
                validatorTelefoneNewColaborador.textContent = "Entrez un numéro de téléphone valide"
                incorrectInput(validatorTelefoneNewColaborador.id, telefone);
                return false;
            }
            const morada = document.querySelector('input[name=moradaColaboradorUpdate]');

            let formData = new FormData(document.querySelector('#form_colaboradorpdate'));
            formData.append('accao', 'updateColaborador');
            formData.append('id_colaborador', nome.id);
            fetch('../core/Request.php', {
                method: 'POST',
                body: formData
            }).then((response) => {
                return response.json();
            }).then((jsonResponse) => {
                console.log(jsonResponse)
                modal_creatNewColaborador.hide();
                var modal2 = document.querySelector('#modal_createColaboradorConfirm');
                var modal_createColaboradorConfirm = new bootstrap.Modal(modal2)
                var spanIcon = document.querySelector('.span-create-colaborador-confirm-icon');
                var spanText = document.querySelector('#spanCreateColaborador');
                if (jsonResponse.status === "Colaborador atualizado") {
                    spanIcon.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
                    spanText.textContent = 'Employé modifié avec succès';
                    spanIcon.style.color = "green";
                    setColaboradores();
                    modal_createColaboradorConfirm.show();
                }
                if (jsonResponse.status === "Colaborador nao atualizado") {
                    spanIcon.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
                    spanText.textContent = 'Erreur lors de la modifié du employé, réessayez plus tard';
                    spanIcon.style.color = "red";
                    modal_createColaboradorConfirm.show();
                }
            }).catch((error) => {
                console.log(error);
            });

        });
    }
}

function deleteColaborador(input) {
    let btn = input;

    if (!btn) {
        return false;
    }
    let formData = new FormData();
    formData.append('id_colaborador', document.querySelector('.span-information-delete-colaborador').id);
    formData.append('accao', 'deleteColaborador');
    fetch('../core/Request.php', {
        method: 'POST',
        body: formData
    }).then((response) => {
        return response.json();
    }).then((jsonResponse) => {
        console.log(jsonResponse)
        const modal_confirmDeleteColaborador = document.querySelector('#modal_confirmDeleteColaborador');
        const modalConfirmDeleteColaborador = bootstrap.Modal.getInstance(modal_confirmDeleteColaborador);
        modalConfirmDeleteColaborador.hide();
        const modal_createColaboradorConfirm = document.querySelector('#modal_createColaboradorConfirm');
        const modalCreateColaboradorConfirm = new bootstrap.Modal(modal_createColaboradorConfirm)
        var spanIcon = document.querySelector('.span-create-colaborador-confirm-icon');
        var spanText = document.querySelector('#spanCreateColaborador');
        if (jsonResponse.status === "Colaborador apagado") {
            spanIcon.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
            spanText.textContent = 'Employé supprimé avec succès';
            spanIcon.style.color = "green";
            setColaboradores();
            modalCreateColaboradorConfirm.show();
        }
        if (jsonResponse.status === "Colaborador nao apagado") {
            spanIcon.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
            spanText.textContent = 'Erreur lors de la supprimé du employé, réessayez plus tard';
            spanIcon.style.color = "red";
            modalCreateColaboradorConfirm.show();
        }
    }).catch((error) => {
        console.log(error);
    });
}

///logout//
function logout() {
    const btn = document.querySelector('#btn_logout');
    if (!btn) {
        return false;
    }
    btn.addEventListener('click', () => {
        debugger
        let form = new FormData();
        form.append('accao', 'setLogout');
        fetch('../core/Request.php', {
            method: 'POST',
            body: form
        }).then(() => {
            window.location.href = 'index.php';
        }).catch((error) => {
            console.log(error);
        });
    });

}

//recovery pass //
function setInputEmailRecovery() {
    debugger
    document.querySelector('input[name=recovery-pass]').value = document.querySelector('input[name=emailLogin]').value;
}

function sendEmail() {
    const btn = document.querySelector('#btn-submitRecoveryPass');
    if (!btn) {
        return false;
    }
    btn.addEventListener('click', () => {
        
        let emailRecovery = document.querySelector('input[name=recovery-pass]');
        let email_validatorRecovery = document.querySelector("#email_validatorRecovery");
        if (emailRecovery.value.trim() === "") {
            email_validatorRecovery.textContent = "Entrez l'e-mail";
            incorrectInput(email_validatorRecovery.id, emailRecovery)
            return false;
        }
        if (!testEmailRegex(emailRecovery.value)) {
            email_validatorRecovery.textContent = "Entrer un email valide";
            incorrectInput(email_validatorRecovery.id, emailRecovery)
            return false;
        }
        let form = new FormData();
        form.append('emailRecovey', emailRecovery.value)
        form.append('accao', 'sendEmail');
        fetch('../core/Request.php', {
            method: 'POST',
            body: form
        }).then((response) => {
            return response.json();
        }).then((jsonResponse)=>{
            console.log(jsonResponse);
        }).catch((error) => {
            console.log(error);
        });
    });
}