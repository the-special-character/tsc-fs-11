import { Button } from '@/components/ui/button';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

function TodoFilter({ filterType, changeFilterType }) {
  console.log('render todofilter');
  return (
    <div className="flex w-full">
      <Button
        className="flex-1 rounded-none"
        variant={filterType === 'all' ? 'destructive' : 'default'}
        onClick={() => changeFilterType('all')}
      >
        All
      </Button>
      <Button
        className="flex-1 rounded-none"
        variant={filterType === 'pending' ? 'destructive' : 'default'}
        onClick={() => changeFilterType('pending')}
      >
        Pending
      </Button>
      <Button
        className="flex-1 rounded-none"
        variant={filterType === 'completed' ? 'destructive' : 'default'}
        onClick={() => changeFilterType('completed')}
      >
        Completed
      </Button>
    </div>
  );
}

TodoFilter.propTypes = {
  filterType: PropTypes.oneOf(['all', 'pending', 'completed']).isRequired,
  changeFilterType: PropTypes.func.isRequired,
};

export default memo(TodoFilter);
