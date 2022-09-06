document.addEventListener('DOMContentLoaded', function () {
    limitPagesDataTables();
    $.datetimepicker.setLocale('fr');
    dataInicio();
    moment().format();
    dataInicioEditWork();
    dataFimEditWork();
});

$(document).ready(function () {
    var fullHeight = function () {
        return $(window).resize(function () {
            $('.js-fullheight').css('height', $(window).height());
        });
    };
    fullHeight();
    console.log(fullHeight().innerWidth());

    if (fullHeight().innerWidth() < 991.98) {
        debugger
        document.querySelector('#sidebar').classList.remove('active');
        document.querySelector('#content').classList.add('active_content');
    }
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#content').toggleClass('active_content');
    });


});
function dataInicio() {
    var data = ""
    $('#date_timepicker_start').datetimepicker({
        value: '',
        minDate: 0
    });
    $('#date_timepicker_start').on('change', function () {
        data = document.querySelector("#date_timepicker_start").value;
        if (data !== "") {
            const m1 = moment(new Date(data));
            var new_date = moment(m1).add(1, 'days').format("YYYY/MM/DD HH:mm");
            dataFim(new_date);
        }
    });

}
function dataFim(data) {
    $('#date_timepicker_end').datetimepicker({
        value: '',
        minDate: data,
        defaultDate: data
    });
}

function dataInicioEditWork() {
    var data = ""
    $('#date_Edit_Work_timepicker_start').datetimepicker({
        value: '',
        minDate: 0
    });
    $('#date_Edit_Work_timepicker_start').on('change', function () {
        data = document.querySelector("#date_Edit_Work_timepicker_start").value;
        if (data !== "") {
            const m1 = moment(new Date(data));
            var new_date = moment(m1).add(1, 'days').format("YYYY/MM/DD HH:mm");
            dataFimEditWork(new_date);
        }
    });

}
function dataFimEditWork(data) {
    $('#date_Edit_Work_timepicker_end').datetimepicker({
        value: '',
        minDate: data,
        defaultDate: data
    });
}
//carregar funções quando dom estiver carregada//
document.addEventListener('DOMContentLoaded', function () {

    initiToolTip();
    estadoEditWork();

});
//inciar tooltip Bootstrap//
function initiToolTip() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
}
//validations////
function incorrectInput(spanValidator, inputName) {
    debugger
    let spanEmailValidator = document.querySelector("#" + spanValidator);
    document.querySelector("" + inputName.nodeName + "[name=" + inputName.name + "]").focus();
    document.querySelector("" + inputName.nodeName + "[name=" + inputName.name + "]").style.border = "1px solid #e8a3a3";
    spanEmailValidator.style.color = "red";
    spanEmailValidator.border = "red";
}
function inputOk(spanValidator, inputName) {
    document.querySelector("" + inputName.nodeName + "[name=" + inputName.name + "]").style.border = "2px solid #6bbaec";
    document.querySelector("#" + spanValidator).textContent = "";
}

//on keyup clean inputs//
function onChangedInputs(input) {

    inputOk(input.nextElementSibling.id, input);
}
function estadoEditWork() {
    const select = document.querySelector('.select-estado-edit');
    if (select) {

        select.addEventListener('change', (e) => {
            e.preventDefault();
            estadoEditWorkValues(select);
        })
    }
}
function estadoEditWorkValues(select) {
    let inputs = document.querySelector('#form_EditWork');
    if (select.value === 'Fermé') {
        for (let input of inputs) {
            if (input.name !== 'estadoEditWork') {
                document.getElementsByName(input.name)[0].readOnly = true;
                if (input.name === 'colaboradorEditWork') {
                    document.getElementsByName(input.name)[0].disabled = true;
                }

            }
        }
    } else {
        for (let input of inputs) {
            document.getElementsByName(input.name)[0].readOnly = false;
            if (input.name === 'colaboradorEditWork') {
                document.getElementsByName(input.name)[0].disabled = false;
            }
        }
    }
}

function verifyIntialDateIsEmpty(element) {
    let startDate = document.querySelector('input[name=dataInicioCreateWork]');
    let startDateEditWork = document.querySelector('input[name=dataInicioEditWork]');
    if (startDate.value.trim() === "" && startDateEditWork.value.trim() === "") {
        element.nextElementSibling.style.color = "red";
        element.nextElementSibling.border = "red";
        element.nextElementSibling.textContent = "Sélectionnez d'abord la date de début.";
    }
}
function limitPagesDataTables() {
    $.fn.DataTable.ext.pager.numbers_length = 5;
}

function tableClients(jsonResponse, tableId) {
    if (!jsonResponse && !tableId) {
        return false;
    }
    var href = "";
    var tableData = [];
    let btns = [
        {
            extend: 'copyHtml5',
            text: '<span style="color:#d5a75e"><i class="fa-solid fa-copy fa-2xl"></i></span>',
            titleAttr: 'Copy'
        },
        {
            extend: 'excelHtml5',
            text: '<span style="color:#007c01"><i class="fa-solid fa-file-excel fa-2xl"></i></span>',
            titleAttr: 'Excel'
        },
        {
            extend: 'pdfHtml5',
            title: 'Export clients',
            text: '<span style="color:#db0001"><i class="fa-solid fa-file-pdf fa-2xl"></i></span>',
            titleAttr: 'PDF',
            exportOptions: {
                columns: [1, 2, 3, 4, 5]
            }
        }
    ];
    switch (tableId.attr('id')) {
        case 'tableClients':
            href = "../public/index.php?a=client&id=";
            tableData = {
                "valores": [{
                    "data": "id_cliente", render: function (data, type, row, meta) {
                        return "<a href='" + href + data + "' data-bs-toggle='tooltip' data-bs-html='true' title='Détails de l'utilisateur'><i class='fa-solid fa-address-card fa-2xl'></i>&nbsp;<span style='color:green'><i class='fa-solid fa-circle-plus'></i></span></a>";
                    }
                },
                { "data": "nome_cliente" },
                { "data": "movel_cliente" },
                { "data": "email_cliente" },
                { "data": "morada_cliente" },
                { "data": "data_criacao_cliente" }]
            };
            break;
        case 'tableHistoryClients':
            href = "../public/index.php?a=deleted_client&id=";
            tableData = {
                "valores": [
                    {
                        "data": "id_cliente", render: function (data, type, row, meta) {
                            return "<a href='" + href + data + "' data-bs-toggle='tooltip' style='color:rgb(222 70 70)' data-bs-html='true' title='Détails de l'utilisateur'><i class='fa-solid fa-address-card fa-2xl'></i></a>";
                        }
                    },
                    { "data": "nome_cliente" },
                    { "data": "movel_cliente" },
                    { "data": "email_cliente" },
                    { "data": "morada_cliente" },
                    { "data": "data_criacao_cliente" },
                    { "data": "data_eliminacao_cliente" }]
            };
            break;
        case 'tableTrabalhos':
            function colorBar(value) {
                debugger
                let cor = "";
                parseInt(value) < 50 ? cor = "" : cor;
                parseInt(value) > 49 && value < 100 ? cor = "bg-warning" : cor;
                parseInt(value) === 100 ? cor = "bg-success" : cor;
                return cor;
            }
            function url(value) {
                let href = "../public/index.php?a=client&id=";
                parseInt(value) === 0 ? href = "../public/index.php?a=deleted_client&id=" : href;
                return href;
            }
            function setColor(value) {
                let color = "none"
                debugger
                parseInt(value) === 0 ? color = "rgb(222 70 70)" : color;
                return color;
            }
            tableData = {
                "valores": [{
                    "data": "id_cliente", render: function (data, type, row, meta) {
                        return "<a style='color:" + setColor(row.trabalho_ativo) + "; text-decoration: none;' href='" + url(row.trabalho_ativo) + data + "' data-bs-toggle='tooltip' data-bs-html='true' title='Détails de l'utilisateur'><i class='fa-solid fa-address-card fa-2xl'></i> " + row.nome_cliente + "</a>";
                    }
                },
                { "data": "nome_trabalho" },
                { "data": "morada_trabalho" },
                {
                    "data": "estado_trabalho", render: function (data, type, row, meta) {
                        debugger
                        return "<span style='color:" + setColorEstadoTrabalho(data) + "; font-weight: bolder;'>" + data + "</span>";
                    }
                },
                { "data": "colaborador" },
                {
                    "data": "percentagem_Inicio_FimTrabalho", render: function (data, type, row, meta) {
                        return '<div class="progress"><div class="progress-bar ' + colorBar(data) + ' progress-bar-striped" style="width:' + data + '%">' + data + '%</div></div>';
                    }
                }]
            };
            break;
    }

    tableId.dataTable({
        dom: 'Bfrtip',
        processing: true,
        "responsive": true,
        'ColumnDefs': [{
            'targets': [0, 0],
            'orderable': false,
        },
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: 1 }
        ],
        "data": jsonResponse,

        "language": {
            "url": "../public/assets/js/dt_fr-FR.json"
        },
        "columns": tableData.valores,
        buttons: btns,

        destroy: true,
    });
}

// return random colors//
function setRondomColors() {
    const colors = ['#3ccb22', '#226fcb', '#dbcc1a', '#c32d13', '#a613c3', '#da3232', '#4edb34', '#c34998'];
    let colorsRandom = Math.floor(Math.random() * colors.length);
    return colors[colorsRandom];
}
//regex test email //
function testEmailRegex(testEmail) {
    let regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return regex.test(testEmail);
}
// set color according state of work //
function setColorEstadoTrabalho(estado) {
    let color = "";
    switch (estado) {
        case 'Ouvert':
            color = "#127cbf";
            break;
        case 'Fermé':
            color = "green";
            break;
        case 'En attente':
            color = "yellow";
            break;
    }
    debugger
    return color;
}
// function on click redirect //
function windowLocation(btn, location) {
    if (btn) {
        btn.addEventListener('click', function () {
            window.location.href = location;
        });
    }
}
// set id crypt on modal //
function setModal(input) {
    if(input.id === 'btn_deleteColaborador'){
        document.querySelector('.span-information-delete-colaborador').setAttribute('id', input.parentNode.parentNode.childNodes[0].childNodes[0].id);
    }else{
        document.querySelector('.span-information-delete-work').setAttribute('id', input.previousElementSibling.id);
    }
    
}
