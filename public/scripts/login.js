

console.log('test');

var checklogin = document.getElementById('loginbtn');
var goreg = document.getElementById('goregisterbtn');


//console.log(logininfo.elements(1).value);


checklogin.onclick = function(){
  console.log('login?');
  //var logininfo = document.getElementById('logininfo');
  //var logname = document.forms["loginform"]["loginuname"].value;
  //var logpsw = document.forms["loginform"]["loginpsw"].value;
  var logname = document.getElementById('loginuname').value;
  var logpsw = document.getElementById('loginpsw').value;
  if(logname === "zxc" && logpsw === "zxc"){
    console.log('login DONE');
    window.location.href='bb-test.html';
  }else{
    alert("You are not bobby")
    window.location.href='login.html';
  }
}

goreg.onclick = function(){
  window.location.href='register.html';
};
