<div class="div-cliente-details">
    <div class="name-cliente-div">
        <div>
            <h1><span><i class="fa-regular fa-address-card" style="color: #e0e6aa; "></i></span> - <span id="title-client-name"></span><span id="title-client-name-wrap"></span></h1>
        </div>
        <div class="dropdown dropdown-opcoes-cliente">
            <span class="botao-dropdown-opcoes-cliente" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-bars fa-2xl"></i>
            </span>
            <ul class="dropdown-menu">
                <li>
                    <span id="<?= $cliente->getIdCliente() ?>" data-bs-toggle='modal' data-bs-target='#modal_EditClient' class="dropdown-item span-edit-cliente"><span style="color:#093f95"><i class="fa-solid fa-user-pen"></i></span>&nbsp;Option client</span>
                </li>
                
                <li>
                    <hr class="dropdown-divider">
                </li>
                <li>
                    <span class="dropdown-item" data-bs-toggle='modal' data-bs-target='#modal_confirmDeleteClient'><span style="color: rgb(214 55 55);"><i class="fa-solid fa-user-xmark"></i></span>&nbsp;Supprimer client</span>
                </li>
            </ul>
        </div>
    </div>
    <div class="div-cliente-details-all">
        <div>
            <div><span class="span-details">Nom du client:</span></div>
            <div><span class="span-values-client"></span></div>
        </div>
        <div>
            <div><span class="span-details">E-mail:</span></div>
            <div><span class="span-values-client"></span></div>
        </div>
        <div>
            <div><span class="span-details">Téléphone portable:</span></div>
            <div><span class="span-values-client"></span></div>
        </div>
        <div>
            <div><span class="span-details">Téléphone fixe:</span></div>
            <div><span class="span-values-client"></span></div>
        </div>
        <div>
            <div><span class="span-details">Adresse:</span></div>
            <div><span class="span-values-client"></span></div>
        </div>
        <div>
            <div><span class="span-details">Ville:</span></div>
            <div><span class="span-values-client"></span></div>
        </div>
        <div>
            <span class="span-details">Date de création:</span>
            <div><span class="span-values-client"></span></div>
        </div>
        <div>
            <span class="span-details">Date de mise à jour:</span>
            <div><span class="span-values-client"></span></div>
        </div>
        <br>
        <div>
            <h3 style="color:#093f95; border-bottom-style: outset;"><span style="color:#2c6fda"><i class="fa-regular fa-rectangle-list"></i></span> Chantiers:</h3>
        </div>
        <br>
        <div class="div-all-works">
        </div>
        <div class="mt-3 div-btn-works">
            <div>
                <a href="../public/index.php?a=clients" type="button" class="btn btn-secondary btn-sm me-3">Volver&nbsp;<i class="fa-solid fa-reply"></i></a>
            </div>
            <div>
                <button id="btn_addNewWork" type="button" class="btn btn-primary btn-sm btn-changes" data-bs-toggle='modal' data-bs-target='#modal_createWork'>Nouveau chantier&nbsp;<i class="fa-solid fa-plus"></i></button>
            </div>
        </div>

    </div>
</div>

<div class="modal fade" id="modal_EditClient" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 style="color:darkblue; font-weight: bold;" class="modal-title" id="staticBackdropLabel">Modifier le client&nbsp;<i class="fa-regular fa-pen-to-square"></i></h4>
            </div>
            <div class="modal-body">
                <div class="div-client-details-edit">
                    <form id="form_clientUpdate">
                        <span class="span-details">* Nom du client:</span>
                        <input type="text" name="nomeClienteUpdate" onkeyup="onChangedInputs(this)" />
                        <span id="validatorNomeClienteUpdate"></span>
                        <br><span class="span-details">E-mail:</span>
                        <input type="text" name="emailClienteUpdate" onkeyup="onChangedInputs(this)" />
                        <span id="validatorEmailClienteUpdate"></span>
                        <br><span class="span-details">Téléphone portable:</span>
                        <input type="text" name="movelClienteUpdate" onkeyup="onChangedInputs(this)" />
                        <span id="validatorMovelClienteUpdate"></span>
                        <br><span class="span-details">Téléphone fixe:</span>
                        <input type="text" name="telefoneClienteUpdate" onkeyup="onChangedInputs(this)" />
                        <span id="validatorTelefoneClienteUpdate"></span>
                        <br><span class="span-details">* Adresse:</span>
                        <input type="text" name="moradaClienteUpdate" onkeyup="onChangedInputs(this)" />
                        <span id="validatorMoradaClienteUpdate"></span>
                        <br><span class="span-details">Ville:</span>
                        <input type="text" name="cidadeClienteUpdate" onkeyup="onChangedInputs(this)" />
                        <span id="validatorCidadeClienteUpdate"></span>
                    </form>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button id="btn_confirmUpdatdeClient" type="submit" class="btn btn-primary btn-changes">Confirmer</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_confirmUpdateClient" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="staticBackdropLabel">Modifier l'utilisateur&nbsp;<i style="color: orange" class="fa-solid fa-triangle-exclamation"></i></h4>
            </div>
            <div class="modal-body">
                <span>Allez-vous apporter des modifications au client, êtes-vous sûr?</span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button id="btn_updateClient" type="button" class="btn btn-primary btn-changes" data-bs-dismiss="modal">Confirmer</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_confirmCliente" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title title-modal-confirmCliente" id="staticBackdropLabel"></h4>
            </div>
            <div class="modal-body">
                <p><span id="spanBodyConfirmCliente"></span></p>
            </div>
            <div class="modal-footer">
                <button id="btn_modalConfirmClient"type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Fermer</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_createWork" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 style="color:#c05f13; font-weight: bold;" class="modal-title" id="staticBackdropLabel">Nouveau chantiert&nbsp;<i class="fa-solid fa-file-lines"></i></h4>
            </div>
            <div class="modal-body">
                <div class="div-client-details-edit">
                    <form id="form_createWork">
                        <span class="span-details">* Brève description du chantier:</span>
                        <input type="text" name="descricaoCreateWork" onkeyup="onChangedInputs(this)" />
                        <span id="validatorDescricaoCreateWork"></span>
                        <span class="span-details">* Adresse:</span>
                        <input type="text" name="moradaCreateWork" onkeyup="onChangedInputs(this)" />
                        <span id="validatorMoradaCreateWork"></span>
                        <div style="display:flex;justify-content: space-between;">
                            <div style="position: relative; width: 49%;">
                                <span class="span-details">* Date de début de travail:</span>
                                <input name="dataInicioCreateWork" type="text" id="date_timepicker_start" onblur="onChangedInputs(this)" readonly />
                                <span id="validatorDataInicioCreateWork"></span>
                                <span class="span-icon-datetime"><i class="fa-solid fa-calendar-days"></i></span>
                            </div>
                            <div style="position: relative; width: 49%;">
                                <span class="span-details">* Date de fin de travail:</span>
                                <input type="text" id="date_timepicker_end" name="dataFimCreateWork" onblur="onChangedInputs(this)" onclick="verifyIntialDateIsEmpty(this)" readonly />
                                <span id="validatorDataFimCreateWork"></span>
                                <span class="span-icon-datetime"><i class="fa-solid fa-calendar-days"></i></span>
                            </div>
                        </div>
                        <br><span class="span-details">* Travail attribué au salarié:</span>
                        <select class="form-select select-colaborador" name="colaboradorCreateWork" aria-label="Default select example" onchange="onChangedInputs(this)">
                        </select>
                        <span id="validatorAtribuidoCreateWork"></span>
                        <span class="span-details">Informations:</span>
                        <textarea name="informacaoCreateWork" rows="3" onkeyup="onChangedInputs(this)"></textarea>
                        <span id="validatorTelefoneClienteUpdate"></span>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button id="btn_confirmCreateWork" type="submit" class="btn btn-primary btn-changes">Confirmer</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_editWork" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 style="color:#c05f13; font-weight: bold;" class="modal-title" id="staticBackdropLabel">Modifier chantiert&nbsp;<i class="fa-solid fa-file-lines"></i></h4>
            </div>
            <div class="modal-body">
                <div class="div-client-details-edit">
                    <form id="form_EditWork">
                        <span class="span-details">* Brève description du chantier:</span>
                        <input type="text" name="descricaoEditWork" onkeyup="onChangedInputs(this)" />
                        <span id="validatorDescricaoEditWork"></span>
                        <span class="span-details">* Adresse:</span>
                        <input type="text" name="moradaEditWork" onkeyup="onChangedInputs(this)" />
                        <span id="validatorMoradaEditWork"></span>
                        <div style="display:flex;justify-content: space-between;">
                            <div style="position: relative; width: 49%;">
                                <span class="span-details">* Date de début de travail:</span>
                                <input type="text" name="dataInicioEditWork" id="date_Edit_Work_timepicker_start" onblur="onChangedInputs(this)" readonly />
                                <span id="validatorDataInicioEditWork"></span>
                                <span class="span-icon-datetime"><i class="fa-solid fa-calendar-days"></i></span>
                            </div>
                            <div style="position: relative; width: 49%;">
                                <span class="span-details">* Date de fin de travail:</span>
                                <input type="text" name="dataFimEditWork" id="date_Edit_Work_timepicker_end"  onblur="onChangedInputs(this)" onclick="verifyIntialDateIsEmpty(this)" readonly />
                                <span id="validatorDataFimEditWork"></span>
                                <span class="span-icon-datetime"><i class="fa-solid fa-calendar-days"></i></span>
                            </div>
                        </div>
                        <span class="span-details">* Statut:</span>
                        <select class="form-select select-estado-edit" name="estadoEditWork" aria-label="Default" onchange="onChangedInputs(this)">
                        </select>
                        <span id="validatorEstadoEditWork"></span>
                        <span class="span-details">Raison en attente:</span>
                        <input type="text" name="motivoPendenciaEditWork" onkeyup="onChangedInputs(this)" />
                        <span id="validatorMotivoPendenciaEditWork"></span>
                        <span class="span-details">* Travail attribué au salarié:</span>
                        <select class="form-select select-colaborador-edit" name="colaboradorEditWork" aria-label="Default select example" onchange="onChangedInputs(this)">
                        </select>
                        <span id="validatorAtribuidoEditWork"></span>
                        <span class="span-details">Informations:</span>
                        <textarea name="informacaoEditWork" rows="3" onkeyup="onChangedInputs(this)"></textarea>
                        <span id="validatorTelefoneClienteUpdate"></span>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button id="btn_confirmEditWork" type="submit" class="btn btn-primary btn-changes">Confirmer</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_confirmDeleteClient" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" style="background-color: #ffe4e4;"> 
                <h4 style="color: #8b0505;" class="modal-title" id="staticBackdropLabel">Supprimé client&nbsp;<i class="fa-solid fa-triangle-exclamation"></i></h4>
            </div>
            <div class="modal-body">
                <span>Le client sera supprimé, êtes-vous sûr?</span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button id="btn_softDeleteClient" type="button" class="btn btn-danger">Confirmer</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modal_confirmDeleteWork" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" style="background-color: #ffe4e4;">
                <h4 style="color: #8b0505;" class="modal-title" id="staticBackdropLabel">Supprimé chantier&nbsp;<i class="fa-solid fa-triangle-exclamation"></i></h4>
            </div>
            <div class="modal-body">
                <span class="span-information-delete-work">Le chantier sera supprimé, êtes-vous sûr?</span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button id="btn_deleteWork" type="button" class="btn btn-danger">Confirmer</button>
            </div>
        </div>
    </div>
</div>