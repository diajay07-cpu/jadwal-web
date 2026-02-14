/* =========================
   GLOBAL STATE
========================= */
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = null;

const table = document.getElementById("taskTable");
const modal = document.getElementById("modal");

/* =========================
   STORAGE
========================= */
function saveStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* =========================
   RENDER TABLE
========================= */
function render() {
  const filter = document.getElementById("filter").value;
  table.innerHTML = "";

  tasks.forEach((t, i) => {
    if (filter !== "all" && t.status !== filter) return;

    table.innerHTML += `
      <tr>
        <td>
          <input type="checkbox"
            ${t.status === "done" ? "checked" : ""}
            onchange="toggleDone(${i})">
        </td>
        <td>${t.name}</td>
        <td>
          <span class="badge" style="background:${t.color}">
            ${t.type}
          </span>
        </td>
        <td>
          <span class="badge ${t.status}">
            ${t.status === "done" ? "Done" : "Working on it"}
          </span>
        </td>
        <td>
          ${t.start} – ${t.end} ⏰ ${t.time}
        </td>
        <td>
          <button onclick="editTask(${i})">✏</button>
          <button onclick="deleteTask(${i})">🗑</button>
        </td>
      </tr>
    `;
  });
}

/* =========================
   NEW TASK (FAB +)
========================= */
function newTask() {
  resetForm();
  openModal();
}

/* =========================
   SAVE TASK
========================= */
function saveTask() {
  const nameInput = document.getElementById("name");
  const typeInput = document.getElementById("type");
  const startInput = document.getElementById("start");
  const endInput = document.getElementById("end");
  const timeInput = document.getElementById("time");
  const statusInput = document.getElementById("status");

  if (nameInput.value.trim() === "") {
    alert("Nama kegiatan wajib diisi!");
    return;
  }

  const task = {
    name: nameInput.value.trim(),
    type: typeInput.value,
    start: startInput.value,
    end: endInput.value,
    time: timeInput.value,
    status: statusInput.value || "progress",
    color: randomColor()
  };

  if (editIndex === null) {
    tasks.push(task);
  } else {
    tasks[editIndex] = task;
  }

  saveStorage();
  render();
  closeModal();
}

/* =========================
   EDIT TASK
========================= */
function editTask(i) {
  editIndex = i;
  openModal();

  document.getElementById("name").value = tasks[i].name;
  document.getElementById("type").value = tasks[i].type;
  document.getElementById("start").value = tasks[i].start;
  document.getElementById("end").value = tasks[i].end;
  document.getElementById("time").value = tasks[i].time;
  document.getElementById("status").value = tasks[i].status;
}

/* =========================
   TOGGLE DONE
========================= */
function toggleDone(i) {
  tasks[i].status = tasks[i].status === "done" ? "progress" : "done";
  saveStorage();
  render();
}

/* =========================
   DELETE TASK
========================= */
function deleteTask(i) {
  if (confirm("Hapus kegiatan ini?")) {
    tasks.splice(i, 1);
    saveStorage();
    render();
  }
}

/* =========================
   MODAL CONTROL
========================= */
function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
  resetForm();
}

/* =========================
   RESET FORM
========================= */
function resetForm() {
  editIndex = null;
  document.getElementById("name").value = "";
  document.getElementById("type").value = "Party";
  document.getElementById("start").value = "";
  document.getElementById("end").value = "";
  document.getElementById("time").value = "";
  document.getElementById("status").value = "progress";
}

/* =========================
   UTILITIES
========================= */
function randomColor() {
  const colors = ["#e17055", "#0984e3", "#6c5ce7", "#00b894"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

/* =========================
   INIT
========================= */
render();
