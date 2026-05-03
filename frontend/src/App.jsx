import { useEffect, useRef, useState, } from 'react';
import { getTodos, saveTodo, updateTodo } from './api/TodoService';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Header from './components/SideBar';
import Board from './components/Board';
import TodoDetail from './components/TodoDetail';
import Dummi from './components/Dummi';
import SideBar from './components/SideBar';



function App() {

    //const [aktuellerWert, FunktionZumÄndern] = useState(startwert); nötig da sonst wert beim jeden rendern zurückgesetzt wird
    const modalRef = useRef();
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(0);

    const getAllTodos = async (page = 0, size = 5) => {
        try {
            setCurrentPage(page);
            const { data } = await getTodos(page, size);
            setData(data);
        } catch (error) {
            console.log(error);
        }
    }

    //reagiert auf einen SideEffect einer Funktion, aka wird aufgerufen wenn die funktion gerendert wird 
    useEffect(() => {
        getAllTodos();
    }, []);
    //const funktion = (parameter) => {code}; 

    return (
    <>
        <main className='main'>
            <SideBar/>
            <div className='container'>
                <Routes>
                    <Route path='/' element={<Navigate to={'/todos'} />} />
                    <Route path="/todos" element={<Board data={data} currentPage={currentPage} getAllTodos={getAllTodos} />} />
                    <Route path="/todos/:id" element={<TodoDetail/>} />
                    <Route path="/Dummi" element={<Dummi/>} />
                </Routes>
            </div>
        </main>
    </>
    );
}
export default App;
