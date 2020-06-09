let changeColor = document.getElementById('hello');


chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
  chrome.storage.sync.set({color: transparent}); 
});


changeColor.onclick = function(element) {
  let color = "#8e918f";
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};




