function expandCollapseNewsDetails(newsSubCardId) {
    if (document.getElementById(newsSubCardId).style.display == "block") {
        document.getElementById(newsSubCardId).style.display = "none";
    } else {
        document.getElementById(newsSubCardId).style.display = "block";
    }
}