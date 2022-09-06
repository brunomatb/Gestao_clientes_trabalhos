<div class="add-new-client">
    <h3><b style="padding: 10px;"><i class="fa-solid fa-address-card"></i>&nbsp;Clients</b></h3>
    <button id="btn_addNewWork" type="button" class="btn btn-primary btn-sm btn-changes me-2" data-bs-toggle='modal' data-bs-target='#modal_creatNewClient'>Nouveau client&nbsp;&nbsp;<i class="fa-solid fa-user-plus"></i></button>
</div>

<table class="display responsive" id="tableClients" style="width:100%">
    <thead>
        <tr>
            <th>Actions</th>
            <th>Nom</th>
            <th>Telephone</th>
            <th>E-mail</th>
            <th>Adresse</th>
            <th>Date de création</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>


<div class="modal fade" id="modal_creatNewClient" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" style="background-color: aliceblue;">
                <h4 style="color:#2d76ce; font-weight: bold; " class="modal-title" id="staticBackdropLabel">Créer un nouveau client&nbsp;<span><i class="fa-solid fa-user-plus"></i></span></h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="div-client-details-edit">
                    <form id="form_newClient">
                        <span class="span-details">* Nom du client:</span>
                        <input type="text" name="nomeNewCliente" onkeyup="onChangedInputs(this)" />
                        <span id="validatorNomeNewCliente"></span>
                        <br><span class="span-details">E-mail:</span>
                        <input type="text" name="emailNewCliente" onkeyup="onChangedInputs(this)" />
                        <span id="validatorEmailNewCliente"></span>
                        <br><span class="span-details">Téléphone portable:</span>
                        <input type="text" name="movelNewCliente" onkeyup="onChangedInputs(this)" />
                        <span id="validatorMovelNewCliente"></span>
                        <br><span class="span-details">Téléphone fixe:</span>
                        <input type="text" name="telefoneNewCliente" onkeyup="onChangedInputs(this)" />
                        <span id="validatorTelefoneNewCliente"></span>
                        <br><span class="span-details">* Adresse:</span>
                        <input type="text" name="moradaNewCliente" onkeyup="onChangedInputs(this)" />
                        <span id="validatorMoradaNewCliente"></span>
                        <br><span class="span-details">Ville:</span>
                        <input type="text" name="cidadeNewCliente" onkeyup="onChangedInputs(this)" />
                        <span id="validatorCidadeNewCliente"></span>
                    </form>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button id="btn_CreateClient" type="submit" class="btn btn-primary btn-success">Confirmer</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modal_createClientConfirm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="staticBackdropLabel">Création de nouveau client.&nbsp;<span class="span-create-client-confirm-icon"></span></h4>
            </div>
            <div class="modal-body">
                <p><span id="spanCreateCliente"></span></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Fermer</button>
            </div>
        </div>
    </div>
</div>