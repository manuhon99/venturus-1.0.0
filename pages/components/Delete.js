  
import React from 'react';

const initialList = [
  {
    id: 'a',
    firstname: 'Robin',
    lastname: 'Wieruch',
    year: 1988,
  },
  {
    id: 'b',
    firstname: 'Dave',
    lastname: 'Davidds',
    year: 1990,
  },
];

// ** with useReducer Hook and complex object ** //

const listReducer = (state, action) => {
  switch (action.type) {
    case 'REMOVE_ITEM':
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.id),
      };
    default:
      throw new Error();
  }
};

const Delete = () => {
  const [listData, dispatchListData] = React.useReducer(listReducer, {
    list: initialList,
    isShowList: true,
  });

  function handleRemove(id) {
    dispatchListData({ type: 'REMOVE_ITEM', id });
  }

  if (!listData.isShowList) {
    return null;
  }

  return <List list={listData.list} onRemove={handleRemove} />;
};

const List = ({ list, onRemove }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.id} item={item} onRemove={onRemove} />
    ))}
  </ul>
);

const Item = ({ item, onRemove }) => (
  <li>
    <span>{item.firstname}</span>
    <span>{item.lastname}</span>
    <span>{item.year}</span>
    <button type="button" onClick={() => onRemove(item.id)}>
      Remove
    </button>
  </li>
);

export default Delete;