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
  chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    console.log(response.farewell);
  });

});
const form2 = document.getElementById("exemptionDelete");
form2.addEventListener("submit", function(deletePage){
  var y = form2.elements.namedItem("site").value;
  console.log(y);
})


