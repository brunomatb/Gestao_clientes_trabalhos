document.addEventListener('DOMContentLoaded', function () {
    userLogin();
    getUserDetails();
    updateUserDetails();
    updateUserPass();
    logout();
    sendEmail();
});

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
    }).catch((error) => {
        console.log("error: " + error);
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

///send email//
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
        }).then((jsonResponse) => {
            const modal_recoverPass = document.querySelector('#modalRecoverPass');
            const modalRecoverPass = bootstrap.Modal.getInstance(modal_recoverPass);
            modalRecoverPass.hide();
            const modal_confirmRecovery = document.querySelector('#modal_confirmRecovery');
            const modalConfirmRecovery = new bootstrap.Modal(modal_confirmRecovery)
            var spanIcon = document.querySelector('.span-icon');
            var spanText = document.querySelector('#spanBodyConfirmRecovery');
            if (jsonResponse.status === "Mail enviado") {
                spanIcon.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
                spanText.innerHTML = '<p>Un e-mail a été envoyé pour réinitialiser le mot de passe.</p><p>La commande est valable 30 minutes.</p><p>Merci</p>';
                spanIcon.style.color = "green";
                modalConfirmRecovery.show();
            }
            if (jsonResponse.status === "Mail nao existe") {
                spanIcon.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
                spanText.innerHTML = "<p>E-mail invalide, veuillez confirmer l'e-mail et repasser la commande.</p><p>Merci</p>";
                spanIcon.style.color = "red";
                modalConfirmRecovery.show();
            }
        }).catch((error) => {
            console.log(error);
        });
    });
}