---
layout: default
title: Buzzers
---

<center>
<div id="buzzer-primary" style="width: 100%; font-size: 60;">Hi</div>
<div id="buzzer-secondary" style="width: 100%; font-size: 40;">Welcome</div>
<input id="buzzer-input" type="text" placeholder="Click here to start">
</center>
<script>
var names = ["Unknown", "Buzzer #1", "Buzzer #2", "Buzzer #3", "Buzzer #4", "Buzzer #5", "Buzzer #6", "Buzzer #7", "Buzzer #8", "Buzzer #9", "Buzzer #10"];
var enabled = false;
var timer = -1;
var timerId = 0;
var primary = document.getElementById("buzzer-primary");
var secondary = document.getElementById("buzzer-secondary");
var input = document.getElementById("buzzer-input");

function buzzer(key) {
    if (!enabled) {
        return;
    }
    enabled = false;
    primary.innerHTML = names[key];
    timer = 5;
    updateTimer();
}
function updateTimer() {
    if (timer < 0) {
        enable();
        return;
    } else if (timer == 0) {
        secondary.innerHTML = "STOP";
    } else {
        secondary.innerHTML = "" + timer;
    }
    timer--;
    timerId = window.setTimeout(updateTimer, 1000);
}
function reset() {
    timer = 0;
    window.clearTimeout(timerId);
}
function enable() {
    reset();
    enabled = true;
    primary.innerHTML = "Ready";
    secondary.innerHTML = "Press a buzzer";
}
function disable() {
    reset();
    enabled = false;
    primary.innerHTML = "Disabled";
    secondary.innerHTML = "Click the space below to begin";
}
disable();

input.onfocus = enable;
input.onblur = disable;
input.onkeypress = function(event) {
    if (!enabled) {
        return;
    }
    event.preventDefault();
    var c;
    if (event.which == null) {
	    c = String.fromCharCode(event.keyCode);
	} else if (event.which!=0 && event.charCode != 0) {
	    c = String.fromCharCode(event.which);
	}
    if (c == "0") {
        buzzer(10);
    } else if (c == "1") {
        buzzer(1);
    } else if (c == "2") {
        buzzer(2);
    } else if (c == "3") {
        buzzer(3);
    } else if (c == "4") {
        buzzer(4);
    } else if (c == "5") {
        buzzer(5);
    } else if (c == "6") {
        buzzer(6);
    } else if (c == "7") {
        buzzer(7);
    } else if (c == "8") {
        buzzer(8);
    } else if (c == "9") {
        buzzer(9);
    } else {
        alert("Unknown key: " + c);
    }
}
</script>
