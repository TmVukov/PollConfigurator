import { Component, Input, OnInit } from '@angular/core';
import { Answer, Question } from '../poll.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() editableTitle: boolean;
  @Input() selectedQuestion: Question;
  @Input() answers: Answer[];
  @Input() questions: Question[];

  public checked: boolean;
  public optionalAnswerAdded: boolean;

  constructor() { }

  ngOnInit(): void {
    this.questions = [];
    this.answers = [];
  }

  public addQuestion(): void {
    const question: Question = {
      answers: [],
      text: ''
    };

    this.questions.push(question);
  }


  public removeQuestion(index: number): void {
    this.questions.splice(index, 1);
  }

  public getBackgroundColor(question: Question): string {
    if (this.selectedQuestion === question) {
      return 'crimson'
    }
    return '';
  }



}
