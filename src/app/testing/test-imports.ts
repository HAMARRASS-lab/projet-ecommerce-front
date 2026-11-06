import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DemoAngularMaterialModule } from '../DemoAngularMaterialModule';
import { SharedModule } from '../shared/shared.module';

/** What a component in this app needs in order to render in a test. */
export const TEST_IMPORTS = [
  HttpClientTestingModule,
  RouterTestingModule,
  ReactiveFormsModule,
  NoopAnimationsModule,
  DemoAngularMaterialModule,
  SharedModule,
];
