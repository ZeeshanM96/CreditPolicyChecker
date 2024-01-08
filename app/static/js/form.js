// form.js
// Function to handle form submission

function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission

    // Fetch the customer income from the form
    var customerIncome = document.getElementById('customer_income').value;
    var customerDebt = document.getElementById('customer_debt').value;
    var paymentRemarks12m = document.getElementById('payment_remarks_12m').value;
    var paymentRemarks = document.getElementById('payment_remarks').value;
    var customerAge = document.getElementById('customer_age').value;

    // Send the POST request to the Flask server
    fetch('/evaluate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            customer_income: customerIncome,
            customer_debt: customerDebt,
            payment_remarks_12m: paymentRemarks12m,
            payment_remarks: paymentRemarks,
            customer_age: customerAge
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Create and display a Bootstrap alert based on the response
        var alertPlaceholder = document.getElementById('alert-placeholder');
        if (data.result === "ACCEPT") {
            alertPlaceholder.innerHTML = createAlert('success', 'SUCCESS: Accepted!');
            document.forms[0].reset();
        } else if (data.reasons && data.reasons.length > 0) {
            alertPlaceholder.innerHTML = createAlert('danger', 'CREDIT POLICY HAS BEEN REJECTED: Reason(s) are as follow:', data.reasons);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function createAlert(type, message, reasons) {
    var reasonsList = "";
    if (reasons && reasons.length > 0) {
        reasonsList = "<ul>";
        reasons.forEach(function(reason) {
            reasonsList += "<li>" + reason + "</li>";
        });
        reasonsList += "</ul>";
    }

    return `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                ${reasonsList}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
}
