const checkHealthButton = document.getElementById("healthCheckButton");
const testP = document.getElementById("testP")

async function checkHealth() {
    try {
        const response = await fetch("http://localhost:8080/api/healthcheck");

        testP.innerText = response.ok;
    }
    catch(err)
    {
        testP.innerText = false;
    }

}

checkHealthButton.addEventListener("click", checkHealth, false);