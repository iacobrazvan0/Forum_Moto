document.addEventListener('DOMContentLoaded', () => {
  const firstNameInput = document.getElementById('first_name');
  const lastNameInput = document.getElementById('last_name');
  const motoInput = document.getElementById('moto');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm_password');

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.signup-form');
    const confirmPasswordInput = document.getElementById('confirm_password');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const firstNameInput = document.getElementById('first_name');
      const lastNameInput = document.getElementById('last_name');
      const motoInput = document.getElementById('moto');
      const usernameInput = document.getElementById('username');
      const passwordInput = document.getElementById('password');
  
      const firstName = firstNameInput.value;
      const lastName = lastNameInput.value;
      const motorcycle = motoInput.value;
      const username = usernameInput.value;
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
  
      if (password !== confirmPassword) {
        console.error('Passwords do not match');
        return;
      }
  
      const userData = {
        first_name: firstName,
        last_name: lastName,
        moto: motorcycle,
        username: username,
        password: password
      };
  
      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
  
        if (response.ok) {
          console.log('User registered successfully');
          // Redirect or show success message here
        } else {
          console.error('Error registering user:', response.statusText);
          // Handle error or show error message to user
        }
      } catch (error) {
        console.error('Error registering user:', error);
        // Handle error or show error message to user
      }
    });
  });
});
