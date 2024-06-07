import { FacebookLoginProvider, GoogleSigninButtonModule, SocialAuthService, SocialLoginModule, SocialUser } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  user!: SocialUser;
  loggedIn: boolean = false;

  constructor(
    private authService: SocialAuthService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(user);
    });


  }

  signInWithFB(): void { //Facebook Login
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithInsta(): void { //Instagram Login
    window.open('https://api.instagram.com/oauth/authorize?client_id=7535566166492469&redirect_uri=https://97fb-110-227-248-96.ngrok-free.app/auth/callback&scope=user_profile,user_media&response_type=code',
      '_blank', 'noopener,noreferrer,width=800,height=600,top=100,left=100'
    )
  }

  signOut(): any { //for logging out
    this.authService.signOut();
    console.log('logged out');
  }

 

}
