import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

let editTodoId = null

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [isEditing, setisEditing] = useState(false)
  const [showFinished, setshowFinished] = useState(false)

  useEffect(() => {
    getTodos()
  }, []);

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/");
      if (!response.ok) throw new Error("Failed to fetch todos");

      const todos = await response.json();

      setTodos(
        todos.map((item) => ({
          ...item,
          isCompleted: item.isCompleted || false, // Default to false if not set
        }))
      );
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleEdit = (todoItem, id) => {
    let c = confirm("Do you want to edit this TODO..?")
    if (c) {
      setTodo(todoItem.todo); // Populate the input field with the selected todo's text
      document.getElementById("adbtn").innerText = "Update"; // Change button text to "Update"
      editTodoId = todoItem.id; // Save the ID of the todo being edited
      setisEditing(!isEditing)
    }
  };


  const handleDelete = async (e, id) => {
    let c = confirm("Are you sure you want to delete your todo..?")
    if (c) {
      todos.filter(item => { return item.id !== id });
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      getTodos()
      console.log("this is todo id : ", id)
    }
  }

  const handleAdd = async () => {
    const existingTodo = todos.find((item) => item.id === editTodoId);
    if (document.getElementById("adbtn").innerText === "Update") {
      if (existingTodo) {
        // Remove the old entry from the state
        setTodos((prevTodos) =>
          prevTodos.filter((item) => item.id !== editTodoId)
        );

        // Delete the old entry from the database
        await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editTodoId }),
        });
        document.getElementById("adbtn").innerText = "Add"
        const updatedTodos = { id: uuidv4(), todo, isCompleted: false }
        setTodos([...todo, updatedTodos])
        await fetch("http://localhost:3000/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTodos)
        });
        setisEditing(!isEditing)
        getTodos()
      }
    }

    else {
      const updatedTodos = { id: uuidv4(), todo, isCompleted: false }
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodos)
      });
      getTodos()
    }
    setTodo("")
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = async (e) => {
    const id = e.target.name; // Get the ID from the checkbox's name
    const updatedTodos = todos.map((item) =>
      item.id === id
        ? { ...item, isCompleted: !item.isCompleted } // Toggle the `isCompleted` flag
        : item
    );
    // Find the updated item to send in the PUT request
    const updatedItem = updatedTodos.find((item) => item.id === id);
    console.log("it is the updated ITEM :", updatedItem);

    try {
      // Make the PUT request to update the item in the database
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Specify JSON payload
        },
        body: JSON.stringify({ isCompleted: updatedItem.isCompleted }), // Only send the updated field
      });

      if (!response.ok) {
        throw new Error('Failed to update the todo item');
      }

      const updatedTodoFromDb = await response.json();
      console.log('Updated todo:', updatedTodoFromDb);

      // Update the state with the modified todos
      setTodos(updatedTodos);

    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-slate-100 min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
            <button onClick={handleAdd} disabled={todo.length <= 3} id='adbtn' className='bg-slate-800 mx-2 rounded-full hover:bg-slate-950 hover:text-[16px] disabled:bg-slate-500 transition-all p-4 py-2 text-sm font-bold text-white'>Add</button>
          </div>
        </div>
        <input className='my-4 ' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className='mx-2 font-bold transition-all hover:text-lg' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-2xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length !== 0 ? (
            showFinished || todos.some((item) => !item.isCompleted) ? (
              todos.map((item) => {
                return (
                  (showFinished || !item.isCompleted) && (
                    <div key={item.id} className="todo flex justify-between my-3">
                      <div className="flex gap-2">
                        <input
                          name={item.id}
                          onChange={handleCheckbox}
                          type="checkbox"
                          checked={item.isCompleted}
                        />
                        <label className={item.isCompleted ? "line-through hover:text-lg transition-all" : "hover:text-lg hover:font-extrabold font-bold transition-all duration-300"}>
                          {item.todo}
                        </label>
                      </div>
                      <div className="buttons flex h-full">
                        <button
                          disabled={isEditing}
                          onClick={(e) => handleEdit(item, item.id)}
                          className="disabled:bg-slate-500 bg-slate-800 transition-all hover:text-[16px] hover:bg-slate-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, item.id)}
                          className="bg-slate-800 hover:bg-slate-950 transition-all hover:text-[16px] p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
              }
              )) : (<div className="m-5 font-bold text-lg">All todos are completed, you can add more if you want..!</div>)) : (<div className="m-5 font-bold text-lg">No Todos to show, first add your todo..!</div>)}
        </div>
      </div>
    </>
  )
}

export default App
