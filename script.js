// // function addTaskOnEnter(event) {
// //     if (event.key === "Enter") {
// //       var input = document.querySelector(".new-todo");
// //       var taskText = input.value.trim();

// //       if (taskText !== "") {
// //         // Crează un nou element li pentru task
// //         var newTask = document.createElement("li");
// //         newTask.innerHTML = `
// //           <div class="view">
// //             <input class="toggle" type="checkbox">
// //             <label>${taskText}</label>
// //             <button class="delete"></button>
// //           </div>`;

// //         // Adaugă elementul în lista de task-uri
// //         var todoList = document.querySelector(".todo-list");
// //         todoList.appendChild(newTask);

// //         // Resetarea valorii din input
// //         input.value = "";
// //       }
// //     }
// //   }

// //   document.addEventListener("keydown", addTaskOnEnter);

// //   function toggleTaskTextDecoration(event) {
// //     if (event.target.classList.contains("toggle")) {
// //       var label = event.target.nextElementSibling; // selectează următorul element (label) după checkbox
// //       label.style.textDecoration = event.target.checked ? "line-through" : "none";
// //       label.style.color = event.target.checked ? "#929292" : "#111"; // Culori diferite pentru bifat și debifat
// //     }
// //   }

// //   document.addEventListener("keydown", addTaskOnEnter);
// //   document.addEventListener("change", toggleTaskTextDecoration);

// //   document.addEventListener("DOMContentLoaded", function () {
// //     var toggleAllCheckbox = document.getElementById("toggle-all");
// //     var taskCheckboxes = document.querySelectorAll(".toggle");
  
// //     function toggleAllTasks() {
// //       var isAllChecked = toggleAllCheckbox.checked;
  
// //       taskCheckboxes.forEach(function (checkbox) {
// //         checkbox.checked = isAllChecked;
  
// //         // Emite eveniment de schimbare pentru fiecare checkbox
// //         var event = new Event("change");
// //         checkbox.dispatchEvent(event);
// //       });
// //     }
    
// //     toggleAllCheckbox.addEventListener("change", toggleAllTasks);
// //   });

// document.addEventListener("DOMContentLoaded", function () {
//     var toggleAllCheckbox = document.getElementById("toggle-all");
//     var taskCheckboxes = document.querySelectorAll(".toggle");
  
//     function toggleTaskTextDecoration(checkbox) {
//       var label = checkbox.nextElementSibling; // selectează următorul element (label) după checkbox
  
//       if (checkbox.checked) {
//         // Dacă este bifat, adaugă stilul de tăiere
//         label.style.textDecoration = "line-through";
//         label.style.color = "#929292"; // Culori diferite pentru bifat și debifat
//       } else {
//         // Dacă este debifat, elimină stilul de tăiere
//         label.style.textDecoration = "none";
//         label.style.color = "#111"; // Culori diferite pentru bifat și debifat
//       }
//     }
  
//     function toggleAllTasks() {
//       var isAllChecked = toggleAllCheckbox.checked;
  
//       taskCheckboxes.forEach(function (checkbox) {
//         checkbox.checked = isAllChecked;
  
//         // Aici, putem apela funcția pentru a gestiona stilul de tăiere
//         toggleTaskTextDecoration(checkbox);
//       });
//     }
  
//     function addTaskOnEnter(event) {
//       if (event.key === "Enter") {
//         var input = document.querySelector(".new-todo");
//         var taskText = input.value.trim();
  
//         if (taskText !== "") {
//           // Crează un nou element li pentru task
//           var newTask = document.createElement("li");
//           newTask.innerHTML = `
//             <div class="view">
//               <input class="toggle" type="checkbox">
//               <label>${taskText}</label>
//               <button class="delete"></button>
//             </div>`;
  
//           // Adaugă elementul în lista de task-uri
//           var todoList = document.querySelector(".todo-list");
//           todoList.appendChild(newTask);

//           // Resetarea valorii din input
//           input.value = "";
  
//           // Aici, putem apela funcția pentru a gestiona stilul de tăiere
//           toggleTaskTextDecoration(newTask.querySelector(".toggle"));
//         }
//       }
//     }

//     function updateItemCount() {
//       var uncheckedTasks = document.querySelectorAll('.todo-list li:not(.completed) .toggle:checked').length;
//       var itemCountElement = document.querySelector('.todo-count strong');
//       itemCountElement.textContent = uncheckedTasks;
//     }
  
//     document.addEventListener("change", function (event) {
//       if (event.target.classList.contains("toggle")) {
//         toggleTaskTextDecoration(event.target);
//       }
//     });
  
//     document.addEventListener("keydown", addTaskOnEnter);
//     toggleAllCheckbox.addEventListener("change", toggleAllTasks);

//      updateItemCount();
//   });

  
document.addEventListener("DOMContentLoaded", function () {
  var toggleAllCheckbox = document.getElementById("toggle-all");
  var taskCheckboxes = document.querySelectorAll(".toggle");

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
      
  }

  function toggleAllTasks() {
      var isAllChecked = toggleAllCheckbox.checked;

      taskCheckboxes.forEach(function (checkbox) {
          checkbox.checked = isAllChecked;
          toggleTaskTextDecoration(checkbox);
      });

      updateItemCount();
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
                      <button class="delete"></button>
                  </div>`;
              
              var todoList = document.querySelector(".todo-list");
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


  document.addEventListener("change", function (event) {
      if (event.target.classList.contains("toggle")) {
          toggleTaskTextDecoration(event.target);
      }
  });

  document.addEventListener("keydown", addTaskOnEnter);
  toggleAllCheckbox.addEventListener("change", toggleAllTasks);

  // Inițializarea numărului de iteme rămase la încărcarea paginii
  updateItemCount();

  // Adaugă gestionarea clicului pentru filtre
  var filterLinks = document.querySelectorAll('.filters a');
  filterLinks.forEach(function (link) {
      link.addEventListener('click', handleFilterClick);
  });
});
