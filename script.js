
const form = document.getElementById("formdiv");
const input = document.getElementById("todoInput");
let inputError = document.getElementById("inputError");
let todosdiv = document.getElementById("todosdiv");
let todos = [];


fetch('todoJson.json')
  .then(res => res.json())
  .then(data => {
    todos = data;
    console.log(todos)
    console.log(todos[1]);  
})
.catch(err => console.log(err.message))


// Kanske ska använda den här?
  // const fetchTodos = async () => {
  //   const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  //   const data = await res.json()
  //   todos = data;
  
  //   listTodos();
  // }


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
  paragraph.innerHTML = todo;

  let delBtn = document.createElement("button");
  delBtn.innerHTML = "X";
  delBtn.classList.add("deleteBtn");

  card.appendChild(paragraph);
  card.appendChild(delBtn);


  return card;
}

todosdiv.appendChild(createTodoElement("hej"));


// Event när knappen trycks in
form.addEventListener("submit", e =>
{
  // Kollar ifall det är tomt och isåfall kallar kallar på printError() printError ändrar sedan texten 
  
  if(isInputEmpty())
  {
    printError();
    e.preventDefault();

  }
  else{
    clearErrors();
  }
  e.preventDefault();
  console.log("reee");
  
})
  