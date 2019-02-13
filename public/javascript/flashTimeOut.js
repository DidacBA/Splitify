document.addEventListener('DOMContentLoaded', () => {
  const flashMessage = document.querySelector('.alert');
  if (flashMessage) {
    setTimeout(()=> {
      flashMessage.style.display = 'none';
    }, 3000);
  }
});
