import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  public static Enum = {
    COMPLETED: 'Completed',
    UNDER_DEVELOMPENT: 'Under development',
  };

  completed = false;

  @Input() value: string;

  ngOnInit() {
    this.completed = this.value == 'Completed';
  }
}
