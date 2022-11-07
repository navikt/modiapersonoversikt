import { FieldError } from 'react-hook-form';

export function buildFieldError(errorMessage: string): FieldError {
    return { message: errorMessage, type: 'validate' };
}
