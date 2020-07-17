

window.onload=function(){

    console.log("page load!");
    
  
      chrome.storage.local.get('enabled', data => {
          console.log(data.enabled);
          
        if (data.enabled) {
            //it is enabled, do accordingly
            console.log("hit enabled");
            chrome.storage.local.get(['key'], function(result) {

        var a = result;

        var elements = document.querySelectorAll("*");
        for (var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = a.key;
       } 
        console.log('Value currently is ' + a.key);
      });
        } else {
            //it is disabled
            console.log("hit disabled");
            
            
       } 
        }
    );


    ////
   //Figure out how to get the colour slider data into here,
   //use message passing either for colour or try to pass DOM elements.
   //Prefer to use message passing for colour.

   chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(request.greeting);
      var elements = document.querySelectorAll("*");
      for (var i = 0; i < elements.length; i++){
          elements[i].style.backgroundColor = request.greeting;
     }
    });


    
};