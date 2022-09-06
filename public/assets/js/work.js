document.addEventListener('DOMContentLoaded', function () {
    createWork();
    updateWork();
    deleteWork();
    getAllworks();
    getAllTrabalhosClient();
});
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