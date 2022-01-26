
const form = document.getElementById("formdiv");
const input = document.getElementById("todoInput");

let inputError = document.getElementById("inputError");
let todosdiv = document.getElementById("todosdiv");

let todos = [];



// Limit till 10 resultat
const fetchTodos =  async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
  const data = await response.json();
  todos = data;
  printTodos();
}

fetchTodos();

// Validation ifall det är tomt eller inte
//#region InputValidationAndError

function isInputEmpty(){
  if(input.value.trim() === '' || input.value == null)
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

// Skapar Elementet som innehåller värden av todo objektet ifrån todos.
function createTodoElement(todo){

  let card = document.createElement("div");
  card.classList.add("todo");
  // Skapar paragrpahen ger den värdet och kollar ifall todon är klar eller inte. Lägger till css classen beroende på resultatet
  let paragraph = document.createElement("p");
  paragraph.innerHTML = todo.title;
  
  if(todo.completed == true)
  paragraph.classList.add("completedPara");

  let btnDiv = document.createElement("div");
  btnDiv.classList.add("btnDiv");

  let statusBtn = document.createElement("button");
  statusBtn.innerHTML = "O";
  statusBtn.classList.add("statusBtn");

  if(todo.completed == false)
  statusBtn.classList.add("unfinishedStatusBtn");
  else
  statusBtn.classList.add("completedStatusBtn");

  let delBtn = document.createElement("button");
  delBtn.innerHTML = "X";
  delBtn.classList.add("deleteBtn");

  if(todo.completed == false)
  delBtn.classList.add("hiddenBtn");

 

  
  delBtn.addEventListener('click', () => removeTodo(todo))
  statusBtn.addEventListener('click', () => completeTodo(todo, card))
  

  card.appendChild(paragraph);
  card.appendChild(btnDiv);

  btnDiv.appendChild(statusBtn);
  btnDiv.appendChild(delBtn);
  
  

  return card;
}
// Tar bort allt innehåll och skriver sedan ut allt innehåll. Kallar på createTodoElementet och skickar in todon.
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
      title: title,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {
    todos.unshift(data);
    printTodos();
  })
}

function removeTodo(inputTodo) {
  //Javascript check ifall todon är complete
  if(inputTodo.completed == true)
  {
    todos = todos.filter(todo => todo.id !== inputTodo.id)
  
    printTodos();
    fetch(`https://jsonplaceholder.typicode.com/todos/${inputTodo.id}`,
    { method: "DELETE" })
    .catch(error => console.error(error));

  }
  
 
}
// Kollar ifall todon är complete eller inte. Sätter värdet till det motsata och kollar sedan ifall todon är complete eller inte.
//  Sätter sedan olika css classer till olika element i "cardet"
function completeTodo(todo,card) {
  
  todo.completed = !todo.completed;
  if(todo.completed == true)
  {
    // refererar till deletebutton
    card.childNodes[1].childNodes[1].classList.remove("hiddenBtn");
    // refererar till statusButton
    card.childNodes[1].childNodes[0].classList.remove("unfinishedStatusBtn");
    card.childNodes[1].childNodes[0].classList.add("completedStatusBtn");
    // refererar till card paragrafen
    card.childNodes[0].classList.add("completedPara");
  }
  else{
    // refererar till deletebutton
    card.childNodes[1].childNodes[1].classList.add("hiddenBtn");
    // refererar till statusButton
    card.childNodes[1].childNodes[0].classList.add("unfinishedStatusBtn");
    card.childNodes[1].childNodes[0].classList.remove("completedStatusBtn");
    // refererar till card paragrafen
    card.childNodes[0].classList.remove("completedPara");
   

  }

}


// Kallas när submit knappen trycks ner
form.addEventListener("submit", e =>{
  // Kollar ifall det är tomt och isåfall kallar kallar på printError(), printError ändrar sedan texten 
  
  if(isInputEmpty())
  {
    printError();
    
  }
  else{
    clearErrors();
    postTodo(input.value);
    input.value = "";
  }
  e.preventDefault();
  
  
})
  