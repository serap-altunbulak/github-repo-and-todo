import Typography from '@material-ui/core/Typography';

import React, { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Github from './components/Github.js';

const LOCAL_STORAGE_KEY = 'github-repos-and-todo';

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        // fires when app component mounts to the DOM
        const storageTodos = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY)
        );
        if (storageTodos) {
            setTodos(storageTodos);
        }
    }, []);

    useEffect(() => {
        // fires when todos array gets updated
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    function addTodo(todo) {
        // adds new todo to beginning of todos array
        setTodos([todo, ...todos]);
    }

    function toggleComplete(id) {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    };
                }
                return todo;
            })
        );
    }

    function removeTodo(id) {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    return (
        <div className='App'>
            <div className='parent'>
                <div className='child'>
                    <div className='item'>
                        <Typography
                            style={{ padding: '20px', fontSize: '50px' }}
                            variant='h2'
                        >
                            My Github Repos
                        </Typography>
                        <div className='center'>
                            <Github />
                        </div>
                    </div>
                </div>
                <div className='child'>
                    <div className='item'>
                        <Typography
                            style={{ padding: '20px', fontSize: '50px' }}
                            variant='h2'
                        >
                            My Todo List
                        </Typography>
                        <TodoForm addTodo={addTodo} />
                        <TodoList
                            todos={todos}
                            toggleComplete={toggleComplete}
                            removeTodo={removeTodo}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
