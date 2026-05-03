import React from 'react'
import { Link } from 'react-router-dom'
import { deleteTodo } from '../api/TodoService'

const Todo = ({ todo }) => {
    return (
        <Link to={`/todos/${todo.id}`} className="link">
            <div className="todo_card">  
                <div className="todo_header">
                    <h3 className="todo_title">
                        {todo?.title}
                    </h3>
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
        </Link>
    )
}

export default Todo;
