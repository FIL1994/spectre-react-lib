import React from 'react';

export function hasRenderableContent(value: React.ReactNode): boolean {
  if (value === null || value === undefined || typeof value === 'boolean') return false;

  if (Array.isArray(value)) return value.some(hasRenderableContent);

  if (
    typeof value === 'object' &&
    Symbol.iterator in value &&
    typeof value[Symbol.iterator] === 'function'
  ) {
    for (const child of value as Iterable<React.ReactNode>) {
      if (hasRenderableContent(child)) return true;
    }
    return false;
  }

  if (React.isValidElement(value) && value.type === React.Fragment) {
    return hasRenderableContent((value.props as { children?: React.ReactNode }).children);
  }

  return true;
}
