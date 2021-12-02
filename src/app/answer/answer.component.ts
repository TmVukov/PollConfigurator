import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PollService } from './../poll.service';
import { Answer, Question } from '../poll.model';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input() questions: Question[];
  @Input() optionalAnswerAdded: boolean;
  @Input() index: number;
  @Input() last: any;

  @Output() onUpdate: EventEmitter<boolean>

  public checked: boolean;
  public answers: Answer[];

  public value: string;

  constructor(
    private pollService: PollService
  ) {
    this.onUpdate = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.answers = [];
    this.checked = false;
  }


  public addAnswer(text: string): void {
    const answer: Answer = {
      text: '',
      type: 'radio',
    };
    this.answers.push(answer);

    const question = this.questions.find(q => q.text === text);

    if (question) {
      question.answers.push(this.answers.slice(-1)[0]);
    }

    this.pollService.questions.next(this.questions);
  }


  public removeAnswer(index: number, text: string): void {
    const lastItem = index === this.answers.length-1;

    if (this.optionalAnswerAdded && lastItem) {
      this.answers.splice(index, 1);
      this.optionalAnswerAdded = false;
    }
    this.answers.splice(index, 1);

    const question = this.questions.find(q => q.text === text);

    if (question) {
      question.answers.splice(index, 1);
    }


    this.pollService.questions.next(this.questions);

    console.log(this.answers);
    console.log(this.questions);
  }

  public addOptionalAnswer(text: string): void {
    this.optionalAnswerAdded = true;

    const answer: Answer = {
      text: `Drugi razlozi`,
      textarea: this.optionalAnswerAdded ? this.optionalAnswerAdded : false,
      type: 'checkbox'
    };
    this.answers.push(answer);

    const question = this.questions.find(q => q.text === text);

    if (question) {
      question.answers.push(this.answers.slice(-1)[0]);
    }

    this.pollService.questions.next(this.questions);

  }

  public slideChanged(text: string): void {
    this.checked = !this.checked;

    const question = this.questions.find(q => q.text === text);


    if (question) {
      for(const answer of this.answers){
        answer.type = this.checked ? 'checkbox' : 'radio'
      }
      question.answers = [];
      question.answers.push(...this.answers)
    }

    console.log(question?.answers);
    console.log(this.questions);

  }


}
