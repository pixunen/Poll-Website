const uri = 'api/Epoll';
var polls = [];

// GET all items from API
function getItems() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
}

// GET options from API
function getPoll(id) {

  fetch(`${uri}/${id}`)
  .then(response => response.json())
  .then(daata => tablePolls(daata))
  .catch(error => console.error('Unable to get Polls.', error));
}

// Add new item with POST
function addItem() {
  const addNameTextbox = document.getElementById('add-name');
  const OptionNameTextbox = document.getElementById('poll-option');
  const OptionNameTextbox2 = document.getElementById('poll-option2');
  const OptionNameTextbox3 = document.getElementById('poll-option3');
  

  const item = {
    Title: addNameTextbox.value.trim(),
    Options: [ {Option: OptionNameTextbox.value.trim()}, {Option: OptionNameTextbox2.value.trim()}, {Option: OptionNameTextbox3.value.trim()}]
  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(response => response.json())
    .then(() => {
      getItems();
      addNameTextbox.value = '';
      OptionNameTextbox.value = '';
      OptionNameTextbox2.value = '';
      OptionNameTextbox3.value = '';
    })
    .catch(error => console.error('Unable to add item.', error));
}

// Update Poll with id using PATCH
function updateItem(id) {
  
  const edit1 = document.getElementById('edit-1');
  const edit2 = document.getElementById('edit-2');
  const edit3 = document.getElementById('edit-3');

  if(edit1.checked === true)
  {
    var inp = document.getElementById('dit-1').innerHTML;
    inp++;
    const item = [{
      op: "replace",
      path: "/options/00/vote",
      value: parseInt(inp, 10)
    }];

    fetch(`${uri}/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    .then(() => getItems())
    .catch(error => console.error('Unable to update item.', error));
  }
  else if(edit2.checked === true)
  {
    var inp = document.getElementById('dit-2').innerHTML;
    inp++;
    const item = [{
      op: "replace",
      path: "/options/01/vote",
      value: parseInt(inp, 10)
    }];

    fetch(`${uri}/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    .then(() => getItems())
    .catch(error => console.error('Unable to update item.', error));
  }
  else
  {
    var inp = document.getElementById('dit-3').innerHTML;
    inp++;
    const item = [{
      op: "replace",
      path: "/options/02/vote",
      value: parseInt(inp, 10)
    }];

    fetch(`${uri}/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    .then(() => getItems())
    .catch(error => console.error('Unable to update item.', error));
  }



  return location.reload();

}

// Create selected poll items inside a list
function tablePolls(daata) {

  // Variables for this function
  var frm = document.createElement('FORM');
  var selopt = document.getElementById('pollSelect');
  var selid = selopt.options[selopt.selectedIndex].id;
  frm.setAttribute("action", "javascript:void(0);")
  frm.setAttribute("method", "POST")
  frm.setAttribute("onSubmit", `updateItem(${selid})`);
  var list = document.createElement('ul');
  list.setAttribute("id", "Lista");
  var h = document.getElementById('Lista');
  let num = 1;
  let numm = 1;
  let n = 1;
  let m = 1;
  let numme = 1;

  // If statement to check if these are already created
   if(h === null)
   {
     // Foreach loop to go through daata object and create elements based on the data
     daata.options.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
        var li = document.createElement('li');
         if(key === 'option')
         {
            li.style.display = "inline";
            li.textContent = value + "  -  ";
            li.setAttribute("class", "vastaus" + m++);
            list.appendChild(li);
         }
         
         if(key === 'vote')
         {
          var liv = document.createElement('LABEL');
          var box = document.createElement('INPUT');
          box.setAttribute("id", "edit-" + num++);
          box.setAttribute("name", "edit-" + n++);
          box.setAttribute("type", "checkbox");
          box.setAttribute("onClick", "selectOnlyThis(this.id)");
  

          var k = document.createElement('br');
          liv.setAttribute("for", "edit-" + numm++)
          liv.setAttribute("id", "dit-" + numme++)
          liv.style.display = "inline";
          liv.style.marginLeft = "10px";
          box.textContent = value;
          liv.textContent = value;

          list.appendChild(liv);
          list.appendChild(box);
          list.appendChild(k);
          
          }     
        });
      });
      var submit = document.createElement("INPUT");
      submit.setAttribute("type", "submit");
      submit.setAttribute("value", "Vote");
   }
  
   // Appendin all the content inside form
  var app = document.querySelector('#result');
  app.appendChild(frm);
  frm.appendChild(list);
  frm.appendChild(submit);  
}

// Insert polls to select
function _displayItems(data) {
  let sel = document.getElementById("pollSelect");
  data.forEach(item => {
    let textNode = document.createTextNode(item.title);
    let ot = document.createElement("OPTION");
    ot.setAttribute('id', item.id);
    var z = document.getElementById(item.id);
    if(z === null)
    {
      ot.appendChild(textNode);
      sel.appendChild(ot);
    }
  });

  sel.addEventListener('change', (event) => {
    const result = document.getElementById('result');
    result.textContent = `${event.target.value}`;
    let z = document.getElementById("pollSelect").selectedIndex;
    getPoll(z);
  }, false);
  polls = data;
}

// Only one checkbox function
function selectOnlyThis(id) {
  for (var i = 1;i <= 3; i++)
  {
      document.getElementById("edit-" + i).checked = false;
  }
  document.getElementById(id).checked = true;
}