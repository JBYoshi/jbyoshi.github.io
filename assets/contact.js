addEventListener("load", function() {
    let contactForm = document.getElementById("contact-form");
    let contactStatus = document.getElementById("contact-status");
    let submitButton = document.getElementById("contact-submit");
    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        submitButton.disabled = true;
        try {
            let data = new URLSearchParams(new FormData(contactForm));

            let response = await fetch(contactForm.dataset.jbtoolsdomain + "/contact", {method: "POST", body: data});
            if (response.status == 200) {
                contactForm.innerText = await response.text();
            } else {
                contactStatus.innerText = await response.text();
            }
        } catch (e) {
            contactStatus.innerText = e.message || e;
            console.error(e);
        } finally {
            submitButton.disabled = false;
        }
    });
    contactStatus.innerText = "";
    submitButton.disabled = false;
});
