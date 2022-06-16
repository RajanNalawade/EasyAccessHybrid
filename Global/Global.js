//var Base_URL = "https://sbilposservices.sbilife.co.in/service.asmx?wsdl"; //production
var Base_URL = "https://sbiluatposservices.sbilife.co.in/Service.asmx?wsdl"; // Staging
let idleTime = 0;
var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var panCardRegex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
const strAuth = "QzhCNDc0OTU4NzZDQjI3RTQ4OEMyNEQ3MUZCQjE2QTY=";
const userAuth = strAuth;

var pathLevelOfHome = '../';
var lastFolder;
var postLoginSideBarMenus = [
    "Maturity.html",
    "SBDueList.html",
    "UploadDocuments.html",
    "claim.html",
    "estatement.html",
    "Forms.html",
    "MyInfo.html",
    "MyPolicyDetails.html",
    "Queries.html",
    "RenewalPremiumPostLogin.html",
    "FundSwitchDetails.html",
    "FundSwitch.html",
    "RevivalQuatationDetails.html",
    "RevivalQuatation.html",
    "Services.html",
    "ViewPolicy.html"
];

$(document).ready(function () {
    detectPathOfHomeFromCurrentPage();

    //Zero the idle timer on mouse movement.
    $(this).mousemove(function (e) {
        idleTime = 0;
    });

    //Zero the idle timer on keypress.
    $(this).keypress(function (e) {
        idleTime = 0;
    });

    intializeCommonData();
    initializeGenderClickEvents();
    applyKillSessionEventForPostLoginPages();
});

function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 20) { //20 minutes
        sessionStorage.setItem('sessionID', "");
        window.location = this.pathLevelOfHome + "Home/Home.html"; //Redirect to login page
    }
}


function IDGenerator() {
    this.length = 8;
    this.timestamp = +new Date;
    var _getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    this.generate = function () {
        var ts = this.timestamp.toString();
        var parts = ts.split("").reverse();
        var id = "";
        for (var i = 0; i < this.length; ++i) {
            var index = _getRandomInt(0, parts.length - 1);
            id += parts[index];
        }
        return id;
    }
}

// To clear session on logout
function killSession(dottedPathLevelOfHome) {
    console.log("sessionStorage.sessionID ", sessionStorage.sessionID);

    if (sessionStorage.sessionID == "" || sessionStorage.sessionID == undefined || sessionStorage.sessionID == null) {
        window.localStorage.removeItem("titlename")
        window.localStorage.removeItem("Fname")
        window.localStorage.removeItem("lname")
        window.localStorage.removeItem("status")
        window.localStorage.removeItem("email")
        window.localStorage.removeItem("mob")
        window.localStorage.removeItem("cd")
        window.localStorage.removeItem("fac_type");
        // window.history.back();        
        window.location = dottedPathLevelOfHome + 'Home/Home.html';
    }
}

/* **************** Validate Mobilw No. **************** */
function validateMobileNo(mobileNo) {
    if (mobileNo.length !== 10) {
        document.getElementById('mobileNoErrId').style.display = "block";
        document.getElementById('mobileNoErrId').innerHTML = "Mobile number should be 10 digits.";
        return false;
    } else {
        document.getElementById('mobileNoErrId').style.display = "none";
        return true;
    }
}


function intializeCommonData() {
    $('.show_datepicker').click(function () {
        $('#' + $(this).data('datepicker')).focus();
    });
    $(function () {
        $(".datepicker").datepicker({
            dateFormat: "dd-MM-yy",
            changeMonth: true,
            changeYear: true,
            //showOn: "button",
            buttonImage: "../../../Assets/images/calendar.png",
            buttonImageOnly: true,
            buttonText: "Select date",
            yearRange: "-100:+0"
        });
    });

    // For Need Analysis
    $(function () {
        $(".datepickerNA").datepicker({
            dateFormat: "dd/mm/yy",
            changeMonth: true,
            changeYear: true,
            //showOn: "button",
            buttonImage: "../Assets/images/calendar.png",
            buttonImageOnly: true,
            buttonText: "Select date",
            yearRange: "-100:+0"
        });
    });
}

function callServiceHits(MethodName, serviceInput, serviceType) {
    return new Promise((resolve, reject) => {
        var parser, data, xmlDoc, requestBody, serviceResp;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', Base_URL + '/saveEasyAccessServiceHits', true);
        // build SOAP request
        requestBody = '<?xml version="1.0" encoding="utf-8"?> ' +
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
            'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
            'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> ' +
            '<soap:Body> ' +
            '<saveEasyAccessServiceHits xmlns="http://tempuri.org/"> ' +
            '<serviceName>' + MethodName + '</serviceName> ' +
            '<services_type>' + serviceType + '</services_type> ' +
            '<serviceInput>' + serviceInput + '</serviceInput> ' +
            '<serviceReqUserId></serviceReqUserId> ' +
            '<imeiNo></imeiNo> ' +
            '<strModel></strModel> ' +
            '</saveEasyAccessServiceHits> ' +
            '</soap:Body> ' +
            '</soap:Envelope> ';
        console.log(requestBody);
        self.showLoader();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                self.hideLoader();
                if (xmlhttp.status == 200) {
                    data = unescapeHTML(xmlhttp.responseText);
                    console.log(data)
                    if (window.DOMParser) {
                        parser = new DOMParser();
                        xmlDoc = parser.parseFromString(data, 'text/xml')
                    } else {
                        xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
                        xmlDoc.async = false;
                        xmlDoc.loadXML(data);
                    }
                    serviceResp = xmlDoc.getElementsByTagName('ErrorMsg')[0].textContent;
                    console.log(serviceResp);
                    resolve(serviceResp);
                }
            }
        }
        //specify request headers
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        //send the SOAP request
        xmlhttp.send(requestBody);
    });
}

function ApiCallService(MethodName, body, startTag, endTag, isFromPremiumCalc) {
    console.log(body)
    return new Promise((resolve, reject) => {
        var parser, data, xmlDoc, requestBody, serviceResp;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', Base_URL + MethodName, true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                // self.hideLoader();
                if (xmlhttp.status == 200) {
                    // data = unescapeHTML(xmlhttp.responseText);
                    // console.log(data)
                    if (window.DOMParser) {
                        parser = new DOMParser();
                        xmlDoc = parser.parseFromString(data, 'text/xml')
                    } else {
                        xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
                        xmlDoc.async = false;
                        xmlDoc.loadXML(data);
                    }
                    var json = self.parseXMLToJsonGlobal(xmlhttp.responseText, startTag, endTag, isFromPremiumCalc);
                    resolve(json);
                    // resolve(serviceResp);
                }
            }
        }
        //specify request headers
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        //send the SOAP request
        xmlhttp.send(body);
    });
}

function ApiCallServiceToGetXML(servicePath, body, startTagToRead, endTagToRead) {
    return promise1 = new Promise((resolve, reject) => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', Base_URL + servicePath, true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.status == 200) {
                    console.log("response of API", xmlhttp.responseText);
                    escapeHTML = unescapeHTML(xmlhttp.responseText);
                    if (window.DOMParser) {
                        parser = new DOMParser();
                        xmlDoc = parser.parseFromString(escapeHTML, "text/xml");
                    } else {
                        xmlDoc = new ActiveXObject("MIcrosoft.XMLDOM");
                        xmlDoc.async = false;
                        xmlDoc.loadXML(text);
                    }
                    resolve(xmlDoc);
                }
            }
        }
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.send(body);
    });
};

function unescapeHTML(escapeHTML) {
    return escapeHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
};

function parseXMLToJsonGlobal(xml, startTagToRead, endTagToRead, isFromPremiumCalc) {
    escapeHTML = unescapeHTML(xml);
    responseXML = extractResponseTagGlobal(escapeHTML, startTagToRead, endTagToRead)
    if (isFromPremiumCalc) {
        sessionStorage.setItem("premiumCalcOutput", responseXML); // store output main tag to session storage if request is from premium calc 
    }
    dom = parseXml(responseXML);
    json = xml2json(dom);
    return json;
}

function extractResponseTagGlobal(escapeHTML, startTagToRead, endTagToRead) {
    return escapeHTML.substr(escapeHTML.indexOf(startTagToRead), escapeHTML.length - escapeHTML.indexOf(startTagToRead) - (escapeHTML.length - escapeHTML.indexOf(endTagToRead)) + endTagToRead.length);
    // return escapeHTML.substr(escapeHTML.indexOf(startTagToRead), escapeHTML.length - escapeHTML.indexOf(startTagToRead) - (escapeHTML.length - escapeHTML.indexOf(endTagToRead)) + endTagToRead.length);
}

function parseXml(xml) {
    var dom = null;
    if (window.DOMParser) {
        try {
            dom = (new DOMParser()).parseFromString(xml, "text/xml");
        } catch (e) {
            dom = null;
        }
    } else if (window.ActiveXObject) {
        try {
            dom = new ActiveXObject('Microsoft.XMLDOM');
            dom.async = false;
            if (!dom.loadXML(xml)) // parse error ..
                window.alert(dom.parseError.reason + dom.parseError.srcText);
        } catch (e) {
            dom = null;
        }
    } else
        alert("cannot parse xml string!");
    return dom;
}

function xml2json(xml) {
    try {
        var obj = {};
        if (xml.children.length > 0) {
            for (var i = 0; i < xml.children.length; i++) {
                var item = xml.children.item(i);
                var nodeName = item.nodeName;
                if (typeof (obj[nodeName]) == "undefined") {
                    obj[nodeName] = xml2json(item);
                } else {
                    if (typeof (obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xml2json(item));
                }
            }
        } else {
            obj = xml.textContent;
        }
        return obj;
    } catch (e) {
        console.log(e.message);
    }
};

//date To be Passed 2019-01-26
function dateDDFullMonthYYYY(date) {
    var arrDate = date.split("-");
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    if (arrDate != null) {
        var index;
        if (arrDate[1] != null) {
            index = Number(arrDate[1]) - 1;
            return arrDate[2] + "-" + monthNames[index] + "-" + arrDate[0];
        } else {
            return arrDate[0] + "-" + arrDate[1] + "-" + arrDate[2];
        }
    }
}

function initializeGenderClickEvents() {
    $("#male_label").click(function () {
        setMaleGenderActive();
    });
    $("#female_label").click(function () {
        setFemaleGenderActive();
    });

    $("#transgender_label").click(function () {
        $("#transgender_label").css({
            "background": "url('../../../Assets/images/transgender_active.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
        $("#male_label").css({
            "background": "url('../../../Assets/images/male.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
        $("#female_label").css({
            "background": "url('../../../Assets/images/female.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
    });

    // proposer Gender
    $("#male_prop_label").click(function () {
        $("#male_prop_label").css({
            "background": "url('../../../Assets/images/male_active.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
        $("#female_prop_label").css({
            "background": "url('../../../Assets/images/female.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
        $("#transgender_prop_label").css({
            "background": "url('../../../Assets/images/transgender.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
    });
    $("#female_prop_label").click(function () {
        $("#female_prop_label").css({
            "background": "url('../../../Assets/images/female_active.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
        $("#male_prop_label").css({
            "background": "url('../../../Assets/images/male.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
        $("#transgender_prop_label").css({
            "background": "url('../../../Assets/images/transgender.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
    });

    $("#transgender_prop_label").click(function () {
        $("#transgender_prop_label").css({
            "background": "url('../../../Assets/images/transgender_active.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
        $("#male_prop_label").css({
            "background": "url('../../../Assets/images/male.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
        $("#female_prop_label").css({
            "background": "url('../../../Assets/images/female.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
    });
    // end proposer Gender

    $("#spouse_male_label").click(function () {
        setSpouseMaleGenderActiveInHumsafar();
    });

    $("#spouse_female_label").click(function () {
        setSpouseFemaleGenderActiveInHumsafar();
    });
    $("#spouse_transgender_label").click(function () {	
        setSpouseTransgenderActiveInHumsafar();	
    });
}

function setMaleGenderActive() {
    $("#male_label").css({
        "background": "url('../../../Assets/images/male_active.png')",
        "width": "100px",
        "height": "100px",
        "background-size": "cover"
    });
    $("#female_label").css({
        "background": "url('../../../Assets/images/female.png')",
        "width": "100px",
        "height": "100px",
        "background-size": "cover"
    });
    $("#transgender_label").css({
        "background": "url('../../../Assets/images/transgender.png')",
        "width": "100px",
        "height": "100px",
        "background-size": "cover"
    });
}

function setFemaleGenderActive() {
    $("#female_label").css({
        "background": "url('../../../Assets/images/female_active.png')",
        "width": "100px",
        "height": "100px",
        "background-size": "cover"
    });
    $("#male_label").css({
        "background": "url('../../../Assets/images/male.png')",
        "width": "100px",
        "height": "100px",
        "background-size": "cover"
    });
    $("#transgender_label").css({
        "background": "url('../../../Assets/images/transgender.png')",
        "width": "100px",
        "height": "100px",
        "background-size": "cover"
    });
}

function setSpouseMaleGenderActiveInHumsafar() {
    $("#spouse_male_label").css({
        "background": "url('../../../Assets/images/male_active.png')",
        "width": "100px",
        "height": "100px",
        "background-size": "cover"
    });
    $("#spouse_female_label").css({
        "background": "url('../../../Assets/images/female.png')",
        "width": "100px",
        "height": "100px",
        "background-size": "cover"
    });
    $("#spouse_transgender_label").css({	
        "background": "url('../../../Assets/images/transgender.png')",	
        "width": "100px",	
        "height": "100px",	
        "background-size": "cover"	
    });
}

function setSpouseFemaleGenderActiveInHumsafar() {
    $("#spouse_female_label").css({
        "background": "url('../../../Assets/images/female_active.png')",
        "width": "100px",
        "height": "100px",
        "background-size": "cover"
    });
    $("#spouse_male_label").css({
        "background": "url('../../../Assets/images/male.png')",
        "width": "100px",
        "height": "100px",
        "background-size": "cover"
    });
    $("#spouse_transgender_label").css({	
        "background": "url('../../../Assets/images/transgender.png')",	
        "width": "100px",	
        "height": "100px",	
        "background-size": "cover"	
    });
}

function setSpouseTransgenderActiveInHumsafar() {	
    $("#spouse_male_label").css({	
        "background": "url('../../../Assets/images/male.png')",	
        "width": "100px",	
        "height": "100px",	
        "background-size": "cover"	
    });	
    $("#spouse_female_label").css({	
        "background": "url('../../../Assets/images/female.png')",	
        "width": "100px",	
        "height": "100px",	
        "background-size": "cover"	
    });	
    $("#spouse_transgender_label").css({	
        "background": "url('../../../Assets/images/transgender_active.png')",	
        "width": "100px",	
        "height": "100px",	
        "background-size": "cover"	
    });	
}

function getQueryStringDesializedData(key) {
    return JSON.parse(localStorage.getItem(key));
}

function getAgeFromBirthdate(dateString) {
    var date1 = new Date();
    var date2 = new Date(dateString.replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
    var pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/; //Regex to validate date format.
    if (pattern.test(dateString)) {
        var currentYear = date1.getFullYear();
        var dobYear = date2.getFullYear();
        var age = currentYear - dobYear;
        return age;
    } else {
        return '0';
    }
}

//To get age in year [Used for Rinn Raksha product Only]
function getAgeRinnRaksha(DOB_Borrower, membershipDate){

}

/* **************** Validate Mobilw No. **************** */
function validateMobileNo(mobileNo) {
    if (mobileNo.length !== 10) {
        document.getElementById('mobileNoErrId').style.display = "block";
        document.getElementById('mobileNoErrId').innerHTML = "Mobile number should be 10 digits.";
        return false;
    } else {
        document.getElementById('mobileNoErrId').style.display = "none";
        return true;
    }
}

/* **************** Validate Email Id **************** */
function validateConfirmEmail(confirmEmail) {
    if (self.getEmail() !== self.getConfirmEmail()) {
        document.getElementById('confirmEmailErrId').style.display = "block";
        document.getElementById('confirmEmailErrId').innerHTML = "Email Id and confirm Email Id do not match.";
        return false;
    } else {
        document.getElementById('confirmEmailErrId').style.display = "none";
        return true;
    }
}

//Function used to generate quotation number.
function generateQuotationNumber(productCode) {
    console.log("inside generateQuotationNumber" + productCode)
    return new Promise((resolve, reject) => {
        quotationNumber = '';
        //     let SR_CODE = window.localStorage.getItem("cd");
        //     let k = 12 - parseInt(SR_CODE.length);
        //     let zero = "";
        //     for (let i = 0; i < k; i++) {
        //         zero = zero + "0";
        //     }
        //     let today = new Date();

        //     let month = "";
        //     if (today.getMonth() + 1 < 10) {
        //         month = "0" + (today.getMonth() + 1);
        //     } else {
        //         month = (today.getMonth() + 1);
        //     }

        //     let day = "";
        //     if (today.getDate() < 10) {
        //         day = "0" + today.getDate();
        //     } else {
        //         day = today.getDate();
        //     }

        //     let milliSeconds = today.getMilliseconds().toString();
        //     milliSeconds = milliSeconds.slice(0, 2);

        //     let date = day + month + today.getFullYear().toString() + today.getHours().toString() + today.getMinutes().toString() + milliSeconds.toString();
        //     let quotationNumber = "SA" + productCode + zero + SR_CODE + date;
        //     sessionStorage.setItem("QutNo", quotationNumber);
        //     console.log("QutNo", quotationNumber);
        resolve(quotationNumber);
    }).catch((error) => {
        console.log("QutNo 1 ", error)
        reject("Please try again");
    });
}

function convertDate(date) {
    //var formatedDate;
    var split = date.split('/');
    return split[0] + "-" + split[1] + "-" + split[2];
}

function escapeInputHTML(unEscapeHTML) {
    return unEscapeHTML.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
};

function serializeObject(objectToSerialize) {
    return JSON.stringify(objectToSerialize);
}

function encryptData(data, key) {

    return CryptoJS.AES.encrypt(data, key);

};

function decryptData(data, key) {

    return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8)

};

function getCustomerId() {
    return decryptData(sessionStorage.getItem('custId'), getSessionID());
}

function getSessionID() {

    return sessionStorage.getItem("sessionID");

}

//Added by Manish Singh DD/MM/YYYY
function getDDMMYYYY(date) {
    console.log("date service:" + date)

    var arrDate = date.split("-");
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    if (arrDate != null) {
        var index;
        if (arrDate[1] != null) {
            index = monthNames.indexOf(arrDate[1]) + 1;
            //console.log("index:"+index)

            var month = "";
            if (index < 10) {
                month = "0" + index;
            } else {
                month = index;
            }

            return arrDate[0] + "/" + month + "/" + arrDate[2];
        } else {
            return arrDate[0] + "/" + arrDate[1] + "/" + arrDate[2];
        }
    }
}

//function convert 23/04/2000 to 04/23/2000
function getDDMMFromMMDDFormat(birthday) {
    var datesArr = birthday.split('/');
    return datesArr[1] + "/" + datesArr[0] + "/" + datesArr[2];
}

//date To be Passed 26/January/2019 Service Format
function dateMMDDYYYYFormat(date) {
    // console.log("date passed:" + date)
    var arrDate = date.split("-");
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    if (arrDate != null) {
        var index;
        if (arrDate[1] != null) {
            index = monthNames.indexOf(arrDate[1]) + 1;
            // console.log("index:"+index)
            var month = "";
            if (index < 10) {
                month = "0" + index;
            } else {
                month = index;
            }
            return month + "-" + arrDate[0] + "-" + arrDate[2];
        } else {
            return arrDate[1] + "-" + arrDate[0] + "-" + arrDate[2];
        }
    }
}

// Description - to get extension of the file provided
// Author - Vaishali
function getFileExtension(filePath) {
    return new Promise((resolve, reject) => {
        var exten = filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[1];
        if (exten == "exe" || exten == "apk") {
            reject("This file Format cannot be uploaded");
        } else {
            resolve(exten);
        }
    });
}

// Description - to compress & return base 64 format of the provided image
// Author - Vaishali
function compressionEvent(filee) {
    return new Promise((resolv, reject) => {
        var imageCompressed = new ImageCompressor();
        var compressionOption = {
            quality: .4,
            checkOrientation: true
        };
        imageCompressed.compress(filee, compressionOption).then(resolved => {
            getBase64(resolved).then(resolve => {
                resolv(resolve);
            }, (rejected) => {}).catch(err => console.log(err));
        }, (rejected) => {
            console.log({
                rejected
            });
        }).catch(err => {
            console.log(err)
        });
    })
}

// Description - to get base64 format of the files provided other than image files
// Author - Vaishali
function getBase64(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
            if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
            }
            resolve(encoded);
            //resolve(reader.result);
        };
        reader.onerror = function (error) {
            reject(error);
        };
    });
}

// Description - to create file name to upload on the server using proposal no & extension
// Author - Vaishali
function createFileName(reqUploadProposalNumber, incr, exten) {
    return new Promise((resolve, reject) => {

        if (exten == "exe" || exten == "apk") {
            reject("This file Format cannot be uploaded");
        } else {
            resolve(reqUploadProposalNumber + "_R0" + incr + "." + exten);
        }
    });
}

// Description - to get only required date & eliminate timestamp from date string
// Author - Vaishali
function getFormatedDate(TimeStampDate) {
    dateArr = TimeStampDate.split('T');
    //console.log("date - " + dateArr);
    return dateArr[0];
}

// Description - to get only required date & eliminate timestamp from date string when date & timestamp
//               are separated by space
// Author - Vaishali
function getFormatedDateFromResponse(TimeStampDate) {
    dateArr = TimeStampDate.split(' ');
    //console.log("date - " + dateArr);
    return dateArr[0];
}

// Description - to Show & hide loader while http requests
// Author - Vaishali
function showLoader() {
    wait.style.display = "block";
}

function hideLoader() {
    wait.style.display = "none";
}
// End

// Description - to clear storage & redirect to home page on logout
// Author - Vaishali
function onLogOut(dottedPathLevelOfHome) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = dottedPathLevelOfHome + "Home/Home.html";
}

// Description - to clear session & navigate to Home page when user has logged in but still tries
//                to load pages which are meant for logged in users
// Author - Vaishali
function applyKillSessionEventForPostLoginPages() {
    if (postLoginSideBarMenus.includes(this.lastFolder)) {
        //Increment the idle time counter every minute.
        var idleInterval = setInterval(timerIncrement, 60000); //1 minute
        killSession(this.pathLevelOfHome);
    }
}

// Description - to find the current page loaded and dotted folder level for Home page from it.
// Author - Vaishali
function detectPathOfHomeFromCurrentPage() {
    var lastFolderName = location.href.split('/').filter(function (el) {
        return el.trim().length > 0;
    }).pop();

    this.lastFolder = lastFolderName;
    this.pathLevelOfHome;
    switch (lastFolder) {
        case 'Maturity.html':
        case 'SBDueList.html':
        case 'UploadDocuments.html':
        case 'FundSwitch.html':
        case 'RevivalQuatation.html':
            pathLevelOfHome = "../../";
            break;

        case 'FundSwitchDetails.html':
        case 'RevivalQuatationDetails.html':
            pathLevelOfHome = "../../../";
            break;
        case 'success.html':
            pathLevelOfHome = "../";
            break;
        default:
            pathLevelOfHome = "../";
    }
}

// Description - get Pre Login Sidebar 
// Author - Vaishali
function getPreLoginSideBar(folderLevelPath) {
    return `<section class="sidebar">
    <ul class="sidebar-menu" data-widget="tree">
        <li>
            <a href="${folderLevelPath}Home/Home.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/home.png">
                <span>Home</span>
            </a>
        </li>
        <li>
            <a href="${folderLevelPath}MyPolicyLogin/MyPolicyLogin.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/policy.png">
                <span>Policy Login</span>
            </a>
        </li>
        <li>
            <a href="${folderLevelPath}InsurancePlan/InsurancePlan.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/layers.png">
                <span>Insurance Plans</span>
            </a>
        </li>
        <li>
            <a href="${folderLevelPath}PremiumCalculator/PremiumCalculator.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/paper-pencil-and-calculator.png">
                <span>Premium Calculator</span>
            </a>
        </li>
        <li>
            <a href="${folderLevelPath}NeedAnalysis/NeedAnalysis.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/analysis.png">
                <span>Need Analysis</span>
            </a>
        </li>
        <li>
            <a href="${folderLevelPath}BuyOnlineProducts/BuyOnlineProducts.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/shopping-cart.png">
                <span>Buy Online Products</span>
            </a>
        </li>
        <li>
            <a href="${folderLevelPath}UsefulLinks/UsefulLinks.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/link.png">
                <span>Useful Links</span>
            </a>
        </li>
        <li>
            <a href="${folderLevelPath}QueriesAndComplaints/QueriesAndComplaints.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/customer-service.png">
                <span>Query/Complaints</span>
            </a>
        </li>
        <li>
            <a href="${folderLevelPath}RenewalPremium-PreLogin/RenewalPremium-PreLogin.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/recycle-sign.png">
                <span>Pay Renewal Premium</span>
            </a>
        </li>
        <li>
            <a href="${folderLevelPath}News/News.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/newspaper.png">
                <span>News</span>
            </a>
        </li>
        <!-- <li>
            <a href="${folderLevelPath}Let'sChat-RIA/Let'sChat-RIA.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/user-1.png">
                <span>Let's Chat - RIA</span>
            </a>
        </li> -->
        <li>
            <a href="${folderLevelPath}ProductExplainerVideos/ProductExplainerVideos.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/pre-sales_viedo.png">
                <span>Product Explainer Videos</span>
            </a>
        </li>
        <li>
            <a href="${folderLevelPath}ContactUs/ContactUs.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/contact.png">
                <span>Contact Us</span>
            </a>
        </li>
        <li>
            <a href="${folderLevelPath}Settings/Settings.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/settings.png">
                <span>Settings</span>
            </a>
        </li>
    </ul>
</section>`;
}

// Description - get post login sidebar
// Author - Vaishali
function getPostLoginSideBar(folderLevelPath) {
    return `<section class="sidebar">
    <ul class="sidebar-menu" data-widget="tree">
        <li>
            <a href="${folderLevelPath}ViewPolicy/ViewPolicy.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/view-policy.png">
                <span>View Policy</span>
            </a>
        </li>
        <li>
            <a href="${folderLevelPath}Queries/Queries.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/speech-bubble.png">
                <span>Queries</span>
            </a>
        </li>
        <li>
            <a href="${folderLevelPath}MyInfo/MyInfo.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/layers.png">
                <span>My Info</span>
            </a>
        </li>
        <li>
            <a href="${folderLevelPath}Forms/Forms.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/paper-pencil-and-calculator.png">
                <span>Forms</span>
            </a>
        </li>
        <li>
            <a href="${folderLevelPath}Claim/Claim.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/business-deal.png">
                <span>Claim</span>
            </a>
        </li>
        <li>
            <a href="${folderLevelPath}RenewalPremium-Login/RenewalPremiumPostLogin.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/shopping-cart.png">
                <span>Pay Renewal Premium</span>
            </a>
        </li>
        <li>
            <a href="${folderLevelPath}E-Statement/eStatement.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/link.png">
                <span>E-Statement / PPC</span>
            </a>
        </li>
        <li>
            <a href="${folderLevelPath}Services/Services.html">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/customer-service.png">
                <span>Services</span>
            </a>
        </li>
        <li>
            <a onclick="onLogOut('${folderLevelPath}')">
                <img class="nav-icon" src="${folderLevelPath}Assets/images/logout.png">
                <span>Logout</span>
            </a>
        </li>
    </ul>
</section>`;
}

function setKerlaDiscount(tablerowKerlaDiscount) {
    //Commented by Vaishali as not required in Easy Access
    // var tablerowKerlaDiscount = document.getElementById("tablerowKerlaDiscount");
    // var stateIdSessionValue = sessionStorage.getItem("stateId");
    // stateIdSessionValue = stateIdSessionValue == undefined ? "0,0" : stateIdSessionValue;
    // var stateidArray = stateIdSessionValue.split(",");

    // var stateid = stateidArray[0];
    // stateid = stateid == undefined ? "0" : stateid;
    // if (stateid === "15") {
    //     tablerowKerlaDiscount.style.display = "block"
    // } else {
    //     tablerowKerlaDiscount.style.display = "none"
    // }


    //HIde/Show Staff Discount Based on USertype

    try {
        var divStaffDiscount = document.getElementById("divStaffDiscount");
        var userType = getUserType();

        if (divStaffDiscount != undefined) {
            if (userType === "BAP" || userType === "CAG" || userType === "IMF") {
                divStaffDiscount.style.display = "none"
            } else {
                divStaffDiscount.style.display = "block"
            }
        }

    } catch (error) {}
}

// Author : Vaishali
// Description : Converts pdf to base64 data
function saveBase64PDF(pdfDocument) {
    return new Promise((resolve, reject) => {
        try {
            pdfMake.createPdf(pdfDocument).getBase64(base64PDF => {
                localStorage.setItem('pdfData', base64PDF);
                resolve(base64PDF);
            });
        } catch (error) {
            console.log(error);
        }
    });
}

function getKerlaDiscount() {
    return false;
}

function parseXmlTag(ParentNode, tag) {


    var start_indx = ParentNode.indexOf("<" + tag + ">");
    var end_indx = ParentNode.indexOf("</" + tag + ">");
    var content = "";

    if (start_indx >= 0 & end_indx > 0) {

        var index = start_indx + tag.length + 2;
        content = ParentNode.substr(index, end_indx - index);

    }

    return content;

}

function getUserType() {
    return '';
}

function appendXMLTagAtStart(outputBody) {
    return `<?xml version='1.0' encoding='utf-8' ?>` + outputBody;
}

function getUserFname() {
    return "";
}

function getUserLName() {
    return "";
}