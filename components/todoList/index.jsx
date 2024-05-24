import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TodoListItem from '../todoListItem';

function TodoList({ todoList, filterType, toggleComplete, deleteTodo }) {
  console.log('render todolist');
  return (
    <div className="flex flex-col gap-6 w-full p-6 flex-1">
      {todoList.map(item => {
        if (
          filterType === 'all' ||
          (filterType === 'pending' && item.isDone === false) ||
          (filterType === 'completed' && item.isDone === true)
        ) {
          return (
            <TodoListItem
              key={item.id}
              item={item}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      isDone: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  filterType: PropTypes.oneOf(['all', 'pending', 'completed']).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default memo(TodoList);
