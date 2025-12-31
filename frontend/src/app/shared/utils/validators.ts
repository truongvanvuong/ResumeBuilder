export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}
export function getFieldErrorMessage(fieldName: string, errors: any): string {
  if (errors?.required) return `Enter your ${fieldName.toLowerCase()}`;
  if (errors?.email) return 'Invalid email address';
  if (errors?.minlength) {
    return `${fieldName.toLowerCase()} must be at least ${
      errors.minlength.requiredLength
    } characters`;
  }
  if (errors?.messageError) {
    return errors.messageError;
  }
  return 'Invalid input';
}
