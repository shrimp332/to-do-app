let taskItems = []
const itemContainer = document.getElementById("item-container")
const api = "/api"

function addToList(task) {
  let newItem = document.createElement("label")
  newItem.className = "list-item"
  let newInput = document.createElement("input")
  newItem.appendChild(newInput)
  newInput.type = "checkbox"
  newInput.setAttribute("onchange", "removeFromList(this)")
  let newSpan = document.createElement("span")
  newItem.appendChild(newSpan)
  newSpan.innerText = task
  newItem.setAttribute("href", "world")
  taskItems.push(newItem)
}

function addNewTask() {
  let taskInput = document.getElementById("task-input")
  if (taskInput.value === "")
    return
  addToList(taskInput.value)
  postItem(taskInput.value)
  taskInput.value = ""
  drawList()
}

function drawList() {
  itemContainer.innerHTML = ""
  taskItems.forEach(item => {
    itemContainer.appendChild(item)
  })
}

document.getElementById("task-input").addEventListener("keypress", (event) => {
  if (event.key === "Enter")
    addNewTask()
})

function removeFromList(element) {
  index = taskItems.indexOf(element.parentElement)
  deleteItem(taskItems[index].lastChild.innerText)
  taskItems.splice(taskItems.indexOf(element.parentElement), 1)
  drawList()
}

function getList() {
  taskItems = []
  fetch(api)
    .then((response) => response.json())
    .then((json) => {
      tasks = json.tasks
      tasks.forEach(item => { addToList(item); })
      drawList()
    });
}

function postItem(item) {
  fetch(api, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      task: item,
    })
  })
}
function deleteItem(item) {
  fetch(api, {
    method: "delete",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      task: item,
    })
  })
}
getList()
setInterval(getList, 1000)
