window.onload = function () {
    // self.hideLoader();

}
var custId;

function validation() {
    if (self.validateMobile()) {
        this.policyLogin(); // form valid
    }
}

function validateMobile() {
    var mob = this.getMobile();

    if (mob == "" || mob.length !== 10) {
        document.getElementById('errMobileNumber').style.display = "block";
        document.getElementById('errMobileNumber').innerHTML = "Please Enter Valid Mobile Number.";
        return false;
    } else {
        document.getElementById('errMobileNumber').style.display = "none";
        return true
    }
}

function validatePin() {
    var pass = this.getPassword();

    if (pass == "" || pass.length !== 4) {
        document.getElementById('errPin').style.display = "block";
        document.getElementById('errPin').innerHTML = "Please Enter valid 4 digit PIN.";
        return false;
    } else {
        document.getElementById('errPin').style.display = "none";
        return true
    }
}

function policyLogin() {
    callServiceHits("validatePIN_New", "", "MyPolicy").then(function (resolved) {
        // if (resolved == 'Success') {
        AsyncLogin();
        // }
    });
}

function getMobile() {
    return document.forms["policyLoginForm"]["mobNumber"].value;
}

function getPassword() {
    return document.forms["policyLoginForm"]["password"].value;
}

function AsyncLogin() {

    /*  var polNumber = document.forms['renewalPremiumForm']['policynumber'].value;
     console.log
     var dob = getDDMMYYYY(document.forms['renewalPremiumForm']['dob'].value); */

    var requestBody =
        `<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
    <validatePIN_New xmlns="http://tempuri.org/">
    <strPIN>${this.getPassword()}</strPIN>
    <MOBILE_NO>${this.getMobile()}</MOBILE_NO>
    </validatePIN_New>
    </soap12:Body>
    </soap12:Envelope>`;
    showLoader();
    ApiCallService('/validatePIN_New', requestBody, '<ScreenData>', '</ScreenData>').then((data) => {
        hideLoader();
        data = data.ScreenData;
        var stringifyJson = JSON.stringify(data);
        console.log(stringifyJson);

        if (data.ErrCode == "0") {

            custId = data.ErrorMsg;

            var generateId = new IDGenerator();
            var sessionId = generateId.generate();
            console.log(sessionId)
            sessionStorage.setItem("sessionID", sessionId);

            // sessionStorage.setItem("SessionID", "1234");
            console.log("sessionid ", getSessionID());

            var encryptedCustId = encryptData(custId, getSessionID());
            console.log("encryptedCustId ", encryptedCustId);

            sessionStorage.setItem("custId", encryptedCustId);
            window.location.href = "../ViewPolicy/ViewPolicy.html"
        } else {
            if (data.ErrorMsg == 0) {
                alert("Not Authorised User!");
            } else if (data.ErrorMsg == 1) {
                alert("Invalid credentials. 2 Attempt left!");
            } else if (data.ErrorMsg == 1) {
                alert("Invalid credentials. 1 Attempt left!");
            } else if (parseInt(data.ErrorMsg) >= 3) {
                alert("Oops..Invalid credentials! Go to forget PIN");
            } else {
                alert("Server not Found. Please try after some time.")
            }

        }
    });
};