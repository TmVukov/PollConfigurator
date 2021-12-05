import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AnswerComponent } from './answer/answer.component';
import { QuestionComponent } from './question/question.component';
import { DataComponent } from './data/data.component';



@NgModule({
  declarations: [
    AppComponent,
    ConfigurationComponent,
    AnswerComponent,
    QuestionComponent,
    DataComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
