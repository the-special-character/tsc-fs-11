import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import TodoForm from './todoForm';
import TodoList from './todoList';
import TodoFilter from './todoFilter';

function Todo() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <h1 className="text-center m-10">Todo App</h1>
        <TodoForm />
        <TodoList />
        <TodoFilter />
      </div>
      <Toaster />
    </>
  );
}

export default Todo;
