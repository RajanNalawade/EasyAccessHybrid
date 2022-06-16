window.onload = function () {
    this.ready();
};

/* *************  VARIABLE DECLARATION ************** */
var fromTimeList = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM"];
var toTimeList = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM"]
var mailTo = 'info@sbilife.co.in';
var emailSubject = 'Meet Our Advisor - Sbilife Android Application';

/* *************  OnLoad Function ************** */
function ready() {
    // set From time list
    fromTimeListElement = document.forms["meetOurAdvisorForm"]["fromTime"];
    for (i = 0; i < fromTimeList.length; i++) {
        fromTimeListElement.add(new Option(fromTimeList[i]));
    }

    // set To time list
    toTimeListElement = document.forms["meetOurAdvisorForm"]["toTime"];
    for (i = 0; i < toTimeList.length; i++) {
        toTimeListElement.add(new Option(toTimeList[i]));
    }
    sideNavBar.innerHTML = getPreLoginSideBar('../');
}


function expandCollapseNewsDetails(newsSubCardId) {
    var cardDisplayStyle = document.getElementById(newsSubCardId).style.display;
    if (cardDisplayStyle == "block") {
        expandCollapseCardDetails('none');
        document.getElementById(newsSubCardId).style.display = "none";
    } else {
        expandCollapseCardDetails('none');
        document.getElementById(newsSubCardId).style.display = "block";
    }
}

function expandCollapseCardDetails(displayStyle) {
    document.getElementById('subCard1').style.display = displayStyle;
    document.getElementById('subCard2').style.display = displayStyle;
    document.getElementById('subCard3').style.display = displayStyle;
    document.getElementById('meetOurAdvisorSelected').style.display = displayStyle;
}

/* ***********************   GETTERS ************************* */
function getName() {
    return document.forms["meetOurAdvisorForm"]["name"].value;
}

function getEmail() {
    return document.forms["meetOurAdvisorForm"]["email"].value;
}

function getAddress() {
    return document.forms["meetOurAdvisorForm"]["address"].value;
}

function getPinCode() {
    return document.forms["meetOurAdvisorForm"]["pinCode"].value;
}

function getCity() {
    return document.forms["meetOurAdvisorForm"]["city"].value;
}

function getState() {
    return document.forms["meetOurAdvisorForm"]["state"].value;
}

function getMobile() {
    return document.forms["meetOurAdvisorForm"]["mobile"].value;
}

function getOfficePhone() {
    return document.forms["meetOurAdvisorForm"]["officePhone"].value;
}

function getResidencePhone() {
    return document.forms["meetOurAdvisorForm"]["residencePhone"].value;
}

function getIsExistingRelationship() {
    return document.forms["meetOurAdvisorForm"]["isExistingRelationshipWithSBI"].value;
}

function getFromTime() {
    return document.forms["meetOurAdvisorForm"]["fromTime"].value;
}

function getToTime() {
    return document.forms["meetOurAdvisorForm"]["toTime"].value;
}

function getContactedAt() {
    return document.forms["meetOurAdvisorForm"]["contactedAt"].value;
}

function getInterestedProducts() {
    return document.forms["meetOurAdvisorForm"]["interestedProducts"].value;
}

/* ******************************  FORM VALIDATION & SUBMIT **************************** */
function validatForm() {
    if (meetOurAdvisorForm.checkValidity() && validateMobileNo(getMobile())) {
        console.log("name ", getName(), " email ", getEmail(), " address ", getAddress(), " pincode ", getPinCode(), " city ", getCity(), " state ", getState(), " mobile ", getMobile(), " office ", getOfficePhone(), " residence ", getResidencePhone(), " isExist ", getIsExistingRelationship(), " from ", getFromTime(), " to ", getToTime(), " contatedat ", getContactedAt(), " interests ", getInterestedProducts());

        var emailBody = `Name: ${getName()}
                        Email Address : ${getEmail()}
                        Address : ${getAddress()}
                        Pincode : ${getPinCode()}
                        City : ${getCity()}
                        State : ${getState()}
                        Mobile : ${getMobile()}
                        Phone (Office) : ${getOfficePhone()}
                        Phone (Residence) : ${getResidencePhone()}
                        Existing Relationship with SBI/Associate Bank : ${getIsExistingRelationship()}
                        Convenient Time to Contact : ${getFromTime()} to ${getToTime()}
                        Convenient place of contact : ${getContactedAt()}
                        Convenient Product Interest : ${getInterestedProducts()} \n`;
        window.location.href = `mailto:${mailTo}?subject=${emailSubject}&body=${encodeURIComponent(emailBody)}`;
    }
}
