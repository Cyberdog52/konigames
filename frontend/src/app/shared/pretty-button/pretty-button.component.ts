import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pretty-button',
  templateUrl: './pretty-button.component.html',
  styleUrls: ['./pretty-button.component.scss']
})
export class PrettyButtonComponent implements OnInit {

  @Input() iconName : string;
  @Input() title : string;
  @Input() type: string;
  @Input() disabled: boolean;
  @Input() floatLeft: boolean;
  @Output() btnClick = new EventEmitter();
  @Input() disabledDescription : string = "";

  constructor() { }

  ngOnInit() {
  }


  onClick(event: Event) {
    if (!this.disabled) {
      console.log("Emitting");
      this.btnClick.emit(event);
    } else {
      console.log("Not emmitting event because not enabled")
    }
  }

  getTooltip() {
    if (this.disabled) {
      return this.disabledDescription;
    }

    return this.title;
  }
}
