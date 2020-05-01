$.ajaxSetup({
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    }
});


$("#login_form").submit(function(e){
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
        setTimeout(function(){window.location="/account.html"},5000);
      }
    },"json");
});

$("#register_form").submit(function(e){
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
        setTimeout(function(){window.location="/account.html"},5000);
      }
    },"json");
});

$("#forgot_form").submit(function(e){
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
