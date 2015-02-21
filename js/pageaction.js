$(document).ready(function () {
  if(localStorage.my_cert) {
    console.log(localStorage.my_cert);
    $('.certToggle').toggle(); 
  }
  $('#deleteCert').click(function() {
    localStorage.removeItem('my_cert');
    $('.certToggle').toggle();

  });
  $('#submit').click(function() {
    var file = document.getElementById("upload").files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            console.log(evt.target.result);
            localStorage.my_cert = evt.target.result;
            $('.certToggle').toggle();
        }
    }
  });
});