console.log("SERHAT BAYRAKCI - 300364177 - pagination assg.")
//console.log(users); //test to confirm data.js is loaded

/*-----Desired output--------------------------------------------------------------------------
<ul class="contact-list">       ok
  
  <li class="contact-item">     ok
    <div class="contact-details">     ok
        <img class="avatar" src="https://randomuser.me/api/portraits/thumb/women/67.jpg">       ok
        <h3>iboya vat</h3>            ok
        <span class="email">iboya.vat@example.com</span>      ok
    </div>
    <div class="joined-details">            ok
      <span class="date">Joined 07/15/15</span>     ok
    </div>
  </li>

  <li class="contact-item">
    <div class="contact-details">
      <img class="avatar" src="https://randomuser.me/api/portraits/thumb/men/75.jpg">
      <h3>aapo niskanen</h3>
      <span class="email">aapo.niskanen@example.com</span>
    </div>
      <div class="joined-details">
        <span class="date">Joined 06/15/12</span>
    </div>
  </li>

  and so forth...

</ul>   -------------------------------------------------------------------------------------*/

//PART 1: FETCHING THE DATA FROM DATA.JS AND PUTTING IT INTO HTML

var contactList = document.querySelector('.contact-list');  //this is the contact-list container var.


for (var i = 0; i < users.length; i++) {                  //DOM manipulation loop to display users on HTML
  var user = users[i];                                    //each user will be in variable user.

  var contactItem = document.createElement('li');         
  contactItem.classList.add('contact-item');              //creates <li> and makes it contact-item class.

  var contactDetails = document.createElement('div');
  contactDetails.classList.add('contact-details');        //creates <div> and makes it contact-details class.

      /////contact details\\\\\
  var avatar = document.createElement('img');
  avatar.classList.add('avatar');                         //creates <img> and makes it avatar class.
  avatar.src = user.image;                                //assigns user.image (there is link under user.image) 
  contactDetails.appendChild(avatar);                     //appends it to contact-details

  var nameUsr = document.createElement('h3');             //same thing for name
  nameUsr.textContent = user.name;
  contactDetails.appendChild(nameUsr);

  var email = document.createElement('span');             //same thing for email
  email.classList.add('email');
  email.textContent = user.email;
  contactDetails.appendChild(email);

  contactItem.appendChild(contactDetails);                //appends contact-details under contact-items
      /////contact details done\\\\\


      /////joined details\\\\\
  var joinedDetails = document.createElement('div');
  joinedDetails.classList.add('joined-details');        //creates <div> and makes it contact-details class.

  var date = document.createElement('span');
  date.classList.add('date');
  date.innerHTML = 'Joined ' + user.joined;
  joinedDetails.appendChild(date);                      //same thing for date

  contactItem.appendChild(joinedDetails);               //appends joined-details under contact-items too.
      /////joined details done\\\\\

  contactList.appendChild(contactItem);                 //appends contact-item under contact-list.

}
console.log(`${i} contacts successfully loaded!`);


////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//PART 2: PAGINATION OF CONTACTS IN HTML
  
const contactsPerPage = 10;                            //Variable to choose how many contacts to display each page

const contactsList = document.querySelectorAll('.contact-item');    //creates a list of all '.contact-item's
const noOfContacts = contactsList.length;                           //total number of contacts in the HTML

console.log("Total number of contacts is: " + contactsList.length)

const noOfPages = Math.ceil(noOfContacts / contactsPerPage);        //math.ceil is used to round up i.e. '2.4' to '3'.
console.log("Number of pages will be: " + noOfPages)

function paginateIt(pageNo) {                                       //function to display the chosen page
  const indexStart = (pageNo - 1) * contactsPerPage;
  const indexEnd = indexStart + contactsPerPage;
  //this is a calculation to determine the start and end indexes.
  //indexes will be 0...10, 10...19, 20...29
  console.log("Starting index: " + indexStart + ", End index: " + indexEnd)

  function hideContacts(anyContact) {                  //this function is used 'not to display' any item.
    anyContact.style.display = 'none';
  }

  contactsList.forEach(hideContacts);             //hides every item within contactList
  for (let i = indexStart; i < indexEnd; i++) {   //this loop is used to display contacts that is within index range.
    if (i < noOfContacts) {                       //this if statement is used to prevent an error if last page doesn't have 10 items to 'not to display'
      contactsList[i].style.display = 'block';
    }
  }
}

function addButtons() {      //to add buttons to choose the pages
  const buttonsContainer = document.createElement('div');  //creates div elements for buttons
  buttonsContainer.classList.add('pagination');            //makes button elements .pagination class

  // Create buttons for each page
  for (let i = 1; i <= noOfPages; i++) {      //creates as many buttons as the number of pages
    const button = document.createElement('button');    //creates <button> element
    button.innerHTML = i;                               //adds number of page to the button
    button.addEventListener('click', () => {            //event handler when button is clicked
      paginateIt(i);
    });
    button.addEventListener('click', () => {            //to update contacts shown
      showTotalContacts();
    });
    buttonsContainer.appendChild(button);               //appends the buttons to our container
  }
  document.querySelector('div.page').appendChild(buttonsContainer);  //adds buttons to where it was asked.
}

function showTotalContacts() {                          //function to show how many contacts are displayed.
  let displayedCount = 0;

  contactsList.forEach(function (anyElementincontactsList) {
    if (getComputedStyle(anyElementincontactsList).display == 'block') {
      displayedCount++;
    }
  })

  const totalText = document.querySelector('div.page-header.cf h3')
  totalText.innerHTML = `Showing ${displayedCount} of ${contactsList.length} contacts`;
}

paginateIt(1);   //1 is there because we want to show first page when the page is loaded
addButtons();
showTotalContacts()
  
  
  //!\\end of the code//!\\






