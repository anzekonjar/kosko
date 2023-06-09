var minutes = document.getElementsByClassName("minutes")
var seconds = document.getElementsByClassName("seconds")
var quarter = document.getElementById("quarter")
var whichQuarter = 1
var timeRunning = false
var timeInterval

window.addEventListener('keydown', (e) => {
    if (e.key === " " || e.key === "Enter") {  
        e.preventDefault();
        e.stopPropagation();
    }
});

var jsonString = localStorage.getItem("players")
var players = JSON.parse(jsonString)
console.log(players)

const root = document.querySelector(':root');
var team = [document.getElementsByClassName("team1"), document.getElementsByClassName("team2")]
for (var i = 0; i < players.length; i++) {
    for (var l = 0; l < team[i].length; l++) {
        team[i][l].textContent = players[i].name
    }
    root.style.setProperty('--color'+i, players[i].color);
}

var pl = document.getElementsByClassName("pl")
var num = document.getElementsByClassName("num")
var bigNum = document.getElementsByClassName("big_num")
var pointsFoulsMin = document.getElementsByClassName("points-fouls-min")
var foul = document.getElementsByClassName("foul")
var foulDisplayNum = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45]
function getCourtPlayers() {
    for (var f = 0; f < 50; f++) {
        foul[f].classList.remove("red-background")
    }
    for (var l = 0; l < players.length; l++) {
        for (var i = 0; i < 5; i++) {
            for (var m = 0; m < players[l][players[l].onCourt[i]].fouls; m++) {
                foul[m+foulDisplayNum[i+l*5]].classList.add("red-background")
            }
            pl[i+l*5].textContent = players[l][players[l].onCourt[i]].name.split(" ")[0].charAt(0) + ". " + players[l][players[l].onCourt[i]].name.split(" ")[players[l][players[l].onCourt[i]].name.split(" ").length - 1]
            num[i+l*5].textContent = "#" + players[l].onCourt[i]
            bigNum[i+l*5].textContent = players[l].onCourt[i]
            pointsFoulsMin[i+l*5].textContent = players[l][players[l].onCourt[i]].points + " | " + players[l][players[l].onCourt[i]].minutes[0] + ":" + players[l][players[l].onCourt[i]].minutes[1].toLocaleString('en-US', {minimumIntegerDigits: 2,})
        }
    }
}

window.onload = getCourtPlayers()

var courtPlayer = document.getElementsByClassName("player")
var switchBox = document.getElementsByClassName("switch-box")
var playerBox = document.getElementsByClassName("player-box")
function exchange(a, b, c) {
    for (var l = 0; l < Object.keys(players[b].onBench).length; l++) {
        switchBox[a].innerHTML += '<div onclick="switchPlayers('+l+', '+a+', '+b+', '+c+')" class="sw-pl"><div class="sw-pl-name"><p class="ex-num" id="num">#' + players[b].onBench[l] + '</p><p class="ex-pl" id="pl">' + players[b][players[b].onBench[l]].name.split(" ")[0].charAt(0) + '. ' + players[b][players[b].onBench[l]].name.split(" ")[1] + '</p></div><div class="sw-pl-info"><p class="sw-pl-pt-f-min">' + players[b][players[b].onBench[l]].points + ' | ' + players[b][players[b].onBench[l]].minutes[0] + ':' +players[b][players[b].onBench[l]].minutes[1].toLocaleString('en-US', {minimumIntegerDigits: 2,}) + ' | ' + players[b][players[b].onBench[l]].fouls + '</p></div></div>'
    }
    playerBox[a].classList.add("move-to-left")
    switchBox[a].classList.add("move-to-left")
    for (var i = 0; i < courtPlayer.length; i++) {
        courtPlayer[i].addEventListener("mouseleave", function() {
            finishSwitch(a)
        })
    }
}

function switchPlayers(l, a, b, c) {
    var savedPl = players[b].onCourt[c]
    players[b].onCourt[c] = players[b].onBench[l]
    players[b].onBench[l] = savedPl
    finishSwitch(a)
    getCourtPlayers()
}

function finishSwitch(a) {
    playerBox[a].classList.remove("move-to-left")
    switchBox[a].classList.remove("move-to-left")
    switchBox[a].innerHTML = null
}

var teamFoul = [document.getElementById("team-foul"), document.getElementById("teamB-foul")]
function addFoul(b, c) {
    players[c][num[b].textContent.slice(1)].fouls += 1
    teamFoul[c].textContent = +teamFoul[c].textContent + 1
    displayFoul(num[b].textContent.slice(1), c)
    getCourtPlayers()
    if (players[c][num[b].textContent.slice(1)].fouls == 5) {exchange(b)}
    if (+teamFoul[c].textContent == 5) {teamFoul[c].style.color = "red"}
}

var timeline = document.getElementsByClassName("timeline")
function displayFoul(num, c) {
    if (seconds[0].textContent.length == 1) {
        var min = 10
        console.log(seconds[0].textContent)
    } else {
        var min = (10 - +minutes[0].textContent)
    }
    var savedTimeline = timeline[1].innerHTML
    timeline[1].innerHTML = 
        "<div class='time_box" + (c+1) + "'>" +
            "<div class='timeline_action center'>" +
                "<div class='timeline_circle'></div>" +
            "</div>" +
            "<div class='timeline_h'>" +
                "<p class='timeline_num'>#" + num + "</p>" +
                "<p>" + players[c][num].name.split(" ")[0].charAt(0) + ". " + players[c][num].name.split(" ")[1] + "</p>" +
            "</div>" +
            "<div class='timeline_time'>" +
                "<p style='margin: 0 0 0 20px; font-size: 12px;'>" + teamFoul[c].textContent + " | " + players[c][num].fouls + "</p>" +
                "<p style='margin: 0; font-size: 12px;'>" + min + "'</p>" +
            "</div>" +
        "</div>" +
        savedTimeline
}

var score = [document.getElementById("score-a"), document.getElementById("score-b")]
var qScore = [document.getElementById("quarter-score-a"), document.getElementById("quarter-score-b")]
var scoreBtn = [document.getElementsByClassName("scoredA"), document.getElementsByClassName("scoredB")]
function sc(a, b, c) {
    score[c].textContent = +score[c].textContent + +scoreBtn[c][a].textContent
    qScore[c].textContent = +qScore[c].textContent + +scoreBtn[c][a].textContent
    players[c][num[b].textContent.slice(1)].points += +scoreBtn[c][a].textContent
    basket(c, num[b].textContent.slice(1), scoreBtn[c][a].textContent)
    getCourtPlayers()
}

document.addEventListener("keydown", getPlayerNumber)

var typeNum = document.getElementById("type-num")
var typeFoul = document.getElementsByClassName("type-circle")
var savedNum
var team
function getPlayerNumber(e) {
    if (!isNaN(e.key) & typeNum.textContent.length == 0 & e.key != " "){
        typeNum.textContent = "#" + e.key
    } else if (!isNaN(e.key) & typeNum.textContent.length < 3 & e.key != " "){
        typeNum.textContent += e.key
    } else if (e.key == "Enter") {
        savedNum = typeNum.textContent.slice(1)
        if (Object.values(players[0].onCourt).includes(savedNum) || Object.values(players[1].onCourt).includes(savedNum)) {
            document.removeEventListener("keydown", getPlayerNumber)
            typeNum.textContent = ""
            for (var i = 0; i < 2; i++) {
                if (Object.values(players[i].onCourt).includes(savedNum)) {
                    displayTP(i, savedNum)
                }
            }
            if (Object.values(players[0].onCourt).includes(savedNum) & Object.values(players[1].onCourt).includes(savedNum)) {
                document.addEventListener("keydown", wp)
            } else {
                document.addEventListener("keydown", points)
            }
        } else {
            typeNum.classList.add("wiggle", "red")
            setTimeout (function() {
                typeNum.textContent = ""
                typeNum.classList.remove("wiggle", "red")
            }, 1500)
        }
    }
}

function wp(e) {
    timeline[0].innerHTML = ""
    if (e.key == "1" || e.key == "2") {
        console.log(e.key-1)
        displayTP((e.key-1), savedNum)
        document.addEventListener("keydown", points)
    }
    document.removeEventListener("keydown", wp)
}

function displayTP(a, num) {
    team = a
    timeline[0].innerHTML += '<div id="type-box' + a + '"><div class="pl-name" style="justify-content: end;"><p class="type-pl-num" style="color: rgb(185, 185, 185);">#' + num + '</p><p class="type-pl-name">' + players[a][num].name.split(" ")[0].charAt(0) + ". " + players[a][num].name.split(" ")[1] + '</p></div><div class="type-info"><p class="type-pt-min">' + players[a][num].points + " | " + players[a][num].minutes[0] + ":" + players[a][num].minutes[1].toLocaleString('en-US', {minimumIntegerDigits: 2,}) + '</p>\<div class="type-fouls"><div class="type-circle"></div><div class="type-circle"></div><div class="type-circle"></div><div class="type-circle"></div><div class="type-circle"></div></div></div></div>'
    for (var i = 0; i < players[a][num].fouls; i++) {
        typeFoul[i+a*5].classList.add("red-background")
    }
}

function points(e) {
    document.removeEventListener("keydown", points)
    document.addEventListener("keydown", getPlayerNumber)

    if (e.key == "1" || e.key == "2" || e.key == "3") {
        score[team].textContent = +score[team].textContent + +e.key
        qScore[team].textContent = +qScore[team].textContent + +e.key
        players[team][savedNum].points += +e.key
        basket(team, savedNum, e.key)
    } else if (e.key == "f") {
        players[team][savedNum].fouls += 1
        teamFoul[team].textContent = +teamFoul[team].textContent + 1
        displayFoul(savedNum, team)
        if (+teamFoul[team].textContent == 5) {teamFoul[team].style.color = "red"}
    }
    
    getCourtPlayers()
    setTimeout (function() {
        timeline[0].innerHTML = ""
    }, 1500)
}

function basket(a, num, c) {
    if (seconds[0].textContent.length == 1) {
        var min = 10
    } else {
        var min = (10 - +minutes[0].textContent)
    }
    var savedTimeline = timeline[1].innerHTML
    timeline[1].innerHTML = 
        "<div class='time_box" + (a+1) + "'>" +
            "<div class='timeline_action'>" +
                "<p class='timeline_p'>+" + c + "</p>" +
            "</div>" +
            "<div class='timeline_h'>" +
                "<p class='timeline_num'>#" + num + "</p>" +
                "<p>" + players[a][num].name.split(" ")[0].charAt(0) + ". " + players[a][num].name.split(" ")[1] + "</p>" +
            "</div>" + 
            "<div class='timeline_time'>" +
                "<p style='margin: 0 0 0 20px; font-size: 12px;'>" + score[a].textContent + " | " + players[a][num].points + "</p>" +
                "<p style='margin: 0; font-size: 12px;'>" + min + "'</p>" +
            "</div>" +
        "</div>" +
        savedTimeline
}

var timeBox = document.getElementById("time")
var scoreboard = document.getElementById("scoreboard")

document.addEventListener("keydown", function(event) {
    if (event.key === " ") { time() }
})

function time() {
    if (minutes[0].textContent == 00 & seconds[0].textContent == 0) {
        whichQuarter += 1
        timeoutsA = 0
        timeoutsB = 0
        quarter.textContent = "Q" + whichQuarter
        for (var i = 0; i < timeoutCircle.length; i++) {
            timeoutCircle[i].classList.remove("red-background")
        }
        timeline[1].innerHTML = ""
        for (var i = 0; i < 2; i++) {
            qScore[i].textContent = 0
            teamFoul[i].textContent = 0
            teamFoul[i].style.color = "white"
        }
        for (var i = 0; i < minutes.length; i++) {
            minutes[i].textContent = 10
            seconds[i].textContent = "00"
        }
    } else if (timeRunning != true) {
        timeRunning = true
        if (seconds[0].textContent.length == 1) {
            timeInterval = setInterval(secTime, 100)
        } else {
            timeInterval = setInterval(minTime, 1000)
        }
    } else {
        clearInterval(timeInterval)
        timeRunning = false
    }
}

function minTime() {
    if (minutes[0].textContent == 1 & seconds[0].textContent == 00) {
        minutes[0].textContent = 59
        seconds[0].textContent = 9
        clearInterval(timeInterval)
        timeInterval = setInterval(secTime, 100)
    } else if (seconds[0].textContent == 00) {
        for (var i = 0; i < seconds.length; i++) {
            seconds[i].textContent = 59
            minutes[i].textContent = +minutes[i].textContent - 1
        }
    } else {
        for (var i = 0; i < seconds.length; i++) {
            seconds[i].textContent = +seconds[i].textContent - 1
        }
        checkForLength("seconds")
    }
    addTime()
}

function secTime() {
    if (minutes[0].textContent == 00 & seconds[0].textContent == 0) {
        clearInterval(timeInterval)
        timeRunning = false
        if (whichQuarter == 4) {
            timeBox.style.border = "2px solid rgb(236, 70, 58)"
            scoreboard.style.border = "3px solid rgb(236, 70, 58)"
            finish()
        } else {
             for (var i = 0; i < 2000; i += 1000) {
                setTimeout( function() {
                    timeBox.style.border = "2px solid rgb(236, 70, 58)"
                    scoreboard.style.border = "3px solid rgb(236, 70, 58)"
                }, i)
            }
            for (var i = 500; i < 2000; i += 1000) {
                setTimeout( function() {
                    timeBox.style.border = "2px solid rgb(52, 201, 52)"
                    scoreboard.style.border = "3px solid rgb(52, 201, 52)"  
                }, i)    
            }
        }
    } else if (seconds[0].textContent == 0) {
        minutes[0].textContent = +minutes[0].textContent - 1
        seconds[0].textContent = 9
        checkForLength("minutes")
        addTime()
    } else {
        seconds[0].textContent = +seconds[0].textContent - 1
    }
}

function addTime() {
    for (var i = 0; i < players.length; i++) {
        for (var l = 0; l < 5; l++) {
            if (players[i][players[i].onCourt[l]].minutes[1] == 59) {
                players[i][players[i].onCourt[l]].minutes[0] += 1
                players[i][players[i].onCourt[l]].minutes[1] = 0
            } else {
                players[i][players[i].onCourt[l]].minutes[1] += 1
            }
        }
    }
    getCourtPlayers()
}

function checkForLength(a) {
    for (var i = 0; i < seconds.length; i++) {
        if (window[a][i].textContent.length == 1) {
            window[a][i].textContent = "0" + window[a][i].textContent
        }
    }
}

var date = document.getElementById("date")
var d = new Date();
var weekday = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
var monthname = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
date.textContent = weekday[d.getDay()] + ', ' + monthname[d.getMonth()] + ' ' + d.getDate() + '. ' + d.getFullYear()

var arrow = document.getElementsByClassName("arrow")
function turnRed() {
    if (arrow[0].classList.contains("red")) {
        arrow[0].classList.remove("red")
        arrow[1].classList.add("red")
    } else {
        arrow[1].classList.remove("red")
        arrow[0].classList.add("red")
    }
}

var isEnter = false
function editTime() {
    clearInterval(timeInterval)
    timeRunning = false
    timeBox.style.border = "2px solid rgb(236, 70, 58)"
    document.removeEventListener("keydown", getPlayerNumber)
    minutes[0].textContent = ""
    seconds[0].textContent = ""
    document.addEventListener("keydown", function newMinutes(e) {
        if (!isNaN(e.key) && isEnter == false) {
            minutes[0].textContent += e.key
        } else if (e.key = "Enter" && minutes[0].textContent != "" && isEnter == false) {
            isEnter = true
        } else if (!isNaN(e.key) && isEnter == true) {
            seconds[0].textContent += e.key
        } else if (e.key = "Enter" && isEnter == true) {
            isEnter = false
            timeBox.style.border = "2px solid rgb(52, 201, 52)"
            document.removeEventListener("keydown", newMinutes)
            document.addEventListener("keydown", getPlayerNumber)
        }
    })
}

var timeoutCircle = document.getElementsByClassName("timeout")
var timeoutsA = 0
var timeoutsB = 0
function addTimeout(a) {
    if (a == 0) {
        timeoutCircle[timeoutsA+a].classList.add("red-background")
        timeoutsA += 1
    } else if (a == 2) {
        timeoutCircle[timeoutsB+a].classList.add("red-background")
        timeoutsB += 1
        a = 1
    }

    savedTimeline = timeline[1].innerHTML
    timeline[1].innerHTML = 
        "<div class='time_box" + (a+1) + "' style='position: relative'>" +
            "<p style='margin: 8px 0 0 40px; font-size: 14px;'>TIMEOUT</p>" +
            "<p style='margin: 0; position: absolute; bottom: 10px; right: 15px; font-size: 13px;'>" + (10 - +minutes[0].textContent) + "'</p>" +
        "</div>" +
        savedTimeline

    var savedMinutes = minutes[0].textContent
    var savedSeconds = seconds[0].textContent
    minutes[0].textContent = 1
    seconds[0].textContent = "00"
    clearInterval(timeInterval)
    timeRunning = false
    time()

    setTimeout(function() {
        clearInterval(timeInterval)
        timeRunning = false
        timeBox.style.border = "2px solid rgb(236, 70, 58)"
        setTimeout(function() {
            timeBox.style.border = "2px solid rgb(52, 201, 52)"
            minutes[0].textContent = savedMinutes
            seconds[0].textContent = savedSeconds    
        }, 2000)
    }, 61000)
}

function finish() {
    for (var i = 0; i < 2; i++) {
        players[i].score = score[i].textContent
    }
    var savedPlayers = JSON.stringify(players)
    setTimeout(function() {
        document.getElementById("game").value = savedPlayers
        document.getElementById("subboard").style.display = "none"
        document.getElementById("finish").style.display = "block"    
    }, 2000)
}