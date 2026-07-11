import { describe, expect, jest, test } from 'bun:test';
import { fireEvent, render } from '@testing-library/react';
import { createRef, Fragment } from 'react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  test('omits every absent convenience section', () => {
    const { container } = render(<EmptyState />);
    const root = container.querySelector('.empty');

    expect(root?.children).toHaveLength(0);
    expect(container.querySelector('.empty-icon')).toBeNull();
    expect(container.querySelector('.empty-title')).toBeNull();
    expect(container.querySelector('.empty-subtitle')).toBeNull();
    expect(container.querySelector('.empty-action')).toBeNull();
  });

  test('renders every convenience section in canonical order', () => {
    const { container, getByText } = render(
      <EmptyState icon="Icon" title="No messages" subtitle="Start a conversation">
        <button type="button">Compose</button>
      </EmptyState>
    );
    const root = container.querySelector('.empty');

    expect(Array.from(root?.children ?? []).map((element) => element.className)).toEqual([
      'empty-icon',
      'empty-title h5',
      'empty-subtitle',
      'empty-action',
    ]);
    expect(getByText('No messages').tagName).toBe('P');
    expect(getByText('Start a conversation').tagName).toBe('P');
    expect(getByText('Compose').closest('.empty-action')).not.toBeNull();
  });

  test('preserves valid falsy convenience content', () => {
    const { container } = render(
      <EmptyState icon={0} title={0} subtitle={0}>
        {0}
      </EmptyState>
    );

    expect(container.querySelector('.empty-icon')?.textContent).toBe('0');
    expect(container.querySelector('.empty-title')?.textContent).toBe('0');
    expect(container.querySelector('.empty-subtitle')?.textContent).toBe('0');
    expect(container.querySelector('.empty-action')?.textContent).toBe('0');
  });

  test('preserves explicit empty strings but omits empty collections and fragments', () => {
    const { container, rerender } = render(
      <EmptyState icon="" title="" subtitle="">
        {''}
      </EmptyState>
    );

    expect(container.querySelector('.empty-icon')).not.toBeNull();
    expect(container.querySelector('.empty-title')).not.toBeNull();
    expect(container.querySelector('.empty-subtitle')).not.toBeNull();
    expect(container.querySelector('.empty-action')).not.toBeNull();

    rerender(
      <EmptyState icon={[]} title={<></>} subtitle={[null, false]}>
        {new Set<React.ReactNode>()}
      </EmptyState>
    );
    expect(container.querySelector('.empty')?.children).toHaveLength(0);
  });

  test('compound children take precedence through fragments', () => {
    const { queryByText, getByText } = render(
      <EmptyState title="Ignored title" subtitle="Ignored subtitle" icon="Ignored icon">
        <Fragment>
          <EmptyState.Title className="custom-title">Compound title</EmptyState.Title>
          <EmptyState.Subtitle>Compound subtitle</EmptyState.Subtitle>
          <EmptyState.Action>Compound action</EmptyState.Action>
        </Fragment>
      </EmptyState>
    );

    expect(queryByText('Ignored title')).toBeNull();
    expect(queryByText('Ignored subtitle')).toBeNull();
    expect(queryByText('Ignored icon')).toBeNull();
    expect(getByText('Compound title').classList.contains('custom-title')).toBe(true);
  });

  test('forwards root and compound native props, events, classes, and refs', () => {
    const rootRef = createRef<HTMLDivElement>();
    const iconRef = createRef<HTMLDivElement>();
    const titleRef = createRef<HTMLParagraphElement>();
    const subtitleRef = createRef<HTMLParagraphElement>();
    const actionRef = createRef<HTMLDivElement>();
    const onClick = jest.fn();
    const { getByTestId } = render(
      <EmptyState ref={rootRef} className="custom-root" data-testid="root" onClick={onClick}>
        <EmptyState.Icon ref={iconRef}>Icon</EmptyState.Icon>
        <EmptyState.Title ref={titleRef}>Title</EmptyState.Title>
        <EmptyState.Subtitle ref={subtitleRef}>Subtitle</EmptyState.Subtitle>
        <EmptyState.Action ref={actionRef} data-testid="action">
          Action
        </EmptyState.Action>
      </EmptyState>
    );
    const root = getByTestId('root');

    expect(rootRef.current === root).toBe(true);
    expect(iconRef.current?.classList.contains('empty-icon')).toBe(true);
    expect(titleRef.current?.tagName).toBe('P');
    expect(subtitleRef.current?.tagName).toBe('P');
    expect(actionRef.current === getByTestId('action')).toBe(true);
    expect(root.classList.contains('custom-root')).toBe(true);
    fireEvent.click(root);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
