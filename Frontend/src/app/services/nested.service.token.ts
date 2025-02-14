import { InjectionToken } from '@angular/core';
import { INestedService } from './inested.service';

export const NESTED_SERVICE_TOKEN = new InjectionToken<INestedService>('NESTED_SERVICE_TOKEN');