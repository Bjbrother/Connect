console.log("jquery");
$("document").ready(function () {
  $("#namecheck").hide();
  $("#biocheck").hide();

  var name_err = true;
  var bio_err = true;

  $("#editname").keyup(function () {
    name_check();
  });

  $("#editbio").keyup(function () {
    bio_check();
  });

  function name_check() {
    var user_val = $("#editname").val();
    // alert(user_val);
    if (user_val.length == "") {
      $("#namecheck").show();
      $("#namecheck").html("**Please enter Name");
      $("#namecheck").focus();
      $("#namecheck").css("color", "#3a4242");
      name_err = false;
      return false;
    } else {
      $("#namecheck").hide();
    }

    if (user_val.length < 3 || user_val.length > 10) {
      $("#namecheck").show();
      $("#namecheck").html("**name length must be in between 4 to 9");
      $("#namecheck").focus();
      $("#namecheck").css("color", "#3a4242");
      name_err = false;
      return false;
    } else {
      $("#namecheck").hide();
    }
  }

  function bio_check() {
    var bio_val = $("#editbio").val();

    if (bio_val.length < 5) {
      $("#biocheck").show();
      $("#biocheck").html("**bio should be more than 5 words");
      $("#biocheck").focus();
      $("#biocheck").css("color", "#3a4242");
      bio_err = false;
      return false;
    } else {
      $("#biocheck").hide();
    }
  }

  $("#btn").click(function () {
    name_err = true;
    bio_err = true;
    name_check();
    bio_check();

    if (name_err == true && bio_err == true) {
      return true;
    } else {
      return false;
    }
  });
});
