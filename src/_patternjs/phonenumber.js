function formatPhoneNumber(input) {
  const numericInput = input.replace(/\D/g, '');
  const maxLength = Math.min(9, Math.max(8, numericInput.length));
  if (numericInput.length <= 3) {
    document.getElementById('phone').value = numericInput;
  } else {
    document.getElementById('phone').value = numericInput.slice(0, 3) + '-' + numericInput.slice(3, maxLength);
  }
}
document.getElementById('phone').addEventListener('input', function() {
  formatPhoneNumber(this.value);
});
