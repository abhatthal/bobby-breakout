

console.log('test');


var logininfo = document.getElementById('logininfo');

var goreg = document.getElementById('goregisterbtn');
var golog = document.getElementById('gologinbtn');





//console.log(logininfo.elements(1).value);


function login (logininfo){
  console.log('login?');
  if(logininfo.loginuname === "zxc" && logininfo.loginpsw === "zxc"){
    console.log('login DONE');
    //window.location.href='bb-test.html';
  }else{
    alert("You are not bobby")
  }
}




goreg.onclick = function(){
  window.location.href='register.html';
};


golog.onclick = function(){
  window.location.href='login.html';
};
