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

let debugButton = document.getElementById("debugButton");
debugButton.addEventListener("click", function(){
  chrome.storage.local.get('exemptions', function(result){
    for(i in result.exemptions){
      console.log(result.exemptions[i]);
      document.getElementById("debugResults").innerHTML += result.exemptions[i] + ",\n" ;
    }
  })
})


