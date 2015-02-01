/**
* Create an object literal with the following key value pairs:
* type: {string} 'Goldfish'
* brand: {string} 'Pepperidge Farm'
* flavor: {string} 'Cheddar'
* count: {number} 2000
* It should be returned directly by the following function
* @return {object} - the object literal
*/

//loads favorites list on page start
    window.onload = function () {
        if (localStorage.getItem('FavLinks')) {
            var fav_text = localStorage.getItem('FavLinks');
            hold_favs = JSON.parse(fav_text);
            favorites = hold_favs;
            print_favs();
        }
    }

    //holds gist objects
    var links = [];

    //holds favorite gist objects
    var favorites = [];

    //constructor for gist objects
    var gist_obj = function (url, language) {
        this.url = url;
        this.language = language;
    }

    //Code borrowed from MDN tutorial on Ajax : https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started 
    //Gets gists from Github and outputs them to the webpage.
    function getGit() {
        var pgCount = document.getElementById("PgCount").value;
        console.log(pgCount);
        if (pgCount < 1 || pgCount > 5) {
            pgCount = 1;
        }
        var server_request = new XMLHttpRequest();
        if (!server_request) { //from AJAX lecture in week 4
            throw 'Error in connecting to site';
        }
        while (pgCount > 0) {
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
            console.log(pgCount);
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
            button.onclick = function () {
                favorites[favorites.length] = links[i];
                console.log(favorites);
                localStorage.clear();
                localStorage.setItem('FavLinks', JSON.stringify(favorites));
                print_favs();
            }
            item.innerHTML = (i + 1) + "." + links[i].language + ": " + '<a href="' + links[i].url + '">' + "LINK" + '</a>';
            item.appendChild(button);
            list.appendChild(item);
        };
        div.appendChild(list);
        i = 0;

    }

    //prints out the list of favorites to the html page
    function print_favs() {
        var hold_favs = [];
        if (localStorage.getItem('FavLinks')) {
            var fav_text = localStorage.getItem('FavLinks');
            hold_favs = JSON.parse(fav_text);
            console.log(hold_favs);

            var div = document.getElementById("Favorite");
            var list = document.createElement("ul"); //ul element to output in HTML. Idea and some of below code from Robert Brancale on thread: https://oregonstate.instructure.com/courses/1498916/discussion_topics/7519314
            var i = 0; //for loops
            for (i = 0; i < hold_favs.length; i++) {
                var item = document.createElement("li"); //Table to be inserted into HTML
                var button = document.createElement("input"); //button to remove favorites
                button.type = "button";
                button.id = "Remove";
                button.value = "Remove";
                button.onclick = function () {
                    favorites = favorites.splice(i, 1);
                    if (favorites.length === 1) {
                        favorites = [];
                    };
                    console.log(favorites);
                    localStorage.clear();
                    localStorage.setItem('FavLinks', JSON.stringify(favorites));
                    item.closest('li').remove();
                }
                item.innerHTML = (i + 1) + "." + hold_favs[i].language + ": " + '<a href="' + hold_favs[i].url + '">' + "LINK" + '</a>';
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
                    links[links.length] = new gist_obj(get_gists[element].url, condense.language);
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
                links[links.length] = new gist_obj(get_gists[element].url, condense.language);
            }
        };
        console.log(links);
    }