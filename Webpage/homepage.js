function update_clock(){
    let d = new Date();
    let hours = (d.getHours() < 10) ? "0"+d.getHours() : d.getHours();
    let minutes = (d.getMinutes() < 10) ? "0"+d.getMinutes() : d.getMinutes();
    let seconds = (d.getSeconds() < 10) ? "0"+d.getSeconds() : d.getSeconds();
    let days = (d.getDate() < 10) ? "0"+d.getDate() : d.getDate();
    document.getElementById("timestamp").innerHTML = pad(days,2) + "/" + pad((d.getMonth() + 1),2).toString() + " - " + pad(hours,2) + ":" + pad(minutes,2) + ":" + pad(seconds,2);
}

document.getElementById("close").addEventListener("click", () => {
    let hidden = document.getElementsByClassName("flex");
    const lengt = hidden.length
    for(let i = lengt - 1; i >= 0; i -= 1){
        hidden[i].className = hidden[i].className.replace(/flex/, 'hide');
    }
});

document.getElementById("close_save").addEventListener("click", () => {
    hidden_text = document.getElementById("description_title").innerHTML.split("<!--")[1];
    
    hidden_text = hidden_text.replace("-->", "");
    hidden_messages = hidden_text.split(";)(:");

    console.log(hidden_messages);

    let hidden = document.getElementsByClassName("flex");
    const lengt = hidden.length
    for(let i = lengt - 1; i >= 0; i -= 1){
        hidden[i].className = hidden[i].className.replace(/flex/, 'hide');
    }
});

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

function add_reminder(title, snooze_or_reminder, id, description, timestamp){
	/* 	Timestamp is expected to be of type Date 
		description is just a string
	*/	
	let choosen_obj = document.createElement("div");
	let desp_div = document.createElement("div");
	let time_div = document.createElement("div");

	choosen_obj.appendChild(desp_div);
	choosen_obj.appendChild(time_div);

	desp_div.innerHTML = title + "<!--" + (snooze_or_reminder ? "Reminder" : "Snozer")+ ";)(:" + id + "-->";

    now = new Date()

    time_div.innerHTML = pad(timestamp.getDate(),2) + "/" + pad((timestamp.getMonth() + 1),2).toString() + " - " + pad(timestamp.getHours(),2) + ":"+ pad(timestamp.getMinutes(),2);
    if(now > timestamp){
        time_div.classList = ["ran_out"]
    }

	choosen_obj.classList = ["reminder"]

    choosen_obj.addEventListener("click", () => {
        let hidden = document.getElementsByClassName("hide");
        const lengt = hidden.length
        for(let i = lengt - 1; i >= 0; i -= 1){
            hidden[i].className = hidden[i].className.replace(/hide/, 'flex');
        }

        document.getElementById("description_title").innerHTML = desp_div.innerHTML;
        document.getElementById("description_desp").innerHTML = description;

        document.getElementById("year1000").innerHTML = Math.floor(timestamp.getFullYear()/1000);
        document.getElementById("year100").innerHTML = Math.floor(timestamp.getFullYear()/100) % 10;
        document.getElementById("year10").innerHTML = Math.floor(timestamp.getFullYear()/10) % 10;
        document.getElementById("year1").innerHTML = timestamp.getFullYear() % 10;

        document.getElementById("month10").innerHTML = Math.floor((timestamp.getMonth() + 1)/10) % 10;
        document.getElementById("month1").innerHTML = (timestamp.getMonth() + 1) % 10;

        document.getElementById("day10").innerHTML = Math.floor(timestamp.getDate()/10) % 10;
        document.getElementById("day1").innerHTML = timestamp.getDate() % 10;

        document.getElementById("hour10").innerHTML = Math.floor(timestamp.getHours()/10) % 10;
        document.getElementById("hour1").innerHTML = timestamp.getHours() % 10;

        document.getElementById("min10").innerHTML = Math.floor(timestamp.getMinutes()/10) % 10;
        document.getElementById("min1").innerHTML = timestamp.getMinutes() % 10;
    });

	document.getElementById("reminders").appendChild(choosen_obj);
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}