

//clear page
function reset() {
        'use strict';
        var clear = document.getElementById("userTime");
        clear.value = " ";
        var hide = document.getElementById("end");
        hide.style.display = "none";
        document.getElementById("clock_display").innerHTML = "";
    }
    //stop timer and progress bar

function stop(timer, bar) {
        'use strict';
        clearInterval(timer);
        clearInterval(bar);
        document.getElementById('set').disabled = false;
    }
    //get user input

function getMinutes() {
        'use strict';
        return document.getElementById('userTime').value;
    }
    //convert from string to number and start countdown

function set() {
    'use strict';
    var timeLength = parseInt(getMinutes(), 10);
    var min = timeLength;
    //for progress bar convert minutes to milliseconds and do maths for gradual 1% decrease in progress bar over set time duration
    var realTime = min * 60000;
    var progTime = realTime / 100;
    var progVal = 100; //set progess bar to full and setInterval to decrease it
    var progBar = setInterval(function() {
        var bar = document.getElementById('progressBar');
        if (progVal <= 0) {
            clearInterval(progBar)
        } else {
            progVal = progVal - 1;
        }
        bar.value = progVal;
    }, progTime);
    //main timer	
    var sec = 0;
    var myPom = setInterval(function myTimer() {
        sec = sec - 1;
        if (sec < 0 && min !== 0) {
            min = min - 1;
            sec = 59;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        //timer end stuff
        if (sec === "0" + 0 && min === 0) {
            stop(myPom);
            document.getElementById("finish").innerHTML =
                "Time's<br>Up!";
			
            var show = document.getElementById("end");
            show.style.display = "block";
            var snd = new Audio('fire_pager.mp3');
            snd.play();
        }
        //clock display and Stop function
        var clock = min + " : " + sec;
        document.getElementById("stop").onclick = function() {
            stop(myPom, progBar)
        };
        document.getElementById("clock_display").innerHTML = clock;
    }, 1000);
}
document.getElementById("reset").onclick = reset;
document.getElementById('set').addEventListener('click', function() {
    'use strict';
    set();
    this.disabled = true;
});
reset();
