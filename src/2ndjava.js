/**
* Create an object literal with the following key value pairs:
* type: {string} 'Goldfish'
* brand: {string} 'Pepperidge Farm'
* flavor: {string} 'Cheddar'
* count: {number} 2000
* It should be returned directly by the following function
* @return {object} - the object literal
*/

window.onload = function () {
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
            console.log(Gists[0]);
        };
    };
    server_request.open('GET', 'https://api.github.com/gists/public');
    server_request.send();

}
