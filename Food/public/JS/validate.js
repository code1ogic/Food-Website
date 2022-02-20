function clearErrors() {
  errors = document.getElementsByClassName("formerror");
  for (let item of errors) {
    item.innerHTML = "";
  }
}
function seterror(id, error) {
  //sets error inside tag of id
  element = document.getElementById(id);
  element.getElementsByClassName("formerror")[0].innerHTML = error;
}

function validateForm() {
  var returnval = true;
  clearErrors();

  var email = document.forms["myForm"]["username"].value;
  if (email.length > 20) {
    seterror("email", "*Email length is too long");
    returnval = false;
  }

  var password = document.forms["myForm"]["password"].value;
  if (password.length < 6) {
    seterror("pass", "*Password should be atleast 6 characters long!");
    returnval = false;
  }

  var cpassword = document.forms["myForm"]["cpass"].value;
  if (cpassword != password) {
    seterror("cpass", "*Password and Confirm password should match!");
    returnval = false;
  }

  return returnval;
}
