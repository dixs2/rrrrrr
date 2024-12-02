function newElement(tagName, options = {}) {
  const element = document.createElement(tagName);

  const { className, textContent, onclick, attributes } = options;

  if (className) {
    element.className = options.className;
  }
  if (textContent) {
    element.textContent = options.textContent;
  }
  if (attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

  return element;
}

function newElementList(options = {}) {
  const elementLi = newElement("li", { className: "to-do-list-content-item" });
  const elementDiv = newElement("div", {
    className: "to-do-list-content-item-content",
  });
  const elementButtonDel = newElement("button", {
    className: "to-do-list-content-item-button",
    attributes: { type: "button", onclick: "removeItem(this)" },
  });
  const elementCheckbox = newElement("input", {
    className: "to-do-list-content-item-content-checkbox",
    attributes: { type: "checkbox" },
  });
  const elementLabel = newElement("label", {
    className: "to-do-list-content-item-content-text",
  });
  const elementIcon = newElement("i", { className: "fa-solid fa-trash-can" });

  const { checkbox, id, text, data, isChecked } = options;

  if (id) {
    elementCheckbox.setAttribute("id", id);
    elementLabel.setAttribute("for", id);
  }
  if (text) {
    elementLabel.textContent = text;
  }
  if (isChecked) {
    elementCheckbox.classList =
      "to-do-list-content-item-content-checkbox active";
    elementLabel.classList = "to-do-list-content-item-content-text active";
  }
  elementLi.append(elementDiv, elementButtonDel);
  elementDiv.append(elementCheckbox, elementLabel);
  elementButtonDel.append(elementIcon);
  return elementLi;
}

function addNewTask(tasks) {
  const list = ul;
  list.innerHTML = "";

  tasks.forEach((task) => {
    const li = newElementList(task);

    list.append(li);
  });

  setDate();
}

function resultData() {
  const month = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  let data = String(new Date());
  data = data.split(" ");
  data = `${data[2]}.${month[data[1]]} ${data[4]}`;
  return data;
}

const ROOT = newElement("div", { className: "root" });
const divContainer = newElement("div", { className: "to-do-list-container" });
const divToDoList = newElement("div", { className: "to-do-list" });
const H3 = newElement("h3", {
  className: "to-do-list-title",
  textContent: "To Do List",
});
//........ФОРМА
const form = newElement("form", {
  className: "to-do-list-form",
  attributes: { name: "to-do-list" },
});
const divFormContent = newElement("div", {
  className: "to-do-list-form-content",
});
const inputText = newElement("input", {
  className: "to-do-list-form-input-text",
  attributes: { placeholder: "Add your text", type: "text" },
});
const buttonForm = newElement("button", {
  className: "to-do-list-form-input-button",
  textContent: "Add",
  attributes: { type: "submit" },
});

//// Список
const ul = newElement("ul", { className: "to-do-list-content" });
const liIndex0 = {
  id: resultData(),
  text: "Купить молоко",
  data: resultData(),
  isChecked: true,
};

const TODOS = getDate() ?? [liIndex0];

addNewTask(TODOS);

//Кнопки
const buttonWrap = newElement("div", {
  className: "to-do-list-button-wrap",
});
const buttonDelAll = newElement("button", {
  className: "to-do-list-button-delete-all",
  textContent: "Delete All",
});
const buttonDelX = newElement("button", {
  className: "to-do-list-button-delete-x",
  textContent: "X",
});

//Добавление в документ
document.body.append(ROOT);
ROOT.append(divContainer);
divContainer.append(divToDoList);
divToDoList.append(H3, form);
form.append(divFormContent);
divFormContent.append(inputText, buttonForm);
divToDoList.append(ul);
divToDoList.appendChild(buttonWrap);
buttonWrap.append(buttonDelX, buttonDelAll);

//События
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newLi = {
    id: resultData(),
    text: `${inputText.value}`,
    data: resultData(),
    isChecked: false,
  };

  TODOS.push(newLi);
  addNewTask(TODOS);
  inputText.value = "";
});

function removeItem(button) {
  const element = button.closest(".to-do-list-content-item");
  const elementId = element.firstChild.firstChild.id;

  element.remove();

  TODOS.forEach((element) => {
    if (element.id === elementId) {
      const elementIndex = TODOS.indexOf(element);
      TODOS.splice(elementIndex, 1);
    }
  });

  setDate();
}

ul.addEventListener("change", (event) => {
  event.target.classList.toggle("active");
  event.target.nextElementSibling.classList.toggle("active");
  const elementId = event.target.id;
  const elementClass = event.target.classList[1];

  console.log(elementClass);

  TODOS.forEach((element) => {
    if (element.id === elementId) {
      if (elementClass === "active") {
        element.isChecked = true;
      } else element.isChecked = false;
    }
  });

  setDate();
});

buttonDelAll.addEventListener("click", (event) => {
  let labelAll = document.querySelectorAll(
    ".to-do-list-content-item-content-text"
  );
  for (let key of labelAll) {
    const element = key.closest(".to-do-list-content-item");
    element.remove();
  }
  TODOS.splice(0, TODOS.length);

  setDate();
});

buttonDelX.addEventListener("click", (event) => {
  let labelActive = document.querySelectorAll(
    ".to-do-list-content-item-content-text.active"
  );

  for (let key of labelActive) {
    const element = key.closest(".to-do-list-content-item");
    const elementId = element.firstChild.firstChild.id;
    element.remove();
    TODOS.forEach((element) => {
      if (element.id === elementId) {
        const elementIndex = TODOS.indexOf(element);
        TODOS.splice(elementIndex, 1);
      }
    });
  }
  setDate();
});

//localStorage

function getDate() {
  return JSON.parse(localStorage.getItem("todos"));
}

function setDate() {
  return localStorage.setItem("todos", JSON.stringify(TODOS));
}
