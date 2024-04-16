import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useRef, useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);
  const todoTextRef = useRef();

  const onAddTodo = event => {
    event.preventDefault();
    const todoText = todoTextRef.current.value;
    setTodoList(val => [
      ...val,
      { text: todoText, isDone: false, id: new Date().valueOf() },
    ]);
    todoTextRef.current.value = '';
  };

  const updateTodo = item => {
    setTodoList(val => {
      const index = val.findIndex(x => x.id === item.id);
      return [
        ...val.slice(0, index),
        { ...val[index], isDone: !item.isDone },
        ...val.slice(index + 1),
      ];
    });
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={onAddTodo} className="flex">
        <div>
          <Label htmlFor="todoText" className="sr-only">
            Add Todo
          </Label>
          <Input
            id="todoText"
            className="rounded-r-none"
            ref={todoTextRef}
            title="Todo Text is mendatory"
            required
          />
        </div>
        <Button className="rounded-l-none">Add Todo</Button>
      </form>
      <div className="w-full">
        {todoList.map(x => (
          <div key={x.id} className="flex items-center px-4 py-2">
            <Checkbox
              id={x.id}
              onCheckedChange={() => updateTodo(x)}
              checked={x.isDone}
            />
            <Label htmlFor={x.id} className="flex-1 px-4">
              {x.text}
            </Label>
            <Button>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
