var loginboxjs = document.getElementById('loginbox');

// when outside of the box been clicked, close it
window.onclick = function(event) {
    if (event.target == loginboxjs) {
        loginbox.style.display = "none";
    }
}
