import { describe, expect, jest, test } from 'bun:test';
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { Tab } from './Tab';

describe('Tab', () => {
  test('supports root and item modifiers without forcing ARIA roles', () => {
    const { getByTestId } = render(
      <Tab block className="custom-tab" data-testid="tab">
        <Tab.Item active action className="custom-item" data-testid="item">
          <a href="/account">Account</a>
        </Tab.Item>
      </Tab>
    );
    const tab = getByTestId('tab');
    const item = getByTestId('item');

    expect(tab.className).toBe('tab custom-tab tab-block');
    expect(tab.hasAttribute('role')).toBe(false);
    expect(item.classList.contains('active')).toBe(true);
    expect(item.classList.contains('tab-action')).toBe(true);
    expect(item.classList.contains('custom-item')).toBe(true);
    expect(item.hasAttribute('role')).toBe(false);
  });

  test('retains Heading as the same component alias', () => {
    expect(Tab.Item === Tab.Heading).toBe(true);
    const { getByTestId } = render(<Tab.Heading active data-testid="heading" />);

    expect(getByTestId('heading').classList.contains('tab-item')).toBe(true);
  });

  test('forwards root and item refs, native props, and events', () => {
    const tabRef = createRef<HTMLUListElement>();
    const itemRef = createRef<HTMLLIElement>();
    const onClick = jest.fn();
    const { getByTestId } = render(
      <Tab ref={tabRef} data-testid="tab">
        <Tab.Item ref={itemRef} data-testid="item" onClick={onClick} />
      </Tab>
    );

    expect(tabRef.current === getByTestId('tab')).toBe(true);
    expect(itemRef.current === getByTestId('item')).toBe(true);
    fireEvent.click(getByTestId('item'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
