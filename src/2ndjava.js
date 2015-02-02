/**
*Eric Miller Assignment3 part 2 
*/

//loads favorites list on page start
window.onload = function () {
    if (localStorage.getItem('FavLinks')) {
        print_favs();
    }
}

//holds gist objects
var links = [];

//holds favorite gist objects
var favorites = [];

//constructor for gist objects
var gist_obj = function (url, language, description) {
    this.url = url;
    this.language = language;
    this.description = description;
}

//Code borrowed from MDN tutorial on Ajax : https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started 
//Gets gists from Github and outputs them to the webpage.
function getGit() {
    var clear_ node = document.getElementById("outPut"); //attempt to clear previous search.... didn't work but ran out of time
    var GetpgCount = document.getElementById("range");
    var pgCount = GetpgCount.options[GetpgCount.selectedIndex].value; //syntax to get select tag value from http://stackoverflow.com/questions/1085801/get-selected-value-of-dropdownlist-using-javascript
    while (pgCount > 0) {
        var server_request = new XMLHttpRequest();
        server_request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var Gists;
                Gists = JSON.parse(this.responseText);
                var java = document.getElementById("check_java");
                var cee = document.getElementById("check_C");
                var sql = document.getElementById("check_SQL");
                var pyth = document.getElementById("check_Python");
                //'Checked' syntax from this site: http://stackoverflow.com/questions/9887360/check-if-checkbox-is-checked-javascript
                if (pyth.checked === true) {
                    outputGists(Gists, 'Python');
                }
                if (sql.checked === true) {
                    outputGists(Gists, 'SQL');
                }
                if (cee.checked === true) {
                    outputGists(Gists, 'C++');
                }
                if (java.checked === true) {
                    outputGists(Gists, 'JavaScript');
                }
                if (pyth.checked === false && sql.checked === false && cee.checked === false && java.checked === false) {
                    output_ALL_Gists(Gists);
                }
            }
            pgCount = pgCount - 1;
            make_list();
        };
        server_request.open('GET', 'https://api.github.com/gists?page=' + pgCount);
        server_request.send();
        //console.log(pgCount); //for testing page count
    }

}

//Outputs to website a list of Gist links. Code from this week's tutorial on MDN: https://developer.mozilla.org/en-US/docs/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
function make_list() {
    var div = document.getElementById("outPut");
    var list = document.createElement("ul"); //ul element to output in HTML. Idea and some of below code from Robert Brancale on thread: https://oregonstate.instructure.com/courses/1498916/discussion_topics/7519314
    var i = 0; //for loops
    for (i = 0; i < links.length; i++) {
        var item = document.createElement("li"); //Table to be inserted into HTML
        var button = document.createElement("input"); //button to create favorites
        button.type = "button";
        button.id = "favortie";
        button.value = "favorite";
        button.name = item.innerHTML = "-" + links[i].language + ": " + '<a href="' + links[i].url + '">' + "LINK" + '</a>' + "  Description: " + links[i].description + "     ";
        button.onclick = function () {
            favorites[favorites.length] = this.name;
            console.log(favorites);
            localStorage.clear();
            localStorage.setItem('FavLinks', JSON.stringify(favorites));
            document.getElementById("Favorite").innerHTML = '';
            print_favs();
        }
        item.innerHTML = "-" + links[i].language + ": " + '<a href="' + links[i].url + '">' + "LINK" + '</a>' + "  Description: " + links[i].description + "     ";
        item.appendChild(button);
        list.appendChild(item);
    };
    div.appendChild(list); //append new list to HTML
}

//prints out favorited links
function print_favs() {
    var hold_favs = []; //array for favorited links
    if (localStorage.getItem('FavLinks')) { //pull form local storage
        var fav_text = localStorage.getItem('FavLinks');
        hold_favs = JSON.parse(fav_text);
        var div = document.getElementById("Favorite");
        var list = document.createElement("ul"); //ul element to output in HTML. Idea and some of below code from Robert Brancale on thread: https://oregonstate.instructure.com/courses/1498916/discussion_topics/7519314
        var i = 0; //for loops
        for (i = 0; i < hold_favs.length; i++) {//create new list for favorites
            var item = document.createElement("li"); //list to be inserted into HTML
            item.value = hold_favs[i].url;
            var button = document.createElement("input"); //button to remove favorites
            button.type = "button";
            button.id = hold_favs[i].url;
            button.value = "Remove";
            button.name = i;
            button.onclick = function () {//remove favorite button
                var index = this.name;
                console.log(index);
                hold_favs.splice(index, 1);
                localStorage.clear();
                console.log(hold_favs);
                localStorage.setItem('FavLinks', JSON.stringify(hold_favs));
                document.getElementById("Favorite").innerHTML = '';
                print_favs();
            }
            item.innerHTML = hold_favs[i]; 
            item.appendChild(button);
            list.appendChild(item);
        };
        div.appendChild(list);
        i = 0;
    }
}

/*This is the gist sort that I finally got to work. It is based off the code posted by Phillip Lewallen 
 on this thread :https://oregonstate.instructure.com/courses/1498916/discussion_topics/7519315. 
 Seperating the gist into multiple objects was the key to making this work.
 */

//puts gist objects in the list array by language
function outputGists(get_gists, lang) {
    var i = 0;

    for (var element in get_gists) { //get the gist elements
        for (var data in get_gists[element].files) {
            var condense = get_gists[element].files[data];
            if (condense.language === lang) {//isolate the language portion of the gists, then compare to lang
                console.log(condense.language);
                links[links.length] = new gist_obj(get_gists[element].url, condense.language, get_gists[element].description);
            }
        }
    };
    console.log(links);
}
//puts all gist objects in the list array irregardless of language
function output_ALL_Gists(get_gists) {
    var i = 0;

    for (var element in get_gists) { //get the gist elements
        for (var data in get_gists[element].files) {
            var condense = get_gists[element].files[data];
            console.log(condense.language);
            links[links.length] = new gist_obj(get_gists[element].url, condense.language, get_gists[element].description);
        }
    };
    console.log(links);
}