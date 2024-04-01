import React, { memo } from 'react';
import TodoItem from './todoItem';
import { useTodo } from '../../context/todoContext';

function TodoList() {
  const { todoList } = useTodo();
  return (
    <div className="flex-1">
      {todoList.map(item => (
        <TodoItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default memo(TodoList);
