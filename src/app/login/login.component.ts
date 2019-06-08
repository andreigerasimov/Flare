import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { TinderService } from '../services/tinder.service';
var tinder = require('tinder');
var client = new tinder.TinderClient();

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    url = "https://www.facebook.com/v2.6/dialog/oauth?redirect_uri=fb464891386855067%3A%2F%2Fauthorize%2F&scope=user_birthday%2Cuser_photos%2Cuser_education_history%2Cemail%2Cuser_relationship_details%2Cuser_friends%2Cuser_work_history%2Cuser_likes&response_type=token%2Csigned_request&client_id=464891386855067&ret=login&fallback_redirect_uri=221e1158-f2e9-1452-1a05-8983f99f7d6e&ext=1556057433&hash=Aea6jWwMP_tDMQ9y"

    loginWindow;

    facebook_token = "";

    token_regex = /access_token=(.*)&e/;
    token;

    constructor(private service: TinderService, private router: Router) {

    }

    facebookLogin() {

        this.loginWindow = window.open(this.url, "Project Flare", "menubar=no,location=no,resizable=no,scrollbars=no,toolbar=no,status=yes,width=600,height=600");
    }

    getTinderAuthToken() {

        this.token = this.facebook_token.match(this.token_regex);

        console.log(this.token);
        this.service.TinderLogin(this.token[1]).subscribe(login => {
            console.log(login);

            localStorage.setItem('x-auth-token', login.data.api_token);

            console.log(localStorage.getItem('x-auth-token'));
        })

        if (localStorage.getItem('x-auth-token') != null) {
            this.router.navigate(['/profiles']);


            setTimeout(() => {
                location.reload();
            },
                1000);

        }
    }
}
