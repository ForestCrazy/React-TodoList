import { useState, useEffect } from "react";
import React from "react";
import {
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const todos = localStorage.getItem("todos");

    if (todos) {
      return JSON.parse(todos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  const [currentTodo, setCurrentTodo] = useState(0);
  const [editTodo, setEditTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [basicModal, setBasicModal] = useState(false);

  const toggleEditTodoForm = () => setBasicModal(!basicModal);

  return (
    <div className="App">
      <MDBContainer>
        <div className="d-flex justify-content-center mt-1">
          <MDBInput
            label="create a new todo"
            type="text"
            name="todo"
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            value={todo}
          />
          <MDBBtn
            color="primary"
            onClick={() => {
              if (todo !== "") {
                setTodos([
                  ...todos,
                  {
                    id: todos.length + 1,
                    text: todo,
                  },
                ]);

                setTodo("");
              }
            }}
          >
            <MDBIcon icon="plus" fixed />
          </MDBBtn>
        </div>

        <MDBRow className="d-flex justify-content-center">
          <MDBCol md="6" className="mt-5">
            <MDBListGroup>
              {todos.map((todo) => (
                <MDBListGroupItem
                  key={todo.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  {todo.text}
                  <div>
                    <MDBIcon
                      icon="pencil-alt"
                      fixed
                      onClick={() => {
                        setBasicModal(!basicModal);
                        setCurrentTodo(todo.id - 1);
                        setEditTodo(todo.text);
                      }}
                    />
                    <MDBIcon icon="times-circle" fixed onClick={() => {
                      setCurrentTodo();
                      const removeTodo = todos.filter((todos) => {
                        return todos.id !== todo.id
                      });
                      setTodos(removeTodo);
                      }}/>
                  </div>
                </MDBListGroupItem>
              ))}
            </MDBListGroup>
          </MDBCol>
        </MDBRow>
        <MDBModal
          show={basicModal}
          getOpenState={(e: any) => setBasicModal(e)}
          tabIndex="-1"
        >
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Edit todo #{currentTodo + 1}</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleEditTodoForm}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput
                  type="text"
                  onChange={(e) => {
                    setEditTodo(e.target.value);
                  }}
                  value={editTodo}
                />
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={toggleEditTodoForm}>
                  Close
                </MDBBtn>
                <MDBBtn
                  onClick={() => {
                    if (editTodo !== '') {
                      todos[currentTodo].text = editTodo;
                      setBasicModal(!basicModal);
                    }
                  }}
                >
                  Save changes
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </MDBContainer>
    </div>
  );
}

export default App;
