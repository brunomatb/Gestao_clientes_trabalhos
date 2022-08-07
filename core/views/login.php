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
                    <input type="email" placeholder="email@email.com" name="emailLogin" onkeyup="onChangedInputs(this)"/>
                    <span id="email_validator"></span>
                    <span class="span-icon-login"><i class="fa-solid fa-user"></i></span>
                    
                </div>
                <div class="pass-div-login">
                    <span>Mot de passe</span>
                    <input type="password" placeholder="******" name="passLogin" onkeyup="onChangedInputs(this)"/>
                    <span id="pass_validator"></span>
                    <span class="span-icon-login"><i class="fa-solid fa-key"></i></span>
                    
                </div>
                <div class="btn-div-login">
                    <br>
                    <button type="submit" id="btn_login">Connexion&nbsp;<i class="fa-solid fa-right-to-bracket"></i></button>
                </div>
                <div class="btn-div-login">
                    <span>Mot de passe oublié?</span>
                </div>

            </form>
        </div>

        <?php }?>