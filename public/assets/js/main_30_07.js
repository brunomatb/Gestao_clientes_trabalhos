$(document).ready(function () {
    var fullHeight = function () {
        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function () {
            $('.js-fullheight').css('height', $(window).height());
        });
    };
    fullHeight();

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#content').toggleClass('active_content');
    });
    $.datetimepicker.setLocale('fr');
    dataInicio();
    moment().format();

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

//carregar funções quando dom estiver carregada//
document.addEventListener('DOMContentLoaded', function () {
    userLogin();
    getUserDetails();
    updateUserDetails();
    updateUserPass();
    initiToolTip();

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

function verifyIntialDateIsEmpty(element) {
    let startDate = document.querySelector('input[name=dataInicioCreateWork]');

    if (startDate.value.trim() === "") {
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

            let textEmailregex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            let emailLogin = document.querySelector("input[name=emailLogin]");
            let passLogin = document.querySelector("input[name=passLogin]");
            if (emailLogin.value.trim() === "") {
                let email_validator = document.querySelector("#email_validator");
                email_validator.textContent = "Entrez l'e-mail";
                incorrectInput(email_validator.id, emailLogin)
                return false;
            }
            if (!textEmailregex.test(emailLogin.value)) {
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
            let textEmailregex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            let email = document.querySelector('input[name=emailUserUpdate]');
            if (!textEmailregex.test(email.value)) {
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
                console.log(jsonResponse);
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
                console.log(jsonResponse);
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
    getClientAndWorks();
    validateUpdateCliente();
    updateCliente();
    validateNewCliente();
    getAllTrabalhosClient();
    getColaboradores();
    createWork();
});

function getClients() {

    let formData = new FormData();
    formData.append('accao', 'getAllClients');
    var pedido = fetch('../core/Request.php', {
        method: 'POST',
        body: formData
    }).then((response) => {
        return response.json();
    }).then((jsonResponse) => {
        tableClients(jsonResponse);
        tableFilters(jsonResponse);
    }).catch((error) => {
        console.log(error);
    });
    return pedido;
}

function tableClients(jsonData, state = { 'page': 1, 'rows': 5 }) {
    let tbody = document.querySelector('#tableClients > tbody');
    if (!tbody) {
        return false;
    }
    let jsonPag = setPagination(jsonData, state);
    console.log(jsonPag)
    let tr = "";
    tbody.innerHTML = tr;
    jsonPag.data.forEach((v, k) => {
        tbody.innerHTML = "";
        if (v.nome_cliente) {
            tr += "<tr><td style='width: 10%'><a href='../public/index.php?a=client&id=" + v.id_cliente + "' data-bs-toggle='tooltip' data-bs-html='true' title='Détails de l'utilisateur'><i class='fa-solid fa-address-card fa-2xl'></i></a></td>";
            tr += "<td style='width: 30%'>" + v.nome_cliente + "</td>";
            tr += "<td style='width: 30%'>" + v.movel_cliente + "</td>";
            tr += "<td style='width: 30%'>" + v.morada_cliente + "</td></tr>";

            tbody.innerHTML = tr;

        }
    });
    setButtonsPagination(jsonPag.pages, state.page);
}

function tableFilters(jsonData) {
    var page = 1;
    var rows = 5;
    state = { 'page': page, 'rows': rows }
    var orderNum = false;
    var orderMovel = false;
    var orderMorada = false;
    var resultSort = jsonData;
    var inputs = [];

    var inputPesquisa = document.querySelector('#inputPesquisaAll');
    var inputSort = document.querySelectorAll('#tableClients thead tr th span');
    var selectItemPerPage = document.querySelector('#selectItemPerPage');
    var divPagSpan = document.querySelectorAll('.div-pagination span');
    if (!inputPesquisa || !inputSort || !selectItemPerPage || !divPagSpan) {
        return false;
    }
    divPagSpan.forEach(function (spanPag) {
        inputs.push(spanPag);
    });
    inputSort.forEach(function (span) {
        inputs.push(span);
    });
    inputs.push(selectItemPerPage);
    inputs.push(inputPesquisa);
    inputs.forEach(function (input) {
        var click = "";
        switch (input.id) {
            case "inputPesquisaAll":
                click = "keyup";
                break;
            case "selectItemPerPage":
                click = "change";
                break;
            default:
                click = "click";
        }

        $(document).on(click, "#" + input.id, function () {
            switch (input.id) {
                case "inputPesquisaAll":
                    resultSort = shearchTableClients(jsonData, input);
                    break;
                case "inputSortName":
                    orderNum = !orderNum;
                    if (resultSort.length !== 0) {
                        resultSort = sortTable(resultSort, input, orderNum);
                    } else {
                        resultSort = sortTable(jsonData, input, orderNum);
                    }
                    break;
                case "inputSortMobile":
                    orderMovel = !orderMovel;
                    if (resultSort.length !== 0) {
                        resultSort = sortTable(resultSort, input, orderMovel);
                    } else {
                        resultSort = sortTable(jsonData, input, orderMovel);
                    }
                    break;
                case "inputSortMorada":
                    orderMorada = !orderMorada;
                    if (resultSort.length !== 0) {
                        resultSort = sortTable(resultSort, input, orderMorada);
                    } else {
                        resultSort = sortTable(jsonData, input, orderMorada);
                    }
                    break;
                default:
                    debugger
                    if (input.value !== undefined) {
                        rows = input.value
                        page = 1;
                    } else {
                        rows;

                    }

                    input.id !== undefined && input.id !== 'selectItemPerPage' && input.id !== "pagPrev" && input.id !== "pagNext" ? page = input.id : page;
                    input.id === "pagPrev" && parseInt(page) != 1 ? page = parseInt(page) - 1 : page;
                    input.id === "pagNext" ? page = parseInt(page) + 1 : page;
                    let totalPageRows = parseInt((page - 1) * state.rows);
                    input.id === "pagNext" && totalPageRows > resultSort.length ? page = parseInt(page - 1) : page;
                    state = { 'page': page, 'rows': rows }
                    resultSort.length === 0 ? resultSort = jsonData : resultSort;
                    break;
            }
            tableClients(resultSort, state);

        });
    });
}

function setButtonsPagination(pages, idPagAtual) {
    let i = 1;
    let div = "";
    div += '<span id="pagPrev"><i class="fa-solid fa-angles-left fa-xl"></i></span>';
    let divPag = document.querySelector('.div-pagination');
    for (i = i; i <= pages; i++) {
        if (i < 4) {
            div += "<span id='" + (i) + "'>" + (i) + "</span>";
        }
    }
    if (pages > 3) {
        div += "<span id='" + (i) + "'>...</span>";
    }


    div += '<span id="pagNext"><i class="fa-solid fa-angles-right fa-xl"></i></span>';
    divPag.innerHTML = div;

    parseInt(idPagAtual) > parseInt(pages) ? idPagAtual = 1 : idPagAtual;
    if (idPagAtual < 5) {
        var idSpan = document.querySelectorAll(".div-pagination span")[idPagAtual];
        idSpan.classList.add("span-pag-select");
    } else {
        document.querySelectorAll(".div-pagination span")[4].classList.add("span-pag-select");
    }

}

function shearchTableClients(jsonData, inputPesquisa) {
    var result = [];
    console.log(inputPesquisa.value)
    jsonData.forEach((v, k) => {
        if (v.nome_cliente.toLowerCase().includes(inputPesquisa.value.toLowerCase(), 0)) {
            result.push(v);
        }
    });
    return result;
}

function sortTable(JsonData, inputSort, order) {
    if (inputSort.id === "inputSortMobile") {
        JsonData.sort(function (a, b) {
            return order ? a.movel_cliente - b.movel_cliente : b.movel_cliente - a.movel_cliente;
        });
    }
    if (inputSort.id === "inputSortName") {
        JsonData.sort(function (a, b) {
            return order ? a.nome_cliente.toLowerCase() > b.nome_cliente.toLowerCase() ? 1 : -1 : a.nome_cliente.toLowerCase() < b.nome_cliente.toLowerCase() ? 1 : -1;
        });
    }
    if (inputSort.id === "inputSortMorada") {
        JsonData.sort(function (a, b) {
            return order ? a.morada_cliente.toLowerCase() > b.morada_cliente.toLowerCase() ? 1 : -1 : a.morada_cliente.toLowerCase() < b.morada_cliente.toLowerCase() ? 1 : -1;
        });
    }
    return JsonData;
}

function setPagination(jsonData, state) {
    console.log(jsonData.length)
    let startPoint = (state.page - 1) * state.rows;
    let finalPoint = parseInt(startPoint) + parseInt(state.rows);
    data = jsonData.slice(startPoint, finalPoint);
    let pages = Math.ceil(jsonData.length / state.rows);

    return { 'data': data, 'pages': pages };
}
//////////////////////////////////////////////////////////////
////////////////////Cliente e trabalhos//////////////////////
/////////////////////////////////////////////////////////////
function getClientAndWorks() {
    var idcrypt = document.querySelector('.span-edit-cliente');
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
        var spans = [];
        spanValues.forEach((v, k) => {
            spans.push(v);
        });
        spans.push(titleClientName);
        valuesClient(jsonResponse, inputs);
        valuesClient(jsonResponse, spans);
    }).catch((error) => {
        console.log(error);
    });
    return pedido;

}

function valuesClient(jsonResponse, inputs) {

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
    } else {
        inputs[0].value = jsonResponse.nome_cliente;
        inputs[1].value = jsonResponse.email_cliente;
        inputs[2].value = jsonResponse.movel_cliente;
        inputs[3].value = jsonResponse.telefone_cliente;
        inputs[4].value = jsonResponse.morada_cliente;
        inputs[5].value = jsonResponse.cidade_cliente;
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
            let textEmailregex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if (!textEmailregex.test(emailCliente.value) && emailCliente.value !== "") {
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
            var idcrypt = document.querySelector('.span-edit-cliente');
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
                    getClientAndWorks();
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
            let textEmailregex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if (!textEmailregex.test(emailCliente.value) && emailCliente.value !== "") {
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
    var idcrypt = document.querySelector('.span-edit-cliente');
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
        console.log(jsonResponse)
        if (jsonResponse.length !== 0) {
            var divAppend = document.querySelector('.div-all-works');
            trabalhoTemplate(jsonResponse, divAppend);
        }
    }).catch((error) => {
        console.log(error);
    });
    return pedido;

}

function trabalhoTemplate(jsonResponse, divAppend) {
    var div = "";
    var dateNow = new Date().toLocaleString("default", { day: "2-digit", month: "2-digit", year: "numeric" });
    const colors = ['#3ccb22', '#226fcb', '#dbcc1a', '#c32d13', '#a613c3'];

    jsonResponse.forEach((v, k) => {

        let colorsRandom = Math.floor(Math.random() * colors.length);
        div += '<div class="div-works" style="border-left: solid 5px ' + colors[colorsRandom] + '">';
        div += '<button class="accordion-button collapsed accord#a613c3ion-button-work" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne' + k + '" aria-expanded="false" aria-controls="collapseOne">';
        div += '<div class="nome-trabalho">';
        div += '<span>' + v.nome_trabalho + '</span>';
        div += '</div>';
        div += '</button>'
        div += '<div id="collapseOne' + k + '" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">';
        div += '<div class="accordion-body">';
        div += '<div class="div-corpo-trabalho">';
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
        div += '<div class="span-value-word"><span >' + v[0].colaborador + '</span></div>';
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


///////colaborador///////

function getColaboradores() {

    let formData = new FormData();
    formData.append('accao', 'getAllColaboradores');
    pedido = fetch('../core/Request.php', {
        method: 'POST',
        body: formData
    }).then((response) => {
        return response.json();
    }).then((jsonResponse) => {
        if (jsonResponse.length !== 0) {
            let select = document.querySelector('.select-colaborador');
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
                getAllTrabalhosClient();
                titleModalConfirmCliente.innerHTML = 'Création de chantier <span style="color:green;"><i class="fa-solid fa-circle-check"></i></span>';
                spanBodyConfirmCliente.textContent = "Chantier créé avec succès.";
                modalconfirm2.show();
            }
        }).catch((error) => {
            console.log(error);
        });
    });



}





