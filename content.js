
//on load
window.onload=function(){

    console.log("page load!"); //testing
      //get if enabled
      chrome.storage.local.get('enabled', data => {
          console.log(data.enabled);
      
        if (data.enabled) {
            //it is enabled, change the color 
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
            //it is disabled, do nothing
            console.log("hit disabled");
            
            
       } 
        }
    );
        
   chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(request.greeting);
      var elements = document.querySelectorAll("*");
      for (var i = 0; i < elements.length; i++){
          elements[i].style.backgroundColor = request.greeting;
     }
    });


    
};