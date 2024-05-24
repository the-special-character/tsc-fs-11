import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

function TodoForm({ addTodo }, ref) {
  console.log('render todoform');
  return (
    <form onSubmit={addTodo} className="flex w-full max-w-sm items-center">
      <Input ref={ref} className="rounded-r-none" required />
      <Button type="submit" className="rounded-l-none">
        Button
      </Button>
    </form>
  );
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default memo(forwardRef(TodoForm));
