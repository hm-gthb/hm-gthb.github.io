---
---

// Create Base64 Object
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

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
      if(getCookie("btc_unit") == "btc"){
        $("#btc_unit_setting_btc").attr("checked", true);
        $(".btc_unit").html(" BTC");
      }else if(getCookie("btc_unit") == "mbtc"){
        $("#btc_unit_setting_mbtc").attr("checked", true);
        $(".btc_unit").html(" mBTC");
      }
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

function calculateBtc(){
  var opt = getCookie("btc_unit");
  $('*').filter(function() {
    if($(this).data('btc') !== undefined){
      if(opt == "btc"){
        $(this).html($(this).data("btc"));
      }else if(opt == "mbtc"){
        $(this).html( Math.round(( parseFloat($(this).data("btc")) *1000)*100000000)/100000000 );
      }
    }
  });
}

$(document).on("click", ".copy", function (e) {
  /* Get the text field */
  var that = this;
  if($(that).data("href") == "payment_link"){
    var dummy = document.createElement('input'),
    text = window.location.href + "#";

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  }else{
    var copyText = document.getElementById($(that).data("href"));

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
    
  }

  /* Alert the copied text */
  var prev_html = $(that).html();
  $(that).html("Copied!");
  setTimeout(function(){ $(that).html(prev_html); $(".waves-ripple").remove();},2500);
});

$(document).on("submit", "#login_form", function (e) {
    e.preventDefault();
    var form = this;
    
    $(form).find("button").attr("disabled",true);
    var prev_classes = $(form).find("button i").attr("class");
    $(form).find("button i").attr("class", "fa fa-spinner fa-spin");
    
    setTimeout(function(){
      $("#login_return").removeClass("text-danger").addClass("text-success").html("Successfully logged in. Redirecting...");
      // set cookie here
      setCookie("id", 886, 30);
      setCookie("username", $(form).find("#usernameoremail").val(), 30);
      setCookie("email", "hidden", 30);
      setCookie("token", "hidden", 30);
      setCookie("register_date", "", 30);
      setCookie("btc_address", "hidden", 30);
      setCookie("btc_unit", "btc", 30);
      setCookie("deposit_address", "1pz7exyW34rxns9jH1H5efZHJcf16Wr2v", 30);
      setTimeout(function(){window.location="/dashboard.html"},1000);
      
      $(form).find("button i").attr("class", prev_classes);
      
    }, 1500);

});

$(document).on("submit", "#register_form", function (e) {
    e.preventDefault();
    if($("#register_password").val() == $("#register_password2").val()){
      $("#register_return").html("");
      var form = this;
    
      $(form).find("button").attr("disabled",true);
      var prev_classes = $(form).find("button i").attr("class");
      $(form).find("button i").attr("class", "fa fa-spinner fa-spin");
        
      setTimeout(function(){
        $("#register_return").removeClass("text-danger").addClass("text-success").html("Registered and logged in. Redirecting...");
        // set cookie here
        setCookie("id", 886, 30);
        setCookie("username", $(form).find("#register_username").val(), 30);
        setCookie("email", $(form).find("#register_email").val(), 30);
        setCookie("token", "hidden", 30);
        setCookie("register_date", "", 30);
        setCookie("btc_address", "", 30);
        setCookie("btc_unit", "btc", 30);
        setCookie("deposit_address", "1pz7exyW34rxns9jH1H5efZHJcf16Wr2v", 30);
        setTimeout(function(){window.location="/dashboard.html"},1000);
      
      
        $(form).find("button i").attr("class", prev_classes);
        
      }, 1500);
      
    }else{
      $("#register_return").removeClass("text-success").addClass("text-danger").html("Passwords don't match.");
    }
});

$(document).on("submit", "#forgot_form", function (e) {
    e.preventDefault();
    var form = this;
    
    $(form).find("button").attr("disabled",true);
    var prev_classes = $(form).find("button i").attr("class");
    $(form).find("button i").attr("class", "fa fa-spinner fa-spin");
      
    var data =  $('#forgot_form').serialize();
    var url = $("#forgot_form").attr("action");
    $("#password_return").addClass("text-danger").html("Error");

});

$(document).on("submit", "#account_form", function (e) {
    e.preventDefault();
    if($("#up_account_pass1").val() == $("#up_account_pass2").val()){
      $("#account_return").html("");
      var form = this;
      
      $(form).find("button").attr("disabled",true);
      var prev_classes = $(form).find("button i").attr("class");
      $(form).find("button i").attr("class", "fa fa-spinner fa-spin");
      
      setTimeout(function(){
          $("#account_return").removeClass("text-danger").addClass("text-success").html("Success!");
          // set cookie here
          setCookie("token", "hidden", 30);
          setCookie("btc_address", $(form).find("#up_account_btc").val(), 30);
          setCookie("btc_unit", $(form).find("#btc_unit_setting_mbtc").val(), 30);
          checkCookie();
          calculateBtc();
          
          setTimeout(function(){
            $(form).find("button").attr("disabled",false);
            $("#account_return").html("");
          },3000);
        
          $(form).find("button i").attr("class", prev_classes);
        
      });
        
    }else{
      $("#account_return").removeClass("text-success").addClass("text-danger").html("Passwords don't match.");
    }
});

$(document).on("submit", "#withdraw_form", function (e) {
    e.preventDefault();    

    
    var requested = parseFloat($("#withdraw_amount").val()).toFixed(8);
    if(getCookie("btc_unit") == "mbtc"){
      requested = parseFloat(requested / 1000).toFixed(8);
    }
    var tot_avail = parseFloat($("#total_available").data("btc"));
    var total_investment = parseFloat($("#total_investment").data("btc"));
    var all_avail = parseFloat(total_investment + tot_avail).toFixed(8);
    
    if(requested <= all_avail){

      var form = this;
      
      $(form).find("button").attr("disabled",true);
      var prev_classes = $(form).find("button i").attr("class");
      $(form).find("button i").attr("class", "fa fa-spinner fa-spin");
      
      var data =  $('#withdraw_form').serialize();
      var url = $("#withdraw_form").attr("action");
      $.post(url, data, function(return_data){
        if(return_data.err){
          $("#withdraw_return").addClass("text-danger").html(return_data.msg);
          if(return_data.msg == "Authentication Failed. Logging out..."){
            //destroy all cookies
            destroyAllCookies();
            setTimeout(function(){window.location="/"},2500);
          }else{
            $(form).find("button").attr("disabled",false);
          }
        }else{
          var b64e = Base64.encode(return_data.msg);
          $("#withdraw_return").removeClass("text-danger").addClass("text-success").html("Success!<br><a href = '/payment.html?"+b64e+"#' target = '_blank'>Payment Tracking Page</a> ");
        }
        
        //console.log(return_data);
        
        $(form).find("button i").attr("class", prev_classes);
          
      },"json");

    }else{
      $("#withdraw_return").addClass("text-danger").html("Insufficient funds.");
      console.log(requested);
      console.log(all_avail);
    }

    
});

if(window.location.pathname == "/dashboard.html"){
  $( document ).ready(function(){

    setTimeout(function(){

      if(getCookie("username") == "RobGuitar"){ //772
        data = {"err":false,"tx_data":[{"id":"2954","uid":"772","type":"deposit","timestamp":"1589547852","amount":"0.00010000","txid":"d6ae67f9f6d47998ab8c393a9124523ec1a417cbf17a1b0c15c162e266e0beb8","to_address":"","active":"1","used_by":"0"}],"earn_data":[{"id":"40","label":"investment","type":"initial","from_uid":"0","timestamp":"1590584652","amount":"0.00000100","used_by":"0"},{"id":"36","label":"investment","type":"initial","from_uid":"0","timestamp":"1590498252","amount":"0.00000100","used_by":"0"},{"id":"33","label":"investment","type":"initial","from_uid":"0","timestamp":"1590411852","amount":"0.00000100","used_by":"0"},{"id":"30","label":"investment","type":"initial","from_uid":"0","timestamp":"1590325452","amount":"0.00000100","used_by":"0"},{"id":"27","label":"investment","type":"initial","from_uid":"0","timestamp":"1590239052","amount":"0.00000100","used_by":"0"},{"id":"24","label":"investment","type":"initial","from_uid":"0","timestamp":"1590152652","amount":"0.00000100","used_by":"0"},{"id":"23","label":"investment","type":"initial","from_uid":"0","timestamp":"1590066252","amount":"0.00000100","used_by":"0"},{"id":"20","label":"investment","type":"initial","from_uid":"0","timestamp":"1589979852","amount":"0.00000100","used_by":"0"},{"id":"17","label":"investment","type":"initial","from_uid":"0","timestamp":"1589893452","amount":"0.00000100","used_by":"0"},{"id":"14","label":"investment","type":"initial","from_uid":"0","timestamp":"1589807052","amount":"0.00000100","used_by":"0"},{"id":"9","label":"investment","type":"initial","from_uid":"0","timestamp":"1589720652","amount":"0.00000100","used_by":"0"},{"id":"6","label":"investment","type":"initial","from_uid":"0","timestamp":"1589634252","amount":"0.00000100","used_by":"0"}],"referral_data":[],"total_deposit":"0.00010000","total_earning":"0.00001200","dep_earning":"0.00001200","ref_earning":"0.00000000","exchange":"9166.34","fee":0.00025};
      }else if(getCookie("username") == "kmack1230"){ //774
        data = {"err":false,"tx_data":[{"id":"2433","uid":"774","type":"deposit","timestamp":"1589532311","amount":"0.00016717","txid":"c763738bec9f1c62edfcf5fb7668b9187d32053c67e8a5f013eaddc26c640b57","to_address":"","active":"1","used_by":"0"}],"earn_data":[{"id":"39","label":"investment","type":"initial","from_uid":"0","timestamp":"1590569111","amount":"0.00000167","used_by":"0"},{"id":"35","label":"investment","type":"initial","from_uid":"0","timestamp":"1590482711","amount":"0.00000167","used_by":"0"},{"id":"32","label":"investment","type":"initial","from_uid":"0","timestamp":"1590396311","amount":"0.00000167","used_by":"0"},{"id":"29","label":"investment","type":"initial","from_uid":"0","timestamp":"1590309911","amount":"0.00000167","used_by":"0"},{"id":"26","label":"investment","type":"initial","from_uid":"0","timestamp":"1590223511","amount":"0.00000167","used_by":"0"},{"id":"22","label":"investment","type":"initial","from_uid":"0","timestamp":"1590137111","amount":"0.00000167","used_by":"0"},{"id":"19","label":"investment","type":"initial","from_uid":"0","timestamp":"1590050711","amount":"0.00000167","used_by":"0"},{"id":"16","label":"investment","type":"initial","from_uid":"0","timestamp":"1589964311","amount":"0.00000167","used_by":"0"},{"id":"13","label":"investment","type":"initial","from_uid":"0","timestamp":"1589877911","amount":"0.00000167","used_by":"0"},{"id":"11","label":"investment","type":"initial","from_uid":"0","timestamp":"1589791511","amount":"0.00000167","used_by":"0"},{"id":"8","label":"investment","type":"initial","from_uid":"0","timestamp":"1589705111","amount":"0.00000167","used_by":"0"},{"id":"5","label":"investment","type":"initial","from_uid":"0","timestamp":"1589618711","amount":"0.00000167","used_by":"0"}],"referral_data":[],"total_deposit":"0.00016717","total_earning":"0.00002004","dep_earning":"0.00002004","ref_earning":"0.00000000","exchange":"9166.34","fee":0.00025};
      }else{
        data = {"err":false,"tx_data":[],"earn_data":[],"referral_data":[],"total_deposit":"0.00000000","total_earning":"0.00000000","dep_earning":"0.00000000","ref_earning":"0.00000000","exchange":"9564.78","fee":0.00025}
      }
      
  
  
  
        $("#ref_count").html(data.referral_data.length);
        
        if(data.referral_data.length > 0){
          $("#referral_table").html("");
          $.each(data.referral_data, function(k, ref){
            $("#referral_table").append("<tr><td>"+ref.username+"</td><td>"+ref.register_date.substring(0,10)+"</td><td><span class = 'btc_amount' data-btc = '"+parseFloat(ref.amount).toFixed(8)+"'></span> <span class = 'btc_unit'> BTC</span></td></tr>");
          });
        }else{
          $("#referral_table").html('<tr><td colspan="3" style="text-align: center;">You don\'t have any referrals. Read below.</td></tr>');
        }
          



        if(data.earn_data.length > 0){
          $("#earn_table").html("");
          $.each(data.earn_data, function(k, earn){
            var type,label,earn_active = '';
            if(earn.label == "investment"){
              type = "green";
              label = "Investment"
            }else if(earn.label == "referral"){
              type = "blue";
              label = "Referral"
            }else if(earn.label == "leftover"){
              type = "orange";
              label = "Leftover";
            }
            if(earn.used_by != "0"){
              earn_active = " style = 'color:lightgray'";
            }else{
              earn_active = "";
            }
              
            var date = new Date(earn.timestamp * 1000);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            $("#earn_table").append("<tr"+earn_active+"><td>"+date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()+"<br>"+hours + ':' + minutes.substr(-2)+"</td><td><span class='tag "+type+" income-tag'>"+label+"</td><td><span class = 'btc_amount' data-btc = '"+parseFloat(earn.amount).toFixed(8)+"'></span><br><span class = 'btc_unit'> BTC</span></td></tr>");
            
          });
        }else{
          $("#earn_table").html('<tr><td colspan="3" style="text-align: center;">You haven\'t earned anything, yet.</td></tr>');
        }
        
        $("#earned").data("btc", data.dep_earning);
        $("#earned_usd").html((data.dep_earning * data.exchange).toFixed(2) + "$"); //$
        $("#ref_income").data("btc", data.ref_earning);
        $("#ref_income_usd").html((data.ref_earning * data.exchange).toFixed(2) + "$"); //$
        $("#total_earned").data("btc", data.total_earning);
        $(".withdraw_fee").data("btc", data.fee);
        var tot_avail = parseFloat(data.total_earning-data.fee).toFixed(8);
        $("#total_available").data("btc", tot_avail);
        if(tot_avail < 0){
          $("#anymore").hide();
          $("#anyamount").show();
        }else{
          $("#anymore").show();
          $("#anyamount").hide();
        }
          
        
          
          
          
          
        if(data.tx_data.length > 0){
          $("#tx_table").html("");
          $.each(data.tx_data, function(k, tx){
            var type,ico,label,tx_active = '';
            var payment_link;
            if(tx.type == "deposit"){
              type = "green";
              ico = "up";
              label = "Deposit";
              payment_link = "-";
            }else if(tx.type == "withdraw"){
              type = "red";
              ico = "down";
              label = "Withdraw";
              tx_b64 = Base64.encode(tx.uid +"|"+ tx.timestamp +"|"+ tx.txid +"|"+ tx.to_address +"|"+ tx.amount);
              payment_link = "<a target = '_blank' href = 'payment.html?"+tx_b64+"' title = 'Payment Proof' class = 'external-link'><i class = 'fa fa-external-link'></i></a>";
            }else if(tx.type == "leftover"){
              type = "orange";
              ico = "left";
              label = "Leftover";
              payment_link = "-";
            }
            if(tx.used_by != "0"){
              tx_active = " style = 'color:lightgray'";
            }else{
              tx_active = "";
            }
              
            var date = new Date(tx.timestamp * 1000);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            $("#tx_table").append("<tr"+tx_active+"><td>"+date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()+"<br>"+hours + ':' + minutes.substr(-2)+"</td><td><span class='tag "+type+" tx-tag'><span class = 'hidden-xs'>"+label+" </span><i class='fa fa-arrow-circle-"+ico+"'></i></span></td><td><span class = 'btc_amount' data-btc = '"+parseFloat(tx.amount).toFixed(8)+"'></span><br><span class = 'btc_unit'> BTC</span></td><td>"+payment_link+"</td></tr>");
            
          });
        }else{
          $("#tx_table").html('<tr><td colspan="3" style="text-align: center;">You don\'t have any deposits.</td></tr>');
        }
        $("#total_investment").data("btc", data.total_deposit);
        $("#total_investment_usd").html((data.total_deposit * data.exchange).toFixed(2) + "$"); //$
          
        checkCookie();
        calculateBtc();
  
    },1500);
    
  });
}


  
if(window.location.pathname == "/payment.html"){
  $( document ).ready(function(){
    var str = Base64.decode((window.location.search).substr(1));
    var vals = str.split("|");
    setCookie("referrer_uid", vals[0], 30);

    var date = new Date(vals[1] * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();

    var dateStr = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()+" "+hours + ':' + minutes.substr(-2);

    $("#payment_time_id").html(vals[1].substr(5));
    $(".payment_block_link").attr("href", "https://www.blockchain.com/btc/tx/" + vals[2]);
    $("#payment_date").html(dateStr);
    $("#payment_tx_hash").html(vals[2]);
    $("#payment_address").html(vals[3]);
    $("#payment_amount").html(vals[4] + " BTC"); 

    var logged_in = getCookie("token");
    if(logged_in){
      $("#payment_page_register_btn").hide();
      $("#payment_page_ref_notice").show();
    }else{
      $("#payment_page_register_btn").show();
      $("#payment_page_ref_notice").hide();
    }
      
  });
}
    
$(document).on("change paste keyup", "#withdraw_amount", function() {
  $("#requested_amount_in_textbox").html($(this).val());
  $("#total_withdraw_amount").html((parseFloat($(this).val()) + parseFloat($(".withdraw_fee").html())).toFixed(8)*100000000/100000000);
});

// $(document).on("click", ".btc_amount", function (e) {alert($(this).data("btc"));});
