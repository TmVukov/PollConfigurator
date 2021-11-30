import { PollResponse, Question, PollRequest } from './../poll.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PollService } from './../poll.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-poll-config',
  templateUrl: './poll-config.component.html',
  styleUrls: ['./poll-config.component.scss']
})
export class PollConfigComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;

  public editableTitle: boolean;

  public pollTitle: string;
  public selectedQuestion: Question;

  public questions: Question[];
  public pollData: PollResponse[];

  constructor(
    private pollService: PollService
  ) {}

  ngOnInit(): void {
    this.pollTitle = 'Nova anketa';

    this.pollService.questions.subscribe(questions => this.questions = questions);
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
    if (stepLabel == "visibility") {
      this.editableTitle = false;
    }
  }

  public savePoll(): void {

    const payload: PollRequest = {
        questions: this.questions
    }

    console.log(payload);


    this.pollService.saveData(payload);

    this.questions = [];
  }

  public remove(): void {
    this.questions = [];
  }

  // public deletePoll(id: string): void {
  //   this.pollService.deleteData(id).subscribe(data =>{
  //     console.log('delete', data);
  //     this.getPollData();
  //   });

  //   // this.pollService.update.subscribe(update => {
  //   //   this.editableQuestion = update.editable,
  //   //   this.questions = update.questions
  //   // });

  //   this.questions = [];
  // }

  private getPollData(): void {
    this.pollService.getData().subscribe(data => this.pollData = data);
  }





}
