import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo), // Send the user info as JSON
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    const { token } = data; // Assuming the server returns a JWT token
    localStorage.setItem('auth_token', token); // Store the token in localStorage
    window.location.href = '/'; // Redirect to the home page or any page after login
  } catch (error) {
    console.error('Error during login', error);
    // Handle error, maybe show a message to the user
  }
};

export { login };
