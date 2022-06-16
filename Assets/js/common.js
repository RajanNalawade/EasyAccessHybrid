
/*********Sticky Navbar**********/

window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    $(".content").css("padding-top","65px");
  } else {
    navbar.classList.remove("sticky");
  }
}

/*********end Sticky Navbar**********/