import logger from './logger';
import { ContentPulseError } from '@contentpulse/shared';

export class ValidationError extends ContentPulseError {
  constructor(message: string, details?: any) {
    super('VALIDATION_ERROR', 400, message, details);
  }
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validateString(value: any, minLength = 1, maxLength = Infinity): value is string {
  return typeof value === 'string' && value.length >= minLength && value.length <= maxLength;
}

export function validateNumber(value: any, min = -Infinity, max = Infinity): value is number {
  return typeof value === 'number' && !isNaN(value) && value >= min && value <= max;
}

export function validateArray<T>(value: any): value is T[] {
  return Array.isArray(value);
}

export function validateDate(value: any): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

export function validateContentFormat(format: string): boolean {
  return ['article', 'video', 'newsletter', 'social', 'podcast', 'infographic'].includes(format);
}

export function validatePriority(priority: string): boolean {
  return ['high', 'medium', 'low'].includes(priority);
}

export function validateEnum(value: string, validValues: string[]): boolean {
  return validValues.includes(value);
}

export class RequestValidator {
  static requireString(value: any, fieldName: string, minLength = 1, maxLength = Infinity): string {
    if (!validateString(value, minLength, maxLength)) {
      throw new ValidationError(`${fieldName} must be a string with length between ${minLength} and ${maxLength}`);
    }
    return value;
  }

  static requireNumber(value: any, fieldName: string, min = -Infinity, max = Infinity): number {
    if (!validateNumber(value, min, max)) {
      throw new ValidationError(`${fieldName} must be a number between ${min} and ${max}`);
    }
    return value;
  }

  static requireDate(value: any, fieldName: string): Date {
    const date = new Date(value);
    if (!validateDate(date)) {
      throw new ValidationError(`${fieldName} must be a valid date`);
    }
    return date;
  }

  static requireArray<T>(value: any, fieldName: string): T[] {
    if (!validateArray<T>(value)) {
      throw new ValidationError(`${fieldName} must be an array`);
    }
    return value;
  }

  static requireEnum(value: any, fieldName: string, validValues: string[]): string {
    if (!validateEnum(value, validValues)) {
      throw new ValidationError(`${fieldName} must be one of: ${validValues.join(', ')}`);
    }
    return value;
  }

  static optionalString(value: any, fieldName: string, minLength = 1, maxLength = Infinity): string | undefined {
    if (value === undefined || value === null) return undefined;
    if (!validateString(value, minLength, maxLength)) {
      throw new ValidationError(`${fieldName} must be a string with length between ${minLength} and ${maxLength}`);
    }
    return value;
  }

  static optionalNumber(value: any, fieldName: string, min = -Infinity, max = Infinity): number | undefined {
    if (value === undefined || value === null) return undefined;
    if (!validateNumber(value, min, max)) {
      throw new ValidationError(`${fieldName} must be a number between ${min} and ${max}`);
    }
    return value;
  }

  static optionalDate(value: any, fieldName: string): Date | undefined {
    if (value === undefined || value === null) return undefined;
    const date = new Date(value);
    if (!validateDate(date)) {
      throw new ValidationError(`${fieldName} must be a valid date`);
    }
    return date;
  }

  static optionalEnum(value: any, fieldName: string, validValues: string[]): string | undefined {
    if (value === undefined || value === null) return undefined;
    if (!validateEnum(value, validValues)) {
      throw new ValidationError(`${fieldName} must be one of: ${validValues.join(', ')}`);
    }
    return value;
  }
}
