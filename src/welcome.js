/*jshint esnext: true */
'use strict';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
@inject(HttpClient)
export class Welcome {
  heading = 'Welcome to Aurelia!';
  firstName = 'John';
  lastName = 'Doe';
  searchUser = 'Give Me A UserName'

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  set userSearch(newname) {
    this.searchUser = newname;
    return this.searchUser;
  }
  submit() {
    alert(`Welcome, ${this.fullName}! Here is the user you wanted, ${this.searchUser}` );
    return this.http.fetch(`users/${this.searchUser}`)
      .then(response=> response.json())
      .then(user => {
        this.user = user;
        console.log(user);
      });
  }
  constructor(http) {
    http.configure(config=>{
      config.useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });
    this.http = http;
  }
}
