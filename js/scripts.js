//------Buiseness Logic for Address book-----
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}
AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId; 
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; this.contacts.length; i++) {
  if (this.contacts[i]) {
    if (this.contacts[i].id == id) {
      return this.contacts[i];
    }
  }
};
  return false;
}
AddressBook.prototype.deleteContact = function(id) {
  for (var i= 0; i< this.contacts.length;i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;

      }
    }
  };
  return false;
}

//-------Business Logic for Contact
function Contact(firstName, lastName, phoneNumber, emailAddress, physicalAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.physicalAddress = physicalAddress; 
//     this.homeAddress = homeAddress;
//     this.workAddress = workAddress;
//     this.schoolAddress = schoolAddress;
//   }
}
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

//-------Business Logic for Physical Addresses Separate object to push to address array in contact or nest in contact?
// function Address(homeAddress, workAddress, schoolAddress) {
//   this.homeAddress = homeAddress;
//   this.workAddress = workAddress;
//   this.schoolAddress = schoolAddress;
// }


//-------UI Logic-------
var addressBook = new AddressBook();
function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    // htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
    htmlForContactInfo += `<li id="${contact.id}">${contact.firstName} ${contact.lastName}</li>`
    });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.emailAddress);
  $(".physical-address").html(contact.physicalAddress);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  contact.id + ">Delete</button>");
}


function attachContactListeners() {
  $("ul#contacts").on("click","li",function() {
    showContact(this.id);
    
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form").submit(function(event) {
    event.preventDefault();
    var firstName = $("input#firstName").val();
    var lastName = $("input#lastName").val();
    var phoneNumber = $("input#number").val();
    var email = $("input#email").val();
    var physicalAddress = $("input#physical-address").val();
    var newContact = new Contact(firstName, lastName, phoneNumber, email, physicalAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});