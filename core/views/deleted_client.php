<div class="div-cliente-details">
    <div class="name-deleted-cliente-div">
        <div>
            <h1 id="<?= $cliente->getIdCliente() ?>" class="span-edit-cliente"><span><i class="fa-regular fa-address-card"></i></span> - <span id="title-client-name"><?= $cliente->getNome() ?></span><span id="title-client-name-wrap"><?= $cliente->getNome() ?></span></h1>
        </div>
        <div class="dropdown dropdown-opcoes-cliente">
            <span class="botao-dropdown-opcoes-deleted-cliente" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-bars fa-2xl"></i>
            </span>
            <ul class="dropdown-menu">
                <li>
                    <span class="dropdown-item" data-bs-toggle='modal' data-bs-target='#modal_confirmRecoveryClient'><span style="color: #167fdb;"><i class="fa-solid fa-user-check"></i></span>&nbsp;Récupérer le client</span>
                </li>
                <li>
                    <hr class="dropdown-divider">
                </li>
                <li>
                    <span class="dropdown-item" data-bs-toggle='modal' data-bs-target='#modal_confirmDeleteClientP'><span style="color: rgb(214 55 55);"><i class="fa-solid fa-user-xmark"></i></span>&nbsp;Supprimer définitivement le client</span>
                </li>
            </ul>
        </div>
    </div>
    <div class="div-cliente-details-all">
        <div>
            <div><span class="span-details">Nom du client:</span></div>
            <div><span class="span-values-client"><?= $cliente->getNome() ?></span></div>
        </div>
        <div>
            <div><span class="span-details">E-mail:</span></div>
            <div><span class="span-values-client"><?= $cliente->getEmail() ?></span></div>
        </div>
        <div>
            <div><span class="span-details">Téléphone portable:</span></div>
            <div><span class="span-values-client"><?= $cliente->getMovel() ?></span></div>
        </div>
        <div>
            <div><span class="span-details">Téléphone fixe:</span></div>
            <div><span class="span-values-client"><?= $cliente->getTelefone() ?></span></div>
        </div>
        <div>
            <div><span class="span-details">Adresse:</span></div>
            <div><span class="span-values-client"><?= $cliente->getMorada() ?></span></div>
        </div>
        <div>
            <div><span class="span-details">Ville:</span></div>
            <div><span class="span-values-client"><?= $cliente->getCidade() ?></span></div>
        </div>
        <div>
            <span class="span-details">Date de création:</span>
            <div><span class="span-values-client"><?= $cliente->getDataCricao() ?></span></div>
        </div>
        <div>
            <span class="span-details">Date de mise à jour:</span>
            <div><span class="span-values-client"><?= $cliente->getDataAtualizacao() ?></span></div>
        </div>
        <div>
            <span class="span-details">Date d'élimination</span>
            <div><span style="color: red" class="span-values-client"><?= $cliente->getDataEliminacao() ?></span></div>
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
                <a href="../public/index.php?a=history_clients" type="button" class="btn btn-secondary btn-sm me-3">Volver&nbsp;<i class="fa-solid fa-reply"></i></a>
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
                <button id="btn_modalConfirmClient" type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Fermer</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_confirmDeleteClientP" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" style="background-color: #ffe4e4;">
                <h4 style="color: #8b0505;" class="modal-title" id="staticBackdropLabel"><b>Supprimé client&nbsp;</b><i class="fa-solid fa-triangle-exclamation"></i></h4>
            </div>
            <div class="modal-body">
                <span>Le client sera définitivement supprimé. Après la suppression, vous ne pourrez plus récupérer ce client ni ses chantiers, êtes-vous sûr?</span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button id="btn_DeleteClient" type="submit" class="btn btn-danger">Confirmer</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modal_confirmRecoveryClient" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" style="background-color: #def4ff;">
                <h4 style="color: #0a58ca" class="modal-title" id="staticBackdropLabel"><b>Récupéré client&nbsp;</b><i class="fa-solid fa-user-check"></i></h4>
            </div>
            <div class="modal-body">
                <span>Le client sera récupéré, êtes-vous sûr?</span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button id="btn_RecoveryClient" type="submit" class="btn btn-primary  btn-changes">Confirmer</button>
            </div>
        </div>
    </div>
</div>