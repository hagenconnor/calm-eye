//button for changing colours
let changeColor = document.getElementById('hello');

/*
*Process of enabling and disabling chrome extension
*/
var enabled = false; //disabled by default
var myButton = document.getElementById('home'); //gets the toggle button
var optionsButton = document.getElementById('optionsButton');
var exemptions = []; //Maintain a list of site exemptions.
exemptions.push("https://www.google.ca/");

chrome.storage.local.set({exemptions: exemptions}, function() {
});

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



//get the state of the extension
chrome.storage.local.get('enabled', data => {
  
if (data.enabled) {
  //if the extension is enabled allow color change
  chrome.tabs.getSelected(null, function(tab) {
    var code = 'window.location.reload();';
    chrome.tabs.executeScript(tab.id, {code: code});
  });
  
    //it is enabled, do 
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

    //stores the color into chrome storage so content script can access what color to change
    chrome.storage.local.set({key: test}, function() {
        chrome.extension.getBackgroundPage().console.log('Value is set to ' + test);
      }); 
    });
}

} else {
    //it is disabled, do nothing and do not allow color change
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

//Open options on click of options button.
optionsButton.onclick = () => {
  window.open(chrome.runtime.getURL('options.html'));
} 

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });

