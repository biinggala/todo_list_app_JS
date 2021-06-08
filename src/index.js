// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const form = document.querySelector(".js-toDoForm"),
  input = form.querySelector("input"),
  list = document.querySelector(".js-list"),
  pList = document.querySelector(".js-pending__list"),
  fList = document.querySelector(".js-finished__list");

const P_TODOS_LS = "PENDING",
  F_TODOS_LS = "FINISHED";

let toDos1 = [];
let toDos2 = [];

function delToDo1(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pList.removeChild(li);
  const cleanToDos = toDos1.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });

  toDos1 = cleanToDos;
  saveToDo1();
}

function delToDo2(event) {
  const btn = event.target;
  const li = btn.parentNode;
  fList.removeChild(li);
  const cleanToDos = toDos2.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });

  toDos2 = cleanToDos;
  saveToDo2();
}

function finToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pList.removeChild(li);
  const finishedItems = toDos1.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });
  const cleanToDos = toDos1.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });

  toDos1 = cleanToDos;

  toDos2.push(finishedItems[0]);
  saveToDo1();

  const finished = finishedItems[0];
  const id = parseInt(li.id);
  const text = finished.text;

  paintToDo2(text, id);
  saveToDo2();
}

function undoToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  fList.removeChild(li);
  const undoItems = toDos2.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });
  const cleanToDos = toDos2.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });

  toDos2 = cleanToDos;
  saveToDo2();

  toDos1.push(undoItems[0]);

  const finished = undoItems[0];
  const id = parseInt(li.id);
  const text = finished.text;

  paintToDo3(text, id);
  saveToDo1();
}

function saveToDo1() {
  localStorage.setItem(P_TODOS_LS, JSON.stringify(toDos1));
}
function saveToDo2() {
  localStorage.setItem(F_TODOS_LS, JSON.stringify(toDos2));
}

function paintToDo1(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const penBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", delToDo1);
  penBtn.innerText = "✅";
  penBtn.addEventListener("click", finToDo);
  const span = document.createElement("span");
  const newId = crypto.getRandomValues(new Uint32Array(1))[0];
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(penBtn);
  li.id = newId;
  pList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos1.push(toDoObj);
  saveToDo1();
}

function paintToDo2(text, id) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const penBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", delToDo2);
  penBtn.innerText = "👆";
  penBtn.addEventListener("click", undoToDo);
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(penBtn);
  li.id = id;
  fList.appendChild(li);
}

function paintToDo3(text, id) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const penBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", delToDo1);
  penBtn.innerText = "✅";
  penBtn.addEventListener("click", finToDo);
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(penBtn);
  li.id = id;
  pList.appendChild(li);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintToDo1(currentValue);
  input.value = "";
}

function loadToDos1() {
  const loadedToDos = localStorage.getItem(P_TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo1(toDo.text);
    });
  }
}

function loadToDos2() {
  const loadedToDos = localStorage.getItem(F_TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo2(toDo.text, toDo.id);
    });
  }
}

function init() {
  loadToDos1();
  loadToDos2();
  form.addEventListener("submit", handleSubmit);
}

init();
