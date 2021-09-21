var versTomb = [];
var indexTomb = [];
var max = 2;


$.ajax(
        {url: "versek.json", success: function (result) {
                console.log(result);
                versTomb = result;  //a beolvasott JSN file tartalmát egy versTombbe mentem
                kezdetiAllapot();
            }
        });

$(function () {
    $("#article4 div").eq(0).on("mouseover", "img", function () {
        versMegjelenit(0);
    });
    $("#article4 div").eq(0).on("mouseleave", "img", function () {
        $("#article4 div").eq(1).empty();
    });
    $("#article4 div").eq(2).on("mouseover", "img", function () {
        versMegjelenit(1);
    });
    $("#article4 div").eq(2).on("mouseleave", "img", function () {
        $("#article4 div").eq(3).empty();
    });
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


function kezdetiAllapot() {
    indexTomb = [];                         //kiürítem az indextömb tartalmát
    $("#article4 div").empty();
    randomIndexKivalaszt();

    var url_0 = versTomb[indexTomb[0]]["Kép"];
    $("#article4 div").eq(0).append("<img src='" + url_0 + "' alt='" + url_0.slice(6, url_0.length - 4) + "'>");

    var url_1 = versTomb[indexTomb[1]]["Kép"];
    $("#article4 div").eq(2).append("<img src='" + url_1 + "' alt='" + url_1.slice(6, url_1.length - 4) + "'>");
}


function versMegjelenit(inputIndex) { //inputIndex: 0  vagy 1
    index = indexTomb[inputIndex];
    $("#article4 div").eq(1).empty(); //második és negyedik div ürítése
    $("#article4 div").eq(3).empty();
    $("header").empty();
    var vers = "            <h3>" + versTomb[index]["Cím"] + "</h3>\n\
                            <p>" + versTomb[index]["Vers"] + "</p>\n\
                            <p><b>Írta: " + versTomb[index]["Szerző"] + "</b></p>";
    if (inputIndex === 0)
        $("#article4 div").eq(1).append(vers); //ha az 1. kép fölé vittem az egeret, akkor a 3. divben jelenjen meg a vers
    if (inputIndex === 1)
        $("#article4 div").eq(3).append(vers); //ha a 2. kép fölé vittem az egeret, akkor a 4. divben jelenjen meg a vers
    $("header").append("<h1>" + versTomb[index]["Szerző"] + "</h1>");
}