<ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
        <button class="nav-link active" id="profile-tab" style="font-weight: bold;" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Détails de l'utilisateur</button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="profiledit-tab" style="font-weight: bold;" data-bs-toggle="tab" data-bs-target="#profiledit" type="button" role="tab" aria-controls="profiledit" aria-selected="true">Modifier l'utilisateur</button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="profileditPass-tab" style="font-weight: bold;" data-bs-toggle="tab" data-bs-target="#profileditPass" type="button" role="tab" aria-controls="profileditPass" aria-selected="true">Changer le mot de passe</button>
    </li>
</ul>
<div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
        <div class="div-user-content">
            <div class="icon-user-div"> 
                <span class="circle-user"><?php echo $_SESSION['user']->nome[0] ?></span>
                <span class="name-right-circle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php echo $_SESSION['user']->nome ?></span>
            </div>
            <br>
            <div>
                <div class="div-user-details"></div>

            </div>
        </div>
    </div>

    <div class="tab-pane fade" id="profiledit" role="tabpanel" aria-labelledby="profiledit-tab">
        <div class="div-user-content">
            <div>
                <span class="circle-user"><?php echo $_SESSION['user']->nome[0] ?></span>
                <span class="name-right-circle">&nbsp;&nbsp;&nbsp;<?php echo $_SESSION['user']->nome ?></span>
            </div>
            <br>
            <div>
                <div class="div-user-details-edit">
                    <form id="form_updateUser">
                        <span class="span-details"><b>Nom d'utilisateur:</b></span>
                        <input type="text" name="nameUserUpdate" onkeyup="onChangedInputs(this)"/>
                        <span id="name_UpdateValidator"></span>
                        <br><span class="span-details"><b>E-mail:</b></span>
                        <input type="text" name="emailUserUpdate" onkeyup="onChangedInputs(this)"/>
                        <span id="email_UpdateValidator"></span><br><br>
                        <button id="btn_updateUser" type="button" class="btn btn-primary btn-changes" data-bs-toggle='modal' data-bs-target='#modal_UpdateUser'>Changer <i class="fa-solid fa-arrow-right-to-bracket"></i></button>
                    </form>
                    <br>
                    <div id="resultMessageDiv"></div>


                </div>

            </div>
        </div>
    </div>
    <div class="tab-pane fade" id="profileditPass" role="tabpanel" aria-labelledby="profileditPass-tab">
        <div class="div-user-content">
            <div>
                <span class="circle-user"><?php echo $_SESSION['user']->nome[0] ?></span>
                <span class="name-right-circle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php echo $_SESSION['user']->nome ?></span>
            </div>
            <br>
            <div>
                <div class="div-user-details-edit">
                    <form id="form_passUpdateUser">
                        <span class="span-details"><b>Mot de passe actuel:</b></span>
                        <input type="password" name="passAtualUserUpdate" onkeyup="onChangedInputs(this)"/>
                        <span id="passAtual_UpdateValidator"></span>
                        <br><span class="span-details"><b>Nouveau mot de passe:</b></span>
                        <input type="password" name="passUserUpdate" onkeyup="onChangedInputs(this)"/>
                        <span id="pass_UpdateValidator"></span>
                        <br><span class="span-details"><b>Confirmez le mot de passe:</b></span>
                        <input type="password" name="confirmPassUserUpdate" onkeyup="onChangedInputs(this)"/>
                        <span id="confirmPass_UpdateValidator"></span><br><br>
                        <button id="btn_passUpdateUser" type="button" class="btn btn-primary btn-changes" data-bs-toggle='modal' data-bs-target='#modal_UpdateUserPass'>Changer <i class="fa-solid fa-arrow-right-to-bracket"></i></button>
                    </form>
                    <br>
                    <div id="resultMessageDivUpdatePass"></div>
                </div>

            </div>
        </div>
    </div>


</div>


<div class="modal fade" id="modal_UpdateUser" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Modifier l'utilisateur <i style="color: orange" class="fa-solid fa-triangle-exclamation"></i></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <span>Allez-vous apporter des modifications à votre profil utilisateur, voulez-vous continuer?</span>
                <br>
                <span>Attention, si vous apportez des modifications, la session sera supprimée, et vous devrez vous connecter.</span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button id="btn_updatdeUserConfirm" type="submit" class="btn btn-primary">Confirmer</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_UpdateUserPass" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Modifier l'utilisateur <i style="color: orange" class="fa-solid fa-triangle-exclamation"></i></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <span>Allez-vous apporter des modifications à votre profil utilisateur, voulez-vous continuer?</span>
                <br>
                <span>Attention, si vous apportez des modifications, la session sera supprimée, et vous devrez vous connecter.</span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button id="btn_updatdeUserPassConfirm" type="submit" class="btn btn-primary">Confirmer</button>
            </div>
        </div>
    </div>
</div>