import {
  render,
  waitFor,
  waitForElementToBeRemoved,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { List } from '../components/List';

describe('List Component', () => {
  it('should render list items', () => {
    const list = ['Diego', 'Rodz', 'Mayk'];
    const { getByText, rerender } = render(<List initialItems={list} />);

    list.forEach(item => {
      expect(getByText(item)).toBeInTheDocument();
    });

    rerender(<List initialItems={['Julia']} />);
    expect(screen.getByText('Julia')).toBeInTheDocument();
    expect(screen.queryByText('Mayk')).not.toBeInTheDocument();
  });

  it('should be able to add new item to the list', async () => {
    const { getByText, getByPlaceholderText } = render(
      <List initialItems={[]} />
    );

    const inputElement = getByPlaceholderText('Novo item');
    const addButton = getByText('Adicionar');

    await userEvent.type(inputElement, 'Novo');
    await userEvent.click(addButton);

    await waitFor(
      () => {
        expect(getByText('Novo')).toBeInTheDocument();
      },
      {
        interval: 700,
      }
    );
  });

  it('should be able to add new item to the list', async () => {
    const { getByText, getAllByText } = render(
      <List initialItems={['Diego']} />
    );

    const removeButtons = getAllByText('Remover');
    await userEvent.click(removeButtons[0]);

    await waitForElementToBeRemoved(
      () => {
        return getByText('Diego');
      },
      {
        interval: 700,
      }
    );
  });
});
