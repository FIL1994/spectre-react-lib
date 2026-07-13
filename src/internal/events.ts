export interface PreventableEvent {
  defaultPrevented: boolean;
}

export type EventHandler<Event extends PreventableEvent> = (event: Event) => void;

export function composeEventHandlers<Event extends PreventableEvent>(
  consumerHandler: EventHandler<Event> | undefined,
  internalHandler: EventHandler<Event> | undefined
): EventHandler<Event> {
  return (event) => {
    consumerHandler?.(event);
    if (!event.defaultPrevented) internalHandler?.(event);
  };
}
