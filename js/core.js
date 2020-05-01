$.ajaxSetup({
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
    cache: false
});

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var token = getCookie("token");
  if (token != "") {  // logged in
    $(".dashboard-btn").show();
    $(".logout-btn").show();
    $(".login-btn").hide();
    $(".register-btn").hide();
    $( document ).ready(function() {$("#big_register_button").hide();});
  }else{  // logged out
    $(".dashboard-btn").hide();
    $(".logout-btn").hide();
    $(".login-btn").show();
    $(".register-btn").show();
    if(window.location.pathname == "/dashboard.html"){
      window.location="/";
    }
  }
}

$(document).on("submit", "#login_form", function (e) {
    e.preventDefault();
    var form = this;
    var data =  $('#login_form').serialize();
    var url = $("#login_form").attr("action");
    $.post(url, data, function(return_data){
      if(return_data.err){
        $("#login_return").addClass("text-danger").html(return_data.msg);
      }else{
        $("#login_return").removeClass("text-danger").addClass("text-success").html(return_data.msg);
        // set cookie here
        setCookie("token", return_data.token, 30);
        setTimeout(function(){window.location="/dashboard.html"},5000);
      }
    },"json");
});

$(document).on("submit", "#register_form", function (e) {
    e.preventDefault();
    var form = this;
    var data =  $('#register_form').serialize();
    var url = $("#register_form").attr("action");
    $.post(url, data, function(return_data){
      if(return_data.err){
        $("#register_return").addClass("text-danger").html(return_data.msg);
      }else{
        $("#register_return").removeClass("text-danger").addClass("text-success").html(return_data.msg);
        // set cookie here
        setCookie("token", return_data.token, 30);
        setTimeout(function(){window.location="/dashboard.html"},5000);
      }
    },"json");
});

$(document).on("submit", "#forgot_form", function (e) {
    e.preventDefault();
    var form = this;
    var data =  $('#forgot_form').serialize();
    var url = $("#forgot_form").attr("action");
    $.post(url, data, function(return_data){
      if(return_data.err){
        $("#password_return").addClass("text-danger").html(return_data.msg);
      }else{
        $("#password_return").removeClass("text-danger").addClass("text-success").html(return_data.msg);
        setCookie('token','',0);
      }
    },"json");
});
