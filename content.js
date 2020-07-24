/*
  *Module Name: content.js
  *Module Description: Primary content script. Performs page colour changes.
  *Authors: Daniel Kwan, Connor Hagen
  *Date: Jul 24 2020
  *Version: 1.0
  *Known issues: None.
  *Interfaces with: popup.js, options.js, Chrome Storage API
*/
//on load
window.onload=function(){
  pageAllowed = true; //Flag for page exemption.
  chrome.storage.local.get('exemptions',callback); //Get exemptions from Chrome Storage API.
    console.log("page load!"); //testing
      //get if enabled
      chrome.storage.local.get('enabled', data => {
          console.log(data.enabled);

          if (data.enabled && pageAllowed) {    
            //it is enabled, change the color 
            console.log("hit enabled");
            chrome.storage.local.get(['key'], function(result) {

        var a = result;
        /*
          *Artifact: Background colour changer (system-initated)
          *Description: Modifies background page elements if above conditions are satisfied.
        */
        var elements = document.querySelectorAll("*");
        for (var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = a.key;
       } 
        console.log('Value currently is ' + a.key);
      });
        } else {
            //it is disabled, do nothing
            console.log("hit disabled");
            
            
       } 
        }
    );
    /*
      *Artifact: Background colour changer (user-initated)
      *Description: Modifies background page elements on click of the change colour button.
    */
   chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(request.greeting);
      var elements = document.querySelectorAll("*");
      for (var i = 0; i < elements.length; i++){
          elements[i].style.backgroundColor = request.greeting;
     }
    });
    
};
/*
  *Artifact: Exemption list callback
  *Description: Grabs data from Chrome storage and determines if site is exempt.
*/
function callback(result){
  exemptionlist = result.exemptions;
  if (exemptionlist.includes(window.location.href)){
    pageAllowed = false;
  } else{
    pageAllowed = true;
  }
}
