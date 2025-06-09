function addition() {
  let num1 = parseFloat(document.getElementById("searchBox1").value);
  let num2 = parseFloat(document.getElementById("searchBox2").value);
  let sum = num1 + num2;
  document.getElementById("Result").textContent = "Result: " + sum;
}
