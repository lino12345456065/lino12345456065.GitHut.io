document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  // Función para crear un nuevo ítem de tarea
  function createTaskItem(taskText) {
    const li = document.createElement('li');
    li.className = 'task-item';

    const span = document.createElement('span');
    span.textContent = taskText;

    // Evento para marcar como completada
    span.addEventListener('click', () => {
      li.classList.toggle('completed');
    });

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    // Botón editar
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '✏️';
    editBtn.title = 'Editar';
    editBtn.addEventListener('click', () => {
      if (li.classList.contains('completed')) return; // no editar si está completada

      const input = document.createElement('input');
      input.type = 'text';
      input.value = span.textContent;
      input.className = 'edit-input';

      // Reemplaza el span por input temporalmente
      li.replaceChild(input, span);
      input.focus();

      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          finishEdit();
        }
      });

      input.addEventListener('blur', finishEdit);

      function finishEdit() {
        const newText = input.value.trim();
        if (newText !== '') {
          span.textContent = newText;
        }
        li.replaceChild(span, input);
      }
    });

    // Botón eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.title = 'Eliminar';
    deleteBtn.addEventListener('click', () => {
      li.remove();
    });

    // Agregar botones
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    return li;
  }

  // Añadir tarea
  addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
      const taskItem = createTaskItem(taskText);
      taskList.appendChild(taskItem);
      taskInput.value = '';
      taskInput.focus();
    }
  });

  // Soporte para Enter
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTaskBtn.click();
    }
  });
});
