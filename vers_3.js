var versTomb = [];
var indexTomb = [];
var max = 2;


$.ajax(
        {url: "versek.json", success: function (result) {
                console.log(result);
                versTomb = result;  //a beolvasott JSN file tartalmát egy versTombbe mentem
                kezdetiAllapot();
                $("article").on("click", "input[type='button']", versMegjelenit);

            }
        });

$(function () {

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
    $("article").empty();
    $("article").append("<input type='button' id ='egyik_vers' value='Egyik vers'><input type='button' id ='masik_vers' value='Másik vers'>");
    indexTomb = [];                         //kiürítem az indextömb tartalmát    
    randomIndexKivalaszt();
    $("#egyik_vers").attr("value", versTomb[indexTomb[0]]["Cím"]);
    $("#masik_vers").attr("value", versTomb[indexTomb[1]]["Cím"]);
}

function versMegjelenit() {
   $("article div").remove();//kezdetben üres
    var index;
    $("header").empty();
    if ($(this).attr("id") === "egyik_vers") {
        index = indexTomb[0];
    } else {
        index = indexTomb[1];
    }
    var vers = "<div id='vers'>\n\
                            <h3>" + versTomb[index]["Cím"] + "</h3>\n\
                            <p>" + versTomb[index]["Vers"] + "</p>\n\
                            <p><b>Írta: " + versTomb[index]["Szerző"] + "</b></p>\n\
                             </div>";

    $("article").append(vers);
    $("header").append("<h1>" + versTomb[index]["Szerző"] + "</h1>");
    $("#egyik_vers").css("margin-bottom", "10px");
    $("#masik_vers").css("margin-bottom", "10px");

}