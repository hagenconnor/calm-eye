let haha = document.getElementById("test")
//second button function

chrome.storage.sync.get('color', function(data) {
    haha.style.backgroundColor = data.color;
    haha.setAttribute('value', data.color);
    chrome.storage.sync.set({color: '#b8b1a0'});
  });
  
  
  haha.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  };
  