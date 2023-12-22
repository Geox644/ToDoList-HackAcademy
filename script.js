// function addTaskOnEnter(event) {
//     if (event.key === "Enter") {
//       var input = document.querySelector(".new-todo");
//       var taskText = input.value.trim();

//       if (taskText !== "") {
//         // Crează un nou element li pentru task
//         var newTask = document.createElement("li");
//         newTask.innerHTML = `
//           <div class="view">
//             <input class="toggle" type="checkbox">
//             <label>${taskText}</label>
//             <button class="delete"></button>
//           </div>`;

//         // Adaugă elementul în lista de task-uri
//         var todoList = document.querySelector(".todo-list");
//         todoList.appendChild(newTask);

//         // Resetarea valorii din input
//         input.value = "";
//       }
//     }
//   }

//   document.addEventListener("keydown", addTaskOnEnter);

//   function toggleTaskTextDecoration(event) {
//     if (event.target.classList.contains("toggle")) {
//       var label = event.target.nextElementSibling; // selectează următorul element (label) după checkbox
//       label.style.textDecoration = event.target.checked ? "line-through" : "none";
//       label.style.color = event.target.checked ? "#929292" : "#111"; // Culori diferite pentru bifat și debifat
//     }
//   }

//   document.addEventListener("keydown", addTaskOnEnter);
//   document.addEventListener("change", toggleTaskTextDecoration);

//   document.addEventListener("DOMContentLoaded", function () {
//     var toggleAllCheckbox = document.getElementById("toggle-all");
//     var taskCheckboxes = document.querySelectorAll(".toggle");
  
//     function toggleAllTasks() {
//       var isAllChecked = toggleAllCheckbox.checked;
  
//       taskCheckboxes.forEach(function (checkbox) {
//         checkbox.checked = isAllChecked;
  
//         // Emite eveniment de schimbare pentru fiecare checkbox
//         var event = new Event("change");
//         checkbox.dispatchEvent(event);
//       });
//     }
    
//     toggleAllCheckbox.addEventListener("change", toggleAllTasks);
//   });

document.addEventListener("DOMContentLoaded", function () {
    var toggleAllCheckbox = document.getElementById("toggle-all");
    var taskCheckboxes = document.querySelectorAll(".toggle");
  
    function toggleTaskTextDecoration(checkbox) {
      var label = checkbox.nextElementSibling; // selectează următorul element (label) după checkbox
  
      if (checkbox.checked) {
        // Dacă este bifat, adaugă stilul de tăiere
        label.style.textDecoration = "line-through";
        label.style.color = "#929292"; // Culori diferite pentru bifat și debifat
      } else {
        // Dacă este debifat, elimină stilul de tăiere
        label.style.textDecoration = "none";
        label.style.color = "#111"; // Culori diferite pentru bifat și debifat
      }
    }
  
    function toggleAllTasks() {
      var isAllChecked = toggleAllCheckbox.checked;
  
      taskCheckboxes.forEach(function (checkbox) {
        checkbox.checked = isAllChecked;
  
        // Aici, putem apela funcția pentru a gestiona stilul de tăiere
        toggleTaskTextDecoration(checkbox);
      });
    }
  
    function addTaskOnEnter(event) {
      if (event.key === "Enter") {
        var input = document.querySelector(".new-todo");
        var taskText = input.value.trim();
  
        if (taskText !== "") {
          // Crează un nou element li pentru task
          var newTask = document.createElement("li");
          newTask.innerHTML = `
            <div class="view">
              <input class="toggle" type="checkbox">
              <label>${taskText}</label>
              <button class="delete"></button>
            </div>`;
  
          // Adaugă elementul în lista de task-uri
          var todoList = document.querySelector(".todo-list");
          todoList.appendChild(newTask);
  
          // Resetarea valorii din input
          input.value = "";
  
          // Aici, putem apela funcția pentru a gestiona stilul de tăiere
          toggleTaskTextDecoration(newTask.querySelector(".toggle"));
        }
      }
    }
  
    document.addEventListener("change", function (event) {
      if (event.target.classList.contains("toggle")) {
        toggleTaskTextDecoration(event.target);
      }
    });
  
    document.addEventListener("keydown", addTaskOnEnter);
    toggleAllCheckbox.addEventListener("change", toggleAllTasks);
  });
  
