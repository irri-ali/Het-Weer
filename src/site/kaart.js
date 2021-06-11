class Voorspelling
{
    constructor(dag, vlissingen, haarlem, wind)
    {
        this.dag = dag;
        this.vlissingen = vlissingen;
        this.amsterdam = (this.vlissingen + Math.floor(Math.random() * 10) - 5);
        this.uden =(this.vlissingen + Math.floor(Math.random() * 10) - 5);
        this.groningen =(this.vlissingen + Math.floor(Math.random() * 10) - 5);
        this.wind = wind;
    }
}

function createDay(dag){
    return new Voorspelling(dag, Math.floor(Math.random() * 50) - 10,(this.vlissingen - Math.floor(Math.random() * 10)), Math.floor(Math.random() * 360))
}
vandaag= createDay("vandaag")
morgen=createDay("morgen")
overmorgen=createDay("overmorgen")
dagen=[vandaag,morgen,overmorgen]

document.getElementById("vlissingen").innerHTML = vandaag.vlissingen
document.getElementById("amsterdam").innerHTML = vandaag.amsterdam
document.getElementById("uden").innerHTML = vandaag.uden
document.getElementById("groningen").innerHTML = vandaag.groningen
document.getElementById("arrow").style.transform = `rotate(${vandaag.wind}deg)`;

function myFunction() {
    let x = document.getElementById("mySelect").value;
    document.getElementById("vlissingen").innerHTML = dagen[x].vlissingen
    document.getElementById("amsterdam").innerHTML = dagen[x].amsterdam
    document.getElementById("uden").innerHTML = dagen[x].uden
    document.getElementById("groningen").innerHTML = dagen[x].groningen
    document.getElementById("arrow").style.transform = `rotate(${dagen[x].wind}deg)`;

}
console.log(vandaag)
function showOnClick(tekst) {
    console.log(tekst)


    if (tekst.style.display === "none") {
        tekst.style.display = "block";
    } else {
        tekst.style.display = "none";
    }
}

function check(elem) {
    document.getElementById('mySelect1').disabled = !elem.selectedIndex;
}
console.log(Voorspelling.maxTemps)
