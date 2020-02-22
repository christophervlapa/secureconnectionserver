import { InjectionToken, Injectable } from '@angular/core'

// Type param <> is the type of the object given back for the service   
export let SIO_TOKEN = new InjectionToken<Object>('socketIO');