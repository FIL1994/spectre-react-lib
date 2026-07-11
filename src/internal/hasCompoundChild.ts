import React from 'react';

export function hasCompoundChild(
  children: React.ReactNode,
  components: readonly React.ElementType[]
): boolean {
  let found = false;

  React.Children.forEach(children, (child) => {
    if (found || !React.isValidElement(child)) return;

    if (child.type === React.Fragment) {
      found = hasCompoundChild(
        (child.props as { children?: React.ReactNode }).children,
        components
      );
      return;
    }

    found = components.includes(child.type as React.ElementType);
  });

  return found;
}
