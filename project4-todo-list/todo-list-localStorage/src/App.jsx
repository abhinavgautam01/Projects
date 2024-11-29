import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  useEffect(() => {
    saveToLS();
  }, [todos]);


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      try {
        setTodos(JSON.parse(localStorage.getItem("todos")))
      } catch (error) {
        console.log("error :", error)
      }
    }
  }, [])

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }



  const saveToLS = (updatedTodos) => {
    if (updatedTodos) {
      localStorage.setItem("todos", JSON.stringify(updatedTodos))
    }
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(item => { return item.id === id });
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => { return item.id !== id });
    setTodos(newTodos)
    document.getElementById("adbtn").innerText = "Update"
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let c = confirm("Are you sure you want to delete your todo..?")
    if (c) {
      let updatedTodos = todos.filter(item => { return item.id !== id });
      setTodos(updatedTodos)
      saveToLS(updatedTodos)
    }
  }
  const handleAdd = () => {
    if (document.getElementById("adbtn").innerText === "Update") {
      document.getElementById("adbtn").innerText = "Add"
      const updatedTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      setTodos(updatedTodos);
      saveToLS(updatedTodos);
    }

    else {
      const updatedTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      setTodos(updatedTodos);
      saveToLS(updatedTodos);
    }
    setTodo("")
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }


  // const handleCheckbox = (e) => {
  //   let id = e.target.name
  //   let index = todos.findIndex(item => {
  //     return item.id === id
  //   })
  //   let newTodos = [...todos]
  //   newTodos[index].isCompleted = !newTodos[index].isCompleted
  //   setTodos(newTodos)
  //   saveToLS()

  // }

  const handleCheckbox = (e) => {
    const id = e.target.name; // Get the ID from the checkbox's name
    const updatedTodos = todos.map((item) =>
      item.id === id
        ? { ...item, isCompleted: !item.isCompleted } // Toggle the `isCompleted` flag
        : item
    );

    setTodos(updatedTodos); // Update the state with the modified todos
    saveToLS(updatedTodos); // Save updated todos to localStorage
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
            <button onClick={handleAdd} disabled={todo.length <= 3} id='adbtn' className='bg-slate-800 mx-2 rounded-full hover:bg-slate-950 disabled:bg-slate-500 p-4 py-2 text-sm font-bold text-white'>Add</button>
          </div>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-2xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length !== 0 ? (
            showFinished || todos.some((item) => !item.isCompleted) ? (
              todos.map((item) => {
                return (
                  (showFinished || !item.isCompleted) && (
                    <div key={item.id} className="todo flex justify-between my-3">
                      <div className="flex gap-5">
                        <input
                          name={item.id}
                          onChange={handleCheckbox}
                          type="checkbox"
                          checked={item.isCompleted}
                        />
                        <div className={item.isCompleted ? "line-through" : ""}>
                          {item.todo}
                        </div>
                      </div>
                      <div className="buttons flex h-full">
                        <button
                          onClick={(e) => handleEdit(e, item.id)}
                          className="bg-slate-800 hover:bg-slate-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, item.id)}
                          className="bg-slate-800 hover:bg-slate-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
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
