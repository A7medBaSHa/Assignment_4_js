var userNameInput = document.querySelector("#userName");
var userEmailInput = document.querySelector("#userEmail");
var userPasswordInput = document.querySelector("#userPassword");
var signUpText = document.querySelector(".sign-up");
var signInText = document.querySelector(".sign-in");

var labelUserNameInput = document.querySelector("#labelUserNameInput");

var success = document.querySelector("#Success");
var wrong = document.querySelector("#Wrong");
var incorrect = document.querySelector("#incorrect");
var incorrectPass = document.querySelector("#incorrectPass");
var fillInputs = document.querySelector("#fillInputs");

var loginBtn = document.querySelector("#loginBtn");
var signUpBtn = document.querySelector("#signUpBtn");

var welcome = document.querySelector("#welcome");

var signUpList;
var boolean;
var index;

if (localStorage.getItem("inputs") == null) {
  signUpList = [];
} else {
  signUpList = JSON.parse(localStorage.getItem("inputs"));
}

if (signUpText) {
  signUpText.addEventListener("click", sign);
}
if (signInText) {
  signInText.addEventListener("click", sign);
}

if (signUpBtn) {
  signUpBtn.addEventListener("click", signUp);
}

if (loginBtn) {
  loginBtn.addEventListener("click", signIn);
}

if (userNameInput) {
  userNameInput.addEventListener("input", function (e) {
    // validateInputs(this);
    //or
    validateInputs(e.target);
  });
}
if (userEmailInput) {
  userEmailInput.addEventListener("input", function (e) {
    // validateInputs(this);
    //or
    validateInputs(e.target);
  });
}

if (userPasswordInput) {
  userPasswordInput.addEventListener("input", function (e) {
    // validateInputs(this);
    //or
    validateInputs(e.target);
  });
}

function sign() {
  userNameInput.classList.toggle("d-none");
  labelUserNameInput.classList.toggle("d-none");
  signInText.classList.toggle("d-none");
  signUpText.classList.toggle("d-none");
  loginBtn.classList.toggle("d-none");
  signUpBtn.classList.toggle("d-none");
  fillInputs.classList.add("d-none");
  incorrect.classList.add("d-none");
  incorrectPass.classList.add("d-none");
  success.classList.add("d-none");
  wrong.classList.add("d-none");

  clearInputs();
}

function signUp() {
  if (
    userNameInput.classList.contains("is-valid") &&
    userEmailInput.classList.contains("is-valid") &&
    userPasswordInput.classList.contains("is-valid")
  ) {
    checkIfExist();
    fillInputs.classList.add("d-none");
    if (boolean == 1) {
      var inputList = {
        userName: userNameInput.value,
        userEmail: userEmailInput.value,
        userPass: userPasswordInput.value,
      };
      signUpList.push(inputList);
      localStorage.setItem("inputs", JSON.stringify(signUpList));
    }
  } else {
    fillInputs.classList.remove("d-none");
  }
}

function validateInputs(element) {
  var regex = {
    userName: /^[\w ]{3,20}$/,
    userEmail:
      /^\w{3,20}\@(yahoo|gmail|[A-Za-z]{3,6})\.(com|org|net|[A-Za-z]{3})$/,
    userPassword: /^[\#\@\*]{0,3}[\w\#\@\*]{6,}[\#\@\*]{0,3}$/i,
  };
  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.nextElementSibling.classList.remove("d-none");
  }
}

function clearInputs() {
  userNameInput.value = null;
  userEmailInput.value = null;
  userPasswordInput.value = null;
}

function checkIfExist() {
  var exist = 0;
  for (var i = 0; i < signUpList.length; i++) {
    if (userEmailInput.value == signUpList[i].userEmail) {
      exist = 1;
    }
  }
  if (exist == 0) {
    boolean = 1;
    wrong.classList.add("d-none");
    success.classList.remove("d-none");
  } else {
    boolean = 0;
    wrong.classList.remove("d-none");
    success.classList.add("d-none");
  }
}

function signIn() {
  if (
    userEmailInput.classList.contains("is-valid") &&
    userPasswordInput.classList.contains("is-valid")
  ) {
    var done;
    fillInputs.classList.add("d-none");
    for (var i = 0; i < signUpList.length; i++) {
      if (
        userEmailInput.value === signUpList[i].userEmail &&
        userPasswordInput.value === signUpList[i].userPass
      ) {
        done = 1;
        index = i;
        console.log(signUpList);
      } else if (
        userEmailInput.value === signUpList[i].userEmail &&
        userPasswordInput.value !== signUpList[i].userPass
      ) {
        done = 2;
      }
    }
    if (done == 1) {
      incorrectPass.classList.add("d-none");
      incorrect.classList.add("d-none");
      // localStorage.setItem("currentUser".JSON.stringify(signUpList[index]));
      welcome.innerHTML = `Welcome sir ${signUpList[index].userName}`;
      // window.open("home.html", "_self");
      location.href = "home.html";
    } else if (done == 2) {
      incorrectPass.classList.remove("d-none");
      incorrect.classList.add("d-none");
    } else {
      incorrect.classList.remove("d-none");
      incorrectPass.classList.add("d-none");
    }
  } else {
    fillInputs.classList.remove("d-none");
    incorrect.classList.add("d-none");
  }
}
// var currentUser = JSON.parse(localStorage.getItem("currentUser"));
// if (currentUser && welcome) {
//   welcome.innerHTML = `welcome sir ${currentUser.userName}`;
// }
