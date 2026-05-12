const checkHealthButton = document.getElementById("healthCheckButton");
const testP = document.getElementById("testP")

function checkHealth() {
    testP.innerText = "OK"
}

checkHealthButton.addEventListener("click", checkHealth, false);