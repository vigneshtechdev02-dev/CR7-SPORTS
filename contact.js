// Navbar 
// Seleting navbar Section
var menu = document.getElementById("menubtn")
var canclebar = document.getElementById("xcancle")

menu.addEventListener("click", function () {
    var sidebar = document.getElementById("Sidenavbarbutton")
    sidebar.style.left = "0"
})

canclebar.addEventListener("click", function () {
    var sidebar = document.getElementById("Sidenavbarbutton")
    sidebar.style.left = "-70%"
})

/* =====================================
   CONTACT FORM
===================================== */

const form = document.getElementById("contactForm");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const messageError = document.getElementById("messageError");

const successPopup = document.getElementById("successPopup");


/* =====================================
   NAME - LETTERS ONLY
===================================== */

function cleanName(input) {

    input.value = input.value.replace(
        /[^a-zA-Z\s]/g,
        ""
    );

}


/* First Name */

firstName.addEventListener("input", function () {

    cleanName(this);

    validateName(
        this,
        firstNameError,
        "First Name"
    );

});


/* Last Name */

lastName.addEventListener("input", function () {

    cleanName(this);

    validateName(
        this,
        lastNameError,
        "Last Name"
    );

});


/* =====================================
   NAME VALIDATION
   Minimum 7 characters
===================================== */

function validateName(input, errorElement, label) {

    const value = input.value.trim();

    if (value === "") {

        errorElement.textContent =
            `${label} is required`;

        input.classList.add("invalid");
        input.classList.remove("valid");

        return false;

    }

    if (value.length < 4) {

        errorElement.textContent =
            `${label} must contain minimum 4 letters`;

        input.classList.add("invalid");
        input.classList.remove("valid");

        return false;

    }

    errorElement.textContent = "";

    input.classList.remove("invalid");
    input.classList.add("valid");

    return true;

}


/* =====================================
   EMAIL
===================================== */

email.addEventListener("input", function () {

    validateEmail();

});


function validateEmail() {

    const value = email.value.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (value === "") {

        emailError.textContent =
            "Email Address is required";

        email.classList.add("invalid");
        email.classList.remove("valid");

        return false;

    }

    if (!emailPattern.test(value)) {

        emailError.textContent =
            "Please enter a valid email address";

        email.classList.add("invalid");
        email.classList.remove("valid");

        return false;

    }

    emailError.textContent = "";

    email.classList.remove("invalid");
    email.classList.add("valid");

    return true;

}


/* =====================================
   PHONE
===================================== */

/* Numbers only */

phone.addEventListener("input", function () {

    this.value = this.value.replace(
        /[^0-9]/g,
        ""
    );

    this.value = this.value.substring(0, 10);

    validatePhone();

});


function validatePhone() {

    const value = phone.value.trim();

    if (value === "") {

        phoneError.textContent =
            "Phone number is required";

        phone.classList.add("invalid");
        phone.classList.remove("valid");

        return false;

    }

    if (value.length !== 10) {

        phoneError.textContent =
            "Fill Full number! Enter exactly 10 numbers";

        phone.classList.add("invalid");
        phone.classList.remove("valid");

        return false;

    }

    phoneError.textContent = "";

    phone.classList.remove("invalid");
    phone.classList.add("valid");

    return true;

}


/* =====================================
   MESSAGE
===================================== */

message.addEventListener("input", function () {

    validateMessage();

});


function validateMessage() {

    const value = message.value.trim();

    if (value === "") {

        messageError.textContent =
            "Please enter your message";

        message.classList.add("invalid");
        message.classList.remove("valid");

        return false;

    }

    if (value.length < 10) {

        messageError.textContent =
            "Message must contain at least 10 characters";

        message.classList.add("invalid");
        message.classList.remove("valid");

        return false;

    }

    messageError.textContent = "";

    message.classList.remove("invalid");
    message.classList.add("valid");

    return true;

}


/* =====================================
   SUBMIT
===================================== */

form.addEventListener("submit", function (event) {

    event.preventDefault();


    const firstValid = validateName(
        firstName,
        firstNameError,
        "First Name"
    );

    const lastValid = validateName(
        lastName,
        lastNameError,
        "Last Name"
    );

    const emailValid = validateEmail();

    const phoneValid = validatePhone();

    const messageValid = validateMessage();


    /* Stop if invalid */

    if (
        !firstValid ||
        !lastValid ||
        !emailValid ||
        !phoneValid ||
        !messageValid
    ) {

        return;

    }


    /* =================================
       SUCCESS
    ================================= */

    successPopup.classList.add("show");


    /* Clear all input values */

    form.reset();


    /* Remove validation classes */

    document.querySelectorAll(
        ".valid, .invalid"
    ).forEach(function (element) {

        element.classList.remove(
            "valid",
            "invalid"
        );

    });


    /* Clear error messages */

    document.querySelectorAll(".error")
        .forEach(function (error) {

            error.textContent = "";

        });


    /* Hide popup */

    setTimeout(function () {

        successPopup.classList.remove("show");

    }, 3500);

});