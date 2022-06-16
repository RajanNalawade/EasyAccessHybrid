window.onload = function () {
    this.ready();
};

function ready() {
    setPoliciesArray();
}

// Set Policy Array from Session Storage
function setPoliciesArray() {
    let stringPolicyArray = sessionStorage.getItem('PolicyData');
    PolicyListElement = document.forms["revivalQuatationForm"]["policyNumber"];
    policyList = JSON.parse(stringPolicyArray).Table;
    PolicyListElement.add(new Option("Select Policy Number"));
    for (i = 0; i < policyList.length; i++) {
        PolicyListElement.add(new Option(policyList[i].POLICYNO));
    }
}

function validate() {
    if (getPolicyNumber() !== 'Select Policy Number') {
        getRevivalQuatation();
    }
}

function getPolicyNumber() {
    return document.forms['revivalQuatationForm']['policyNumber'].value;
}

function getRevivalQuatation() {

    let body = `<?xml version="1.0" encoding="utf-8"?>
                    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        <getRevival_Quotation xmlns="http://tempuri.org/">
                        <strPolicyNo>${getPolicyNumber()}</strPolicyNo>
                        </getRevival_Quotation>
                    </soap:Body>
                    </soap:Envelope>`;

    // 1B007715610
    showLoader();
    self.ApiCallService('/getRevival_Quotation', body, '<getRevival_QuotationResult>', '</getRevival_QuotationResult>').then((response) => {
        self.hideLoader();
        if (response !== undefined && response !== null && response.getRevival_QuotationResult !== "") {
            if (response.getRevival_QuotationResult.NewDataSet !== undefined) {
                response = response.getRevival_QuotationResult.NewDataSet;
                if (response !== "") {
                    if (response.ErrorCode !== undefined && response.ErrorCode !== null && response.ErrorDescription !== null) {
                        alert(response.ErrorDescription);
                    } else {
                        window.localStorage.setItem("revivalQuatationDetails", JSON.stringify(response));
                        window.location.href = "./RevivalQuatationDetails/RevivalQuatationDetails.html";
                    }
                } else {
                    alert("No Data found.");
                }

            } else {
                alert("No record found.");
            }
        } else {
            alert("No Data found");
        }
    }).catch((error) => {
        console.log("err ", error);

        alert("Service Error occurred");
        self.hideLoader();
    });
}