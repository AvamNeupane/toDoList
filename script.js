let tasks = [];

function showPriorityOptions() {
  document.getElementById('priorityDropdown').style.display = 'inline';
  document.querySelector('.enterButton').style.display = 'inline';
  document.querySelector('.enterButton').setAttribute('onclick', 'addTask()');
}

function addTask() {
  let taskInput = document.getElementById('task');
  let dateInput = document.getElementById('date');
  let taskText = taskInput.value;
  let taskDate = dateInput.value;
  let priority = document.getElementById('priorityDropdown').value;

  let task = {
    text: taskText,
    date: taskDate,
    completed: false,
    priority: priority,
  };

  if (priority === 'high') {
    tasks.unshift(task);
  } else {
    tasks.push(task);
    //Had to look online for help with this, the priority shift was hard to do, but I figured it out
  }

  taskInput.value = '';
  dateInput.value = '';

  loadTasks();
}

function loadTasks() {
  let listOfTasks = document.getElementById('task-list');
  listOfTasks.innerHTML = '';

  tasks.forEach(function(task, index) {
    let taskItem = document.createElement('li');
    let priorityText = task.priority === 'high' ? 'High Priority' : 'Low Priority';
    taskItem.textContent = `${task.text} - Date: ${task.date} - ${priorityText}`;

    if (task.completed) {
      taskItem.style.color = 'limegreen';
    }
    //Instead of styling in css I did it in here to make it easier for myself

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Remove';
    deleteButton.addEventListener('click', function() {
      deleteTask(index);
    });

    taskItem.appendChild(deleteButton);

    taskItem.addEventListener('click', function() {
      toggleTask(index);
    });

    listOfTasks.appendChild(taskItem);
  });
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  loadTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  loadTasks();
}

loadTasks();
