import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '../ui/checkbox';
import ConfirmDelete from '../confirmDelete';

function TodoListItem({ item, toggleComplete, deleteTodo }) {
  console.log('render todo Item');
  return (
    <div key={item.id} className="flex items-center">
      <Checkbox
        checked={item.isDone}
        onCheckedChange={() => toggleComplete(item)}
      />
      <p className="flex-1 px-4">{item.text}</p>
      <ConfirmDelete onClick={() => deleteTodo(item)} />
    </div>
  );
}

TodoListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    isDone: PropTypes.bool,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default memo(TodoListItem);
