import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  PostResponse,
  PollRequest,
  PollResponse,
  Question,
} from './poll.model';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  public questions = new Subject<Question[]>();

  private url = environment.firebaseAPi;

  constructor(private http: HttpClient) {}

  saveData(payload: PollRequest): void {
    this.http
      .post<PostResponse>(`${this.url}/question.json`, payload)
      .subscribe((data) => console.log('post', data));
  }

  getData(): Observable<PollResponse[]> {
    return this.http.get<PollResponse[]>(`${this.url}/question.json`).pipe(
      map((response) => {
        const pollResponseArr: PollResponse[] = [];

        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            pollResponseArr.push({ ...response[key], id: key });
          }
        }
        console.log(pollResponseArr);

        return pollResponseArr;
      })
    );
  }

  deleteData(id: string): Observable<PollResponse[]> {
    return this.http.delete<PollResponse[]>(`${this.url}/question/${id}.json`);
  }
}
