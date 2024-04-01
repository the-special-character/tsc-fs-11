import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import ConfirmDelete from '@/components/confirmDelete';
import { useTodo } from '../../context/todoContext';
import { DELETE_TODO, UPDATE_TODO } from '../../constants/actions';

function TodoItem({ item }) {
  const { updateTodo, deleteTodo, loading } = useTodo();
  const todoLoadingState = loading.find(x => x.id === item.id);

  return (
    <div className="flex items-center m-4">
      <Checkbox
        className="disabled:bg-gray-300"
        onCheckedChange={() => updateTodo(item)}
        disabled={todoLoadingState?.task === UPDATE_TODO}
        checked={item.isDone}
      />
      <p className="flex-1 px-4 line-clamp-1">{item.text}</p>

      <ConfirmDelete onClick={() => deleteTodo(item)}>
        <Button
          disabled={todoLoadingState?.task === DELETE_TODO}
          className="disabled:bg-gray-300"
        >
          Delete
        </Button>
      </ConfirmDelete>
    </div>
  );
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
  }).isRequired,
};

export default memo(TodoItem);
