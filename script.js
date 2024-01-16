document.addEventListener("DOMContentLoaded", function () {
  var toggleAllCheckbox = document.getElementById("toggle-all");
  var taskCheckboxes = document.querySelectorAll(".toggle");
  var todoList = document.querySelector('.todo-list');

  function toggleTaskTextDecoration(checkbox) {
      var label = checkbox.nextElementSibling;
      var task = checkbox.closest('li');

      if (checkbox.checked) {
          label.style.textDecoration = "line-through";
          label.style.color = "#929292";
          task.setAttribute('data-status', 'completed');
      } else {
          label.style.textDecoration = "none";
          label.style.color = "#111";
          task.setAttribute('data-status', 'active');
      }

      updateItemCount();
      saveToLocalStorage();
  }

  function toggleAllTasks() {
      var isAllChecked = toggleAllCheckbox.checked;

      taskCheckboxes.forEach(function (checkbox) {
          checkbox.checked = isAllChecked;
          toggleTaskTextDecoration(checkbox);
      });

      updateItemCount();
  }

  function deleteTask(task) {
    task.remove();
    updateItemCount();
    saveToLocalStorage();
}


  function addTaskOnEnter(event) {
      if (event.key === "Enter") {
          var input = document.querySelector(".new-todo");
          var taskText = input.value.trim();

          if (taskText !== "") {
              var newTask = document.createElement("li");
              newTask.innerHTML = `
              <div class="view">
                  <input class="toggle" type="checkbox">
                  <label>${taskText}</label>
                  <button class="delete">x</button>
              </div>`;
          var deleteButton = newTask.querySelector('.delete');
          deleteButton.addEventListener('click', function () {
              deleteTask(newTask);
          });
              todoList.appendChild(newTask);
              input.value = "";

              toggleTaskTextDecoration(newTask.querySelector(".toggle"));
          }
      }
  }

  function updateItemCount() {
      var uncheckedTasks = document.querySelectorAll('.todo-list li:not(.completed) .toggle:not(:checked)').length;
      var itemCountElement = document.querySelector('.todo-count strong');
      itemCountElement.textContent = uncheckedTasks;
  }

  function filterTasksByStatus(status) {
      var tasks = document.querySelectorAll('.todo-list li');

      tasks.forEach(function (task) {
          if (status === 'all') {
              task.style.display = 'block';
          } else {
              var taskStatus = task.getAttribute('data-status');
              if (taskStatus === status) {
                  task.style.display = 'block';
              } else {
                  task.style.display = 'none';
              }
          }
      });
  }

  function handleFilterClick(event) {
      event.preventDefault();

      var filterLinks = document.querySelectorAll('.filters a');
      filterLinks.forEach(function (link) {
          link.classList.remove('selected');
      });

      var clickedLink = event.target;
      clickedLink.classList.add('selected');

      var filterStatus = clickedLink.getAttribute('data-filter');
      filterTasksByStatus(filterStatus);
  }

  function saveToLocalStorage() {
      var tasks = [];
      todoList.querySelectorAll('li').forEach(function (task) {
          var text = task.querySelector('label').innerText;
          var status = task.getAttribute('data-status') || 'active';
          var isChecked = task.querySelector('.toggle').checked;
          tasks.push({ text: text, status: status, isChecked: isChecked });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadFromLocalStorage() {
      var savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
          var tasks = JSON.parse(savedTasks);
          tasks.forEach(function (task) {
              var newTask = document.createElement("li");
              newTask.innerHTML = `
                  <div class="view">
                      <input class="toggle" type="checkbox">
                      <label>${task.text}</label>
                      <button class="delete">x</button>
                  </div>`;
                  var deleteButton = newTask.querySelector('.delete');
          deleteButton.addEventListener('click', function () {
              deleteTask(newTask);
          });
              newTask.setAttribute('data-status', task.status);
              todoList.appendChild(newTask);

              // Setăm starea bifată în funcție de informațiile salvate
              newTask.querySelector('.toggle').checked = task.isChecked;

              updateTaskUI(newTask);
          });
      }
  }

  function updateTaskUI(task) {
      var checkbox = task.querySelector('.toggle');
      toggleTaskTextDecoration(checkbox);
  }

  document.addEventListener("change", function (event) {
      if (event.target.classList.contains("toggle")) {
          toggleTaskTextDecoration(event.target);
      }
  });

  document.addEventListener("keydown", addTaskOnEnter);
  toggleAllCheckbox.addEventListener("change", toggleAllTasks);
  loadFromLocalStorage();
  updateItemCount();
  var filterLinks = document.querySelectorAll('.filters a');
  filterLinks.forEach(function (link) {
      link.addEventListener('click', handleFilterClick);
  });
});

