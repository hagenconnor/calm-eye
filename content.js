window.onload=function(){
    console.log("page load!");

   
    var elements = document.querySelectorAll("*");
    for (var i = 0; i < elements.length; i++){
        elements[i].style.backgroundColor = "gray";
   } 
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
}