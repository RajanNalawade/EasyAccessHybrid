window.onload = function () {
    this.ready();
    // hideLoader();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails;

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    this.hideErrMsg();
    this.initArrayList();
    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    this.initializeData()
    this.updateYearElapsedLable();
    this.updateSAMFlabel();
    this.updatePremiumAmountLable();
};

function hideErrMsg() {
    //document.getElementById('maturityAgeErrId').style.display = "none";
    document.getElementById('samfErrId').style.display = "none";
    document.getElementById('confirmEmailErrId').style.display = "none";
    document.getElementById('ageErrId').style.display = "none";
    document.getElementById('mobileNoErrId').style.display = "block";
}

function initializeData() {
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
}

function initArrayList() {

    policyListElement = document.forms["saralMahaAnandForm"]["saralMahaAnandPolicyTerm"];
    for (i = 0; i < policyTermList.length; i++) {
        policyListElement.add(new Option(policyTermList[i].title, policyTermList[i].value));
    }

    premiumFreqModeListElement = document.forms["saralMahaAnandForm"]["premiumFrequencyMode"];
    for (i = 0; i < premiumFrequencyModeList.length; i++) {
        premiumFreqModeListElement.add(new Option(premiumFrequencyModeList[i].title, premiumFrequencyModeList[i].value));
    }

    adbSAListElement = document.forms["saralMahaAnandForm"]["adbSA"];
    for (i = 0; i < adbSATermList.length; i++) {
        adbSAListElement.add(new Option(adbSATermList[i].title, adbSATermList[i].value));
    }
}

function calculateAge(birthday) {
    var age = getAgeFromBirthdate(getDDMMYYYY(birthday));
    document.forms["saralMahaAnandForm"]["saralMahaAnandAge"].innerHTML = age;
    document.forms["saralMahaAnandForm"]["saralMahaAnandAge"].value = age;
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

function validateEmailIds() {
    var email = document.forms["saralMahaAnandForm"]["email"].value;
    var cEmail = document.forms["saralMahaAnandForm"]["confirmEmail"].value;
    if (email != cEmail) {
        document.getElementById('confirmEmailErrId').style.display = "block";
        document.getElementById('confirmEmailErrId').innerHTML = "Email Id Does Not Match";
        return false;
    } else {
        document.getElementById('confirmEmailErrId').style.display = "none";
        return true
    }
}

function calMinSA() {
    var temp = 0;

    if (getMahaAnandAge() < 45) {
        temp = 0.5;
    } else {
        temp = 0.25;
    }
    //console.log(getEffectivePremium(getFrequencyMode()) +" === "+this.getPolicyTerm()+" === "+temp)
    return getEffectivePremium(getFrequencyMode())
            * this.getPolicyTerm() * temp;
}

function getEffectivePremium(mode) {
    var PF = 0;
    if (mode = ("Yearly")) {
        PF = 1;
    } else if (mode = ("Half Yearly")) {
        PF = 2;
    } else if (mode = ("Quarterly")) {
        PF = 4;
    } else if (smode = ("Monthly")) {
        PF = 12;
    }
    return getPremiumAmount() * PF;
}

function valPremiumAmount() {
    var view = document.getElementById("premiumAmtErrId");
    var preAmount = getPremiumAmount();
    if (preAmount == 0) {
        view.style.display = "block";
        view.innerHTML = "Please enter Premium Amount in Rs. ";
    } else if (preAmount % 100 != 0) {
        view.style.display = "block";
        view.innerHTML = "Please Enter Premium Amount in multiples of 1000.";
    } else {
        var maxPreAmount = this.getMaximiumPremiumAmount(this.getFrequencyMode());
        var minPreAmount = this.getMinimumPremiumAmount(this.getFrequencyMode());
        if (preAmount < minPreAmount || preAmount > maxPreAmount) {
            view.style.display = "block";
            view.innerHTML = "Premium Amount should be in the range of Rs. " + new Intl.NumberFormat('en-IN').format(minPreAmount) + " to Rs. "
            + new Intl.NumberFormat('en-IN').format(maxPreAmount) + " for " + getFrequencyMode() + " Mode";
        } else {
            view.style.display = "none";
            return true;
        }

    }

}

function valPolicyTermPlusAge() {
    if ((getMahaAnandAge() + getPolicyTerm()) > 65) {
        document.getElementById('policyTermErrId').style.display = "block";
        document.getElementById('policyTermErrId').innerHTML = "Addition of Policy Term & Age at Entry should be less than or equal to 65 Years";
        return false;
    } else {
        document.getElementById('policyTermErrId').style.display = "none";
        return true;
    }
}

function validateSAMF() {
    var minSAMF = 0, temp1 = 0, temp2 = 0;
    if (getMahaAnandAge() < 45) {
        temp1 = 10;
    } else {
        temp1 = 7;
    }
    temp2 = calMinSA() / getEffectivePremium();
    //minSAMF = Math.max(temp1, temp2);
    if (!isNaN(temp2) && temp2 != 0) {
        minSAMF = Math.max(temp1, temp2);
    }
    if (getSAMF() == 0 || getSAMF() < minSAMF || getSAMF() > maxSAMF) {
        document.getElementById("samfErrId").style.display = "block";
        document.getElementById("samfErrId").innerHTML = ("Sum Assured Multiple Factor (SAMF) should be in the range of "
                        + minSAMF + " to " + maxSAMF);
        return false;

    } else {
        document.getElementById("samfErrId").style.display = "none";
        return true;
    }

}

function valYearsElapsedSinceInception() {
    if (getYearsElapsed() == 0 || getYearsElapsed() < 5 || getYearsElapsed() > getPolicyTerm()) {
        document.getElementById("yearElapsedErrId").style.display = "block";
        document.getElementById("yearElapsedErrId").innerHTML = ("Enter No. of Years Elapsed Since Inception between 5 to " + getPolicyTerm() + " Years");
        return false;

    }
    document.getElementById("yearElapsedErrId").style.display = "none";
    return true;
}

function valADBsumAssured() {
    var view = document.getElementById("sumAssuredErrId");
    if (getIsAccidentalDeathBenefit() == true) {
        var minADB_SA = 0, maxADB_SA = 0;
        minADB_SA = Math.max(Math.min(25000, (getEffectivePremium() * getSAMF())), 25000);
        maxADB_SA = getEffectivePremium() * getSAMF();
        if (getADBSumAssured() == 0) {
            view.style.display = "block";
            view.innerHTML = "Please enter Accidental Death Benefit Linked Rider Sum Assured in Rs. ";
            return false;
        }
        else if (getADBSumAssured() % 1000 != 0) {
            view.style.display = "block";
            view.innerHTML = "Accidental Death Benefit Linked Rider Sum Assured in multiples of 1000.";
            return false;
        }
        else if (getADBSumAssured() % 1000 != 0 || getADBSumAssured() < minADB_SA || getADBSumAssured() > maxADB_SA) {
            view.style.display = "block";
            view.innerHTML = "Accidental Death Benefit Linked Rider Sum Assured should be in the range of Rs. "
                    + new Intl.NumberFormat('en-IN').format(minADB_SA)
                    + " to Rs. "
                    + new Intl.NumberFormat('en-IN').format(maxADB_SA);
            return false;
        }
    }
    view.style.display = "none";
    return true;
}

function valTotalAllocation() {
    var equityFund, bondFund, balancedFund, indexFund;
    equityFund = getEquityFund();
    bondFund = getBondFund();
    balancedFund = getBalanceFund();

    if ((equityFund + bondFund + balancedFund) != 100) {
        document.getElementById("allocationErrId").style.display = "block";
        document.getElementById("allocationErrId").innerHTML = "Total sum of % to be invested for all fund should be equal to 100%";
        return false;
    } else {
        document.getElementById("allocationErrId").style.display = "none";
        return true;
    }
}

function valADBterm() {

    var minADBterm = 0, maxADBterm = 0;

    minADBterm = minADBterm;
    maxADBterm = Math.min(Math.min(getPolicyTerm(), (maxAgeAtMaturity - getMahaAnandAge())),
            (maxAgeAtMaturity - minAgeADB));
    console.log(getRiderTerm())
    if (getRiderTerm() < minADBterm || getRiderTerm() > maxADBterm) {
        // Show alert message if rider is selected
        if (getIsAccidentalDeathBenefit() == true) {
            document.getElementById("adbErrId").style.display = "block";
            document.getElementById("adbErrId").innerHTML = "Accidental Death Benefit Linked Rider Term should be in the range of " + minADBterm
                            + " Years to "
                            + maxADBterm
                            + " Years";
            return false;
        }
        // Do not show alert message if rider is not selected.
        // Only reset the term

    }
    document.getElementById("adbErrId").style.display = "none";
    return true;
}

function submitForm() {
    if (saralMahaAnandForm.checkValidity() && this.validateGender("") && this.calculateAge(getDob())
    && validateMobileNo(this.getMobileNo()) && validateEmailIds() && valPolicyTermPlusAge() && valPremiumAmount()
    && validateSAMF() && valYearsElapsedSinceInception() && valADBsumAssured() && valTotalAllocation()) {
        calculatePremiumAPICall();
    }
}
function getInput(forminputbyuser) {
    let getInputXML = `<?xml version='1.0' encoding='utf-8' ?><saralMahaAnandBean>
    <LifeAssured_title>${this.getTitle()}</LifeAssured_title>
    <LifeAssured_firstName>${this.getFName()}</LifeAssured_firstName>
    <LifeAssured_middleName>${this.getMName()}</LifeAssured_middleName>
    <LifeAssured_lastName>${this.getLName()}</LifeAssured_lastName>
    <LifeAssured_DOB>${this.getDob()}</LifeAssured_DOB>
    <LifeAssured_age>${forminputbyuser.age}</LifeAssured_age>
    <gender>${forminputbyuser.gender}</gender>

    <proposer_title></proposer_title>
    <proposer_firstName></proposer_firstName>
    <proposer_middleName></proposer_middleName>
    <proposer_lastName></proposer_lastName>
    <proposer_DOB></proposer_DOB>
    <proposer_age></proposer_age>
    <proposer_gender>${forminputbyuser.gender}</proposer_gender>

    <product_name>${this.productDetails.title}</product_name>
    <product_Code>${this.productDetails.productCode}</product_Code>
    <product_UIN>${this.productDetails.uinNumber}</product_UIN>
    <product_cateogory>${product_cateogory}</product_cateogory>
    <product_type>${product_type}</product_type>

    <proposer_Is_Same_As_Life_Assured>Y</proposer_Is_Same_As_Life_Assured>
    <isStaff>${this.getIsStaff()}</isStaff>
    <age>${forminputbyuser.age}</age>
    <isJKResident>false</isJKResident>
    <SAMF>${this.getSAMF()}</SAMF>
    <premFreqMode>${this.getFrequencyMode()}</premFreqMode>
    <policyTerm>${this.getPolicyTerm()}</policyTerm>
    <premiumAmount>${this.getPremiumAmount()}</premiumAmount>
    <noOfYrElapsed>${forminputbyuser.numberOfElapsed}</noOfYrElapsed>
    <perInvEquityFund>${this.getEquityFund()}</perInvEquityFund>
    <perInvBalancedFund>${this.getBalanceFund()}</perInvBalancedFund>
    <perInvBondFund>${this.getBondFund()}</perInvBondFund>
    <isADBRider>${this.getIsAccidentalDeathBenefit()}</isADBRider>
    <adbTerm>${this.getRiderTerm()}</adbTerm>
    <adbSA>${self.getADBSumAssured()}</adbSA>
  </saralMahaAnandBean>`;
    console.log('getInputXML End');
    return getInputXML;
}
function calculatePremiumAPICall() {
    let xmlBodyParam = ` <getPremiumSaralMahaAanand xmlns="http://tempuri.org/">
    <isStaff>${self.getIsStaff()}</isStaff>
    <KFC>false</KFC>
    <isBancAssuranceDisc></isBancAssuranceDisc>
    <age>${self.getMahaAnandAge()}</age>
    <gender>${self.getGender()}</gender>
    <policyTerm>${self.getPolicyTerm()}</policyTerm>
    <premFreqMode>${self.getFrequencyMode()}</premFreqMode>
    <effectivePremium>${self.getEffectivePremium()}</effectivePremium>
    <premiumAmount>${self.getPremiumAmount()}</premiumAmount>
    <SAMF>${self.getSAMF()}</SAMF>
    <noOfYrElapsed>${self.getYearsElapsed()}</noOfYrElapsed>
    <isADBRider>${self.getIsAccidentalDeathBenefit()}</isADBRider>
    <adbTerm>${self.getRiderTerm()}</adbTerm>
    <adbSA>${self.getADBSumAssured()}</adbSA>
    <perInvEquityFund>${self.getEquityFund()}</perInvEquityFund>
    <perInvBondFund>${self.getBondFund()}</perInvBondFund>
    <perInvBalancedFund>${self.getBalanceFund()}</perInvBalancedFund>
    <perInvIndexFund></perInvIndexFund>
  </getPremiumSaralMahaAanand>`;

    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        ${xmlBodyParam}
                    </soap:Body>
                </soap:Envelope>`;

    generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {
        let staffDiscount = "";
        if (self.getIsStaff()) {
            staffDiscount = "Yes";
        } else {
            staffDiscount = "No";
        }

        var planCode = "UPMAP30"; 

        let forminputbyuser = {
            proposerName: self.getTitle()+" "+ self.getFName() + " "+self.getMName()+" " + self.getLName(),
            age: self.getMahaAnandAge(),
            gender: self.getGender(),
            policyTerm: self.getPolicyTerm(),
            premiumfrequencymode: self.getFrequencyMode(),
            premiumAmount: self.getPremiumAmount(),
            SAMF: self.getSAMF(),
            numberOfElapsed: self.getYearsElapsed(),
            percentEquityEliteiiFund: self.getEquityFund(),
            percentBalancedFund: self.getBalanceFund(),
            percentBondFund: self.getBondFund(),
            isADBRider: self.getIsAccidentalDeathBenefit(),
            adbTerm: self.getRiderTerm(),
            adbSA: self.getADBSumAssured(),
            //  premiumFrequency: self.getPremiumFreq(),

            //  premiumPayingTerm: self.getPremiumPayingTerm(),

            //planOption: self.getPlanOption(),

            //   percentMoneyMarketFund: self.getMoneyMarketFund(),
            quotationNumber: quotNumber,
            staffDiscount: staffDiscount,
            PlanName: self.productDetails.title,
            CustTitle: self.getTitle(),
            CustFirstName: self.getFName(),
            CustMiddleName: self.getMName(),
            CustLastName: self.getLName(),
            CustMobile: self.getMobileNo(),
            CustEmailID: self.getEmailId(),
            LaDOB: getDDMMYYYY(self.getDob()),
            ProposerDOB: '',
            //BasicSA: basicSA,
            TotalPremAmt: self.getPremiumAmount(),
            Frequency: self.getFrequencyMode(),
            PolicyTerm: self.getPolicyTerm(),
            PremPayingTerm: 0,
            PlanCode: planCode
        };

        self.showLoader();
        // hitPremiumCaclService('getPremiumSmartPowerInsurance', '', '', userID,userMail, userMobile, userAuth).then((data) => {
        //         console.log(data);
        //     }).catch((reject) => {
        //         console.log(reject);
        //     });
        let inputXml = getInput(forminputbyuser)
        ApiCallService('/getPremiumSaralMahaAanand', body, '<saralMahaAnand>', '</saralMahaAnand>',true).then((data) => {
            self.hideLoader();
            data = data.saralMahaAnand;
            forminputbyuser.BasicSA = data.sumAssured
            data.productDetails = self.productDetails;
            var stringifyJson = JSON.stringify(data);
            sessionStorage.setItem('premiumCalcResponse',stringifyJson);

            //Added by sonali
            if(sessionStorage.premiumCalcOutput){
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');                
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>'); 
                var lastIndex =  premiumCalcXMLResponse.indexOf(`</Commission${getPolicyTerm()}>`);                
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex+`</Commission${getPolicyTerm()}>`.length);  
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput,"");
                let output = appendXMLTagAtStart(remaningOutput);

                let escapedBIOutput = escapeInputHTML(output);
                sessionStorage.setItem("BIOutput", escapedBIOutput); // BI Output.

                let escapedBIInput = escapeInputHTML(inputXml);
                sessionStorage.setItem("BIInput", escapedBIInput); // BI Input.
                //console.log("remaningOutput ",remaningOutput);
            }
            //end
            if (sessionStorage.ThroughNeedAnalysis) {
                let status = sessionStorage.getItem('ThroughNeedAnalysis');

                if (status === 'Yes') {
                    //added by bharamu
                    updateDataInDB(forminputbyuser).then((resolve) => {
                        if (resolve == "1") {
                            createPDFGeneralMethod(this.productDetails, data, forminputbyuser)
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
        console.log(" in error ", message);
        self.hideLoader();
        alert("Unable to generate quotation number");

    });
}

/************************ update lable *********************/
function updatePremiumAmountLable() {
    var mode = getFrequencyMode();
    var view = document.getElementById("saralMahaAnandPamount");
    switch (mode) {
        case "Yearly":
            view.innerHTML = "Premium Amount (Rs. " + new Intl.NumberFormat('en-IN').format(premiumFrequencyModeList[0].minPremAmt) + " to Rs. " + new Intl.NumberFormat('en-IN').format(premiumFrequencyModeList[0].maxPremAmt) + ")";
            break;

        case "Half Yearly":
            view.innerHTML = "Premium Amount (Rs. " + new Intl.NumberFormat('en-IN').format(premiumFrequencyModeList[1].minPremAmt) + " to Rs. " + new Intl.NumberFormat('en-IN').format(premiumFrequencyModeList[1].maxPremAmt) + ")";
            break;

        case "Quarterly":
            view.innerHTML = "Premium Amount (Rs. " + new Intl.NumberFormat('en-IN').format(premiumFrequencyModeList[2].minPremAmt) + " to Rs. " + new Intl.NumberFormat('en-IN').format(premiumFrequencyModeList[2].maxPremAmt) + ")";
            break;

        case "Monthly":
            view.innerHTML = "Premium Amount (Rs. " + new Intl.NumberFormat('en-IN').format(premiumFrequencyModeList[3].minPremAmt) + " to Rs. " + new Intl.NumberFormat('en-IN').format(premiumFrequencyModeList[3].maxPremAmt) + ")";
            break;

        default:
            view.innerHTML = "Premium Amount (Rs. " + new Intl.NumberFormat('en-IN').format(premiumFrequencyModeList[0].minPremAmt) + " to Rs. " + new Intl.NumberFormat('en-IN').format(premiumFrequencyModeList[0].maxPremAmt) + ")";
            break;
    }
}

function updateSAMFlabel() {
    var minSAMF = 0, temp1 = 0, temp2 = 0;
    if (getMahaAnandAge() < 45) {
        temp1 = 10;
    } else {
        temp1 = 7;
    }
    temp2 = calMinSA() / getEffectivePremium(getFrequencyMode());
    if (!isNaN(temp2) && temp2 != 0) {
        minSAMF = Math.max(temp1, temp2);
    }
    //console.log(temp2)
    document.getElementById("samfLable").innerHTML = "Sum Assured multiple factors (SAMF)(" + minSAMF + " to " + maxSAMF + ")";
}

function updateYearElapsedLable() {
    document.getElementById("yearElapsedTitle").innerHTML = "No. of Years Elapsed Since Inception (5 to " + getPolicyTerm() + " years)";
}

function updateSumAssuredADBlabel() {
    var minADB_SA = 0, maxADB_SA = 0, new_maxADB_SA = 0;
    minADB_SA = Math.max(Math.min(25000, (getEffectivePremium() * getSAMF())), 25000);
    maxADB_SA = getEffectivePremium() * getSAMF();
   
    if ((maxADB_SA % 1000) != 0) {
        var remainder = maxADB_SA % 1000;
        new_maxADB_SA = maxADB_SA - remainder;
    } else {
        new_maxADB_SA = maxADB_SA;
    }
    document.getElementById("sumAssuredLable").style.display = "block";
    document.getElementById("sumAssuredLable").innerHTML = "ADB Sum Assured *(Rs. " + new Intl.NumberFormat('en-IN').format(minADB_SA)
            + " to Rs. " + new Intl.NumberFormat('en-IN').format(new_maxADB_SA) + ")";
}

/****************** end ***************************************/

/************************* getDatas **************************/

function getTitle() {
    return document.forms["saralMahaAnandForm"]["title"].value;
}

function getGender() {
    return document.forms["saralMahaAnandForm"]["gender"].value;
}

function getFName() {
    return document.forms["saralMahaAnandForm"]["first_name"].value;
}

function getMName() {
    return document.forms["saralMahaAnandForm"]["middle_name"].value;
}

function getLName() {
    return document.forms["saralMahaAnandForm"]["last_name"].value;
}

function getDob() {
    return document.forms["saralMahaAnandForm"]["dob"].value;
}

function getMahaAnandAge() {
    return parseInt(document.forms["saralMahaAnandForm"]["saralMahaAnandAge"].value);
}

function getMobileNo() {
    return document.forms["saralMahaAnandForm"]["mobile"].value;
}

function getEmailId() {
    return document.forms["saralMahaAnandForm"]["email"].value;
}

function getPolicyTerm() {
    return parseInt(document.forms["saralMahaAnandForm"]["saralMahaAnandPolicyTerm"].value);
}

function getFrequencyMode() {
    var index = document.forms["saralMahaAnandForm"]["premiumFrequencyMode"].value;
    return premiumFrequencyModeList[index - 1].title;
}

function getPremiumAmount() {
    var amount = parseInt(document.forms["saralMahaAnandForm"]["premiumAmount"].value)
    if (isNaN(amount) || amount == '' || amount == null) {
        return 0;
    } else {
        return amount;
    }
}

function getSAMF() {
    var samf = parseFloat(document.forms["saralMahaAnandForm"]["samf"].value);

    if (isNaN(samf) || samf == '' || samf == null)
        return 0;
    else
        return samf;
}

function getYearsElapsed() {
    return parseInt(document.forms["saralMahaAnandForm"]["saralMahaAnandYearElapsed"].value);
}

function getEquityFund() {
    var fund = parseInt(document.forms["saralMahaAnandForm"]["equityFund"].value) 
    if(isNaN(fund) || fund == undefined)
        return 0;
    else
        return fund;
}

function getBalanceFund() {
    var fund =  parseInt(document.forms["saralMahaAnandForm"]["balancedFund"].value);
    if(isNaN(fund) || fund == undefined)
        return 0;
    else
        return fund;
}

function getBondFund() {
    var fund =  parseInt(document.forms["saralMahaAnandForm"]["bondFund"].value);
    if(isNaN(fund) || fund == undefined)
        return 0;
    else
        return fund;
}

function getIsAccidentalDeathBenefit() {
    var isAccidental = document.forms["saralMahaAnandForm"]["rider_switch"].checked;
    return isAccidental;
}

function getADBSumAssured() {
    var sumAssured = parseInt(document.forms["saralMahaAnandForm"]["adb_sum_assured"].value);
    if (isNaN(sumAssured) || sumAssured == '' || sumAssured == null) {
        return 0;
    } else {
        return sumAssured;
    }
}

function getIsStaff() {
    var checkBox = document.getElementById('saralMahaAnandStaffDiscount');
    return checkBox.checked;
}

function getRiderTerm() {
    return parseInt(document.forms["saralMahaAnandForm"]["adbSA"].value);
}
//Added by sonali
function getPremiumFreq() {
    var index = document.forms["saralMahaAnandForm"]["premiumPaymentFrequency"].value;
    return premiumFrequencyList[index].title;
}


function getMinimumPremiumAmount(paymentMode) {
    if (paymentMode == "Monthly") {
        return premiumFrequencyModeList[3].minPremAmt;
    } else if (paymentMode == "Quarterly") {
        return premiumFrequencyModeList[2].minPremAmt;
    } else if (paymentMode == "Half Yearly") {
        return premiumFrequencyModeList[1].minPremAmt;
    } else if (paymentMode == "Yearly") {
        return premiumFrequencyModeList[0].minPremAmt;
    }
}

function getMaximiumPremiumAmount(paymentMode) {

    if (paymentMode == "Monthly") {
        return premiumFrequencyModeList[3].maxPremAmt;
    } else if (paymentMode == "Quarterly") {
        return premiumFrequencyModeList[2].maxPremAmt;
    } else if (paymentMode == "Half Yearly") {
        return premiumFrequencyModeList[1].maxPremAmt;
    } else if (paymentMode == "Yearly") {
        return premiumFrequencyModeList[0].maxPremAmt;
    }
}
/********************* end *********************************************/
function validateGender(formElementName) {
    //console.log("formElementName",formElementName)
        var laGender = document.forms["saralMahaAnandForm"]["gender"].value;
       
        document.getElementById("title").options[0].disabled = false;
        document.getElementById("title").options[1].disabled = false;
        document.getElementById("title").options[2].disabled = false;

    if (formElementName === "gender") {
        if (laGender === "Male" ) {
            document.getElementById("title").options[1].disabled = true;
            document.getElementById("title").options[2].disabled = true;
            document.getElementById("title").options[0].selected = true;
        } else if (laGender === "Female") {
            document.getElementById("title").options[0].disabled = true;
            document.getElementById("title").options[1].disabled = false;
            document.getElementById("title").options[2].disabled = false;
            document.getElementById("title").options[1].selected = true;
        }else{
            document.getElementById("title").options[0].disabled = false;
            document.getElementById("title").options[1].disabled = false;
            document.getElementById("title").options[2].disabled = false;
        }
   
    }

    if (laGender !== "Female" && laGender !== "Male" ) {
        document.getElementById("genderErrId").style.display = "block";
        document.getElementById("genderErrId").innerHTML =
        "Please select your gender.";
        return false;
    } else {
        
        document.getElementById("genderErrId").style.display = "none";
        return true;
    }
}