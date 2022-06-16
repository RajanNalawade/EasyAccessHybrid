window.onload = function () {
    document.getElementById(DOMStrings.inputDate).innerHTML = $.datepicker.formatDate("dd/mm/yy", new Date());
    document.getElementById('divNA').style.display = "block";
};
let NAOutput;
let suggestedProdArray = [];
let notSuggestedProdArray = [];

let DOMStrings = {
    formName: 'needAnalysis',
    tabDetails: 'MyDetails',
    tabGoals: 'MyGoals',
    inputGroup: 'selectGroup',
    inputGender: 'gender',
    inputDOB: 'txtDOB',
    inputAge: 'txtAge',
    inputMartialStatus: 'martial',
    inputMonthlyIncome: 'txtMonthlyIncome',
    inputYearlyIncome: 'txtYearlyIncome',
    inputMonthlyExpense: 'txtMonthlyExpenses',
    inputYearlyExpense: 'txtYearlyExpenses',
    inputInsuranceCvrg: 'txtInsuranceCoverage',
    inputHomeLoan: 'txtOutstandingHL',
    inputLoanOthers: 'txtOutstandingLoan',
    inputChildren: 'kids_count',
    inputInflationRate: 'selectInflationRate',
    inputRiskAppetite: 'selectRisk',
    inputCorpusRetirement: 'txtCurrentCorpus',
    inputRetirementAge: 'txtRetirementAge',
    radioRetirementLifestyle: 'rbPostRetirement',
    radioBasic: 'rbBasic',
    radioComfortable: 'rbComfortable',
    radioLuxury: 'rbLuxury',
    inputYearsHome: 'txtYearsToBuyHome',
    inputCorpusHome: 'txtCorpusHome',
    inputCurrentHome: 'txtCurrentCostHome',
    inputYearsOther: 'txtYearsToOtherGoals',
    inputCorpusOther: 'txtCorpusOther',
    inputCurrentOther: 'txtCurrentCostOther',
    labelChildren: 'lblChildMessage',
    divChildTab: 'divChildren',
    tabChild1: 'tabChild1',
    tabChild2: 'tabChild2',
    tabChild3: 'tabChild3',
    tabChild4: 'tabChild4',
    tabBodyChild1: 'Child 1',
    inputChild1Name: 'txtChild1Name',
    inputChild1Age: 'txtChild1Age',
    inputChild1EduAge: 'txtChild1AgeEdu',
    inputChild1EduCorpus: 'txtChild1CorpusEdu',
    inputChild1EduCurrentCost: 'txtChild1CurrentEdu',
    inputChild1MarriageAge: 'txtChild1AgeMarriage',
    inputChild1MarriageCorpus: 'txtChild1CorpusMarriage',
    inputChild1MarriageCurrentCost: 'txtChild1CurrentMarriage',
    inputChild2Name: 'txtChild2Name',
    inputChild2Age: 'txtChild2Age',
    inputChild2EduAge: 'txtChild2AgeEdu',
    inputChild2EduCorpus: 'txtChild2CorpusEdu',
    inputChild2EduCurrentCost: 'txtChild2CurrentEdu',
    inputChild2MarriageAge: 'txtChild2AgeMarriage',
    inputChild2MarriageCorpus: 'txtChild2CorpusMarriage',
    inputChild2MarriageCurrentCost: 'txtChild2CurrentMarriage',
    inputChild3Name: 'txtChild3Name',
    inputChild3Age: 'txtChild3Age',
    inputChild3EduAge: 'txtChild3AgeEdu',
    inputChild3EduCorpus: 'txtChild3CorpusEdu',
    inputChild3EduCurrentCost: 'txtChild3CurrentEdu',
    inputChild3MarriageAge: 'txtChild3AgeMarriage',
    inputChild3MarriageCorpus: 'txtChild3CorpusMarriage',
    inputChild3MarriageCurrentCost: 'txtChild3CurrentMarriage',
    inputChild4Name: 'txtChild4Name',
    inputChild4Age: 'txtChild4Age',
    inputChild4EduAge: 'txtChild4AgeEdu',
    inputChild4EduCorpus: 'txtChild4CorpusEdu',
    inputChild4EduCurrentCost: 'txtChild4CurrentEdu',
    inputChild4MarriageAge: 'txtChild4AgeMarriage',
    inputChild4MarriageCorpus: 'txtChild4CorpusMarriage',
    inputChild4MarriageCurrentCost: 'txtChild4CurrentMarriage',
    inputProtectionPlans: 'selectProtectionPlan',
    inputRetirementPlans: 'selectRetirementPlan',
    inputInsurancePlans: 'selectInsurancePlan',
    inputChildFuturePlans: 'selectChildFuturePlan',
    inputDate: 'lblDate'
};

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    if (tabName === 'Child 1') {
        document.getElementById(DOMStrings.tabChild1).style.backgroundColor = '#adafb3';
        document.getElementById(DOMStrings.tabChild2).style.backgroundColor = '';
        document.getElementById(DOMStrings.tabChild3).style.backgroundColor = '';
        document.getElementById(DOMStrings.tabChild4).style.backgroundColor = '';
    } else if (tabName === 'Child 2') {
        document.getElementById(DOMStrings.tabChild2).style.backgroundColor = '#adafb3';
        document.getElementById(DOMStrings.tabChild1).style.backgroundColor = '';
        document.getElementById(DOMStrings.tabChild3).style.backgroundColor = '';
        document.getElementById(DOMStrings.tabChild4).style.backgroundColor = '';
    } else if (tabName === 'Child 3') {
        document.getElementById(DOMStrings.tabChild3).style.backgroundColor = '#adafb3';
        document.getElementById(DOMStrings.tabChild2).style.backgroundColor = '';
        document.getElementById(DOMStrings.tabChild1).style.backgroundColor = '';
        document.getElementById(DOMStrings.tabChild4).style.backgroundColor = '';
    } else if (tabName === 'Child 4') {
        document.getElementById(DOMStrings.tabChild4).style.backgroundColor = '#adafb3';
        document.getElementById(DOMStrings.tabChild3).style.backgroundColor = '';
        document.getElementById(DOMStrings.tabChild2).style.backgroundColor = '';
        document.getElementById(DOMStrings.tabChild1).style.backgroundColor = '';
    }
}

function setAge() {
    var dateString = getDOB();
    if (dateString != null && dateString != undefined && dateString != '') {
        var ageString = getAgeFromBirthdate(dateString);
        if (ageString < 18) {
            document.getElementById(DOMStrings.inputDOB).value = "";
            alert("Age should be above 18 years.");
        } else {
            document.getElementById(DOMStrings.inputAge).value = ageString;
            document.getElementById(DOMStrings.inputAge).innerHTML = ageString;
        }
    }
}

function setYearlyIncome() {
    var monthlyIncome = document.getElementById(DOMStrings.inputMonthlyIncome).value;

    if (monthlyIncome != null && monthlyIncome != undefined && monthlyIncome != '') {
        var yearlyIncomeString = Math.ceil(monthlyIncome * 12);
        document.getElementById(DOMStrings.inputYearlyIncome).value = yearlyIncomeString;
    }
}

function setYearlyExpense() {
    var monthlyExpense = document.getElementById(DOMStrings.inputMonthlyExpense).value;

    if (monthlyExpense != null && monthlyExpense != undefined && monthlyExpense != '') {
        var yearlyExpenseString = Math.ceil(monthlyExpense * 12);
        document.getElementById(DOMStrings.inputYearlyExpense).value = yearlyExpenseString;
    }
}

function onChangeChild(childNo) {
    if (childNo > 0) {
        document.getElementById(DOMStrings.divChildTab).style.display = 'block';
        document.getElementById(DOMStrings.tabBodyChild1).style.display = 'block';
        document.getElementById(DOMStrings.tabChild1).style.backgroundColor = '#adafb3';
        document.getElementById(DOMStrings.labelChildren).innerHTML = '';

        if (childNo === '1') {
            document.getElementById(DOMStrings.tabChild1).style.display = 'block';
            document.getElementById(DOMStrings.tabChild2).style.display = 'none';
            document.getElementById(DOMStrings.tabChild3).style.display = 'none';
            document.getElementById(DOMStrings.tabChild4).style.display = 'none';
        } else if (childNo === '2') {
            document.getElementById(DOMStrings.tabChild1).style.display = 'block';
            document.getElementById(DOMStrings.tabChild2).style.display = 'block';
            document.getElementById(DOMStrings.tabChild3).style.display = 'none';
            document.getElementById(DOMStrings.tabChild4).style.display = 'none';
        } else if (childNo === '3') {
            document.getElementById(DOMStrings.tabChild1).style.display = 'block';
            document.getElementById(DOMStrings.tabChild2).style.display = 'block';
            document.getElementById(DOMStrings.tabChild3).style.display = 'block';
            document.getElementById(DOMStrings.tabChild4).style.display = 'none';
        } else if (childNo === '4') {
            document.getElementById(DOMStrings.tabChild1).style.display = 'block';
            document.getElementById(DOMStrings.tabChild2).style.display = 'block';
            document.getElementById(DOMStrings.tabChild3).style.display = 'block';
            document.getElementById(DOMStrings.tabChild4).style.display = 'block';
        }
    } else {
        document.getElementById(DOMStrings.divChildTab).style.display = 'none';
        document.getElementById(DOMStrings.labelChildren).innerHTML = 'No children selected';
    }
}

function showCorpusHomeLoan() {
    if (document.getElementById(DOMStrings.inputYearsHome).value > 0) {
        document.getElementById('divCorpusHome').style.display = 'block';
        document.getElementById('divCurrentCostHome').style.display = 'block';
    } else {
        document.getElementById('divCorpusHome').style.display = 'none';
        document.getElementById('divCurrentCostHome').style.display = 'none';
    }
}

function showCorpusOtherLoan() {
    if (document.getElementById(DOMStrings.inputYearsOther).value > 0) {
        document.getElementById('divCorpusOther').style.display = 'block';
        document.getElementById('divCurrentCostOther').style.display = 'block';
    } else {
        document.getElementById('divCorpusOther').style.display = 'none';
        document.getElementById('divCurrentCostOther').style.display = 'none';
    }
}

function goToGoals() {
    if (validateMyDetails()) {
        document.getElementById('Section1').classList.remove('active');
        document.getElementById('Section2').classList.add('active');
        document.getElementById('goals').classList.add('ddd');
    }
}

function backToMyDetails() {
    document.getElementById('Section1').classList.add('active');
    document.getElementById('Section2').classList.remove('active');
    document.getElementById('Section3').classList.remove('active');
    document.getElementById('Section4').classList.remove('active');
    document.getElementById('personal').classList.add('ddd');
}

function backToGoals() {
    document.getElementById('Section1').classList.remove('active');
    document.getElementById('Section2').classList.add('active');
    document.getElementById('Section3').classList.remove('active');
    document.getElementById('Section4').classList.remove('active');
    document.getElementById('goals').classList.add('ddd');
}

function goToSolution() {
    if (validateMyGoals() && validateRetirementAge() && validateYearsForHome() && validateHomeLoan() && validateYearsForOther() &&
        validateOtherLoan() && validateChildFuture() && validateChild1Age() && validateChild2Age() && validateChild3Age() && validateChild4Age()) {
        console.log('------------------------------------------Validated---------------------------------------');
        let naInput = generateNAInput();
        let body = `<?xml version="1.0" encoding="utf-8"?>
                    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                      <soap:Body>
                        <getNeedAnalysis xmlns="http://tempuri.org/">
                            <inputval>${naInput}</inputval>
                            <authCode>Sbil123</authCode></getNeedAnalysis>
                      </soap:Body>
                    </soap:Envelope>`;
        showLoader();

        ApiCallService('/getNeedAnalysis', body, '<NeedAn>', '</NeedAn>').then((data) => {
            showLoader();
            data = data.NeedAn;
            var stringifyJson = JSON.stringify(data);
            console.log(data);

            NAOutput = data;

            //For Protection
            document.getElementById('lblTargetProtectionCvrg').innerHTML = data.LifeProtCorReq;
            document.getElementById('lblGapProtectionCvrg').innerHTML = data.LifeProtGapAmt;
            document.getElementById('lblCurrentProtectionCvrg').innerHTML = data.LifeProtCurrCoverAmt;

            //For Retirement
            document.getElementById('lblRetirementTargetAmount').innerHTML = data.RetCorReq;
            document.getElementById('lblRetirementInv').innerHTML = data.RetMonthInv;
            document.getElementById('lblRetirementYears').innerHTML = data.RetYrLeft;
            document.getElementById('lblGapRetirementAmount').innerHTML = data.RetGap;
            document.getElementById('lblCurrentRetirementAmount').innerHTML = data.RetCurrSav;

            //For Home
            document.getElementById('lblTargetHomeAmount').innerHTML = data.homeCorReq;
            document.getElementById('lblSaveHomeAmount').innerHTML = data.homeMonInvreq;
            if (data.homeCorReq === '0.0') {
                document.getElementById('lblSaveHomeYears').innerHTML = '0';
            } else {
                document.getElementById('lblSaveHomeYears').innerHTML = '1';
            }
            document.getElementById('lblGapHomeAmount').innerHTML = data.homeGap;
            document.getElementById('lblCurrentCorpusHome').innerHTML = data.homeCurSav;

            //For Other Goals
            document.getElementById('lblTargetOtherAmount').innerHTML = data.otheCorReq;
            document.getElementById('lblSaveOtherAmount').innerHTML = data.otheMonInvreq;
            if (data.otheCorReq === '0.0') {
                document.getElementById('lblSaveOtherYears').innerHTML = '0.0';
            } else {
                document.getElementById('lblSaveOtherYears').innerHTML = '1';
            }
            document.getElementById('lblGapOtherAmount').innerHTML = data.otheGap;
            document.getElementById('lblCurrentCorpusOther').innerHTML = data.otheCurSav;

            //For Child Future
            //For Child1 Education
            let child1Name = getChild1Name();

            if (child1Name !== '') {
                document.getElementById('lblChild1EduName').innerHTML = getChild1Name() + "'s Education";
            }
            document.getElementById('lblChildEdu1TargetAmount').innerHTML = data.chEduCorRe1;
            document.getElementById('lblChild1EduCurrentCorpus').innerHTML = data.chEdufvCurSaving1;
            document.getElementById('lblChild1EduGapAmount').innerHTML = data.chEduGap1;
            document.getElementById('lblSaveChild1EduAmount').innerHTML = data.chEduMonInvreq1;
            document.getElementById('lblSaveChild1EduYears').innerHTML = '';

            //For Child1 Marriage
            if (child1Name !== '') {
                document.getElementById('lblChild1MarriageName').innerHTML = getChild1Name() + "'s Marriage";
            }
            document.getElementById('lblChild1MarriageTargetAmount').innerHTML = data.chMarCorRe1;
            document.getElementById('lblChild1MarriageCurrentCorpus').innerHTML = data.chMarfvCurSaving1;
            document.getElementById('lblChild1MarriageGapAmount').innerHTML = data.chMarGap1;
            document.getElementById('lblSaveChild1MarriageAmount').innerHTML = data.chMarMonInvreq1;
            document.getElementById('lblSaveChild1MarriageYears').innerHTML = '';

            let noOfChild = getChildren();
            if (noOfChild === '1') {
                document.getElementById('divChild2').style.display = 'none';
                document.getElementById('divChild3').style.display = 'none';
                document.getElementById('divChild4').style.display = 'none';
            } else if (noOfChild === '2' || noOfChild === '3' || noOfChild === '4') {
                document.getElementById('divChild2').style.display = 'block';

                //For Child2 Education
                document.getElementById('lblChild2EduName').innerHTML = getChild2Name() + "'s Education";
                document.getElementById('lblChildEdu2TargetAmount').innerHTML = data.chEduCorRe2;
                document.getElementById('lblChild2EduCurrentCorpus').innerHTML = data.chEdufvCurSaving2;
                document.getElementById('lblChild2EduGapAmount').innerHTML = data.chEduGap2;
                document.getElementById('lblSaveChild2EduAmount').innerHTML = data.chEduMonInvreq2;
                document.getElementById('lblSaveChild2EduYears').innerHTML = '';

                //For Child2 Marriage
                document.getElementById('lblChild2MarriageName').innerHTML = getChild2Name() + "'s Marriage";
                document.getElementById('lblChild2MarriageTargetAmount').innerHTML = data.chMarCorRe2;
                document.getElementById('lblChild2MarriageCurrentCorpus').innerHTML = data.chMarfvCurSaving2;
                document.getElementById('lblChild2MarriageGapAmount').innerHTML = data.chMarGap2;
                document.getElementById('lblSaveChild2MarriageAmount').innerHTML = data.chMarMonInvreq2;
                document.getElementById('lblSaveChild2MarriageYears').innerHTML = '';
            }
            if (noOfChild === '3' || noOfChild === '4') {
                document.getElementById('divChild3').style.display = 'block';

                //For Child3 Education
                document.getElementById('lblChild3EduName').innerHTML = getChild3Name() + "'s Education";
                document.getElementById('lblChildEdu3TargetAmount').innerHTML = data.chEduCorRe3;
                document.getElementById('lblChild3EduCurrentCorpus').innerHTML = data.chEdufvCurSaving3;
                document.getElementById('lblChild3EduGapAmount').innerHTML = data.chEduGap3;
                document.getElementById('lblSaveChild3EduAmount').innerHTML = data.chEduMonInvreq3;
                document.getElementById('lblSaveChild3EduYears').innerHTML = '';

                //For Child3 Marriage
                document.getElementById('lblChild3MarriageName').innerHTML = getChild3Name() + "'s Marriage";
                document.getElementById('lblChild3MarriageTargetAmount').innerHTML = data.chMarCorRe3;
                document.getElementById('lblChild3MarriageCurrentCorpus').innerHTML = data.chMarfvCurSaving3;
                document.getElementById('lblChild3MarriageGapAmount').innerHTML = data.chMarGap3;
                document.getElementById('lblSaveChild3MarriageAmount').innerHTML = data.chMarMonInvreq3;
                document.getElementById('lblSaveChild3MarriageYears').innerHTML = '';
            }
            if (noOfChild === '4') {
                document.getElementById('divChild4').style.display = 'block';

                //For Child4 Education
                document.getElementById('lblChild4EduName').innerHTML = getChild4Name() + "'s Education";
                document.getElementById('lblChildEdu4TargetAmount').innerHTML = data.chEduCorRe4;
                document.getElementById('lblChild4EduCurrentCorpus').innerHTML = data.chEdufvCurSaving4;
                document.getElementById('lblChild4EduGapAmount').innerHTML = data.chEduGap4;
                document.getElementById('lblSaveChild4EduAmount').innerHTML = data.chEduMonInvreq4;
                document.getElementById('lblSaveChild4EduYears').innerHTML = '';

                //For Child4 Marriage
                document.getElementById('lblChild4MarriageName').innerHTML = getChild4Name() + "'s Marriage";
                document.getElementById('lblChild4MarriageTargetAmount').innerHTML = data.chMarCorRe4;
                document.getElementById('lblChild4MarriageCurrentCorpus').innerHTML = data.chMarfvCurSaving4;
                document.getElementById('lblChild4MarriageGapAmount').innerHTML = data.chMarGap4;
                document.getElementById('lblSaveChild4MarriageAmount').innerHTML = data.chMarMonInvreq4;
                document.getElementById('lblSaveChild4MarriageYears').innerHTML = '';
            }

            //For Protection Products
            let protectionPlansTrad = data.ProdLstLifeProtTrad;
            displayRecommendedProducts(protectionPlansTrad, 'divProtectionTrad');

            let protectionPlansUnit = data.ProdLstLifeProtUnit;
            displayRecommendedProducts(protectionPlansUnit, 'divProtectionUnit');

            //For Child Products
            let childPlansTrad = data.ProdLstChTrad;
            displayRecommendedProducts(childPlansTrad, 'divChildFutureTrad');

            let childPlansUnit = data.ProdLstChUnit;
            displayRecommendedProducts(childPlansUnit, 'divChildFutureTrad');

            //For Wealth Creation Products
            let wealthCreationTrad = data.ProdLstWealthCreTrad;
            displayRecommendedProducts(wealthCreationTrad, 'divInsuranceTrad');

            let wealthCreationUnit = data.ProdLstWealthCreUnit;
            displayRecommendedProducts(wealthCreationUnit, 'divInsuranceTrad');

            //For Retirement Products
            let retirementPlansTrad = data.ProdLstRetTrad;
            displayRecommendedProducts(retirementPlansTrad, 'divProtectionUnit');

            let retirementPlansUnit = data.ProdLstRetUnit;
            displayRecommendedProducts(retirementPlansUnit, 'divProtectionUnit');

            document.getElementById('Section2').classList.remove('active');
            document.getElementById('Section3').classList.add('active');
            document.getElementById('solution').classList.add('ddd');
            hideLoader();
        }).catch((error) => {
            console.log(" in error ", error);
            hideLoader();
        })
    }
}

function goToProductsList() {
    //Display Product List
    if (suggestedProdArray.length != 0) {
        for (let i = 0; i < productLists.length; i++) {
            let flag = 0;
            for (let j = 0; j < suggestedProdArray.length; j++) {
                if (productLists[i].productCode == suggestedProdArray[j].productCode) {
                    flag = 1;
                }
            }
            if (flag === 0) {
                notSuggestedProdArray.push(productLists[i]);
            }
        }

        //For Rendering Suggested Products.
        let suggestedProducts = "",
            divSuggestedProd = "",
            elementTag = "",
            divNonSuggestedProd = "";
        for (var i = 0; i < suggestedProdArray.length; i++) {
            divSuggestedProd = document.getElementById('divSuggestedProducts');
            //Creating Input Button

            var element = document.createElement("input");
            element.type = 'button';
            element.value = suggestedProdArray[i].productName;
            element.id = suggestedProdArray[i].productCode;
            element.className = 'btn btn-primary';
            element.style = 'width: 100%;';
            element.onclick = function () {
                redirectToBrochure(this.value, this.id)
            };
            // var productBtnDivId = document.getElementById('div' + suggestedProdArray[i].productCode);
            divSuggestedProducts.appendChild(element)


            elementTag = divSuggestedProd.getElementsByTagName("input");
        }
        this.addBRElement(divSuggestedProd, elementTag);

        //For Rendering Non-Suggested Products.
        let nonSuggestedProducts = "";
        for (var i = 0; i < notSuggestedProdArray.length; i++) {
            divNonSuggestedProd = document.getElementById('divNonSuggestedProducts');
            //Creating Input Button

            var element = document.createElement("input");
            element.type = 'button';
            element.value = notSuggestedProdArray[i].title;
            element.id = notSuggestedProdArray[i].productCode;
            element.className = 'btn btn-primary';
            element.style = 'width: 100%;';
            element.onclick = function () {
                redirectToBrochure(this.value, this.id)
            };
            // var productBtnDivId1 = document.getElementById('div' + notSuggestedProdArray[i].productCode);
            divNonSuggestedProducts.appendChild(element);
            elementTag = divNonSuggestedProd.getElementsByTagName("input");
        }
        this.addBRElement(divNonSuggestedProd, elementTag);
    }

    document.getElementById('Section3').classList.remove('active');
    document.getElementById('Section4').classList.add('active');
    document.getElementById('products').classList.add('ddd');
};

//This function is used to redirect to respective product brochure.
function redirectToBrochure(productName, productCode) {
    var productSelected = "";
    for (var i = 0; i < productLists.length; i++) {
        if (productLists[i].productCode === productCode) {
            productSelected = productLists[i];
        }
    }

    var stringifyProductJson = serializeObject(productSelected);
    // console.log(stringifyProductJson);

    // const srCode = getUserCode();
    // const srType = getUserType();
    // let channelID, channelType;

    // // Condition fo Channel Type and Channel ID.
    // if (srType === 'CIF' || srType === 'BDM') {
    //     channelID = '2';
    //     channelType = 'Bancassurance';
    // } else if (srType === 'CAG') {
    //     channelID = 'CAG';
    //     channelType = 'CAG';
    // } else {
    //     channelID = 'AGD';
    //     channelType = 'AGENCY';
    // }

    // let currentDate = new Date();
    // let date = currentDate.getDate() + "-" + (parseInt(currentDate.getMonth()) + 1) + "-" + currentDate.getFullYear();

    // let inputNAPDF = {
    //     urnNo: "",
    //     Gender: self.getGender(),
    //     MartialStatus: self.getMartialStatus(),
    //     DOB: self.getDOB(),
    //     Age: self.getNAAge(),
    //     MonthlyIncome: self.getMonthlyIncome(),
    //     MonthlyExpense: self.getMonthlyExpense(),
    //     YearlyExpense: self.getYearlyExpense(),
    //     InsuranceCvrg: self.getInsuranceCvrg(),
    //     HomeLoan: self.getHomeLoan(),
    //     OtherLoan: self.getOtherLoan(),
    //     Inflation: self.getInflation(),
    //     RiskAppetite: self.getRiskAppetite(),
    //     NumberOfChildren: self.getChildren(),
    //     Child1Name: self.getChild1Name(),
    //     Child1Age: self.getChild1Age(),
    //     Child1EduAge: self.getChild1EduAge(),
    //     Child1MarriageAge: self.getChild1MarriageAge(),
    //     Child2Name: self.getChild2Name(),
    //     Child2Age: self.getChild2Age(),
    //     Child2EduAge: self.getChild2EduAge(),
    //     Child2MarriageAge: self.getChild2MarriageAge(),
    //     Child3Name: self.getChild3Name(),
    //     Child3Age: self.getChild3Age(),
    //     Child3EduAge: self.getChild3EduAge(),
    //     Child3MarriageAge: self.getChild3MarriageAge(),
    //     Child4Name: self.getChild4Name(),
    //     Child4Age: self.getChild4Age(),
    //     Child4EduAge: self.getChild4EduAge(),
    //     Child4MarriageAge: self.getChild4MarriageAge(),
    //     DreamHomeYears: self.getHomeLoan(),
    //     OtherYears: self.getOtherLoan(),
    //     ProductSelected: productSelected
    // };

    // if (sessionStorage.getItem('Group') === 'SBI/Retail') {
    //     let bodySBI = `<?xml version="1.0" encoding="utf-8"?>
    //             <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    //               <soap:Body>
    //                 <getUINNum xmlns="http://tempuri.org/" >
    //                     ${securityParameters()}
    //                 </getUINNum>
    //               </soap:Body>
    //             </soap:Envelope>`;
    //     //Generate URN Number for SBI/Retail
    //     hitService('/getUINNum', bodySBI).then((response) => {
    //         showLoader();
    //         var urnNumber = response.getElementsByTagName("getUINNumResult")[0].childNodes[0].nodeValue;
    //         console.log('-----------------------URN Number----------------' + urnNumber);
    //         if (urnNumber !== '') {
    //             //Session Storage for Need Analysis
    //             if (typeof(Storage) !== "undefined") {
    //                 sessionStorage.setItem("ThroughNeedAnalysis", "Yes");
    //                 sessionStorage.setItem("URNNumber", urnNumber);
    //             }

    //             // Data for saving in IndexedDB
    //             var dataDB = {
    //                 URNNumber: urnNumber,
    //                 NAInput: sessionStorage.getItem("NAInput"),
    //                 NAOutput: sessionStorage.getItem("NAOutput"),
    //                 SRType: srType,
    //                 SRCode: srCode,
    //                 SREmail: getUserEmail(),
    //                 SRMobile: getUserMobile(),
    //                 ChannelType: channelType,
    //                 ChannelID: channelID,
    //                 SRSRCode: '',
    //                 SRSRType: '',
    //                 Source: 'SMRT_BANCA',
    //                 ImgArray: '',
    //                 NAImgArray: '',
    //                 Group: sessionStorage.getItem('Group'),
    //                 CreatedDate: date
    //             };

    //             inputNAPDF.urnNo = urnNumber;

    //             //Initailize DB
    //             initializeSMRTDB().then((initialized) => {
    //                 //Open DB
    //                 openDBSMRT().then((smrtDB) => {
    //                     smrtDB.onsuccess = function(event) {
    //                         var objStore = this.result.transaction('SMRTDetailsObjStore', 'readwrite').objectStore('SMRTDetailsObjStore');
    //                         objStore.add(dataDB); // Save data in IndexedDB.
    //                         console.log('Data Saved');
    //                         // Remove item from SessionStorage.
    //                         sessionStorage.removeItem('NAInput');
    //                         sessionStorage.removeItem('NAOutput');

    //                         let fileName = urnNumber + "_NA.pdf";

    //                         // Create Need Analysis PDF
    //                         createNeedAnalysisPDFMethod(NAOutput, inputNAPDF).then((respNA) => {

    //                             uploadPDFServiceNA(respNA, fileName).then((response) => {
    //                                 hideLoader();
    window.location.href = "../Brochure/brochure.html?product=" + stringifyProductJson;
    //                             });
    //                         });
    //                     }
    //                     smrtDB.onerror = function(err) {
    //                         console.log(err);
    //                     }
    //                 });
    //             });
    //         } else {
    //             alert("Please try again.");
    //             hideLoader();
    //         }
    //     }).catch((error) => {
    //         alert("Service Error occurred.");
    //         hideLoader();
    //     });
    // } else if (sessionStorage.getItem('Group') === 'Other') {

    //     let bodyOther = `<?xml version="1.0" encoding="utf-8"?>
    //                      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    //                          <soap:Body>
    //                              <getURNBank xmlns="http://tempuri.org/">
    //                                  <strBankName>Other Bank</strBankName>
    //                                  ${securityParameters()}
    //                              </getURNBank>
    //                          </soap:Body>
    //                      </soap:Envelope>`;
    //     //Generate URN Number for Other
    //     hitService('/getURNBank', bodyOther).then((response) => {
    //         showLoader();
    //         var urnNumber = response.getElementsByTagName("getURNBankResult")[0].childNodes[0].nodeValue;
    //         console.log('-----------------------URN Number Other----------------' + urnNumber);
    //         if (urnNumber !== '') {
    //             //Session Storage for Need Analysis
    //             if (typeof(Storage) !== "undefined") {
    //                 sessionStorage.setItem("ThroughNeedAnalysis", "Yes");
    //                 sessionStorage.setItem("URNNumber", urnNumber);
    //             }

    //             // Data for saving in IndexedDB
    //             var dataDB = {
    //                 URNNumber: urnNumber,
    //                 NAInput: sessionStorage.getItem("NAInput"),
    //                 NAOutput: sessionStorage.getItem("NAOutput"),
    //                 SRType: srType,
    //                 SRCode: srCode,
    //                 SREmail: getUserEmail(),
    //                 SRMobile: getUserMobile(),
    //                 ChannelType: channelType,
    //                 ChannelID: channelID,
    //                 SRSRCode: '',
    //                 SRSRType: '',
    //                 Source: 'SMRT_BANCA',
    //                 ImgArray: '',
    //                 NAImgArray: '',
    //                 Group: sessionStorage.getItem('Group'),
    //                 CreatedDate: date
    //             };

    //             inputNAPDF.urnNo = urnNumber;

    //             //Initailize DB
    //             initializeSMRTDB().then((initialized) => {
    //                 //Open DB
    //                 openDBSMRT().then((smrtDB) => {
    //                     smrtDB.onsuccess = function(event) {
    //                         var objStore = this.result.transaction('SMRTDetailsObjStore', 'readwrite').objectStore('SMRTDetailsObjStore');
    //                         objStore.add(dataDB); // Save data in IndexedDB.
    //                         console.log('Data Saved');
    //                         // Remove item from SessionStorage.
    //                         sessionStorage.removeItem('NAInput');
    //                         sessionStorage.removeItem('NAOutput');

    //                         let fileName = urnNumber + "_NA.pdf";
    //                         // Create Need Analysis PDF
    //                         createNeedAnalysisPDFMethod(NAOutput, inputNAPDF).then((respNA) => {

    //                             uploadPDFService1(respNA, fileName).then((response) => {
    //                                 console.log(response);
    //                                 hideLoader();
    //                                 window.location.href = "../Brochure/brochure.html?product=" + stringifyProductJson;
    //                             });
    //                         });
    //                     }
    //                     smrtDB.onerror = function(err) {
    //                         console.log(err);
    //                     }
    //                 });
    //             });
    //         } else {
    //             alert("Please try again.");
    //             hideLoader();
    //         }
    //     }).catch((error) => {
    //         console.log(error);
    //         alert("Service Error occurred.");
    //         hideLoader();
    //     });
    // }
}

function uploadPDFServiceNA(respNA, fileName) {
    return new Promise((resolve, reject) => {

        //Service Call for PDF Upload
        let body = `<?xml version="1.0" encoding="utf-8"?>
            <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
              <soap:Body>
                <UploadFile_URN xmlns="http://tempuri.org/">
                  <f>${respNA}</f>
                  <fileName>${fileName}</fileName>
                  ${securityParameters()}
                </UploadFile_URN>
              </soap:Body>
            </soap:Envelope>`;

        hitService('/UploadFile_URN', body).then((response) => {
            console.log("NA PDF Upload " + response);
            resolve(response);
        }).catch((error) => {
            console.log(error);
            hideLoader();
            reject(error);
        });
    });
}

function serializeObject(objectToSerialize) {
    return JSON.stringify(objectToSerialize);
}

function addBRElement(divId, elementTag) {
    for (var i = 1; i < elementTag.length; i++) {
        var elementBR1 = document.createElement("BR");
        var elementBR2 = document.createElement("BR");
        divId.insertBefore(elementBR1, elementTag[i]);
        divId.insertBefore(elementBR2, elementTag[i]);
    }
}

function onChangeProtectionPlan() {
    let protectionPlan = document.getElementById(DOMStrings.inputProtectionPlans).value;
    if (protectionPlan === 'Traditional Plans') {
        document.getElementById('divProtectionTrad').style.display = 'block';
        document.getElementById('divProtectionUnit').style.display = 'none';
    } else if (protectionPlan === 'Unit Linked Plans') {
        document.getElementById('divProtectionTrad').style.display = 'none';
        document.getElementById('divProtectionUnit').style.display = 'block';
    }
};

function onChangeRetirementPlan() {
    let retirementPlan = document.getElementById(DOMStrings.inputRetirementPlans).value;
    if (retirementPlan === 'Traditional Plans') {
        document.getElementById('divRetirementTrad').style.display = 'block';
        document.getElementById('divRetirementUnit').style.display = 'none';
    } else if (retirementPlan === 'Unit Linked Plans') {
        document.getElementById('divRetirementTrad').style.display = 'none';
        document.getElementById('divRetirementUnit').style.display = 'block';
    }
};

function onChangeInsurancePlan() {
    let insurancePlan = document.getElementById(DOMStrings.inputInsurancePlans).value;
    if (insurancePlan === 'Traditional Plans') {
        document.getElementById('divInsuranceTrad').style.display = 'block';
        document.getElementById('divInsuranceUnit').style.display = 'none';
    } else if (insurancePlan === 'Unit Linked Plans') {
        document.getElementById('divInsuranceTrad').style.display = 'none';
        document.getElementById('divInsuranceUnit').style.display = 'block';
    }
};

function onChangeChildFuturePlan() {
    let childFuturePlan = document.getElementById(DOMStrings.inputChildFuturePlans).value;
    if (childFuturePlan === 'Traditional Plans') {
        document.getElementById('divChildFutureTrad').style.display = 'block';
        document.getElementById('divChildFutureUnit').style.display = 'none';
    } else if (childFuturePlan === 'Unit Linked Plans') {
        document.getElementById('divChildFutureTrad').style.display = 'none';
        document.getElementById('divChildFutureUnit').style.display = 'block';
    }
};

//This function is used to display products in UI.
function displayRecommendedProducts(data, divId) {
    if (data !== '') {
        let splitProd = data.split('/');
        let labelsProducts = "";

        for (let loop = 0; loop < splitProd.length; loop++) {
            let products = splitProd[loop].split(';');
            labelsProducts = labelsProducts + "<p></p><label class='d_label'>" + products[0] + " ( " + products[2] + " )</label>"

            suggestedProdArray.push({
                'productCode': products[1],
                'UIN': products[2],
                'productName': products[0]
            });
        }

        document.getElementById(divId).innerHTML = labelsProducts;
    }
};

/******************************** NA GENERATE INPUT ***********************************/
function generateNAInput() {
    let currentCostHome, corpusHome, currentCostOther, corpusOther, eduChild1Age = '0',
        eduChild1YearRequired = '18',
        eduChild1CorpusCost = '0',
        eduChild1CurrentCost = '0',
        eduChild2Age = '0',
        eduChild2YearRequired = '18',
        eduChild2CorpusCost = '0',
        eduChild2CurrentCost = '0',
        eduChild3Age = '0',
        eduChild3YearRequired = '18',
        eduChild3CorpusCost = '0',
        eduChild3CurrentCost = '0',
        eduChild4Age = '0',
        eduChild4YearRequired = '18',
        eduChild4CorpusCost = '0',
        eduChild4CurrentCost = '0',
        marriageChild1Age = '25',
        marriageChild1CorpusCost = '0',
        marriageChild1CurrentCost = '0',
        marriageChild2Age = '25',
        marriageChild2CorpusCost = '0',
        marriageChild2CurrentCost = '0',
        marriageChild3Age = '25',
        marriageChild3CorpusCost = '0',
        marriageChild3CurrentCost = '0',
        marriageChild4Age = '25',
        marriageChild4CorpusCost = '0',
        marriageChild4CurrentCost = '0';
    let gender = getGender() === 'Male' ? 'M' : 'F';
    let postRetirementLife = getRetirementLifeStyle();
    let noOfChild = getChildren();
    let noYearsHome = getYearsForHome();
    let noYearsOther = getYearsForOther();

    if (noYearsHome === '0') {
        currentCostHome = '0';
        corpusHome = '0';
    } else {
        currentCostHome = getCurrentCostHome();
        corpusHome = getCorpusHome();
    }

    if (noYearsOther === '0') {
        currentCostOther = '0';
        corpusOther = '0';
    } else {
        currentCostOther = getCurrentCostOther();
        corpusOther = getCorpusOther();
    }

    if (noOfChild == "1" || noOfChild == "2" || noOfChild == "3" || noOfChild == "4") {
        eduChild1Age = getChild1Age();
        eduChild1YearRequired = getChild1EduAge();
        eduChild1CorpusCost = getChild1EduCorpus();
        eduChild1CurrentCost = getChild1EduCurrentCost();
        marriageChild1Age = getChild1MarriageAge();
        marriageChild1CorpusCost = getChild1MarriageCorpus();
        marriageChild1CurrentCost = getChild1MarriageCurrentCost();
    }
    if (noOfChild == "2" || noOfChild == "3" || noOfChild == "4") {
        eduChild2Age = getChild2Age();
        eduChild2YearRequired = getChild2EduAge();
        eduChild2CorpusCost = getChild2EduCorpus();
        eduChild2CurrentCost = getChild2EduCurrentCost();
        marriageChild2Age = getChild2MarriageAge();
        marriageChild2CorpusCost = getChild2MarriageCorpus();
        marriageChild2CurrentCost = getChild2MarriageCurrentCost();
    }
    if (noOfChild == "3" || noOfChild == "4") {
        eduChild3Age = getChild3Age();
        eduChild3YearRequired = getChild3EduAge();
        eduChild3CorpusCost = getChild3EduCorpus();
        eduChild3CurrentCost = getChild3EduCurrentCost();
        marriageChild3Age = getChild3MarriageAge();
        marriageChild3CorpusCost = getChild3MarriageCorpus();
        marriageChild3CurrentCost = getChild3MarriageCurrentCost();
    }
    if (noOfChild == "4") {
        eduChild4Age = getChild4Age();
        eduChild4YearRequired = getChild4EduAge();
        eduChild4CorpusCost = getChild4EduCorpus();
        eduChild4CurrentCost = getChild4EduCurrentCost();
        marriageChild4Age = getChild4MarriageAge();
        marriageChild4CorpusCost = getChild4MarriageCorpus();
        marriageChild4CurrentCost = getChild4MarriageCurrentCost();
    }

    let naInput = "<NeedAn>" +
        "<PrGe>" + gender + "</PrGe>" +
        "<PrAge>" + document.getElementById(DOMStrings.inputAge).value + "</PrAge>" +
        "<PrMarrSt>" + getMartialStatus() + "</PrMarrSt>" +
        "<PrDependCh>" + noOfChild + "</PrDependCh>" +
        "<PrAnnIncome>" + getYearlyIncome() + "</PrAnnIncome>" +
        "<PrAnnExp>" + getYearlyExpense() + "</PrAnnExp>" +
        "<PrOutStaHmLoanAmt>" + getHomeLoan() + "</PrOutStaHmLoanAmt>" +
        "<PrOutStaOthrLoanAmt>" + getOtherLoan() + "</PrOutStaOthrLoanAmt>" +
        "<currLifeInCov>" + getInsuranceCvrg() + "</currLifeInCov>" +
        "<currRetCorpSav>" + getCurrentCorpusRetirement() + "</currRetCorpSav>" +
        "<PrRetAge>" + getRetirementAge() + "</PrRetAge>" +
        "<PrPostRetLife>" + postRetirementLife + "</PrPostRetLife>" +
        "<PrEduChAge1>" + eduChild1Age + "</PrEduChAge1>" +
        "<PrEduChBudExpNoYrs1>" + eduChild1YearRequired + "</PrEduChBudExpNoYrs1>" +
        "<PrEduChBudEXp1>" + eduChild1CorpusCost + "</PrEduChBudEXp1>" +
        "<PrEduChCurrEXp1>" + eduChild1CurrentCost + "</PrEduChCurrEXp1>" +
        "<PrEduChAge2>" + eduChild2Age + "</PrEduChAge2>" +
        "<PrEduChBudExpNoYrs2>" + eduChild2YearRequired + "</PrEduChBudExpNoYrs2>" +
        "<PrEduChBudEXp2>" + eduChild2CorpusCost + "</PrEduChBudEXp2>" +
        "<PrEduChCurrEXp2>" + eduChild2CurrentCost + "</PrEduChCurrEXp2>" +
        "<PrEduChAge3>" + eduChild3Age + "</PrEduChAge3>" +
        "<PrEduChBudExpNoYrs3>" + eduChild3YearRequired + "</PrEduChBudExpNoYrs3>" +
        "<PrEduChBudEXp3>" + eduChild4CorpusCost + "</PrEduChBudEXp3>" +
        "<PrEduChCurrEXp3>" + eduChild4CurrentCost + "</PrEduChCurrEXp3>" +
        "<PrEduChAge4>" + eduChild4Age + "</PrEduChAge4>" +
        "<PrEduChBudExpNoYrs4>" + eduChild4YearRequired + "</PrEduChBudExpNoYrs4>" +
        "<PrEduChBudEXp4>" + eduChild4CorpusCost + "</PrEduChBudEXp4>" +
        "<PrEduChCurrEXp4>" + eduChild4CurrentCost + "</PrEduChCurrEXp4>" +
        "<PrMaChBudExpNoYrs1>" + marriageChild1Age + "</PrMaChBudExpNoYrs1>" +
        "<PrMaChBudEXp1>" + marriageChild1CorpusCost + "</PrMaChBudEXp1>" +
        "<PrMaChCurrEXp1>" + marriageChild1CurrentCost + "</PrMaChCurrEXp1>" +
        "<PrMaChCurrExpNoYrs2>" + marriageChild2Age + "</PrMaChCurrExpNoYrs2>" +
        "<PrMaChBudEXp2>" + marriageChild2CorpusCost + "</PrMaChBudEXp2>" +
        "<PrMaChCurrEXp2>" + marriageChild2CurrentCost + "</PrMaChCurrEXp2>" +
        "<PrMaChBudExpNoYrs3>" + marriageChild3Age + "</PrMaChBudExpNoYrs3>" +
        "<PrMaChBudEXp3>" + marriageChild3CorpusCost + "</PrMaChBudEXp3>" +
        "<PrMaChCurrEXp3>" + marriageChild3CurrentCost + "</PrMaChCurrEXp3>" +
        "<PrMaChBudExpNoYrs4>" + marriageChild4Age + "</PrMaChBudExpNoYrs4>" +
        "<PrMaChBudEXp4>" + marriageChild4CorpusCost + "</PrMaChBudEXp4>" +
        "<PrMaChCurrEXp4>" + marriageChild4CurrentCost + "</PrMaChCurrEXp4>" +
        "<PrProWeCrNoofYr>" + noYearsHome + "</PrProWeCrNoofYr>" +
        "<PrProWeCrBudExp>" + corpusHome + "</PrProWeCrBudExp>" +
        "<PrProWeCrCurrExp>" + currentCostHome + "</PrProWeCrCurrExp>" +
        "<PrOthFinWeCrNoofYr>" + noYearsOther + "</PrOthFinWeCrNoofYr>" +
        "<PrOthFinWeCrBudExp>" + corpusOther + "</PrOthFinWeCrBudExp>" +
        "<PrOthFinWeCrCurrExp>" + currentCostOther + "</PrOthFinWeCrCurrExp>" +
        "<Inflation>" + getInflation() + "</Inflation>" +
        "<RiskApp>" + getRiskAppetite() + "</RiskApp>" +
        "</NeedAn>";

    let escapedHTML = escapeInputHTML(naInput);

    //Session Storage for Need Analysis Input
    if (typeof (Storage) !== "undefined") {
        sessionStorage.setItem("NAInput", escapedHTML); // Need Ananlysis Input.
        sessionStorage.setItem("Group", getGroup()); // Group whether SBI Life or Others.
    }
    return escapedHTML;
}

/*************************************Validation***************************/
function validateMyDetails() {
    if (getGender() == "") {
        alert("Please select Gender");
        return false;
    } else if (getMartialStatus() == "") {
        alert("Please select Martial Status");
        return false;
    } else if (getChildren() == "") {
        alert("Please select No of Kids");
        return false;
    } else if (getDOB() == "") {
        alert("Please enter DOB");
        return false;
    } else if (getMonthlyIncome() == "") {
        alert("Please enter Monthly Income");
        return false;
    } else if (getMonthlyExpense() == "") {
        alert("Please enter Monthly Expense");
        return false;
    } else if (getInsuranceCvrg() == "") {
        alert("Please enter Current Life Insurance Coverage");
        return false;
    } else if (getHomeLoan() == "") {
        alert("Please enter Outstanding Home Loan");
        return false;
    } else if (getOtherLoan() == "") {
        alert("Please enter Outstanding Loan(Other)");
        return false;
    }

    return true;
};

function validateMyGoals() {
    let noYearsHome = getYearsForHome();
    let noYearsOther = getYearsForOther();

    if (getCurrentCorpusRetirement() == "") {
        alert("Please enter Current Corpus saved for retirement");
        return false;
    } else if (getRetirementAge() == "") {
        alert("Please enter Expected Retirement Age");
        return false;
    } else if (getRetirementLifeStyle() == "") {
        alert("Please enter Post Retirement LifeStyle");
        return false;
    } else if (getYearsForHome() == "") {
        alert("Please enter No. of Years to buy a home");
        return false;
    } else if (noYearsHome > "0") {
        if (getCorpusHome() == "") {
            alert("Please enter Corpus already saved for home");
            return false;
        }
    } else if (noYearsHome > "0") {
        if (getCurrentCostHome() == "") {
            alert("Please enter Current Cost for home");
            return false;
        }
    } else if (noYearsOther == "") {
        alert("Please enter No. of Years to realise other goals");
        return false;
    } else if (noYearsOther > "0") {
        if (getCorpusOther() == "") {
            alert("Please enter Corpus already saved for other");
            return false;
        }
    } else if (noYearsOther > "0") {
        if (getCurrentCostOther() == "") {
            alert("Please enter Current Cost for other");
            return false;
        }
    }
    return true;
}

function validateRetirementAge() {
    let age = getNAAge();
    let retirementAge = document.getElementById(DOMStrings.inputRetirementAge).value;

    if (retirementAge <= age) {
        alert('Retirement age can not be less than current age');
        return false;
    } else if (retirementAge > 80 || retirementAge < 40) {
        alert('Retirement age should be between  40 to 80');
        return false;
    } else {
        return true;
    }
}

function validateYearsForHome() {
    let noYearsHome = getYearsForHome();

    if (noYearsHome >= 1 || noYearsHome <= 35) {
        return true;
    } else {
        alert('Under Wealth Creation section please select No. of years to buy a home between 1 to 35');
        return false;
    }
}

function validateHomeLoan() {
    let currentCostHome = getCurrentCostHome();
    let corpusHome = getCorpusHome();
    let noYearsHome = getYearsForHome();

    if (noYearsHome != 0) {
        if (currentCostHome < corpusHome) {
            alert('Under Wealth Creation section the Current Cost should be more than the Current Corpus Saved');
            return false;
        }
        return true;
    }
    return true;
}

function validateYearsForOther() {
    let noYearsOther = getYearsForOther();

    if (noYearsOther >= 1 || noYearsOther <= 35) {
        return true;
    } else {
        alert('Under Wealth Creation section please select No. of years to realise other goals between 1 to 35');
        return false;
    }
}

function validateOtherLoan() {
    let currentCostOther = getCurrentCostOther();
    let corpusOther = getCorpusOther();
    let noYearsOther = getYearsForOther();

    if (noYearsOther != 0) {
        if (currentCostOther < corpusOther) {
            alert('Under Wealth Creation section the Current Cost should be more than the Current Corpus Saved');
            return false;
        }
        return true;
    }
    return true;
}

function validateChildFuture() {
    let noChild = getChildren();

    if (noChild > 0) {
        if (noChild === '1' || noChild === '2' || noChild === '3' || noChild === '4') {
            if (getChild1Name() === '' || getChild1Age() === '' || getChild1EduAge() === '' || getChild1EduCorpus() === '' || getChild1EduCurrentCost() === '' || getChild1MarriageAge() === '' || getChild1MarriageCorpus() === '' || getChild1MarriageCurrentCost() === '') {
                alert('Please enter Child 1 details');
                return false;
            }
        }
        if (noChild === '2' || noChild === '3' || noChild === '4') {
            if (getChild2Name() === '' || getChild2Age() === '' || getChild2EduAge() === '' || getChild2EduCorpus() === '' || getChild2EduCurrentCost() === '' || getChild2MarriageAge() === '' || getChild2MarriageCorpus() === '' || getChild2MarriageCurrentCost() === '') {
                alert('Please enter Child 2 details');
                return false;
            }
        }
        if (noChild === '3' || noChild === '4') {
            if (getChild3Name() === '' || getChild3Age() === '' || getChild3EduAge() === '' || getChild3EduCorpus() === '' || getChild3EduCurrentCost() === '' || getChild3MarriageAge() === '' || getChild3MarriageCorpus() === '' || getChild3MarriageCurrentCost() === '') {
                alert('Please enter Child 3 details');
                return false;
            }
        }
        if (noChild === '4') {
            if (getChild4Name() === '' || getChild4Age() === '' || getChild4EduAge() === '' || getChild4EduCorpus() === '' || getChild4EduCurrentCost() === '' || getChild4MarriageAge() === '' || getChild4MarriageCorpus() === '' || getChild4MarriageCurrentCost() === '') {
                alert('Please enter Child 4 details');
                return false;
            }
        }
        return true;
    } else {
        return true;
    }
}

function validateChild1Age() {
    let child1Age = getChild1Age();
    let child1EduAge = getChild1EduAge();
    let child1MarriageAge = getChild1MarriageAge();

    if (child1Age > 17) {
        alert('Maximum age for child1 is 17');
        return false;
    } else if (child1EduAge < 18 || child1EduAge > 25) {
        alert('Age at which education fund is required should be between 18 to 25 years');
        return false;
    } else if (child1MarriageAge < 18 || child1MarriageAge > 25) {
        alert('Age at which education fund is required should be between 18 to 25 years');
        return false;
    }
    return true;
}

function validateChild2Age() {
    let child2Age = getChild2Age();
    let child2EduAge = getChild2EduAge();
    let child2MarriageAge = getChild2MarriageAge();

    if (child2Age > 17) {
        alert('Maximum age for child2 is 17');
        return false;
    } else if (child2EduAge < 18 || child2EduAge > 25) {
        alert('Age at which education fund is required should be between 18 to 25 years');
        return false;
    } else if (child2MarriageAge < 18 || child2MarriageAge > 25) {
        alert('Age at which education fund is required should be between 18 to 25 years');
        return false;
    }
    return true;
}

function validateChild3Age() {
    let child3Age = getChild3Age();
    let child3EduAge = getChild3EduAge();
    let child3MarriageAge = getChild3MarriageAge();

    if (child3Age > 17) {
        alert('Maximum age for child3 is 17');
        return false;
    } else if (child3EduAge < 18 || child3EduAge > 25) {
        alert('Age at which education fund is required should be between 18 to 25 years');
        return false;
    } else if (child3MarriageAge < 18 || child3MarriageAge > 25) {
        alert('Age at which education fund is required should be between 18 to 25 years');
        return false;
    }
    return true;
}

function validateChild4Age() {
    let child4Age = getChild4Age();
    let child4EduAge = getChild4EduAge();
    let child4MarriageAge = getChild4MarriageAge();

    if (child4Age > 17) {
        alert('Maximum age for child4 is 17');
        return false;
    } else if (child4EduAge < 18 || child4EduAge > 25) {
        alert('Age at which education fund is required should be between 18 to 25 years');
        return false;
    } else if (child4MarriageAge < 18 || child4MarriageAge > 25) {
        alert('Age at which education fund is required should be between 18 to 25 years');
        return false;
    }
    return true;
}

/**********************************Getters***************************/
function getGroup() {
    return document.getElementById(DOMStrings.inputGroup).value;
}

function getGender() {
    return document.forms["needAnalysis"][DOMStrings.inputGender].value;
}

function getMartialStatus() {
    return document.forms["needAnalysis"][DOMStrings.inputMartialStatus].value;
}

function getDOB() {
    return document.getElementById(DOMStrings.inputDOB).value;
}

function getMonthlyIncome() {
    return document.getElementById(DOMStrings.inputMonthlyIncome).value;
}

function getYearlyIncome() {
    return document.getElementById(DOMStrings.inputYearlyIncome).value;
}

function getMonthlyExpense() {
    return document.getElementById(DOMStrings.inputMonthlyExpense).value;
}

function getYearlyExpense() {
    return document.getElementById(DOMStrings.inputYearlyExpense).value;
}

function getInsuranceCvrg() {
    return document.getElementById(DOMStrings.inputInsuranceCvrg).value;
}

function getHomeLoan() {
    return document.getElementById(DOMStrings.inputHomeLoan).value;
}

function getOtherLoan() {
    return document.getElementById(DOMStrings.inputLoanOthers).value;
}

function getInflation() {
    return document.getElementById(DOMStrings.inputInflationRate).value;
}

function getRiskAppetite() {
    return document.getElementById(DOMStrings.inputRiskAppetite).value;
}

function getNAAge() {
    return parseInt(document.getElementById(DOMStrings.inputAge).value, 10);
}

function getCurrentCorpusRetirement() {
    return document.getElementById(DOMStrings.inputCorpusRetirement).value;
}

function getRetirementAge() {
    return document.getElementById(DOMStrings.inputRetirementAge).value;
}

function getRetirementLifeStyle() {
    return document.forms[DOMStrings.formName][DOMStrings.radioRetirementLifestyle].value;
}

function getYearsForHome() {
    return document.getElementById(DOMStrings.inputYearsHome).value;
}

function getCurrentCostHome() {
    return document.getElementById(DOMStrings.inputCurrentHome).value;
}

function getCorpusHome() {
    return document.getElementById(DOMStrings.inputCorpusHome).value;
}

function getYearsForOther() {
    return document.getElementById(DOMStrings.inputYearsOther).value;
}

function getCurrentCostOther() {
    return document.getElementById(DOMStrings.inputCurrentOther).value;
}

function getCorpusOther() {
    return document.getElementById(DOMStrings.inputCorpusOther).value;
}

function getChildren() {
    return document.forms[DOMStrings.formName][DOMStrings.inputChildren].value;
}

function getChild1Name() {
    return document.getElementById(DOMStrings.inputChild1Name).value;
}

function getChild1Age() {
    return document.getElementById(DOMStrings.inputChild1Age).value;
}

function getChild1EduAge() {
    return document.getElementById(DOMStrings.inputChild1EduAge).value;
}

function getChild1EduCorpus() {
    return document.getElementById(DOMStrings.inputChild1EduCorpus).value;
}

function getChild1EduCurrentCost() {
    return document.getElementById(DOMStrings.inputChild1EduCurrentCost).value;
}

function getChild1MarriageAge() {
    return document.getElementById(DOMStrings.inputChild1MarriageAge).value;
}

function getChild1MarriageCorpus() {
    return document.getElementById(DOMStrings.inputChild1MarriageCorpus).value;
}

function getChild1MarriageCurrentCost() {
    return document.getElementById(DOMStrings.inputChild1MarriageCurrentCost).value;
}

function getChild2Name() {
    return document.getElementById(DOMStrings.inputChild2Name).value;
}

function getChild2Age() {
    return document.getElementById(DOMStrings.inputChild2Age).value;
}

function getChild2EduAge() {
    return document.getElementById(DOMStrings.inputChild2EduAge).value;
}

function getChild2EduCorpus() {
    return document.getElementById(DOMStrings.inputChild2EduCorpus).value;
}

function getChild2EduCurrentCost() {
    return document.getElementById(DOMStrings.inputChild2EduCurrentCost).value;
}

function getChild2MarriageAge() {
    return document.getElementById(DOMStrings.inputChild2MarriageAge).value;
}

function getChild2MarriageCorpus() {
    return document.getElementById(DOMStrings.inputChild2MarriageCorpus).value;
}

function getChild2MarriageCurrentCost() {
    return document.getElementById(DOMStrings.inputChild2MarriageCurrentCost).value;
}

function getChild3Name() {
    return document.getElementById(DOMStrings.inputChild3Name).value;
}

function getChild3Age() {
    return document.getElementById(DOMStrings.inputChild3Age).value;
}

function getChild3EduAge() {
    return document.getElementById(DOMStrings.inputChild3EduAge).value;
}

function getChild3EduCorpus() {
    return document.getElementById(DOMStrings.inputChild3EduCorpus).value;
}

function getChild3EduCurrentCost() {
    return document.getElementById(DOMStrings.inputChild3EduCurrentCost).value;
}

function getChild3MarriageAge() {
    return document.getElementById(DOMStrings.inputChild3MarriageAge).value;
}

function getChild3MarriageCorpus() {
    return document.getElementById(DOMStrings.inputChild3MarriageCorpus).value;
}

function getChild3MarriageCurrentCost() {
    return document.getElementById(DOMStrings.inputChild3MarriageCurrentCost).value;
}

function getChild4Name() {
    return document.getElementById(DOMStrings.inputChild4Name).value;
}

function getChild4Age() {
    return document.getElementById(DOMStrings.inputChild4Age).value;
}

function getChild4EduAge() {
    return document.getElementById(DOMStrings.inputChild4EduAge).value;
}

function getChild4EduCorpus() {
    return document.getElementById(DOMStrings.inputChild4EduCorpus).value;
}

function getChild4EduCurrentCost() {
    return document.getElementById(DOMStrings.inputChild4EduCurrentCost).value;
}

function getChild4MarriageAge() {
    return document.getElementById(DOMStrings.inputChild4MarriageAge).value;
}

function getChild4MarriageCorpus() {
    return document.getElementById(DOMStrings.inputChild4MarriageCorpus).value;
}

function getChild4MarriageCurrentCost() {
    return document.getElementById(DOMStrings.inputChild4MarriageCurrentCost).value;
}

/*************************High Charts JQuery****************************/
$(function () {
    $('#protectionCharts').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['']
        },
        yAxis: {
            min: 0,
            max: 100,
            endOnTick: false,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true, // This is ignored <<<<<<
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: 'Gap to target amount',
            data: [7]
        }, {
            name: 'Saved Amount',
            data: [3]
        }]
    });

    /* 2 */
    $('#retirementCharts').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['']
        },
        yAxis: {
            min: 0,
            max: 100,
            endOnTick: false,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true, // This is ignored <<<<<<
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: 'Gap to target amount',
            data: [7]
        }, {
            name: 'Saved Amount',
            data: [3]
        }]
    });

    /* 3 */
    $('#child1EduCharts').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['']
        },
        yAxis: {
            min: 0,
            max: 100,
            endOnTick: false,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true, // This is ignored <<<<<<
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: 'Gap to target amount',
            data: [7]
        }, {
            name: 'Saved Amount',
            data: [3]
        }]
    });

    /* 4 */
    $('#child1MarriageCharts').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['']
        },
        yAxis: {
            min: 0,
            max: 100,
            endOnTick: false,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true, // This is ignored <<<<<<
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: 'Gap to target amount',
            data: [7]
        }, {
            name: 'Saved Amount',
            data: [3]
        }]
    });

    /* 5 */
    $('#child2EduCharts').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['']
        },
        yAxis: {
            min: 0,
            max: 100,
            endOnTick: false,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true, // This is ignored <<<<<<
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: 'Gap to target amount',
            data: [7]
        }, {
            name: 'Saved Amount',
            data: [3]
        }]
    });

    /* 6 */
    $('#child2MarriageCharts').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['']
        },
        yAxis: {
            min: 0,
            max: 100,
            endOnTick: false,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true, // This is ignored <<<<<<
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: 'Gap to target amount',
            data: [7]
        }, {
            name: 'Saved Amount',
            data: [3]
        }]
    });

    /* 7 */
    $('#child3EduCharts').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['']
        },
        yAxis: {
            min: 0,
            max: 100,
            endOnTick: false,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true, // This is ignored <<<<<<
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: 'Gap to target amount',
            data: [7]
        }, {
            name: 'Saved Amount',
            data: [3]
        }]
    });

    /* 8 */
    $('#child3MarriageCharts').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['']
        },
        yAxis: {
            min: 0,
            max: 100,
            endOnTick: false,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true, // This is ignored <<<<<<
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: 'Gap to target amount',
            data: [7]
        }, {
            name: 'Saved Amount',
            data: [3]
        }]
    });

    /* 9 */
    $('#child4EduCharts').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['']
        },
        yAxis: {
            min: 0,
            max: 100,
            endOnTick: false,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true, // This is ignored <<<<<<
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: 'Gap to target amount',
            data: [7]
        }, {
            name: 'Saved Amount',
            data: [3]
        }]
    });

    /* 10 */
    $('#child4MarriageCharts').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['']
        },
        yAxis: {
            min: 0,
            max: 100,
            endOnTick: false,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true, // This is ignored <<<<<<
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: 'Gap to target amount',
            data: [7]
        }, {
            name: 'Saved Amount',
            data: [3]
        }]
    });

    /* 11 */
    $('#homeCharts').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['']
        },
        yAxis: {
            min: 0,
            max: 100,
            endOnTick: false,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true, // This is ignored <<<<<<
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: 'Gap to target amount',
            data: [7]
        }, {
            name: 'Saved Amount',
            data: [3]
        }]
    });

    /* 12 */
    $('#otherCharts').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['']
        },
        yAxis: {
            min: 0,
            max: 100,
            endOnTick: false,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true, // This is ignored <<<<<<
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: 'Gap to target amount',
            data: [7]
        }, {
            name: 'Saved Amount',
            data: [3]
        }]
    });
});