window.onload = function () {
    addDocInputChangeListener();
    // $(document).ajaxStart(function(){
    //     console.log("ajax started");        
    //     $("#wait").css("display", "block");
    //   });
    //   $(document).ajaxComplete(function(){
    //     console.log("ajax started");
    //     $("#wait").css("display", "none");
    //   });
};

var listPolicyDispatch = new Array();
var authKey = "SBIL";
var source = "EASYACCESS";
/* ************ Pre-Login functionality Code ************ */

function validatePreLoginForm() {
    if (preLoginForm.checkValidity()) {
        getCashieredStatus();
    }
}

function getCashieredStatus() {
    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <checkCashieredProposal xmlns="http://tempuri.org/">
                    <strProposalNo>${getPreLoginProposalNo()}</strProposalNo>
                    <authkey>${authKey}</authkey>
                    <source>${source}</source>
                    </checkCashieredProposal>
                </soap:Body>
                </soap:Envelope>`;
    showLoader()
    self.ApiCallService('/checkCashieredProposal', body, '<NewDataSet>', '</NewDataSet>').then((response) => {
        self.hideLoader();
        console.log("getProposalStatus_CAGResult ", response);

        if (response !== undefined || response !== null) {
            if (response.NewDataSet !== undefined) {
                response = response.NewDataSet;
                if (response.ScreenData !== undefined && response.ScreenData !== null) {
                    alert(response.ScreenData.ErrDesc);
                } else {
                    console.log("data ", response);

                    response = response.Table;
                    if (!Array.isArray(response)) {
                        var temp = response;
                        response = new Array();
                        response.push(temp);
                    }
                    console.log("data ", response);
                    var output = "";
                    for (var j = 0; j < response.length; j++) {
                        output += "<table class='table table-striped borderless one'> <tbody>";

                        output += "<tr> <th class='tableHeader' style='background-color: lightgray;'>Proposal Number : </th> <td>" + response[j].PL_PROP_NUM + "</td></tr>";
                        output += "<tr> <th class='tableHeader' style='background-color: lightgray;'>Pay Mode : </th> <td> " + response[j].PA_PAYMODE + "</td></tr>";
                        output += "<tr> <th class='tableHeader' style='background-color: lightgray;'>Cheque Number : </th> <td> " + response[j].PA_CHEQUE_NUM + "</td></tr>";
                        output += "<tr> <th class='tableHeader' style='background-color: lightgray;'>Cheque Date :  </th> <td> " + response[j].PA_CHEQUE_DT + "</td></tr>";
                        output += "<tr> <th class='tableHeader' style='background-color: lightgray;'>Amount:  </th> <td> " + response[j].PA_CHEQUE_AMT + "</td></tr>";
                        output += "</tbody> </table>";

                        output += "<hr/>"
                    }
                    document.getElementById("pre-Login-display-resources").innerHTML = output;

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

function getPreLoginProposalNo() {
    return document.forms['preLoginForm']['preLoginProposalNo'].value;
}
/* ************ End of Pre-Login functionality Code ************ */

/* ************ Login functionality Code ************ */
var db;

function validateMyProfileLoginForm() {
    if (myProfileLoginForm.checkValidity()) {
        checkIsUserExists();
    }
}

function checkIsUserExists() {
    var dbPromise = indexedDB.open('PreLoginProfileDB', 1)
    dbPromise.onupgradeneeded = function (e) {
        var db = e.target.result;

    };
    dbPromise.onsuccess = function (e) {
        db = e.target.result;
        var transaction = db.transaction(["PreLoginUsers"]);
        var objectStore = transaction.objectStore("PreLoginUsers");
        var request = objectStore.get(getUserName());
        request.onerror = function (event) {
            alert("Error occured while Login.")
        };
        request.onsuccess = function (event) {
            if (request.result !== undefined) {
                if (request.result.password == getPassword()) {
                    alert("user exists");
                    navigateToProposalTracker();
                } else {
                    alert("Please check your User Name & Password");
                }
            } else {
                alert("No user exists by this User Name. Please check your User Name & try again later.");
            }

        };
    };
    dbPromise.onerror = function (e) {
        alert("Service error occured");
    };

}

function showCreateProfileForm() {
    document.getElementById("createProfileFormId").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
}

function getUserName() {
    return document.forms['myProfileLoginForm']['userName'].value;
}

function getPassword() {
    return document.forms['myProfileLoginForm']['password'].value;
}

/* ************ End of Login functionality Code ************ */

/* ************ Create Profile functionality Code ************ */
function showLoginForm() {
    document.getElementById("createProfileFormId").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

function calculateAge(birthday) {

    var age = getAgeFromBirthdate(getDDMMFromMMDDFormat(birthday));
    document.forms["createProfileForm"]["age"].value = age;
}

function saveUser() {
    if (createProfileForm.checkValidity()) {
        createDBAndAddUser();
    }
}

function createDBAndAddUser() {
    //check for support
    if (!('indexedDB' in window)) {
        alert('This browser doesn\'t support IndexedDB');
        return;
    }

    var dbPromise = indexedDB.open('PreLoginProfileDB', 1)
    dbPromise.onupgradeneeded = function (e) {
        var db = e.target.result;
        if (!db.objectStoreNames.contains('PreLoginUsers')) {
            var storeOS = db.createObjectStore('PreLoginUsers', {
                keyPath: 'userName'
            });
        }
    };

    dbPromise.onsuccess = function (e) {
        db = e.target.result;
        savePreLoginUser();
    };
    dbPromise.onerror = function (e) {
        alert(e);
    };
}

function savePreLoginUser() {

    var dbPromise = indexedDB.open('PreLoginProfileDB', 1)
    dbPromise.onupgradeneeded = function (e) {
        var db = e.target.result;

    };
    dbPromise.onsuccess = function (e) {
        db = e.target.result;
        var transaction = db.transaction(["PreLoginUsers"]);
        var objectStore = transaction.objectStore("PreLoginUsers");
        var request = objectStore.get(getNewUserName());
        request.onerror = function (event) {
            alert("Error occured while Login.")
        };
        request.onsuccess = function (event) {
            if (request.result !== undefined) {
                alert("User already exists by this User Name.");
            } else {
                var tx = db.transaction(['PreLoginUsers'], 'readwrite');
                var preLoginUsersObjStore = tx.objectStore('PreLoginUsers');

                var item = {
                    firstName: getFirstName(),
                    MiddleName: getMiddleName(),
                    LastName: getLastName(),
                    maritalStatus: getMaritalStatus(),
                    dob: getDOB(),
                    age: getAge(),
                    mobile: getMobile(),
                    email: getEmail(),
                    address: getAddress(),
                    city: getCity(),
                    state: getState(),
                    pincode: getPincode(),
                    education: getEducation(),
                    occupation: getOccupation(),
                    companyName: getCompanyName(),
                    oprganizationType: getOrganizationType(),
                    industryType: getIndustryType(),
                    annualIncome: getAnnualIncome(),
                    jobResponsibility: getJobResponsibility(),
                    userName: getNewUserName(),
                    password: getNewPassword()
                };

                var addUserRequest = preLoginUsersObjStore.add(item);
                addUserRequest.onerror = function (e) {
                    console.log("error ", e.target.error);

                    alert('Error ' + e.target.error.name);
                };
                addUserRequest.onsuccess = function (e) {
                    navigateToProposalTracker();
                };
            }

        };
    };
    dbPromise.onerror = function (e) {
        alert("Service error occured");
    };


}

function navigateToProposalTracker() {
    $("#icon-block-3").css({
        "-moz-box-shadow": "inset 0 0 10px #000000",
        "-webkit-box-shadow": "inset 0 0 10px #000000",
        "box-shadow": "inset 0 0 29px #2a0433"
    })
    $("#icon-block-2").css({
        "-moz-box-shadow": "",
        "-webkit-box-shadow": "",
        "box-shadow": ""
    })
    $("#icon-block-1").css({
        "-moz-box-shadow": "",
        "-webkit-box-shadow": "",
        "box-shadow": ""
    })
    $("#icon-block-4").css({
        "-moz-box-shadow": "",
        "-webkit-box-shadow": "",
        "box-shadow": ""
    })
    $("#icon-block-5").css({
        "-moz-box-shadow": "",
        "-webkit-box-shadow": "",
        "box-shadow": ""
    })
    $("#icon-block-6").css({
        "-moz-box-shadow": "",
        "-webkit-box-shadow": "",
        "box-shadow": ""
    })

    /*end inner shadow */
    $('#icon-block-3-bottom').show();
    $('#icon-block-1-bottom').hide();
    $('#icon-block-2-bottom').hide();
    $('#icon-block-4-bottom').hide();
    $('#icon-block-5-bottom').hide();
    $('#icon-block-6-bottom').hide();
}

function getFirstName() {
    return document.forms['createProfileForm']['firstName'].value;
}

function getMiddleName() {
    return document.forms['createProfileForm']['middleName'].value;
}

function getLastName() {
    return document.forms['createProfileForm']['lastName'].value;
}

function getMaritalStatus() {
    return document.forms['createProfileForm']['maritalStatus'].value;
}

function getDOB() {
    return document.forms['createProfileForm']['dob'].value;
}

function getAge() {
    return document.forms['createProfileForm']['age'].value;
}

function getMobile() {
    return document.forms['createProfileForm']['mobile'].value;
}

function getEmail() {
    return document.forms['createProfileForm']['email'].value;
}

function getAddress() {
    return document.forms['createProfileForm']['address'].value;
}

function getCity() {
    return document.forms['createProfileForm']['city'].value;
}

function getState() {
    return document.forms['createProfileForm']['state'].value;
}

function getPincode() {
    return document.forms['createProfileForm']['pincode'].value;
}

function getEducation() {
    return document.forms['createProfileForm']['education'].value;
}

function getOccupation() {
    return document.forms['createProfileForm']['occupation'].value;
}

function getCompanyName() {
    return document.forms['createProfileForm']['companyName'].value;
}

function getOrganizationType() {
    return document.forms['createProfileForm']['organizationType'].value;
}

function getIndustryType() {
    return document.forms['createProfileForm']['industryType'].value;
}

function getAnnualIncome() {
    return document.forms['createProfileForm']['annualIncome'].value;
}

function getJobResponsibility() {
    return document.forms['createProfileForm']['jobResponsibility'].value;
}

function getNewUserName() {
    return document.forms['createProfileForm']['newUserName'].value;
}

function getNewPassword() {
    return document.forms['createProfileForm']['newPassword'].value;
}

/* ************ ENd of Create Profile functionality Code ************ */


/* ************ Proposal Tracker functionality Code ************ */

function getProposalNumber() {
    return document.forms["proposalTrackerForm"]["proposalNumber"].value
}

function getProposalStatus_CAG() {
    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <getProposalStatus_CAG xmlns="http://tempuri.org/">
                    <strProposalNo>${getProposalNumber()}</strProposalNo>
                    <authkey>${authKey}</authkey>
                    <source>${source}</source>
                    </getProposalStatus_CAG>
                </soap:Body>
                </soap:Envelope>`;
    showLoader();
    self.ApiCallService('/getProposalStatus_CAG', body, '<ReqDtls>', '</ReqDtls>').then((response) => {
        self.hideLoader();
        if (response !== undefined || response !== null) {
            if (response.ReqDtls !== undefined) {
                response = response.ReqDtls;
                if (response.ScreenData !== undefined && response.ScreenData !== null) {
                    alert(response.ScreenData.ErrDesc);
                } else {
                    response = response.Table;
                    if (checkWhatStatusContains(response.PROPSTATUS, ["Inforce", "Transferred to Ingenium"])) {
                        var policyNo = response.POLICYNUMBER;
                        if (response.POLICYNUMBER !== undefined && response.POLICYNUMBER !== null) {
                            thirdStepStatus.innerHTML = `Inforce<br><span style="font-size:15px">Policy No: ${response.POLICYNUMBER}</span>`;
                        } else {
                            thirdStepStatus.innerHTML = `Inforce`;
                        }
                        secondStepStatus.innerHTML = "";
                        firstStepStatus.innerHTML = "";
                        thirdStatusDiv.className = "orderstatus done";
                        secondStatusDiv.className = "orderstatus done";
                        firstStatusDiv.className = "orderstatus done";
                        if (response.PROPSTATUS.includes("Inforce")) {
                            registerDiv.style.display = "block";
                        }
                    } else if (checkWhatStatusContains(response.PROPSTATUS, ["Rejection", "Cancellation", "Suspended"])) {
                        thirdStepStatus.innerHTML = response.PROPSTATUS;
                        secondStepStatus.innerHTML = "";
                        firstStepStatus.innerHTML = "";
                        thirdStatusDiv.className = "orderstatus done";
                        secondStatusDiv.className = "orderstatus done";
                        firstStatusDiv.className = "orderstatus done";
                        registerDiv.style.display = "none";
                    } else if (checkWhatStatusContains(response.PROPSTATUS, ["Underwriting", "Underwritten", "Pending Requirements"])) {
                        thirdStepStatus.innerHTML = "";
                        secondStepStatus.innerHTML = response.PROPSTATUS;
                        firstStepStatus.innerHTML = "";
                        secondStatusDiv.className = "orderstatus done";
                        thirdStatusDiv.className = "orderstatus";
                        firstStatusDiv.className = "orderstatus done";
                        registerDiv.style.display = "none";
                    } else {
                        firstStepStatus.innerHTML = response.PROPSTATUS;
                        secondStepStatus.innerHTML = "";
                        thirdStepStatus.innerHTML = "";
                        firstStatusDiv.className = "orderstatus done";
                        secondStatusDiv.className = "orderstatus";
                        thirdStatusDiv.className = "orderstatus";
                        registerDiv.style.display = "none";
                    }
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

function checkWhatStatusContains(status, statusList) {
    var value = 0;
    statusList.forEach(function (word) {
        value = value + status.includes(word);
    });
    return (value === 1)
}

function navigateToRegisterPage() {
    window.location.href = "../Registration/registration.html";;
}
/* ************ ENd of Proposal Tracker functionality Code ************ */


/* ************ Policy Dispatched Status functionality Code ************ */
function validate() {

    if (this.getPolicyNumber() == "" || this.getPolicyNumber() == undefined || this.getPolicyNumber() == null) {
        alert("Please Enter Policy Number");
    } else {
        serviceCall();
    }
    return true;
};

function serviceCall() {
    var output = "";
    var policyNo, holderName, premiumAmount, cashierDate, latestCallStatus, latestCallSubStatus, latestCallDate;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Base_URL + '?op=getPolicyDispatchStatus', true);
    // build SOAP request
    var sr =
        `<?xml version="1.0" encoding="utf-8"?>
        <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
        <soap12:Body>
        <getPolicyDispatchStatus xmlns="http://tempuri.org/">
        <strPolicy>1C562758806</strPolicy>
        <strEmailId>a@g.com</strEmailId>
        <strMobileNo>0000000000</strMobileNo>
        <strAuthKey>${strAuth}</strAuthKey>
        </getPolicyDispatchStatus>
        </soap12:Body>
        </soap12:Envelope>`;
    /* <strPolicy>${this.getPolicyNumber()}</strPolicy> */
    // 1c562758806 use for UAT
    self.showLoader();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            self.hideLoader();
            if (xmlhttp.status == 200) {
                data = unescapeHTML(xmlhttp.responseText);
                if (window.DOMParser) {
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(data, "text/xml");
                } else {
                    xmlDoc = new ActiveXObject("MIcrosoft.XMLDOM");
                    xmlDoc.async = false;
                    xmlDoc.loadXML(text);
                }

                var response = xmlDoc.getElementsByTagName("getPolicyDispatchStatusResult")[0].textContent;
                if (!(response == "") && response !== "0") {

                    var saNodes = xmlDoc.getElementsByTagName("AllDispatchdetails")[0].childNodes[1].nodeName;
                    var errCode = xmlDoc.getElementsByTagName("ErrorCode")[0].childNodes[0].textContent;

                    listPolicyDispatch = [];
                    if (errCode == 0) {
                        if (saNodes != "") {

                            var count = xmlDoc.getElementsByTagName("AllDispatchValues");

                            var output = "";
                            for (var i = 0; i < count.length; i++) {
                                var reportType = count[i].getElementsByTagName("REPORT_TYPE")[0].textContent;
                                var docType = count[i].getElementsByTagName("DOC_TYPE")[0].textContent;
                                var proposalNumber = count[i].getElementsByTagName("PROPOSALNO")[0].textContent;
                                var policyNumber = count[i].getElementsByTagName("POLICYNO")[0].textContent;
                                var dispatchTo = count[i].getElementsByTagName("DISPATCH_TO")[0];
                                dispatchTo = dispatchTo == undefined ? "" : count[i].getElementsByTagName("DISPATCH_TO")[0].textContent;
                                var dispatchThrough = count[i].getElementsByTagName("DISPATCH_THROUGH")[0].textContent;
                                var awbno = count[i].getElementsByTagName("AWBNO")[0].textContent;

                                var despDate = count[i].getElementsByTagName("DESP_DATE")[0].textContent;

                                listPolicyDispatch.push(new getDispatchList(reportType, docType, proposalNumber, policyNumber, dispatchTo,
                                    dispatchThrough, awbno, despDate));

                            }

                            listPolicyDispatch.sort(function (a, b) {

                                var parts = a.despDate.split('/');
                                var key1 = new Date(parts[2], parts[1] - 1, parts[0]);

                                var partsB = b.despDate.split('/');
                                var key2 = new Date(partsB[2], partsB[1] - 1, partsB[0]);
                                //  console.log("key1: "+key1);
                                // console.log("key2: "+key2);
                                if (key1 > key2) {
                                    return -1;
                                } else if (key1 == key2) {
                                    return 0;
                                } else {
                                    return 1;
                                }
                            });

                            for (var j = 0; j < listPolicyDispatch.length; j++) {
                                output += "<table class='table table-striped borderless one' style='border:1px solid #f2f2f2;    border: 1px solid #e8e8e8;'> <tbody>";

                                output += `<tr> <th class='tableHeader' style="background-color: lightgray;">Policy Number : </th> <td >` + listPolicyDispatch[j].policyNumber + "</td></tr>";
                                output += `<tr> <th class='tableHeader' style="background-color: lightgray;">Report Type : </th> <td > ` + listPolicyDispatch[j].reportType + "</td></tr>";
                                output += `<tr> <th class='tableHeader' style="background-color: lightgray;">Doc Type : </th> <td > ` + listPolicyDispatch[j].docType + "</td></tr>";
                                output += `<tr> <th class='tableHeader' style="background-color:lightgray;">Proposal Number :  </th > <td > ` + listPolicyDispatch[j].proposalNumber + "</td></tr>";
                                output += `<tr> <th class='tableHeader' style="background-color:lightgray;">Dispatch To :  </th> <td > ` + listPolicyDispatch[j].dispatchTo + "</td></tr>";
                                output += `<tr> <th class='tableHeader' style="background-color:lightgray;">Dispatch Through :  </th> <td > ` + listPolicyDispatch[j].dispatchThrough + "</td></tr>";
                                output += `<tr> <th class='tableHeader' style="background-color:lightgray;">AWB Number :  </th> <td > ` + listPolicyDispatch[j].awbno + "</td></tr>";
                                output += `<tr> <th class='tableHeader' style="background-color:lightgray;">Dispatch Date : </th> <td > ` + listPolicyDispatch[j].despDate + "</td></tr>";

                                output += "</tbody> </table>";

                                output += "<hr/>"
                            }


                            document.getElementById("display-resources").innerHTML = output;
                        } else if (errCode == -1) {
                            alert("Unable to process the request");
                        }
                    } else {
                        alert("Server not responding,try again..")
                    }
                } else if (response == 1) {
                    alert("You are not authorised user")
                } else {
                    alert("Proposal Number is not valid")
                }
            }
        }
    }
    //specify request headers
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    //send the SOAP request
    xmlhttp.send(sr);

}

function unescapeHTML(escapeHTML) {
    return escapeHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
};

function getDispatchList(reportType, docType, proposalNumber, policyNumber, dispatchTo,
    dispatchThrough, awbno, despDate) {
    return {
        "reportType": reportType,
        "docType": docType,
        "proposalNumber": proposalNumber,
        "policyNumber": policyNumber,
        "dispatchTo": dispatchTo,
        "dispatchThrough": dispatchThrough,
        "awbno": awbno,
        "despDate": despDate
    }
}

function getPolicyNumber() {
    return document.forms["policyDispatchStatusForm"]["txt_policyNo"].value;
}

/* *** ENd of Policy Dispatched Status functionality Code  ***** */


/* ********* Post Insurance functionality Code  ********** */
let METHOD_NAME_UPLOAD_FILE = "UploadFile_SMRT";
var docExtension;
var doc_base64;

function addDocInputChangeListener() {
    document.getElementById('browseFile').addEventListener('change', (e) => {
        age_file = e.target.files[0];
        getFileExtension(e.target.files[0].name).then(function (fileExtension) {
                docExtension = fileExtension;
                if (fileExtension == 'jpeg' || fileExtension == 'png' || fileExtension == 'jpg') {
                    compressionEvent(e.target.files[0]).then(data => {
                        doc_base64 = data;
                    });
                } else {
                    getBase64(e.target.files[0]).then(data => {
                        doc_base64 = data;
                    });
                }
            })
            .catch(function (error) {
                alert(error);
            });
    });
}

function validatePostInsuranceForm() {
    if (postInsuranceForm.checkValidity()) {
        uploadDoc(doc_base64, docExtension);
    }
}

async function uploadDoc(byteArray, fileExtension) {
    createFileName(getPostInsuranceProposalNo(), 0, fileExtension).then(function (fileName) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', Base_URL + '?op=' + METHOD_NAME_UPLOAD_FILE, true);

        var sr =
            `<?xml version="1.0" encoding="utf-8"?>
            <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
            <soap12:Body>
            <UploadFile_SMRT xmlns="http://tempuri.org/">
            <f>${byteArray}</f>
            <fileName>${fileName}</fileName>
            <qNo></qNo>
            <agentCode>990134795</agentCode>
            <strEmailId>a@g.com</strEmailId>
            <strMobileNo>0000000000</strMobileNo>
            <strAuthKey>${userAuth}</strAuthKey>
            </UploadFile_SMRT>
            </soap12:Body>
            </soap12:Envelope>`;
        self.showLoader();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                self.hideLoader();
                if (xmlhttp.status == 200) {

                    data = unescapeHTML(xmlhttp.responseText);
                    if (window.DOMParser) {
                        parser = new DOMParser();
                        xmlDoc = parser.parseFromString(data, "text/xml");
                    } else {
                        xmlDoc = new ActiveXObject("MIcrosoft.XMLDOM");
                        xmlDoc.async = false;
                        xmlDoc.loadXML(text);
                    }

                    var response = xmlDoc.getElementsByTagName("UploadFile_SMRTResult")[0].textContent;
                    if (response == "1") {

                        alert("Upload Successful")
                    } else {
                        alert("Please try again later");
                    }

                }
            }
        }
        //specify request headers
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        //send the SOAP request
        xmlhttp.send(sr);

    }).catch(function (err) {
        hideLoader();
        alert(err);
    });
}

function getPostInsuranceProposalNo() {
    return document.forms["postInsuranceForm"]["postInsuranceProposalNo"].value;
}