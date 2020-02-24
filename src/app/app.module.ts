import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, InjectionToken } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { FeedComponent } from './feed/feed.component';
import { Ga2m1nzComponent } from './ga2m1nz/ga2m1nz.component';
import { BlurDirective } from './blur.directive';

import { AppService } from './app.service'
import { UserService } from './common/user.service'
import { GlobalVariables } from './common/globals'
import { BannerConstants } from './common/banner-constants'

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

let socketIO = window['io'];

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
	FormsModule,
	HttpClientModule
  ],
  providers: [
    {
      provide: SIO_TOKEN,
      useValue: socketIO
	},
	AppService,
	UserService,
	GlobalVariables,
	BannerConstants
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }