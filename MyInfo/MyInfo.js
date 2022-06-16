window.onload = function () {
    this.ready();
};

/* *************  VARIABLE DECLARATION ************** */
var documentTypeList = ["Pan No", "Email ID", "Mobile No", "Residence Phone No", "Office Phone No"];
var policyDetails = {
    PH_EMAIL: '',
    PH_MOB_PHN: '',
    PH_OFF_PHN: '',
    PH_RES_PHN: '',
    PAN_NUMBER: ''
};
var isForConfirmation;

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    intializeData();
}

function intializeData() {
    // set Document type list to update
    documentListElement = document.forms["myInfoForm"]["documentList"];
    for (i = 0; i < documentTypeList.length; i++) {
        documentListElement.add(new Option(documentTypeList[i]));
    }
}

/* **********   ON CLICK FUNCTIONS & OTHERS *********** */
function onUpdateDocType() {
    var docTpe = getDocType();
    document.getElementById('docValueLblId').innerHTML = docTpe;
    document.getElementById('mobileNoErrId').style.display = "none";
    document.getElementById('emailErrId').style.display = "none";
    setDocTypeNValue();
}

function resetAll() {
    document.forms["myInfoForm"]["policyNo"].value = '';
    document.forms["myInfoForm"]["info_dob"].value = '';
    document.forms["myInfoForm"]["docValue"].value = '';
    document.forms["myInfoForm"]["docValue"].disabled = true;
    document.forms['myInfoForm']['policyNo'].disabled = false;
    document.forms['myInfoForm']['info_dob'].disabled = false;
    document.getElementById('getDetailsNSubmitDetailsBtnId').innerHTML = 'GET DETAILS';
    policyDetails = {
        PH_EMAIL: '',
        PH_MOB_PHN: '',
        PH_OFF_PHN: '',
        PH_RES_PHN: '',
        PAN_NUMBER: ''
    };
}

function showPopUP(message) {
    document.getElementById('wishToUpdateConfirmationTextId').innerHTML = message;
    $("#myModal1").modal("show");
}

function setDocTypeNValue() {
    switch (getDocType()) {
        case 'Pan No':
            strPrType = 'Pan';
            PR_VALUE = policyDetails.PAN_NUMBER;
            document.forms['myInfoForm']['docValue'].value = policyDetails.PAN_NUMBER;
            break;

        case 'Email ID':
            strPrType = 'Email';
            PR_VALUE = policyDetails.PH_EMAIL;
            document.forms['myInfoForm']['docValue'].value = policyDetails.PH_EMAIL;
            break;

        case 'Mobile No':
            strPrType = 'Mobile';
            PR_VALUE = policyDetails.PH_MOB_PHN;
            document.forms['myInfoForm']['docValue'].value = policyDetails.PH_MOB_PHN;
            break;

        case 'Residence Phone No':
            strPrType = 'Home';
            PR_VALUE = policyDetails.PH_RES_PHN;
            document.forms['myInfoForm']['docValue'].value = policyDetails.PH_RES_PHN;
            break;

        case 'Office Phone No':
            strPrType = 'Office';
            PR_VALUE = policyDetails.PH_OFF_PHN;
            document.forms['myInfoForm']['docValue'].value = policyDetails.PH_OFF_PHN;
            break;

        default:
            break;
    }
}

/* ********************   GETTERS *********************** */
function getDocType() {
    return document.forms["myInfoForm"]["documentList"].value;
}

function getPolicyNo() {
    return document.forms["myInfoForm"]["policyNo"].value;
}

function getInfoDOB() {
    return document.forms["myInfoForm"]["info_dob"].value;
}

function getDocvalue() {
    return document.forms["myInfoForm"]["docValue"].value;
}

/* **************  FORM VALIDATION & SUBMIT **************** */

function validateToSubmit() {
    if (isForConfirmation && myInfoForm.checkValidity()) {
        document.forms["myInfoForm"]["docValue"].required = true;
        switch (getDocType()) {
            case 'Pan No':
                if (!panCardRegex.test(getDocvalue())) {
                    panCardErrId.innerHTML = "Please enter a valid Pan Card Number";
                    panCardErrId.style.display = "block";
                    return;
                }
                panCardErrId.style.display = "none";
                break;

            case 'Email ID':
                if (!emailRegex.test(getDocvalue())) {
                    emailErrId.innerHTML = "Please enter a valid Email ID";
                    emailErrId.style.display = "block";
                    return;
                }
                emailErrId.style.display = "none";
                break;

            case 'Mobile No':
                if (!validateMobileNo(getDocvalue())) {
                    return;
                }
                break;

            case 'Residence Phone No':
            case 'Office Phone No':
                if (!validateOtherPhoneNos(getDocvalue())) {
                    return;
                }
                break;

            default:
                break;
        }
        saveEasyAccessServiceHits();
    } else {
        $("#myModal1").modal("show");
    }
}

function validateOtherPhoneNos(mobileNo) {
    if (mobileNo.length > 30 || mobileNo.length == 0) {
        document.getElementById('mobileNoErrId').style.display = "block";
        document.getElementById('mobileNoErrId').innerHTML = `Please enter a ${getDocType()}`;
        return false;
    } else {
        document.getElementById('mobileNoErrId').style.display = "none";
        return true;
    }
}

function validateToGetDetails() {
    if (document.getElementById('getDetailsNSubmitDetailsBtnId').innerHTML == 'GET DETAILS') {
        document.forms["myInfoForm"]["docValue"].required = false;
        if (myInfoForm.checkValidity()) {
            getCustContactEmail();
        }
    } else {
        isForConfirmation = true;
        showPopUP(`Do you wish to update ${getDocType()}?`);
    }
}

/* ******************************  SERVICE CALLS **************************** */
function getCustContactEmail() {
    console.log("getDDMMYYYY(getInfoDOB()) ", dateMMDDYYYYFormat(getInfoDOB()).replace(/-/g, "/"));

    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        <getCustContactEmailPhoneNums xmlns="http://tempuri.org/">
                        <strPolicyNo>${getPolicyNo()}</strPolicyNo>
                        <strDob>${dateMMDDYYYYFormat(getInfoDOB()).replace(/-/g,"/")}</strDob>
                        <checkFlag>1</checkFlag>
                        </getCustContactEmailPhoneNums>
                    </soap:Body>
                </soap:Envelope>`;
    showLoader();
    self.ApiCallService('/getCustContactEmailPhoneNums', body, '<getCustContactEmailPhoneNumsResult>', '</getCustContactEmailPhoneNumsResult>').then((response) => {
        self.hideLoader();
        if (response !== undefined || response !== null) {
            if (response.getCustContactEmailPhoneNumsResult.PolicyDetails !== undefined) {
                response = response.getCustContactEmailPhoneNumsResult.PolicyDetails;
                if (response.ScreenData !== undefined && response.ScreenData !== null) {
                    alert(response.ScreenData.ErrDesc);
                } else {
                    data = response.Table;
                    if (Array.isArray(data)) {
                        data = data[0];
                    }
                    policyDetails.PH_EMAIL = data.PH_EMAIL;
                    setDocTypeNValue();
                    getCustContactPhone();
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

function getCustContactPhone() {
    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        <getCustContactEmailPhoneNums xmlns="http://tempuri.org/">
                        <strPolicyNo>${getPolicyNo()}</strPolicyNo>
                        <strDob>${dateMMDDYYYYFormat(getInfoDOB()).replace(/-/g,"/")}</strDob>
                        <checkFlag>2</checkFlag>
                        </getCustContactEmailPhoneNums>
                    </soap:Body>
                </soap:Envelope>`;
    showLoader();
    self.ApiCallService('/getCustContactEmailPhoneNums', body, '<getCustContactEmailPhoneNumsResult>', '</getCustContactEmailPhoneNumsResult>').then((response) => {
        self.hideLoader();
        if (response !== undefined || response !== null) {
            if (response.getCustContactEmailPhoneNumsResult.PolicyDetails !== undefined) {
                response = response.getCustContactEmailPhoneNumsResult.PolicyDetails;
                if (response.ScreenData !== undefined && response.ScreenData !== null) {
                    alert(response.ScreenData.ErrDesc);
                } else {
                    data = response.Table;
                    if (Array.isArray(data)) {
                        data = data[0];
                    }
                    policyDetails.PH_MOB_PHN = data.PH_MOB_PHN;
                    policyDetails.PH_OFF_PHN = data.PH_OFF_PHN;
                    policyDetails.PH_RES_PHN = data.PH_RES_PHN;
                    setDocTypeNValue();
                    getCustContactPAN();
                }
            } else {
                alert("No record found.");
            }
        } else {
            alert("Service Error occurred");
        }
    }).catch((error) => {
        alert("Service Error occurred");
        self.hideLoader();
    });
}

function getCustContactPAN() {
    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        <getCustContactEmailPhoneNums xmlns="http://tempuri.org/">
                        <strPolicyNo>${getPolicyNo()}</strPolicyNo>
                        <strDob>${dateMMDDYYYYFormat(getInfoDOB()).replace(/-/g,"/")}</strDob>
                        <checkFlag>3</checkFlag>
                        </getCustContactEmailPhoneNums>
                    </soap:Body>
                </soap:Envelope>`;

    showLoader();
    self.ApiCallService('/getCustContactEmailPhoneNums', body, '<getCustContactEmailPhoneNumsResult>', '</getCustContactEmailPhoneNumsResult>').then((response) => {
        self.hideLoader();
        if (response !== undefined || response !== null) {
            if (response.getCustContactEmailPhoneNumsResult.PolicyDetails !== undefined) {
                response = response.getCustContactEmailPhoneNumsResult.PolicyDetails;
                if (response.ScreenData !== undefined && response.ScreenData !== null) {
                    alert(response.ScreenData.ErrDesc);
                } else {
                    data = response.Table;
                    if (Array.isArray(data)) {
                        data = data[0];
                    }
                    document.forms['myInfoForm']['docValue'].disabled = false;
                    document.forms['myInfoForm']['policyNo'].disabled = true;
                    document.forms['myInfoForm']['info_dob'].disabled = true;
                    policyDetails.PAN_NUMBER = data.PAN_NUMBER;
                    setDocTypeNValue();
                    getDetailsNSubmitDetailsBtnId.innerHTML = "SUBMIT";
                }
            } else {
                alert("No record found.");
            }
        } else {
            alert("Service Error occurred");
        }
    }).catch((error) => {
        alert("Service Error occurred");
        self.hideLoader();
    });
}

function saveEasyAccessServiceHits() {
    PR_VALUE = getDocvalue();
    let body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <saveCustProfileChreq xmlns="http://tempuri.org/">
        <strPrType>${strPrType}</strPrType>
        <PR_VALUE>${PR_VALUE}</PR_VALUE>
        <strPolicynum>${getPolicyNo()}</strPolicynum>
        </saveCustProfileChreq>
    </soap:Body>
    </soap:Envelope>`;
    callServiceHits('saveCustProfileChreq', '', 'PremiumCalculator')
        .then((resolve) => {
            SaveCustInfo(body);
        }).catch((reject) => {
            console.log(reject);
        });
}

function SaveCustInfo(body) {
    showLoader();
    self.ApiCallServiceToGetXML('/saveCustProfileChreq', body, '<saveCustProfileChreqResult>', '</saveCustProfileChreqResult>').then((response) => {
        self.hideLoader();
        response = response.getElementsByTagName("saveCustProfileChreqResult")[0].childNodes[0].nodeValue;
        if (response !== undefined || response !== null) {
            if (response == "1") {
                isForConfirmation = false;
                showPopUP(`Your requst for ${getDocType()} change has been accepted,the updation will reflect after 2 hours `);
            } else {
                showPopUP(`Failed to save your changes`);
            }
        } else {
            alert("Service Error occurred");
        }
    }).catch((error) => {
        console.log("err ", error);
        alert("Service Error occurred ", error);
        self.hideLoader();
    });
}
