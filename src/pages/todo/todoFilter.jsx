import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { useTodo } from '../../context/todoContext';

function TodoFilter() {
  const { loadTodo, filterType } = useTodo();
  return (
    <div className="flex">
      <Button
        className="flex-1 rounded-none"
        data-type="all"
        variant={filterType === 'all' ? 'destructive' : 'default'}
        onClick={() => loadTodo('all')}
      >
        ALL
      </Button>
      <Button
        className="flex-1 rounded-none"
        data-type="pending"
        variant={filterType === 'pending' ? 'destructive' : 'default'}
        onClick={() => loadTodo('pending')}
      >
        PENDING
      </Button>
      <Button
        className="flex-1 rounded-none"
        data-type="completed"
        variant={filterType === 'completed' ? 'destructive' : 'default'}
        onClick={() => loadTodo('completed')}
      >
        COMPLETED
      </Button>
    </div>
  );
}

export default memo(TodoFilter);
