var vehicleType;
var stringType;
var specificType;
var myList = document.getElementById('vehicle-list');
var listItems = myList.getElementsByTagName('li');
var firstSelection = document.getElementById('firstSelection');
var secondSelection = document.getElementById('secondSelection');

// add click event listeners to all list items
for (var i = 0; i < listItems.length; i++) {
  listItems[i].addEventListener('click', function() {
    // hide all list items
    for (var j = 0; j < listItems.length; j++) {
      listItems[j].classList.add('hidden');
    }
    // remove hidden class from selected list item
    this.classList.remove('hidden');
    // add active class to selected list item
    this.classList.add('active');
    // get target id of selected item
    var targetId = this.getAttribute('data-target');
    vehicleType = this.getAttribute('data-value');
    if (vehicleType == 0) {
      stringType = "Car/Economy Vehicle";
    }
    else if (vehicleType == 1) {
      stringType = "Motorcycle";
    }
    else if (vehicleType == 2) {
      stringType = "Semi Truck";
    }
    document.getElementById("vType").innerHTML = stringType;

    // hide all secondary dropdown menus except the selected one
    var dropdowns = document.getElementsByClassName('dropdown');
    for (var k = 0; k < dropdowns.length; k++) {
      if (dropdowns[k].id !== targetId) {
        dropdowns[k].classList.remove('show');
      }
    }
    // show selected secondary dropdown menu
    var targetDropdown = document.getElementById(targetId);
    targetDropdown.classList.add('show');

    // update selection box
    if (targetId === 'dropdown1') {
      firstSelection.textContent = this.textContent.trim();
    } else if (targetId === 'dropdown2') {
      secondSelection.textContent = this.textContent.trim();
      specificType = this.getAttribute('data-value'); 
      document.getElementById("specType").innerHTML = specificType;
    }
    
  });
}

  let gasMileage = document.querySelector('#formScript').getAttribute('gasMileage')


