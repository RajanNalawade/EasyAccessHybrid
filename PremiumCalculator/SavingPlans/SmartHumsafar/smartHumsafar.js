window.onload = function () {
  this.ready();
  // self.hideLoader();
};

/* *************  VARIABLE DECLARATION ************** */
var policyTermList = new Array();
var isPayingTermRequired = false;
var productDetails;
var proposer_Is_Same_As_Life_Assured = "Y";
var isADBRiderChosen = false;

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
  setKerlaDiscount();
  this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");

  this.initializeData();
  this.initArrayList();
}

function initializeData() {
  this.document.getElementById("productNameId").innerHTML = this.productDetails.title;
  this.document.getElementById("uinNumberId").innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
  this.document.getElementById("sumAssuredTitleId").innerHTML = `Sum Assured* (Rs. ${minSumAssured} to Rs. ${maxSumAssured}`;
  this.onADBRiderChosenUpdate();
  this.updatePolicyTermList();
  this.onWishToBackdateUpdate('no');
  document.getElementById('ageErrId').style.display = "none";
  document.getElementById('spouseAgeErrId').style.display = "none";
  this.onWishToBackdateUpdate((self.getWishToBackdate() ? "yes" : "no"));
  var laGender = document.forms["smartHumsafarform"]["la_gender"].value;
  if (laGender === "Male") {
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
  } else if (laGender === "Female") {
    $("#female_label").css({
      "background": "url('../../../Assets/images/female_active.png')",
      "width": "100px",
      "height": "100px",
      "background-size": "cover",
      "margin-right": "20px"
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
  } else if (laGender === "Third Gender") {
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
  }
  var spouseGender = document.forms["smartHumsafarform"]["spouse_gender"].value;
  if (spouseGender === "Male") {
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
  } else if (spouseGender === "Female") {
    $("#spouse_female_label").css({
      "background": "url('../../../Assets/images/female_active.png')",
      "width": "100px",
      "height": "100px",
      "background-size": "cover",
      "margin-right": "20px"
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
  } else if (laGender === "Third Gender") {
    $("#spouse_transgender_label").css({
      "background": "url('../../../Assets/images/transgender_active.png')",
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
    $("#spouse_female_label").css({
      "background": "url('../../../Assets/images/female.png')",
      "width": "100px",
      "height": "100px",
      "background-size": "cover"
    });
  }
}

function initArrayList() {
  premiumFrequencyElement = document.forms["smartHumsafarform"]["premiumFrequency"];
  for (i = 0; i < premiumPaymentModeList.length; i++) {
    premiumFrequencyElement.add(new Option(premiumPaymentModeList[i].title, premiumPaymentModeList[i].value));
  }
}

function updatePolicyTermList() {
  policyListElement = document.forms["smartHumsafarform"]["policyTerm"];
  var maxPolicyTermLimit = Math.min(
    maxPolicyTerm,
    Math.min(maxPolicyTerm, 65 - this.getEquivalentAge())
  );
  policyListElement.innerHTML = "";
  for (i = minPolicyTerm; i <= maxPolicyTermLimit; i++) {
    policyListElement.add(new Option(i));
  }

  policyListElement.selectedIndex = 0;
  this.onADBRiderChosenUpdate();
}

function getEquivalentAge() {
  var laAge = document.forms["smartHumsafarform"]["la_age"].value;
  var spouseAge = document.forms["smartHumsafarform"]["spouse_age"].value;

  if (Math.abs(laAge - spouseAge) > 20) {
    return 0;
  } else {
    return (
      Math.min(laAge, spouseAge) +
      ageDifferencePolicyTermCalculationArray[Math.abs(laAge - spouseAge)]
    );
  }
}

function validateGender(formElementName) {
  var laGender = document.forms["smartHumsafarform"]["la_gender"].value;
  var spouseGender = document.forms["smartHumsafarform"]["spouse_gender"].value;
  document.getElementById("selectLATitle").options[0].disabled = false;
  document.getElementById("selectLATitle").options[1].disabled = false;
  document.getElementById("selectLATitle").options[2].disabled = false;
  document.getElementById("selectSpouseTitle").options[0].disabled = false;
  document.getElementById("selectSpouseTitle").options[1].disabled = false;
  document.getElementById("selectSpouseTitle").options[2].disabled = false;

  if (formElementName === "la_gender") {
    if (laGender === "Male" && spouseGender !== "Female" && spouseGender !== "Third Gender") {
      document.forms["smartHumsafarform"]["spouse_gender"].value = "Female";
      setSpouseFemaleGenderActiveInHumsafar();

      document.forms["smartHumsafarform"]["la_title"].value = "Mr.";
      document.forms["smartHumsafarform"]["spouse_title"].value = "Mrs.";
      document.getElementById("selectLATitle").options[1].disabled = true;
      document.getElementById("selectLATitle").options[2].disabled = true;
      document.getElementById("selectSpouseTitle").options[0].disabled = true;
    } else if (laGender === "Female" && spouseGender !== "Male" && spouseGender !== "Third Gender") {
      document.forms["smartHumsafarform"]["spouse_gender"].value = "Male";
      setSpouseMaleGenderActiveInHumsafar();

      document.forms["smartHumsafarform"]["la_title"].value = "Mrs.";
      document.forms["smartHumsafarform"]["spouse_title"].value = "Mr.";
      document.getElementById("selectLATitle").options[0].disabled = true;
      document.getElementById("selectSpouseTitle").options[1].disabled = true;
      document.getElementById("selectSpouseTitle").options[2].disabled = true;
    }
  } else {
    if (spouseGender === 'Male' && laGender !== "Female" && laGender !== "Third Gender") {
      document.forms["smartHumsafarform"]["la_gender"].value = "Female";
      setFemaleGenderActive();

      document.forms["smartHumsafarform"]["la_title"].value = "Mrs.";
      document.forms["smartHumsafarform"]["spouse_title"].value = "Mr.";
      document.getElementById("selectSpouseTitle").options[1].disabled = true;
      document.getElementById("selectSpouseTitle").options[2].disabled = true;
      document.getElementById("selectLATitle").options[0].disabled = true;

    } else if (spouseGender === "Female" && laGender !== "Male" && laGender !== "Third Gender") {
      document.forms["smartHumsafarform"]["la_gender"].value = "Male";
      setMaleGenderActive();

      document.forms["smartHumsafarform"]["la_title"].value = "Mr.";
      document.forms["smartHumsafarform"]["spouse_title"].value = "Mrs.";
      document.getElementById("selectSpouseTitle").options[0].disabled = true;
      document.getElementById("selectLATitle").options[1].disabled = true;
      document.getElementById("selectLATitle").options[2].disabled = true;
    }
  }

  if (laGender !== "Female" && laGender !== "Male" && laGender !== "Third Gender") {
    document.getElementById("genderErrId").style.display = "block";
    document.getElementById("genderErrId").innerHTML = "Please select your gender.";
    return false;
  } else {
    document.getElementById("genderErrId").style.display = "none";
    return true;
  }
}

function calculateAge(birthday, formElementName, errElementId) {

  var age = getAgeFromBirthdate(birthday);
  document.forms["smartHumsafarform"][formElementName].innerHTML = age;
  document.forms["smartHumsafarform"][formElementName].value = age;
  if ((age < minAge_LA || age > maxAge_LA)) {
    document.getElementById(errElementId).style.display = "block";
    document.getElementById(errElementId).innerHTML = `Age should be between ${minAge_LA} and ${maxAge_LA}.`;
    return false;
  } else {
    document.getElementById(errElementId).style.display = "none";
    return true;
  }
}

function onWishToBackdateUpdate(wishToBackdate) {
  var backDateDiv = document.getElementById("backdatingDateDivId");
  var backDateElement = document.forms["smartHumsafarform"]["backDate"];

  if (wishToBackdate === "yes") {
    backDateDiv.style.display = "block";
    backDateElement.required = true;
  } else {
    backDateDiv.style.display = "none";
    backDateElement.required = false;
  }
}

function onADBRiderChosenUpdate() {
  isADBRiderChosen = document.getElementById('rider_switch').checked;
  if (isADBRiderChosen) {
    document.getElementById("isADBRiderChosen").style.display = "block";
    var applicableForElement = document.forms["smartHumsafarform"]["applicableFor"];
    applicableForElement.innerHTML = '';
    for (i = 0; i < applicableForList.length; i++) {
      applicableForElement.add(new Option(applicableForList[i].title, applicableForList[i].value));
    }

    this.showRiderBlocks(applicableForElement.value);
  } else {
    document.getElementById("isADBRiderChosen").style.display = "none";
    document.getElementById("la_rider-block").style.display = "none";
    document.getElementById("spouse_rider-block").style.display = "none";
    document.forms['smartHumsafarform']['adb_la_sum_assured'].required = false;
    document.forms['smartHumsafarform']['adb_spouse_sum_assured'].required = false;
  }
}

function showRiderBlocks(applicableForIndex) {
  var maxPolicyTermRider = Math.min(getPolicyTerm(), maxPolicyTermRiderProp);
  switch (applicableForIndex) {
    case "0":
      document.getElementById("la_rider-block").style.display = "block";
      document.getElementById("spouse_rider-block").style.display = "none";
      document.forms['smartHumsafarform']['adb_la_sum_assured'].required = true;
      document.forms['smartHumsafarform']['adb_spouse_sum_assured'].required = false;
      var la_Rider_TermElement = document.forms['smartHumsafarform']['la_rider_term'];
      la_Rider_TermElement.innerHTML = '';
      for (let i = minPolicyTermRider; i <= maxPolicyTermRider; i++) {
        la_Rider_TermElement.add(new Option(i), i);
      }
      break;
    case "1":
      document.getElementById("la_rider-block").style.display = "none";
      document.getElementById("spouse_rider-block").style.display = "block";
      document.forms['smartHumsafarform']['adb_la_sum_assured'].required = false;
      document.forms['smartHumsafarform']['adb_spouse_sum_assured'].required = true;
      var spouse_Rider_TermElement = document.forms['smartHumsafarform']['spouse_rider-term'];
      spouse_Rider_TermElement.innerHTML = '';
      for (let i = minPolicyTermRider; i <= maxPolicyTermRider; i++) {
        spouse_Rider_TermElement.add(new Option(i), i);
      }
      break;
    case "2":
      document.getElementById("la_rider-block").style.display = "block";
      document.getElementById("spouse_rider-block").style.display = "block";
      document.forms['smartHumsafarform']['adb_la_sum_assured'].required = true;
      document.forms['smartHumsafarform']['adb_spouse_sum_assured'].required = true;
      var la_Rider_TermElement = document.forms['smartHumsafarform']['la_rider_term'];
      var spouse_Rider_TermElement = document.forms['smartHumsafarform']['spouse_rider-term'];
      la_Rider_TermElement.innerHTML = '';
      spouse_Rider_TermElement.innerHTML = '';
      for (let i = minPolicyTermRider; i <= maxPolicyTermRider; i++) {
        la_Rider_TermElement.add(new Option(i), i);
        spouse_Rider_TermElement.add(new Option(i), i);
      }
      break;
    default:
      // code block
  }
}

function validateSumAssured() {
  var sumAssured = this.getSumAssured();
  if (isNaN(sumAssured) || sumAssured === undefined || sumAssured === null || sumAssured === '') {
    document.getElementById('sumAssuredErrId').style.display = 'block';
    document.getElementById('sumAssuredErrId').innerHTML = 'Please enter Sum Assured in Rs.';
    return false;
  } else if (sumAssured > maxSumAssured) {
    document.getElementById('sumAssuredErrId').style.display = 'block';
    document.getElementById('sumAssuredErrId').innerHTML = `Sum Assured should not be greater than ${new Intl.NumberFormat('en-IN').format(maxSumAssured)}.`;
    return false;
  } else if (sumAssured < minSumAssured) {
    document.getElementById('sumAssuredErrId').style.display = 'block';
    document.getElementById('sumAssuredErrId').innerHTML = `Sum Assured should not be less than ${new Intl.NumberFormat('en-IN').format(minSumAssured)}.`;
    return false;
  } else {
    document.getElementById('sumAssuredErrId').style.display = 'none';
    return true;
  }
}

function validateAgeDifference() {
  if (Math.abs(this.getLAAge() - this.getSpouseAge()) > 20) {
    document.getElementById('ageDifferenceKeyId').style.display = "block";
    document.getElementById('ageDifferenceKeyId').innerHTML = `Maximum age different allowed in between two lives assured is 20 years.`;
    return false;
  } else {
    document.getElementById('ageDifferenceKeyId').style.display = "none";
    return true;
  }
}

function validateRiderLifeSumAssured() {

  if (isADBRiderChosen) {
    var riderChosenValue = this.getRiderApplicableFor();
    if (riderChosenValue === "Life to be Assured" ||
      riderChosenValue === "Both Lives Assured") {
      var laRiderSumAssured = this.getLASumAssured();
      var sumAssured = this.getSumAssured();

      if (isNaN(laRiderSumAssured) || laRiderSumAssured === undefined || laRiderSumAssured === null || laRiderSumAssured === '') {
        document.getElementById('laSumAssuredErrId').style.display = 'block';
        document.getElementById('laSumAssuredErrId').innerHTML = `Please enter ADB Rider Sum Assured for Life Assured in Rs.`;
        return false;
      } else if (laRiderSumAssured > Math.min(maxADBT_SA, sumAssured)) {
        document.getElementById('laSumAssuredErrId').style.display = 'block';
        document.getElementById('laSumAssuredErrId').innerHTML = `ADB Rider Sum Assured for Life Assured should not be greater than ${new Intl.NumberFormat('en-IN').format(Math.min(maxADBT_SA, sumAssured))}.`;
        return false;
      } else if (laRiderSumAssured < Math.min(minADBT_SA, sumAssured)) {
        document.getElementById('laSumAssuredErrId').style.display = 'block';
        document.getElementById('laSumAssuredErrId').innerHTML = `ADB Rider Sum Assured for Life Assured should not be less than ${new Intl.NumberFormat('en-IN').format(Math.min(minADBT_SA, sumAssured))}.`;
        return false;
      }
    }
  }
  document.getElementById('laSumAssuredErrId').style.display = 'none';
  return true;
}

function validateRiderSpouseSumAssured() {
  if (isADBRiderChosen) {
    var riderChosenValue = this.getRiderApplicableFor();
    if (riderChosenValue === "Spouse Life to be Assured" ||
      riderChosenValue === "Both Lives Assured") {
      var spouseSumAssured = this.getSpouseSumAssured();
      var sumAssured = this.getSumAssured();
      if (!spouseSumAssured) {
        document.getElementById('spouseSumAssuredErrId').style.display = 'block';
        document.getElementById('spouseSumAssuredErrId').innerHTML = `Please enter ADB Rider Sum Assured for Spouse Life to be Assured in Rs.`;
        return false;
      } else if (spouseSumAssured > Math.min(maxADBT_SA, sumAssured)) {
        document.getElementById('spouseSumAssuredErrId').style.display = 'block';
        document.getElementById('spouseSumAssuredErrId').innerHTML = `ADB Rider Sum Assured for Spouse Life should not be greater than ${new Intl.NumberFormat('en-IN').format(Math.min(maxADBT_SA, sumAssured))}.`;
        return false;
      } else if (spouseSumAssured < Math.min(minADBT_SA, sumAssured)) {
        document.getElementById('spouseSumAssuredErrId').style.display = 'block';
        document.getElementById('spouseSumAssuredErrId').innerHTML = `ADB Rider Sum Assured for Spouse Life should not be less than ${new Intl.NumberFormat('en-IN').format(Math.min(minADBT_SA, sumAssured))}.`;
        return false;
      }
    }
  }
  document.getElementById('spouseSumAssuredErrId').style.display = 'none';
  return true;
}

/* *********************** GETTERS ************************* */
function getLAAge() {
  return parseInt(document.forms["smartHumsafarform"]["la_age"].value, 10);
}

function getSpouseAge() {
  return parseInt(document.forms["smartHumsafarform"]["spouse_age"].value, 10);
}

function getLAGender() {
  return document.forms["smartHumsafarform"]["la_gender"].value;
}

function getSpouseGender() {
  return document.forms["smartHumsafarform"]["spouse_gender"].value;
}

function getEmail() {
  return document.forms["smartHumsafarform"]["email"].value;
}

function getConfirmEmail() {
  return document.forms["smartHumsafarform"]["confirmEmail"].value;
}

function getLADOB() {
  return document.forms["smartHumsafarform"]["la_dob"].value;
}

function getSpouseDOB() {
  return document.forms["smartHumsafarform"]["spouse_dob"].value;
}

function getMobileNo() {
  return document.forms["smartHumsafarform"]["mobile"].value;
}

function getPolicyTerm() {
  return parseInt(document.forms["smartHumsafarform"]["policyTerm"].value, 10);
}

function getPremiumFrequency() {
  var index = document.forms["smartHumsafarform"]["premiumFrequency"].value;
  return premiumPaymentModeList[index - 1];
}

function getSumAssured() {
  return parseInt(document.forms["smartHumsafarform"]["sumAssured"].value, 10);
}

function getBackdate() {
  return document.forms["smartHumsafarform"]["backDate"].value;
}

function getWishToBackdate() {
  var isWishToBackDate = document.forms["smartHumsafarform"]["wishToBackdate"].value
  if (isWishToBackDate == "yes")
    return true;
  else
    return false;
}

function getADBRiderChosen() {
  return isADBRiderChosen;
}

function getRiderApplicableFor() {
  applicableForIndex = document.forms["smartHumsafarform"]["applicableFor"].value;
  var aplicableFor = "";
  if (isADBRiderChosen) {
    aplicableFor = applicableForList[applicableForIndex].title;
  }
  return aplicableFor;
}

function getLARiderTerm() {
  return document.forms["smartHumsafarform"]["la_rider_term"].value;
}

function getLASumAssured() {
  return document.forms["smartHumsafarform"]["adb_la_sum_assured"].value;
}

function getSpouseRiderTerm() {
  return document.forms["smartHumsafarform"]["spouse_rider-term"].value;
}

function getSpouseSumAssured() {
  return document.forms["smartHumsafarform"]["adb_spouse_sum_assured"].value;
}

function getFName() {
  return document.forms["smartHumsafarform"]["la_first_name"].value;
}

function getMName() {
  return document.forms["smartHumsafarform"]["la_middle_name"].value;
}


function getLName() {
  return document.forms["smartHumsafarform"]["la_last_name"].value;
}


function getSpouseFName() {
  return document.forms["smartHumsafarform"]["spouse_first_name"].value;
}

function getSpouseMName() {
  return document.forms["smartHumsafarform"]["spouse_middle_name"].value;
}


function getSpouseLName() {
  return document.forms["smartHumsafarform"]["spouse_last_name"].value;
}

function getLATitle() {
  console.log("title = ", document.forms["smartHumsafarform"]["la_title"].value)
  return document.forms["smartHumsafarform"]["la_title"].value;
}

function getSpouseTitle() {
  return document.forms["smartHumsafarform"]["spouse_title"].value;
}

function getTitle() {
  return document.forms["smartHumsafarform"]["la_title"].value;
}

/* ******************************  FORM VALIDATION & SUBMIT **************************** */
function validatForm() {
  if (smartHumsafarform.checkValidity() && this.validateGender('la_gender') && this.validateGender('spouse_gender') && this.validateConfirmEmail() &&
    this.calculateAge(getDDMMYYYY(self.getLADOB()), 'la_age', 'ageErrId') && this.calculateAge(getDDMMYYYY(self.getSpouseDOB()), 'spouse_age', 'spouseAgeErrId') &&
    this.validateMobileNo(self.getMobileNo()) && this.validateSumAssured() &&
    this.validateAgeDifference() && this.trueBackdate() && this.validateBackDate() &&
    this.validateRiderLifeSumAssured() &&
    this.validateRiderSpouseSumAssured()) {
    this.calculatePremiumAPICall(); // form valid
  }
}

function calculatePremiumAPICall() {
  self.getLATitle();
  let xmlBodyParam = `<getPremiumSmartHumsafar xmlns="http://tempuri.org/">
  <isStaff>false</isStaff>
  <isJKResident>false</isJKResident>
  <age>${self.getLAAge()}</age>
  <ageSpouse>${self.getSpouseAge()}</ageSpouse>
  <gender>${self.getLAGender()}</gender>
  <genderSpouse>${self.getSpouseGender()}</genderSpouse>
  <premFreq>${self.getPremiumFrequency().title}</premFreq>
  <policyTerm>${self.getPolicyTerm()}</policyTerm>
  <sumAssured>${self.getSumAssured()}</sumAssured>
  <isADBRider>${self.getADBRiderChosen()}</isADBRider>
  <adbApplicableFor>${self.getRiderApplicableFor()}</adbApplicableFor>
  <adbTerm>${(self.getRiderApplicableFor() == "Life to be Assured" || self.getRiderApplicableFor() == "Both Lives Assured") ? self.getLARiderTerm() : ''}</adbTerm>
  <adbSA>${(self.getRiderApplicableFor() == "Life to be Assured" || self.getRiderApplicableFor() == "Both Lives Assured") ? self.getLASumAssured() : ''}</adbSA>
  <adbTermSpouse>${(self.getRiderApplicableFor() == "Spouse Life to be Assured" || self.getRiderApplicableFor() == "Both Lives Assured" ) ? self.getSpouseRiderTerm() : ''}</adbTermSpouse>
  <adbSASpouse>${(self.getRiderApplicableFor() == "Spouse Life to be Assured" || self.getRiderApplicableFor() == "Both Lives Assured" ) ? self.getSpouseSumAssured() : ''}</adbSASpouse>
  <IsBackdate>${self.getWishToBackdate()}</IsBackdate>
  <Backdate>${self.getWishToBackdate() ? dateMMDDYYYYFormat(self.getBackdate()) : ''}</Backdate>
  <IsMines></IsMines>
  <KFC>${getKerlaDiscount()}</KFC>
</getPremiumSmartHumsafar>`;


  let body = `<?xml version="1.0" encoding="utf-8"?>
              <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                  <soap:Body>
                      ${xmlBodyParam}
                  </soap:Body>
              </soap:Envelope>`;


  console.log(" body ", body)
  self.showLoader();

  console.log("PRODUCT CODE---" + this.productDetails.productCode);


  generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {
    var PlanCode = "1WHS";
    //BI_INPUT
    let forminputbyuser = {
      proposerName: self.getTitle() + " " + self.getFName() + " " + self.getLName(),
      spouseName: self.getSpouseTitle() + " " + self.getSpouseFName() + " " + self.getSpouseLName(),
      age: self.getLAAge(),
      gender: self.getLAGender(),
      spouseAge: self.getSpouseAge(),
      spouseGender: self.getSpouseGender(),
      MobileNo: self.getMobileNo(),
      Email: self.getEmail(),
      ConfirmEmail: self.getConfirmEmail(),
      policyTerm: self.getPolicyTerm(),
      sumAssured: self.getSumAssured(),
      premiumFrequency: self.getPremiumFrequency().title,
      quotationNumber: quotNumber,
      WishToBAckDate: self.getWishToBackdate(),
      BackDate: self.getWishToBackdate() ? dateMMDDYYYYFormat(self.getBackdate()) : '',
      isRiderChosen: self.getADBRiderChosen(),
      riderTerm: self.getLARiderTerm(),
      riderSumassured: self.getLASumAssured(),
      riderSpouseTerm: self.getSpouseRiderTerm(),
      riderSpouseSumAssured: self.getSpouseSumAssured(),
      riderApplicableFor: self.getRiderApplicableFor(),
      PlanName: self.productDetails.title,
      CustTitle: self.getTitle(),
      CustFirstName: self.getFName(),
      CustMiddleName: self.getMName(),
      CustLastName: self.getLName(),
      CustMobile: self.getMobileNo(),
      CustEmailID: self.getEmail(),
      LaDOB: getDDMMYYYY(self.getLADOB()),
      ProposerDOB: '',
      BasicSA: getSumAssured(),
      TotalPremAmt: '',
      Frequency: self.getPremiumFrequency().title,
      PolicyTerm: self.getPolicyTerm(),
      PremPayingTerm: 0,
      PlanCode: PlanCode,
      KFC: getKerlaDiscount() ? "Y" : "N",
      userType: getUserType(),
      userName: getUserFname() + " " + getUserLName()
    };

    let input = self.getInput(forminputbyuser);
    console.log("XML = ", input);
    self.ApiCallService('/getPremiumSmartHumsafar', body, '<SmartHumsafar>', '</SmartHumsafar>', true).then((data) => {
      self.hideLoader();
      data = data.SmartHumsafar;
      data.productDetails = self.productDetails;
      data.premiumFrequencyInput = getPremiumFrequency().title;
      data.frequency = forminputbyuser.Frequency;
      data.isRiderChosen = forminputbyuser.isRiderChosen;
      data.riderApplicableFor = forminputbyuser.riderApplicableFor;
      var stringifyJson = JSON.stringify(data);

      if (sessionStorage.premiumCalcOutput) {
        let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
        var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
        var lastIndex = premiumCalcXMLResponse.indexOf(`</NonGSV_surrndr_val_8Percent${getPolicyTerm()}>`);
        let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</NonGSV_surrndr_val_8Percent${getPolicyTerm()}>`.length);
        let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");
        remaningOutput = remaningOutput + "</SmartHumsafar>";
        remaningOutput = remaningOutput.replace(/BackDateinterest/g, "backdateInt");
        remaningOutput = remaningOutput.replace(/adbRiderPrem/g, "AdbRiderPremLifeAssured");
        remaningOutput = remaningOutput.replace(/AdbRiderPremLifeAssuredSpouse/g, "AdbRiderPremSpouse");
        remaningOutput = appendXMLTagAtStart(remaningOutput);
        let escapedOutput = escapeInputHTML(remaningOutput);
        sessionStorage.setItem("BIOutput", escapedOutput);
      }
      if (sessionStorage.ThroughNeedAnalysis) {
        let status = sessionStorage.getItem('ThroughNeedAnalysis');

        if (status === 'Yes') {
          forminputbyuser.TotalPremAmt = data.InstmntPrem; //Total Premium Amount
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
    console.log(" in error ", message);
    hideLoader();
  });

}

function getInput(forminputbyuser) {
  var inputVal = "";
  inputVal += `<?xml version='1.0' encoding='utf-8' ?><smarthumsafar>`;

  inputVal += `<LifeAssured_title>${self.getLATitle()}</LifeAssured_title>`;
  inputVal += `<LifeAssured_firstName>${self.getFName()}</LifeAssured_firstName>`;
  inputVal += `<LifeAssured_middleName>${self.getMName()}</LifeAssured_middleName>`;
  inputVal += `<LifeAssured_lastName>${self.getLName()}</LifeAssured_lastName>`;
  inputVal += `<LifeAssured_DOB>${getDDMMYYYY(self.getLADOB())}</LifeAssured_DOB>`;
  inputVal += `<LifeAssured_age>${self.getLAAge()}</LifeAssured_age>`;

  inputVal += `<proposer_title>${self.getLATitle()}</proposer_title>`;
  inputVal += `<proposer_firstName>${self.getFName()}</proposer_firstName>`;
  inputVal += `<proposer_middleName>${self.getMName()}</proposer_middleName>`;
  inputVal += `<proposer_lastName>${self.getLName()}</proposer_lastName>`;
  inputVal += `<proposer_DOB>${getDDMMYYYY(self.getLADOB())}</proposer_DOB>`;
  inputVal += `<proposer_age>${self.getLAAge()}</proposer_age>`;
  inputVal += `<proposer_gender>${self.getLAGender()}</proposer_gender>`;

  inputVal += `<product_name>${product_name}</product_name>`;
  inputVal += `<product_Code>${product_code}</product_Code>`;
  inputVal += `<product_UIN>${product_uin}</product_UIN>`;
  inputVal += `<product_cateogory>${product_cateogory}</product_cateogory>`;
  inputVal += `<product_type>${product_type}</product_type>`;
  /* end */
  inputVal += `<proposer_Is_Same_As_Life_Assured>${proposer_Is_Same_As_Life_Assured}</proposer_Is_Same_As_Life_Assured>`;

  inputVal += `<isJKResident>false</isJKResident>`;
  inputVal += `<isStaff>false</isStaff>`;
  // inputVal.append("<isSmoker>" + String.valueOf(smokerOrNot)
  // + "</isSmoker>");
  inputVal += `<spouse_full_name>${forminputbyuser.spouseName}</spouse_full_name>`;
  inputVal += `<spouse_title>${self.getSpouseTitle()}</spouse_title>`;
  inputVal += `<spouse_first_name>${self.getSpouseFName()}</spouse_first_name>`;
  inputVal += `<spouse_middle_name>${self.getSpouseMName()}</spouse_middle_name>`;
  inputVal += `<spouse_last_name>${self.getSpouseLName()}</spouse_last_name>`;
  inputVal += `<spouse_dob>${getDDMMYYYY(self.getSpouseDOB())}</spouse_dob>`;

  inputVal += `<age_la>${self.getLAAge()}</age_la>`;
  inputVal += `<age_spouse>${self.getSpouseAge()}</age_spouse>`;
  inputVal += `<gender>${self.getLAGender()}</gender>`;
  inputVal += `<gender_spouse>${self.getSpouseGender()}</gender_spouse>`;

  inputVal += `<policyTerm>${forminputbyuser.policyTerm}</policyTerm>`;
  inputVal += `<premFreq>${forminputbyuser.premiumFrequency}</premFreq>`;
  inputVal += `<sumAssured>${forminputbyuser.sumAssured}</sumAssured>`;

  inputVal += `<isAdbRider>${self.getADBRiderChosen()}</isAdbRider>`;
  inputVal += `<applicablefor>${self.getADBRiderChosen() ? self.getRiderApplicableFor() : ''}</applicablefor>`;
  inputVal += `<adbTerm_la>${(self.getRiderApplicableFor() == "Life to be Assured" || self.getRiderApplicableFor() == "Both Lives Assured") ?  self.getLARiderTerm() : ''}</adbTerm_la>`;
  inputVal += `<adbTerm_spouse>${(self.getRiderApplicableFor() == "Spouse Life to be Assured" || self.getRiderApplicableFor() == "Both Lives Assured" ) ?  self.getSpouseRiderTerm() : ''}</adbTerm_spouse>`;
  inputVal += `<adbSumassured_la>${(self.getRiderApplicableFor() == "Life to be Assured" || self.getRiderApplicableFor() == "Both Lives Assured") ?  self.getLASumAssured() : ''}</adbSumassured_la>`;
  inputVal += `<adbSumassured_spouse>${(self.getRiderApplicableFor() == "Spouse Life to be Assured" || self.getRiderApplicableFor() == "Both Lives Assured") ?  self.getSpouseSumAssured() : ''}</adbSumassured_spouse>`;

  inputVal += `<Wish_to_backdate_policy>${self.getWishToBackdate() ? "y" : "n"}</Wish_to_backdate_policy>`;
  inputVal += `<backdating_Date>${self.getWishToBackdate() ? getDDMMYYYY(self.getBackdate()) : ''}</backdating_Date>`;
  inputVal += `<KFC>${forminputbyuser.KFC}</KFC>`;

  inputVal += `</smarthumsafar>`;
  let escapedHTML = escapeInputHTML(inputVal);
  sessionStorage.setItem("BIInput", escapedHTML);
  return escapedHTML;
}

//Start Added on 18/09/2019 by Tushar Kadam
function trueBackdate() {
  console.log(self.getWishToBackdate());
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
    var todayDate = date + "/" + month + "/" + currYear;
    var splitDate = (dateMMDDYYYYFormat(self.getBackdate())).split("-");
    console.log("splitDate=", splitDate);
    var newBackDate = new Date(splitDate[2], (splitDate[0] - 1), splitDate[1])
    console.log("newBackDate=", newBackDate);
    if (currMonth >= 4) {
      finYerEndDate = "01/04/" + currYear;
    } else {
      finYerEndDate = "01/04/" + (currYear - 1);
    }
    var finYerEndDate_split = self.splitDate(finYerEndDate);
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

function calculateMyAge() {
  if (!isEmpty(self.getLADOB()) && !isEmpty(self.getSpouseDOB())) {
    var age = self.getLADOB();
    var spouseAge = self.getSpouseDOB();
    var d = getDDMMYYYY(self.getBackdate());
    var split_date = d.split("/");
    var nowCal = new Date(split_date[2], split_date[1], split_date[0]);
    var ProposerDob = getDDMMYYYY(age).split("/");
    var spouseDob = getDDMMYYYY(spouseAge).split("/");
    var age = nowCal.getFullYear() - parseInt(ProposerDob[2]);
    var isMonthGreater = parseInt(ProposerDob[1]) > nowCal.getMonth();
    var isMonthSameButDayGreater = parseInt(ProposerDob[1]) == nowCal.getMonth() &&
      parseInt(ProposerDob[1]) > nowCal.getDate();
    if (isMonthGreater || isMonthSameButDayGreater) {
      age = age - 1;
    }
    if (age > minAge_LA) {
      document.forms["smartHumsafarform"]["la_age"].value = age;
    }
    var spouseAge = nowCal.getFullYear() - parseInt(spouseDob[2]);
    var isMonthGreaterSpouse = parseInt(spouseDob[1]) > nowCal.getMonth();
    var isMonthSameButDayGreaterSpouse = parseInt(spouseDob[1]) == nowCal.getMonth() &&
      parseInt(spouseDob[1]) > nowCal.getDate();
    if (isMonthGreaterSpouse || isMonthSameButDayGreaterSpouse) {
      spouseAge = spouseAge - 1;
    }
    if (spouseAge > minAge_spouse) {
      document.forms["smartHumsafarform"]["spouse_age"].value = spouseAge;
    }
  } else {
    document.forms['smartHumsafarform']['backDate'].value = "";
    if (isEmpty(self.getLADOB())) {
      alert("Please select a LifeAssured DOB First");
      return;
    }
    if (isEmpty(self.getSpouseDOB())) {
      alert("Please select a Spouse DOB First");
      return;
    }
  }
}

function setBackdateEmpty() {
  document.forms['smartHumsafarform']['backDate'].value = "";
}

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
//End Added on 18/09/2019 by Tushar Kadam
