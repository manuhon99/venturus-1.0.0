import React from 'react';

const initialList = [
  {
    id: 'a',
    task: 'Learn React',
    isComplete: false,
  },
  {
    id: 'b',
    task: 'Learn GraphQL',
    isComplete: true,
  },
];

// ** with useReducer and complex object ** //

const listReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ITEM': {
      const newList = state.list.map((item) => {
        if (item.id === action.id) {
          const updatedItem = {
            ...item,
            isComplete: !item.isComplete,
          };

          return updatedItem;
        }

        return item;
      });

      return { ...state, list: newList };
    }
    default:
      throw new Error();
  }
};

const Edit = () => {
  const [listData, dispatchListData] = React.useReducer(listReducer, {
    list: initialList,
    isShowList: true,
  });

  function handleToggleComplete(id) {
    dispatchListData({ type: 'UPDATE_ITEM', id });
  }

  if (!listData.isShowList) {
    return null;
  }

  return (
    <List
      list={listData.list}
      onToggleComplete={handleToggleComplete}
    />
  );
};

const List = ({ list, onToggleComplete }) => (
  <ul>
    {list.map((item) => (
      <li key={item.id}>
        <span
          style={{
            textDecoration: item.isComplete ? 'line-through' : 'none',
          }}
        >
          {item.task}
        </span>
        <button
          type="button"
          onClick={() => onToggleComplete(item.id)}
        >
          {item.isComplete ? 'Undo' : 'Done'}
        </button>
      </li>
    ))}
  </ul>
);

export default Edit;