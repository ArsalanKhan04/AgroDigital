// get the form element and submit button
const form = document.querySelector('.loginForm');
const submitBtn = document.querySelector('button');

// add event listener to the submit button
submitBtn.addEventListener('click', function(event) {
  // prevent the default form submission behavior
  event.preventDefault();

  // get the input values
  const email = form.querySelector('input[type="text"]:nth-of-type(1)').value;
  const phone = form.querySelector('input[type="text"]:nth-of-type(2)').value;
  const password = form.querySelector('input[type="password"]:nth-of-type(1)').value;
  const confirmPassword = form.querySelector('input[type="password"]:nth-of-type(2)').value;

  // validate the input values
  if (!email || !phone || !password || !confirmPassword) {
    alert('Please fill in all the fields.');
    return;
  }
  if (password !== confirmPassword) {
    alert('Password does not match.');
    return;
  }
  if (!form.querySelector('input[type="radio"]:checked')) {
    alert('Please select your account type.');
    return;
  }

  // if all the input values are valid, submit the form
  form.submit();
});
