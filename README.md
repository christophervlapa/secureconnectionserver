# SecureConnectionServer v2.3

This is the updated code from my collaborative artwork Secure Connection made with Laura Hunt. Thit was shown at the Hobart Biennalle in 2017 and at Firstdraft gallery in 2018. 

http://www.christophervlapa.com.au/#/works/secureconnection

At it's core this is a chat application that allows mobile phones to anonymously connect and send messages to a a main screen (say, a projector) and to other devices, this is done through a ExpressJS server with live chat requests sent through SocketIO. There is also an element that collects probe requests from devices within range of the Alpha wifi dongle using Python 2.x and displays them on the screen, highlighting devices connected to the chat server. Crazy.

The original codebase was written in Angular 6, so this has been migrated up to Angular 9. Incremental upgrades are needed for such a jump, along with depenency updates, and code changes.

## How to run

There are some pretty involved instructions to get this to work, as well as specific modules and even specific hardware. I will be updating that once I get into my old laptop that my mother is currently using (:

## /!\ Project is being updated for 2020 /!\

The main issue is my only Alpha wifi dongle is not compatible with Mac _at all_ so this project is being ported to Raspberry PI right now.

As there are LOTS of changes and dependencies to be updated, upgraded and fixed as well as hardware testing of NIC dongles to see if they support hosted network, as well as probe requests.

The code is still representative of the outcome, but needs future-proofing.

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
