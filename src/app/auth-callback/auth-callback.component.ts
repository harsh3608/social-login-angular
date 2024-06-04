import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.css'
})
export class AuthCallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params) => {
      const code = params['code'];
      if (code) {
        debugger;
        try {
          const response = await this.getUserProfile(code);
          console.log('User Profile:', response.data);
          // Handle successful login here, e.g., save the user data and navigate to the home page.
          this.router.navigate(['/']);
        } catch (error) {
          console.error('Error during authentication', error);
        }
      } else {
        console.error('No code found in query params');
      }
    });
  }

  async getUserProfile(code: string, retries = 3): Promise<any> {
    try {
      return await axios.get(`http://localhost:3000/auth/callback`, { params: { code } });
    } catch (error) {
      if (retries > 0) {
        console.log('Retrying...', retries);
        return this.getUserProfile(code, retries - 1);
      } else {
        throw error;
      }
    }
  }
}