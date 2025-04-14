document.addEventListener('DOMContentLoaded', function () {
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const swapBtn = document.getElementById("swapBtn");

    // ✅ Fetch and populate currency dropdowns
    fetch('https://open.er-api.com/v6/latest/USD')
        .then(response => response.json())
        .then(data => {
            const currencyCodes = Object.keys(data.rates);
            currencyCodes.forEach(code => {
                const optionFrom = document.createElement("option");
                const optionTo = document.createElement("option");

                optionFrom.value = optionTo.value = code;
                optionFrom.textContent = optionTo.textContent = code;

                fromCurrency.appendChild(optionFrom);
                toCurrency.appendChild(optionTo);
            });

            // Set default selections
            fromCurrency.value = "USD";
            toCurrency.value = "INR";
        })
        .catch(error => console.error('Error fetching currency list:', error));

    // ✅ Swap Button Logic
    if (swapBtn) {
        swapBtn.addEventListener("click", function () {
            const temp = fromCurrency.value;
            fromCurrency.value = toCurrency.value;
            toCurrency.value = temp;

            // Auto convert on swap
            convertCurrency();
        });
    }
});

// ✅ Currency Conversion Logic
function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const from = document.getElementById("fromCurrency").value;
    const to = document.getElementById("toCurrency").value;
    const result = document.getElementById("result");

    if (!amount || isNaN(amount)) {
        result.textContent = "Please enter a valid amount.";
        return;
    }

    fetch(`https://open.er-api.com/v6/latest/${from}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[to];
            const converted = (amount * rate).toFixed(2);
            result.textContent = `${amount} ${from} = ${converted} ${to}`;
        })
        .catch(error => {
            console.error("Error during conversion:", error);
            result.textContent = "Conversion failed. Please try again.";
        });
}
