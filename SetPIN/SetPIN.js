window.onload = function () {
    this.ready();
};

var userType, newUserDetails;

function ready() {
    userType = sessionStorage.getItem("userType");
    newUserDetails = JSON.parse(sessionStorage.getItem("newUserDetails"));
}

function validateSamePIN() {
    if (getPINNumber() !== getConfirmPIN()) {
        alert("PIN doesn't match");
        return false;
    }
    return true;
}

function validate() {
    if (setPINForm.checkValidity() && validateSamePIN()) {
        if (userType == "newUser") {
            setNewPINNumber();
        } else if (sessionStorage.getItem("flag") == "forgetPass") {
            setForgotPasswordPin()
        }
    }
}

function getPINNumber() {
    return document.forms["setPINForm"]["pin"].value;
}

function getConfirmPIN() {
    return document.forms["setPINForm"]["confirmPin"].value;
}

function setNewPINNumber() {
    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <savePINdetail_new xmlns="http://tempuri.org/">
                    <POLICY_NO>${newUserDetails.policyNumber}</POLICY_NO>
                    <DOB>${newUserDetails.dob}</DOB>
                    <CUSTOMER_ID>${newUserDetails.PL_PERSON_ID}</CUSTOMER_ID>
                    <MOBILE_NO>${newUserDetails.PR_MOBILE}</MOBILE_NO>
                    <PIN_NO>${getPINNumber()}</PIN_NO>
                    <Token>${''}</Token>
                    </savePINdetail_new>
                </soap:Body>
                </soap:Envelope>`;
    showLoader();
    self.ApiCallServiceToGetXML('/savePINdetail_new', body, '<savePINdetail_newResult>', '</savePINdetail_newResult>').then((response) => {
        self.hideLoader();
        response = response.getElementsByTagName("savePINdetail_newResult")[0].childNodes[0].nodeValue;
        if (response !== undefined || response !== null) {
            if (response == "1") {
                alert("You have set your PIN succesfully.");
                window.location.href = "../ViewPolicy/ViewPolicy.html";
            } else {
                alert("Please check your Policy Number OR DOB.");
            }
        } else {
            alert("Service Error occurred");
        }
    }).catch((error) => {
        console.log("err ", error);
        alert("Service Error occurred");
        self.hideLoader();
    });
}

function setForgotPasswordPin() {
    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <forgetOTP_easyacess xmlns="http://tempuri.org/">
                    <strOTP>${"0"}</strOTP>
                    <MOBILE_NO>${sessionStorage.getItem("mobileNo")}</MOBILE_NO>
                    <PIN>${getPINNumber()}</PIN>
                    <strPolicyNo>${sessionStorage.getItem("policyNo")}</strPolicyNo>
                    </forgetOTP_easyacess>
                </soap:Body>
                </soap:Envelope>`;
    showLoader();
    self.ApiCallService('/forgetOTP_easyacess', body, '<forgetOTP_easyacessResult>', '</forgetOTP_easyacessResult>').then((response) => {
        self.hideLoader();
        response = response.getElementsByTagName("forgetOTP_easyacessResult")[0].childNodes[0].nodeValue;
        if (response !== undefined || response !== null) {
            if (response == "1") {
                alert("Your have set your PIN succesfully.");
                sessionStorage.setItem("flag", "");
                sessionStorage.setItem("mobileNo", "");
                sessionStorage.setItem("policyNo", "");
                window.location.href = "../ViewPolicy/ViewPolicy.html";
            } else {
                alert("Please check your Policy Number OR DOB.");
            }
        } else if (response.includes("<ErrCode>1</ErrCode>") && response.includes("Please check your Policy Number OR DOB.")) {
            alert("Please check your Policy Number OR DOB.");
        } else {
            alert("Service Error occurred");
        }
    }).catch((error) => {
        console.log("err ", error);
        alert("Service Error occurred");
        self.hideLoader();
    });
}