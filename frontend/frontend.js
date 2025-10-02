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

    if (data.error) {
      resultBox.value = data.error;
    } else {
      resultBox.value = `${data.input} → ${data.result}`;
    }
  } catch (err) {
    resultBox.value = "Error connecting to backend.";
    console.error(err);
  }
});

resetBtn.addEventListener("click", () => {
  valueInput.value = "";
  resultBox.value = "";
});
