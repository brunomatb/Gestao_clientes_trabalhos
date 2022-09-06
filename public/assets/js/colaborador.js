document.addEventListener('DOMContentLoaded', function () {
    createColaborador();
    updateColaborador();
    setColaboradores();
    appendColaboradores();
});

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

    }).catch(() => {
        console.log('Erro ao popular colaboradores');
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
