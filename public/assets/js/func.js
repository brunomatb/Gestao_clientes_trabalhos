function setRondomColors(){
    const colors = ['#3ccb22', '#226fcb', '#dbcc1a', '#c32d13', '#a613c3', '#da3232', '#4edb34','#c34998'];
    let colorsRandom = Math.floor(Math.random() * colors.length);
    return colors[colorsRandom];
}