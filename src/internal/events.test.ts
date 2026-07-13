import { describe, expect, jest, test } from 'bun:test';
import { composeEventHandlers, type PreventableEvent } from './events';

interface TestEvent extends PreventableEvent {
  preventDefault(): void;
}

function createEvent(): TestEvent {
  return {
    defaultPrevented: false,
    preventDefault() {
      this.defaultPrevented = true;
    },
  };
}

describe('composeEventHandlers', () => {
  test('calls the consumer before internal behavior', () => {
    const calls: string[] = [];
    const handler = composeEventHandlers<TestEvent>(
      () => calls.push('consumer'),
      () => calls.push('internal')
    );

    handler(createEvent());

    expect(calls).toEqual(['consumer', 'internal']);
  });

  test('skips internal behavior when the consumer prevents the default', () => {
    const internalHandler = jest.fn();
    const handler = composeEventHandlers<TestEvent>(
      (event) => event.preventDefault(),
      internalHandler
    );

    handler(createEvent());

    expect(internalHandler).not.toHaveBeenCalled();
  });

  test('supports either handler being absent', () => {
    const consumerHandler = jest.fn();
    const internalHandler = jest.fn();

    composeEventHandlers(consumerHandler, undefined)(createEvent());
    composeEventHandlers(undefined, internalHandler)(createEvent());

    expect(consumerHandler).toHaveBeenCalledTimes(1);
    expect(internalHandler).toHaveBeenCalledTimes(1);
  });
});
