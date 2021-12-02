export interface Answer {
  text: string;
  textarea?: boolean;
  type?: string;
}

export interface Question {
  answers: Answer[];
  text: string;
}

export interface PollRequest {
  questions: Question[];
  title: string;
}

export interface PostResponse {
  text: string;
}

export interface PollResponse {
  id: string;
  questions: Question[];
  title: string;
}
