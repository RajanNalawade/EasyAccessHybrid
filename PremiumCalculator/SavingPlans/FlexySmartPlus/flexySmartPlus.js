window.onload = function () {
    this.ready();
};

/* *************  VARIABLE DECLARATION ************** */
var policyTermList = new Array();
var premiumPaymentModeList = new Array();
var productDetails;
var proposer_Is_Same_As_Life_Assured = "y";

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    // self.hideLoader();
    this.hideErrMsg();
    this.initArrayList();
    //retrieve the encrypted username    
    // this.productDetails = CryptoJS.AES.decrypt(localStorage.getItem(CryptoJS.AES.encrypt("productDetails", "1vdxdybj90()%ncggg;'1@XGYWA")), "1vdxdybj90()%ncggg;'1@XGYWA");
    // window.openSecureStorage("SBILDataCache", window.AES_128, "1vdxdybj90()%ncggg;'1@XGYWA", function(storage){
    //     self.productDetails = CryptoJS.AES.decrypt(storage.getItem(CryptoJS.AES.encrypt("productDetails", "1vdxdybj90()%ncggg;'1@XGYWA")), "1vdxdybj90()%ncggg;'1@XGYWA");
    // });
    // console.log(" decrypted product details ",this.productDetails);

    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    this.initializeData()
};

function hideErrMsg() {
    document.getElementById('maturityAgeErrId').style.display = "none";
    document.getElementById('samfErrId').style.display = "none";
    document.getElementById('confirmEmailErrId').style.display = "none";
    document.getElementById('ageErrId').style.display = "none";
    document.getElementById('mobileNoErrId').style.display = "block";
}

function initArrayList() {
    policyListElement = document.forms["flexySmartPlusForm"]["policyTerm"];
    for (i = minPolicyTermLimit; i <= maxPolicyTermLimit; i++) {
        policyListElement.add(new Option(i));
    }
    premiumPaymentModeListElement = document.forms["flexySmartPlusForm"]["premiumPaymentMode"];
    for (i = 0; i < premiumPaymentModeList.length; i++) {
        premiumPaymentModeListElement.add(new Option(premiumPaymentModeList[i].title, premiumPaymentModeList[i].value));
    }
}

function initializeData() {
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
}

/* ***************** DOM EVENTS **************** */
function calculateAge(birthday) {
    var age = getAgeFromBirthdate(getDDMMYYYY(birthday));
    document.forms["flexySmartPlusForm"]["age"].innerHTML = age;
    document.forms["flexySmartPlusForm"]["age"].value = age;
    if (age < minAgeLimit || age > maxAgeLimit) {
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        return false;
    } else {
        document.getElementById('ageErrId').style.display = "none";
        return true;
    }
}

function onAgeAndPolicyTermUpdate() {
    var ageSelected = this.getAge();
    var policyTermSelected = this.getPolicyTerm();
    if (ageSelected + policyTermSelected > 65) {
        document.getElementById('maturityAgeErrId').style.display = "block";
        return false;
    } else {
        document.getElementById('maturityAgeErrId').style.display = "none";
        return true;
    }
}

function validateGender() {
    var gender = document.forms["flexySmartPlusForm"]["gender"].value;
    if (gender !== "Female" && gender !== "Male") {
        document.getElementById('genderErrId').style.display = "block";
        document.getElementById('genderErrId').innerHTML = "Please select your gender.";
        return false;
    } else {
        document.getElementById('genderErrId').style.display = "none";
        return true;
    }
}

function validatePremiumAmount() {
    var premiumAmountSelected = this.getPremiumAmount();
    var premiumPaymentModeSelected = self.getPremiumPaymentMode();

    if (isNaN(premiumAmountSelected) || premiumAmountSelected == "" || premiumAmountSelected == undefined || premiumAmountSelected == 0 || premiumAmountSelected == null) {
        document.getElementById('premiumAmtErrId').style.display = "block";
        document.getElementById('premiumAmtErrId').innerHTML = "Please enter premium amount.";
        return false;
    } else if (premiumAmountSelected < premiumPaymentModeSelected.minPremiumAmount) {
        document.getElementById('premiumAmtErrId').style.display = "block";
        document.getElementById('premiumAmtErrId').innerHTML = `Premium Amount should not be less than ${self.getPremiumPaymentMode().minPremiumAmount}.`;
        return false;
    } else if ((premiumPaymentModeSelected.value === 0 || premiumPaymentModeSelected.value === 1) && (premiumAmountSelected % 100 !== 0)) {
        document.getElementById('premiumAmtErrId').style.display = "block";
        document.getElementById('premiumAmtErrId').innerHTML = `Premium Amount should be multiple of 100`;
        return false;
    } else if ((premiumPaymentModeSelected.value === 2 || premiumPaymentModeSelected.value === 3) && (premiumAmountSelected % 50 !== 0)) {
        document.getElementById('premiumAmtErrId').style.display = "block";
        document.getElementById('premiumAmtErrId').innerHTML = `Premium Amount should be multiple of 50`;
        return false;
    }
    document.getElementById('premiumAmtErrId').style.display = "none";
    return true;
}

function validateSAMF() {
    var minSAMF = 0,
        maxSAMF = 20;
    var ageSelected = self.getAge();
    var policyTermSelected = self.getPolicyTerm();
    var samfSelected = getSAMF();

    if (ageSelected < 45)
        minSAMF = Math.max(10, (0.5 * policyTermSelected));
    else
        minSAMF = Math.max(10, (0.25 * policyTermSelected));

    if (isNaN(samfSelected) || samfSelected === "" || samfSelected === undefined || samfSelected < minSAMF || (samfSelected > maxSAMF)) {
        document.getElementById('samfErrId').style.display = "block";
        document.getElementById('samfErrId').innerHTML = `Enter Sum Assured Multiple Factor [SAMF] between ${minSAMF} and ${maxSAMF}`;
        return false;
    }
    document.getElementById('samfErrId').style.display = "none";
    return true;
}

/* **************************  OTHER FUNCTIONS ********************* */


/* ***********************   GETTERS ************************* */
function getAge() {
    return parseInt(document.forms["flexySmartPlusForm"]["age"].value, 10);
}

function getEmail() {
    return document.forms["flexySmartPlusForm"]["email"].value;
}

function getConfirmEmail() {
    return document.forms["flexySmartPlusForm"]["confirmEmail"].value;
}

function getDOB() {
    return document.forms["flexySmartPlusForm"]["dob"].value;
}

function getMobileNo() {
    return document.forms["flexySmartPlusForm"]["mobile"].value;
}

function getPolicyTerm() {
    return parseInt(document.forms["flexySmartPlusForm"]["policyTerm"].value, 10);
}

function getPremiumAmount() {
    return parseInt(document.forms["flexySmartPlusForm"]["premiumAmount"].value, 10);
}

function getPremiumPaymentMode() {
    var index = document.forms["flexySmartPlusForm"]["premiumPaymentMode"].value;
    return premiumPaymentModeList[index];
}

function getSAMF() {
    return parseInt(document.forms["flexySmartPlusForm"]["samf"].value, 10);
}

function getGender() {
    return document.forms["flexySmartPlusForm"]["gender"].value;
}

function getOption() {
    return document.forms["flexySmartPlusForm"]["option"].value;
}

function getIsStaffDiscount() {
    return document.forms["flexySmartPlusForm"]["staff_discount"].checked;
}

function fName(){
    return document.forms["flexySmartPlusForm"]["first_name"].value;
}
function MName(){
    return document.forms["flexySmartPlusForm"]["middle_name"].value;
}

function LName(){
    return document.forms["flexySmartPlusForm"]["last_name"].value;
}

function getTitle(){
    return document.forms["flexySmartPlusForm"]["flexySmartPlusTitle"].value;
}

function getFName() {
    return document.forms["flexySmartPlusForm"]["first_name"].value;
}

function getMName() {
    return document.forms["flexySmartPlusForm"]["middle_name"].value;
}

function getLName() {
    return document.forms["flexySmartPlusForm"]["last_name"].value;
}
/* ******************************  FORM VALIDATION & SUBMIT **************************** */
function validatForm() {
    if (flexySmartPlusForm.checkValidity() && this.validateGender() && this.validateConfirmEmail() &&
        this.calculateAge(self.getDOB()) && this.validateMobileNo(self.getMobileNo()) &&
        this.onAgeAndPolicyTermUpdate() && this.validatePremiumAmount() && this.validateSAMF()) {
        this.calculatePremiumAPICall(); // form valid
    }
}

function calculatePremiumAPICall() {
    self.showLoader();
    let xmlBodyParam = `<getPremiumFlexiSmartPlus xmlns="http://tempuri.org/">
      <isStaff>${getIsStaffDiscount()}</isStaff>
      <isJKResident>false</isJKResident>
      <age>${self.getAge()}</age>
      <gender>${self.getGender()}</gender>
      <policyTerm>${self.getPolicyTerm()}</policyTerm>
      <premFreq>${self.getPremiumPaymentMode().title}</premFreq>
      <premiumAmount>${self.getPremiumAmount()}</premiumAmount>
      <SAMF>${self.getSAMF()}</SAMF>
      <isHoliday>false</isHoliday>
      <holidayYear></holidayYear>
      <holidayTerm></holidayTerm>
      <isTopup>false</isTopup>
      <topupPremAmt>0</topupPremAmt>
      <plan>${self.getOption()}</plan>
      <KFC>false</KFC>
    </getPremiumFlexiSmartPlus>`;

    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        ${xmlBodyParam}
                    </soap:Body>
                </soap:Envelope>`;

    generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {
        var PlanCode = "1XSGS";
        if (getOption() == "GOLD"){
            PlanCode = "VPLUSG";
        }else if (getOption() == "PLATINUM"){
            PlanCode = "VPLUSP";
        }

        let forminputbyuser = {
            staff_discount: self.getIsStaffDiscount(),
            proposerName: self.fName() + " " + self.LName(),
            age: self.getAge(),
            gender: self.getGender(),
            policyTerm: self.getPolicyTerm(),
            premiumFrequency: this.getPremiumPaymentMode().title,
            premiumAmount: this.getPremiumAmount(),
            samf: this.getSAMF(), 
            option: self.getOption(),
            quotationNumber: quotNumber,
            PlanName: self.productDetails.title,
            CustTitle: self.getTitle(),
            CustFirstName: self.getFName(),
            CustMiddleName: self.getMName(),
            CustLastName: self.getLName(),
            CustMobile: self.getMobileNo(),
            CustEmailID: self.getEmail(),
            LaDOB: self.getDOB(),
            ProposerDOB: '',
            BasicSA: '',
            TotalPremAmt: getPremiumAmount(),
            Frequency: this.getPremiumPaymentMode().title,
            PolicyTerm: self.getPolicyTerm(),
            PremPayingTerm: 0,
            PlanCode: PlanCode
        };

        let input = self.getInput(forminputbyuser);
        
        self.ApiCallService('/getPremiumFlexiSmartPlus', body, '<flexiSmartPlus>', '</flexiSmartPlus>', true).then((data) => {
            self.hideLoader();
            data = data.flexiSmartPlus;
            data.productDetails = self.productDetails;
            var stringifyJson = JSON.stringify(data);
            sessionStorage.setItem('premiumCalcResponse',stringifyJson);

            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                var lastIndex = premiumCalcXMLResponse.indexOf(`</CommIfPay8Pr${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</CommIfPay8Pr${getPolicyTerm()}>`.length);
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");
                console.log("remaningOutput ", remaningOutput);
                remaningOutput = appendXMLTagAtStart(remaningOutput);
                let escapedOutput = escapeInputHTML(remaningOutput);
                sessionStorage.setItem("BIOutput", escapedOutput);
            }
            if (sessionStorage.ThroughNeedAnalysis) {
                let status = sessionStorage.getItem('ThroughNeedAnalysis');                
                if (status === 'Yes') {
                    forminputbyuser.BasicSA = data.sumAssured;
                    updateDataInDB(forminputbyuser).then((resolve) => {
                        if (resolve == "1") {
                            createPDFGeneralMethod(productDetails, data, forminputbyuser)
                        } else {
                            alert("Something Went Wrong")
                        }
                    });
                } else if (status === 'No') {
                    window.location.href = "../../PremiumCalSuccess/success.html";
                }
            }
        }).catch((error) => {
            console.log(" in error ", error);
            self.hideLoader();
        });
    }).catch((message) => {
        console.log("Quotation - ", message);
        alert("Unable to generate quotation number")
        self.hideLoader();
    });

}

/* *************************  ANIMATION Functions using JQUERY **************************** */

function getInput(forminputbyuser){
    var inputVal = '';
    inputVal +=`<?xml version='1.0' encoding='utf-8' ?><flexiSmartPlus>`;

        inputVal +=`<LifeAssured_title>${self.getTitle()}</LifeAssured_title>`;
        inputVal +=`<LifeAssured_firstName>${self.fName()}</LifeAssured_firstName>`;
        inputVal +=`<LifeAssured_middleName>${self.MName()}</LifeAssured_middleName>`;
        inputVal +=`<LifeAssured_lastName>${self.LName()}</LifeAssured_lastName>`;
        inputVal +=`<LifeAssured_DOB>${convertDate(self.getDOB())}</LifeAssured_DOB>`;
        inputVal +=`<LifeAssured_age>${self.getAge()}</LifeAssured_age>`;
        inputVal +=`<gender>${self.getGender()}</gender>`;

        inputVal +=`<proposer_title></proposer_title>`;
        inputVal +=`<proposer_firstName></proposer_firstName>`;
        inputVal +=`<proposer_middleName></proposer_middleName>`;
        inputVal +=`<proposer_lastName></proposer_lastName>`;
        inputVal +=`<proposer_DOB></proposer_DOB>`;
        inputVal +=`<proposer_age></proposer_age>`;
        inputVal +=`<proposer_gender></proposer_gender>`;

        inputVal +=`<product_name>${product_name}</product_name>`;

		/* parivartan changes */
        inputVal +=`<product_Code>${product_code}</product_Code>`;
        inputVal +=`<product_UIN>${product_uin}</product_UIN>`;
        inputVal +=`<product_cateogory>${product_cateogory}</product_cateogory>`;
        inputVal +=`<product_type>${product_type}</product_type>`;
		/* end */

        inputVal +=`<proposer_Is_Same_As_Life_Assured>${proposer_Is_Same_As_Life_Assured}</proposer_Is_Same_As_Life_Assured>`;

        inputVal +=`<isStaff>${forminputbyuser.staff_discount}</isStaff>`;
        inputVal +=`<isJKResident>false</isJKResident>`;
        inputVal +=`<age>${self.getAge()}</age>`;

        inputVal +=`<policyTerm>${forminputbyuser.policyTerm}</policyTerm>`;
        inputVal +=`<premFreq>${forminputbyuser.premiumFrequency}</premFreq>`;
        inputVal +=`<premiumAmount>${forminputbyuser.premiumAmount.toFixed(1)}</premiumAmount>`;
        inputVal +=`<SAMF>${forminputbyuser.samf.toFixed(1)}</SAMF>`;
        inputVal +=`<isHoliday>No</isHoliday>`;
        inputVal +=`<holidayYear>0</holidayYear>`;
        inputVal +=`<holidayTerm>No</holidayTerm>`;
        inputVal +=`<isTopup>No</isTopup>`;
        inputVal +=`<topupPremAmt>0.0</topupPremAmt>`;
        inputVal +=`<plan>${forminputbyuser.option}</plan>`;
        inputVal +=`</flexiSmartPlus>`;

    let escapedHTML = escapeInputHTML(inputVal);
    sessionStorage.setItem("BIInput", escapedHTML);
    return escapedHTML;
}