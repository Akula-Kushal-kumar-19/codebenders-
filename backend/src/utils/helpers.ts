import { v4 as uuidv4 } from 'uuid';
import { ContentPulseError } from '@contentpulse/shared';

export function generateId(): string {
  return uuidv4();
}

export function getLengthBracket(length: number): string {
  if (length < 500) return '0-500';
  if (length < 1000) return '500-1000';
  if (length < 1500) return '1000-1500';
  if (length < 2000) return '1500-2000';
  return '2000+';
}

export function calculateEngagementRate(engagement: number, views: number): number {
  if (views === 0) return 0;
  return engagement / views;
}

export function calculateConversionRate(conversions: number, views: number): number {
  if (views === 0) return 0;
  return conversions / views;
}

export function calculateGrowthRate(current: number, previous: number): number {
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / previous) * 100;
}

export function calculateTrendDirection(current: number, previous: number): 'up' | 'down' | 'stable' {
  const changePercent = calculateGrowthRate(current, previous);
  if (changePercent > 5) return 'up';
  if (changePercent < -5) return 'down';
  return 'stable';
}

export function throwError(
  code: string,
  statusCode: number,
  message: string,
  details?: any
): never {
  throw new ContentPulseError(code, statusCode, message, details);
}

export function groupBy<T, K extends string | number>(
  array: T[],
  key: (item: T) => K
): Record<K, T[]> {
  return array.reduce((result, item) => {
    const groupKey = key(item);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<K, T[]>);
}

export function averageOf<T>(array: T[], selector: (item: T) => number): number {
  if (array.length === 0) return 0;
  return array.reduce((sum, item) => sum + selector(item), 0) / array.length;
}

export function sumOf<T>(array: T[], selector: (item: T) => number): number {
  return array.reduce((sum, item) => sum + selector(item), 0);
}

export function topN<T>(array: T[], n: number, selector: (item: T) => number): T[] {
  return [...array].sort((a, b) => selector(b) - selector(a)).slice(0, n);
}
