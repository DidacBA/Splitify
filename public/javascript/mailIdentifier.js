function identifier() {
  const submit = document.getElementById('create-account');
  const identifier = document.getElementById('identifier');
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  let token = '';
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length )];
  }

  submit.addEventListener('click', () => {
    identifier.setAttribute('value', token);
  });
}

window.addEventListener('load', identifier);
