import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useRef, useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);
  const todoTextRef = useRef();

  const onAddTodo = async event => {
    try {
      event.preventDefault();
      const todoText = todoTextRef.current.value;

      const res = await fetch('http://localhost:3000/todoList', {
        method: 'POST',
        body: JSON.stringify({ text: todoText, isDone: false }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await res.json();

      setTodoList(val => [json, ...val]);
      todoTextRef.current.value = '';
    } catch (error) {}
  };

  const updateTodo = async item => {
    try {
      const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...item, isDone: !item.isDone }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await res.json();

      setTodoList(val => {
        const index = val.findIndex(x => x.id === item.id);
        return [...val.slice(0, index), json, ...val.slice(index + 1)];
      });
    } catch (error) {}
  };

  const loadTodo = async () => {
    try {
      const res = await fetch('http://localhost:3000/todoList');
      const json = await res.json();
      setTodoList(json.reverse());
    } catch (error) {}
  };

  // component Did mount
  useEffect(() => {
    loadTodo();
  }, []);

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
