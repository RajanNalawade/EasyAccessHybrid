window.onload = function() {
    this.ready();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails;

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    this.hideErrMsg();
    this.initArrayList();
    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    console.log('product details - ' + this.productDetails);
    this.initializeData()
};

function hideErrMsg() {
    //document.getElementById('maturityAgeErrId').style.display = "none";
    //document.getElementById('samfErrId').style.display = "none";
    document.getElementById('confirmEmailErrId').style.display = "none";
    document.getElementById('ageErrId').style.display = "none";
    document.getElementById('mobileNoErrId').style.display = "block";
}

function initializeData() {
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
}

function getQueryStringDesializedData2C() {
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queries = queryString.split("&");
    console.log('query - ' + queries);
    return JSON.parse(queries[0].split("product=").pop());
}

function initArrayList() {

    policyListElement = document.forms["smartWomenAdvantage"]["policyTerm"];
    for (i = 0; i < policyTermList.length; i++) {
        policyListElement.add(new Option(policyTermList[i].title, policyTermList[i].value));
    }


    PlanListElement = document.forms["smartWomenAdvantage"]["plan"];
    for (i = 0; i < planList.length; i++) {
        PlanListElement.add(new Option(planList[i].title, planList[i].value));
    }

    SAMFListElement = document.forms["smartWomenAdvantage"]["SAMF"];
    for (i = 0; i < criticalIllnessOptionList.length; i++) {
        SAMFListElement.add(new Option(criticalIllnessOptionList[i].title, criticalIllnessOptionList[i].value));
    }

    premiumFrequencyListElement = document.forms["smartWomenAdvantage"]["premiumFrequencyMode"];
    for (i = 0; i < premiumFrequencyList.length; i++) {
        premiumFrequencyListElement.add(new Option(premiumFrequencyList[i].title, premiumFrequencyList[i].value));
    }

}

/**********************DOM Events**********************/
function validateGender() {
    var gender = document.forms["smartWomenAdvantage"]["gender"].value;
    if (gender !== "Female" && gender !== "Male") {
        document.getElementById('genderErrId').style.display = "block";
        document.getElementById('genderErrId').innerHTML = "Please select your gender.";
        return false;
    } else {
        document.getElementById('genderErrId').style.display = "none";
        return true
    }
}

function calculateAge(birthday) {
    //    var ageDifMs = Date.now() - new Date(birthday).getTime();
    //    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    //    var age = Math.abs(ageDate.getUTCFullYear() - 1970);
    var age = getAgeFromBirthdate(getDDMMYYYY(birthday));
    document.forms["smartWomenAdvantage"]["age"].innerHTML = age;
    document.forms["smartWomenAdvantage"]["age"].value = age;
    if (age < minAgeLimit || age > maxAgeLimitr) {
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimitr}.`;
        return false;
    } else {
        document.getElementById('ageErrId').style.display = "none";
        return true;
    }
}

/********************getter methods***********************/
function getGender() {
    return document.forms["smartWomenAdvantageForm"]["gender"].value;
}

function FName() {
    return document.forms["smartWomenAdvantageForm"]["first_name"].value;
}

function getTitle() {
    return document.forms['smartWomenAdvantageForm']['selTitle'].value;
}

function MName() {
    return document.forms["smartWomenAdvantageForm"]["middle_name"].value;
}

function LName() {
    return document.forms["smartWomenAdvantageForm"]["last_name"].value;
}

function getWomenDOB() {
    return document.forms["smartWomenAdvantageForm"]["dob"].value;
}

function getWomenAge() {
    var age = parseInt(document.forms["smartWomenAdvantageForm"]["age"].value);
    if (isNaN(age) || age == '' || age == null) {
        return 0;
    }
    return age;

}

function getmobileNo() {
    return document.forms["smartWomenAdvantageForm"]["mobile"].value;
}

function getEmailId() {
    return document.forms["smartWomenAdvantageForm"]["email"].value;
}

function getSAMF() {
    return parseInt(document.forms["smartWomenAdvantageForm"]["SAMF"].value);
}

function getPlan() {
    var index = document.forms["smartWomenAdvantageForm"]["plan"].value;
    return planList[index-1].title;
}

function getPolicyTerm() {
    return parseInt(document.forms["smartWomenAdvantageForm"]["policyTerm"].value);
}

function getPremiumFreq() {
    var index = document.forms["smartWomenAdvantageForm"]["premiumFrequencyMode"].value;
    return premiumFrequencyList[index - 1].title;
}

function getSumAssured() {
    var sum = document.forms["smartWomenAdvantageForm"]["premiumAmount"].value;
    if (isNaN(sum) || sum == '' || sum == null) {
        return 0;
    }
    return sum;
}

function getCriticalSumAssured() {
    var criticalsum = document.forms["smartWomenAdvantageForm"]["criticalPremiumAmount"].value;
    if (isNaN(criticalsum) || criticalsum == '' || criticalsum == null) {
        return 0;
    }
    return criticalsum;
}

function isAPCActive() {
    return document.forms["smartWomenAdvantageForm"]["apcSwitch"].checked;
}

function getAPCSumAssured() {
    var apcsum;
    if (!isAPCActive()) {
        return 0;
    } else {
        apcsum = document.forms["smartWomenAdvantageForm"]["apcPremiumAmount"].value;
        if (isNaN(apcsum) || apcsum == '' || apcsum == null) {
            return 0;
        }
    }

    return apcsum;
}

function getMinPremiumAmount(mode) {
    if (mode == premiumFrequencyList[0].title) {
        return minYearlyPrem;
    } else if (mode == premiumFrequencyList[1].title) {
        return minHalfYearlyPrem;
    } else if (mode == premiumFrequencyList[2].title) {
        return minQuarterleyPrem;
    } else if (mode == premiumFrequencyList[3].title) {
        return minMonthleyPrem;
    }
}
/*********************************************************/
/***********************set dynamic values****************/
function updateAPCnCPSumAssured() {
    if (getSumAssured() != 0) {
        var result = getSumAssured() * 0.2;
        document.forms["smartWomenAdvantageForm"]["apcPremiumAmount"].value = result;
    } else
        document.forms["smartWomenAdvantageForm"]["apcPremiumAmount"].value = 0;
}

function updateCritiSumAssured() {
    if (getSumAssured() != 0) {
        document.forms["smartWomenAdvantageForm"]["criticalPremiumAmount"].value = getSumAssured() * getSAMF();
    } else {
        document.forms["smartWomenAdvantageForm"]["criticalPremiumAmount"].value = 0;
    }
}
/*********************************************************/
/**************************Validation*********************/
function validateEligibilityACPnCA() {
    var age = getWomenAge();
    if (isAPCActive()) {
        if (age >= 18 && age <= 40 && (age + getPolicyTerm()) < 46) {
            document.getElementById("apcErrorId").style.display = "none";
            return true
        } else {
            document.getElementById("apcErrorId").style.display = "block";
            document.getElementById("apcErrorId").innerHTML = "Maturity age for APC & CA option is 45 Years"
            document.getElementById("rider_switch").checked = false;
            return false;
        }
    }
    return true;

}

function validateMobileNo(mobileNo) {
    if (mobileNo == '' || mobileNo == null) {
        document.getElementById('mobileNoErrId').style.display = "block";
        document.getElementById('mobileNoErrId').innerHTML = "Please enter mobile number";
        return false;
    } else if (mobileNo.length !== 10) {
        document.getElementById('mobileNoErrId').style.display = "block";
        document.getElementById('mobileNoErrId').innerHTML = "Mobile number should be 10 digits.";
        return false;
    } else {
        document.getElementById('mobileNoErrId').style.display = "none";
        return true;
    }
}

function validateEmailIds() {
    var email = getEmailId();
    var cEmail = document.forms["smartWomenAdvantageForm"]["confirmEmail"].value;
    if (email == '' || email == null) {
        document.getElementById('confirmEmailErrId').style.display = "block";
        document.getElementById('confirmEmailErrId').innerHTML = "Please enter email id";
        return false;
    } else if (cEmail == '' || cEmail == null) {
        document.getElementById('confirmEmailErrId').style.display = "block";
        document.getElementById('confirmEmailErrId').innerHTML = "Please enter confirm email id";
        return false;
    } else if (email != cEmail) {
        document.getElementById('confirmEmailErrId').style.display = "block";
        document.getElementById('confirmEmailErrId').innerHTML = "Email Id Does Not Match";
        return false;
    } else {
        document.getElementById('confirmEmailErrId').style.display = "none";
        return true
    }
}

function validateSumAssured() {

    if (getSumAssured() == 0) {
        document.getElementById("sumAssuredErrId").style.display = "block";
        document.getElementById("sumAssuredErrId").innerHTML = "Please enter Sum Assured in Rs.";
        return false;
    } else if (getSumAssured() > maxSumAssured) {
        document.getElementById("sumAssuredErrId").style.display = "block";
        document.getElementById("sumAssuredErrId").innerHTML = "Sum Assured should not be greater than Rs." +
            new Intl.NumberFormat('en-IN').format(maxSumAssured);
        return false;
    } else if (getSumAssured() < minSumAssured) {
        document.getElementById("sumAssuredErrId").style.display = "block";
        document.getElementById("sumAssuredErrId").innerHTML = "Sum Assured should not be less than Rs." +
            new Intl.NumberFormat('en-IN').format(minSumAssured);
        return false;
    } else if (getSumAssured() % 1000 != 0) {
        document.getElementById("sumAssuredErrId").style.display = "block";
        document.getElementById("sumAssuredErrId").innerHTML = "Sum Assured should be multiple of 1000";
        return false;
    } else {
        document.getElementById("sumAssuredErrId").style.display = "none";
        return true;
    }

}

function validateCritiSumAssured() {
    if (getCriticalSumAssured() == 0) {
        document.getElementById("criticleSumAssuredErrId").style.display = "block";
        document.getElementById("criticleSumAssuredErrId").innerHTML = "Please enter Sum Assured in Rs. ";
        return false;
    } else if (getCriticalSumAssured() > 2000000) {
        document.getElementById("criticleSumAssuredErrId").style.display = "block";
        document.getElementById("criticleSumAssuredErrId").innerHTML = "Please change the Critical Illess Option or Basic Sum Assured such that Critical Illess Sum Assured should not be greater than Rs. 20,00,000";
        return false;
    } else {
        document.getElementById("criticleSumAssuredErrId").style.display = "none";
        return true;
    }


}

function validatePremAmount() {
    var mode = getPremiumFreq();
    var minPremium = getMinPremiumAmount(mode);
    if (getSumAssured() < minPremium) {
        document.getElementById("sumAssuredErrId").style.display = "block";
        document.getElementById("sumAssuredErrId").innerHTML = "Minimum Premium for " + mode + " mode under this product is Rs. " + new Intl.NumberFormat('en-IN').format(minPremium);
        return false;
    } else {
        document.getElementById("sumAssuredErrId").style.display = "none";
        return true;
    }
}

function validateMaturityAge() {
    if ((getWomenAge() + getPolicyTerm()) > 60) {
        document.getElementById("policyTermErrId").style.display = "block";
        document.getElementById("policyTermErrId").innerHTML = "Maximum maturity age of Life Assured is 60 Years.";
        return false;
    }
    document.getElementById("policyTermErrId").style.display = "none";
    return true;

}
/*********************************************************/

/************************hide and show views**************/
function apcSumAssuredField() {
    if (this.isAPCActive()) {
        document.getElementById("apcSumAssuredRow").style.display = "block";
    } else {
        document.getElementById("apcSumAssuredRow").style.display = "none";
    }
}
/*********************************************************/

function submitWomenAdvantageForm() {
    if (this.validateMobileNo(this.getmobileNo()) && this.validateEmailIds() && this.validateSumAssured() && this.validatePremAmount() &&
        this.validateCritiSumAssured() && this.validateMaturityAge() && this.validateEligibilityACPnCA()) {
        calculatePremiumAPICall();
    }
}

function calculatePremiumAPICall() {
    let xmlBodyParam = ` <getPremiumSmartWomenAdvantage xmlns="http://tempuri.org/">
    <isStaff>false</isStaff>
    <isJkResident>false</isJkResident>
    <age>${this.getWomenAge()}</age>
    <gender>${this.getGender()}</gender>
    <planName>${this.getPlan()}</planName>
    <premiumFreq>${this.getPremiumFreq()}</premiumFreq>
    <policyTerm>${this.getPolicyTerm()}</policyTerm>
    <critIllOp>${this.getCriticalSumAssured()}</critIllOp>
    <basicSA>${this.getSumAssured()}</basicSA>
    <cc13SA>0</cc13SA>
    <isAPCnCA>${this.isAPCActive()}</isAPCnCA>
    <APCnCASA>${this.getAPCSumAssured()}</APCnCASA>
  </getPremiumSmartWomenAdvantage>`;

    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        ${xmlBodyParam}
                    </soap:Body>
                </soap:Envelope>`;

    console.log(body);

    let planCode = '';
    if (self.getPlan() === 'Gold' && self.getSAMF() == '1') {
        planCode = '2CSWAG1';
    } else if (self.getPlan() === 'Gold' && self.getSAMF() == '2'){
        planCode = '2CSWAG2';
    }else if (self.getPlan() === 'Gold' && self.getSAMF() == '3'){
        planCode = '2CSWAG3';
    }else if (self.getPlan() === 'Platinum' && self.getSAMF() == '1'){
        planCode = '2CSWAP1';
    }else if (self.getPlan() === 'Platinum' && self.getSAMF() == '2'){
        planCode = '2CSWAP2';
    }else if (self.getPlan() === 'Platinum' && self.getSAMF() == '3'){
        planCode = '2CSWAP3';
    }
    generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {

        let forminputbyuser = {
            proposerName: self.FName() + " " + self.LName(),
            dob: self.getWomenDOB(),
            age: self.getWomenAge(),
            gender: self.getGender(),
            samf: self.getSAMF(),
            premiumFrequency: self.getPremiumFreq(),
            premiumPayingTerm: self.getPolicyTerm(),
            planName: self.getPlan(),
            sumAssured: self.getSumAssured(),
            critiSumAssured: self.getCriticalSumAssured(),
            apcSumAssured: self.getAPCSumAssured(),
            isAPCnCAoption: self.isAPCActive(),
            quotationNumber: quotNumber,
            staffDiscount: "No",

            PlanName: self.productDetails.title,
            CustTitle: self.getTitle(),
            CustFirstName: self.FName(),
            CustMiddleName: self.MName(),
            CustLastName: self.LName(),
            CustMobile: self.getmobileNo(),
            CustEmailID: self.getEmailId(),
            LaDOB: self.getWomenDOB(),
            ProposerDOB: '',
            BasicSA: self.getSumAssured(),
            TotalPremAmt: '',
            Frequency: self.getPremiumFreq(),
            PolicyTerm: self.getPolicyTerm(),
            PremPayingTerm: '0',
            PlanCode: planCode
        };

        let inputXml = getInput(forminputbyuser);

        showLoader();
        ApiCallService('/getPremiumSmartWomenAdvantage', body, '<smartWomenAdvantage>', '</smartWomenAdvantage>', true).then((data) => {
            self.hideLoader();
            data = data.smartWomenAdvantage;

            forminputbyuser.TotalPremAmt = data.premWthST;
            data.productDetails = self.productDetails;
            data.premiumFreq = self.getPremiumFreq();
            data.isAPCActive = self.isAPCActive();
            var stringifyJson = JSON.stringify(data);
            sessionStorage.setItem('premiumCalcResponse',stringifyJson);

            if(sessionStorage.premiumCalcOutput){
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>'); 
                var lastIndex =  premiumCalcXMLResponse.indexOf(`</NonGSV_surrndr_val_8Percent${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex+`</NonGSV_surrndr_val_8Percent${getPolicyTerm()}>`.length);  
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput,"");
                console.log("remaningOutput ",remaningOutput);

                let escapedBIOutput = escapeInputHTML("<?xml version='1.0' encoding='utf-8' ?>"+remaningOutput);
                sessionStorage.setItem("BIOutput", escapedBIOutput); // BI Output.
            }

            if (sessionStorage.ThroughNeedAnalysis) {
                let status = sessionStorage.getItem('ThroughNeedAnalysis');

                if (status === 'Yes') {
                    updateDataInDB(forminputbyuser).then((resolve) => {
                        if (resolve == "1") {
                            createPDFGeneralMethod(self.productDetails, data, forminputbyuser)
                        } else{
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
        alert("Unable to generate quotation number");
        hideLoader();
    });

    //self.showLoader();
    // hitPremiumCaclService('getPremiumSmartPowerInsurance', '', '', userID,userMail, userMobile, userAuth).then((data) => {
    //         console.log(data);
    //     }).catch((reject) => {
    //         console.log(reject);
    //     });
}

function getInput(forminputbyuser) {
    var inputVal = "";

    inputVal += "<?xml version='1.0' encoding='utf-8' ?><smartWomenAdvantageBean>";
    inputVal += `<LifeAssured_title>${self.getTitle()}</LifeAssured_title>`;
    inputVal += `<LifeAssured_firstName>${self.FName()}</LifeAssured_firstName>`;
    inputVal += `<LifeAssured_middleName>${self.MName()}</LifeAssured_middleName>`;
    inputVal += `<LifeAssured_lastName>${self.LName()}</LifeAssured_lastName>`;
    inputVal += `<LifeAssured_DOB>${forminputbyuser.dob}</LifeAssured_DOB>`
    inputVal += `<LifeAssured_age>${forminputbyuser.age}</LifeAssured_age>`;
    inputVal += `<gender>${forminputbyuser.gender}</gender>`;

    inputVal += `<proposer_title></proposer_title>`;
    inputVal += `<proposer_firstName></proposer_firstName>`;
    inputVal += `<proposer_middleName></proposer_middleName>`;
    inputVal += `<proposer_lastName></proposer_lastName>`;
    inputVal += `<proposer_DOB></proposer_DOB>`;
    inputVal += `<proposer_age></proposer_age>`;
    inputVal += `<proposer_gender></proposer_gender>`;

    inputVal += `<product_name>${forminputbyuser.planName}</product_name>`;
    inputVal += `<product_Code>${product_code}</product_Code>`;
    inputVal += `<product_UIN>${product_uin}</product_UIN>`;
    inputVal += `<product_cateogory>${product_cateogory}</product_cateogory>`;
    inputVal += `<product_type>${product_type}</product_type>`

    inputVal += `<proposer_Is_Same_As_Life_Assured>Y</proposer_Is_Same_As_Life_Assured>`;

    inputVal += `<isJKResident>false</isJKResident>`;
    inputVal += `<isStaff>false</isStaff>`;
    inputVal += `<isSmoker>false</isSmoker>`;
    inputVal += `<age>${forminputbyuser.age}</age>`;
    inputVal += `<gender>${forminputbyuser.gender}</gender>`;
    inputVal += `<plan>${forminputbyuser.planName}</plan>`;

    inputVal += `<policyTerm>${forminputbyuser.premiumPayingTerm}</policyTerm>`;
    inputVal += `<criticalIllnesOpt>${forminputbyuser.samf}</criticalIllnesOpt>`;

    inputVal += `<premFreq>${forminputbyuser.premiumFrequency}</premFreq>`;
    inputVal += `<sumAssured>${forminputbyuser.sumAssured}</sumAssured>`;
    inputVal += `<critiSumAssured>${forminputbyuser.critiSumAssured}</critiSumAssured>`;
    inputVal += `<apcSumAssured>${forminputbyuser.apcSumAssured}</apcSumAssured>`;
    inputVal += `<isAPCnCAoption>${forminputbyuser.isAPCnCAoption}</isAPCnCAoption>`;

    inputVal += `<Product_Cat></Product_Cat>`;

    inputVal += `</smartWomenAdvantageBean>`;
    let escapedHTML = escapeInputHTML(inputVal);
    sessionStorage.setItem("BIInput", escapedHTML);
    return inputVal;
}