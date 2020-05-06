---
---
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


$( document ).ready(function() {
  var refuser = window.location.search;
  if(refuser != ""){
    refuser = refuser.charAt(1) + refuser.charAt(2) + refuser.charAt(3) + refuser.charAt(4);
    setCookie("referrer_uid", refuser, 30);
  }
  $("#referrer_uid").val(getCookie("referrer_uid"));
});
    
    
function checkCookie() {
  var token = getCookie("token");
  if (token != "") {  // logged in
    $(".dashboard-btn").show();
    $(".logout-btn").show();
    $(".account-btn").show();
    $(".login-btn").hide();
    $(".register-btn").hide();
    $( document ).ready(function() {
      $("#big_register_button").hide();
      $("#user_welcome").html(getCookie("username"));
      $("#acc_username").html(getCookie("username"));
      $("#acc_email").html(getCookie("email"));
      $("#up_account_btc").val(getCookie("btc_address"));
      $(".uid").val(getCookie("id"));
      $(".token").val(getCookie("token"));
      $("#deposit_address").val(getCookie("deposit_address"));
      $("#refLink").val("https://hyipmilker.com/?"+getCookie("id"));
    });
  }else{  // logged out
    $(".dashboard-btn").hide();
    $(".logout-btn").hide();
    $(".account-btn").hide();
    $(".login-btn").show();
    $(".register-btn").show();
    if(window.location.pathname == "/dashboard.html"){
      window.location="/";
    }
  }
}

function destroyAllCookies(){
  document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
}


function copyClip(el) {
  /* Get the text field */
  var copyText = document.getElementById(el);

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
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
        setCookie("id", return_data.id, 30);
        setCookie("username", return_data.username, 30);
        setCookie("email", return_data.email, 30);
        setCookie("token", return_data.token, 30);
        setCookie("register_date", return_data.register_date, 30);
        setCookie("btc_address", return_data.btc_address, 30);
        setCookie("deposit_address", return_data.deposit_address, 30);
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
        setCookie("id", return_data.id, 30);
        setCookie("username", return_data.username, 30);
        setCookie("email", return_data.email, 30);
        setCookie("token", return_data.token, 30);
        setCookie("register_date", return_data.register_date, 30);
        setCookie("btc_address", return_data.btc_address, 30);
        setCookie("deposit_address", return_data.deposit_address, 30);
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
        //destroy all cookies
        destroyAllCookies();
      }
    },"json");
});

$(document).on("submit", "#account_form", function (e) {
    e.preventDefault();
    var form = this;
    var data =  $('#account_form').serialize();
    var url = $("#account_form").attr("action");
    $.post(url, data, function(return_data){
      if(return_data.err){
        $("#account_return").addClass("text-danger").html(return_data.msg);
        if(return_data.msg == "Authentication Failed. Logging out..."){
          //destroy all cookies
          destroyAllCookies();
          setTimeout(function(){window.location="/"},5000);
        }
      }else{
        $("#account_return").removeClass("text-danger").addClass("text-success").html(return_data.msg);
        // set cookie here
        setCookie("token", return_data.token, 30);
        setCookie("btc_address", return_data.btc_address, 30);
        checkCookie();
      }
    },"json");
});

$(document).on("submit", "#withdraw_form", function (e) {
    e.preventDefault();
    alert("not implemented yet");
    throw new Error();
    
    var form = this;
    var data =  $('#withdraw_form').serialize();
    var url = $("#withdraw_form").attr("action");
    $.post(url, data, function(return_data){
      if(return_data.err){
        $("#account_return").addClass("text-danger").html(return_data.msg);
        if(return_data.msg == "Authentication Failed. Logging out..."){
          //destroy all cookies
          destroyAllCookies();
          setTimeout(function(){window.location="/"},5000);
        }
      }else{
        $("#account_return").removeClass("text-danger").addClass("text-success").html(return_data.msg);
        // set cookie here
        setCookie("token", return_data.token, 30);
        setCookie("btc_address", return_data.btc_address, 30);
        checkCookie();
      }
    },"json");
});

  
if(window.location.pathname == "/dashboard.html"){
  $( document ).ready(function(){
    $.post("{{site.ngrok}}/dashboard.php", {"uid":getCookie("id"), "token": getCookie("token")}, function(data){
      if(data.err){
        if(data.msg == "Authentication Failed. Logging out..."){
          //destroy all cookies
          destroyAllCookies();
          alert(data.msg);
          window.location="/";
        }else{
          alert("Error loading the data. Please try again in a few moments.");
        }
      }else{
        if(data.referral_data.length > 0){
          $("#referral_table").html("");
          $.each(data.referral_data, function(k, ref){
            $("#referral_table").append("<tr><td>"+ref.username+"</td><td>"+ref.register_date.substring(0,10)+"</td><td>"+ref.amount+" BTC</td></tr>");
          });
        }else{
          $("#referral_table").html('<tr><td colspan="3" style="text-align: center;">You don\'t have any referrals. Read below.</td></tr>');
        }
          
        //data.tx_data
        //data.earn_data
        //data.referral_data
      }
    },"json");
  });
}