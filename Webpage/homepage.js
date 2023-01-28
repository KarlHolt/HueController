function update_clock(){
    let d = new Date();
    let hours = (d.getHours() < 10) ? "0"+d.getHours() : d.getHours();
    let minutes = (d.getMinutes() < 10) ? "0"+d.getMinutes() : d.getMinutes();
    let seconds = (d.getSeconds() < 10) ? "0"+d.getSeconds() : d.getSeconds();
    let days = (d.getDate() < 10) ? "0"+d.getDate() : d.getDate();
    document.getElementById("timestamp").innerHTML = days + "/" + (d.getMonth() + 1).toString() + " - " + hours + ":" + minutes + ":" + seconds;
}

update_clock();
setInterval(update_clock, 1000);