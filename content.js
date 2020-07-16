window.onload=function(){
    console.log("page load!");

    var currentColor = document.getElementById("display");

    var elements = document.querySelectorAll("*");
    for (var i = 0; i < elements.length; i++){
        elements[i].style.backgroundColor = "gray";
   }
   //Figure out how to get the colour slider data into here,
   //use message passing either for colour or try to pass DOM elements.
   //Prefer to use message passing for colour.
}
