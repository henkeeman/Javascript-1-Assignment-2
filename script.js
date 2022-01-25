
const form = document.getElementById("formdiv");
const input = document.getElementById("todoInput");

let inputError = document.getElementById("inputError");
let todosdiv = document.getElementById("todosdiv");

let todos = [];


const fetchTodos =  async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await response.json();
  todos = data;
  console.log(todos)
  printTodos();
}

fetchTodos();

// Validation ifall det är tomt eller inte
//#region InputValidationAndError

function isInputEmpty(){
  if(input.value === '' || input.value == null)
  {return true;}
  return false;
}
function clearErrors(){
  inputError.innerText = "";
  input.classList.remove("isInvalid")
}
function printError(){
  inputError.innerText = "Cant be empty";
  input.classList.add("isInvalid")
}
//#endregion


function createTodoElement(todo){

  let card = document.createElement("div");
  card.classList.add("todo");

  let paragraph = document.createElement("p");
  paragraph.innerHTML = todo.title;

  let delBtn = document.createElement("button");
  delBtn.innerHTML = "X";
  delBtn.classList.add("deleteBtn");

  delBtn.addEventListener('click', () => removeTodo(todo.id, card))

  card.appendChild(paragraph);
  card.appendChild(delBtn);

  return card;
}

function printTodos(){
  todosdiv.innerHTML = "";
  todos.forEach(todo =>
    todosdiv.appendChild(createTodoElement(todo))
    
  );
}

const postTodo = (title) => {
  fetch("https://jsonplaceholder.typicode.com/todos",{
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title
    })
  })
  .then(res => res.json())
  .then(data => {
    todos.unshift(data);
    printTodos();
  })
}

function removeTodo(id, input) {
  todos = todos.filter(todo => todo.id !== id)
  
  printTodos();
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,
  { method: "DELETE" })
  .catch(error => console.error(error));
 
}


// Kallas när submit knappen trycks ner
form.addEventListener("submit", e =>{
  // Kollar ifall det är tomt och isåfall kallar kallar på printError(), printError ändrar sedan texten 
  e.preventDefault();
  if(isInputEmpty())
  {
    printError();
    e.preventDefault();
  }
  else{
    clearErrors();
    postTodo(input.value);
    input.value = "";
  }
  e.preventDefault();
  console.log("reee");
  
})
  