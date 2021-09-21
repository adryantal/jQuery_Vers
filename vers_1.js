var versTomb = [];
var randomIndex = Math.floor(Math.random() * 5); //random index generálása 0 és 4 között
console.log(randomIndex);

$.ajax(
        {url: "versek.json", success: function (result) {
                console.log(result);
                versTomb = result;  //a beolvasott JSN file tartalmát egy versTombbe mentem

                versMegjelenit();

            }
        });

$(function () {
    $("article").on("mouseover", "h3", kepMegjelenit);
    $("article").on("mouseleave", "h3", function () {
        versMegjelenit();
    });
});



function kepMegjelenit() { 
    var url = versTomb[randomIndex]["Kép"];
    var verskep = "<img src='" + url + "' alt='" + url.slice(6, url.length-4) + "' >";
    $("#randomvers").append(verskep);

}


function versMegjelenit() {
    $("article").empty(); //kezdetben üres
    $("header").empty(); 
    var randomvers = "<div id='randomvers'>\n\
                            <h3>" + versTomb[randomIndex]["Cím"] + "</h3>\n\
                            <p>" + versTomb[randomIndex]["Vers"] + "</p>\n\
                            <p><b>Írta: " + versTomb[randomIndex]["Szerző"] + "</b></p>\n\
                             </div>";

    $("article").append(randomvers);
    $("header").append("<h1>"+versTomb[randomIndex]["Szerző"]+"</h1>");

}