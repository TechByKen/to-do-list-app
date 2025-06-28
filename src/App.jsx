import { useEffect, useState } from 'react';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

   useEffect(()=>{
    const saveToDoList = localStorage.getItem('todos')
    console.log("Loaded from localStorage:", saveToDoList);
    if(saveToDoList){
      setTodos(JSON.parse(saveToDoList))
    }
  }, [])

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos))
     console.log("Saved to localStorage:", todos);
    
  }, [todos])

  const handleAddTask = () => {
    if (task.trim() === '') return;
    setTodos([...todos, { text: task }]);
    setTask('');
  };

  const handleDeleteTask = (indexToDelete) => {
    const confirmDeleteTodo = window.confirm("Are you sure?")
    if(!confirmDeleteTodo) return

    const updatedTodos = todos.filter((__, index) => index !== indexToDelete);
    setTodos(updatedTodos);
  }

 

  return (
    <div className="bg-blue-400 flex items-center justify-center relative top-3 left-16 px-4 min-h-screen mx-10 max-w-md overflow-hidden rounded-xl  shadow-md md:max-w-2xl ">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">📝 To-Do List</h1>

        <div className="flex gap-2 mb-4">  
          <input
            type="text"
            className="flex-grow p-2 border rounded"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-700 text-black px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li key={index} className="flex justify-between items-center border-b py-2 text-gray-800">
              <span>{todo.text}</span>
              <button onClick={()=> handleDeleteTask(index)} className='bg-red-100 text-red-700 px-2 py-1 text-sm rounded hover:bg-red-200'>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

