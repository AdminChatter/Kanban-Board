import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // Get the decoded token from localStorage
  getProfile(): JwtPayload | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode<JwtPayload>(token); // Decode the JWT token
      } catch (error) {
        console.error('Failed to decode token', error);
        return null;
      }
    }
    return null;
  }

  // Check if the user is logged in by verifying if a token exists
  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // User is logged in if the token exists and is not expired
  }

  // Check if the token is expired
  isTokenExpired(token: string): boolean {
    try {
      const decoded: JwtPayload = jwtDecode(token); // Decode the token to get expiration info
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decoded.exp && decoded.exp < currentTime; // Return true if token is expired
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // If there's an error decoding, treat the token as expired
    }
  }

  // Get the token from localStorage
  getToken(): string {
    return localStorage.getItem('auth_token') || ''; // Return the token from localStorage, or an empty string if not present
  }

  // Log the user in by storing the token in localStorage
  login(idToken: string): void {
    localStorage.setItem('auth_token', idToken); // Store the token in localStorage
    window.location.href = '/'; // Redirect to the home page (or any page after login)
  }

  // Log the user out by removing the token from localStorage
  logout(): void {
    localStorage.removeItem('auth_token'); // Remove the token from localStorage
    window.location.href = '/login'; // Redirect to the login page
  }
}

export default new AuthService();
