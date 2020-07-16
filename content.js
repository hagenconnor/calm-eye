window.onload=function(){
    console.log("page load!");
    
    var elements = document.querySelectorAll("*");
    for (var i = 0; i < elements.length; i++){
        elements[i].style.backgroundColor = "gray";
    }
}
