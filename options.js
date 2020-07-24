/*
  *Module Name: options.js
  *Module Description: Extension options page. Controls page exemptions.
  *Authors: Daniel Kwan, Connor Hagen
  *Date: Jul 24 2020
  *Version: 1.0
  *Known issues: None.
  *Inferfaces with: options.html, Chrome Storage API
*/
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({color: item}, function() {
        console.log('color is ' + item);
      })
    });
    
  }
}
constructOptions(kButtonColors);
/*
  *Artifact: Add exemption
  *Description: Adds a given site to the exemption list and updates Chrome Storage API.
*/
const form1 = document.getElementById("exemptionAdd");
form1.addEventListener("submit", function(addPage){
  var x = form1.elements.namedItem("site").value;
  chrome.storage.local.get('exemptions', function(result){
    if (result.exemptions.includes(x)){
      console.log("Page already exists in exemption list!");
    } else{
      result.exemptions.push(x);
      chrome.storage.local.set({exemptions: result.exemptions}, function() {
      });
    }
  });
});
/*
  *Artifact: Delete exemption
  *Description: Deletes a given site from the exemption list (if it exists) and updates Chrome Storage API.
*/
const form2 = document.getElementById("exemptionDelete");
form2.addEventListener("submit", function(deletePage){
  var y = form2.elements.namedItem("site").value;
  chrome.storage.local.get('exemptions', function(result){
    if (result.exemptions.includes(y)){
      const index = result.exemptions.indexOf(y);
      if (index > -1){
        result.exemptions.splice(index,1);
      }
      chrome.storage.local.set({exemptions: result.exemptions}, function() {
      });
    } else{
      console.log("Page does not exist in exemption list!");
    }
  });
})

/*
  *Artifact: Print exemption list (debug)
  *Description: Prints the current elements of the exemption list. 
                Intended for debugging but should be implemented for customer usablilty.
*/
let debugButton = document.getElementById("debugButton");
debugButton.addEventListener("click", function(){
  chrome.storage.local.get('exemptions', function(result){
    for(i in result.exemptions){
      console.log(result.exemptions[i]);
      document.getElementById("debugResults").innerHTML += result.exemptions[i] + ",\n" ;
    }
  })
})


