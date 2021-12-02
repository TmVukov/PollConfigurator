import { PollResponse } from './../poll.model';
import { PollService } from './../poll.service';
import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-poll-data',
  templateUrl: './poll-data.component.html',
  styleUrls: ['./poll-data.component.scss']
})
export class PollDataComponent implements OnInit {
  public pollData: PollResponse[]

  constructor(
    private pollService: PollService,
    @Inject(MAT_DIALOG_DATA) public id: string
  ) { }

  ngOnInit(): void {
    this.pollService.getData().subscribe(data => {
        this.pollData = data.filter(d => d.id === this.id)
    });
  }

}
