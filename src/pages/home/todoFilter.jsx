import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';

function TodoFilter({ loadTodo, filterType }) {
  const onFilter = useCallback(e => {
    loadTodo(e.target.getAttribute('data-type'));
  }, []);

  return (
    <div className="flex">
      <Button
        className="flex-1 rounded-none"
        data-type="all"
        variant={filterType === 'all' ? 'destructive' : 'default'}
        onClick={onFilter}
      >
        ALL
      </Button>
      <Button
        className="flex-1 rounded-none"
        data-type="pending"
        variant={filterType === 'pending' ? 'destructive' : 'default'}
        onClick={onFilter}
      >
        PENDING
      </Button>
      <Button
        className="flex-1 rounded-none"
        data-type="completed"
        variant={filterType === 'completed' ? 'destructive' : 'default'}
        onClick={onFilter}
      >
        COMPLETED
      </Button>
    </div>
  );
}

TodoFilter.propTypes = {
  loadTodo: PropTypes.func.isRequired,
  filterType: PropTypes.oneOf(['all', 'pending', 'completed']).isRequired,
};
export default memo(TodoFilter);
