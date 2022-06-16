window.onload = function () {
    this.ready();
};

var successJson;
var productDetails;

function ready() {

    this.successJson = getPremiumCalcResponse();
    console.log("this.successJson ", this.successJson);

    this.productDetails = this.getProductDetails();
    this.initializeData();
    this.showCalculatedPremiumResponse(this.productDetails.productCode);
}

function getQueryStringData() {
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queries = queryString.split("&");
    return JSON.parse(queries[0].split("data=").pop());
}

function getPremiumCalcResponse() {
    return JSON.parse(sessionStorage.getItem('premiumCalcResponse'));
}

function getProductDetails() {
    return this.successJson.productDetails;
}

function initializeData() {
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
}

function showCalculatedPremiumResponse(productCode) {
    console.log("productCode ", productCode);

    switch (productCode) {
        case "1M":
            var htmlTemplate = `<ul><li><p>Sum Assured is Rs. ${this.successJson.sumAssured}</p></li></ul>
       <ul><li><p>Fund Value @ 4% is Rs. ${this.successJson.MatBenefit6}</p></li></ul>
       <ul><li><p>Fund Value @ 8% is Rs. ${this.successJson.MatBenefit10}</p></li></ul>`;
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;

        case "2H":
            var htmlTemplate = `<ul><li><p>Sum Assured is Rs. ${this.successJson.sumAssured != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.sumAssured) : ''}</p></li></ul>
       <ul><li><p>Fund Value @ 4% is Rs. ${this.successJson.fundVal4 != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.fundVal4) : ''}</p></li></ul>
       <ul><li><p>Fund Value @ 8% is Rs. ${this.successJson.fundVal8 != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.fundVal8) : ''}</p></li></ul>`;
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;


        case "2G":
            var htmlTemplate = `<ul><li><p>Yearly Basic Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.basicPrem)}</p></li></ul>
      <ul><li><p>First Year Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.firtYrServTax)}</p></li></ul>
      <ul><li><p>First Year Premium with Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.firtYrPremWithTax)}</p></li></ul>
      <ul><li><p>Second Year Onwards Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.secYrServTax)}</p></li></ul>
      <ul><li><p>Second Year Onwards Premium with Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.secYrPremWithTax)}</p></li></ul>
      <ul><li><p><b>Sum Assured</b> is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.sumAssured)}</p></li></ul>
      <ul><li><p><b>Guaranteed Maturity Benefit</b> is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.guratnedMatBen)}</p></li></ul>`;
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;

        case "1P":
            var year1 = new Intl.NumberFormat('en-IN').format(this.successJson.policyTerm) - 3;
            var year2 = new Intl.NumberFormat('en-IN').format(this.successJson.policyTerm) - 2;
            var year3 = new Intl.NumberFormat('en-IN').format(this.successJson.policyTerm) - 1;
            var year4 = new Intl.NumberFormat('en-IN').format(this.successJson.policyTerm);

            var htmlTemplate = `<ul><li><p>Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.premium)}</p></li></ul>
                    <ul><li><p>GST is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.serviceTax)}</p></li></ul>
                    <ul><li><p>Premium with GST is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.premWithSerTx)}</p></li></ul>
                    <table style="width:100%">
                <tr>
                    <th>Year</th>
                    <th>Guaranteed Survival benefit</th> 
                    <th colspan="2">Total Survival Benefit (Guaranteed + Non-Guaranteed)</th>
                </tr>
                <tr>
                <th></th>
                <th></th>
                <th>4% pa</td>
                <th>8% pa</th>
                </tr>
                <tr>
                    <td>${year1}</td>
                    <td>${new Intl.NumberFormat('en-IN').format(this.successJson.guaranted)}</td>
                    <td>${new Intl.NumberFormat('en-IN').format(this.successJson.prevTotGua4pa)}</td>
                    <td>${new Intl.NumberFormat('en-IN').format(this.successJson.prevTotGua8pa)}</td>
                </tr>
                <tr>
                <td>${year2}</td>
                <td>${new Intl.NumberFormat('en-IN').format(this.successJson.guaranted)}</td>
                <td>${new Intl.NumberFormat('en-IN').format(this.successJson.prevTotGua4pa)}</td>
                <td>${new Intl.NumberFormat('en-IN').format(this.successJson.prevTotGua8pa)}</td>
                </tr>
                <tr>
                <td>${year3}</td>
                <td>${new Intl.NumberFormat('en-IN').format(this.successJson.guaranted)}</td>
                <td>${new Intl.NumberFormat('en-IN').format(this.successJson.prevTotGua4pa)}</td>
                <td>${new Intl.NumberFormat('en-IN').format(this.successJson.prevTotGua8pa)}</td>
                </tr>
                <tr>
                <td>${year4}</td>
                <td>${new Intl.NumberFormat('en-IN').format(this.successJson.guaranted)}</td>
                <td>${new Intl.NumberFormat('en-IN').format(this.successJson.totGua4pa)}</td>
                <td>${new Intl.NumberFormat('en-IN').format(this.successJson.totGua8pa)}</td>
                </tr>
                </table>
                `;
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;

        case "35":
            var htmlTemplate = `<ul><li><p>Basic Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.basicPrem != undefined ? this.successJson.basicPrem : '')}</p></li></ul>
      <ul><li><p>Installment Premium without Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.installmntPrem != undefined ? this.successJson.installmntPrem : '')}</p></li></ul>
      <ul><li><p>Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.servTax != undefined ? this.successJson.servTax : '')}</p></li></ul>
      <ul><li><p>Installment Premium with Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.installmntPremWithSerTx != undefined ? this.successJson.installmntPremWithSerTx : '')}</p></li></ul>
      <ul><li><p>Guaranteed Maturity Benefit is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.guarMatBenefit != undefined ? this.successJson.guarMatBenefit : '')}</p></li></ul>
      <ul><li><p>Non-guaranteed Maturity Benefit With 4%pa is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.nonGuarMatBenefit4 != undefined ? this.successJson.nonGuarMatBenefit4 : '')}</p></li></ul>
      <ul><li><p>Non-guaranteed Maturity Benefit With 8%pa is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.nonGuarMatBenefit8 != undefined ? this.successJson.nonGuarMatBenefit8 : '')}</p></li></ul>`;

            if (this.successJson.viewOfADBRiderOption) {
                var htmlTemplate = htmlTemplate + ` <ul><li><p>Accidental Death Benefit Rider Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.adbRiderPrem)}</p></li></ul></ng-container>`;
            }
            if (this.successJson.viewOfptaRiderOption) {
                var htmlTemplate = htmlTemplate + `<ul><li><p>Preferred Term Assurance Rider Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.ptaRiderPrem)}</p></li></ul>`;
            }
            if (this.successJson.viewOfatpdbiderOption) {
                var htmlTemplate = htmlTemplate + `<ul><li><p>Accidental Total & Permanent Disability Benefit Rider Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.atpdbRiderPrem)}</p></li></ul>`;
            }
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;
        case "47":
            var htmlTemplate = `<ul><li><p>Basic Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.basicPrem != undefined ? this.successJson.basicPrem : '')}</p></li></ul>
            <ul><li><p>Installment Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.installmntPrem != undefined ? this.successJson.installmntPrem : '')}</p></li></ul>`;
            if (this.successJson.isStaffDiscount) {
                var htmlTemplate = htmlTemplate + `<ul><li><p>Installment Premium with SBG Discount is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.installmntPremWithSBG)}</p></li></ul>`;
            }
            if (this.successJson.installmntPremWithSerTx) {
                var htmlTemplate = htmlTemplate + `<ul><li><p>Installment Premium Inclusive Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.installmntPremWithSerTx)}</p></li></ul>`;
            }
            if (this.successJson.isADBRiderChecked) {
                var htmlTemplate = htmlTemplate + `<ul><li><p>Accidental Death Benefit Rider Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.adbRiderPrem)}</p></li></ul>`;
            }
            if (this.successJson.isATPDBRiderChecked) {
                var htmlTemplate = htmlTemplate + `<ul><li><p>Accidental Total & Permanent Disability Benefit Rider Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.atpdbRiderPrem)}`;
            }
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;

        case "45":
            var htmlTemplate = `<ul><li><p>Basic Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.basicPrem)}</p></li></ul>`;
            if (this.successJson.installmntPrem) {
                var htmlTemplate = htmlTemplate + `<ul><li><p>Installment Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.installmntPrem)}</p></li></ul>`;
            }
            if (this.successJson.isStaffDiscount) {
                var htmlTemplate = htmlTemplate + `<ul><li><p>Installment Premium with SBG Discount is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.installmntPremWithSBG)}</p></li></ul>`;
            }
            var htmlTemplate = htmlTemplate + `<ul><li><p>Installment Premium Inclusive Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.installmntPremWithSerTx)}</p></li></ul>`;
            if (this.successJson.isCriticalRiderChecked) {
                var htmlTemplate = htmlTemplate + `<ul><li><p>Criti Care 13 Non Linked Rider Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.cc13RiderPrem)}</p></li></ul>`;
            }
            if (this.successJson.isADBRiderChecked) {
                var htmlTemplate = htmlTemplate + `<ul><li><p>Accidental Death Benefit Rider Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.adbRiderPrem)}</p></li></ul>`;
            }
            if (this.successJson.isATPDBRiderChecked) {
                var htmlTemplate = htmlTemplate + `<ul><li><p>Accidental Total & Permanent Disability Benefit Rider Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.atpdbRiderPrem)}</p></li></ul>`;
            }
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;

            break;

        case "2F":
            var htmlTemplate = `<ul><li><p>Life Cover Basic Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.InstallmentPremLifeCover_ExclSt != undefined ? this.successJson.InstallmentPremLifeCover_ExclSt : '')}</p></li></ul>
            <ul><li><p>Life Cover Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.ApplicableTaxesLifeCover != undefined ? this.successJson.ApplicableTaxesLifeCover : '')}</p></li></ul>
            <ul><li><p>Life Cover Premium with Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.InstallmentPremLifeCover_InclSt != undefined ? this.successJson.InstallmentPremLifeCover_InclSt : '')}</p></li></ul>
            <ul><li><p>Critical Illness Cover Basic Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.TotalPremiumWithoutST_CI != undefined ? this.successJson.TotalPremiumWithoutST_CI : '')}</p></li></ul>`;

            if (this.successJson.ServiceTax_CI != undefined) {
                var htmlTemplate = htmlTemplate + `<ul><li><p>Critical Illness Cover Basic Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.ServiceTax_CI != undefined ? this.successJson.ServiceTax_CI : '')}</p></li></ul>`
            }
            if (this.successJson.TotalPremiumWithST_CI != undefined) {
                var htmlTemplate = htmlTemplate + `<ul><li><p>Critical Illness Cover Basic Premium with Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.TotalPremiumWithST_CI != undefined ? this.successJson.TotalPremiumWithST_CI : '')}</p></li></ul>`
            }
            if (this.successJson.TotalFinalPremium_IncST != undefined) {
                var htmlTemplate = htmlTemplate + `<ul><li><p>Total Premium with Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.TotalFinalPremium_IncST != undefined ? this.successJson.TotalFinalPremium_IncST : '')}</p></li></ul>`;
            }
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;

        case "51":
            var htmlTemplate = ` <ul><li><p>Sum Assured is ${new Intl.NumberFormat('en-IN').format(this.successJson.sumAssured)}</p></li></ul>
            <ul><li><p>Fund Value @ 4% is ${new Intl.NumberFormat('en-IN').format(this.successJson.fundVal4)}</p></li></ul>
            <ul><li><p>Fund Value @ 8% is ${new Intl.NumberFormat('en-IN').format(this.successJson.fundVal8)}</p></li></ul>
            <ul><li><p>${this.successJson.premiumFrequencyMode} premium is ${new Intl.NumberFormat('en-IN').format(this.successJson.singlePrem)}</p></li></ul>`;
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;


        case "1W":
            var htmlTemplate = `<ul><li><p>${this.successJson.premiumFrequencyInput} Premium is Rs. ${this.successJson.basicPrem != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.basicPrem) : ''}</p></li></ul>
            <ul><li><p>${this.successJson.premiumFrequencyInput} Basic Premium with Rider (if any) is Rs. ${this.successJson.installmntPrem != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.installmntPrem) : ''}</p></li></ul>
            <ul><li><p>Applicable Taxes is Rs. ${this.successJson.servTax != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.servTax) : ''}</p></li></ul>
            <ul><li><p>${this.successJson.premiumFrequencyInput} Basic Premium with Applicable Taxes is Rs. ${this.successJson.installmntPremWithSerTx != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.installmntPremWithSerTx)  : ''}</p></li></ul>
            <ul><li><p>Guaranteed Maturity Benefit is Rs. ${this.successJson.guarMatBenefit != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.guarMatBenefit)  : ''}</p></li></ul>
            <ul><li><p>Non-Guaranteed Maturity Benefit at 4% is Rs. ${this.successJson.nonGuarMatBenefit4 != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.nonGuarMatBenefit4)  : ''}</p></li></ul>
            <ul><li><p>Non-Guaranteed Maturity Benefit at 8% is Rs. ${this.successJson.nonGuarMatBenefit8 != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.nonGuarMatBenefit8)  : ''}</p></li></ul>`
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;


        case "1H":
            var htmlTemplate = `<ul><li><p>Sum Assured is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.sumAssured != undefined ? this.successJson.sumAssured : '')}</p></li></ul>
            <ul><li><p>Fund Value @ 4% is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.fundVal4 != undefined ? this.successJson.fundVal4 : '')}</p></li></ul>
            <ul><li><p>Fund Value @ 8% is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.fundVal8 != undefined ? this.successJson.fundVal8 : '')}</p></li></ul>
            <ul><li><p>Annuity payable amount at 4% is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.annPayable4 != undefined ? this.successJson.annPayable4 : '')}</p></li></ul>
            <ul><li><p>Annuity payable amount at 8% is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.annPayable8 != undefined ? this.successJson.annPayable8 : '')}</p></li></ul>
            <ul><li><p>** The annuity rate used is of Life annuity option. This illustration is based on an annuity rate of ${new Intl.NumberFormat('en-IN').format(this.successJson.annuityRates != undefined ? this.successJson.annuityRates : '')}   per INR 1000 vesting amount. We do not guarantee the annuity rates. The actual annuity rate may differ and may be lesser or higher than the one shown in this illustration.</p></li></ul>`
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;

        case "2D":
            var htmlTemplate = `<ul><li><p>Premium Before Applicable Taxes : Rs ${new Intl.NumberFormat('en-IN').format(this.successJson.basicPrem)}</p></li></ul>
            <ul><li><p>Applicable Taxes 1st Year : Rs ${new Intl.NumberFormat('en-IN').format(this.successJson.servTax)}</p></li></ul>
            <ul><li><p>Applicable Taxes 2nd Year Onwards : Rs ${new Intl.NumberFormat('en-IN').format(this.successJson.servTaxSecondYear)}</p></li></ul>
            <ul><li><p>Premium with Applicable Taxes 1st year : Rs ${new Intl.NumberFormat('en-IN').format(this.successJson.installmntPremWithSerTx)}</p></li></ul>
            <ul><li><p>Premium with Applicable Taxes 2nd year onwards : Rs ${new Intl.NumberFormat('en-IN').format(this.successJson.installmntPremWithSerTxSecondYear)}</p></li></ul>`;
            if (this.successJson.matGuar !== undefined && this.successJson.matGuar !== null) {
                htmlTemplate = htmlTemplate + `<ul><li><p>Matuarity Benifit Guaranteed : Rs ${new Intl.NumberFormat('en-IN').format(this.successJson.matGuar)}</p></li></ul>`
            }
            var matNonGuar4pa = eval("this.successJson.matNonGuar4pa" + this.successJson.inputPolicyTerm + "");
            if (matNonGuar4pa !== undefined && matNonGuar4pa !== null) {
                htmlTemplate = htmlTemplate + `<ul><li><p>Matuarity Benifit Non-Guaranteed 4% : Rs ${new Intl.NumberFormat('en-IN').format(matNonGuar4pa)}</p></li></ul>`;
            }
            var matNonGuar8pa = eval("this.successJson.matNonGuar8pa" + this.successJson.inputPolicyTerm + "");
            if (matNonGuar8pa !== undefined && matNonGuar8pa !== null) {
                htmlTemplate = htmlTemplate + `<ul><li><p>Matuarity Benifit Non-Guaranteed 8% : Rs ${new Intl.NumberFormat('en-IN').format(matNonGuar8pa)}</p></li></ul>`
            }
            var planSelected = this.successJson.inputPlanSelected.toLowerCase();
            if (planSelected == "Option B (Endowment Option with in-built Accidental Death and Total Permanent Disability (AD&TPD) Benefit)".toLowerCase()) {
                htmlTemplate = htmlTemplate + `<ul><li><p>AD&TPD Premium : Rs ${this.successJson.AdTpdPremWithoutDisc ? new Intl.NumberFormat('en-IN').format(this.successJson.AdTpdPremWithoutDisc) : ''}</p></li></ul>`
            }
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;

        case "1R":
            var htmlTemplate = `<ul><li><p>${this.successJson.premiumFrequencyInput} Premium is Rs. ${this.successJson.basicPrem != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.basicPrem) : ''}</p></li></ul>
            <ul><li><p>Applicable Taxes is Rs. ${this.successJson.servTax != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.servTax) : ''}</p></li></ul>
            <ul><li><p>${this.successJson.premiumFrequencyInput} Premium with Applicable Taxes is Rs. ${this.successJson.installmntPremWithSerTx != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.installmntPremWithSerTx) : ''}</p></li></ul>`;

            if (this.successJson.planTypeInput == "Plan 1") {
                var htmlTemplate = htmlTemplate + `<ul><li><p>Guaranteed Survival Benefit (for Policy Year 11 - 15) is Rs. ${this.successJson.guarMatBenefit != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.guarMatBenefit) : ''}</p></li></ul>`;
            } else if (this.successJson.planTypeInput == "Plan 2") {
                var htmlTemplate = htmlTemplate + `<ul><li><p>Guaranteed Survival Benefit (for Policy Year 11 - 20) is Rs. ${this.successJson.guarMatBenefit != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.guarMatBenefit) : ''}</p></li></ul>`;
            } else if (this.successJson.planTypeInput == "Plan 3") {
                var htmlTemplate = htmlTemplate + `<ul><li><p>Guaranteed Survival Benefit (for Policy Year 16 - 20) is Rs. ${this.successJson.guarMatBenefit != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.guarMatBenefit) : ''}</p></li></ul>`;
            } else {
                var htmlTemplate = htmlTemplate + `<ul><li><p>Guaranteed Survival Benefit (for Policy Year 16 - 25) is Rs. ${this.successJson.guarMatBenefit != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.guarMatBenefit) : ''}</p></li></ul>`;
            }

            let polTerm = this.successJson.policyTermInput;

            var htmlTemplate = htmlTemplate + `<ul><li><p>Total Maturity Benefit(Guaranteed + Non-Guaranteed) at 4% is Rs.${this.successJson.nonGuarMatBenefit4 != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson['TotalMaturityBenefit4percent' + polTerm]) : ''}</p></li></ul>
                                                <ul><li><p>Total Maturity Benefit(Guaranteed + Non-Guaranteed) at 8% is Rs.${this.successJson.nonGuarMatBenefit8 != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson['TotalMaturityBenefit8Percent' + polTerm]) : ''}</p></li></ul>`;
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;

        case "2E":
            var htmlTemplate = `<h5><b>Plan : Standard</b></h5>
            <ul><li><p>Basic Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.PremiumBeforeST_Standard != undefined ? this.successJson.PremiumBeforeST_Standard : '' )}</p></li></ul>
            <ul><li><p>Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.GST_Standard != undefined ? this.successJson.GST_Standard  : '')}</p></li></ul>
            <ul><li><p>Premium with Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.PremiumWithServTax_Standard != undefined ? this.successJson.PremiumWithServTax_Standard : '')}</p></li></ul>
      
            <h5><b>Plan : Classic</b></h5>
            <ul><li><p>Basic Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.PremiumBeforeST_Classic != undefined ? this.successJson.PremiumBeforeST_Classic : '')}</p></li></ul>`;

            if (this.successJson.GST_Classic != undefined) {
                htmlTemplate = htmlTemplate + `<ul><li><p>Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.GST_Classic != undefined ? this.successJson.GST_Classic : '' )}</p></li></ul>`
            }

            if (this.successJson.PremiumWithServTax_Classic != undefined) {
                htmlTemplate = htmlTemplate + `<ul><li><p>Premium with Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.PremiumWithServTax_Classic != undefined ? this.successJson.PremiumWithServTax_Classic : '')}</p></li></ul>`
            }

            if (this.successJson.PremiumBeforeST_Enhanced != undefined) {
                htmlTemplate = htmlTemplate + `<h5><b>Plan : Enhanced</b></h5>
            <ul><li><p>Basic Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.PremiumBeforeST_Enhanced != undefined ? this.successJson.PremiumBeforeST_Enhanced : '')}</p></li></ul>`
            }

            if (this.successJson.GST_Enhanced != undefined) {
                htmlTemplate = htmlTemplate + `<ul><li><p>Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.GST_Enhanced != undefined ? this.successJson.GST_Enhanced : '')}</p></li></ul>`
            }

            if (this.successJson.PremiumWithServTax_Enhanced != undefined) {
                htmlTemplate = htmlTemplate + `<ul><li><p>Premium with Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.PremiumWithServTax_Enhanced != undefined ? this.successJson.PremiumWithServTax_Enhanced : '')}</p></li></ul>`
            }

            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;


        case "1N":
            var guaranMatBen = '';
            var nonGuaranMatBen4 = '';
            var nonGuaranMatBen8 = '';
            var guaranSurBen = 0;
            for (var i = 1; i <= parseInt(this.successJson.inputPolicyTerm, 10); i++) {

                if (i == parseInt(this.successJson.inputPolicyTerm, 10)) {
                    guaranMatBen += eval("this.successJson.guaranMatBen" + i + "");
                    nonGuaranMatBen4 += eval("this.successJson.nonGuaranMatBen_4Percent" + i + "");
                    nonGuaranMatBen8 += eval("this.successJson.nonGuaranMatBen_8Percent" + i + "");
                }
                var val = eval("this.successJson.getSurvivalBenefit" + i + "")
                val = val == null ? "0" : (val == "" ? "0" : val);
                guaranSurBen = parseInt(guaranSurBen, 10) + parseFloat(val);
            }
            var htmlTemplate = `<ul><li><p>Installment Premium without Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.installmentPrem != undefined ? this.successJson.installmentPrem : '')}</p></li></ul>
             <ul><li><p>Basic Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.basicPrem != undefined ? this.successJson.basicPrem : '')}</p></li></ul>
            <ul><li><p>Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.serviceTax != undefined ? this.successJson.serviceTax : '')}</p></li></ul>
            <ul><li><p>Installment Premium with Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.installmentPremWithST != undefined ? this.successJson.installmentPremWithST : '')}</p></li></ul>
            
            <h5>Guaranteed Benefit -</h5>
            <ul><li><p>Survival Benefit is Rs. :  ${new Intl.NumberFormat('en-IN').format(guaranSurBen)}</p></li></ul>
            <ul><li><p>Maturity Benefit is Rs. :   ${new Intl.NumberFormat('en-IN').format(guaranMatBen)}</p></li></ul>
            
            <h5>Non-guaranteed Benefit -</h5>
            <ul><li><p>Total Maturity Benefit(Guaranteed + Non-Guaranteed) @ 4%pa is Rs. ${new Intl.NumberFormat('en-IN').format(nonGuaranMatBen4)}</p></li></ul>
            <ul><li><p>Total Maturity Benefit(Guaranteed + Non-Guaranteed) @ 8%pa is Rs. ${new Intl.NumberFormat('en-IN').format(nonGuaranMatBen8)}</p></li></ul>`;

            if (this.successJson.isPTARiderChecked == true) {
                htmlTemplate = htmlTemplate + `<ul><li><p>Preferred Term Assurance Rider Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.ptaRiderPrem)}</p></li></ul>`
            }
            if (this.successJson.isADBRiderChecked == true) {
                htmlTemplate = htmlTemplate + `<ul><li><p>Accidental Death Benefit Rider Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.adbRiderPrem)}</p></li></ul>`
            }
            if (this.successJson.isATPDBRiderChecked == true) {
                htmlTemplate = htmlTemplate + `<ul><li><p>Accidental Total & Permanent Disability Benefit Rider Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.atpdbRiderPrem)}</p></li></ul>`
            }
            if (this.successJson.isCC13RiderChecked == true) {
                htmlTemplate = htmlTemplate + `<ul><li><p>Criti Care13 Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.cc13RiderPrem)}</p></li></ul>`
            }
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;


        case "1E":
            var guaranVestingBen = eval("this.successJson.vestingBenefit" + this.successJson.inputPolicyTerm + "");
            var nonGuaranVestingBen4 = eval("this.successJson.nonGuaranVestingBenefit_4Percent" + this.successJson.inputPolicyTerm + "");
            var nonGuaranVestingBen8 = eval("this.successJson.nonGuaranVestingBenefit_8Percent" + this.successJson.inputPolicyTerm + "");


            var htmlTemplate = `  <ul><li><p>Installment Premium is Rs. ${this.successJson.intallmentPremWithoutST != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.intallmentPremWithoutST) : ''}</p></li></ul>
            <ul><li><p>Base Premium Excluding Applicable Taxes is Rs. ${this.successJson.basePremExclST != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.basePremExclST) : ''}</p></li></ul>
            <ul><li><p>Applicable Taxes is Rs. ${this.successJson.serviceTax != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.serviceTax) : ''}</p></li></ul>
            <ul><li><p>Installment Premium With Applicable Taxes is Rs. ${this.successJson.instalmntPremWTServcTax != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.instalmntPremWTServcTax) : ''}</p></li></ul>
            <ul><li><p>Guaranteed Vesting Benefit is Rs. ${guaranVestingBen != undefined ? new Intl.NumberFormat('en-IN').format(guaranVestingBen) : ''}</p></li></ul>`;
            if (this.successJson.isRiderChecked == true) {
                htmlTemplate = htmlTemplate + `<ul><li><p>Rider Premium Excluding Applicable Taxes is Rs. ${this.successJson.riderPremExclST != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.riderPremExclST) : ''}</p></li></ul>`
            }
            htmlTemplate = htmlTemplate + `<ul><li><p>Non-Guaranteed Vesting Benefit with 4%pa is Rs. ${nonGuaranVestingBen4 != undefined ? new Intl.NumberFormat('en-IN').format(nonGuaranVestingBen4) : ''} </p></li></ul> 
                <ul><li><p>Non-Guaranteed Vesting Benefit with 8%pa is Rs. ${nonGuaranVestingBen8 != undefined ? new Intl.NumberFormat('en-IN').format(nonGuaranVestingBen8) : ''} </p></li></ul>`
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;

        case "70":

            var htmlTemplate = '';
            let loanType = this.successJson.input.InputLoanType;
            if (loanType === "Home Loan") {

                htmlTemplate = `<ul><li><p>Total First Year Premium for Primary Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrPrimaryBorwInclST)}</p></li></ul>
            <ul><li><p>Initial Sum Assured for Primary Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrPrimaryBorw)}</p></li></ul>
            <ul><li><p>Medical Requirements for Primary Borrower is  ${this.successJson.medReqFrPrimaryBorw}</p></li></ul>`;

                if (this.successJson.input.InputCoBorrower === '2 Co-Borrowers') {
                    htmlTemplate = htmlTemplate + `<ul><li><p>Total First Year Premium for Second Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrSecondBorwInclST)}</p></li></ul>
                <ul><li><p>Initial Sum Assured for Second Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrSecondBorw)}</p></li></ul>
                <ul><li><p>Medical Requirements for Second Borrower is ${this.successJson.medReqFrSecondBorw}</p></li></ul>`;

                } else if (this.successJson.input.InputCoBorrower === '3 Co-Borrowers') {

                    htmlTemplate = htmlTemplate + `<ul><li><p>Total First Year Premium for Second Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrSecondBorwInclST)}</p></li></ul>
                <ul><li><p>Initial Sum Assured for Second Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrSecondBorw)}</p></li></ul>
                <ul><li><p>Medical Requirements for Second Borrower is ${this.successJson.medReqFrSecondBorw}</p></li></ul>
                <ul><li><p>Total First Year Premium for Third Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrThirdBorwInclST)}</p></li></ul>
                <ul><li><p>Initial Sum Assured for Third Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrThirdBorw)}</p></li></ul>
                <ul><li><p>Medical Requirements for Third Borrower is ${this.successJson.medReqFrThirdBorw}</p></li></ul>`;
                }

                // One Premium Installment Details
                htmlTemplate = htmlTemplate + `<ul><li><p>Premium Inclusive of Applicable Taxes Payable for All Borrowers is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.premInclServiceTaxFrAllBorw)}</p></li></ul>`;

                /*Do not Print Payable Over 5 Year Details for Staff */
                // For Non Staff
                if (this.successJson.input.InputStaff === "Non-Staff") {
                    htmlTemplate = htmlTemplate + `<ul><li><p>Premium Inclusive of Applicable Taxes Payable for all Borrowers (Payable over 5 years) is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.premInclServiceTaxFrAllBorwOvr5Yrs)}</p></li></ul>`;
                }


            } else if (loanType === "Personal Loan") {

                htmlTemplate = `<ul><li><p>Total First Year Premium for Primary Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrPrimaryBorwInclST)}</p></li></ul>
            <ul><li><p>Initial Sum Assured for Primary Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrPrimaryBorw)}</p></li></ul>
            <ul><li><p>Medical Requirements for Primary Borrower is ${this.successJson.medReqFrPrimaryBorw}</p></li></ul>`;

                if (this.successJson.input.InputCoBorrower === '2 Co-Borrowers') {
                    htmlTemplate = htmlTemplate + `<ul><li><p>Total First Year Premium For Second Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrSecondBorwInclST)}</p></li></ul>
                <ul><li><p>Initial Sum Assured for Second Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrSecondBorw)}</p></li></ul>
                <ul><li><p>Medical Requirements for Second Borrower is ${this.successJson.medReqFrSecondBorw}</p></li></ul>`;

                } else if (this.successJson.input.InputCoBorrower === '3 Co-Borrowers') {

                    htmlTemplate = htmlTemplate + `<ul><li><p>Total First Year Premium For Second Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrSecondBorwInclST)}</p></li></ul>
                <ul><li><p>Initial Sum Assured for Second Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrSecondBorw)}</p></li></ul>
                <ul><li><p>Medical Requirements for Second Borrower is ${this.successJson.medReqFrSecondBorw}</p></li></ul>
                <ul><li><p>Total First Year Premium For Third Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrThirdBorwInclST)}</p></li></ul>
                <ul><li><p>Initial Sum Assured for Third Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrThirdBorw)}</p></li></ul>
                <ul><li><p>Medical Requirements for Third Borrower is ${this.successJson.medReqFrThirdBorw}</p></li></ul>`;
                }

                // One Premium Installment Details
                htmlTemplate = htmlTemplate + `<ul><li><p>Premium Inclusive of Applicable Taxes Payable for All Borrowers is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.premInclServiceTaxFrAllBorw)}</p></li></ul>`;

            } else if (loanType === "Vehicle Loan") {

                htmlTemplate = `<ul><li><p>Total First Year Premium for Primary Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrPrimaryBorwInclST)}</p></li></ul>
            <ul><li><p>Initial Sum Assured for Primary Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrPrimaryBorw)}</p></li></ul>
            <ul><li><p>Medical Requirements for Primary Borrower is ${this.successJson.medReqFrPrimaryBorw}</p></li></ul>`;

                if (this.successJson.input.InputCoBorrower === '2 Co-Borrowers') {
                    htmlTemplate = htmlTemplate + `<ul><li><p>Total First Year Premium For Second Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrSecondBorwInclST)}</p></li></ul>
                <ul><li><p>Initial Sum Assured for Second Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrSecondBorw)}</p></li></ul>
                <ul><li><p>Medical Requirements for Second Borrower is ${this.successJson.medReqFrSecondBorw}</p></li></ul>`;

                }

                // One Premium Installment Details
                htmlTemplate = htmlTemplate + `<ul><li><p>Premium Inclusive of Applicable Taxes Payable for All Borrowers is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.premInclServiceTaxFrAllBorw)}</p></li></ul>`;

            } //Education Loan
            else {
                htmlTemplate = `<ul><li><p>Total First Year Premium for Primary Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrPrimaryBorwInclST)}</p></li></ul>
            <ul><li><p>Initial Sum Assured for Primary Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrPrimaryBorw)}</p></li></ul>
            <ul><li><p>Medical Requirement is ${this.successJson.medReqFrPrimaryBorw}</p></li></ul>;
            <ul><li><p>Premium Inclusive of Applicable Taxes Payable is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.premInclServiceTaxFrAllBorw)}</p></li></ul>`;

            }

            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;

        case "70B":
            var htmlTemplate = '';
            let loanTypeSingle = this.successJson.input.InputLoanType;
            if (loanTypeSingle === "Home Loan") {

                htmlTemplate = `<ul><li><p>Total First Year Premium for Primary Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrPrimaryBorwInclST)}</p></li></ul>
            <ul><li><p>Initial Sum Assured for Primary Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrPrimaryBorw)}</p></li></ul>
            <ul><li><p>Medical Requirements for Primary Borrower is  ${this.successJson.medReqFrPrimaryBorw}</p></li></ul>`;

                if (this.successJson.input.InputCoBorrower === '2 Co-Borrowers') {
                    htmlTemplate = htmlTemplate + `<ul><li><p>Total First Year Premium for Second Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrSecondBorwInclST)}</p></li></ul>
                <ul><li><p>Initial Sum Assured for Second Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrSecondBorw)}</p></li></ul>
                <ul><li><p>Medical Requirements for Second Borrower is ${this.successJson.medReqFrSecondBorw}</p></li></ul>`;

                } else if (this.successJson.input.InputCoBorrower === '3 Co-Borrowers') {

                    htmlTemplate = htmlTemplate + `<ul><li><p>Total First Year Premium for Second Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrSecondBorwInclST)}</p></li></ul>
                <ul><li><p>Initial Sum Assured for Second Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrSecondBorw)}</p></li></ul>
                <ul><li><p>Medical Requirements for Second Borrower is ${this.successJson.medReqFrSecondBorw}</p></li></ul>
                <ul><li><p>Total First Year Premium for Third Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrThirdBorwInclST)}</p></li></ul>
                <ul><li><p>Initial Sum Assured for Third Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrThirdBorw)}</p></li></ul>
                <ul><li><p>Medical Requirements for Third Borrower is ${this.successJson.medReqFrThirdBorw}</p></li></ul>`;
                }

                // One Premium Installment Details
                htmlTemplate = htmlTemplate + `<ul><li><p>Premium Inclusive of Applicable Taxes Payable for All Borrowers is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.premInclServiceTaxFrAllBorw)}</p></li></ul>`;

            } else if (loanTypeSingle === "Personal Loan") {

                htmlTemplate = `<ul><li><p>Total First Year Premium for Primary Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrPrimaryBorwInclST)}</p></li></ul>
            <ul><li><p>Initial Sum Assured for Primary Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrPrimaryBorw)}</p></li></ul>
            <ul><li><p>Medical Requirements for Primary Borrower is ${this.successJson.medReqFrPrimaryBorw}</p></li></ul>`;

                if (this.successJson.input.InputCoBorrower === '2 Co-Borrowers') {
                    htmlTemplate = htmlTemplate + `<ul><li><p>Total First Year Premium For Second Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrSecondBorwInclST)}</p></li></ul>
                <ul><li><p>Initial Sum Assured for Second Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrSecondBorw)}</p></li></ul>
                <ul><li><p>Medical Requirements for Second Borrower is ${this.successJson.medReqFrSecondBorw}</p></li></ul>`;

                } else if (this.successJson.input.InputCoBorrower === '3 Co-Borrowers') {

                    htmlTemplate = htmlTemplate + `<ul><li><p>Total First Year Premium For Second Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrSecondBorwInclST)}</p></li></ul>
                <ul><li><p>Initial Sum Assured for Second Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrSecondBorw)}</p></li></ul>
                <ul><li><p>Medical Requirements for Second Borrower is ${this.successJson.medReqFrSecondBorw}</p></li></ul>
                <ul><li><p>Total First Year Premium For Third Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrThirdBorwInclST)}</p></li></ul>
                <ul><li><p>Initial Sum Assured for Third Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrThirdBorw)}</p></li></ul>
                <ul><li><p>Medical Requirements for Third Borrower is ${this.successJson.medReqFrThirdBorw}</p></li></ul>`;
                }

                // One Premium Installment Details
                htmlTemplate = htmlTemplate + `<ul><li><p>Premium Inclusive of Applicable Taxes Payable for All Borrowers is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.premInclServiceTaxFrAllBorw)}</p></li></ul>`;

            } else if (loanTypeSingle === "Vehicle Loan") {

                htmlTemplate = `<ul><li><p>Total First Year Premium for Primary Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrPrimaryBorwInclST)}</p></li></ul>
            <ul><li><p>Initial Sum Assured for Primary Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrPrimaryBorw)}</p></li></ul>
            <ul><li><p>Medical Requirements for Primary Borrower is ${this.successJson.medReqFrPrimaryBorw}</p></li></ul>`;

                if (this.successJson.input.InputCoBorrower === '2 Co-Borrowers') {
                    htmlTemplate = htmlTemplate + `<ul><li><p>Total First Year Premium For Second Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrSecondBorwInclST)}</p></li></ul>
                <ul><li><p>Initial Sum Assured for Second Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrSecondBorw)}</p></li></ul>
                <ul><li><p>Medical Requirements for Second Borrower is ${this.successJson.medReqFrSecondBorw}</p></li></ul>`;

                }

                // One Premium Installment Details
                htmlTemplate = htmlTemplate + `<ul><li><p>Premium Inclusive of Applicable Taxes Payable for All Borrowers is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.premInclServiceTaxFrAllBorw)}</p></li></ul>`;

            } //Education Loan
            else {
                htmlTemplate = `<ul><li><p>Total First Year Premium for Primary Borrower Inclusive of Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totFrstYrPremFrPrimaryBorwInclST)}</p></li></ul>
            <ul><li><p>Initial Sum Assured for Primary Borrower is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.intlSumAssuredFrPrimaryBorw)}</p></li></ul>
            <ul><li><p>Medical Requirement is ${this.successJson.medReqFrPrimaryBorw}</p></li></ul>;
            <ul><li><p>Premium Inclusive of Applicable Taxes Payable is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.premInclServiceTaxFrAllBorw)}</p></li></ul>`;

            }
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;


        case "1Z":
            var htmlTemplate = `<ul><li><p>Basic Premium is Rs. ${this.successJson.basicPrem != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.basicPrem) : ''}</p></li></ul>
       <ul><li><p>First Year Applicable Taxes is Rs. ${this.successJson.fyServiceTax != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.fyServiceTax) : ''}</p></li></ul>
       <ul><li><p>First Year Premium with Applicable Taxes is Rs. ${this.successJson.fyPremium != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.fyPremium) : ''}</p></li></ul>`;

            if (this.successJson.isPlanTypeSingle) {
                htmlTemplate = htmlTemplate + `<ul><li><p>Second Year Applicable Taxes is Rs. ${this.successJson.syServiceTax != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.syServiceTax) : ''}</p></li></ul>
                                       <ul><li><p>Second Year Premium with Applicable Taxes is Rs. ${this.successJson.syPremium != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.syPremium) : ''}</p></li></ul>`
            }
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;

        case "1C":
            var htmlTemplate = `<ul><li><p>Sum Assured is Rs. ${this.successJson.sumAssured != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.sumAssured) : ''}</p></li></ul>
      <ul><li><p>Fund Value @ 4% is Rs. ${this.successJson.fundVal4 != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.fundVal4) : ''}</p></li></ul>
      <ul><li><p>Fund Value @ 8% is Rs. ${this.successJson.fundVal8 != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.fundVal8) : ''}</p></li></ul>`;
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;

        case "50":
            var htmlTemplate = `<ul><li><p>Sum Assured is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.sumAssured)}</p></li></ul>
      <ul><li><p>Fund Value @ 4% is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.fundVal6)}</p></li></ul>
      <ul><li><p>Fund Value @ 8% is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.fundVal10)}</p></li></ul>
      <ul><li><p>Regular Premium (RP) is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.regularPrem)}</p></li></ul>`;
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;
        case "53":
            var htmlTemplate = `<ul><li><p>Sum Assured is Rs. ${this.successJson.sumAssured != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.sumAssured) : ''}</p></li></ul>
      <ul><li><p>Fund Value @ 4% is Rs. ${this.successJson.fundVal6 != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.fundVal6) : ''}</p></li></ul>
      <ul><li><p>Fund Value @ 8% is Rs. ${this.successJson.fundVal10 != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.fundVal10) : ''}</p></li></ul>`;
            if (this.successJson.premiumFreq == "Single") {
                htmlTemplate += `<ul><li><p>Single Premium (SP) is Rs.  ${this.successJson.singlePrem != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.singlePrem) : ''}</p></li></ul>`
            } else {
                htmlTemplate += `<ul><li><p>Annualised Premium (LPPT) is Rs.  ${this.successJson.annualisedPrem != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.annualisedPrem) : ''}</p></li></ul>`
            }
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;


        case "1B":
            var nonGua4pa = eval("this.successJson.TotalMaturity_4percent" + this.successJson.inputPolicyTerm + "");
            var nonGua8pa = eval("this.successJson.TotalMaturity_8percent" + this.successJson.inputPolicyTerm + "");



            var htmlTemplate = `<ul><li><p>${this.successJson.premiumFrequencySelectedTitle} Basic Premium is Rs. ${this.successJson.basicPrem != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.basicPrem) : ''}</p></li></ul>
      <ul><li><p>${this.successJson.premiumFrequencySelectedTitle} Installment Premium without Applicable Taxes is Rs. ${this.successJson.InsrPremWithoutTx != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.InsrPremWithoutTx) : ''}</p></li></ul>
      <ul><li><p>Applicable Taxes is Rs. ${this.successJson.ServTx != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.ServTx) : ''}</p></li></ul>
      <ul><li><p>${this.successJson.premiumFrequencySelectedTitle} Installment Premium with Applicable Taxes is Rs. ${this.successJson.totalInstPremFirstYear != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.totalInstPremFirstYear) : ''}</p></li></ul>
      <ul><li><p>Guaranteed Maturity Benefit for next 15 years after Maturity is Rs. ${this.successJson.GuaMatBen != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.GuaMatBen ) : ''}</p></li></ul>
      <ul><li><p>Total Maturity Benefit(Guaranteed + Non-Guaranteed) at 4%pa is Rs.${nonGua4pa != undefined ? new Intl.NumberFormat('en-IN').format(nonGua4pa) : ''}</p></li></ul>
      <ul><li><p>Total Maturity Benefit(Guaranteed + Non-Guaranteed) at 8%pa is Rs.${nonGua8pa != undefined ? new Intl.NumberFormat('en-IN').format(nonGua8pa ) : ''}</p></li></ul>`
            if (this.successJson.isPTARiderChecked) {
                htmlTemplate += `<ul><li><p>Preferred Term Assurance Rider Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.premPTA)}</p></li></ul>`
            }
            if (this.successJson.isADBRiderChecked) {
                htmlTemplate += `<ul><li><p>Accidental Death Benefit Rider Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.premADB)}</p></li></ul>`
            }
            if (this.successJson.isATPDBRiderChecked) {
                htmlTemplate += `<ul><li><p>Accidental Total & Permanent Disability Benefit Rider Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.premATPDB)}</p></li></ul>`
            }
            if (this.successJson.isCC13NonLinkedChecked) {
                htmlTemplate += `<ul><li><p>Criti Care13 Premium is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.premCC13NonLinked)}</p></li></ul>`
            }
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;

        case "55":
            var htmlTemplate = `<ul><li><p>Sum Assured is Rs. ${this.successJson.sumAssured !== undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.sumAssured) : ''}</p></li></ul>
        <ul><li><p>Fund Value @ 4% is Rs. ${this.successJson.fundVal6 !== undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.fundVal6) : ''}</p></li></ul>
        <ul><li><p>Fund Value @ 8% is Rs. ${this.successJson.fundVal10 !== undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.fundVal10) : ''}</p></li></ul>
        <ul><li><p>Single Premium (SP) is Rs. ${this.successJson.singlePrem !== undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.singlePrem) : ''}</p></li></ul>`
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;


        case "2C":
            console.log("this.successJson.isAPCActive = " + (this.successJson.isAPCActive));
            var htmlTemplet = `<ul><li><p>${this.successJson.premiumFreq} Premium is ${new Intl.NumberFormat('en-IN').format(this.successJson.basicPrem)}</p></li></ul>
      <ul><li><p>Premium for Critical Illness is ${new Intl.NumberFormat('en-IN').format(this.successJson.cc13RiderPrem)}</p></li></ul>`
            if (this.successJson.isAPCActive) {
                htmlTemplet += `<ul><li><p>Premium for APC & CA is ${new Intl.NumberFormat('en-IN').format(this.successJson.ApcRiderPrem)}</p></li></ul>`
            }
            htmlTemplet += `<ul><li><p>Total Premium is ${new Intl.NumberFormat('en-IN').format(this.successJson.installmentPrem)}</p></li></ul>
      <ul><li><p>First Year GST is ${new Intl.NumberFormat('en-IN').format(this.successJson.FYServTax)}</p></li></ul>
      <ul><li><p>First Year Premium with GST  is ${new Intl.NumberFormat('en-IN').format(this.successJson.FYPremWithServTax)}</p></li></ul>
      <ul><li><p>Second Year GST is ${new Intl.NumberFormat('en-IN').format(this.successJson.SYServTax)}</p></li></ul>
      <ul><li><p>Second Year Premium with GST is ${new Intl.NumberFormat('en-IN').format(this.successJson.SYPremWithServTax)}</p></li></ul>
      <ul><li><p>Guaranteed Death Benefit is ${new Intl.NumberFormat('en-IN').format(this.successJson.GuraBenefit)}</p></li></ul>
      <ul><li><p>Non-Guaranteed Survival Benefit at 4% (on Maturity) is ${new Intl.NumberFormat('en-IN').format(this.successJson.NonGurBenefit4pa)}</p></li></ul>
      <ul><li><p>Non-Guaranteed  Survival Benefit at 8% (on Maturity) is ${new Intl.NumberFormat('en-IN').format(this.successJson.NonGurBenefit8pa)}</p></li></ul>`
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplet;
            break;

        case "2B":
            var htmlTemplate = `<ul><li><p>Sum Assured is Rs. ${this.successJson.sumAssured != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.sumAssured) : ''}.</p></li></ul>
      <ul><li><p>Fund Value @ 4% is Rs. ${this.successJson.fundVal4 != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.fundVal4) : ''}.</p></li></ul>
      <ul><li><p>Fund Value @ 8% is Rs. ${this.successJson.fundVal8 != undefined ? new Intl.NumberFormat('en-IN').format(this.successJson.fundVal8) : ''}.</p></li></ul>`;
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;

        case "1K":
            var htmlTemplate = `<ul><li><p>Sum Assured is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.sumAssured != undefined ? this.successJson.sumAssured : '')}</p></li></ul>
      <ul><li><p>Fund Value @ 4% is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.fundVal4 != undefined ? this.successJson.fundVal4 : '')}</p></li></ul>
      <ul><li><p>Fund Value @ 8% is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.fundVal8 != undefined ? this.successJson.fundVal8 : '')}</p></li></ul>`;
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;


        case "22":
            var htmlTemplate = `<ul><li><p>Mode of Annuity Payout is ${this.successJson.modeOfAnnuityPayout}.</p></li></ul>
        <ul><li><p>Annuity Amount Payable is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.annuityAmtPayable)}.</p></li></ul>
        <ul><li><p>Purchase Price is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.purchasePrice)}.</p></li></ul>`;
            if (this.successJson.isRiderSelected) {
                htmlTemplate += `<ul><li><p>Rider Sum Assured is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.riderSumAssured)}.</p></li></ul>
          <ul><li><p>Rider Premium is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.riderPrem)}.</p></li></ul>`
            }

            htmlTemplate += `<ul><li><p>Total Applicable Taxes is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totServiceTax)}.</p></li></ul>`
            if (this.successJson.isAdvanceAnnuityChecked) {
                htmlTemplate += `Advance Premium Payable is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.advancePremiumPayable)}`
            }
            htmlTemplate += `<ul><li><p>Total Premium is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totalPrem)}.</p></li></ul>`
            if (this.successJson.isSourceOfBusinessVestingAndOpen) {
                htmlTemplate += ` <ul><li><p>Total Premium Required is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.totalPremReq)}.</p></li></ul>
          <ul><li><p>Additional Premium Payable is Rs.${new Intl.NumberFormat('en-IN').format(this.successJson.addPremPayable)}.</p></li></ul>`
            }
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;

            break;

        case "2J":
            var htmlTemplate = `<ul><li><p>Sum Assured is Rs. ${new Intl.NumberFormat('en-IN').format((this.successJson.sumAssured !== undefined && this.successJson.sumAssured !== null) ? this.successJson.sumAssured : 0)}</p></li></ul>
                            <ul><li><p>Fund Value @ 4% is Rs. ${new Intl.NumberFormat('en-IN').format((this.successJson.fundVal4 && this.successJson.fundVal4 !== null && this.successJson.fundVal4 !== "null") ? this.successJson.fundVal4 : 0)}</p></li></ul>
                            <ul><li><p>Fund Value @ 8% is Rs. ${new Intl.NumberFormat('en-IN').format((this.successJson.fundVal8 && this.successJson.fundVal8 !== null && this.successJson.fundVal8 !== "null") ? this.successJson.fundVal8 : 0)}</p></li></ul>
                          </ng-container>`
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;

        case "1J":
            var htmlTemplate = `<p>Sum Assured is Rs. ${new Intl.NumberFormat('en-IN').format((this.successJson.sumAssured !== undefined && this.successJson.sumAssured !== null) ? this.successJson.sumAssured : 0)}</p>
                <p>Benifit Payable At Death is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.benefitPaybleAtDeath !== undefined && this.successJson.benefitPaybleAtDeath !== null) ? this.successJson.benefitPaybleAtDeath : 0}</p>
                <p>Benifit Payable At Maturity is Rs. ${new Intl.NumberFormat('en-IN').format(this.successJson.benefitPaybleAtMaturity !== undefined && this.successJson.benefitPaybleAtMaturity !== null) ? this.successJson.benefitPaybleAtMaturity : 0}</p>`;
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;

        case "2K":
            var htmlTemplate = `<p>First Year ${this.successJson.Frequency == "Monthly" ? "Monthly" : "Yearly"} Premium is Rs. ${new Intl.NumberFormat('en-IN').format((this.successJson.basicPrem !== undefined && this.successJson.basicPrem !== null) ? this.successJson.basicPrem : 0)}</p>
            <p>First Year Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format((this.successJson.firtYrServTax !== undefined && this.successJson.firtYrServTax !== null) ? this.successJson.firtYrServTax : 0)}</p>
            <p>First Year ${this.successJson.Frequency == "Monthly" ? "Monthly" : "Yearly"} Premium with Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format((this.successJson.firtYrPremWithTax !== undefined && this.successJson.firtYrPremWithTax !== null) ? this.successJson.firtYrPremWithTax : 0)}</p>
            <p>Second Year Onwards Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format((this.successJson.secYrServTax !== undefined && this.successJson.secYrServTax !== null) ? this.successJson.secYrServTax : 0)}</p>
            <p>Second Year Onwards ${this.successJson.Frequency == "Monthly" ? "Monthly" : "Yearly"} Premium with Applicable Taxes is Rs. ${new Intl.NumberFormat('en-IN').format((this.successJson.secYrPremWithTax !== undefined && this.successJson.secYrPremWithTax !== null) ? this.successJson.secYrPremWithTax : 0)}</p>
            <p><b>Sum Assured</b> is Rs. ${new Intl.NumberFormat('en-IN').format((this.successJson.sumAssured !== undefined || this.successJson.sumAssured !== null) ? this.successJson.sumAssured : 0)}</p>
            <p><b>Maturity Benefit</b> is Rs. ${new Intl.NumberFormat('en-IN').format((this.successJson.guratnedMatBen !== undefined || this.successJson.guratnedMatBen !== null) ? this.successJson.guratnedMatBen : 0)}</p>`;
            document.getElementById('premiumResponseDataId').innerHTML = htmlTemplate;
            break;

        default:
            break;
    }
}

function onViewPlanDetailsTap(productCode) {
    window.location.href = "../ViewPlanDetails/ViewPlanDetails.html";
}

function navigateToHome() {
    window.location.href = "../PremiumCalculator.html";
}