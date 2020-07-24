/*
  *Module Name: background.js
  *Module Description: System background script. Performs initialization after installation.
  *Authors: Daniel Kwan, Connor Hagen
  *Date: Jul 24 2020
  *Version: 1.0
  *Known issues: None.
  *Interfaces with: None.
*/
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set(null, function() {
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

  console.log("Hello");

