class Voorspelling {
    constructor(obj) {
        this.dag = obj.dag;
        this.dagAfwijking = obj.dagAfwijking;
        this.temp1 = obj.temp1;
        this.temp2 = obj.temp2;
        this.wind = obj.wind;
    }

    min() {
        if (this.temp1 >= this.temp2)
            return this.temp2;
        else
            return this.temp1;
    }

    max() {
        if (this.temp1 >= this.temp2) {
            return this.temp1;
        } else
            return this.temp2;
    }
    get maximumInt()
    {
        return parseInt(this.max())
    }
    get winddirection() {
        if (this.wind === 0) {

            return Voorspelling.winds[0].toString()
        } else if (this.wind === 1) {
            return Voorspelling.winds[1].toString()
        } else if (this.wind === 2) {
            return Voorspelling.winds[2].toString()
        } else {
            return Voorspelling.winds[3].toString()
        }
    }

    get minString() {
        return this.min() + "ºC";
    }

    get maxString() {
        return this.max() + "ºC";
    }

    get weekdayString() {
        let date = new Date
        let dateWeekday = Voorspelling.days[date.getDay() + this.dagAfwijking];
        return dateWeekday.toString()
    }

    get dayNumberString() {
        let date = new Date
        let dateNumber = date.getDate() + this.dagAfwijking;
        return dateNumber.toString()
    }

    get monthNumberString() {
        let date = new Date
        let dateToDeviateInNumbers = date.getTime() + (86400000 * this.dagAfwijking);
        let deviatedDate = new Date(dateToDeviateInNumbers)
        return deviatedDate.toLocaleDateString('default', {month: 'long'})
    }

    get matchRightPicture() {
        if (this.maximumInt<= 0) {
            return Voorspelling.pictures[0].toString()
        } else if (this.maximumInt <= 10 && this.maximumInt > 0) {
            return Voorspelling.pictures[1].toString()
        } else if (this.maximumInt <= 20 && this.maximumInt >= 10) {
            return Voorspelling.pictures[2].toString()
        } else {
            return Voorspelling.pictures[3].toString()
        }
    }

    render() {
        document.getElementById("minimum-" + (this.dag)).innerHTML = String(this.minString)
        document.getElementById("maximum-" + (this.dag)).innerHTML = String(this.maxString)
        document.getElementById("afbeelding-" + (this.dag)).src = String(this.matchRightPicture)
        document.getElementById("windbericht-" + (this.dag)).innerHTML = String(this.winddirection)
        document.getElementById("dag-" + (this.dag)).innerHTML = String(this.dayNumberString) + " " + String(this.monthNumberString) + "<br>" + String(this.weekdayString)
    }
}

Voorspelling.days = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag", "Maandag", "Dinsdag"];
Voorspelling.pictures = ["../icons/regen.png", "../icons/regenenzon.png", "../icons/bewolkt.png", "../icons/volledigezon.png"];
Voorspelling.winds = ["Noorderwind", "Oosterwind", "Zuiderwind", "Westerwind"];

class Stad {
    constructor(obj) {
        this.stad = obj.stad;
        this.vandaag = new Voorspelling(obj.vandaag)
        this.morgen = new Voorspelling(obj.morgen)
        this.overmorgen = new Voorspelling(obj.overmorgen)
        this.daarna = new Voorspelling(obj.daarna)
    }
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
if (isItNight === true) {
    console.log("het is avond")
} else {
    console.log("Het is dag suffie")
}

function check(elem) {
    document.getElementById('mySelect1').disabled = !elem.selectedIndex;
}

async function loadFromJsonAPI(url) {
    try {
        let response = await fetch(url);
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

async function myFunction(id) {
    let x = document.getElementById("stadSelect").value

    const url = 'nederlandse_steden.json'
    let objectJSON = await loadFromJsonAPI(url)
    console.log(x)
    if (x == 4) {
        document.getElementById(id).innerHTML = "Selecteer een stad"
        document.getElementById("minimum-vandaag").innerHTML = ""
        document.getElementById("maximum-vandaag").innerHTML = ""
        document.getElementById("minimum-morgen").innerHTML = ""
        document.getElementById("maximum-morgen").innerHTML = ""
        document.getElementById("minimum-overmorgen").innerHTML = ""
        document.getElementById("maximum-overmorgen").innerHTML = ""
        document.getElementById("minimum-daarna").innerHTML = ""
        document.getElementById("maximum-daarna").innerHTML = ""

    } else {
        setTimeout(() => {
            let stad = new Stad(objectJSON[x])
            document.getElementById(id).innerHTML = stad.stad || "even geduld"
            document.getElementById("minimum-vandaag").innerHTML = stad.vandaag.minString || ":)"
            document.getElementById("maximum-vandaag").innerHTML = stad.vandaag.maxString || ":)"
            document.getElementById("minimum-morgen").innerHTML = stad.morgen.temp1 + "ºC" || ":)"
            document.getElementById("maximum-morgen").innerHTML = stad.morgen.temp2 + "ºC" || ":)"
            document.getElementById("minimum-overmorgen").innerHTML = stad.overmorgen.temp1 + "ºC" || ":)"
            document.getElementById("maximum-overmorgen").innerHTML = stad.overmorgen.temp2 + "ºC" || ":)"
            document.getElementById("minimum-daarna").innerHTML = stad.daarna.temp1 + "ºC" || ":)"
            document.getElementById("maximum-daarna").innerHTML = stad.daarna.temp2 + "ºC" || ":)"
            document.getElementById("windbericht-vandaag").innerHTML= String(stad.vandaag.winddirection)
            document.getElementById("windbericht-morgen").innerHTML= String(stad.morgen.winddirection)
            document.getElementById("windbericht-overmorgen").innerHTML= String(stad.overmorgen.winddirection)
            document.getElementById("windbericht-daarna").innerHTML= String(stad.daarna.winddirection)
            document.getElementById('afbeelding-vandaag').src = String(stad.vandaag.matchRightPicture)
            document.getElementById('afbeelding-morgen').src = String(stad.morgen.matchRightPicture)
            document.getElementById('afbeelding-overmorgen').src = String(stad.overmorgen.matchRightPicture)
            document.getElementById('afbeelding-daarna').src = String(stad.daarna.matchRightPicture)

        }, 100)

    }
}/**/


