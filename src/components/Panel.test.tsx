import { describe, expect, jest, test } from 'bun:test';
import { fireEvent, render } from '@testing-library/react';
import { createRef, Fragment } from 'react';
import { Panel } from './Panel';

describe('Panel', () => {
  test('omits absent convenience sections', () => {
    const { container } = render(<Panel />);
    const panel = container.querySelector('.panel');

    expect(panel?.children).toHaveLength(0);
    expect(container.querySelector('.panel-header')).toBeNull();
    expect(container.querySelector('.panel-body')).toBeNull();
    expect(container.querySelector('.panel-footer')).toBeNull();
  });

  test('renders convenience content and valid falsy values', () => {
    const { container } = render(
      <Panel title={0} footer={0}>
        {0}
      </Panel>
    );

    expect(container.querySelector('.panel-title')?.textContent).toBe('0');
    expect(container.querySelector('.panel-body')?.textContent).toBe('0');
    expect(container.querySelector('.panel-footer')?.textContent).toBe('0');
  });

  test('preserves explicit empty strings but omits empty collections and fragments', () => {
    const { container, rerender } = render(
      <Panel title="" footer="">
        {''}
      </Panel>
    );

    expect(container.querySelector('.panel-header')).not.toBeNull();
    expect(container.querySelector('.panel-body')).not.toBeNull();
    expect(container.querySelector('.panel-footer')).not.toBeNull();

    rerender(
      <Panel title={<></>} footer={[null, false]}>
        {new Set<React.ReactNode>()}
      </Panel>
    );
    expect(container.querySelector('.panel')?.children).toHaveLength(0);
  });

  test('supports every canonical compound in order', () => {
    const { container, getByRole } = render(
      <Panel>
        <Panel.Header>
          <Panel.Title>Title</Panel.Title>
          <Panel.Subtitle>Subtitle</Panel.Subtitle>
        </Panel.Header>
        <Panel.Nav aria-label="Panel navigation">Navigation</Panel.Nav>
        <Panel.Body>Body</Panel.Body>
        <Panel.Footer>Footer</Panel.Footer>
      </Panel>
    );
    const panel = container.querySelector('.panel');

    expect(Array.from(panel?.children ?? []).map((element) => element.className)).toEqual([
      'panel-header',
      'panel-nav',
      'panel-body',
      'panel-footer',
    ]);
    expect(getByRole('navigation', { name: 'Panel navigation' }).tagName).toBe('NAV');
    expect(container.querySelector('.panel-subtitle')?.textContent).toBe('Subtitle');
  });

  test('compound sections take precedence through fragments', () => {
    const { queryByText, getByText } = render(
      <Panel title="Ignored title" footer="Ignored footer">
        <Fragment>
          <Panel.Body>Compound body</Panel.Body>
        </Fragment>
      </Panel>
    );

    expect(queryByText('Ignored title')).toBeNull();
    expect(queryByText('Ignored footer')).toBeNull();
    expect(getByText('Compound body')).toBeTruthy();
  });

  test('forwards refs and native props for the root and every compound', () => {
    const rootRef = createRef<HTMLDivElement>();
    const headerRef = createRef<HTMLDivElement>();
    const navRef = createRef<HTMLElement>();
    const bodyRef = createRef<HTMLDivElement>();
    const footerRef = createRef<HTMLDivElement>();
    const titleRef = createRef<HTMLDivElement>();
    const subtitleRef = createRef<HTMLDivElement>();
    const onClick = jest.fn();
    const { getByTestId } = render(
      <Panel ref={rootRef} className="custom" data-testid="panel" onClick={onClick}>
        <Panel.Header ref={headerRef}>
          <Panel.Title ref={titleRef}>Title</Panel.Title>
          <Panel.Subtitle ref={subtitleRef}>Subtitle</Panel.Subtitle>
        </Panel.Header>
        <Panel.Nav ref={navRef}>Nav</Panel.Nav>
        <Panel.Body ref={bodyRef}>Body</Panel.Body>
        <Panel.Footer ref={footerRef}>Footer</Panel.Footer>
      </Panel>
    );
    const panel = getByTestId('panel');

    expect(rootRef.current === panel).toBe(true);
    expect(headerRef.current?.classList.contains('panel-header')).toBe(true);
    expect(navRef.current?.tagName).toBe('NAV');
    expect(bodyRef.current?.classList.contains('panel-body')).toBe(true);
    expect(footerRef.current?.classList.contains('panel-footer')).toBe(true);
    expect(titleRef.current?.classList.contains('panel-title')).toBe(true);
    expect(subtitleRef.current?.classList.contains('panel-subtitle')).toBe(true);
    fireEvent.click(panel);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
