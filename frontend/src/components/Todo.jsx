import React from 'react'
import { Link } from 'react-router-dom'
import { deleteTodo, updateTodo } from '../api/TodoService'
import { DndContext, useDraggable } from '@dnd-kit/core';


const Todo = ({ todo }) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform
    } = useDraggable({
        id: todo.id
    });

    const style = {
        position: 'absolute',
        transform: `translate3d(
        ${(todo.x ?? 0) + (transform?.x ?? 0)}px,
        ${(todo.y ?? 0) + (transform?.y ?? 0)}px,
        0
        )`        
    };

    return (
            <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}>

                <div className="todo_card">
                    <div className="todo_header">
                        <Link to={`/todos/${todo.id}`} className="link">
                        <h3 className="todo_title">
                            {todo?.title}
                        </h3>
                        </Link>
                    </div>

                    <div className="todo_footer">
                        <p className="todo_description">
                            {todo?.description}
                        </p>
                        <p className={`todo_status ${todo?.completed ? 'done' : 'open'}`}>
                            {todo?.completed ? "Done" : "Open"}
                        </p>
                    </div>

                </div>
        </div>
    )
}

export default Todo;
