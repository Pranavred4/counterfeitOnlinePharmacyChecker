document.addEventListener('DOMContentLoaded', function (event) {
    var link = document.getElementById('crossCheckHref');
    link.addEventListener('click', function (event) {
        crossCheck(event);
    });
});

function crossCheck(event) {
     chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT,active:true}).then(result =>
     { 
        var currentTabURL = new URL(result[0].url).origin;
        getValidLinks().then(result =>validateSite(currentTabURL,result));
     } );
  
    event.preventDefault();
}

function validateSite(currentTabURL,validLinks)
{
    if ( currentTabURL != null && (validLinks != null && validLinks.length > 0))
        // Iterate over each element in the array
        for (var i = 0; i < validLinks.length; i++) {
            // look for the entry with a matching `code` value
            if (validLinks[i] == currentTabURL) {
                // we found it
                document.getElementById("crossCheckImage").src = "Yes.png";
                break;
            } else {
                document.getElementById("crossCheckImage").src = "No.png";
            }
        }
}

async function getValidLinks() {
    const res = await fetch("http://127.0.0.1:8082/validlinks");
    return await res.json();
}


