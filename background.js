chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#D3D3D3'}, function() {
      console.log("Default colour: light grey");
    });
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { schemes: ['https' ,'http']},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
