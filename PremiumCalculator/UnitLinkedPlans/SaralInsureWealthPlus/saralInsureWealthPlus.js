var serviceName = "getPremiumSaralInsuretWealthPlus"
window.onload = function () {
    this.ready();
    setKerlaDiscount();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails, policyTermElement, premiumFrequencyElement, isProposerSameAsLifeAssured;
var lifeAssuredTitle, proposerTitle, lifeAssuredGender, proposerGender, lifeAssuredFirstName,
    lifeAssuredMiddleName, lifeAssuredLastName, proposerFirstName, proposerMiddleName, proposerLastName,
    premiumAmount, lifeAssuredAge, policyTerm;
var equityFund, equityOptFund, growthFund, balancedFund, pureFund, midcapFund, BondOptimiser, corpBond;
/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    // self.showLoader();
    proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
    for (i = 0; i < proposerBlocks.length; i++) {
        proposerBlocks[i].style.display = "none";
    }

    var isViewSFINFundsChecked = document.forms["saralInsureWealthPlusForm"]["viewSFINFUnds"].checked;
    document.getElementById('isToSFINFunds').style.display = "none";


    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    this.initializeData()
    this.initArrayList();
    // self.hideLoader();
};

function initializeData() {
    var todayDate;

    plan = document.forms["saralInsureWealthPlusForm"]["plan"];
    plan.value = "Regular"
    plan.disabled = true;

    premiumPaymentMode = document.forms["saralInsureWealthPlusForm"]["premiumPaymentMode"];
    premiumPaymentMode.value = "Monthly"
    premiumPaymentMode.disabled = true;

    lifeAssuredAge = 35
    isProposerSameAsLifeAssured = true;
    todayDate = new Date();
    todayDate.setFullYear(todayDate.getFullYear() - 35);

    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;

}

function initArrayList() {

    policyTermElement = document.forms["saralInsureWealthPlusForm"]["policyTerm"];
    for (i = 0; i < policyTerm.length; i++) {
        policyTermElement.add(new Option(policyTerm[i].title));
    }
}


function calculateAge(birthday) {
    lifeAssuredAge = getAgeFromBirthdate(getDDMMYYYY(birthday));
    document.forms["saralInsureWealthPlusForm"]["age"].innerHTML = lifeAssuredAge;
    document.forms["saralInsureWealthPlusForm"]["age"].value = lifeAssuredAge;


    if (lifeAssuredAge > minAgeLimit && lifeAssuredAge < 18) {
        proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
        for (i = 0; i < proposerBlocks.length; i++) {
            proposerBlocks[i].style.display = "block";
        }
        isProposerSameAsLifeAssured = false;
        var todayDate = new Date();
        todayDate.setFullYear(todayDate.getFullYear() - 35);
        //document.forms["saralInsureWealthPlusForm"]["proposer_dob"].value = formatDates(todayDate.toISOString().substr(0, 10));
        //document.forms["saralInsureWealthPlusForm"]["proposer_age"].value = getAgeFromBirthdate(self.getProposerDOB());
    } else {
        isProposerSameAsLifeAssured = true;
        proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
        for (i = 0; i < proposerBlocks.length; i++) {
            proposerBlocks[i].style.display = "none";
        }
    }


    if (lifeAssuredAge < minAgeLimit || lifeAssuredAge > maxAgeLimit) {
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        return false;
    } else {
        document.getElementById('ageErrId').style.display = "none";
        return true;

    }
}

function calculateProposerAge(dob) {
    if (isProposerSameAsLifeAssured) {
        return true;
    } else {
        proposerAge = getAgeFromBirthdate(getDDMMYYYY(dob))
        document.forms["saralInsureWealthPlusForm"]["proposer_age"].innerHTML = proposerAge;
        document.forms["saralInsureWealthPlusForm"]["proposer_age"].value = proposerAge;
        if (proposerAge < 18) {
            document.getElementById('proposerageErrId').style.display = "block";
            document.getElementById('proposerageErrId').innerHTML = `Minimum Age should be 18 Years.`;
            return false;
        } else {
            document.getElementById('proposerageErrId').style.display = "none";
            return true;
        }
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
    var planSelected = planList[planValue];
    //console.log(planValue + " : planSelected:" + planSelected.policyTerm);

    policyTermElement.value = planSelected.policyTerm;
    premiumPayingTermElement.value = planSelected.premiumPayingTerm;
}


function getPlan() {
    return planValue = document.forms["saralInsureWealthPlusForm"]["plan"].value
    // return planTypeList[planValue];
}

/* ******************************  FORM VALIDATION & SUBMIT **************************** */


function validatForm() {


    lifeAssuredTitle = getLifeAssuredTitle();
    proposerTitle = getProposerTitle();
    lifeAssuredFirstName = getLifeAssuredFirstName();
    lifeAssuredMiddleName = getLifeAssuredMiddleName();
    lifeAssuredLastName = getLifeAssuredLastName();
    proposerFirstName = getProposerFirstName();
    proposerMiddleName = getProposerMiddleName();
    proposerLastName = getProposerLastName();
    policyTerm = getPolicyTerm();
    //console.log("policyTerm:" + policyTerm)
    premiumAmount = getPremiumAmount();
    // added maturityage,lifeassured age, proposer age conditions (Bharamu)
    if (saralInsureWealthPlusForm.checkValidity() && self.validateGender("") &&
        this.validateConfirmEmail() && self.calculateAge(self.getDOB()) &&
        this.validateProposerDetail() && self.calculateProposerAge(self.getProposerDOB()) &&
        this.validatePremiumAmount() && validateMaturityAge() && this.valTotalAllocation()) {
        this.calculatePremiumAPICall(); // form valid
    }

}

function validateLifeAssuredProposer() {
    if (isProposerSameAsLifeAssured) {

        if ((lifeAssuredTitle == "Mr." && lifeAssuredGender == "Female") ||
            (lifeAssuredTitle == "Ms." && lifeAssuredGender == "Male") ||
            (lifeAssuredTitle == "Mrs." && lifeAssuredGender == "Male")) {
            alert(lifeassuredGenderTitleWarning);
            // apply focusable method
            return false;
        } else {
            return true;
        }
    } else {

        if ((lifeAssuredTitle == "Mr." && lifeAssuredGender == "Female") ||
            (lifeAssuredTitle == "Ms." && lifeAssuredGender == "Male") ||
            (lifeAssuredTitle == "Mrs." && lifeAssuredGender == "Male")) {
            alert(lifeassuredGenderTitleWarning);
            // apply focusable method
            return false;
        } else if ((proposerTitle == "Mr." && proposerGender == "Female") ||
            (proposerTitle == "Ms." && proposerGender == "Male") ||
            (proposerTitle == "Mrs." && proposerGender == "Male")) {
            alert(proposerGenderTitleWarning);
            // apply focusable method
            return false;
        } else {
            return true;
        }
    }
}

function validateProposerDetail() {
    if (!isProposerSameAsLifeAssured) {
        if (isEmpty(proposerFirstName) || isEmpty(proposerLastName)) {
            alert(proposerDetailWarning)
            return false;
        }
    }

    return true;
}

function validatePremiumAmount() {
    var premiumAmount = this.getPremiumAmount();

    var minPremiumAmt = 8000;
    if ((premiumAmount % 100) !== 0) {
        document.getElementById('premiumAmtErrId').style.display = 'block';
        document.getElementById('premiumAmtErrId').innerHTML = 'Premium Amount should be multiple of 100.';
        return false;
    } else {
        if (premiumAmount < minPremiumAmt) {
            document.getElementById('premiumAmtErrId').style.display = 'block';
            document.getElementById('premiumAmtErrId').innerHTML = "Enter Minimum Premium Amount of Rs." + minPremiumAmt;
            return false;
        } else {
            document.getElementById('premiumAmtErrId').style.display = 'none';
            return true;
        }
    }
}

function validateMaturityAge() {


    var maturityAge = (Number(lifeAssuredAge) + Number(policyTerm));

    //console.log("lifeAssuredAge:" + lifeAssuredAge + " PolicyTerm:" + policyTerm + " maturityAge:" + maturityAge)
    if (maturityAge > 65) {
        alert("Max. Maturity age allowed is 65 years");
        return false;
    } else if (maturityAge < 18) {
        alert("Min. Maturity age allowed is 18 years");
        return false;
    }
    return true;
}

// Addition of invested fund mub be 100%
function valTotalAllocation() {

    equityFund = document.forms["saralInsureWealthPlusForm"]["equityFund"].value
    if (isEmpty(equityFund)) {
        equityFund = 0
    }

    equityOptFund = document.forms["saralInsureWealthPlusForm"]["equityoptimiserFund"].value
    if (isEmpty(equityOptFund)) {
        equityOptFund = 0
    }

    growthFund = document.forms["saralInsureWealthPlusForm"]["growthFund"].value
    if (isEmpty(growthFund)) {
        growthFund = 0
    }

    balancedFund = document.forms["saralInsureWealthPlusForm"]["balancedFund"].value
    if (isEmpty(balancedFund)) {
        balancedFund = 0
    }

    pureFund = document.forms["saralInsureWealthPlusForm"]["pureFund"].value
    if (isEmpty(pureFund)) {
        pureFund = 0
    }

    midcapFund = document.forms["saralInsureWealthPlusForm"]["midCapFund"].value
    if (isEmpty(midcapFund)) {
        midcapFund = 0
    }

    BondOptimiser = document.forms["saralInsureWealthPlusForm"]["bondOptimiserFund"].value
    if (isEmpty(BondOptimiser)) {
        BondOptimiser = 0
    }

    corpBond = document.forms["saralInsureWealthPlusForm"]["corporateBondFund"].value
    if (isEmpty(corpBond)) {
        corpBond = 0
    }

    var sumOfAllFund = Number(equityFund) + Number(equityOptFund) + Number(growthFund) + Number(balancedFund) + Number(pureFund) +
        Number(midcapFund) + Number(BondOptimiser) + Number(corpBond);

    //console.log("sumOfAllFund:" + sumOfAllFund)

    if (sumOfAllFund != 100) {
        alert("Total sum of % to be invested for all fund should be equal to 100%");
        return false;
    } else {
        return true;
    }
}

function formatDates(date) {
    var arrDate = date.split("-");

    if (arrDate != null) {
        return arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];
    }
}

function onViewSFINFundsUpdate() {
    var isViewSFINFundsChecked = document.forms["saralInsureWealthPlusForm"]["viewSFINFUnds"].checked;
    if (isViewSFINFundsChecked) {
        document.getElementById('isToSFINFunds').style.display = "block";
    } else {
        document.getElementById('isToSFINFunds').style.display = "none";
    }
}

/* ***********************   GETTERS ************************* */

function getStaff_discount() {
    return document.forms["saralInsureWealthPlusForm"]["staff_discount"].checked;
}

function getGender() {
    return document.forms["saralInsureWealthPlusForm"]["gender"].value;
}

function getLifeAssuredTitle() {
    return document.forms["saralInsureWealthPlusForm"]["lifeAssuredTitle"].value;
}

function getLifeAssuredFirstName() {
    return document.forms["saralInsureWealthPlusForm"]["first_name"].value;
}

function getLifeAssuredMiddleName() {
    return document.forms["saralInsureWealthPlusForm"]["middle_name"].value;
}

function getLifeAssuredLastName() {
    return document.forms["saralInsureWealthPlusForm"]["last_name"].value;
}

function getDOB() {
    return document.forms["saralInsureWealthPlusForm"]["dob"].value;
}

function getAge() {
    return parseInt(document.forms["saralInsureWealthPlusForm"]["age"].value, 10);
}

function getMobileNo() {
    return document.forms["saralInsureWealthPlusForm"]["mobile"].value;
}

function getProposerTitle() {
    return document.forms["saralInsureWealthPlusForm"]["proposerTitle"].value;
}

function getProposerFirstName() {
    return document.forms["saralInsureWealthPlusForm"]["proposer_first_name"].value;
}

function getProposerMiddleName() {
    return document.forms["saralInsureWealthPlusForm"]["proposer_middle_name"].value;
}

function getProposerLastName() {
    return document.forms["saralInsureWealthPlusForm"]["proposer_last_name"].value;
}

function getProposerDOB() {
    return document.forms["saralInsureWealthPlusForm"]["proposer_dob"].value;
}

function getProposerAge() {
    return parseInt(document.forms["saralInsureWealthPlusForm"]["proposer_age"].value, 10);
}

function getProposerGender() {
    return document.forms["saralInsureWealthPlusForm"]["proposerGender"].value;
}

function getEmail() {
    return document.forms["saralInsureWealthPlusForm"]["email"].value;
}

function getConfirmEmail() {
    return document.forms["saralInsureWealthPlusForm"]["confirmEmail"].value;
}

function getPolicyTerm() {
    var returnValue = document.forms["saralInsureWealthPlusForm"]["policyTerm"].value;
    return returnValue;
}

function getPremiumPaymentMode() {
    var returnValue = document.forms["saralInsureWealthPlusForm"]["premiumPaymentMode"].value;
    return returnValue;
}

function getPremiumAmount() {
    return parseInt(document.forms["saralInsureWealthPlusForm"]["premiumAmount"].value, 10);
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
};

function getInput(forminputbyuser) {
    let getInputXML = `<?xml version='1.0' encoding='utf-8' ?><SaralInsureWealthPlus>
    <LifeAssured_title>${this.getLifeAssuredTitle()}</LifeAssured_title>
    <LifeAssured_firstName>${this.getLifeAssuredFirstName()}</LifeAssured_firstName>
    <LifeAssured_middleName>${this.getLifeAssuredMiddleName()}</LifeAssured_middleName>
    <LifeAssured_lastName>${this.getLifeAssuredLastName()}</LifeAssured_lastName>
    <LifeAssured_DOB>${getDDMMYYYY(this.getDOB())}</LifeAssured_DOB>
    <LifeAssured_age>${this.getAge()}</LifeAssured_age>

    <proposer_title>${this.getAge() < 18 ? this.getProposerTitle() : ''}</proposer_title>
    <proposer_firstName>${this.getAge() < 18 ? this.getProposerFirstName() : ''}</proposer_firstName>
    <proposer_middleName>${this.getAge() < 18 ? this.getProposerMiddleName() : ''}</proposer_middleName>
    <proposer_lastName>${this.getAge() < 18 ? this.getProposerLastName() : ''}</proposer_lastName>
    <proposer_DOB>${this.getAge() < 18 ? this.getProposerDOB() : ''}</proposer_DOB>
    <proposer_age>${this.getAge() < 18 ? this.getProposerAge() : ''}</proposer_age>
    <proposer_gender>${this.getAge() < 18 ? this.getProposerGender() : ''}</proposer_gender>
    <str_kerla_discount>${getKerlaDiscount()?"Yes":"No"}</str_kerla_discount>
    <proposer_Is_Same_As_Life_Assured>${isProposerSameAsLifeAssured ? 'y' : 'n'}</proposer_Is_Same_As_Life_Assured>
    <isStaff>${self.getStaff_discount()}</isStaff>
    <age>${this.getAge()}</age>
    <gender>${this.getGender()}</gender>
    <gender_proposer>${this.getProposerGender()}</gender_proposer>
    <plan>Regular</plan>
    <premFreqMode>Monthly</premFreqMode>
    <proposerAge>${this.getProposerAge()}</proposerAge>
    <policyTerm>${this.getPolicyTerm()}</policyTerm>
    <premiumAmount>${this.getPremiumAmount()}</premiumAmount>
    <perInvEquityFund>${this.equityFund}</perInvEquityFund>
    <perInvEquityOptimiserFund>${this.equityOptFund}</perInvEquityOptimiserFund>
    <perInvgrowthFund>${this.growthFund}</perInvgrowthFund>
    <perInvBalancedFund>${this.balancedFund}</perInvBalancedFund>
    <perInvPureFund>${this.pureFund}</perInvPureFund>
    <perInvMidCapFund>${this.midcapFund}</perInvMidCapFund>
    <perInvBondOptimiser>${this.BondOptimiser}</perInvBondOptimiser>
    <perInvCorpBondFund>${this.corpBond}</perInvCorpBondFund>
    <Product_Cat></Product_Cat>

    <product_name>${this.productDetails.title}</product_name>
    <product_Code>${this.productDetails.productCode}</product_Code>
    <product_UIN>${this.productDetails.uinNumber}</product_UIN>
    <product_cateogory>${product_cateogory}</product_cateogory>
    <product_type>${product_type}</product_type>
    <KFC>${forminputbyuser.KFC}</KFC>
  </SaralInsureWealthPlus>`;

    let escapedHTML = escapeInputHTML(getInputXML);
    sessionStorage.setItem("BIInput", escapedHTML);
    //console.log(getInputXML);
    return getInputXML;
}

function calculatePremiumAPICall() {

    let xmlBodyParam = `<` + serviceName + ` xmlns="http://tempuri.org/">
      <isStaff>${self.getStaff_discount()}</isStaff>
      <KFC>${getKerlaDiscount()}</KFC>
      <isJKResident>false</isJKResident>
      <age>${self.getAge()}</age>
      <gender>${self.getGender()}</gender>
      <plan>Regular</plan>
      <premFreqMode>Monthly</premFreqMode>
      <proposerAge>${self.getProposerAge()}</proposerAge>
      <policyTerm>${self.getPolicyTerm()}</policyTerm>
      <premiumAmount>${self.getPremiumAmount()}</premiumAmount>

      <perInvEquityFund>${self.equityFund}</perInvEquityFund>
      <perInvEquityOptimiserFund>${self.equityOptFund}</perInvEquityOptimiserFund>
      <perInvgrowthFund>${self.growthFund}</perInvgrowthFund>
      <perInvBalancedFund>${self.balancedFund}</perInvBalancedFund>
      <PureFund>${self.pureFund}</PureFund>
      <MidCapFund>${self.midcapFund}</MidCapFund>
      <BondOptimiser>${self.BondOptimiser}</BondOptimiser>
       <CorpBond>${self.corpBond}</CorpBond>

    </` + serviceName + `>`;

    //console.log("input:" + xmlBodyParam)

    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        ${xmlBodyParam}
                    </soap:Body>
                </soap:Envelope>`;

    generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {
        let staffDiscount = "",
            staffRebate = "",
            staffStatus = "";
        if (self.getStaff_discount()) {
            staffDiscount = "Yes";
            staffRebate = "0.06"
            staffStatus = "sbi"
        } else {
            staffDiscount = "No";
            staffRebate = "0.00"
            staffStatus = "none"
        }

        if (this.getAge() < 18) {
            forminputbyuser = {
                proposerName: self.getProposerTitle() + " " + self.getProposerFirstName().trim() + " " +
                    self.getProposerMiddleName().trim() + " " + self.getProposerLastName().trim(),
                lifeAssuredName: self.getLifeAssuredTitle() + " " + self.getLifeAssuredFirstName().trim() +
                    " " + self.getLifeAssuredMiddleName().trim() + " " + self.getLifeAssuredLastName().trim(),
                age: self.getProposerAge(),
                ProposerDOB: getDDMMYYYY(self.getProposerDOB()),
                gender: self.getProposerGender()
            };
        } else {
            forminputbyuser = {
                proposerName: self.getLifeAssuredTitle() + " " + self.getLifeAssuredFirstName() + " " + self.getLifeAssuredMiddleName() + " " + self.getLifeAssuredLastName(),
                lifeAssuredName: self.getLifeAssuredTitle() + " " + self.getLifeAssuredFirstName() + " " + self.getLifeAssuredMiddleName() + " " + self.getLifeAssuredLastName(),
                age: self.getAge(),
                gender: self.getGender(),
                ProposerDOB: ""
            };
        }

        forminputbyuser.premiumAmount = self.getPremiumAmount(),
            forminputbyuser.planOption = self.getPlan(),
            forminputbyuser.policyTerm = self.getPolicyTerm(),
            forminputbyuser.PlanName = self.productDetails.title,
            forminputbyuser.premiumPaymentMode = self.getPremiumPaymentMode(),
            forminputbyuser.CustTitle = self.getLifeAssuredTitle(),
            forminputbyuser.CustFirstName = self.getLifeAssuredFirstName(),
            forminputbyuser.CustMiddleName = self.getLifeAssuredMiddleName(),
            forminputbyuser.CustLastName = self.getLifeAssuredLastName(),
            forminputbyuser.CustMobile = self.getMobileNo(),
            forminputbyuser.CustEmailID = self.getEmail(),
            forminputbyuser.LaDOB = getDDMMYYYY(self.getDOB()),
            forminputbyuser.TotalPremAmt = self.getPremiumAmount(),
            forminputbyuser.Frequency = self.getPremiumPaymentMode(),
            forminputbyuser.PolicyTerm = self.getPolicyTerm(),
            forminputbyuser.PremPayingTerm = self.getPolicyTerm(),
            forminputbyuser.equityFund = self.equityFund,
            forminputbyuser.equityOptFund = self.equityOptFund,
            forminputbyuser.growthFund = self.growthFund,
            forminputbyuser.balancedFund = self.balancedFund,
            forminputbyuser.pureFund = self.pureFund,
            forminputbyuser.midcapFund = self.midcapFund,
            forminputbyuser.BondOptimiser = self.BondOptimiser,
            forminputbyuser.corpBond = self.corpBond,
            forminputbyuser.PlanCode = '2H',
            forminputbyuser.quotationNumber = quotNumber,
            forminputbyuser.staffDiscount = staffDiscount,
            forminputbyuser.isSameAsProposer = isProposerSameAsLifeAssured,
            forminputbyuser.KFC = getKerlaDiscount() ? "Y" : "N",
            forminputbyuser.userType = getUserType()

        let inputXml = getInput(forminputbyuser);
        showLoader();
        self.ApiCallService('/getPremiumSaralInsuretWealthPlus', body, '<saralinsurewealthplus>', '</saralinsurewealthplus>', true).then((data) => {
            hideLoader();
            data = data.saralinsurewealthplus;
            data.productDetails = self.productDetails;
            data.premiumFreq = 'Monthly';
            var stringifyJson = JSON.stringify(data);

            //Added by sonali
            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                var lastIndex = premiumCalcXMLResponse.indexOf(`</CommIfPay8Pr${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</CommIfPay8Pr${getPolicyTerm()}>`.length);
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");
                remaningOutput += `<staffStatus>${staffStatus}</staffStatus>`;
                remaningOutput += `<staffRebate>${staffRebate}</staffRebate>`;
                remaningOutput = remaningOutput.replace("<mode></mode>", `<mode>Regular</mode>`);
                var index = forminputbyuser.PolicyTerm;
                var FundValAtEnd4Pr = parseXmlTag(premiumCalcXMLResponse, "FundValAtEnd4Pr" + index + "");
                var FundValAtEnd8Pr = parseXmlTag(premiumCalcXMLResponse, "FundValAtEnd8Pr" + index + "");
                var FundValAtEnd = '';
                FundValAtEnd = "<FundValAtEnd4Pr" + index + ">" + FundValAtEnd4Pr + "</FundValAtEnd4Pr" + index + ">";
                FundValAtEnd += "<FundValAtEnd8Pr" + index + ">" + FundValAtEnd8Pr + "</FundValAtEnd8Pr" + index + ">";
                remaningOutput = remaningOutput + FundValAtEnd + "</SaralInsureWealthPlus>";
                remaningOutput = remaningOutput.replace(/saralinsurewealthplus/g, 'SaralInsureWealthPlus');
                remaningOutput = "<?xml version='1.0' encoding='utf-8' ?>" + remaningOutput;

                let escapedBIOutput = escapeInputHTML(remaningOutput);
                sessionStorage.setItem("BIOutput", escapedBIOutput); // BI Output.
                //console.log("remaningOutput ",remaningOutput);

                //Assign Sum Assured from Output
                forminputbyuser.BasicSA = data.sumAssured;
            }
            //end
            if (sessionStorage.ThroughNeedAnalysis) {
                let status = sessionStorage.getItem('ThroughNeedAnalysis');

                if (status === 'Yes') {
                    updateDataInDB(forminputbyuser).then((resolve) => {
                        if (resolve == "1") {
                            createPDFGeneralMethod(self.productDetails, data, forminputbyuser);
                        } else {
                            alert("Something Went Wrong")
                        }
                    });
                } else if (status === 'No') {
                    sessionStorage.setItem("premiumCalcResponse", stringifyJson);
                    window.location.href = "../../PremiumCalSuccess/success.html";
                }
            }
        }).catch((error) => {
            //console.log(" in error ", error);
            self.hideLoader();
        });
    }).catch((message) => {
        //console.log(message)
        alert("Unable to generate quotation number");
        hideLoader();
    });
};

function validateGender(formElementName) {
    var laGender = document.forms["saralInsureWealthPlusForm"]["gender"].value;
    var proposerGender = document.forms["saralInsureWealthPlusForm"]["proposerGender"].value;

    if (formElementName === "gender") {
        if (laGender === "Male") {
            document.getElementById("lifeAssuredTitle").options[1].disabled = true;
            document.getElementById("lifeAssuredTitle").options[2].disabled = true;
            document.getElementById("lifeAssuredTitle").options[0].selected = true;
        } else if (laGender === "Female") {
            document.getElementById("lifeAssuredTitle").options[0].disabled = true;
            document.getElementById("lifeAssuredTitle").options[1].disabled = false;
            document.getElementById("lifeAssuredTitle").options[2].disabled = false;
            document.getElementById("lifeAssuredTitle").options[1].selected = true;
        } else {
            document.getElementById("lifeAssuredTitle").options[0].disabled = false;
            document.getElementById("lifeAssuredTitle").options[1].disabled = false;
            document.getElementById("lifeAssuredTitle").options[2].disabled = false;
        }

    } else {
        if (proposerGender === "Male") {
            document.getElementById("proposerTitle").options[0].disabled = false;
            document.getElementById("proposerTitle").options[0].selected = true;
            document.getElementById("proposerTitle").options[1].disabled = true;
            document.getElementById("proposerTitle").options[2].disabled = true;
        } else if (proposerGender === "Female") {
            document.getElementById("proposerTitle").options[0].disabled = true;
            document.getElementById("proposerTitle").options[1].disabled = false;
            document.getElementById("proposerTitle").options[1].selected = true;
            document.getElementById("proposerTitle").options[2].disabled = false;
        } else {
            document.getElementById("proposerTitle").options[0].disabled = false;
            document.getElementById("proposerTitle").options[1].disabled = false;
            document.getElementById("proposerTitle").options[2].disabled = false;
        }
    }

    if (laGender !== "Female" && laGender !== "Male" && laGender !== "Third Gender") {
        document.getElementById("genderErrId").style.display = "block";
        document.getElementById("genderErrId").innerHTML =
            "Please select your gender.";
        return false;
    } else {

        if (self.getAge() < 18) {
            if (proposerGender !== "Female" && proposerGender !== "Male" && proposerGender !== "Third Gender") {
                document.getElementById("genderPropErrId").style.display = "block";
                document.getElementById("genderPropErrId").innerHTML =
                    "Please select your gender.";
                return false;
            } else {
                document.getElementById("genderPropErrId").style.display = "none";
                // return true;
            }
        }
        document.getElementById("genderErrId").style.display = "none";
        return true;
    }
}

//Added by Tushar Kadam in 10 Feb 2020
let createPDFGeneralMethod = (productInfo, calculationJSONDataReceivedFromServer, formInputByUser) => {
    return new Promise((pdfCreatedAndServed, someErrorHappenedAndRejected) => {
        switch (productInfo.productCode) {
            case '2H':
                createSaralInsureWealthPlusPDFAndMail(productInfo, calculationJSONDataReceivedFromServer, formInputByUser).then(pdfCreatedAndServedTrue => {
                    pdfCreatedAndServed(pdfCreatedAndServedTrue);
                }, pdfCreatedAndServedFalse => {
                    someErrorHappenedAndRejected(pdfCreatedAndServedFalse);
                });
                break;
        }
    });
}
//Manish
let createSaralInsureWealthPlusPDFAndMail = (productInfo, calculationJSONDataReceivedFromServer, formInputByUser) => {
    return new Promise((resolve, reject) => {
        try {
            var options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            let doc = {
                pageSize: 'A4',
                pageOrientation: 'potrait',
                pageMargins: [10, 30, 10, 30],
                content: [{
                        image: `sbiLogo`,
                        width: 100
                    },
                    {
                        canvas: [{
                            type: 'line',
                            x1: 0,
                            y1: 5,
                            x2: 555,
                            y2: 5,
                            lineWidth: 1,
                            lineCap: 'round'
                        }]
                    },
                    {
                        margin: [0, 15, 0, 0],
                        text: ['SBI Life Insurance Co. Ltd',
                            {
                                text: '\nRegistered & Corporate Office: SBI Life Insuarnce Co. Ltd, Natraj, M.V.Road and Western Express Highway Junction, Andheri (East), Mumbai - 400069',
                                style: 'addressFontStyle',
                                alignment: 'center'
                            },
                            {
                                text: '\nIRDAI Registration No. 111 | Website: www.sbilife.co.in | Email: info@sbilife.co.in | CIN: L99999MH2000PLC129113',
                                style: 'addressFontStyle',
                                alignment: 'center'
                            },
                            {
                                text: '\nToll Free: 1800 267 9090 (Between 9.00 am & 9.00 pm)\n',
                                style: 'addressFontStyle',
                                alignment: 'center'
                            },
                            {
                                text: "SBI LIFE - " + productDetails.title + " (" + productInfo.uinNumber + ")",
                                style: 'addressFontStyle',
                                alignment: 'center'
                            }, {
                                text: "\nAn Individual, Unit-linked, Non-Participating, Life Insurance Product",
                                style: 'addressFontStyle',
                                alignment: 'center'
                            }
                        ],
                        alignment: 'center',
                        style: 'addressFontStyle'
                    },
                    {
                        style: 'benefitIllustratorHeading',
                        table: {
                            widths: ['*', 'auto', '*'],
                            alignement: 'center',
                            body: [
                                [{
                                    text: '',
                                    border: [true, true, false, true]
                                }, {
                                    text: "IN THIS POLICY, THE INVESTMENT RISK IN INVESTMENT PORTFOLIO IS BORNE BY THE POLICYHOLDER.",
                                    border: [false, true, false, true]
                                }, {
                                    text: '',
                                    border: [false, true, true, true]
                                }]
                            ]
                        },
                        layout: {
                            fillColor: '#CCCCCC'
                        }
                    },
                    {
                        style: 'smallFontSize',
                        table: {
                            widths: ['*', '*', '*', '*'],
                            alignment: 'center',
                            body: [
                                [{
                                    text: 'Proposal No.:'
                                }, {
                                    text: breakword(`${formInputByUser.quotationNumber}`),
                                    alignment: 'center'
                                }, {
                                    text: 'Channel / Intermediary :'
                                }, {
                                    text: `${formInputByUser.userType}`,
                                    alignment: 'center'
                                }]
                            ]
                        }
                    },
                    {
                        style: 'smallFontSize',
                        margin: [0, 10, 0, 0],
                        table: {
                            widths: ['*'],
                            alignment: 'center',
                            body: [
                                [{
                                    text: `Insurance Regulatory and Development authority of India (IRDAI) requires all life insurance companies operating in India to provide official illustrations to their customers. The illustrations are based on the investment rates of return set by the Insurance Regulatory and Development Authority of India (Unit Linked Insurance Products) Regulations, 2019 and is not intended to reflect the actual investment returns achieved or which may be achieved in future by SBI Life Insurance Company Limited.`,
                                }],
                                [{
                                    text: `The main objective of the illustration is that the client is able to appreciate the features of the product and the flow of benefits in different circumstances with some level of quantification. For further information on the product, its benefits and applicable charges please refer to the sales brochure and/or policy document. Further information will also be available on request.`,
                                }],
                                [{
                                    text: `Some benefits are guaranteed and some benefits are variable with returns based on the future fund performance of SBI Life Insurance Company Limited. If your policy offers guaranteed returns then the same will be clearly marked as “guaranteed” in the illustration table. If your policy offers variable returns then the illustration will show two different rates of assumed future investment returns. These assumed rates of return are not guaranteed and they are not the upper or lower limits of what you might get back, as the value of your policy is dependent on a number of factors including future fund investment performance.`,
                                }]
                            ]
                        }
                    },
                    // {
                    //   style: 'smallFontSize',
                    //   margin: [0, 10, 0, 0],
                    //   table: {
                    //     widths: ['*', '*'],
                    //     alignment: 'center',
                    //     body: [
                    //       [{
                    //         text: 'Staff Discount'
                    //       },
                    //       {
                    //         text: `${formInputByUser.staffDiscount}`,
                    //         bold: true
                    //       }
                    //       ]
                    //     ]
                    //   }
                    // },
                    {
                        style: 'smallFontSize',
                        margin: [0, 15, 0, 0],
                        table: {
                            widths: ['*', '*', '*', '*'],
                            body: [
                                [{
                                    alignment: 'center',
                                    fillColor: '#CCCCCC',
                                    text: 'Proposer, Life Assured and Plan Details',
                                    colSpan: 4
                                }, {}, {}, {}],
                                [{
                                    text: 'Name of Proposer'
                                }, {
                                    text: `${formInputByUser.proposerName}`,
                                    bold: true
                                }, {
                                    text: 'Age of Proposer'
                                }, {
                                    text: `${formInputByUser.age} Years`,
                                    bold: true
                                }],
                                [{
                                    text: 'Name of the Life Assured'
                                }, {
                                    text: `${formInputByUser.lifeAssuredName} `,
                                    bold: true
                                }, {
                                    text: 'Age of the Life Assured'
                                }, {
                                    text: `${self.getAge()} Years`,
                                    bold: true
                                }],
                                [{
                                        text: 'Policy Term',
                                    }, {
                                        text: `${formInputByUser.policyTerm} Years`,
                                        bold: true
                                    },
                                    {
                                        text: 'Premium Payment Term'
                                    }, {
                                        text: `Same as Policy Term`,
                                        bold: true
                                    }
                                ],
                                [{
                                        text: 'Amount of Installment Premium',
                                    }, {
                                        text: `Rs.${formInputByUser.premiumAmount} `,
                                        bold: true
                                    },
                                    {
                                        text: 'Mode / Frequency of Premium Payment'
                                    }, {
                                        text: `Monthly`,
                                        bold: true
                                    }
                                ],
                                [{
                                    text: 'Sum assured',
                                    colSpan: 2
                                }, {}, {
                                    text: `Rs. ${calculationJSONDataReceivedFromServer.sumAssured == undefined
                  || calculationJSONDataReceivedFromServer.sumAssured == "" ? "0" :
                  new Intl.NumberFormat('en-IN').format(calculationJSONDataReceivedFromServer.sumAssured)}`,
                                    bold: true,
                                    colSpan: 2
                                }, {}]
                            ]
                        }
                    },
                    {
                        style: 'smallFontSize',
                        margin: [0, 15, 0, 0],
                        table: {
                            widths: ['*', '*', '*', '*'],
                            body: [
                                [{
                                    text: 'Rate of Applicable Taxes',
                                    bold: true,
                                    colSpan: 2
                                }, {}, {
                                    text: `18%`,
                                    bold: true
                                }, {}],
                                [{
                                    text: 'Investment Strategy Opted For-NA',
                                    bold: true,
                                    colSpan: 2
                                }, {}, {
                                    text: `0`,
                                    bold: true
                                }, {}],
                                [{
                                    text: 'Fund Name (SFIN Name)',
                                    bold: true,
                                }, {
                                    text: `% Allocation`,
                                    bold: true
                                }, {
                                    text: 'FMC',
                                    bold: true
                                }, {
                                    text: 'Risk Level',
                                    bold: true
                                }],
                                [{
                                    text: 'Equity Fund (SFIN: ULIF001100105EQUITY-FND111)'
                                }, {
                                    text: `${formInputByUser.equityFund} %`
                                }, {
                                    text: '1.35 %',
                                }, {
                                    text: 'High',
                                }],
                                [{
                                    text: `Equity Optimiser Fund (SFIN: ULIF010210108EQTYOPTFND111)`
                                }, {
                                    text: `${formInputByUser.equityOptFund} %`
                                }, {
                                    text: '1.35 %'
                                }, {
                                    text: 'High',
                                }],
                                [{
                                    text: 'Growth Fund (SFIN: ULIF003241105GROWTH-FND111)'
                                }, {
                                    text: `${formInputByUser.growthFund} %`
                                }, {
                                    text: `1.35 %`
                                }, {
                                    text: 'Medium to High',
                                }],
                                [{
                                    text: 'Balanced Fund (SFIN: ULIF004051205BALANCDFND111)'
                                }, {
                                    text: `${formInputByUser.balancedFund} %`
                                }, {
                                    text: `1.25 %`
                                }, {
                                    text: 'Medium',
                                }],
                                [{
                                    text: 'Corporate Bond Fund (SFIN: ULIF033290618CORBONDFND111)'
                                }, {
                                    text: `${formInputByUser.corpBond} %`
                                }, {
                                    text: `1.15 %`
                                }, {
                                    text: 'Low to Medium',
                                }],
                                [{
                                    text: 'Midcap Fund (SFIN: ULIF031290915MIDCAPFUND111)'
                                }, {
                                    text: `${formInputByUser.midcapFund} %`
                                }, {
                                    text: `1.35 %`
                                }, {
                                    text: 'High',
                                }],
                                [{
                                    text: 'Bond Optimiser Fund (SFIN: ULIF032290618BONDOPTFND111)'
                                }, {
                                    text: `${formInputByUser.BondOptimiser} %`
                                }, {
                                    text: `1.15 %`
                                }, {
                                    text: 'Low to Medium',
                                }],
                                [{
                                    text: 'Pure Fund (SFIN: ULIF030290915PUREULPFND111)'
                                }, {
                                    text: `${formInputByUser.pureFund} %`
                                }, {
                                    text: `1.35 %`
                                }, {
                                    text: 'High',
                                }],
                            ]
                        }
                    },
                    {
                        style: 'smallFontSize',
                        margin: [0, 15, 0, 0],
                        alignment: 'center',
                        table: {
                            widths: ['*'],
                            body: [
                                [{
                                    text: 'How to read and understand this benefit illustration?',
                                    alignment: 'center',
                                    bold: true
                                }],
                                [{
                                    text: 'This benefit illustration is intended to show what charges are deducted from your premiums and how the unit fund, net of charges and taxes, may grow over the years of the policy term if the fund earns a gross return of 8% p.a. or 4% p.a. These rates, i.e. 8% p.a. and 4% p.a. are assumed only for the purpose of illustrating the flow of benefits if the returns are at this level. It should not be interpreted that the returns under the plan are going to be  either 8% p.a. or 4% p.a.',
                                    alignment: 'justify'
                                }],
                                [{
                                    text: 'Net yield mentioned corresponds to the gross investment return of 8% p.a., net of all charges but does not consider mortality, underwriting extra, if any, if deducted by cancellation of units. It demonstrates the impact of charges exclusive of taxes on the net yield. Please note that the mortality charges per thousand sum assured in general, increases with age.',
                                    alignment: 'justify'
                                }],
                                [{
                                    text: 'The actual returns can vary depending on the performance of the chosen fund, charges towards mortality, underwriting extra etc. The investment risk in this policy is borne by the policyholder, hence, for more details on terms and conditions please read the sales literature carefully.',
                                    alignment: 'justify'
                                }],
                                [{
                                    text: 'Part A of this statement presents a summary view of year- by- year charges deducted under the policy, fund value, surrender value and the death benefit, at two assumed rates of return. Part B of this statement presents a detailed break-up of the charges, and other values.',
                                    alignment: 'justify'
                                }]
                            ]
                        }
                    },
                    {
                        style: 'smallFontSize',
                        margin: [0, 15, 0, 0],
                        table: {
                            widths: ['4%', '7%', '7%', '7%', '7%', '7%', '7%', '7%', '5%', '7%', '7%', '7%', '7%', '7%', '7%'],
                            alignment: 'center',
                            body: returnPartATableSaralInsureWealth(formInputByUser, calculationJSONDataReceivedFromServer)
                        }
                    },
                    {
                        style: 'smallFontSize',
                        margin: [0, 10, 0, 0],
                        table: {
                            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
                            alignment: 'center',
                            body: returnPartBTableSaralInsureWealth(formInputByUser, calculationJSONDataReceivedFromServer)
                        }
                    }, {
                        style: 'smallFontSize',
                        margin: [0, 10, 0, 0],
                        table: {
                            widths: ['*'],
                            body: [
                                [{
                                    text: 'Notes',
                                    alignement: 'center',
                                    bold: true
                                }],
                                [{
                                    text: `1). Refer the sales literature for explanation of terms used in this illustration`,
                                }],
                                [{
                                    text: `2) Please read this benefit illustration in conjunction with Sales Brochure and the Policy Document to understand all Terms, Conditions & Exclusions carefully.`,
                                }],
                                [{
                                    text: `3) Kindly note that above is only an illustration and does not in any way create any rights and/or obligations. The actual experience on the contract may be different from what is illustrated. The non-guaranteed low and high rate mentioned above relate to assumed investment returns at different rates and may vary depending upon market conditions. For more details on risk factors, terms and conditions please read sales brochure carefully.`,
                                }],
                                [{
                                    text: `4) The unit values may go up as well as down and past performance is no indication of future performance on the part of SBI Life Insurance Co. Ltd. We would request you to appreciate the associated risk under this plan vis-à-vis the likely future returns before taking your investment decision.`,
                                }],
                                [{
                                    text: `5) It is assumed that the policy is in force throughout the term.`,
                                }],
                                [{
                                    text: `6) Fund management charge is based on the specific  investment strategy / fund option(s) chosen.`,
                                }],
                                [{
                                    text: `7) Surrender Value equals the Fund Value at the end of the year minus Discontinuance Charges. Surrender value is available on or after 5th policy anniversary.`,
                                }],
                                [{
                                    text: `8) Acceptance of proposal is subject to Underwriting decision. Mortality charges are for a healthy person.`,
                                }],
                                [{
                                    text: `9) Applicable Taxes (including surcharge/cess etc), at the rate notified by the Central Government/ State Government / Union Territories of India from time to time and as per the provisions of the prevalent tax laws will be payable on premium/ or any other charges as per the product features.`,
                                }],
                                [{
                                    text: `10) This policy provides guaranteed death benefit of Rs.${calculationJSONDataReceivedFromServer.sumAssured === undefined || calculationJSONDataReceivedFromServer.sumAssured === '' ? '0' : new Intl.NumberFormat('en-IN').format(calculationJSONDataReceivedFromServer.sumAssured)}`,
                                }],
                                [{
                                    text: `11) Net Yield have been calculated after applying all the charges (except GST, mortality charges).`,
                                }]
                            ]
                        }
                    },
                    {
                        style: 'smallFontSize',
                        margin: [0, 10, 0, 0],
                        table: {
                            widths: ['*'],
                            body: [
                                [{
                                    text: 'Definition of Various Charges',
                                    alignement: 'center',
                                    bold: true
                                }],
                                [{
                                    text: `1)Policy Administration Charges : a charge of a fixed sum which is applied at the beginning of each policy month by cancelling units for equivalent amount, deducted for maintaining the policy.`,
                                }],
                                [{
                                    text: `2)Premium Allocation Charge : is the percentage of premium that would not be utilised to purchase units.`,
                                }],
                                [{
                                    text: `3)Mortality Charges : are the charges recovered for providing life insurance cover, deducted at the beginning of each policy month by cancelling units for equivalent amount.`,
                                }],
                                [{
                                    text: `4)Fund Management Charge (FMC) : is the deduction made from the fund at a stated percentage before the computation of the NAV of the fund.`,
                                }]
                            ]
                        }
                    },
                    {
                        style: 'smallFontSize',
                        margin: [0, 15, 0, 0],
                        table: {
                            widths: ['*'],
                            alignment: 'center',
                            body: getImportantNote(calculationJSONDataReceivedFromServer, formInputByUser)
                        }
                    },
                    {
                        style: 'smallFontSize',
                        margin: [0, 15, 0, 0],
                        table: {
                            widths: ['*', '*', '*'],
                            body: [
                                [{
                                    //based on the condition of isSameAsProposer, setting the proposer name(Bharamu)
                                    text: `I, ${formInputByUser.isSameAsProposer ? formInputByUser.proposerName : formInputByUser.lifeAssuredName} having received the information with respect to the above, have understood the above statement before entering into the contract.`,
                                    bold: true,
                                    alignment: 'left',
                                    colSpan: 3,
                                }, {}, {}],
                                [{
                                    text: `Policy Holder's Signature`,
                                    bold: true,
                                    alignment: 'center',
                                    colSpan: 3,
                                    fillColor: '#CCCCCC'
                                }, {}, {}],
                                [{
                                    text: `Place : `,
                                }, {
                                    text: `Date : ${getddMMyyyy(new Date)}`,
                                }, {
                                    text: '',
                                }]
                            ]
                        }
                    },
                    {
                        style: 'smallFontSize',
                        margin: [0, 15, 0, 0],
                        table: {
                            widths: ['*', '*', '*'],
                            body: [
                                [{
                                    text: `Marketing official's Signature & Company Seal`,
                                    bold: true,
                                    alignment: 'center',
                                    colSpan: 3,
                                    fillColor: '#CCCCCC'
                                }, {}, {}],
                                [{
                                    text: `Place : `,
                                }, {
                                    text: `Date : ${getddMMyyyy(new Date)}`,
                                }, {
                                    text: '',
                                }]
                            ]
                        }
                    }
                ],
                images: {
                    sbiLogo: 'data:image/jpeg;base64,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'
                },
                styles: {
                    tableSingleRow: {
                        fontSize: 15,
                        bold: true,
                        margin: [0, 5, 0, 15]
                    },
                    tableLastRow: {
                        fontSize: 15,
                        bold: true,
                        margin: [0, 0, 0, 0]
                    },
                    unorderedList: {
                        margin: [0, 0, 0, 15]
                    },
                    boldText: {
                        bold: true
                    },
                    smallFontSize: {
                        fontSize: 8
                    },
                    noBorderCellStyle: {
                        border: [false, false, false, false]
                    },
                    addressFontStyle: {
                        fontSize: 8,
                        bold: true,
                        alignment: 'right'
                    },
                    benefitIllustratorHeading: {
                        fontSize: 12,
                        bold: true,
                        margin: [0, 5, 0, 15]
                    },
                    smallestFontSize: {
                        fontSize: 6
                    },
                    theSmallestFontSizePossible: {
                        fontSize: 4
                    }
                }
            };
            saveBase64PDF(doc).then((base64pdf) => {
                window.location.href = "../../PDF/pdfPage.html";
            });
        } catch (error) {
            console.log(error)
        }
    });
}
function returnPartBTableSaralInsureWealth(formInputByUser, calculationJSONDataReceivedFromServer) {
    let multipleRowArray = []; //Number of Rows depends on Policy Term Selected
    multipleRowArray.push([{
        text: 'PART B',
        bold: true,
        colSpan: 15,
        fontSize: 6
    }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], [{
            bold: true,
            text: 'Amount in  Rs.',
            alignment: 'center',
            colSpan: 2,
            fontSize: 4
        }, {},
        {
            bold: true,
            text: 'Gross Yield 8% pa',
            alignment: 'center',
            colSpan: 6,
            fontSize: 4
        }, {}, {}, {}, {}, {},
        {
            bold: true,
            text: 'Net Yield ' + ((eval("calculationJSONDataReceivedFromServer.netYield8pa")) ? eval("calculationJSONDataReceivedFromServer.netYield8pa") : '0'),
            alignment: 'center',
            colSpan: 7,
            fontSize: 4
        }, {}, {}, {}, {}, {}, {}
    ], [{
        text: 'Policy Year',
        bold: true,
        fontSize: 4
    }, {
        text: `Annualized Premium  (AP) `,
        bold: true,
        fontSize: 4
    }, {
        text: 'Premium Allocation Charge (PAC)',
        bold: true,
        fontSize: 4
    }, {
        text: 'Annualized Premium - Premium Allocation Charge',
        bold: true,
        fontSize: 4
    }, {
        text: 'Mortality charge',
        bold: true,
        fontSize: 4
    }, {
        text: 'Applicable Taxes',
        bold: true,
        fontSize: 4
    }, {
        text: 'Policy Admin charge',
        bold: true,
        fontSize: 4
    }, {
        text: 'Other charges*',
        bold: true,
        fontSize: 4
    }, {
        text: 'Additions to the fund*',
        bold: true,
        fontSize: 4
    }, {
        text: 'Guaranteed Addition',
        bold: true,
        fontSize: 4
    }, {
        text: 'Fund before FMC',
        bold: true,
        fontSize: 4
    }, {
        text: 'FMC',
        bold: true,
        fontSize: 4
    }, {
        text: 'Fund at End of year',
        bold: true,
        fontSize: 4
    }, {
        text: 'Surrender Value',
        bold: true,
        fontSize: 4
    }, {
        text: 'Death Benefit',
        bold: true,
        fontSize: 4
    }]);
    for (let i = 1; i <= formInputByUser.policyTerm; i++) {
        let colDataArray = [];
        colDataArray.push({
            text: eval("calculationJSONDataReceivedFromServer.policyYr" + i + ""),
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.AnnPrem" + i + "")) ? Math.round(eval("calculationJSONDataReceivedFromServer.AnnPrem" + i + "")) : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.PremAllCharge" + i + "")) ? eval("calculationJSONDataReceivedFromServer.PremAllCharge" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.AmtAviFrInv" + i + "")) ? eval("calculationJSONDataReceivedFromServer.AmtAviFrInv" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.MortChrg8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.MortChrg8Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.TotServTxOnCharg8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.TotServTxOnCharg8Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.PolAdminChrg" + i + "")) ? eval("calculationJSONDataReceivedFromServer.PolAdminChrg" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.OtherCharges8Pr_PartB" + i + "")) ? eval("calculationJSONDataReceivedFromServer.OtherCharges8Pr_PartB" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.AdditionsToTheFund8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.AdditionsToTheFund8Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.GuarntAdd8Pr" + i + "")) ? Math.round(eval("calculationJSONDataReceivedFromServer.GuarntAdd8Pr" + i + "")) : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.FundBefFMC8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.FundBefFMC8Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.FundMgmtCharg8Pr" + i + "")) ? Math.round(eval("calculationJSONDataReceivedFromServer.FundMgmtCharg8Pr" + i + "")) : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.FundValAtEnd8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.FundValAtEnd8Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.SurrVal8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.SurrVal8Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.DeathBen8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.DeathBen8Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        });
        multipleRowArray.push(colDataArray);
    }
    // multipleRowArray.push([{
    //   text: `Net Yield - ${(eval("calculationJSONDataReceivedFromServer.netYield8pa")) ? eval("calculationJSONDataReceivedFromServer.netYield8pa") : '0'} % `,
    //   bold: true,
    //   colSpan: 7,
    //   fontSize: 4
    // }, {}, {}, {}, {}, {}, {}, {
    //   text: `Reduction in Yield - ${(eval("calculationJSONDataReceivedFromServer.redInYieldNoYr")) ? eval("calculationJSONDataReceivedFromServer.redInYieldNoYr") : '0'} % `,
    //   bold: true,
    //   colSpan: 8,
    //   fontSize: 4
    // }, {}, {}, {}, {}, {}, {}, {}])
    multipleRowArray.push(
        [{
                bold: true,
                text: 'Amount in  Rs.',
                alignment: 'center',
                colSpan: 2,
                fontSize: 4
            }, {},
            {
                bold: true,
                text: 'Gross Yield 4% pa',
                alignment: 'center',
                colSpan: 6,
                fontSize: 4
            }, {}, {}, {}, {}, {},
            {
                text: '',
                colSpan: 7,
            }, {}, {}, {}, {}, {}, {}
        ], [{
            text: 'Policy Year',
            bold: true,
            fontSize: 4
        }, {
            text: `Annualized Premium  (AP) `,
            bold: true,
            fontSize: 4
        }, {
            text: 'Premium Allocation Charge (PAC)',
            bold: true,
            fontSize: 4
        }, {
            text: 'Annualized Premium - Premium Allocation Charge',
            bold: true,
            fontSize: 4
        }, {
            text: 'Mortality charge',
            bold: true,
            fontSize: 4
        }, {
            text: 'Applicable Taxes',
            bold: true,
            fontSize: 4
        }, {
            text: 'Policy Admin charge',
            bold: true,
            fontSize: 4
        }, {
            text: 'Other charges*',
            bold: true,
            fontSize: 4
        }, {
            text: 'Additions to the fund*',
            bold: true,
            fontSize: 4
        }, {
            text: 'Guaranteed Addition',
            bold: true,
            fontSize: 4
        }, {
            text: 'Fund before FMC',
            bold: true,
            fontSize: 4
        }, {
            text: 'FMC',
            bold: true,
            fontSize: 4
        }, {
            text: 'Fund at End of year',
            bold: true,
            fontSize: 4
        }, {
            text: 'Surrender Value',
            bold: true,
            fontSize: 4
        }, {
            text: 'Death Benefit',
            bold: true,
            fontSize: 4
        }]);
    for (let i = 1; i <= formInputByUser.policyTerm; i++) {
        let colDataArraySecond = [];
        // 4 %
        colDataArraySecond.push({
            text: eval("calculationJSONDataReceivedFromServer.policyYr" + i + ""),
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.AnnPrem" + i + "")) ? Math.round(eval("calculationJSONDataReceivedFromServer.AnnPrem" + i + "")) : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.PremAllCharge" + i + "")) ? eval("calculationJSONDataReceivedFromServer.PremAllCharge" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.AmtAviFrInv" + i + "")) ? eval("calculationJSONDataReceivedFromServer.AmtAviFrInv" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.MortChrg4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.MortChrg4Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.TotServTax4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.TotServTax4Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.PolAdminChrg" + i + "")) ? eval("calculationJSONDataReceivedFromServer.PolAdminChrg" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.OtherCharges4Pr_PartB" + i + "")) ? eval("calculationJSONDataReceivedFromServer.OtherCharges4Pr_PartB" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.AdditionsToTheFund4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.AdditionsToTheFund4Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.GuarntAdd4Pr" + i + "")) ? Math.round(eval("calculationJSONDataReceivedFromServer.GuarntAdd4Pr" + i + "")) : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.FundBefFMC4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.FundBefFMC4Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.FundMgmtCharg4Pr" + i + "")) ? Math.round(eval("calculationJSONDataReceivedFromServer.FundMgmtCharg4Pr" + i + "")) : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.FundValAtEnd4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.FundValAtEnd4Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.SurrVal4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.SurrVal4Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.DeathBen4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.DeathBen4Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        });
        multipleRowArray.push(colDataArraySecond);
    }
    //
    return multipleRowArray;
}
function returnPartATableSaralInsureWealth(formInputByUser, calculationJSONDataReceivedFromServer) {
    let multipleRowArray = []; //Number of Rows depends on Policy Term Selected
    multipleRowArray.push([{
            text: 'PART A',
            bold: true,
            colSpan: 15,
            fontSize: 6
        }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], [{
                bold: true,
                text: 'Amount in Rupees',
                alignment: 'center',
                colSpan: 2,
                fontSize: 4
            }, {},
            {
                bold: true,
                text: 'At 4% p.a. Gross Investment return',
                alignment: 'center',
                colSpan: 6,
                fontSize: 4
            }, {}, {}, {}, {}, {},
            {
                bold: true,
                text: 'At 8% p.a. Gross Investment return',
                alignment: 'center',
                colSpan: 6,
                fontSize: 4
            }, {}, {}, {}, {}, {},
            {
                text: '',
                alignment: 'center',
                fontSize: 4
            }
        ],
        [{
            text: 'Policy Year',
            bold: true,
            fontSize: 4
        }, {
            text: `${formInputByUser.planOption === "Regular" || formInputByUser.planOption === "Limited" ? "Annualised Premium" : formInputByUser.planOption === "Single" ? "Single Premium" : ""} `,
            bold: true,
            fontSize: 4
        }, {
            text: 'Mortality  Charges',
            bold: true,
            fontSize: 4
        }, {
            text: 'Other Charges*',
            bold: true,
            fontSize: 4
        }, {
            text: 'Applicable Taxes',
            bold: true,
            fontSize: 4
        }, {
            text: 'Fund at end of the year',
            bold: true,
            fontSize: 4
        }, {
            text: 'Surrender Value',
            bold: true,
            fontSize: 4
        }, {
            text: 'Death Benefit',
            bold: true,
            fontSize: 4
        }, {
            text: 'Mortality  Charges',
            bold: true,
            fontSize: 4
        }, {
            text: 'Other Charges*',
            bold: true,
            fontSize: 4
        }, {
            text: 'Applicable Taxes',
            bold: true,
            fontSize: 4
        }, {
            text: 'Fund at end of the year',
            bold: true,
            fontSize: 4
        }, {
            text: 'Surrender Value',
            bold: true,
            fontSize: 4
        }, {
            text: 'Death Benefit',
            bold: true,
            fontSize: 4
        }, {
            text: 'Commission payable to Intermediary(Rs)',
            bold: true,
            fontSize: 4
        }], [{
            text: '1',
            bold: true,
            fontSize: 4
        }, {
            text: '2',
            bold: true,
            fontSize: 4
        }, {
            text: '3',
            bold: true,
            fontSize: 4
        }, {
            text: '4',
            bold: true,
            fontSize: 4
        }, {
            text: '5',
            bold: true,
            fontSize: 4
        }, {
            text: '6',
            bold: true,
            fontSize: 4
        }, {
            text: '7',
            bold: true,
            fontSize: 4
        }, {
            text: '8',
            bold: true,
            fontSize: 4
        }, {
            text: '9',
            bold: true,
            fontSize: 4
        }, {
            text: '10',
            bold: true,
            fontSize: 4
        }, {
            text: '11',
            bold: true,
            fontSize: 4
        }, {
            text: '12',
            bold: true,
            fontSize: 4
        }, {
            text: '13',
            bold: true,
            fontSize: 4
        }, {
            text: '14',
            bold: true,
            fontSize: 4
        }, {
            text: '15',
            bold: true,
            fontSize: 4
        }]);
    for (let i = 1; i <= formInputByUser.policyTerm; i++) {
        let colDataArray = [];
        colDataArray.push({
            text: eval("calculationJSONDataReceivedFromServer.policyYr" + i + ""),
            fontSize: 4
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.AnnPrem" + i + "")) ? Math.round(eval("calculationJSONDataReceivedFromServer.AnnPrem" + i + "")) : '0',
            fontSize: 4
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.MortChrg4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.MortChrg4Pr" + i + "") : '0',
            fontSize: 4
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.OtherCharges4Pr_PartA" + i + "")) ? eval("calculationJSONDataReceivedFromServer.OtherCharges4Pr_PartA" + i + "") : '0',
            fontSize: 4
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.TotServTax4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.TotServTax4Pr" + i + "") : '0',
            fontSize: 4
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.FundValAtEnd4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.FundValAtEnd4Pr" + i + "") : '0',
            fontSize: 4
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.SurrVal4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.SurrVal4Pr" + i + "") : '0',
            fontSize: 4
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.DeathBen4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.DeathBen4Pr" + i + "") : '0',
            fontSize: 4
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.MortChrg8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.MortChrg8Pr" + i + "") : '0',
            fontSize: 4
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.OtherCharges8Pr_PartA" + i + "")) ? Math.round(eval("calculationJSONDataReceivedFromServer.OtherCharges8Pr_PartA" + i + "")) : '0',
            fontSize: 4
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.TotServTxOnCharg8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.TotServTxOnCharg8Pr" + i + "") : '0',
            fontSize: 4
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.FundValAtEnd8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.FundValAtEnd8Pr" + i + "") : '0',
            fontSize: 4
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.SurrVal8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.SurrVal8Pr" + i + "") : '0',
            fontSize: 4
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.DeathBen8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.DeathBen8Pr" + i + "") : '0',
            fontSize: 4
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.CommIfPay8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.CommIfPay8Pr" + i + "") : '0',
            fontSize: 4
        });
        multipleRowArray.push(colDataArray);
        //console.log(multipleRowArray);
    }
    multipleRowArray.push([{
        text: '* See Part B for details',
        bold: true,
        colSpan: 15,
        fontSize: 6
    }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], [{
        text: 'IN THIS POLICY, THE INVESTMENT RISK IS BORNE BY THE POLICYHOLDER AND THE ABOVE INTEREST RATES ARE ONLY FOR ILLUSTRATIVE PURPOSE',
        bold: true,
        colSpan: 15,
        fontSize: 6
    }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}])
    return multipleRowArray;
}
function getImportantNote(calculationJSONDataReceivedFromServer, formInputByUser) {
    let multipleRowArray = []; //Number of Rows depends on Policy Term Selected
    multipleRowArray.push([{
        text: 'Important:',
        bold: true
    }], [{
        text: 'You may receive a Welcome Call from our representative to confirm your proposal details like Date of Birth, Nominee Name, Address, Email ID, Sum Assured, Premium amount, Premium Payment Term etc.',
    }], [{
        text: 'You may have to undergo Medical tests based on our underwriting requirements.',
    }]);
    if (formInputByUser.premiumAmount > 100000) {
        multipleRowArray.push([{
            text: 'If premium is greater than Rs 1 Lakh, You have to submit Proof of source of Fund',
        }]);
    }
    var Company_policy_surrender_dec = ""
    if (formInputByUser.planOption == "Regular") {
        Company_policy_surrender_dec = "Your SBI Life - Saral InsureWealth Plus (111L124V02) is a " +
            "Regular Premium Policy and  you  are required to pay monthly premium of Rs. " +
            formInputByUser.premiumAmount +
            " .Your Policy Term is " +
            formInputByUser.policyTerm +
            " years" +
            " ,Premium Payment Term is same as policy term " +
            " and Sum Assured is Rs. " +
            (calculationJSONDataReceivedFromServer.sumAssured === undefined || calculationJSONDataReceivedFromServer.sumAssured === '' ? '0' : new Intl.NumberFormat('en-IN').format(calculationJSONDataReceivedFromServer.sumAssured));
    }
    multipleRowArray.push([{
        text: `${Company_policy_surrender_dec}`
    }]);
    return multipleRowArray;
}