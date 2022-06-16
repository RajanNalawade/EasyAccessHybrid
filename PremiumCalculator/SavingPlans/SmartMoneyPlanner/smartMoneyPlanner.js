window.onload = function () {
    this.ready();
    // hideLoader();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails, policyTermElement, premiumPayingTermElement;
var maxAgeLimit = 60;
var planType;

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    setKerlaDiscount();
    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    this.initializeData()
    this.initArrayList();
};

function initializeData() {
    // document.forms["smartMoneyPlannerForm"]["dob"].value = new Date().toISOString().substr(0, 10);
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
    this.document.getElementById('sumAssuredTitleId').innerHTML = `Sum Assured* (Min. ${minSumAssured})`;
    var laGender = document.forms["smartMoneyPlannerForm"]["gender"].value;
    if (laGender === "Male") {
        $("#male_label").css({
            "background": "url('../../../../images/male_active.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
        $("#female_label").css({
            "background": "url('../../../../images/female.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
        $("#transgender_label").css({
            "background": "url('../../../../images/transgender.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
    } else if (laGender === "Female") {
        $("#female_label").css({
            "background": "url('../../../../images/female_active.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover",
            "margin-right": "20px"
        });
        $("#male_label").css({
            "background": "url('../../../../images/male.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
        $("#transgender_label").css({
            "background": "url('../../../../images/transgender.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
    } else if (laGender === "Third Gender") {
        $("#transgender_label").css({
            "background": "url('../../../../images/transgender_active.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
        $("#male_label").css({
            "background": "url('../../../../images/male.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
        $("#female_label").css({
            "background": "url('../../../../images/female.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
    }
    onWishToBackdateUpdate((this.getWishToBackdate() ? 'yes' : "no"));
}

function initArrayList() {

    planElement = document.forms["smartMoneyPlannerForm"]["plan"];
    for (i = 0; i < planList.length; i++) {
        planElement.add(new Option(planList[i].title, planList[i].value));
    }

    policyTermElement = document.forms["smartMoneyPlannerForm"]["policyTerm"];

    policyTermElement.value = 15
    policyTermElement.disabled = true;

    premiumPayingTermElement = document.forms["smartMoneyPlannerForm"]["premiumPayingTerm"];

    premiumPayingTermElement.value = 6
    premiumPayingTermElement.disabled = true;

    premiumFrequencyElement = document.forms["smartMoneyPlannerForm"]["premiumFrequency"];
    for (i = 0; i < premiumFrequencyList.length; i++) {
        premiumFrequencyElement.add(new Option(premiumFrequencyList[i].title, premiumFrequencyList[i].value));
    }
}

/* ***************** DOM EVENTS **************** */
// function validateGender() {
//     var gender = document.forms["smartMoneyPlannerForm"]["gender"].value;
//     if (gender !== "Female" && gender !== "Male") {
//         document.getElementById('genderErrId').style.display = "block";
//         document.getElementById('genderErrId').innerHTML = "Please select your gender.";
//         return false;
//     } else {
//         document.getElementById('genderErrId').style.display = "none";
//         return true
//     }
// }

function setAge(birthday) {
    // var age = getAgeFromBirthdate(getDDMMYYYY(birthday));
    var age = getAgeFromBirthdate(getDDMMYYYY(birthday));
    document.forms["smartMoneyPlannerForm"]["age"].innerHTML = age;
    document.forms["smartMoneyPlannerForm"]["age"].value = age;
}

function calculateAge(birthday) {
    var age = getAgeFromBirthdate(getDDMMYYYY(birthday));
    document.forms["smartMoneyPlannerForm"]["age"].innerHTML = age;
    document.forms["smartMoneyPlannerForm"]["age"].value = age;

    if (age < minAgeLimit || age > maxAgeLimit) {
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        return false;
    } else {
        document.getElementById('ageErrId').style.display = "none";
        return true;
    }
}

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

function onPlanUpdate(planValue) {
    var planSelected = planList[planValue - 1];
    policyTermElement.value = planSelected.policyTerm;
    premiumPayingTermElement.value = planSelected.premiumPayingTerm;

    if (planValue == 1) {
        maxAgeLimit = 60;
    } else if (planValue == 2) {
        maxAgeLimit = 55;
    } else if (planValue == 3) {
        maxAgeLimit = 55;
    } else if (planValue == 4) {
        maxAgeLimit = 50;
    }
    this.calculateAge(this.getDOB());
}

function validateSumAssured() {
    var sumAssured = this.getSumAssured();
    if (isNaN(sumAssured) || sumAssured === undefined || sumAssured === null || sumAssured === '') {
        document.getElementById('sumAssuredErrId').style.display = 'block';
        document.getElementById('sumAssuredErrId').innerHTML = 'Please enter Sum Assured.';
        return false;
    } else if ((sumAssured % 1000) !== 0) {
        document.getElementById('sumAssuredErrId').style.display = 'block';
        document.getElementById('sumAssuredErrId').innerHTML = 'Sum Assured should be multiple of 1000';
        return false;
    } else if (sumAssured < minSumAssured) {
        document.getElementById('sumAssuredErrId').style.display = 'block';
        document.getElementById('sumAssuredErrId').innerHTML = `Sum Assured should not be less than 1,00,000.`;
        return false;
    } else if (sumAssured > maxSumAssured) {
        document.getElementById('sumAssuredErrId').style.display = 'block';
        document.getElementById('sumAssuredErrId').innerHTML = `Sum Assured should not be greater than 5,00,00,000.`;
        return false;
    } else {
        document.getElementById('sumAssuredErrId').style.display = 'none';
        return true;
    }
}

function onPremiumFrequencyUpdate(frequencyValue) {
    var premiumPayingTermDivId = document.getElementById('premiumPayingTermDivId');

    var frequency = premiumFrequencyList[frequencyValue]
    console.log("frequency.title:" + frequency.title)
    if (frequency.title == "Single") {
        premiumPayingTermDivId.style.display = "none";
    } else {
        premiumPayingTermDivId.style.display = "block";
    }
}

function onWishToBackdateUpdate(wishToBackdate) {
    var backDateDiv = document.getElementById('backdatingDateDivId');
    var backDateElement = document.forms["smartMoneyPlannerForm"]["backDate"];

    if (wishToBackdate === "yes") {
        backDateDiv.style.display = "block";
        backDateElement.required = true;
    } else {
        backDateDiv.style.display = "none";
        backDateElement.required = false;
        document.forms['smartMoneyPlannerForm']['backDate'].value = "";
    }
}

// function valBackdate(backDate) {
//     var today = new Date();
//     var dd = today.getDate();
//     var currMonth = today.getMonth() + 1;

//     var yyyy = today.getFullYear();
//     if (dd < 10) {
//         dd = '0' + dd;
//     }
//     if (currMonth < 10) {
//         currMonth = '0' + currMonth;
//     }
//     var today = dd + '/' + currMonth + '/' + yyyy;

//     var launchDate = "11/05/2015";
//     var finYerEndDate;
//     if (currMonth >= 4) {
//         finYerEndDate = "01/04/" + yyyy;
//     } else {
//         finYerEndDate = "01/04/" + (parseInt(yyyy) - 1).toString;
//     }

//     if (today < backDate) {
//         document.getElementById('backDateErrId').style.display = 'block';
//         document.getElementById('backDateErrId').innerHTML = `Please enter backdation date between ${finYerEndDate} and ${today}`;
//         return false;
//     } else if ((new Date(backDate) < new Date(launchDate)) && (new Date(finYerEndDate) < new Date(launchDate))) {
//         document.getElementById('backDateErrId').style.display = 'block';
//         document.getElementById('backDateErrId').innerHTML = `Please enter backdation date between ${launchDate} and ${today}`;
//         return false;
//     } else if (new Date(backDate) < new Date(finYerEndDate)) {
//         document.getElementById('backDateErrId').style.display = 'block';
//         document.getElementById('backDateErrId').innerHTML = `Please enter backdation date between ${finYerEndDate} and ${today}`;
//         return false;
//     } else {
//         document.getElementById('backDateErrId').style.display = 'none';
//         return true;
//     }

// }

function getLifeAssuredTitle() {
    return document.forms["smartMoneyPlannerForm"]["LifeAssuredTitle"].value;
}

function fName() {
    return document.forms["smartMoneyPlannerForm"]["first_name"].value;
}

function MName() {
    return document.forms["smartMoneyPlannerForm"]["middle_name"].value;
}

function LName() {
    return document.forms["smartMoneyPlannerForm"]["last_name"].value;
}

function getPlan() {
    return document.forms["smartMoneyPlannerForm"]["plan"].value;
    // return planList[index].title;
}

function getPlanType() {
    var index = document.forms["smartMoneyPlannerForm"]["plan"].value;
    return planList[index - 1].title;
}


function getCalculatedAge() {
    return parseInt(document.forms["smartMoneyPlannerForm"]["age"].value, 10);
}

function getEmail() {
    return document.forms["smartMoneyPlannerForm"]["email"].value;
}

function getConfirmEmail() {
    return document.forms["smartMoneyPlannerForm"]["confirmEmail"].value;
}

function getDOB() {
    return document.forms["smartMoneyPlannerForm"]["dob"].value;
}

function getMobileNo() {
    return document.forms["smartMoneyPlannerForm"]["mobile"].value;
}

function getPolicyTerm() {
    return parseInt(document.forms["smartMoneyPlannerForm"]["policyTerm"].value, 10);
}

function getPremiumPayingTerm() {
    var premFreq = this.getPremiumFrequency();
    if (premFreq === "Single") {
        return 0;
    } else {
        return document.forms["smartMoneyPlannerForm"]["premiumPayingTerm"].value;
    }
}

function getPremiumFrequency() {
    var index = document.forms["smartMoneyPlannerForm"]["premiumFrequency"].value;
    return premiumFrequencyList[index].title;
}

function getSumAssured() {
    return parseInt(document.forms["smartMoneyPlannerForm"]["sumAssured"].value, 10);
}

function getGender() {
    return document.forms["smartMoneyPlannerForm"]["gender"].value;
}

function getWishToBackdate() {
    var isWishToBackDate = document.forms["smartMoneyPlannerForm"]["wishToBackdate"].value;
    if (isWishToBackDate === "yes")
        return true;
    else
        return false;
}

function getBackdate() {
    if (this.getWishToBackdate()) {
        return document.forms["smartMoneyPlannerForm"]["backDate"].value;
    } else {
        return 0;
    }
}

function getIsStaff() {
    return document.forms["smartMoneyPlannerForm"]["staff_discount"].checked;
}

/* ******************************  FORM VALIDATION & SUBMIT **************************** */
function validatForm() {
    if (smartMoneyPlannerForm.checkValidity() && this.validateGender("") && this.validateConfirmEmail() &&
        this.calculateAge(self.getDOB()) && this.validateMobileNo(self.getMobileNo()) &&
        this.validateSumAssured() && self.validateBackDate() && trueBackdate()) {
        this.calculatePremiumAPICall(); // form valid
    }
}

function calculatePremiumAPICall() {

    console.log("this.getWishToBackdate() ", this.getWishToBackdate());

    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.open('POST', serviceURL + '/getPremiumSmartMoneyPlanner', true);

    let xmlBodyParam = `<getPremiumSmartMoneyPlanner xmlns="http://tempuri.org/">
    <isStaff>${self.getIsStaff()}</isStaff>
    <isJKResident>false</isJKResident>
    <age>${self.getCalculatedAge()}</age>
    <gender>${self.getGender()}</gender>
    <plan>${self.getPlan()}</plan>
    <premFreq>${self.getPremiumFrequency()}</premFreq>
    <policyTerm>${self.getPolicyTerm()}</policyTerm>
    <premPayingTerm>${self.getPremiumPayingTerm()}</premPayingTerm>
    <sumAssured>${self.getSumAssured()}</sumAssured>
    <IsBackdate>${this.getWishToBackdate()}</IsBackdate>
    <Backdate>${self.getBackdate() == 0 ? "" : dateMMDDYYYYFormat(self.getBackdate())}</Backdate>
    <IsMines>false</IsMines>
    <KFC>${getKerlaDiscount()}</KFC>
  </getPremiumSmartMoneyPlanner>`;

    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        ${xmlBodyParam}
                    </soap:Body>
                </soap:Envelope>`;

    console.log(body);

    showLoader();
    generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {
        let staffDiscount = "";

        console.log("STAFF DISCOUNT---" + self.getIsStaff());
        if (self.getIsStaff()) {
            staffDiscount = "Yes";
        } else {
            staffDiscount = "No";
        }

        let backDating = "";

        if (self.getWishToBackdate()) {
            backDating = "Yes";
        } else {
            backDating = "No";
        }

        let planCode = '';
        console.log("plan type ", self.getPlanType());
        if (self.getPlanType() == "Plan 1")
            planCode = "SMP1";
        else if (self.getPlanType() == "Plan 2")
            planCode = "SMP2";
        else if (self.getPlanType() == "Plan 3")
            planCode = "SMP3";
        else if (self.getPlanType() == "Plan 4")
            planCode = "SMP4";

        let forminputbyuser = {
            proposerName: self.getLifeAssuredTitle() + " " + self.fName() + " " + self.MName() + " " + self.LName(),
            age: self.getCalculatedAge(),
            gender: self.getGender(),
            premiumFrequency: self.getPremiumFrequency(),
            premiumPayingTerm: self.getPremiumPayingTerm(),
            planOption: self.getPlanType(),
            policyTerm: self.getPolicyTerm(),
            sumAssured: self.getSumAssured(),
            quotationNumber: quotNumber,
            staffDiscount: staffDiscount,
            backDating: backDating,
            PlanName: self.productDetails.title,
            CustTitle: self.getLifeAssuredTitle(),
            CustFirstName: self.fName(),
            CustMiddleName: self.MName(),
            CustLastName: self.LName(),
            CustMobile: self.getMobileNo(),
            CustEmailID: self.getEmail(),
            LaDOB: getDDMMYYYY(self.getDOB()),
            ProposerDOB: '',
            BasicSA: self.getSumAssured(),
            TotalPremAmt: '0',
            Frequency: self.getPremiumFrequency(),
            PolicyTerm: self.getPolicyTerm(),
            PremPayingTerm: self.getPremiumPayingTerm(),
            PlanCode: planCode,
            KFC: getKerlaDiscount() ? "Y" : "N",
            userName: getUserFname() + " " + getUserLName()
        };
        /*   callServiceHits('getPremiumSmartMoneyPlanner', '', '', userID,
                  userMail, userMobile, userAuth)
              .then((resolve) => {
                  console.log(resolve);
              }).catch((reject) => {
                  console.log(reject);
              }); */

        let inputXml = GetInputXML(forminputbyuser);
        ApiCallService('/getPremiumSmartMoneyPlanner', body, '<smartMoneyPlanner>', '</smartMoneyPlanner>', true).then((data) => {
            self.hideLoader();
            data = data.smartMoneyPlanner;
            data.productDetails = self.productDetails;
            data.planTypeInput = self.getPlanType();
            data.policyTermInput = self.getPolicyTerm();
            data.premiumFrequencyInput = self.getPremiumFrequency();
            forminputbyuser.TotalPremAmt = data.premWthST;
            var stringifyJson = JSON.stringify(data);

            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                var lastIndex = premiumCalcXMLResponse.indexOf(`</NonGSV_surrndr_val_8Percent${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</NonGSV_surrndr_val_8Percent${getPolicyTerm()}>`.length);
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");
                var index = forminputbyuser.PolicyTerm;
                var nonGuaranMatBen_4Percent = parseXmlTag(premiumCalcXMLResponse, "nonGuaranMatBen_4Percent" + index + "");
                var nonGuaranMatBen_8Percent = parseXmlTag(premiumCalcXMLResponse, "nonGuaranMatBen_8Percent" + index + "");
                var nonGuaranMatBen = '';
                nonGuaranMatBen = "<nonGuaranMatBen_4Percent" + index + ">" + nonGuaranMatBen_4Percent + "</nonGuaranMatBen_4Percent" + index + ">";
                nonGuaranMatBen += "<nonGuaranMatBen_8Percent" + index + ">" + nonGuaranMatBen_8Percent + "</nonGuaranMatBen_8Percent" + index + ">";
                remaningOutput = remaningOutput + nonGuaranMatBen + "</SmartIncomeProtect>";
                remaningOutput = remaningOutput.replace(/smartMoneyPlanner/g, "SmartIncomeProtect");
                remaningOutput = `<?xml version='1.0' encoding='utf-8' ?>` + remaningOutput;
                let escapedBIOutput = escapeInputHTML(remaningOutput);
                sessionStorage.setItem("BIOutput", escapedBIOutput); // BI Output.
            }

            if (sessionStorage.ThroughNeedAnalysis) {
                let status = sessionStorage.getItem('ThroughNeedAnalysis');

                if (status === 'Yes') {
                    updateDataInDB(forminputbyuser).then((resolve) => {
                        if (resolve == "1") {
                            createPDFGeneralMethod(self.productDetails, data, forminputbyuser)
                        } else {
                            alert("Something Went Wrong")
                        }

                    });

                } else if (status === 'No') {
                    sessionStorage.setItem("premiumCalcResponse", stringifyJson);
                    window.location.href = "./../../PremiumCalSuccess/success.html";
                }
            }
        }).catch((error) => {
            console.log(" in error ", error);
            hideLoader();
        });
    }).catch((message) => {
        console.log(message)
        alert("Unable to generate quotation number");
        hideLoader();
    });
}

function GetInputXML(forminputbyuser) {
    var inputVal = "";
    inputVal += `<?xml version='1.0' encoding='utf-8' ?><smartMoneyPlannerBean>`;

    inputVal += `<LifeAssured_title>${self.getLifeAssuredTitle()}</LifeAssured_title>`;
    inputVal += `<LifeAssured_firstName>${self.fName()}</LifeAssured_firstName>`;
    inputVal += `<LifeAssured_middleName>${self.MName()}</LifeAssured_middleName>`;
    inputVal += `<LifeAssured_lastName>${self.LName()}</LifeAssured_lastName>`;
    inputVal += `<LifeAssured_DOB>${getDDMMYYYY(self.getDOB())}</LifeAssured_DOB>`;
    inputVal += `<LifeAssured_age>${self.getCalculatedAge()}</LifeAssured_age>`;
    inputVal += `<gender>${self.getGender()}</gender>`;

    inputVal += `<proposer_title></proposer_title>`;
    inputVal += `<proposer_firstName></proposer_firstName>`;
    inputVal += `<proposer_middleName></proposer_middleName>`;
    inputVal += `<proposer_lastName></proposer_lastName>`;
    inputVal += `<proposer_DOB></proposer_DOB>`;
    inputVal += `<proposer_age></proposer_age>`;
    inputVal += `<proposer_gender></proposer_gender>`;

    inputVal += `<product_Code>${product_Code}</product_Code>`;
    inputVal += `<product_UIN>${product_UIN}</product_UIN>`;
    inputVal += `<product_cateogory>${product_cateogory}</product_cateogory>`;
    inputVal += `<product_name>${product_name}</product_name>`;
    inputVal += `<product_type>${product_type}</product_type>`;

    inputVal += `<proposer_Is_Same_As_Life_Assured>y</proposer_Is_Same_As_Life_Assured>`;

    inputVal += `<isJKResident>false</isJKResident>`;
    inputVal += `<isStaff>${self.getIsStaff()}</isStaff>`;
    inputVal += `<isSmoker>false</isSmoker>`;
    inputVal += `<age>${self.getCalculatedAge()}</age>`;
    inputVal += `<plan>${self.getPlan()}</plan>`;

    inputVal += `<policyTerm>${self.getPolicyTerm()}</policyTerm>`;
    inputVal += `<premiumPayingTerm>${self.getPremiumPayingTerm()}</premiumPayingTerm>`;

    inputVal += `<premFreq>${self.getPremiumFrequency()}</premFreq>`;
    inputVal += `<sumAssured>${self.getSumAssured()}</sumAssured>`;

    inputVal += `<Wish_to_backdate_policy>${self.getWishToBackdate() ? 'Y' : 'N'}</Wish_to_backdate_policy>`;
    inputVal += `<backdating_Date>${self.getWishToBackdate() ? getDDMMYYYY(self.getBackdate()) : ''}</backdating_Date>`;
    inputVal += `<KFC>${forminputbyuser.KFC}</KFC>`;
    inputVal += `</smartMoneyPlannerBean>`;
    let escapedHTML = escapeInputHTML(inputVal);
    sessionStorage.setItem("BIInput", escapedHTML);
    return escapedHTML;
}

function validateGender(formElementName) {
    //console.log("formElementName",formElementName)
    var laGender = document.forms["smartMoneyPlannerForm"]["gender"].value;
    document.getElementById("LifeAssuredTitle").options[0].disabled = false;
    document.getElementById("LifeAssuredTitle").options[1].disabled = false;
    document.getElementById("LifeAssuredTitle").options[2].disabled = false;
    if (formElementName === "gender") {
        if (laGender === "Male") {
            document.getElementById("LifeAssuredTitle").options[1].disabled = true;
            document.getElementById("LifeAssuredTitle").options[2].disabled = true;
            document.getElementById("LifeAssuredTitle").options[0].selected = true;
        } else if (laGender === "Female") {
            document.getElementById("LifeAssuredTitle").options[0].disabled = true;
            document.getElementById("LifeAssuredTitle").options[1].disabled = false;
            document.getElementById("LifeAssuredTitle").options[2].disabled = false;
            document.getElementById("LifeAssuredTitle").options[1].selected = true;
        } else {
            document.getElementById("LifeAssuredTitle").options[0].disabled = false;
            document.getElementById("LifeAssuredTitle").options[1].disabled = false;
            document.getElementById("LifeAssuredTitle").options[2].disabled = false;
        }
    }
    if (laGender !== "Female" && laGender !== "Male" && laGender !== "Third Gender") {
        document.getElementById("genderErrId").style.display = "block";
        document.getElementById("genderErrId").innerHTML =
            "Please select your gender.";
        return false;
    } else {
        document.getElementById("genderErrId").style.display = "none";
        return true;
    }
}

//Added By Tushar Kadam on 19/09/2019
function trueBackdate() {
    if (self.getWishToBackdate()) {
        var finYerEndDate = "";
        var today = new Date();
        var currYear = today.getFullYear();
        var currMonth = today.getMonth() + 1;
        var date = today.getDate();
        var month = "";
        if (currMonth < 10) {
            month = "0" + currMonth;
        } else {
            month = currMonth;
        }
        var todayDate = date + "-" + month + "-" + currYear;
        //document.getElementById("backDate").value = "20/06/2019";
        var backDate_split = (dateMMDDYYYYFormat(self.getBackdate())).split("-");
        var newBackDate = new Date(backDate_split[2], (backDate_split[0] - 1), backDate_split[1])
        if (currMonth >= 4) {
            finYerEndDate = "01-04-" + currYear;
        } else {
            finYerEndDate = "01-04-" + (currYear - 1);
        }
        var finYerEndDate_split = finYerEndDate.split("-");
        var newFinYerEndDate = new Date(finYerEndDate_split[2], (finYerEndDate_split[1] - 1), finYerEndDate_split[0])
        var launchDate = "15-01-2020";
        launchDateArray = launchDate.split("-");
        var newLaunchDate = new Date(launchDateArray[2], launchDateArray[1] - 1, launchDateArray[0]);
        if (today.getTime() < newBackDate.getTime()) {
            document.getElementById('backDateErrId').style.display = 'block';
            document.getElementById('backDateErrId').innerHTML = "Please enter backdation date between " + finYerEndDate + " and " + todayDate;
            return false;
        } else if (newBackDate.getTime() < newLaunchDate && newFinYerEndDate.getTime() < newLaunchDate) {
            document.getElementById('backDateErrId').style.display = 'block';
            document.getElementById('backDateErrId').innerHTML = "Please enter backdation date between " + launchDate + " and " + todayDate;
            return false;
        } else if (newBackDate.getTime() < newFinYerEndDate.getTime()) {
            document.getElementById('backDateErrId').style.display = 'block';
            document.getElementById('backDateErrId').innerHTML = "Please enter Backdation date between " + finYerEndDate + " and " + todayDate;
            return false;
        } else {
            document.getElementById('backDateErrId').style.display = 'none';
            return true;
        }
    } else {
        return true;
    }
}

//Added on 24/06/2019 by Bharamu
function validateBackDate() {
    if (self.getWishToBackdate()) {
        if (isEmpty(self.getBackdate())) {
            document.getElementById('backDateErrId').style.display = 'block';
            document.getElementById('backDateErrId').innerHTML = 'Please select back date';
            return false;
        } else {
            document.getElementById('backDateErrId').style.display = 'none';
            return true;
        }
    } else {
        return true;
    }
}

function calculateMyAge() {
    if (!isEmpty(self.getDOB())) {
        var d = getDDMMYYYY(self.getBackdate());
        var split_date = d.split("/");
        var nowCal = new Date(split_date[2], split_date[1], split_date[0]);
        var ProposerDob = getDDMMYYYY(this.getDOB()).split("/");
        var age = nowCal.getFullYear() - parseInt(ProposerDob[2]);
        var isMonthGreater = parseInt(ProposerDob[1]) > nowCal.getMonth();
        var isMonthSameButDayGreater = parseInt(ProposerDob[1]) == nowCal.getMonth() &&
            parseInt(ProposerDob[1]) > nowCal.getDate();
        if (isMonthGreater || isMonthSameButDayGreater) {
            age = age - 1;
        }
        document.forms["smartMoneyPlannerForm"]["age"].value = age;
    } else {
        alert("Please select a LifeAssured DOB First");
        document.forms['smartMoneyPlannerForm']['backDate'].value = "";
    }
}

function setBackdateEmpty() {
    document.forms['smartMoneyPlannerForm']['backDate'].value = "";
}
