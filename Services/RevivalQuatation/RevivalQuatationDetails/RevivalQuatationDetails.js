window.onload = function () {
    this.ready();
};

var revivalQuatationDetails;
var newDate = new Date();
var quotationScheduleOutput = "";
var breakupDuesOutput = "";

function ready() {
    revivalQuatationDetails = window.localStorage.getItem("revivalQuatationDetails");
    revivalQuatationDetails = JSON.parse(revivalQuatationDetails);
    assignRevivalQuatationDetails();
    assignQuatationScheduleDetails();
    assignRevivalDuesDetails();
}

function assignRevivalQuatationDetails() {
    document.getElementById("polNo").innerHTML = revivalQuatationDetails.RevivalQuotation.pl_polno_s
    document.getElementById("polHolName").innerHTML = revivalQuatationDetails.RevivalQuotation.pd_first_name + " " + revivalQuatationDetails.RevivalQuotation.pd_last_name
    document.getElementById("doc").innerHTML = revivalQuatationDetails.RevivalQuotation.pl_commencement_date
    document.getElementById("sumAssured").innerHTML = revivalQuatationDetails.RevivalQuotation.pl_sumnp
    document.getElementById("plan").innerHTML = revivalQuatationDetails.RevivalQuotation.pl_product_s
    document.getElementById("polTerm").innerHTML = revivalQuatationDetails.RevivalQuotation.pl_term_n
    document.getElementById("dob").innerHTML = revivalQuatationDetails.RevivalQuotation.pd_dob
    document.getElementById("ageOnDate").innerHTML = revivalQuatationDetails.RevivalQuotation.pd_age
    document.getElementById("premiumNotPaidSince").innerHTML = revivalQuatationDetails.RevivalQuotation.pl_fup_dt
    document.getElementById("quotDate").innerHTML = dateDDFullMonthYYYY(newDate.toISOString().substr(0, 10));
    document.getElementById("frequency").innerHTML = revivalQuatationDetails.RevivalQuotation.pl_mode
    document.getElementById("physicalExtra").innerHTML = revivalQuatationDetails.RevivalQuotation.pl_physical_extra
    document.getElementById("installPremium").innerHTML = revivalQuatationDetails.RevivalQuotation.pl_inst_premium
    document.getElementById("emrExtra").innerHTML = revivalQuatationDetails.RevivalQuotation.pl_emr_extra;
    document.getElementById("critIllness").innerHTML = revivalQuatationDetails.RevivalQuotation.pl_ci_extra;
}

function assignQuatationScheduleDetails() {
    if (!Array.isArray(revivalQuatationDetails.QuotationSchedule)) {
        var temp = revivalQuatationDetails.QuotationSchedule;
        revivalQuatationDetails.QuotationSchedule = new Array();
        revivalQuatationDetails.QuotationSchedule.push(temp);
    }

    if (revivalQuatationDetails.QuotationSchedule.length > 0) {
        quotationScheduleOutput += "<table style='width: 100%'><tr class='requirement_header'><td style='padding: 10px'>If Paid By</td>"
        quotationScheduleOutput += "<td style='padding: 10px'>Latest Due</td><td style='padding: 10px'>No. Of Premiums</td>"
        quotationScheduleOutput += "<td style='padding: 10px'>Total Amount (A)</td><td style='padding: 10px'>Rate Of Interest(%)</td>"
        quotationScheduleOutput += "<td style='padding: 10px'>Late Fee(B)</td></tr>";

        for (var i = 0; i < revivalQuatationDetails.QuotationSchedule.length; i++) {
            quotationScheduleOutput += "<tr>";
            quotationScheduleOutput += "<td style='padding: 10px'>" + revivalQuatationDetails.QuotationSchedule[i].paid_by + "</td>";
            quotationScheduleOutput += "<td style='padding: 10px'>" + revivalQuatationDetails.QuotationSchedule[i].latest_due + "</td>";
            quotationScheduleOutput += "<td style='padding: 10px'>" + revivalQuatationDetails.QuotationSchedule[i].no_premiums + "</td>";
            quotationScheduleOutput += "<td style='padding: 10px'>" + revivalQuatationDetails.QuotationSchedule[i].total_amount + "</td>";
            quotationScheduleOutput += "<td style='padding: 10px'>" + revivalQuatationDetails.QuotationSchedule[i].rate_of_interest + "</td>";
            quotationScheduleOutput += "<td style='padding: 10px'>" + revivalQuatationDetails.QuotationSchedule[i].late_fee + "</td>";
            quotationScheduleOutput += "</tr>"
        }
        quotationScheduleOutput += "</table>";
        document.getElementById("quotationScheduleData").innerHTML = quotationScheduleOutput;

    } else {
        document.getElementById("quotationScheduleData").innerHTML = "No data";
    }
}

function assignRevivalDuesDetails() {
    if (!Array.isArray(revivalQuatationDetails.RevivalDues)) {
        var temp = revivalQuatationDetails.RevivalDues;
        revivalQuatationDetails.RevivalDues = new Array();
        revivalQuatationDetails.RevivalDues.push(temp);
    }

    if (revivalQuatationDetails.RevivalDues.length > 0) {

        breakupDuesOutput += "<table style='width: 100%'><tr class='requirement_header'><td style='padding: 10px'>Breakup Charges*</td>"
        breakupDuesOutput += "<td style='padding: 10px'>Back Dated Interest</td><td style='padding: 10px'>Earlier Shortfall</td>"
        breakupDuesOutput += "<td style='padding: 10px'>Duplicate Policy</td>"
        for (var i = 0; i < revivalQuatationDetails.RevivalDues.length; i++) {
            breakupDuesOutput += "<tr>";
            breakupDuesOutput += "<td style='padding: 10px'>" + revivalQuatationDetails.RevivalDues[i].bank_charges + "</td>";
            breakupDuesOutput += "<td style='padding: 10px'>" + revivalQuatationDetails.RevivalDues[i].backdated_interest + "</td>";
            breakupDuesOutput += "<td style='padding: 10px'>" + revivalQuatationDetails.RevivalDues[i].earlier_shortfall + "</td>";
            breakupDuesOutput += "<td style='padding: 10px'>" + revivalQuatationDetails.RevivalDues[i].duplicate_policy + "</td>";
            breakupDuesOutput += "</tr>"
        }
        breakupDuesOutput += "</table>";
        document.getElementById("breakupDuesData").innerHTML = breakupDuesOutput;
    } else {
        document.getElementById("breakupDuesData").innerHTML = "No data";
    }
}