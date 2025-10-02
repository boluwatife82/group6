const valueInput = document.getElementById("valueToConvert");
const conversionSelect = document.getElementById("conversion");
const resultBox = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");
const resetBtn = document.getElementById("resetBtn");

convertBtn.addEventListener("click", async () => {
  const value = valueInput.value;
  const type = conversionSelect.value;

  if (!value) {
    resultBox.value = "Please enter a value.";
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:3000/convert?value=${value}&type=${type}`
    );
    const data = await res.json();
    resultBox.value = data.result;
  } catch (err) {
    console.error(err);
    resultBox.value = "Error connecting to backend.";
  }
});

resetBtn.addEventListener("click", () => {
  valueInput.value = "";
  resultBox.value = "";
});
