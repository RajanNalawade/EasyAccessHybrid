window.onload = function () {
    this.ready();
    // self.hideLoader();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails, policyTermElement, premiumFrequencyListElement, ptaRiderTermList, spnr_bi_Matuirty_option,
    spnr_bi_Matuirty_frequency;
var proposer_Is_Same_As_Life_Assured = "Y";

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    setKerlaDiscount();
    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    this.initializeData()
    this.initArrayList();
};

//function getQueryStringDesializedData() {
//    var queryString = decodeURIComponent(window.location.search);
//    queryString = queryString.substring(1);
//    var queries = queryString.split("&");
//    return JSON.parse(queries[0].split("product=").pop());
//}

function initializeData() {
    // document.forms["saralPensionForm"]["dob"].value = (new Date()).toISOString().substr(0, 10);

    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
}

function initArrayList() {

    policyTermElement = document.forms["saralPensionForm"]["policyTerm"];
    for (i = minPolicyTermLimit; i <= maxPolicyTermLimit; i++) {
        policyTermElement.add(new Option(i));
    }

    premiumFrequencyListElement = document.forms["saralPensionForm"]["premiumFrequency"];
    for (i = 0; i < premiumFrequencyList.length; i++) {
        premiumFrequencyListElement.add(new Option(premiumFrequencyList[i].title, premiumFrequencyList[i].value));
    }

    ptaRiderTermList = document.forms["saralPensionForm"]["ptaRiderTerm"];
    for (i = minPtrTermLimit; i <= maxPtrTermLimit; i++) {
        ptaRiderTermList.add(new Option(i, i));
    }

    spnr_bi_Matuirty_option = document.forms["saralPensionForm"]["spnr_bi_Matuirty_option"];
    for (i = 0; i < MaturityOption_list.length; i++) {
        spnr_bi_Matuirty_option.add(new Option(MaturityOption_list[i].title, MaturityOption_list[i].value));
    }
    spnr_bi_Matuirty_frequency = document.forms["saralPensionForm"]["spnr_bi_Matuirty_frequency"];
    for (i = 0; i < MaturityFrequency_list.length; i++) {
        spnr_bi_Matuirty_frequency.add(new Option(MaturityFrequency_list[i].title, MaturityFrequency_list[i].value));

    }
}

function onCheckPTARider() {

    if (document.forms["saralPensionForm"]["is_pta_rider"].checked) {
        document.getElementById("termPTABlock").style.display = "block";
        document.getElementById("termPTASumAssured").style.display = "block";
        document.forms['saralPensionForm']['ptaSumAssured'].required = true;
    } else {
        document.getElementById("termPTABlock").style.display = "none";
        document.getElementById("termPTASumAssured").style.display = "none";
        document.forms['saralPensionForm']['ptaSumAssured'].value = "";
        document.forms['saralPensionForm']['ptaSumAssured'].required = false;
    }
}

function getNameTitle() {
    return document.forms["saralPensionForm"]["selectTitle"].value;
}

function getFName() {
    return document.forms["saralPensionForm"]["first_name"].value;
}

function getMName() {
    return document.forms["saralPensionForm"]["middle_name"].value;
}

function getLName() {
    return document.forms["saralPensionForm"]["last_name"].value;
}

function getStaffDisc() {

    var staffValue = document.forms["saralPensionForm"]['staff_discount'].checked;
    return staffValue;
}

function getCalculatedAge() {
    return parseInt(document.forms["saralPensionForm"]['age'].value, 10);
}

function getGender() {
    return document.forms["saralPensionForm"]["gender"].value;
}

function getEmail() {
    return document.forms["saralPensionForm"]['email'].value;
}

function getDOB() {
    return document.forms["saralPensionForm"]['dob'].value;
}

function getConfirmEmail() {
    return document.forms["saralPensionForm"]['confirmEmail'].value;
}

function getMobileNo() {
    return document.forms["saralPensionForm"]['mobile'].value;
}

function getPolicyTerm() {
    return parseInt(document.forms["saralPensionForm"]['policyTerm'].value, 10);
}

function getPremiumFrequency() {
    let index = document.forms["saralPensionForm"]["premiumFrequency"].value;
    return premiumFrequencyList[index - 1].title;
}

function getSumAssured() {
    return parseInt(document.forms["saralPensionForm"]['sumAssured'].value, 10);
}

function getPTARider() {

    var ptaRider = document.forms["saralPensionForm"]['is_pta_rider'].checked;
    return ptaRider;
}

function getPreferedTermRider() {
    if (this.getPTARider() == true) {
        return document.forms["saralPensionForm"]["ptaRiderTerm"].value;
    } else {
        return 0;
    }
}

function getRiderSumAssured() {
    if (this.getPTARider() == true) {
        return parseInt(document.forms["saralPensionForm"]['ptaSumAssured'].value, 10);
    } else {
        return 0;
    }
}

function getMaturityAnnuityFrequency() {
    let index = document.forms["saralPensionForm"]["spnr_bi_Matuirty_frequency"].value;
    return MaturityFrequency_list[index].title;
}

function getMaturityAnnuityOption() {
    let index = document.forms["saralPensionForm"]["spnr_bi_Matuirty_option"].value;
    return MaturityOption_list[index].title;
}

function validateGender() {

    var laGender = document.forms["saralPensionForm"]["gender"].value;

    document.forms["saralPensionForm"]["selectTitle"].options[0].disabled = false;
    document.forms["saralPensionForm"]["selectTitle"].options[1].disabled = false;
    document.forms["saralPensionForm"]["selectTitle"].options[2].disabled = false;

    if (laGender === "Male") {
        document.forms["saralPensionForm"]["selectTitle"].value = "Mr.";
        document.forms["saralPensionForm"]["selectTitle"].options[1].disabled = true;
        document.forms["saralPensionForm"]["selectTitle"].options[2].disabled = true;
    } else if (laGender === "Female") {
        document.forms["saralPensionForm"]["selectTitle"].value = "Mrs.";
        document.forms["saralPensionForm"]["selectTitle"].options[0].disabled = true;
    } else {
        document.forms["saralPensionForm"]["selectTitle"].value = "Mr.";
        document.forms["saralPensionForm"]["selectTitle"].options[0].disabled = false;
        document.forms["saralPensionForm"]["selectTitle"].options[1].disabled = false;
        document.forms["saralPensionForm"]["selectTitle"].options[2].disabled = false;
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

function validatePolicyTerm() {
    var minTerm = 0,
        maxTerm = 0;

    if (this.getPremiumFrequency() == "Single") {
        minTerm = Math.max(5, (40 - this.getCalculatedAge()));
    } else {
        minTerm = Math.max(10, (40 - this.getCalculatedAge()));
    }

    maxTerm = Math.min(40, (70 - this.getCalculatedAge()));

    if (this.getPolicyTerm() < minTerm ||
        this.getPolicyTerm() > maxTerm) {

        document.getElementById('maturityAgeErrId').style.display = "block";
        document.getElementById('maturityAgeErrId').innerHTML = "Enter Policy Term between " + minTerm + " and " + maxTerm;

        return false;
    } else {
        document.getElementById('maturityAgeErrId').style.display = "none";
        return true;
    }

}

function calculateAge(birthday) {
    var age = this.getAgeFromBirthdate(birthday);
    document.forms["saralPensionForm"]["age"].innerHTML = age;
    document.forms["saralPensionForm"]["age"].value = age;
    var minAgeLimit = 18;
    console.log("premiumFrequencyListElement.title:", getPremiumFrequency())
    if (getPremiumFrequency() == "Single") {
        maxAgeLimit = 65;
    } else {
        maxAgeLimit = 60;
    }
    if (age < minAgeLimit || age > maxAgeLimit) {
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        return false;
    } else {
        document.getElementById('ageErrId').style.display = "none";
        return true;
    }
}

function validateSumAssured() {
    var minSA = 100000;
    var sumAssured = this.getSumAssured();
    if (isNaN(sumAssured) || sumAssured === undefined || sumAssured === null || sumAssured === '') {
        document.getElementById('sumAssuredErrKeyId').style.display = "block";
        document.getElementById('sumAssuredErrKeyId').innerHTML = 'Please enter sum assured.';
        return false;
    } else if (sumAssured % 1000 != 0) {
        document.getElementById('sumAssuredErrKeyId').style.display = "block";
        document.getElementById('sumAssuredErrKeyId').innerHTML = `Sum Assured should be in multiples of ${new Intl.NumberFormat('en-IN').format(1000)}.`;
        return false;
    } else if (sumAssured < minSA) {
        document.getElementById('sumAssuredErrKeyId').style.display = "block";
        document.getElementById('sumAssuredErrKeyId').innerHTML = `Sum Assured should not be less than ${new Intl.NumberFormat('en-IN').format(minSA)}`;
        return false;
    } else {
        document.getElementById('sumAssuredErrKeyId').style.display = "none";
        return true;
    }
}

function validateRiderTerm() {
    let minRiderTerm = 0,
        maxRiderTerm = 0;
    if (this.getPTARider() == true) {
        if (this.getPremiumFrequency() == "Single") {
            minRiderTerm = 5;
        } else {
            minRiderTerm = 10;
        }
        // console.log(minRiderTerm)
        maxRiderTerm = Math.min(30, Math.min(this.getPolicyTerm()), (60 - Number(this.getCalculatedAge())));

        // console.log(maxRiderTerm)
        // console.log(this.getPreferedTermRider())
        if (this.getPreferedTermRider() < minRiderTerm || this.getPreferedTermRider() > maxRiderTerm) {
            document.getElementById('ptaRiderTermErrId').style.display = "block";
            document.getElementById('ptaRiderTermErrId').innerHTML = `Enter Rider Term between ${minRiderTerm} to ${maxRiderTerm}.`;
            return false;
        } else {
            document.getElementById('ptaRiderTermErrId').style.display = "none";
            return true;
        }
    }
    return true;

}

function valRiderSA() {
    let minRiderLimit, maxRiderLimit;
    if (this.getPTARider() == true) {
        minRiderLimit = 25000;
        maxRiderLimit = Math.min(5000000, this.getSumAssured());
        if (this.getRiderSumAssured() == "") {
            document.getElementById('ptaSumAssuredErrId').style.display = "block";
            document.getElementById('ptaSumAssuredErrId').innerHTML = `Please enter Preferred Term Rider Sum Assured in Rs. `;
            return false;
        } else if (this.getRiderSumAssured() % 1000 != 0) {
            document.getElementById('ptaSumAssuredErrId').style.display = "block";
            document.getElementById('ptaSumAssuredErrId').innerHTML = `Enter Sum assured for Preferred Term Assurance Rider in multiples of 1,000`;
            return false;
        } else if (this.getRiderSumAssured() < minRiderLimit || this.getRiderSumAssured() > maxRiderLimit) {
            document.getElementById('ptaSumAssuredErrId').style.display = "block";
            document.getElementById('ptaSumAssuredErrId').innerHTML = `Enter Sum assured for Preferred Term Rider between ${minRiderLimit} to ${maxRiderLimit}.`;
            return false;
        } else {
            document.getElementById('ptaSumAssuredErrId').style.display = "none";
            return true;
        }
    }
    return true;
}

function valRiderMaturityAge() {
    var calcAge = this.getCalculatedAge();

    if (this.getPTARider() == true) {

        if (isNaN(calcAge) || calcAge === undefined || calcAge === null || calcAge === '') {
            return false;
        } else if (parseInt(this.getCalculatedAge()) + parseInt(this.getPreferedTermRider()) > 60) {
            document.getElementById('ptaRiderTermErrId').style.display = "block";
            document.getElementById('ptaRiderTermErrId').innerHTML = `Maximum maturity age for Preferred Term Rider is 60 years`;
            return false;
        } else {
            document.getElementById('ptaRiderTermErrId').style.display = "none";
            return true;
        }

    }
    return true;

}

function valMatuirtyFreuqency() {
    if (this.getMaturityAnnuityFrequency() == "Select Maturity Frequency") {
        document.getElementById('spnr_bi_Matuirty_frequencyErrId').style.display = "block";
        document.getElementById('spnr_bi_Matuirty_frequencyErrId').innerHTML = `Please Select Maturity Frequency`;
        return false;
    } else {
        document.getElementById('spnr_bi_Matuirty_frequencyErrId').style.display = "none";
        return true;
    }
}

function valMatuirtyOption() {
    if (this.getMaturityAnnuityOption() == "Select Maturity Option") {
        document.getElementById('spnr_bi_Matuirty_optionErrId').style.display = "block";
        document.getElementById('spnr_bi_Matuirty_optionErrId').innerHTML = `Please Select Maturity Option`;
        return false;
    } else {
        document.getElementById('spnr_bi_Matuirty_optionErrId').style.display = "none";
        return true;
    }
}

function validatForm() {
    if (saralPensionForm.checkValidity() && this.validateGender() && this.validateConfirmEmail() &&
        this.calculateAge(getDDMMYYYY(self.getDOB())) && this.validateMobileNo(self.getMobileNo()) &&
        this.validatePolicyTerm() &&
        this.validateSumAssured() && this.validateRiderTerm() &&
        this.valRiderSA() && this.valRiderMaturityAge() && this.valMatuirtyFreuqency() &&
        this.valMatuirtyOption()) {
        this.calculatePremiumAPICall(); // form valid
    }
}

function calculatePremiumAPICall() {

    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.open('POST', serviceURL + '/getPremiumSaralPension', true);

    let xmlBodyParam = ` <getPremiumSaralPension xmlns="http://tempuri.org/">
    <isStaff>${self.getStaffDisc()}</isStaff>
    <isJkResident>false</isJkResident>
    <age>${self.getCalculatedAge()}</age>
    <gender>${self.getGender()}</gender>
    <policyTerm>${self.getPolicyTerm()}</policyTerm>
    <premiumFreq>${self.getPremiumFrequency()}</premiumFreq>
    <sumAssured>${self.getSumAssured()}</sumAssured>
    <PTRider>${self.getPTARider()}</PTRider>
    <ptrTerm>${self.getPreferedTermRider()}</ptrTerm>
    <ptrSumAssured>${self.getRiderSumAssured()}</ptrSumAssured>
    <KFC>${getKerlaDiscount()}</KFC>
    <annuityOption>${self.getMaturityAnnuityOption()}</annuityOption>
  </getPremiumSaralPension>`;

    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        ${xmlBodyParam}
                    </soap:Body>
                </soap:Envelope>`;


    generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {

        let forminputbyuser = {
            isStaff: self.getStaffDisc(),
            age: self.getCalculatedAge(),
            gender: self.getGender(),
            proposerName: self.getFName() + " " + self.getLName(),
            dob: getDDMMYYYY(self.getDOB()),
            premiumFrequency: self.getPremiumFrequency(),
            premiumPayingTerm: self.getPolicyTerm(),
            sumAssured: self.getSumAssured(),
            isPTARider: self.getPTARider(),
            ptrTerm: self.getPreferedTermRider(),
            ptrSumAssured: self.getRiderSumAssured(),
            quotationNumber: quotNumber,

            PlanName: self.productDetails.title,
            CustTitle: self.getNameTitle(),
            CustFirstName: self.getFName(),
            CustMiddleName: self.getMName(),
            CustLastName: self.getLName(),
            CustMobile: self.getMobileNo(),
            CustEmailID: self.getEmail(),
            LaDOB: getDDMMYYYY(self.getDOB()),
            ProposerDOB: '',
            BasicSA: self.getSumAssured(),
            TotalPremAmt: '',
            Frequency: self.getPremiumFrequency(),
            PolicyTerm: self.getPolicyTerm(),
            PremPayingTerm: '0',
            PlanCode: 'SRPEN',
            KFC: getKerlaDiscount() ? "Y" : "N",
            userType: getUserType(),
            annuityOption: getMaturityAnnuityOption()
        };
        let input = getInput(forminputbyuser);
        //console.log("input",input);
        showLoader();
        ApiCallService('/getPremiumSaralPension', body, '<saralPension>', '</saralPension>', true).then((data) => {
            self.hideLoader();
            data = data.saralPension;
            var error = data.errCode;
            if (error != undefined && error == 1) {
                alert(data.minPremError)
                return;
            }
            forminputbyuser.TotalPremAmt = data.instalmntPremWTServcTax;
            forminputbyuser.guaranDeathBenfit1 = data.guaranDeathBenfit1;
            data.productDetails = self.productDetails;
            data.isRiderChecked = self.getPTARider();
            data.inputPolicyTerm = getPolicyTerm();
            var stringifyJson = JSON.stringify(data);

            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                var lastIndex = premiumCalcXMLResponse.indexOf(`</surrenderBenefit_8Pr${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</surrenderBenefit_8Pr${getPolicyTerm()}>`.length);
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");
                var index = forminputbyuser.PolicyTerm;
                var nonGuaranVestingBenefit_4Percent_tag = parseXmlTag(premiumCalcXMLResponse, "nonGuaranVestingBenefit_4Percent" + index + "");
                var nonGuaranVestingBenefit_8Percent_tag = parseXmlTag(premiumCalcXMLResponse, "nonGuaranVestingBenefit_8Percent" + index + "");
                var nonGuaranVestingBenefit = ''
                nonGuaranVestingBenefit = "<nonGuaranVestingBenefit_4Percent" + index + ">" + nonGuaranVestingBenefit_4Percent_tag + "</nonGuaranVestingBenefit_4Percent" + index + ">";
                nonGuaranVestingBenefit += "<nonGuaranVestingBenefit_8Percent" + index + ">" + nonGuaranVestingBenefit_8Percent_tag + "</nonGuaranVestingBenefit_8Percent" + index + ">";
                remaningOutput = remaningOutput + nonGuaranVestingBenefit + "</SaralPension>";
                remaningOutput = remaningOutput.replace("saralPension", "SaralPension");

                let escapedBIOutput = escapeInputHTML("<?xml version='1.0' encoding='utf-8' ?>" + remaningOutput);
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
                    //  createPDFGeneralMethod(this.productDetails, data, forminputbyuser)
                } else if (status === 'No') {
                    sessionStorage.setItem("premiumCalcResponse", stringifyJson);
                    window.location.href = "./../../PremiumCalSuccess/success.html";
                }
            }
        }).catch((error) => {
            console.log(" in error ", error);
            self.hideLoader();
        });

    }).catch((message) => {
        alert("Unable to generate quotation number");
        hideLoader();
    });
}

function getInput(forminputbyuser) {
    var inputVal = "";
    inputVal += `<?xml version='1.0' encoding='utf-8' ?><saralPensionBean>`;
    inputVal += `<LifeAssured_title>${self.getNameTitle()}</LifeAssured_title>`;
    inputVal += `<LifeAssured_firstName>${self.getFName()}</LifeAssured_firstName>`;
    inputVal += `<LifeAssured_middleName>${self.getMName()}</LifeAssured_middleName>`;
    inputVal += `<LifeAssured_lastName>${self.getLName()}</LifeAssured_lastName>`;
    inputVal += `<LifeAssured_DOB>${convertDate(self.getDOB())}</LifeAssured_DOB>`;
    inputVal += `<LifeAssured_age>${self.getCalculatedAge()}</LifeAssured_age>`;
    inputVal += `<gender>${self.getGender()}</gender>`;

    inputVal += `<proposer_title></proposer_title>`;
    inputVal += `<proposer_firstName></proposer_firstName>`;
    inputVal += `<proposer_middleName></proposer_middleName>`;
    inputVal += `<proposer_lastName></proposer_lastName>`;
    inputVal += `<proposer_DOB></proposer_DOB>`;
    inputVal += `<proposer_age></proposer_age>`;
    inputVal += `<proposer_gender></proposer_gender>`;

    inputVal += `<product_name>${product_name}</product_name>`;
    /* parivartan changes */
    inputVal += `<product_Code>${product_code}</product_Code>`;
    inputVal += `<product_UIN>${product_uin}</product_UIN>`;
    inputVal += `<product_cateogory>${product_cateogory}</product_cateogory>`;
    inputVal += `<product_type>${product_type}</product_type>`;
    /* end */
    inputVal += `<proposer_Is_Same_As_Life_Assured>${proposer_Is_Same_As_Life_Assured}</proposer_Is_Same_As_Life_Assured>`;
    inputVal += `<isStaff>${self.getStaffDisc()}</isStaff>`;
    inputVal += `<age>${self.getCalculatedAge()}</age>`;
    inputVal += `<isJKResident>false</isJKResident>`;
    inputVal += `<premFreqMode>${forminputbyuser.premiumFrequency}</premFreqMode>`;

    inputVal += `<policyTerm>${forminputbyuser.premiumPayingTerm}</policyTerm>`;
    inputVal += `<premiumAmount>${forminputbyuser.sumAssured}</premiumAmount>`;

    inputVal += `<isPTRRider>${forminputbyuser.isPTARider}</isPTRRider>`;
    inputVal += `<ptrTerm>${forminputbyuser.isPTARider ? forminputbyuser.ptrTerm : '0'}</ptrTerm>`;
    inputVal += `<ptrSA>${forminputbyuser.isPTARider ? forminputbyuser.ptrSumAssured : '0'}</ptrSA>`;
    inputVal += `<KFC>${forminputbyuser.KFC}</KFC>`;
    inputVal += "<MATUIRTY_OPTION>" + getMaturityAnnuityOption() + "</MATUIRTY_OPTION>";
    inputVal += "<MATUIRTY_FREQUENCY>" + getMaturityAnnuityFrequency() + "</MATUIRTY_FREQUENCY>";
    inputVal += `</saralPensionBean>`;
    let escapedHTML = escapeInputHTML(inputVal);
    sessionStorage.setItem("BIInput", escapedHTML);
    return inputVal;
}