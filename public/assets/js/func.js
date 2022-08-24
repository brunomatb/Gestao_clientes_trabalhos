
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
