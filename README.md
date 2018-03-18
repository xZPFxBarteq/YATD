# YATD

Hi! This is 'Yet Another To Do' - in short YATD. App is used to manage to do lists.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.1.

It was tested on:
* node v8.9.4
* npm v5.6.0
* Windows 8.1 64bit
* Chrome 64.0.3282.186

## Running the YATD

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## FAQ

* Can I login with Google?

Yep, you can. Just click 'LOGIN WITH GOOGLE' button.

* Google login does not work!

Make sure you turned off any adblocker in your browser. Also only logins originated from localhost:4200 will be accepted.

* Can I choose another server than the given one?

Not without altering the code. Feel free to do that, add your url in LoginComponent.serverUrls.

* What if server is unreachable or does not confront the given API?

All errors should be handled and will give you a user-friendly dialog. If you want more info, check the browsers console. After error occurs you will be redirected to login page.

* Can I order lists/todos?

Nope. The order will be only preserved during components lifetime.

* What strategy is used in lists and todos search - 'contain' or 'startsWith'?

Search checks if element starts with given string.
