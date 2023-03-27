var players = [
    {
        onCourt : {},
        onBench : {}
    },
    {
        onCourt : {},
        onBench : {}
    }
]

function saveTeam() {
    for (var i = 0; i < players.length; i++) {
        players[i].color = document.getElementsByClassName("colorpicker")[i].value
        players[i].name = document.getElementsByClassName("team-input")[i].value

        for (var l = 0; l < document.getElementsByClassName(i).length; l++) {
            players[i][document.getElementById("p"+i+"-num"+l).value] = {name : document.getElementById("p"+i+"-"+l).value, number: document.getElementById("p"+i+"-num"+l).value, points : 0, fouls : 0, minutes : [0, 00]}
            if (firstFiveSquare[i][l].classList.contains("blue") == true) {
                players[i].onCourt[firstFiveSquare[i][l].children[0].textContent -1] = players[i][document.getElementById("p"+i+"-num"+l).value].number
            } else {
                players[i].onBench[Object.keys(players[i].onBench).length] = players[i][document.getElementById("p"+i+"-num"+l).value].number
            }
        }    
    }

    localStorage.setItem("players", JSON.stringify(players))
}

var blue = [document.getElementsByClassName("F0 blue"), document.getElementsByClassName("F1 blue")]
var part3 = document.getElementsByClassName("part3")
var savedInputs = [[], []]
function addPlayer(c) {
    for (var i = 0; i < document.getElementsByClassName(c).length; i++) {
        savedInputs[0].push(document.getElementById("p"+c+"-"+i).value)
        savedInputs[1].push(document.getElementById("p"+c+"-num"+i).value)
    }
    part3[c].innerHTML += '<div class="player-info '+c+'"><div class="first-five hover F'+c+'" onclick="firstFive('+document.getElementsByClassName("F"+c).length+', '+c+')"><p class="first-five-num">'+ (blue[c].length+1) +'</p></div><div class="number"><input class="number-input" id="p'+c+'-num'+ document.getElementsByClassName(c).length +'" type="number"></div><div class="player-name"><input class="player-input" id="p'+c+'-'+ document.getElementsByClassName(c).length +'" type="text" autocomplete="off"></div></div>'
    for (var i = 0; i < document.getElementsByClassName(c).length -1; i++) {
        document.getElementById("p"+c+"-"+i).value = savedInputs[0][i]
        document.getElementById("p"+c+"-num"+i).value = savedInputs[1][i]
    }
    savedInputs = [[], []]
}

var firstFiveSquare = [document.getElementsByClassName("F0"), document.getElementsByClassName("F1")]
function firstFive(a, b) {
    if (firstFiveSquare[b][a].classList.contains("blue") == true) {
        firstFiveSquare[b][a].classList.remove("blue")
        for (var i = 0; i < blue[b].length; i++) {
            if (+blue[b][i].children[0].textContent > firstFiveSquare[b][a].children[0].textContent) {
                blue[b][i].children[0].textContent = +blue[b][i].children[0].textContent - 1
            }
        }
        for (var i = 0; i < firstFiveSquare[b].length; i++) {
            if (firstFiveSquare[b][i].classList.contains("blue") == false) {
                firstFiveSquare[b][i].children[0].textContent = blue[b].length + 1
                firstFiveSquare[b][i].classList.add("hover")
            }
        }
    } else if (blue[b].length < 5) {
        firstFiveSquare[b][a].classList.add("blue")
        firstFiveSquare[b][a].children[0].textContent = blue[b].length
        for (var i = 0; i < firstFiveSquare[b].length; i++) {
            if (firstFiveSquare[b][i].classList.contains("blue") == false & blue[b].length < 5) {
                firstFiveSquare[b][i].children[0].textContent = blue[b].length +1
            } else if (firstFiveSquare[b][i].classList.contains("blue") == false) {
                firstFiveSquare[b][i].children[0].textContent = ""
                firstFiveSquare[b][i].classList.remove("hover")
            }
        }
    }
}