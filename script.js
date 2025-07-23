// 🎯 Select all <select> elements and the convert <button>
const dropDown = document.querySelectorAll("select");
const button = document.querySelector("form button");

// 🔁 Loop through each dropdown and populate currency options
for (select of dropDown) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.value = currCode;
    newOption.innerText = currCode;

    // 🌟 Set default selection: USD for "from" and INR for "to"
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }

    // ➕ Add the option to the select
    select.appendChild(newOption);
  }

  // 🎌 Update flag on currency change
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// 🚩 Function to update the flag image based on selected currency
const updateFlag = (element) => {
  let currCode = element.value;                      // e.g., "USD"
  let countryCode = countryList[currCode];           // e.g., "US"
  const flag = element.parentElement.querySelector(".flag");

  // 🖼️ Set flag image using FlagsAPI
  flag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// 💸 Convert Button: Fetch exchange rate and show conversion
button.addEventListener("click", async (evt) => {
  evt.preventDefault(); // 🚫 Prevent form reload

  let amount = document.querySelector("#amount").value;
  if (amount === "" || amount < 1) {
    amount = 0;
    document.querySelector("#amount").value=0;
  }

  let fromCurrency = document.querySelector("#currency-one").value;
  let toCurrency = document.querySelector("#currency-two").value;

  // 🌐 Fetch live rates using ExchangeRate-API
  let res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
  let data = await res.json();

  let rate = data.rates[toCurrency]; // 💱 Exchange rate
  let total = (amount * rate); // 🧮 Calculated result

  // 🖊️ Show conversion result on UI
  document.querySelector(".msg").innerText = `${amount} ${fromCurrency} = ${total} ${toCurrency}`;
});

// 🔎 Select the input box
const amountInput = document.querySelector("#amount");

// ⌨️ Trigger convert on Enter key
amountInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form reload
    button.click();         // Programmatically trigger convert
  }
});
