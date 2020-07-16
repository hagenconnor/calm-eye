let changeColor = document.getElementById('hello');
var bkg = chrome.extension.getBackgroundPage();

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
  chrome.storage.sync.set({color: transparent}); //must set background color of button to transparent for this current theme
});


//takes the input from our slider
var input = document.querySelectorAll("input");
for(var i = 0; i < input.length; i++){

  input[i].addEventListener("input", function(){
    var black = document.getElementById("black").value; 
    var display = document.getElementById("display");
      display.style.background = "rgb(" + black + ", " + black + ", " + black + ")";
      //sets the bar within the extension to color

      console.log(display.style.background);//testing
        });
}


//change color button function
changeColor.onclick = function(element) {
  let color = display.style.background; //sets the color variable to rgb from input^^
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.background = "' + color + '";'});
        
        
  });
};


/*document.addEventListener('load', (event)=> {
  bkg.console.log('The page has fully loaded.');
});*/
window.onload = (event) => {
  chrome.extension.getBackgroundPage().console.log('page is fully loaded');
};
