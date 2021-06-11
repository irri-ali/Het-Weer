class Voorspelling
{
    constructor(dag, temp1, temp2, wind, dagAfwijking)
    {
        this.dag = dag;
        this.temp1 = temp1;
        this.temp2 = temp2;
        this.wind = wind;
        this.dagAfwijking = dagAfwijking;
    }

    get min()
    {
        if(this.temp1 >= this.temp2)
            return this.temp2;
        else
            return this.temp1;
    }

    get max()
    {
        if(this.temp1 >= this.temp2){
            return this.temp1;
        }else
            return this.temp2;
    }

    get winddirection()
    {
        if (this.wind === 0){
            console.log(Voorspelling.winds[0])
            return Voorspelling.winds[0].toString()
        }
        else if (this.wind === 1){
            return Voorspelling.winds[1].toString()
        }
        else if (this.wind === 2){
            return Voorspelling.winds[2].toString()
        }
        else {
            return Voorspelling.winds[3].toString()
        }
    }
    get minString(){
        return this.min + "ºC";
    }
    get maxString(){
        return this.max + "ºC";
    }
    get weekdayString()
    {
            let date = new Date
            let dateWeekday = Voorspelling.days[date.getDay() + this.dagAfwijking];
            return dateWeekday.toString()
        }
    get dayNumberString(){
        let date = new Date
        let dateNumber = date.getDate() + this.dagAfwijking;
        return dateNumber.toString()
    }
    get monthNumberString(){
        let date = new Date
        let dateToDeviateInNumbers = date.getTime() + (86400000 * this.dagAfwijking);
        let deviatedDate = new Date(dateToDeviateInNumbers)
        return deviatedDate.toLocaleDateString('default', { month: 'long' })
    }

    get matchRightPicture(){
        if (this.max <= 0){
            return Voorspelling.pictures[3].toString()
        }
        else if (this.max <= 10 && this.max > 0)
        {
            return Voorspelling.pictures[2].toString()
        }
        else if (this.max <= 20 && this.max >= 10)
        {
            return Voorspelling.pictures[1].toString()
        }
        else
        {
            return Voorspelling.pictures[0].toString()
        }
    }

    render(){
        document.getElementById("minimum-" + (this.dag)).innerHTML = String(this.minString)
        document.getElementById("maximum-" + (this.dag)).innerHTML = String(this.maxString)
        document.getElementById("afbeelding-" + (this.dag)).src = String(this.matchRightPicture)
        document.getElementById("windbericht-" + (this.dag)).innerHTML= String(this.winddirection)
        document.getElementById("dag-" + (this.dag)).innerHTML= String(this.dayNumberString) + " " + String(this.monthNumberString) + "<br>" + String(this.weekdayString)
    }
}
Voorspelling.days = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag", "Maandag", "Dinsdag"];
Voorspelling.pictures = ["../icons/regen.png","../icons/regenenzon.png","../icons/bewolkt.png","../icons/volledigezon.png"];
Voorspelling.winds = ["Noorderwind","Oosterwind","Zuiderwind","Westerwind"];
class Stad
{constructor(stad)
{
    this.stad = stad;
    this.vandaag = createDayPrediction("vandaag", 0)
    this.morgen = createDayPrediction("morgen", 1)
    this.overmorgen = createDayPrediction("overmorgen", 3)
    this.daarna = createDayPrediction("daarna", 4)
}
}


function createDayPrediction(dag, dagAfwijking){
    return new Voorspelling(dag, Math.floor(Math.random() * 50) - 10, Math.floor(Math.random() * 50) - 10,Math.floor(Math.random() * 10) - 7, dagAfwijking)
}


const temperaturesList = [
    createDayPrediction("vandaag", 0),
    createDayPrediction("morgen", 1),
    createDayPrediction("overmorgen", 2),
    createDayPrediction("daarna", 3)
];
for (let i = 0; i < temperaturesList.length; i++) {
    temperaturesList[i].render();
}
function showOnClick(tekst) {
    console.log(tekst)


    if (tekst.style.display === "none") {
        tekst.style.display = "block";
    } else {
        tekst.style.display = "none";
    }
}

let lastSelectedmode = null;

function select(el) {

    if (lastSelectedmode == null && !el.classList.contains('selected')) {
        lastSelectedmode = el
        eladded = lastSelectedmode.classList.add('selected')
        return eladded
    }
    if (lastSelectedmode !== null && !el.classList.contains('selected')) {
        lastSelectedmode.classList.remove('selected')
        lastSelectedmode = el
        eladded = lastSelectedmode.classList.add('selected')
        return eladded
    } else {
        lastSelectedmode.classList.remove('selected')
        lastSelectedmode = null
    }
}
timeNow = new Date
getHour = timeNow.getHours()
isItNight = getHour >= 20
if (isItNight === true){
    console.log("het is avond")

}
else{
    console.log("Het is dag suffie")
}

function check(elem) {
    document.getElementById('mySelect1').disabled = !elem.selectedIndex;
}
