import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';

function App() {
  const [task, setTask] = useState([]);
  const [todos, setTodos] = useState("");

   useEffect(()=>{
    const saveToDo = JSON.parse(localStorage.getItem('todos')) 
    if(saveToDo){
      setTask(saveToDo)
    }
  }, [])

  const updateLocalStorage = (updatedTasks) =>{
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
    setTask(updatedTasks);
  }

 

  const handleAddTodos = () => {
    if (task.trim() !== "") {
      const newTask = {id: Date.now(), task: todos, completed: false}
      const updatedTasks= [...task, newTask];
      updateLocalStorage(updatedTasks);
      setTodos("")
    };
  };

  const handleDeleteTodos = (id) => {
    const updatedTasks = task.filter((item)=> item.id !== id)
    updateLocalStorage(updatedTasks)
  }

  const toggleTodos = (id) => {
    const updatedTasks = task.map((item)=> item.id === id ? {...item, completed: !item.completed} : item);
    updateLocalStorage(updatedTasks);
  }
 

  return (
    <div className="bg-blue-400 flex items-center justify-center relative top-3 left-16 px-4 min-h-screen mx-10 max-w-md overflow-hidden rounded-xl  shadow-md md:max-w-2xl ">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">📝 To-Do List</h1>

        <div className="flex gap-2 mb-4">  
          <input
            type="text"
            className="flex-grow p-2 border rounded"
            placeholder="Enter a todo"
            value={todos}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            onClick={handleAddTodos}
            className="bg-blue-400 text-black px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
          >
            Add Todo
          </button>
        </div>

        <div className="space-y-2">
          <ul >
            {task.map((item)=>(
              <TodoItem 
              key={item.id}
              item={item}
              onDelete={handleDeleteTodos}
              onToggle={toggleTodos}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

