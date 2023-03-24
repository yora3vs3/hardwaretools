function addTool() {
  // Get the values from the form
  var name = document.getElementById("name").value;
  var price = document.getElementById("price").value;

  // Send a POST request to the server to add the tool
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/tools", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // If the tool was added successfully, add it to the table
      var tool = JSON.parse(xhr.responseText);
      var table = document.getElementById("tools");
      var row = table.insertRow(-1);
      var nameCell = row.insertCell(0);
      var priceCell = row.insertCell(1);
      nameCell.innerHTML = tool.name;
      priceCell.innerHTML = "$" + tool.price.toFixed(2);
    }
  };
  xhr.send(JSON.stringify({name: name, price: price}));
}

// Load the existing tools from the server when the page is loaded
window.addEventListener("load", function() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/tools", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // If the tools were loaded successfully, add them to the table
      var tools = JSON.parse(xhr.responseText);
      var table = document.getElementById("tools");
      for (var i = 0; i < tools.length; i++) {
        var row = table.insertRow(-1);
        var nameCell = row.insertCell(0);
        var priceCell = row.insertCell(1);
        nameCell.innerHTML = tools[i].name;
        priceCell.innerHTML = "$" + tools[i].price.toFixed(2);
      }
    }
  };
  xhr.send();
});

