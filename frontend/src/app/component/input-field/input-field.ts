import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-input-field',
  imports: [InputTextModule, PasswordModule, MessageModule, FormsModule],
  templateUrl: './input-field.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputField),
      multi: true,
    },
  ],
  styleUrl: './input-field.css',
})
export class InputField implements ControlValueAccessor {
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() submitted: boolean = false;

  value: any = '';
  touched: boolean = false;
  disabled: boolean = false;

  onChange = (value: any) => {
    this.value = value;
    this.onChange(value);
  };
  onTouched = () => {};
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  markAsTouched() {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }
}
