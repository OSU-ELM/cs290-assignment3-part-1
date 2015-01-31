/**
* Create an object literal with the following key value pairs:
* type: {string} 'Goldfish'
* brand: {string} 'Pepperidge Farm'
* flavor: {string} 'Cheddar'
* count: {number} 2000
* It should be returned directly by the following function
* @return {object} - the object literal
*/
function tester() {
    document.getElementById('outDiv').innerHTML = 'TEST ME';
}


//below from MDN tutorial on Ajax : https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started 
function getGit() {
    var server_request = new XMLHttpRequest();
    if (!server_request) { //from AJAX lecture in week 4
        throw 'Error in connecting to site';
    }
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
           // outputGists(Gists);
        };
    };
    server_request.open('GET', 'https://api.github.com/gists/public');
    server_request.send();
}

/*function outputGists(get_gists, lang) {

    var links = [];
    var i = 0;

    for (i = 0; i < get_gists.length; i++) {
        for (language in get_gists) {
            if (language === lang) {
                links[i] = get_gists[i].url;
            }
            else {
                links[i] = null;
            }
        }
    };

    console.log(links);
}*/
/*function outputGists(get_gists, lang) {

    var links = [];
        for (lang in get_gists) {
            links[links.length] = get_gists[lang];
        }

    console.log(links);
}*/
function outputGists(get_gists, lang) {

    var links = [];
    for (language in get_gists) {
        if get_gists[lang].
    }

    console.log(links);
}