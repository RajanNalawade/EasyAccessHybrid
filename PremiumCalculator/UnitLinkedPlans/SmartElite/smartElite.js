window.onload = function () {
    this.ready();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails;

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    // showLoader();
    this.hideErrMsg();
    this.initArrayList();
    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    this.initializeData()
    this.setYearElapsedLable();
    this.setPremiumAmountLable();
    this.updateSAMFlabel();
    // hideLoader();
    setKerlaDiscount();
};

function hideErrMsg() {
    document.getElementById('divPremPayingTerm').style.display = "none";
    document.getElementById('divPremFreqMode').style.display = "none";
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
/* 
function getQueryStringDesializedData() {
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queries = queryString.split("&");
    return JSON.parse(queries[0].split("product=").pop());
}
 */
function initArrayList() {

    policyListElement = document.forms["smartEliteForm"]["policyTerm"];
    for (i = minPolicyTerm; i <= maxPolicyTerm; i++) {
        policyListElement.add(new Option(i));
    }

    premiumPaymentFreqListElement = document.forms["smartEliteForm"]["premiumPaymentFrequency"];
    for (i = 0; i < premiumFrequencyList.length; i++) {
        premiumPaymentFreqListElement.add(new Option(premiumFrequencyList[i].title, premiumFrequencyList[i].value));
    }

    premiumPayingTermElement = document.forms["smartEliteForm"]["premiumPayingTerm"];
    for (i = 0; i < premiumPayingTermList.length; i++) {
        premiumPayingTermElement.add(new Option(premiumPayingTermList[i].title, premiumPayingTermList[i].value));
    }

    premiumFrequencyModeElement = document.forms["smartEliteForm"]["premiumFrequencyMode"];
    for (i = 0; i < premiumFrequencyModeList.length; i++) {
        premiumFrequencyModeElement.add(new Option(premiumFrequencyModeList[i].title, premiumFrequencyModeList[i].value));
    }
}

function displaySIFNFundDetails() {
    if (getIsSIFNFunds() == true) {
        document.getElementById("sfinFundDetails").style.display = "block";
    } else {
        document.getElementById("sfinFundDetails").style.display = "none";
    }
}
/**********************DOM Events**********************/
function onPremFreqChange() {
    let premFreq = getPremiumFreq();

    if (premFreq === 'Single') {
        document.getElementById('divPremPayingTerm').style.display = "none";
        document.getElementById('divPremFreqMode').style.display = "none";
    } else if (premFreq === 'Limited') {
        document.getElementById('divPremPayingTerm').style.display = "block";
        document.getElementById('divPremFreqMode').style.display = "block";
    }
}

function validateGender(formElementName) {
    var laGender = document.forms["smartEliteForm"]["gender"].value;
    if (laGender === "Male") {
        document.getElementById("title").options[1].disabled = true;
        document.getElementById("title").options[2].disabled = true;
        document.getElementById("title").options[0].selected = true;
    } else if (laGender === "Female") {
        document.getElementById("title").options[0].disabled = true;
        document.getElementById("title").options[1].disabled = false;
        document.getElementById("title").options[2].disabled = false;
        document.getElementById("title").options[1].selected = true;
    } else {
        document.getElementById("title").options[0].disabled = false;
        document.getElementById("title").options[1].disabled = false;
        document.getElementById("title").options[2].disabled = false;
    }
    if (laGender != "Male" && laGender != "Female" && laGender !== "Third Gender") {
        document.getElementById("genderErrId").style.display = "block";
        document.getElementById("genderErrId").innerHTML =
            "Please select your gender.";
        return false;
    } else {
        document.getElementById("genderErrId").style.display = "none";
        return true;
    }
}

function calculateAge(birthday) {
    // miliseconds from epoch

    var age = getAgeFromBirthdate(birthday);
    document.forms["smartEliteForm"]["age"].innerHTML = age;
    document.forms["smartEliteForm"]["age"].value = age;

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

function validateEmailIdS() {
    var email = getEmail();
    var cEmail = document.forms["smartEliteForm"]["confirmEmail"].value;
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

function validatePremiumAmt() {
    if (getPremiumAmount() == 0) {
        document.getElementById("premiumAmtErrId").style.display = "block";
        document.getElementById("premiumAmtErrId").innerHTML = "Please enter Premium Amount in Rs. ";
        return false;
    } else if (getPremiumAmount() % 100 != 0) {
        document.getElementById("premiumAmtErrId").style.display = "block";
        document.getElementById("premiumAmtErrId").innerHTML = "Premium Amount should be multiple of 100";
        return false;
    } else {
        // For Single Premium
        var premiumFreq = getPremiumFreq();
        if (premiumFreq == ("Single")) {
            if (getPremiumAmount() < 200000) {
                document.getElementById("premiumAmtErrId").style.display = "block";
                document.getElementById("premiumAmtErrId").innerHTML = "Premium Amount should not be less than Rs. 2,00,000";
                return false;
            }
        }
        // For Regular Frequency Mode
        else {
            if (getPremiumAmount() < getMinimumPremiumAmount()) {
                document.getElementById("premiumAmtErrId").style.display = "block";
                document.getElementById("premiumAmtErrId").innerHTML = "Premium Amount should not be less than Rs. " + new Intl.NumberFormat('en-IN').format(getMinimumPremiumAmount());
                return false;
            }
        }
        document.getElementById("premiumAmtErrId").style.display = "none";
        return true;
    }

}

function validateSAMF() {
    var samf = parseFloat(getSAMF());
    var view = document.getElementById("samfErrId");
    if (isNaN(getSAMF()) || samf == '' || samf == null) {
        view.style.display = "block";
        view.innerHTML = "Please enter Sum Assured Multiple Factor (SAMF)";
    } else if (getPremiumFreq() == "Single") {
        /* Modified by Akshaya on 3-APR-2014 start ***/
        var maxSAMFforSingleFreq = 0,
            minSAMFforSinglefreq = 0;

       // if (getEliteAge() < 45) {
        //     minSAMFforSinglefreq = 1.25;
        // } else {
        //     minSAMFforSinglefreq = 1.1;
        // }
        // maxSAMFforSingleFreq = 5;
        minSAMFforSinglefreq = 1.25;
        maxSAMFforSingleFreq = 1.25;

        if (samf < minSAMFforSinglefreq || samf > maxSAMFforSingleFreq) {
            view.style.display = "block";
            view.innerHTML = "Sum Assured Multiple Factor (SAMF) should be in the range of " + minSAMFforSinglefreq +
                " to " +
                maxSAMFforSingleFreq +
                " for Single Frequency Mode";
            return false;
        }
    }
    // For Regular Frequency Mode
    else {
        var minSAMFforLPPTfreq = 0,
            maxSAMFforLPPTfreq = 0;
         // if (getEliteAge() < 45) {
        //     minSAMFforLPPTfreq = 10;
        // } else {
        //     minSAMFforLPPTfreq = 7;
        // }
        // maxSAMFforLPPTfreq = 20;
        minSAMFforLPPTfreq = 10;
        maxSAMFforLPPTfreq = 10;

        if (samf < minSAMFforLPPTfreq || samf > maxSAMFforLPPTfreq) {
            view.style.display = "block";
            view.innerHTML = "Sum Assured Multiple Factor (SAMF) should be in the range of " +
                minSAMFforLPPTfreq +
                " to " +
                maxSAMFforLPPTfreq +
                " for LPPT Frequency Mode";
            return false;
        }
    }
    view.style.display = "none";
    return true;
}

function validateYearsElapsedSinceInception() {
    if (getNoOfYearsElapsed() == 0 || getNoOfYearsElapsed() < 5 || getNoOfYearsElapsed() > getPolicyTerm()) {
        document.getElementById("yearElapsedErrId").style.display = "block";
        document.getElementById("yearElapsedErrId").innerHTML = ("Enter No. of Years Elapsed Since Inception between 5 to " +
            getPolicyTerm() +
            " Years");
        return false;

    }
    document.getElementById("yearElapsedErrId").style.display = "none";
    return true;
}

// Addition of invested fund must be 100%
function validateTotalAllocation() {
    var equityEliteIIFund, balancedFund, bondFund, moneyMarketFund,
    PureFund, MidcapFund, BondOptimiserFund, corporateBondFund;

    equityEliteIIFund = getEquityFund();
    balancedFund = getBalancedFund();
    bondFund = getBondFund();
    moneyMarketFund = getMoneyMarketFund();
    PureFund = getPureFund();
    MidcapFund = getMidcapFund();
    BondOptimiserFund = getBondOptimiserFund();
    corporateBondFund = getCorporateBondFund();

    var totalFund = equityEliteIIFund + balancedFund + bondFund + moneyMarketFund + PureFund + MidcapFund +
        +BondOptimiserFund + corporateBondFund;
    console.log("totalFund:" + totalFund)
    if (totalFund != 100) {
        document.getElementById("fundErrId").style.display = "block";
        document.getElementById("fundErrId").innerHTML = "Total sum of % to be invested for all fund should be equal to 100%";
        return false;
    } else {
        document.getElementById("fundErrId").style.display = "none";
        return true;
    }
}

// Validate Premium Paying Term
function valPPT() {

    if (getPremiumPayingTerm() > getPolicyTerm()) {
        if (getPremiumFreq() == ("Limited")) {
            document.getElementById("pptErrId").style.display = "block"
            document.getElementById("pptErrId").innerHTML = "Premium Paying Term should be less than or equal to Policy Term";
            return false;
        }
    }
    document.getElementById("pptErrId").style.display = "none"
    return true;

}

// Policy term [Maximum Policy Term based on age validation]

function valPolicyTerm() {
    var minPloicyTerm = 0;
    if (getPremiumFreq() == ("Single")) {
        minPloicyTerm = 5;
    } else {
        minPloicyTerm = 10;
    }
    var maxPolicyTerm = Math.min(20, (65 - getEliteAge()));
    var policyTerm = getPolicyTerm();
    if ((policyTerm > maxPolicyTerm) || (((policyTerm < 5) && getPremiumFreq() == "Single") ||
            ((policyTerm < 5) && getPremiumFreq() == "Limited"))) {
        document.getElementById("policyTermErrId").style.display = "block";
        document.getElementById("policyTermErrId").innerHTML = "Maximum Maturity Age is 65 years ." +
            "Please enter Policy Term between " + minPloicyTerm + " to " + maxPolicyTerm + " years";
        return false;
    } else if (policyTerm < 10 && getPremiumFreq() == "Limited") {
        document.getElementById("policyTermErrId").style.display = "block";
        document.getElementById("policyTermErrId").innerHTML = "Maximum Maturity Age is 65 years ." +
            "Please enter Policy Term between " + minPloicyTerm + " to " + maxPolicyTerm + " years";
        return false;
    } else {
        document.getElementById("policyTermErrId").style.display = "none";
        return true;
    }
}

function onSubmitForm() {
    //&& validateEmailIdS()
    getPureFund();
    if (smartEliteForm.checkValidity() && this.validateConfirmEmail() && validateGender() &&
        calculateAge(getDDMMYYYY(getDob())) && validateMobileNo(getMobileNo()) &&
        valPPT() && valPolicyTerm() && validatePremiumAmt() &&
        validateSAMF() && validateYearsElapsedSinceInception() && validateTotalAllocation()) {
        calculatePremiumAPICall();
    }
}


function getInput(forminputbyuser) {
    let getInputXML = `<?xml version='1.0' encoding='utf-8' ?><smartelite>
    <LifeAssured_title>${this.getTitle()}</LifeAssured_title>
    <LifeAssured_firstName>${this.fName()}</LifeAssured_firstName>
    <LifeAssured_middleName>${this.MName()}</LifeAssured_middleName>
    <LifeAssured_lastName>${this.LName()}</LifeAssured_lastName>
    <LifeAssured_DOB>${getDDMMYYYY(this.getDob())}</LifeAssured_DOB>
    <LifeAssured_age>${forminputbyuser.age}</LifeAssured_age>
    <gender>${forminputbyuser.gender}</gender>

    <proposer_title></proposer_title>
    <proposer_firstName></proposer_firstName>
    <proposer_middleName></proposer_middleName>
    <proposer_lastName></proposer_lastName>
    <proposer_DOB></proposer_DOB>
    <proposer_age></proposer_age>
    <proposer_gender></proposer_gender>

    <product_name>${this.productDetails.title}</product_name>
    <product_Code>${this.productDetails.productCode}</product_Code>
    <product_UIN>${this.productDetails.uinNumber}</product_UIN>
    <product_cateogory>${product_cateogory}</product_cateogory>
    <product_type>${product_type}</product_type>

    <proposer_Is_Same_As_Life_Assured>Y</proposer_Is_Same_As_Life_Assured>
    <isStaff>${this.getIsStaff()}</isStaff>
    <isBancAssuranceDisc>false</isBancAssuranceDisc>
    <age>${forminputbyuser.age}</age>
    <SAMF>${this.getSAMF()}</SAMF>
    <premiumAmount>${this.getPremiumAmount()}</premiumAmount>
    <noOfYrElapsed>${forminputbyuser.numberOfElapsed}</noOfYrElapsed>
    <premFreq>${forminputbyuser.premiumFrequency}</premFreq>
    <premFreqMode>${forminputbyuser.premiumfrequencymode}</premFreqMode>
    <plan>${forminputbyuser.planOption}</plan>
    <effectivePremium>${this.getPremiumAmount()}</effectivePremium>
    <premPayingTerm>${self.getPremiumPayingTerm()}</premPayingTerm>
    <policyTerm>${self.getPolicyTerm()}</policyTerm>
    <perInvEquityEliteIIFund>${self.getEquityFund()}</perInvEquityEliteIIFund>
    <perInvEquityEliteIIFund>${self.getEquityFund()}</<perInvEquityEliteIIFund>>
    <perInvBondFund>${self.getBondFund()}</perInvBondFund>
    <perInvBalancedFund>${self.getBalancedFund()}</perInvBalancedFund>
    <perInvMoneyMarketFund>${self.getMoneyMarketFund()}</perInvMoneyMarketFund>
    <perInvPureFund>${self.getPureFund()}</perInvPureFund>
    <perInvMidcapFund>${self.getMidcapFund()}</perInvMidcapFund>
    <perInvBondOptimiserFund>${self.getBondOptimiserFund()}</perInvBondOptimiserFund>
    <perInvEquityFund></perInvEquityFund>
    <perInvCorporateBondFund>${self.getCorporateBondFund()}</perInvCorporateBondFund>
    <perInvDiscontinuedpolicyfund></perInvDiscontinuedpolicyfund>
    <KFC>${forminputbyuser.KFC}</KFC>
    <BIVERSION>3</BIVERSION>
  </smartelite>`;
    let escapedHTML = escapeInputHTML(getInputXML);
    sessionStorage.setItem("BIInput", escapedHTML);
    return escapedHTML;
}

function calculatePremiumAPICall() {
    showLoader();
    let xmlBodyParam = `<getPremiumSmartElite xmlns="http://tempuri.org/">
    <isStaff>${self.getIsStaff()}</isStaff>
    <isBancAssuranceDisc>false</isBancAssuranceDisc>
    <age>${self.getEliteAge()}</age>
    <gender>${self.getGender()}</gender>
    <policyTerm>${self.getPolicyTerm()}</policyTerm>
    <planType>${self.getPremiumFreq()}</planType>
    <planOption>${self.getPlanOption()}</planOption>
    <premFreqMode>${(self.getPremiumFreq() == "Single" ? "Yearly" : self.getFreqMode())}</premFreqMode>
    <premPayingTerm>${self.getPremiumPayingTerm()}</premPayingTerm>
    <effectivePremium>${this.getPremiumAmount()}</effectivePremium>
    <premiumAmount>${self.getPremiumAmount()}</premiumAmount>
    <SAMF>${self.getSAMF()}</SAMF>
    <noOfYrElapsed>${self.getNoOfYearsElapsed()}</noOfYrElapsed>
    <perInvEquityEliteIIFund>${self.getEquityFund()}</perInvEquityEliteIIFund>
    <perInvBondFund>${self.getBondFund()}</perInvBondFund>
    <perInvBalancedFund>${self.getBalancedFund()}</perInvBalancedFund>
    <perInvMoneyMarketFund>${self.getMoneyMarketFund()}</perInvMoneyMarketFund>
    <perInvBondOptimiserFund>${self.getBondOptimiserFund()}</perInvBondOptimiserFund>
    <perInvMidcapFund>${self.getMidcapFund()}</perInvMidcapFund>
    <perInvPureFund>${self.getPureFund()}</perInvPureFund>
    <perInvCorpBondFund>${self.getCorporateBondFund()}</perInvCorpBondFund>
    <KFC>${getKerlaDiscount()}</KFC>
  </getPremiumSmartElite>`;

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
        if (self.getIsStaff() === "true") {
            staffDiscount = "Yes";
        } else {
            staffDiscount = "No";
        }

        const basicSA = parseInt(self.getPremiumAmount()) * parseInt(self.getSAMF());

        let planCode = '';
        if (self.getPlanOption() === 'Gold') {
            planCode = 'UPE3PGC0';
        } else {
            planCode = 'UPE3PPC0';
        }

        let forminputbyuser = {
            proposerName: self.getTitle() + " " + self.fName() + " " + self.LName(),
            age: self.getEliteAge(),
            gender: self.getGender(),
            premiumFrequency: self.getPremiumFreq(),
            premiumPayingTerm: self.getPremiumPayingTerm(),
            premiumfrequencymode: self.getFreqMode(),
            planOption: self.getPlanOption(),
            percentBalancedFund: self.getBalancedFund(),
            percentBondFund: self.getBondFund(),
            percentMoneyMarketFund: self.getMoneyMarketFund(),
            percentEquityEliteiiFund: self.getEquityFund(),
            perInvPureFund: self.getPureFund(),
            perInvMidcapFund: self.getMidcapFund(),
            perInvBondOptimiserFund: self.getBondOptimiserFund(),
            perInvCorporateBondFund: self.getCorporateBondFund(),
            premiumAmount: self.getPremiumAmount(),
            policyTerm: self.getPolicyTerm(),
            numberOfElapsed: self.getNoOfYearsElapsed(),
            quotationNumber: quotNumber,
            staffDiscount: staffDiscount,
            PlanName: self.productDetails.title,
            CustTitle: self.getTitle(),
            CustFirstName: self.fName(),
            CustMiddleName: self.MName(),
            CustLastName: self.LName(),
            CustMobile: self.getMobileNo(),
            CustEmailID: self.getEmail(),
            LaDOB: getDDMMYYYY(self.getDob()),
            ProposerDOB: '',
            BasicSA: basicSA,
            TotalPremAmt: self.getPremiumAmount(),
            Frequency: self.getPremiumFreq(),
            PolicyTerm: self.getPolicyTerm(),
            PremPayingTerm: self.getPremiumPayingTerm(),
            PlanCode: planCode,
            KFC: getKerlaDiscount() ? "Y" : "N",
            userType: getUserType()
        };

        let inputXml = getInput(forminputbyuser);
        console.log(body);
        ApiCallService('/getPremiumSmartElite', body, '<smartElite>', '</smartElite>', true).then((data) => {
            hideLoader();
            data = data.smartElite;
            data.productDetails = self.productDetails;
            data.premiumFreq = self.getPremiumFreq();
            var stringifyJson = JSON.stringify(data);

            //Added by sonali
            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                var lastIndex = premiumCalcXMLResponse.indexOf(`</CommIfPay8Pr${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</CommIfPay8Pr${getPolicyTerm()}>`.length);
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");
                var index = forminputbyuser.PolicyTerm;
                var FundValAtEnd4Pr = parseXmlTag(premiumCalcXMLResponse, "FundValAtEnd4Pr" + index + "");
                var FundValAtEnd8Pr = parseXmlTag(premiumCalcXMLResponse, "FundValAtEnd8Pr" + index + "");
                var FundValAtEnd = '';
                FundValAtEnd = "<FundValAtEnd4Pr" + index + ">" + FundValAtEnd4Pr + "</FundValAtEnd4Pr" + index + ">";
                FundValAtEnd += "<FundValAtEnd8Pr" + index + ">" + FundValAtEnd8Pr + "</FundValAtEnd8Pr" + index + ">";
                remaningOutput = remaningOutput + FundValAtEnd + "</smartElite>"
                remaningOutput = "<?xml version='1.0' encoding='utf-8' ?>" + remaningOutput;
                let escapedBIOutput = escapeInputHTML(remaningOutput);
                sessionStorage.setItem("BIOutput", escapedBIOutput); // BI Output.
            }
            //end

            if (sessionStorage.ThroughNeedAnalysis) {
                let status = sessionStorage.getItem('ThroughNeedAnalysis');

                if (status === 'Yes') {
                    forminputbyuser.BasicSA = data.sumAssured;
                    updateDataInDB(forminputbyuser).then((resolve) => {
                        if (resolve == "1") {
                            createPDFGeneralMethod(self.productDetails, data, forminputbyuser)
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
            console.log(" in error ", error);
            hideLoader();
        });
    }).catch((message) => {
        console.log(" in error ", message);
        alert("Unable to generate quotation number");
        hideLoader();
    });
}

/*******************set lables**********************/
function setYearElapsedLable() {
    document.getElementById("smarteliteYearElapsed").innerHTML = "No. of Years Elapsed Since Inception: (5 to " + getPolicyTerm() + " years)";
}

function setPremiumAmountLable() {
    if (getPremiumFreq() === "Single") {
        document.getElementById("smartElitePremiumAmount").innerHTML = "Premium Amount (Min. Rs. " + new Intl.NumberFormat('en-IN').format(premiumFrequencyList[0].minPremiumAmount) + ")"
    } else if (getPremiumFreq() === "Limited") {
        if (getFreqMode() === "Yearly") {
            document.getElementById("smartElitePremiumAmount").innerHTML = "Premium Amount (Min. Rs. " + new Intl.NumberFormat('en-IN').format(premiumFrequencyModeList[0].minPremiumAmount) + ")";
        } else if (getFreqMode() === "Half Yearly") {
            document.getElementById("smartElitePremiumAmount").innerHTML = "Premium Amount (Min. Rs. " + new Intl.NumberFormat('en-IN').format(premiumFrequencyModeList[1].minPremiumAmount) + ")";
        } else if (getFreqMode() == "Quarterly") {
            document.getElementById("smartElitePremiumAmount").innerHTML = "Premium Amount (Min. Rs. " + new Intl.NumberFormat('en-IN').format(premiumFrequencyModeList[2].minPremiumAmount) + ")";
        } else if (getFreqMode() == "Monthly") {
            document.getElementById("smartElitePremiumAmount").innerHTML = "Premium Amount (Min. Rs. " + new Intl.NumberFormat('en-IN').format(premiumFrequencyModeList[3].minPremiumAmount) + ")";
        }
    }
}

function updateSAMFlabel() {
    if (getPremiumFreq() === ("Single")) {
        /* Modified by Akshaya on 3-APR-2014 start ***/
        var maxSAMFforSingleFreq = 0,
            minSAMFforSinglefreq = 0;
        // if (getEliteAge() < 45) {
        //     minSAMFforSinglefreq = 1.25;
        // } else {
        //     minSAMFforSinglefreq = 1.1;
        // }
        minSAMFforSinglefreq = 1.25;
        maxSAMFforSingleFreq = 1.25;
        document.getElementById("smartEliteSAMF").innerHTML = "Sum Assured Multiple Factor[SAMF] (" + minSAMFforSinglefreq + " to " +
            maxSAMFforSingleFreq + ")"
    } else {
        var minSAMFforLPPTfreq = 0,
            maxSAMFforLPPTfreq = 0;
        // if (getEliteAge() < 45) {
        //     minSAMFforLPPTfreq = 10;
        // } else {
        //     minSAMFforLPPTfreq = 7;
        // }
        // maxSAMFforLPPTfreq = 20;
        minSAMFforLPPTfreq = 10;
        maxSAMFforLPPTfreq = 10;
        document.getElementById("smartEliteSAMF").innerHTML = "Sum Assured Multiple Factor[SAMF] (" + minSAMFforLPPTfreq + " to " +
            maxSAMFforLPPTfreq + ")"
    }
}
/***************************************************/

/*****************GETTERS***************************/

function getTitle() {
    return document.forms["smartEliteForm"]["title"].value;
}

function getIsStaff() {
    var checkBox = document.getElementById('smartEliteStaffDiscount');
    return checkBox.checked;
}

function getGender() {
    return document.forms["smartEliteForm"]["gender"].value;
}

function fName() {
    return document.forms["smartEliteForm"]["first_name"].value;
}

function MName() {
    return document.forms["smartEliteForm"]["middle_name"].value;
}

function LName() {
    return document.forms["smartEliteForm"]["last_name"].value;
}

function getDob() {
    return (document.forms["smartEliteForm"]["dob"].value);
}

function getEliteAge() {
    return parseInt(document.forms["smartEliteForm"]["age"].value);
}

function getMobileNo() {
    return document.forms["smartEliteForm"]["mobile"].value;
}

function getEmail() {
    return document.forms["smartEliteForm"]["email"].value;
}

function getConfirmEmail() {
    return document.forms["smartEliteForm"]["confirmEmail"].value;
}

function getPolicyTerm() {
    return parseInt(document.forms["smartEliteForm"]["policyTerm"].value);
}

function getPremiumFreq() {
    var index = document.forms["smartEliteForm"]["premiumPaymentFrequency"].value;
    return premiumFrequencyList[index].title;
}

function getPremiumPayingTerm() {
    var premPayingTerm = "0";
    if (getPremiumFreq() == "Single") {
        premPayingTerm = "1";
    } else {
        premPayingTerm = parseInt(document.forms["smartEliteForm"]["premiumPayingTerm"].value);
    }
    return premPayingTerm;
}

function getFreqMode() {
    var index = document.forms["smartEliteForm"]["premiumFrequencyMode"].value;
    return premiumFrequencyModeList[index].title;
}

function getPremiumAmount() {
    var pamount = parseInt(document.forms["smartEliteForm"]["premiumAmount"].value);
    if (isNaN(pamount) || pamount == '' || pamount == null) {
        return 0;
    }
    return pamount;
}

function getSAMF() {
    return (document.forms["smartEliteForm"]["samf"].value);
}

function getPlanOption() {
    return (document.forms["smartEliteForm"]["planOption"].value);
}

function getNoOfYearsElapsed() {
    var years = parseInt(document.forms["smartEliteForm"]["smartEliteYearElapsed"].value);

    if (isNaN(years) || years == '' || years == null) {
        return 0;
    }
    return years;
}

function getEquityFund() {
    var equityFund = parseInt(document.forms["smartEliteForm"]["equityFund"].value);
    if (isNaN(equityFund) || equityFund == '' || equityFund == null) {
        return 0.0;
    }
    return equityFund;
}

function getBalancedFund() {
    var balancedFund = parseInt(document.forms["smartEliteForm"]["balancedFund"].value);
    if (isNaN(balancedFund) || balancedFund == '' || balancedFund == null) {
        return 0.0;
    }
    return balancedFund;
}

function getBondFund() {
    var bondFund = parseInt(document.forms["smartEliteForm"]["bondFund"].value);
    if (isNaN(bondFund) || bondFund == '' || bondFund == null) {
        return 0.0;
    }
    return bondFund;
}

function getPureFund() {
    var purefund = parseInt(document.forms["smartEliteForm"]["purefund"].value);
    if (isNaN(purefund) || purefund == '' || purefund == null) {
        return 0.0;
    }
    return purefund;
}

function getMidcapFund() {
    var midcapfund = parseInt(document.forms["smartEliteForm"]["midcapfund"].value);
    if (isNaN(midcapfund) || midcapfund == '' || midcapfund == null) {
        return 0.0;
    }
    return midcapfund;
}

function getBondOptimiserFund() {
    var bondoptimiserfund = parseInt(document.forms["smartEliteForm"]["bondoptimiserfund"].value);
    if (isNaN(bondoptimiserfund) || bondoptimiserfund == '' || bondoptimiserfund == null) {
        return 0.0;
    }
    return bondoptimiserfund;
}

function getMoneyMarketFund() {
    var moneyMarketFund = parseInt(document.forms["smartEliteForm"]["moneyMarketFund"].value);
    if (isNaN(moneyMarketFund) || moneyMarketFund == '' || moneyMarketFund == null) {
        return 0.0;
    }
    return moneyMarketFund;
}

function getCorporateBondFund() {
    var corporateBondFund = parseInt(document.forms["smartEliteForm"]["corporateBondFund"].value);
    if (isNaN(corporateBondFund) || corporateBondFund == '' || corporateBondFund == null) {
        return 0.0;
    }
    return corporateBondFund;
}

function getIsSIFNFunds() {
    return document.forms["smartEliteForm"]["sfinFund"].checked;
}

function getMinimumPremiumAmount() {
    var mode = getFreqMode();
    if (mode == "Yearly") {
        return premiumFrequencyModeList[0].minPremiumAmount;
    } else if (mode == "Half Yearly") {
        return premiumFrequencyModeList[1].minPremiumAmount;
    } else if (mode == "Quarterly") {
        return premiumFrequencyModeList[2].minPremiumAmount;
    } else if (mode == "Monthly") {
        return premiumFrequencyModeList[3].minPremiumAmount;
    }

}

let createPDFGeneralMethod = (productInfo, calculationJSONDataReceivedFromServer, formInputByUser) => {
    return new Promise((pdfCreatedAndServed, someErrorHappenedAndRejected) => {
        switch (productInfo.productCode) {
            case '53':
                createSmartElitePDFAndMail(productInfo, calculationJSONDataReceivedFromServer, formInputByUser).then(pdfCreatedAndServedTrue => {
                    pdfCreatedAndServed(pdfCreatedAndServedTrue);
                }, pdfCreatedAndServedFalse => {
                    someErrorHappenedAndRejected(pdfCreatedAndServedFalse);
                });
                break;
        }
    });
}
let createSmartElitePDFAndMail = (productInfo, calculationJSONDataReceivedFromServer, formInputByUser) => {
    console.log("Inside PDF");
    return new Promise((resolve, reject) => {
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        let doc = {
            // a string or { width: number, height: number }
            pageSize: 'A4',
            // by default we use portrait, you can change it to landscape if you wish
            pageOrientation: 'potrait',
            // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
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
                        x2: 570,
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
                    style: 'addressFontStyle',
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
                    margin: [0, 15, 0, 0],
                    style: 'smallFontSize',
                    table: {
                        widths: ['*', '*', '*', '*'],
                        alignment: 'center',
                        body: [
                            [{
                                text: 'Quotation Number'
                            }, {
                                text: breakword(`${formInputByUser.quotationNumber}`),
                                noWrap: false,
                                bold: true,
                                alignment: 'center'
                            }, {
                                text: 'Channel / Intermediary :'
                            }, {
                                text: `${formInputByUser.userType}`,
                                bold: true,
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
                                text: `Insurance Regulatory and Development authority of India (IRDAI) requires all life insurance companies operating in India to provide official illustrations to their customers. The illustrations are based on the investment rates of return set by the Life Insurance Council (constituted under Section 64C(a) of the Insurance Act 1938) and is not intended to reflect the actual investment returns achieved or which may be achieved in future by SBI life Insurance Company Limited.`,
                            }],
                            [{
                                text: `The main objective of the illustration is that the client is able to appreciate the features of the product and the flow of benefits in different circumstances with some level of quantification. For further information on the product, its benefits and applicable charges please refer to the sales brochure and/or policy document. Further information will also be available on request.`,
                            }],
                            [{
                                text: `Some benefits are guaranteed and some benefits are variable with returns based on the future fund performance of SBI Life Insurance Company Limited. If your policy offers guaranteed returns then the same will be clearly marked as “guaranteed” in the illustration table on this page. If your policy offers variable returns then the illustration on this page will show two different rates of assumed future investment returns. These assumed rates of return are not guaranteed and they are not the upper or lower limits of what you might get back, as the value of your policy is dependent on a number of factors including future fund investment performance.`,
                            }]
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
                                text: `${formInputByUser.proposerName} `,
                                bold: true
                            }, {
                                text: 'Age of the Life Assured'
                            }, {
                                text: `${formInputByUser.age} Years`,
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
                                    text: `${formInputByUser.premiumFrequency == 'Single' ? ' One time at the inception of the policy ' : `${formInputByUser.premiumPayingTerm} Years`}`,
                                    bold: true
                                }
                            ],
                            [{
                                    text: 'Amount of Installment Premium',
                                }, {
                                    text: `Rs. ${Math.round(parseFloat(calculationJSONDataReceivedFromServer.AnnPrem))}`,
                                    bold: true
                                },
                                {
                                    text: 'Mode / Frequency of Premium Payment'
                                }, {
                                    text: `${formInputByUser.premiumFrequency == 'Single' ? ' One time at the inception of the policy ' : `${formInputByUser.premiumfrequencymode}`}`,
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
                                text: 'Plan Option',
                                bold: true,
                                colSpan: 2
                            }, {}, {
                                text: formInputByUser.planOption,
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
                                text: `Equity Elite Fund II(SFIN : ULIF019100210EQTELI2FND111)`,
                            }, {
                                text: `${formInputByUser.percentEquityEliteiiFund} %`,
                            }, {
                                text: `1.25%`,
                            }, {
                                text: 'High',
                            }],
                            [{
                                text: 'Balanced Fund(SFIN: ULIF004051205BALANCDFND111)'
                            }, {
                                text: `${formInputByUser.percentBalancedFund} %`
                            }, {
                                text: `1.25 %`
                            }, {
                                text: 'Medium',
                            }],
                            [{
                                text: 'Bond Fund(SFIN: ULIF002100105BONDULPFND111)'
                            }, {
                                text: `${formInputByUser.percentBondFund} %`
                            }, {
                                text: `1.00 %`
                            }, {
                                text: 'Low to Medium',
                            }],
                            [{
                                text: `Money Market Fund(SFIN: ULIF005010206MONYMKTFND111)`
                            }, {
                                text: `${formInputByUser.percentMoneyMarketFund} %`
                            }, {
                                text: '0.25 %'
                            }, {
                                text: 'Low',
                            }],
                            [{
                                text: 'Bond Optimiser Fund  (SFIN : ULIF032290618BONDOPTFND111)'
                            }, {
                                text: `${formInputByUser.perInvBondOptimiserFund} %`
                            }, {
                                text: `1.15 %`
                            }, {
                                text: 'Low to Medium',
                            }],
                            [{
                                text: 'Midcap Fund (SFIN : ULIF031290915MIDCAPFUND111)'
                            }, {
                                text: `${formInputByUser.perInvMidcapFund} %`
                            }, {
                                text: `1.35 %`
                            }, {
                                text: 'High',
                            }],
                            [{
                                text: 'Pure Fund (SFIN : ULIF030290915PUREULPFND111)'
                            }, {
                                text: `${formInputByUser.perInvPureFund} %`
                            }, {
                                text: `1.35 %`
                            }, {
                                text: 'High',
                            }],
                            [{
                                text: 'Corporate Bond Fund (SFIN : ULIF033290618CORBONDFND111)'
                            }, {
                                text: `${formInputByUser.perInvCorporateBondFund} %`
                            }, {
                                text: `1.15 %`
                            }, {
                                text: 'Low to Medium',
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
                        // widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
                        widths: ['3%', '7%', '6%', '7%', '7%', '7%', '7%', '7%', '7%', '7%', '7%', '7%', '7%', '7%', '7%'],
                        alignment: 'center',
                        body: returnPartATableSmartElite(formInputByUser, calculationJSONDataReceivedFromServer)
                    }
                },
                {
                    style: 'smallFontSize',
                    margin: [0, 10, 0, 0],
                    table: {
                        widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
                        alignment: 'center',
                        body: returnPartBTableSmartElite(formInputByUser, calculationJSONDataReceivedFromServer)
                    }
                },
                {
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
                                text: `1) Refer the sales literature for explanation of terms used in this illustration`,
                            }],
                            [{
                                text: `2)  Please read this benefit illustration in conjunction with Sales Brochure and the Policy Document to understand all Terms, Conditions & Exclusions carefully.`,
                            }],
                            [{
                                text: `3)Kindly note that above is only an illustration and does not in any way create any rights and/or obligations. The actual experience on the contract may be different from what is illustrated. The non-guaranteed low and high rate mentioned above relate to assumed investment returns at different rates and may vary depending upon market conditions. For more details on risk factors, terms and conditions please read sales brochure carefully.`,
                            }],
                            [{
                                text: `4)  The unit values may go up as well as down and past performance is no indication of future performance on the part of SBI Life Insurance Co. Ltd. We would request you to appreciate the associated risk under this plan vis-à-vis the likely future returns before taking your investment decision.`,
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
                                text: `9)  Applicable Taxes (including surcharge/cess etc), at the rate notified by the Central Government/ State Government / Union Territories of India from time to time and as per the provisions of the prevalent tax laws will be payable on premium/ or any other charges as per the product features.`,
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
                        body: getImportantNoteSmartElite(calculationJSONDataReceivedFromServer, formInputByUser)
                    }
                },
                {
                    style: 'boldText',
                    margin: [0, 15, 0, 0],
                    text: [{
                        text: `I ${formInputByUser.proposerName} understood the term and conditions, product features and applicable charges (if any) before purchase of the contract, after receipt of all information stated above from the insurer.`,
                        alignment: 'justifty'
                    }]
                },
                //Changed Signature name to Marketing Official\'s Signature
                {
                    style: 'boldText',
                    margin: [0, 15, 0, 0],
                    text: [{
                        text: 'Place : ______________ Date : ___/___/_____ Marketing Official\'s Signature : _______________________ ',
                        alignment: 'justifty'
                    }]
                },
                {
                    style: 'boldText',
                    margin: [0, 15, 0, 0],
                    text: [{
                        text: 'Place : ______________ Date : ___/___/_____ Policyholder\'s Signature : __________________________',
                        alignment: 'justifty'
                    }]
                }
            ],
            images: {
                sbiLogo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAWRXhpZgAASUkqAAgAAAAAAAAAAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCABLAJwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD33r2pjuFUlsKF6sTVXVNTt9I06S8un2xxjp3Y9gPevHNf8U6hr07ebI0dqD8kCH5QPf1NdOHwk6702PPxuYU8KtdW+h6vN4p0W3fZJqVsregkB/lVmz1jT9R/49LyGY/3UcE/lXgY46cU5HaORXjYo6nKspwQfY13yyyNtJHjwz6fN70FY+iQSe9OAwK828H+Npnnj03VpN+87Yrhuuewb/GvSFPFeXVoyoy5ZH0GGxVPEw54M5678YWMOvPodlbXOo6nEgkmhtVBEKnpvZiAufTOafZ+L9LutXXR5BNa6sxP+hTpiTbtzvGMgrgfeBx2rybw94lXwH8ZPEem+ISYYNXuBJDdv90ZJKZP90g4z2Ir1+TRbW48UWmvEgz29rJboR3DlTnP4frWZ0GR4h+JGkeFb6G01ay1OJ7hyluywB1mIIHykH3HXHWrU/jnS7C9tbbVre+0trttkEl7Dtjdv7u4EgH2OK858YuniP4/eHdHd1+y6VELibc2Bn75/kgq/wDGS8XxLpFn4U0Jf7R1W5ukkK2/ziBFz8zsOF5Pf3oA9P1LUhp1obgWd1dKM7ltlDMBjJOCRXOeGviRo/i2eSPRrLU51iYLNK1vtSIn1JP6Cl8Wai/hX4X3s80u64trAQh8/ekKhAfzNZnwU0P+x/hrYyOuJ79mu5DjkhuF/wDHQPzoA9D4IzXO+KPGNh4QtTd6naX32MYDXMMQdFJOADzn9K6OvHfj5eSXOl6J4atiTPql6vyj0BAH6sPyoA9F8N+KLbxRZre2Nlfx2ci7o57iIIsgz/Dzn9K2pZEiheWQ4RFLMfQCq+m2UWm6bbWMKhYraJYkA9FGKoeIPEen+HbUzXxlbKs4igiMjlVGWbaP4QOSelAB4Y8T6V4u0o6lpEryWwkaIl0KkMvXg/UVFqviux0vU00tYLi81BoTcG2tUDMkY/jbJAUenPPanWeq6PaeHoNT06E/2bOolj+x25bIbndtUce5rgvhRqia3rHiLxBPDctPql6UgkMLFFgjGFXfjA69M9qAPSdD1my8Q6Nbarp7M1rcLlN6lSOcEEdiCDWjXKXHjjQNNeSJXka1gnW3mubeAtBBIxwFZxxnJGcZxnmum3bu/wClAHl3xH1ZrjUINOQ4ihQSMAerEcfpXD44zW34tLnxNdl+pCf+gCsT2r6XCwUaSSPg8dUlUxEnLuKBk4FJXqPw3gsDo0rqsbXfmESlgCQO34Vx3jSOyi8T3K2OwR4BcJ0D96iliues6VtjStgfZ4aNfm36HPgkYIOCDkH0r2PQ/E8H/CIWupahIVxIltI2M5kLBB+ZIrxyu30Pwz/wl3gCbS5LyW0iOo+aZIgC/wAqqRjPT5sH8KxzKKdJS7M68inJYhx6NHSfED4f6f460ZoJlWLUIVJtboDlG/un1U9xXM/A3XtQvPD+o6LqrM02jT+SHY5ITn5SfYg/hXYNN4xtrAWqWGn3l2F2rem5McZOPvNHtJz3IB/GsHSfBGt+GPC99YaPLZXGq6oZJbzULl2QLI3GVQA5AyccivDPrTl/hhY23i/x/wCMfE19bRXNuZvs0AlQMMZ7Z9lX86sePb1fh14w8N3Ph1VtYdRmaO8sY+Ipl3KN23s3zHkVs/D/AMI+K/AWg3GlpDpF95kxmWX7RJGckAfMNhz0qRfh1qWseLYvFHiq9try5tB/oWn2yssERHIyx5PPPSgDJ+O93JdadoXhi3J87Vb5cqOu1SB/Nh+Ver2FpHYafb2cQAjgiWJQPRRj+leZ6t4J8X6x8Q9N8V3J0cx6cAsNj50mAOed+zrk56dhXqFuZTAhnRUlIG5VbcAe+DxmgCQ9K8X1H/iqP2kbC1zuttCtvNb0D43fzZfyr13UH1CO1J06CCa4zws8hRceuQCf0rzTwn4F8YeHPGGreI7mXR76bU8+agkkQpls/Kdp47fhQB6sTgeteV/FrULeLw+0OluJ9V1+RNLiZW3bUDfOB6c8H3PtXT64fHd3p8tvpNvo1nNIpUTyXMkhT3A2Dmucvfh9q9vq/hG9sDaXX9jWrROtzKygTMD++4B3fMc44JwKANbxNJF4I+D95DbuFNlp4tYznq5AT+Zrj9Q1C48AfAXR7KzLR6nqSLDGVzuVpcszD3AP61N8VLN49F8NeDoZmnudW1IPPI/3pMHLMR2G5untXYeOfB1xrtpokmm+SbjRrtLiKCYlUlVRgrkdDgDBoAwNN8H3esaNo2hvayab4a09o5pVmGLjUJQd2Sv8Cbsnnk+gr075gzDtnjp6VjW1jqeo6lBfaqqWsVuS0NlDKX+Y8b5GwMkdgOBnPNbTJlieaAPLPiPpbW2qQX6r+6njCMR2Zf8A61cT7V75rGlW+s6bJZXKko44I6qexFeNa54bv9BuWjnjLQ5+SdR8rD+hr28Bioygqct0fJZtgJU6jqwV4sn8JO6atcbWI/0Kfof9msHOQCetbvhPH9rXHP8Ay5T/APoNYSAttUAsx6Ack11xsqsvkefO7oQXm/0FxXtvg3S20rw1bQyDEr5lkHoW5x+WK5Dwf4Jmkni1LVIikSENFA3Vj6t6D2r0ieSO2tpJpG2RxoXZvQAZJrzMwxMZv2cXoj38mwUqV61RWb2J6K5fwFf6lqvhGz1PU7gyzXm6ZMoF2xljsHA/u4/OsLUPEmsw+JbjTVutltqT+VpcyxqTHLG4EqnjB4JYZ/umvMPePRaKoapNc2+k3LWrxi7ERWAzEBTIRhM/VsfnWP4J1W51fRnubuac3CymGaCeMK9vIoAdDjg/Nkg+hFAHT0Vxd5rV/wD8J1qVpHetHpum6Us80YReZnLbOcZ6Ln64rpNOa4g0eBr+4MkywhppWUKc4yeBxQBoUV5r4D8Ta7r2sRpcXJe2NvJcypNGqHy3kIgMeOSNqnJNdP4z8QP4f8PXVxa7WvjDIYAykgFVJ3EDsMfyoA6OsXxJf6rpunLc6Rpv9ozLMglgDYbyifmK+rAdBVrRLt77QNOu5G3ST2sUrN6llBP864qTxFrJ8TTaS10Uh1OYHSp0jXKiOTbMhyMHgFh7UAT2eg3niL4hx+KtTtJLWz06DyNNtpwBIzN96Vh/D1wB1rvq53xlrk/hzwzPfW0Sy3ReOCAP93fIwRS3sCcn6Vb0qG+t55kutV+27UQMpRVKPyWPHY8YHagDXphAya4XXdb1d/HX9k6dczxWcNmjXMkaIVhlkchGYt0UKrE+vHSu6jDiNQ7BmAGTjGT60AKaZJCkqFJEV1PVWGQak/GimLfdGPH4Z0iG5aeGxijkdGRigxlSMEVJY+H9K01gbSxhjYfxbckfia1KSnzy7mao01tFABgVV1KGO6sJreW1+1RyLtaAsBvB6jmrlJipNTHszNYWcVpaaK8MES7I41mTCr6DnpVeGzS3S3SLw8QLeVpof3qHY5ByRk9Tk/nXQ1x/i2LVZdTtrbT5biNb2Io0kZIERjPmZ9t33fegDXvGm1C1a3utEeWFiCUaZMEg5B6+uDTLJZNNt/ItdEeKPcWIEyck9SSTkk1zMF/rT2dvd7p7drmaC4kBjZjGjzlWTB6ALj6ZrZ8NXGrPE9pft5n+irLG5jKsCzONpJPJG0HPHWgCa50+G71FNQn8O77tAFEhlTJAOQDzzg8jPSrtxLc3dvJbz6NI8UilXQzJhgeo61yUWr6nFZwSW5mM9pYGO58+NiqzGRBznq2Axz09TXUWF1/bej+TK8sNzJbqZgqmN4ywOCBnjpnqaAKtnpdtYXMNxaeG/JmhhFvG6SoNsYOQvXoMn86lurUXssktzoDSvJCYHLTJ80Z6r16GuftNS16zaKa4cyT3Lf6swsyvsk8sIvPyHaC5J6lvQVch1jUtQa4LK8c1hBLOUWJlDSqzqqH1G0KcD1oA27Uz2VpHaW2iPFbxKEjjWZMKo7DmoILRbUWoh8PFBaljB+9Q+WW4bHPfNUbPWdcPiG00+6hjaF4VeSRYioYlSxYcnABwuD+dVdQuL6HxkXhNxMdwVIRvXYPLPOOUePOM9GBoA377zdRs5LS80NpreQYeN5YyCPzpljE+mxNFaaHJErHc2J0JY9Mkk5JrEtPEetX81ssECBT/AK3dbsMkQh2UZIwS+Vz/ADrV8J6pqWrWMk2owrG6uAoCbewJBGT0OR+FAEUmj2k15Ndy+Gt1xOytLIZly+3pnnnFdMDxS4ooAKKKKACiiigAooooAKTFLRQA3b70Yp1FADcdef8A61II1DFgME9T60+igBpHB5xQVz3p1FACY9KT606igBpXnP6UuKWigAooooA//9k='
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
                    fontSize: 8,
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
                    fontSize: 3
                },
                theMostSmallestFontSizeInTheWholeGoddamnWorld: {
                    fontSize: 2
                }
            }
        };
        saveBase64PDF(doc).then((base64pdf) => {
            hideLoader();
            window.location.href = "../../PDF/pdfPage.html";
        });
    });
};
function returnPartATableSmartElite(formInputByUser, calculationJSONDataReceivedFromServer) {
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
            text: `Annualized Premium`,
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
            text: (eval("calculationJSONDataReceivedFromServer.TotalSerTax4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.TotalSerTax4Pr" + i + "") : '0',
            fontSize: 4
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.FundValAtEnd4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.FundValAtEnd4Pr" + i + "") : '0',
            fontSize: 4
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.SurrenderVal4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.SurrenderVal4Pr" + i + "") : '0',
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
            text: (eval("calculationJSONDataReceivedFromServer.TotalSerTax8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.TotalSerTax8Pr" + i + "") : '0',
            fontSize: 4
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.FundValAtEnd8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.FundValAtEnd8Pr" + i + "") : '0',
            fontSize: 4
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.SurrenderVal8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.SurrenderVal8Pr" + i + "") : '0',
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
function returnPartBTableSmartElite(formInputByUser, calculationJSONDataReceivedFromServer) {
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
            text: 'Net Yield ' + ((eval("calculationJSONDataReceivedFromServer.netYield8Pr")) ? eval("calculationJSONDataReceivedFromServer.netYield8Pr") : '0'),
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
        },
        {
            text: 'Add. ADB & ATPD Charges',
            bold: true,
            fontSize: 4
        },
        {
            text: 'Other charges*',
            bold: true,
            fontSize: 4
        }, {
            text: 'Additions to the fund*',
            bold: true,
            fontSize: 4
        },
        {
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
        }
    ]);
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
            text: (eval("calculationJSONDataReceivedFromServer.AmtAvlForInvst" + i + "")) ? eval("calculationJSONDataReceivedFromServer.AmtAvlForInvst" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.MortChrg8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.MortChrg8Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.TotalSerTax8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.TotalSerTax8Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.PolicyAdmCharge" + i + "")) ? eval("calculationJSONDataReceivedFromServer.PolicyAdmCharge" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.ATPDChrg" + i + "")) ? Math.round(eval("calculationJSONDataReceivedFromServer.ATPDChrg" + i + "")) : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.AddToFundIfAny8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.AddToFundIfAny8Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.FundBefFMC8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.FundBefFMC8Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.FundMgmtChrg8Pr" + i + "")) ? Math.round(eval("calculationJSONDataReceivedFromServer.FundMgmtChrg8Pr" + i + "")) : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.FundValAtEnd8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.FundValAtEnd8Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.SurrenderVal8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.SurrenderVal8Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.DeathBen8Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.DeathBen8Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        });
        multipleRowArray.push(colDataArray);
    }
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
            text: 'Add. ADB & ATPD Charges',
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
            text: (eval("calculationJSONDataReceivedFromServer.AmtAvlForInvst" + i + "")) ? eval("calculationJSONDataReceivedFromServer.AmtAvlForInvst" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.MortChrg4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.MortChrg4Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.TotalSerTax4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.TotalSerTax4Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.PolicyAdmCharge" + i + "")) ? eval("calculationJSONDataReceivedFromServer.PolicyAdmCharge" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.ATPDChrg" + i + "")) ? Math.round(eval("calculationJSONDataReceivedFromServer.ATPDChrg" + i + "")) : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.AddToFundIfAny4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.AddToFundIfAny4Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.FundBefFMC4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.FundBefFMC4Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.FundMgmtChrg4Pr" + i + "")) ? Math.round(eval("calculationJSONDataReceivedFromServer.FundMgmtChrg4Pr" + i + "")) : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.FundValAtEnd4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.FundValAtEnd4Pr" + i + "") : '0',
            alignment: 'center',
            fontSize: 5
        }, {
            text: (eval("calculationJSONDataReceivedFromServer.SurrenderVal4Pr" + i + "")) ? eval("calculationJSONDataReceivedFromServer.SurrenderVal4Pr" + i + "") : '0',
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
function getImportantNoteSmartElite(calculationJSONDataReceivedFromServer, formInputByUser) {
    let multipleRowArray = []; //Number of Rows depends on Policy Term Selected
    multipleRowArray.push([{
        text: 'Important:',
        bold: true
    }], [{
        text: 'You may receive a Welcome Call from our representative to confirm your proposal details like Date of Birth, Nominee Name, Address, Email ID, Sum Assured, Premium amount, Premium Payment Term etc.',
    }], [{
        text: 'You may have to undergo Medical tests based on our underwriting requirements.',
    }], [{
        text: 'If premium is greater than Rs 1 Lakh, You have to submit Proof of source of Fund.',
    }]);
    var Company_policy_surrender_dec = ""
    /* `${formInputByUser.premiumFrequency == "Limited" ? `Your SBI LIFE - Smart Elite  
            (UIN No - 111L072V03) is a Regular/Limited premium policy,
             for which your first year LPPT Premium of Rs. ${(calculationJSONDataReceivedFromServer.AnnPrem == "" 
             || calculationJSONDataReceivedFromServer.AnnPrem == null) ? "0" :
              Math.round(parseFloat(calculationJSONDataReceivedFromServer.AnnPrem))}.
Your Policy Term is  ${(calculationJSONDataReceivedFromServer.policyTerm == "" 
|| calculationJSONDataReceivedFromServer.policyTerm == null) ? "0" : 
calculationJSONDataReceivedFromServer.policyTerm} years, Premium Paying Term is ${
  formInputByUser.premiumPayingTerm} years and Basic Sum Assured is Rs. 
  ${(calculationJSONDataReceivedFromServer.sumAssured == "" 
  || calculationJSONDataReceivedFromServer.sumAssured == null) ? "0" : 
  Math.round(parseFloat(calculationJSONDataReceivedFromServer.sumAssured))}` : ""}`}`,  */
    if (formInputByUser.premiumFrequency == "Single") {
        Company_policy_surrender_dec = "Your SBI LIFE - Smart Elite  (111L072V03) " +
            "is a Single premium policy and you are required to pay premium once at the inception of the policy of Rs." +
            ((calculationJSONDataReceivedFromServer.AnnPrem == "" || calculationJSONDataReceivedFromServer.AnnPrem == null) ? "0" : formatAmount(Math.round(parseFloat(calculationJSONDataReceivedFromServer.AnnPrem)))) +
            " .Your Policy Term is " + formInputByUser.policyTerm + " years, Premium Payment Term is Not Applicable" +
            " and Sum Assured is Rs." +
            ((calculationJSONDataReceivedFromServer.sumAssured == "" ||
                    calculationJSONDataReceivedFromServer.sumAssured == null) ? "0" :
                formatAmount(Math.round(parseFloat(calculationJSONDataReceivedFromServer.sumAssured))));
    } else if (formInputByUser.premiumFrequency == "Limited") {
        Company_policy_surrender_dec = "Your SBI LIFE - Smart Elite (UIN No - 111L072V03) is a " +
            "Limited Premium Policy and you are required to pay " +
            formInputByUser.premiumfrequencymode + " premium of Rs. " +
            ((calculationJSONDataReceivedFromServer.AnnPrem == "" ||
                    calculationJSONDataReceivedFromServer.AnnPrem == null) ? "0" :
                Math.round(parseFloat(calculationJSONDataReceivedFromServer.AnnPrem))) +
            " .Your Policy Term is " + formInputByUser.policyTerm + " years," +
            " Premium Payment Term is " + formInputByUser.premiumPayingTerm +
            " years and Sum Assured is Rs. " +
            ((calculationJSONDataReceivedFromServer.sumAssured == "" ||
                    calculationJSONDataReceivedFromServer.sumAssured == null) ? "0" :
                formatAmount(Math.round(parseFloat(calculationJSONDataReceivedFromServer.sumAssured))));
    }
    multipleRowArray.push([{
        text: `${Company_policy_surrender_dec}`
    }]);
    return multipleRowArray;
}