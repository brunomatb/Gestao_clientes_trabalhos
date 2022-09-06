<?php if (!$sessaoIniciada) { ?>
    <img src="../public/assets/images/App/Background.jpg" class="fundo-img">
    <div class="container">
        <div class="row justify-content-center div-login">
            <div class="col-md-5 col-sm-8 col-11 shadow bg-white rounded" style="box-shadow: 1px 3px 7px black !important;">
                <div class="h3-div-login">
                    <h3>Login</h3>
                    <hr>
                </div>
                <form id="form_login" method="POST">
                    <div class="email-div-login">
                        <span>Votre e-mail</span>
                        <input type="email" placeholder="email@email.com" name="emailLogin" onkeyup="onChangedInputs(this)" />
                        <span id="email_validator"></span>
                        <span class="span-icon-login"><i class="fa-solid fa-user"></i></span>
                    </div>
                    <div class="pass-div-login">
                        <span>Mot de passe</span>
                        <input type="password" placeholder="******" name="passLogin" onkeyup="onChangedInputs(this)" />
                        <span id="pass_validator"></span>
                        <span class="span-icon-login"><i class="fa-solid fa-key"></i></span>
                    </div>
                    <div class="btn-div-login">
                        <br>
                        <button type="submit" id="btn_login">Connexion&nbsp;<i class="fa-solid fa-right-to-bracket"></i></button>
                    </div>
                    <div class="btn-div-login">
                        <span id="btn_recoveryPass" data-bs-toggle="modal" data-bs-target="#modalRecoverPass" onclick="setInputEmailRecovery()">Mot de passe oublié?</span>
                        <span id="email_validator"></span>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalRecoverPass" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="exampleModalLabel">Récupération de mot de passe</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Bonjour à tous,</p>
                    <p>Si vous souhaitez réinitialiser votre mot de passe, veuillez confirmer l'e-mail et cliquer sur le bouton ci-dessous:</p>
                    <input type="email" name="recovery-pass" placeholder="email@email.com" onkeyup="onChangedInputs(this)">
                    <span id="email_validatorRecovery" class="mb-4" style="display: table-row; height: 28px;"></span>
                    <span class="span-email-icon-recovery"><i class="fa-solid fa-at"></i></span>
                    <button type="button" id="btn-submitRecoveryPass" class="btn btn-outline-success mb-3">Réinitialiser passe</button>
                    <p>Un email sera envoyé pour réinitialiser le mot de passe. <br>Merci<br>L'administrateur.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modal_confirmRecovery" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title title-modal-confirmRecovery" id="staticBackdropLabel">Réinitialiser le mot de passe <span class="span-icon"></span></h4>
                </div>
                <div class="modal-body">
                    <p><span id="spanBodyConfirmRecovery"></span></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Fermer</button>
                </div>
            </div>
        </div>
    </div>
<?php } ?>