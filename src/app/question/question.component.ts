import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../poll.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() selectedQuestion: Question | null;
  @Input() questions: Question[];

  public checked: boolean;

  constructor() {}

  ngOnInit(): void {
    this.questions = [];
  }

  public addQuestion(): void {
    const question: Question = {
      answers: [],
      text: '',
    };

    this.questions.push(question);
    this.selectedQuestion = null;
  }

  public removeQuestion(index: number): void {
    this.questions.splice(index, 1);
  }

  public getBackgroundColor(question: Question): string {
    if (this.selectedQuestion === question) {
      return 'crimson';
    } else if (!this.selectedQuestion) {
      return '';
    }
    return '';
  }
}
