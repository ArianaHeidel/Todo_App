import React from 'react'
import Todo from './Todo'
import {useRef, useState, } from 'react';
import {saveTodo} from '../api/TodoService';


//data ist the response from backend, content ist the array of todos
//für jedes element in array(ein todo) wird ein neues element der klasse Todo gemapt mit der id als key
const Board = ({ data, currentPage, getAllTodos }) => {

    const modalRef = useRef();
    const [values, setValues] = useState({
            title: '',
            description: '',
        });

    const toggleModal = (show) => show? modalRef.current.showModal(): modalRef.current.close();
    
    const onChange=(event)=>{
        setValues({...values,[event.target.name]: event.target.value})
        //name:'value'
    };

    const handleNewTodo = async (event) => {
        event.preventDefault();
        try{
            const newTodo = { ...values, completed: false }; // füge extra feld completed hinzu 
            await saveTodo(newTodo);
            toggleModal(false); // Modal schließen
            setValues({ title: "", description: "" }); //damit formular alte werte nicht behält
        }
        catch(error){console.log(error);}
    };

    return (
        <>
            <main className='board'>
                {data?.content?.length === 0 && <div>No ToDos</div>}
                {data?.content?.length > 0 && data.content.map(todo => <Todo todo={todo} key={todo.id} />)}
                <div className="add-todo" onClick={() => toggleModal(true)}> + </div>

                {data?.content?.length > 0 && data?.totalPages > 1 &&
                    <div className='pagination'>
                        <a onClick={() => getAllTodos(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>

                        {data && [...Array(data.totalPages).keys()].map((page, index) =>
                            <a onClick={() => getAllTodos(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}

                        <a onClick={() => getAllTodos(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>
                    </div>
                }
            </main>

            {/* Modal */}
            <dialog ref={modalRef} className="modal" id="modal">
                <div className="modal__header">
                    <h3>New Todo</h3>
                    <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
                </div>
                <div className="divider"></div>
                <div className="modal__body">
                    <form onSubmit={handleNewTodo}>
                        <div className="todo-details">
                            <div className="input-box">
                                <span className="details">Titel</span>
                                <input type="text" value={values.title} onChange={onChange} name='title' required />
                            </div>
                            <div className="input-box">
                                <span className="details">Beschreibung</span>
                                <input type="text" value={values.description} onChange={onChange} name='description' required />
                            </div>
                        </div>
                        <div className="form_footer">
                            <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
                            <button type='submit' className="btn">Save</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default Board
