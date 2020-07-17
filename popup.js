//button for changing colours
let changeColor = document.getElementById('hello');

/*
*Process of enabling and disabling chrome extension
*/
var enabled = false; //disabled by default
var myButton = document.getElementById('home'); //gets the toggle button

//accessing the enabled value to have the button text change
chrome.storage.local.get('enabled', data => {
    enabled = !!data.enabled;
    myButton.textContent = enabled ? 'Disable' : 'Enable';
});

//on click change the text and set the value to storage
myButton.onclick = () => {
    enabled = !enabled;
    myButton.textContent = enabled ? 'Disable' : 'Enable';
    chrome.storage.local.set({enabled:enabled});
    if(!enabled){
      display.style.backgroundColor = "transparent";
      
      
    }
    chrome.tabs.getSelected(null, function(tab) {
      var code = 'window.location.reload();';
      chrome.tabs.executeScript(tab.id, {code: code});
    });
};
//---------------------------------------------------------

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
  chrome.storage.sync.set({color: transparent}); //must set background color of button to transparent for this current theme
});




chrome.storage.local.get('enabled', data => {
  
if (data.enabled) {
  
  chrome.tabs.getSelected(null, function(tab) {
    var code = 'window.location.reload();';
    chrome.tabs.executeScript(tab.id, {code: code});
  });
  
    //it is enabled, do accordingly
    var input = document.querySelectorAll("input");
    for(var i = 0; i < input.length; i++){

    input[i].addEventListener("input", function(){
    var black = document.getElementById("black").value; 
    var display = document.getElementById("display");
      display.style.background = "rgb(" + black + ", " + black + ", " + black + ")";
      //sets the bar within the extension to color
    
      
    var test = display.style.background; 
    chrome.extension.getBackgroundPage().console.log(test);//for background.html

    console.log(display.style.background);//testing

    chrome.storage.local.set({key: test}, function() {
        chrome.extension.getBackgroundPage().console.log('Value is set to ' + test);
      });
    
      
        });
}

    
    
} else {
    //it is disabled
    console.log("hit disabled");
    chrome.tabs.getSelected(null, function(tab) {
      var code = 'window.location.reload();';
      chrome.tabs.executeScript(tab.id, {code: code});
    });
    
} 

});

//change color button function
changeColor.onclick = function(element) {
  let color = display.style.background; //sets the color variable to rgb from input^^
  //Using message passing to pass color change to content script.
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: color}, function(response) {
      console.log(response.farewell);
      
    });
  });
};
//here


window.onload = (event) => {
  chrome.extension.getBackgroundPage().console.log('page is fully loaded');
};
