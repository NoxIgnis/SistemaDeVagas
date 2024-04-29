import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
type BtnVariants = 'login' | 'contato';

@Component({
  selector: 'submit-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input('btn-text') btnText: string = '';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() variant: BtnVariants = 'login';
  @Output('submit') onSubmit = new EventEmitter();

  submit() {
    this.onSubmit.emit();
  }
}
