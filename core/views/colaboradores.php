<h1 style="font-family: ubuntu, sans-serif; font-weight: 700; font-style: normal; color: rgb(66, 66, 66);">Employês - <span class="botao-new-colaborador" data-bs-toggle="modal" data-bs-target="#modal_creatNewColaborador"><i class="fa-solid fa-user-plus"></i></span></h1>
<hr><br>
<div class="conteiner ">
    <div class="row card-colaborador">';
    </div>
</div>

<div class="modal fade" id="modal_editColaborador" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" style=" background-color: #f0faff;">
                <h4 style="color: #1b48bb; font-weight: bold;" class="modal-title" id="staticBackdropLabel">Modifier Employê&nbsp;<i class="fa-solid fa-user-plus"></i></h4>
            </div>
            <div class="modal-body">
                <div class="div-colaborador-details-edit">
                    <form id="form_colaboradorpdate">
                        <span class="span-details">* Nom du Employê</span>
                        <input type="text" name="nomeColaboradorUpdate" onkeyup="onChangedInputs(this)" />
                        <span id="validatorNomeColaboradorUpdate"></span>
                        <br><span class="span-details">Adresse:</span>
                        <input type="text" name="moradaColaboradorUpdate" onkeyup="onChangedInputs(this)" />
                        <span id="validatorMoradaColaboradorUpdate"></span>
                        <br><span class="span-details">Ville:</span>
                        <input type="text" name="cidadeColaboradorUpdate" onkeyup="onChangedInputs(this)" />
                        <span id="validatorCidadeColaboradorUpdate"></span>
                        <br><span class="span-details">E-mail:</span>
                        <input type="text" name="emailColaboradorUpdate" onkeyup="onChangedInputs(this)" />
                        <span id="validatorEmailColaboradorUpdate"></span>
                        <br><span class="span-details">Téléphone portable:</span>
                        <input type="text" name="movelColaboradorUpdate" onkeyup="onChangedInputs(this)" />
                        <span id="validatorMovelColaboradorUpdate"></span>
                        <br><span class="span-details">Téléphone fixe:</span>
                        <input type="text" name="telefoneColaboradorUpdate" onkeyup="onChangedInputs(this)" />
                        <span id="validatorTelefoneColaboradorUpdate"></span>

                    </form>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button id="btn_updateColaborador" type="submit" class="btn btn-primary btn-changes">Confirmer</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_creatNewColaborador" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" style=" background-color: antiquewhite;">
                <h4 style="color: #5d5d5d; font-weight: bold;" class="modal-title" id="staticBackdropLabel">Créer Employê&nbsp;<i class="fa-solid fa-user-plus"></i></h4>
            </div>
            <div class="modal-body">
                <div class="div-colaborador-details-edit">
                    <form id="form_createColaborador">
                        <span class="span-details">* Nom du Employê</span>
                        <input type="text" name="nomeNewColaborador" onkeyup="onChangedInputs(this)" />
                        <span id="validatorNomeNewColaborador"></span>
                        <br><span class="span-details">Adresse:</span>
                        <input type="text" name="moradaNewColaborador" onkeyup="onChangedInputs(this)" />
                        <span id="validatorMoradaNewColaborador"></span>
                        <br><span class="span-details">Ville:</span>
                        <input type="text" name="cidadeNewColaborador" onkeyup="onChangedInputs(this)" />
                        <span id="validatorCidadeNewColaborador"></span>
                        <br><span class="span-details">E-mail:</span>
                        <input type="text" name="emailNewColaborador" onkeyup="onChangedInputs(this)" />
                        <span id="validatorEmailNewColaborador"></span>
                        <br><span class="span-details">Téléphone portable:</span>
                        <input type="text" name="movelNewColaborador" onkeyup="onChangedInputs(this)" />
                        <span id="validatorMovelNewColaborador"></span>
                        <br><span class="span-details">Téléphone fixe:</span>
                        <input type="text" name="telefoneNewColaborador" onkeyup="onChangedInputs(this)" />
                        <span id="validatorTelefoneNewColaborador"></span>

                    </form>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button id="btn_CreateColaborador" type="submit" class="btn btn-primary btn-changes">Confirmer</button>
            </div>
        </div>
    </div>
</div>
</div>
<div class="modal fade" id="modal_createColaboradorConfirm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="staticBackdropLabel">Créer employé.&nbsp;<span class="span-create-colaborador-confirm-icon"></span></h4>
            </div>
            <div class="modal-body">
                <p><span id="spanCreateColaborador"></span></p>
                <span class="span-information-delete-colaborador"></span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Fermer</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_confirmDeleteColaborador" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" style="background-color: #ffe4e4;"> 
                <h4 style="color: #8b0505;" class="modal-title" id="staticBackdropLabel">Supprimé employé&nbsp;<i class="fa-solid fa-triangle-exclamation"></i></h4>
            </div>
            <div class="modal-body">
                <span>Le employé sera supprimé, êtes-vous sûr?</span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button id="btn_deleteColaborador" type="button" onclick="deleteColaborador(this)" class="btn btn-danger">Confirmer</button>
            </div>
        </div>
    </div>
</div>