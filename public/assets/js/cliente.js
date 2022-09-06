document.addEventListener('DOMContentLoaded', function () {
    getClients();
    getHistoryClients();
    deleteClient();
    softDeleteClient();
    recoveryClient();
    getClienteDetails();
    validateUpdateCliente();
    updateCliente();
    createCliente();
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
        let tableId = $('#tableClients');
        tableClients(jsonResponse, tableId);

    }).catch((error) => {
        console.log(error);
    });
    return pedido;
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
            document.querySelector('.loading-gif').innerHTML = '<img src="../public/assets/images/App/loading.gif"/>';
            let formData = new FormData(document.querySelector('#form_clientUpdate'));
            formData.append('id', idcrypt.id);
            formData.append('accao', 'updateCliente');
            var pedido = fetch('../core/Request.php', {
                method: 'POST',
                body: formData
            }).then((response) => {
                document.querySelector('.loading-gif').innerHTML = "";
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
                if (jsonResponse.status === "Erro na alteracao") {
                    titleModalConfirmCliente.innerHTML = 'Modifier le client <span style="color:red;"><i class="fa-solid fa-circle-info"></i></span>';
                    spanBodyConfirmCliente.textContent = "Erreur lors de la modification, veuillez réessayer plus tard..";
                    modalconfirm2.show();
                    return false;
                }

            }).catch((error) => {
                document.querySelector('.loading-gif').innerHTML = "";
                titleModalConfirmCliente.innerHTML = 'Modifier le client <span style="color:red;"><i class="fa-solid fa-circle-info"></i></span>';
                spanBodyConfirmCliente.textContent = "Erreur lors de la modification, veuillez réessayer plus tard..";
                modalconfirm2.show();
            });
            return pedido;
        });
    }
}

function createCliente() {
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
            document.querySelector('.loading-gif').innerHTML = '<img src="../public/assets/images/App/loading.gif"/>';
            modal_creatNewClient.hide();
            let formData = new FormData(document.querySelector("#form_newClient"));
            formData.append('accao', 'createNewClient');
            var pedido = fetch('../core/Request.php', {
                method: 'POST',
                body: formData
            }).then((response) => {
                document.querySelector('.loading-gif').innerHTML = "";
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
                document.querySelector('.loading-gif').innerHTML = "";
                modal_creatNewClient.hide();
                var spanIcon = document.querySelector('.span-create-client-confirm-icon');
                var spanText = document.querySelector('#spanCreateCliente');
                spanIcon.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
                spanText.textContent = 'Erreur lors de la création du client, réessayez plus tard';
                spanIcon.style.color = "red";
                modal_createClientConfirm.show();
            });
            return pedido;
        });
    }
}

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
                    spanBodyConfirmCliente.textContent = "Client supprimé avec succès.";
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

function softDeleteClient() {
    let btnConfirm = document.querySelector('#btn_softDeleteClient');
    if (btnConfirm) {
        btnConfirm.addEventListener('click', (e) => {
            e.preventDefault();
            const idcrypt = document.querySelector('.span-edit-cliente');
            if (!idcrypt) {
                return false;
            }
            document.querySelector('.loading-gif').innerHTML = '<img src="../public/assets/images/App/loading.gif"/>';
            let formData = new FormData();
            formData.append('id_cliente', idcrypt.id);
            formData.append('accao', 'softDeleteClient');
            pedido = fetch('../core/Request.php', {
                method: 'POST',
                body: formData
            }).then((response) => {
                document.querySelector('.loading-gif').innerHTML = "";
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
                document.querySelector('.loading-gif').innerHTML = "";
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

