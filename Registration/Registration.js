window.onload = function () {
    this.ready();
};

function ready() {

}

function onDOBUpdate() {
    dobPlaceholderId.innerHTML = "";
}

function validate() {
    if (registrationForm.checkValidity()) {
        getCustomerDetails();
    }
}

function getPolicyNumber() {
    return document.forms["registrationForm"]["policyNumber"].value;
}

function getDOB() {
    return document.forms["registrationForm"]["dob"].value;
}

function getCustomerDetails() {
    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <getCustomerID xmlns="http://tempuri.org/">
                    <strPolicyNo>${getPolicyNumber()}</strPolicyNo>
                    <strDOB>${getDOB()}</strDOB>
                    <strValue></strValue>
                    </getCustomerID>
                </soap:Body>
                </soap:Envelope>`;

    showLoader();
    self.ApiCallService('/getCustomerID', body, '<getCustomerIDResult>', '</getCustomerIDResult>').then((response) => {
        self.hideLoader();
        if (response !== undefined || response !== null) {
            if (response.getCustomerIDResult.PolicyDetails !== undefined) {
                response = response.getCustomerIDResult.PolicyDetails;
                if (response.ScreenData !== undefined && response.ScreenData !== null) {
                    alert(response.ScreenData.ErrDesc);
                } else if (response.ErrCode == 1) {
                    alert(response.ScreenData.ErrDesc);
                } else {
                    response = response.Table;
                    if (Array.isArray(response)) {
                        response = response[0];
                        response.policyNumber = getPolicyNumber();
                        response.dob = getDOB();
                    }
                    sessionStorage.setItem('userType', "newUser");
                    sessionStorage.setItem("newUserDetails", JSON.stringify(response));
                    window.location.href = "../OTPReader/OTPReader.html";
                }
            } else {
                alert("No record found.");
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