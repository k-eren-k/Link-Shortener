
function copyurl() {
  const kodInput = document.getElementById('kod');
  const dummyInput = document.createElement('input');
  dummyInput.value = window.location.href + kodInput.value;
  document.body.appendChild(dummyInput);
  dummyInput.select();
  document.execCommand('copy');
  document.body.removeChild(dummyInput);
}


function generateCode() {
  const metinInput = document.getElementById('metin');
  const kodGoster = document.getElementById('kodGoster');
  const kodInput = document.getElementById('kod');
  const kisalt = document.getElementById('kisalt');
  const url = metinInput.value;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let kod = '';
  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    kod += characters.charAt(randomIndex);
  }
  kisalt.style.display = 'none';
  kodInput.value = kod;
  kodGoster.style.display = 'block';
  kisalt.style.display = 'none';
}
window.onload = generateCode;