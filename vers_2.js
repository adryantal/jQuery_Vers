var versTomb = [];
var indexTomb = [];
var max = 2;


$.ajax(
        {url: "versek.json", success: function (result) {
                console.log(result);
                versTomb = result;  //a beolvasott JSN file tartalmát egy versTombbe mentem

                console.log(indexTomb);
            }
        });


$(function () {
    kezdetiAllapot();
    $("article").on("click", "#gomb", versekMegjelenit);
});

function randomIndexKivalaszt() {           //véletlenszerűen kiválaszt 2 különböző indexet a [0,4] tartományból

    var i = 0;
    do {
        var index = Math.floor(Math.random() * 5);  //random index generálása 0 és 4 között
        if ($.inArray(index, indexTomb) < 0) //különbözőek legyenek; ha nem igaz, azaz nincs benne a tömbben, negatív értéket ad vissza a kifejezés
            indexTomb.push(index);
        i++;
        //console.log(index);
    } while (indexTomb.length < max);
}

function kezdetiAllapot() {                  //legyen üres az article, és csak egy gombot tartalmazzon
    indexTomb = [];                         //kiürítem az indextömb tartalmát
    $("article").empty();
    var gomb = "<input type='button' id ='gomb' value='Mutass két verset!'>";
    $("article").append(gomb);
    randomIndexKivalaszt();
}

function versekMegjelenit() {
    kezdetiAllapot();
    $("header h1").empty();
    var headerszoveg = "<h1>";
    for (var i = 0; i < max; i++) {
        $("article").append("<div id='verskontener" + i + 1 + "'></div>"); //létrehozok i=2 üres div-et
        var aktIndex = indexTomb[i];
        var szoveg = "<h3>" + versTomb[aktIndex]["Cím"] + "</h3>\n\
                            <p>" + versTomb[aktIndex]["Vers"] + "</p>\n\
                            <p><b>Írta: " + versTomb[aktIndex]["Szerző"] + "</b></p>";
        $("article div").eq(i).append(szoveg);
        if (aktIndex === indexTomb[indexTomb.length - 1]) {
            headerszoveg += versTomb[aktIndex]["Szerző"];
        } else {
            headerszoveg += versTomb[aktIndex]["Szerző"] + ", ";
        }
    }
    headerszoveg += "</h1>";
    $("#gomb").css("margin-bottom", "10px");
    $("header").append(headerszoveg);
}