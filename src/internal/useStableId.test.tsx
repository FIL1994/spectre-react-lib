import { describe, expect, test } from 'bun:test';
import { render } from '@testing-library/react';
import { useStableId } from './useStableId';

function IdFixture({ id, prefix }: { id?: string; prefix?: string }) {
  const stableId = useStableId(id, prefix);
  return <div data-testid="fixture" id={stableId} />;
}

describe('useStableId', () => {
  test('uses an explicit ID override', () => {
    const { getByTestId } = render(<IdFixture id="account-field" />);

    expect(getByTestId('fixture').id).toBe('account-field');
  });

  test('generates unique prefixed IDs', () => {
    const { getAllByTestId } = render(
      <>
        <IdFixture prefix="field" />
        <IdFixture prefix="field" />
      </>
    );
    const fixtures = getAllByTestId('fixture');

    expect(fixtures[0]?.id.startsWith('field-')).toBe(true);
    expect(fixtures[1]?.id.startsWith('field-')).toBe(true);
    expect(fixtures[0]?.id).not.toBe(fixtures[1]?.id);
  });

  test('retains its generated ID across rerenders', () => {
    const { getByTestId, rerender } = render(<IdFixture prefix="field" />);
    const initialId = getByTestId('fixture').id;

    rerender(<IdFixture prefix="field" />);

    expect(getByTestId('fixture').id).toBe(initialId);
  });
});
