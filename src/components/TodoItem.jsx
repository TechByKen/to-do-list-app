

export default function TodoItem({item, onDelete}) {
  return ( 
   <li className="flex justify-between items-center border-b py-2 text-gray-800">
      <span>{item.task}</span>
      <button onClick={()=> onDelete(item.id)}  className="bg-red-100 cursor-pointer text-red-700 px-2 py-1 text-sm rounded hover:bg-red-200">Remove</button>
   </li>
  )
}

