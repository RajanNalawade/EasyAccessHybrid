window.onload = function() {
    this.ready();
};

var productDetails;

function ready() {

    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    this.initializeData();
}

function initializeData() {
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
    // divPlanDetails.innerHTML =  `<iframe src="../../../${this.productDetails.subInsurancePlanLocalWebPage}" style="border:none;"></iframe>`;
    if(this.productDetails.isFromNeedAnalysis){
        $('#divPlanDetails').load('../' + this.productDetails.subInsurancePlanLocalWebPage);
    }else{
        $('#divPlanDetails').load('../../' + this.productDetails.subInsurancePlanLocalWebPage);
    }
}

function downloadBrochure(){
    window.location.href = this.productDetails.brochureDownloadLink;
}
