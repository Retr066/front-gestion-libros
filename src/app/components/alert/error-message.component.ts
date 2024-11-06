import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './error-message.component.html'
})
export class ErrorMessageComponent  {
  @Input() control: FormControl | null = null;
}
