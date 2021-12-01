import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { AppComponent } from './app.component';
import { PollConfigComponent } from './poll-config/poll-config.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AnswerComponent } from './answer/answer.component';
import { QuestionComponent } from './question/question.component';


@NgModule({
  declarations: [
    AppComponent,
    PollConfigComponent,
    AnswerComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatSnackBarModule
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
