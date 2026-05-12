import React from 'react'
import { useEffect, useRef, useState, } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTodo, deleteTodo, updateTodo } from '../api/TodoService';

const TodoDetail = () => {

    const inputRef = useRef();
    const [todo, setTodo] = useState({
        id: '',
        title: '',
        description: '',
        completed: false,
    });

    const { id } = useParams(); // gets the id from the parameter

    const fetchTodo = async (id) => {
        try {
            const { data } = await getTodo(id);
            setTodo(data);
        }
        catch (error) { console.log(error); }
    };

    const onChange = (event) => {
        setTodo({ ...todo, [event.target.name]: event.target.value })
        //name:'value'
    };

    const onUpdateTodo = async (event) => {
        event.preventDefault();
        await updateTodo(todo);
        fetchTodo(id);
    }

    const onDeleteTodo = async (event) => {
        await deleteTodo(id);
    }

    useEffect(() => {
        fetchTodo(id);
    }, []);

    return (
        <>
            <Link to={'/todos'} className='link'><i className='bi bi-arrow-left'></i>Back to list</Link>
            <div className='profile'>
                <div className='profile__details'>
                    <div className='profile__metadata'>
                        <p className='profile__name'>{todo.title}</p>
                    </div>
                </div>
                <div className='profile__settings'>
                    <div>
                        <form onSubmit={onUpdateTodo} className="form">
                            <div className="todo-details">
                                <input type="hidden" defaultValue={todo.id} name="id" required />
                                <div className="input-box">
                                    <span className="details">Titel</span>
                                    <input type="text" value={todo.title} onChange={onChange} name="title" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Beschreibung</span>
                                    <input type="text" value={todo.description} onChange={onChange} name="description" required />
                                </div>
                                <div className="input-box">
                                    <span className="details"> status: {todo.completed ? "Done" : "Open"}</span>
                                    <input type="checkbox" checked={todo.completed}  onChange={(e) => setTodo({ ...todo, completed: e.target.checked })} name="completed" />
                                </div>
                            </div>
                            <div className="form_footer">
                                <button onClick={() => onDeleteTodo()} type='button' className="btn btn-danger">Delete</button>
                                <button type="submit" className="btn">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TodoDetail
