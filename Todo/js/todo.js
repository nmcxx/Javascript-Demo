var input = document.getElementById("txtTodoName");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      let text = input.value.trim();
      if(text=='')
      {
        return;
      }

      Todo(text);
      console.log(text);

      input.value = '';
      input.focus();
    }
  });

  let todoItems = [];

  function Todo(text){
    const todo = {
      text,
      checked: false,
      id: Date.now()
    };

    todoItems.push(todo);
    saveStorage();
    loadTodo(todo);
  }

  function loadTodo(todo)
  {
    // localStorage.setItem('todoItems', JSON.stringify(todoItems))

    let li = document.createElement("li");
    // li.setAttribute("id", todo.id);
    li.id = todo.id;
    document.getElementById("todoList").appendChild(li);

    let checked = todo.checked == true ? "checked" : "";

    li.innerHTML = `
    <input id="${todo.id}" type="checkbox" ${checked}>
    <span>${todo.text}</span>
    <button onclick="deleteTodo(${todo.id})">Xoá</button>`;
  }

  function deleteTodo(id)
  {
      let todo = document.getElementById(id);
      todo.parentNode.removeChild(todo);

      todoItems = todoItems.filter(item => item.id !== Number(id));
      saveStorage();
  }

  function saveStorage()
  {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
  }

  function loadStorage()
  {
    return localStorage.getItem('todoItems');
  }

  document.addEventListener('DOMContentLoaded', () =>{
    const ref = loadStorage();
    if(ref)
    {
      todoItems = JSON.parse(ref);
      todoItems.forEach(element => {
        loadTodo(element);
      });
    }
  });



