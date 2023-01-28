function update_clock(){
    let d = new Date();
    let hours = (d.getHours() < 10) ? "0"+d.getHours() : d.getHours();
    let minutes = (d.getMinutes() < 10) ? "0"+d.getMinutes() : d.getMinutes();
    let seconds = (d.getSeconds() < 10) ? "0"+d.getSeconds() : d.getSeconds();
    let days = (d.getDate() < 10) ? "0"+d.getDate() : d.getDate();
    document.getElementById("timestamp").innerHTML = pad(days,2) + "/" + pad((d.getMonth() + 1),2).toString() + " - " + pad(hours,2) + ":" + pad(minutes,2) + ":" + pad(seconds,2);
}

update_clock();
setInterval(update_clock, 1000);

function add_light(name, id, on){
    green = "#d0e1cd"
    red = "#DFCDE1"

    let title = document.createElement("div");
    title.innerHTML = name + "<!--" + id + "-->";

    let switch_obj = document.createElement("div");
    switch_obj.innerHTML = on ? "ON" : "OFF";
    if(switch_obj.innerHTML == "ON"){
        switch_obj.style.direction = "ltr";
    } else {
        switch_obj.style.direction = "rtl";
    }
    switch_obj.style.backgroundColor = on ? green : red;
    switch_obj.classList.add("On_off_switch");

    switch_obj.addEventListener("click", function (){ 
        //turn_off_light(light, index);
        if(switch_obj.innerHTML == "OFF"){
            switch_obj.innerHTML = "ON";
            switch_obj.style.direction = "ltr";
            switch_obj.style.backgroundColor = green;
        } else {
            switch_obj.innerHTML = "OFF";
            switch_obj.style.direction = "rtl";
            switch_obj.style.backgroundColor = red;
        }
    });

	wrapper = document.createElement("div");
	wrapper.classList = ["light_wrapper"];

    wrapper.appendChild(title);
    wrapper.appendChild(switch_obj);
    document.getElementById("lights").appendChild(wrapper);
}

function add_reminder(description, timestamp){
	/* 	Timestamp is expected to be of type Date 
		description is just a string
	*/	
	let choosen_obj = document.createElement("div");
	let desp_div = document.createElement("div");
	let time_div = document.createElement("div");

	choosen_obj.appendChild(desp_div);
	choosen_obj.appendChild(time_div);

	desp_div.innerHTML = description;
	time_div.innerHTML = pad(timestamp.getDate(),2) + "/" + pad((timestamp.getMonth() + 1),2).toString() + " - " + pad(timestamp.getHours(),2) + ":"+ pad(timestamp.getMinutes(),2);

	choosen_obj.classList = ["reminder"]

	document.getElementById("reminders").appendChild(choosen_obj);
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}