const contactForm = document.getElementById('contactForm');
const formResult = document.getElementById('formResult');

// This sets a message for one field and marks that field as invalid.
function showError(fieldId, errorId, message) {
  document.getElementById(errorId).textContent = message;
  document.getElementById(fieldId).setAttribute('aria-invalid', message ? 'true' : 'false');
}

// Check every field when the visitor tries to submit the form.
contactForm.addEventListener('submit', function(event) {
  event.preventDefault();
  formResult.textContent = '';
  formResult.className = 'form-result';
  const name = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();
  let valid = true;
  let firstInvalidField = '';
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]+$/;

  if (name === '') {
    showError('fullName', 'nameError', 'Please enter your full name.');
    valid = false; firstInvalidField = 'fullName';
  } else { showError('fullName', 'nameError', ''); }

  if (email === '') {
    showError('email', 'emailError', 'Please enter your email address.');
    valid = false; if (!firstInvalidField) { firstInvalidField = 'email'; }
  } else if (!emailPattern.test(email)) {
    showError('email', 'emailError', 'Please enter a valid email, such as name@example.com.');
    valid = false; if (!firstInvalidField) { firstInvalidField = 'email'; }
  } else { showError('email', 'emailError', ''); }

  if (phone === '') {
    showError('phone', 'phoneError', 'Please enter a phone number.');
    valid = false; if (!firstInvalidField) { firstInvalidField = 'phone'; }
  } else if (!phonePattern.test(phone)) {
    showError('phone', 'phoneError', 'Use digits only, without spaces, + or other symbols.');
    valid = false; if (!firstInvalidField) { firstInvalidField = 'phone'; }
  } else { showError('phone', 'phoneError', ''); }

  if (message === '') {
    showError('message', 'messageError', 'Please enter your message.');
    valid = false; if (!firstInvalidField) { firstInvalidField = 'message'; }
  } else { showError('message', 'messageError', ''); }

  if (valid) {
    formResult.textContent = 'Success! All fields passed validation.';
    formResult.classList.add('success');
    contactForm.reset();
  } else {
    formResult.textContent = 'Please correct the highlighted fields and try again.';
    formResult.classList.add('error');
    document.getElementById(firstInvalidField).focus();
  }
});
