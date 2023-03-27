var team0 = [["Luka Doncic", "Kyrie Irving", "Josh Green", "Maxi Kleber", "Christian Wood", "Reggie Bullock", "Davis Bertans", "Frank Ntilikina", "Tim Hardaway", "Dwight Powell", "Jaden Hardy", "JaVale McGee"], [77, 2, 6, 19, 5, 0, 7, 12, 11, 65, 45, 15]]
var team1 = [["Kawhi Leonard", "Paul George", "Marcus Morris", "Nicolas Batum", "Ivica Zubac", "Eric Gordon", "Moses Brown", "Terance Mann", "Bones Hyland", "Amir Coffey", "Brandon Boston Jr.", "Norman Powell"], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]]
var names = ["Dallas Mavericks", "LA Clippers"]
var color = ["#0000FF", "#FFFFFF"]
var starting0 = [["blue", "blue", "blue", "blue", "blue", , , , , , , ], [1, 2, 3, 4, 5, "", "", "", "", "", "", ""]]
var starting1 = [["blue", "blue", "blue", "blue", "blue", , , , , , , ], [1, 2, 3, 4, 5, "", "", "", "", "", "", ""]]

document.addEventListener("keydown", magic)

function magic(e) {
    if (e.key === "Enter") {
        for (var i = 0; i < 2; i++) {
            for (var m = 0; m < 7; m++) {
                addPlayer(i)
            }

            document.getElementsByClassName("team-input")[i].value = names[i]
            document.getElementsByClassName("colorpicker")[i].value = color[i]
            
            for (var l = 0; l < 12; l++) {
                document.getElementById("p"+i+"-"+l).value = window["team"+i][0][l]
                document.getElementById("p"+i+"-num"+l).value = window["team"+i][1][l]

                document.getElementsByClassName("F"+i)[l].classList.add(window["starting"+i][0][l])
                document.getElementsByClassName("F"+i)[l].children[0].textContent = window["starting"+i][1][l]
            }
        }
    } 
}