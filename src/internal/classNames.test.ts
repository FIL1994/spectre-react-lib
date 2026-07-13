import { describe, expect, test } from 'bun:test';
import { classNames } from './classNames';

describe('classNames', () => {
  test('joins class names in deterministic input order', () => {
    expect(classNames('button', 'button-primary', 'active')).toBe('button button-primary active');
  });

  test('omits false, null, undefined, and empty conditional values', () => {
    expect(classNames('button', false, null, undefined, '')).toBe('button');
  });

  test('flattens nested class-name groups while preserving consumer classes', () => {
    expect(
      classNames('button', ['button-primary', [undefined, 'consumer first consumer-second']])
    ).toBe('button button-primary consumer first consumer-second');
  });
});
