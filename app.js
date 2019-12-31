// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners(){
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // remove task event
  taskList.addEventListener('click', removeTask);
  // clear task event 
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks)
}
// Get task from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){

        // create li element
    const li = document.createElement('li');
    
    // Add class
    li.className = 'collection-item';
    
    // create text node and append to li
    li.appendChild(document.createTextNode(task));
    
    // create new link element
    const link = document.createElement('a');
    
    // Add class
    link.className = 'delete-item secondary-content';
    
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    
    // Append the link to li
    li.appendChild(link);
    
    // Append li to ul
    taskList.appendChild(li);

    });
}
// Add task
function addTask(e){
  if (taskInput.value === ''){
    alert('Add a task');

  }
  // create li element
  const li = document.createElement('li');
  
  // Add class
  li.className = 'collection-item';
  
  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  
  // create new link element
  const link = document.createElement('a');
  
  // Add class
  link.className = 'delete-item secondary-content';
  
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  
  // Append the link to li
  li.appendChild(link);
  
  // Append li to ul
  taskList.appendChild(li);

  // store in LS
  storeTaskInLocalStorage(taskInput.value);
  
  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}
// clear Tasks
function clearTasks() {
  // taskList.innerHTML ='';

  // faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // https://jsperf.com/innerhtml-vs-removechild

  // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage(){
  localStorage.clear();
}


// filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else {
      task.style.display = 'none';
    }
  });
}


