import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, InjectionToken } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { FeedComponent } from './feed/feed.component';
import { Ga2m1nzComponent } from './ga2m1nz/ga2m1nz.component';
import { BlurDirective } from './blur.directive';

import { ConnectionCounterDirective } from './connection-counter.directive';

import { SIO_TOKEN } from './common/socket-io.service'

const appRoutes: Routes = [
	{
		path: 'mainscreen',
		component: MainscreenComponent,
		data: { title: 'SECURE_CONNECTION' }
	},
	{
		path: 'ga2m1nz', 
		component: Ga2m1nzComponent,
		data: { title: 'ADMIN SCREEN' }
	},
	{
		path: '**', 
		component: FeedComponent,
		data: { title: 'SECURE_CONNECTION' }
	}
];

export const socketIO = new InjectionToken('socketIO');

// let io = window['socketIO'];

@NgModule({
  declarations: [
    AppComponent,
    MainscreenComponent,
    FeedComponent,
    Ga2m1nzComponent,
    BlurDirective,
    ConnectionCounterDirective
  ],
  imports: [
	RouterModule.forRoot(
	appRoutes,
	{enableTracing: false } // <-- debugging purposes only
	),
    BrowserModule,
    FormsModule
  ],
  providers: [
    {
      provide: SIO_TOKEN,
      useValue: io
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }