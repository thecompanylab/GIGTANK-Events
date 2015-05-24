function httpGet(theUrl) {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );

    return xmlHttp.responseText;
}
function setupContacts(group, url) {
    document.addEventListener( "DOMContentLoaded", function() {
        var
        textContent = httpGet(url),
        tmpl    =   document.getElementById('template').innerHTML,
        data = {},
        ment     =   document.getElementById('mentors');
        data[group] = JSON.parse(textContent);
        ment.innerHTML = window.Mustache.render(tmpl, data);
    }, false );
}
function setupMentors() {
    setupContacts("mentors", "/gt14lm");
}
function setupTechMentors() {
    setupContacts("mentors", "http://gtc.colab.co/gt15/techmentors");
}
function setupStaff() {
    setupContacts("staff", "/gt14st");
}
function setupSpecialist() {
    setupContacts("staff", "/gt14sp");
}
function setupTeams() {
    setupContacts("teams", "/gt14tm");
}
