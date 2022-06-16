function getPolicyNo() {
    return document.forms["forgotpasswordForm"]["forgotpasswordPolicyNo"].value;
}

function getMobileNo() {
    return document.forms["forgotpasswordForm"]["forgotpasswordMobileNo"].value;
}

function validate() {
    if (getPolicyNo() == null || getPolicyNo() == "" || getPolicyNo() == undefined) {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerHTML = "Please enter policy no";
    } else if (getMobileNo() == null || getMobileNo() == "" || getMobileNo() == undefined) {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerHTML = "Please enter mobile no";
    } else {
        document.getElementById("error").style.display = "none"
        getOtpForForgetPassword();

    }
}

function getOtpForForgetPassword() {
    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <forgetOTP_easyacess xmlns="http://tempuri.org/">
                    <strOTP>${""}</strOTP>
                    <MOBILE_NO>${this.getMobileNo()}</MOBILE_NO>
                    <PIN>${""}</PIN>
                    <strPolicyNo>${this.getPolicyNo()}</strPolicyNo>
                    </forgetOTP_easyacess>
                </soap:Body>
                </soap:Envelope>`;
    showLoader();
    self.ApiCallService('/forgetOTP_easyacess', body, '<forgetOTP_easyacessResult>', '</forgetOTP_easyacessResult>').then((response) => {
        self.hideLoader();
        response = data.forgetOTP_easyacessResult;
        if (response !== undefined || response !== null) {
            if (response == "1") {
                alert("OTP is sent to your registered mobile number");
                sessionStorage.setItem("flag", "forgetPass");
                sessionStorage.setItem("mobileNo", this.getMobileNo());
                sessionStorage.setItem("policyNo", this.getPolicyNo());
                window.location.href = "../OTPReader/OTPReader.html";
            } else if (response == "0") {
                alert("Invalid Mobile no and Policy No.");
            } else if (response == "2") {
                alert("You have not yet registered. Register Yourself")
            }
        } else {
            alert("Service Error occurred");
        }
    }).catch((error) => {
        console.log("err ", error);
        alert("Service Error occurred");
        // self.hideLoader();
    });
}