

console.log('test');


var logininfo = document.getElementById('logininfo');



function login (logininfo){
  console.log('login?');
  if(logininfo.loginuname === "zxc" && logininfo.loginpsw === "zxc"){
    console.log('login DONE');
    //window.location.href='bb-test.html';
  }else{
    alert("You are not bobby")
  }
}
