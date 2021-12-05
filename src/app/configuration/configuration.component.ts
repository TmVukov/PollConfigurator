import { Component, OnInit, ViewChild } from '@angular/core';
import { PollService } from '../poll.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DataComponent } from '../data/data.component';
import { PollResponse, Question, PollRequest } from '../poll.model';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;

  public editableTitle: boolean;

  public pollTitle: string;
  public selectedQuestion: Question | null;

  public questions: Question[];
  public pollData: PollResponse[];

  private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private pollService: PollService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.pollTitle = 'Nova anketa';

    this.pollService.questions.subscribe(
      (questions) => (this.questions = questions)
    );
  }

  public getValue(event: Event) {
    this.pollTitle = (<HTMLInputElement>event.target).value;

    if (!this.pollTitle) {
      this.pollTitle = 'Nova anketa';
    }
  }

  public editTitle(): void {
    this.stepper.previous();
    this.editableTitle = true;
  }

  public edit(question: Question): void {
    this.stepper.previous();
    this.selectedQuestion = question;
  }

  public selectionChange(event: StepperSelectionEvent): void {
    let stepLabel = event.selectedStep.state;
    if (stepLabel === 'visibility') {
      this.editableTitle = false;
      this.selectedQuestion = null;
    }

    if (stepLabel === 'receipt') {
      this.getPollData();
    }
  }

  public savePoll(): void {
    const payload: PollRequest = {
      questions: this.questions,
      title: this.pollTitle,
    };

    this.pollService.saveData(payload);

    this.snackBar.open('Anketa je uspješno spremljena!', '✕', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'poll__snackbar',
      duration: 3000,
    });

    this.questions = [];
    this.pollTitle = 'Nova anketa';
  }

  public remove(): void {
    this.questions = [];
  }

  public openDialog(id: string) {
    this.dialog.open(DataComponent, {
      height: 'auto',
      width: '600px',
      data: id,
    });

    this.getPollData();
  }

  public deletePoll(id: string): void {
    this.pollService.deleteData(id).subscribe((data) => {
      console.log('delete', data);
      this.getPollData();
    });
  }

  private getPollData(): void {
    this.pollService.getData().subscribe((data) => (this.pollData = data));
  }
}
