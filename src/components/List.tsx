import { useState } from 'react';

type ListProps = {
  initialItems: string[];
};

export function List({ initialItems }: ListProps) {
  const [item, setItem] = useState('');
  const [list, setList] = useState(initialItems);

  function addToList() {
    setTimeout(() => {
      setList(state => [...state, item]);
    }, 700);
  }

  function removeFromList(v: string) {
    setTimeout(() => {
      setList(state => state.filter(item => item !== v));
    }, 700);
  }

  return (
    <div>
      <h1 data-testid="test">Nomes</h1>
      <input
        placeholder="Novo item"
        type="text"
        value={item}
        onChange={e => setItem(e.target.value)}
      />
      <button onClick={addToList}>Adicionar</button>

      <ul>
        {list.map(item => (
          <li key={item}>
            {item}
            <button onClick={() => removeFromList(item)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
