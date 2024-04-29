import { useState, useCallback, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoError, setTodoError] = useState("");
  const [clickEditItemId, setClickEditItemId] = useState(null);
  const [clickEdit, setClickEdit] = useState(false);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const savetoLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handelEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setClickEditItemId(id);
    setEditValue(todos.find((item) => item.id === id)?.todo || "");
    setClickEdit(true);


    // let index = todos.findIndex((item) => {
    //   return item.id === id;
    // });
    // let newTodos = todos.filter((item) => {
    //   return item.id !== id;
    // });
    // setTodos(newTodos);
    savetoLS();
  };

  const handleDelete = (e, id) => {
    // let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    savetoLS();
  };

  const handelAdd = () => {
    // check that input is empty or not
    if (todo.length <= 0) {
      setTodoError("Todo is required");
      return;
    }
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    savetoLS();
  };
  const handleOnEditChange = (e) => {
    setEditValue(e.target.value);
    

  };
  const saveEditTask = (id) => {
  
    const updatedList = todos.map((item) =>
      item.id === id ? { ...item, todo: editValue } : item
    );
    setTodos(updatedList);
    setClickEditItemId(null);
    setClickEdit(false);
    localStorage.setItem("todos", JSON.stringify(updatedList));
  };

  const handelChange = (e) => {
    if (e.target.value.length > 0) {
      setTodoError("");
    } else {
      setTodoError("Todo is required");
    }
    setTodo(e.target.value);
  };

  const handelCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    savetoLS();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl px-9 p-5 bg-violet-100 min-h-[80vh]">
        <div className="addTodo h-16 my-5 mb-8">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <div className="my-1">
            <input
              onChange={handelChange}
              value={todo}
              type="text"
              className="w-1/2 py-1"
              placeholder="Add todo..."
            />
            <button
              onClick={handelAdd}
              className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-6  "
            >
              Add
            </button>
          </div>
          <p className="text-red-700">{todoError}</p>
        </div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-3">No Todos to display</div>}
          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo flex w-2/4 my-3 justify-between"
              >
                <div className="flex gap-4">
                  <input
                    name={item.id}
                    onChange={handelCheckbox}
                    type="checkbox"
                    value={item.isCompleted}
                    
                  />
                  {/* <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div> */}
                  {/* <input value={item.todo} className={item.isCompleted ? "line-through" : ""} autoFocus/> */}
                  {clickEditItemId === item.id ? (
                        <div onDoubleClick={(e) => saveEditTask(item.id)}>
                          <input
                          
                            className={`${clickEdit
                              ? "border-2 border-red-400 rounded-md w-full"
                              : "outline-none"
                              }`}
                            value={editValue}
                            onChange={handleOnEditChange}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                saveEditTask(item.id);
                              }
                            }}
                            autoFocus
                          />
                          {/* {inError && (
                            <p className="text-red-500">Please enter data</p>
                          )} */}
                        </div>
                      ) : (
                        <span className={item.isCompleted ? "line-through" : ""}>{item.todo}</span>
                      )}
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => {
                      handelEdit(e, item.id);
                    }}
                    className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
