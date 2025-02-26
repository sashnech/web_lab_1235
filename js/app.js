document.addEventListener("DOMContentLoaded", () => {
  let header = document.querySelector(".header div:nth-child(2)");
  let footer = document.querySelector(".footer div:nth-child(1)");
  [header.textContent, footer.textContent] = [footer.textContent, header.textContent];

  function calculateParallelogramArea(base, height) {
    return base * height;
  }

  let base = 10, height = 5;
  let result = calculateParallelogramArea(base, height);
  let mainBlock = document.querySelector(".main");
  let resultParagraph = document.createElement("p");
  resultParagraph.textContent = `Площа паралелограма: ${result}`;
  mainBlock.appendChild(resultParagraph);

  let textForm = document.createElement("textarea");
  let submitBtn = document.createElement("button");
  submitBtn.textContent = "Підрахувати слова";
  let block3 = document.querySelector(".main");
  block3.appendChild(textForm);
  block3.appendChild(submitBtn);

  submitBtn.addEventListener("click", () => {
    let text = textForm.value;
    let wordCount = text.trim().split(/\s+/).length;
    alert(`Кількість слів: ${wordCount}`);
    document.cookie = `wordCount=${wordCount}; path=/`;
  });

  let cookies = document.cookie.match(/wordCount=\d+/);
  if (cookies) {
    let wordCountValue = cookies[0].split("=")[1];
    if (confirm(`Збережена кількість слів: ${wordCountValue}. Натисніть ОК для очищення.`)) {
      document.cookie = "wordCount=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      alert("Cookies видалено.");
      location.reload();
    }
  }

  let sidebar = document.querySelector(".sidebar");
  sidebar.addEventListener("mouseout", () => {
    let newColor = prompt("Введіть колір фону для бокової панелі:");
    sidebar.style.backgroundColor = newColor;
    localStorage.setItem("sidebarBgColor", newColor);
  });
  let savedColor = localStorage.getItem("sidebarBgColor");
  if (savedColor) {
    sidebar.style.backgroundColor = savedColor;
  }

  let list = document.createElement("ol");

  for (let i = 1; i <= 5; i++) {
    let li = document.createElement("li");
    li.textContent = `Блок ${i}`;
    list.appendChild(li);

    li.addEventListener("click", () => {
      let input = document.createElement("input");
      input.type = "text";
      input.placeholder = "URL фонового зображення";

      let saveBtn = document.createElement("button");
      saveBtn.textContent = "Зберегти";

      let removeBtn = document.createElement("button");
      removeBtn.textContent = "Видалити";

      let container = document.createElement("div");
      container.appendChild(input);
      container.appendChild(saveBtn);
      container.appendChild(removeBtn);
      block3.appendChild(container);

      saveBtn.addEventListener("click", () => {
        let imageUrl = input.value;
        let targetElement = null;

        if (i === 1) targetElement = document.querySelector(".header");
        else if (i === 2) targetElement = document.querySelector(".sidebar");
        else if (i === 3) targetElement = document.querySelector(".main");
        else if (i === 4) targetElement = document.querySelector(".footer");
        else if (i === 5) targetElement = document.querySelector(".small-box");

        if (targetElement && targetElement.textContent.trim() !== "") {
          localStorage.setItem(`bgImage${i}`, imageUrl);
          targetElement.style.backgroundImage = `url(${imageUrl})`;
        }
      });

      removeBtn.addEventListener("click", () => {
        localStorage.removeItem(`bgImage${i}`);
        let targetElement = null;

        if (i === 1) targetElement = document.querySelector(".header");
        else if (i === 2) targetElement = document.querySelector(".sidebar");
        else if (i === 3) targetElement = document.querySelector(".main");
        else if (i === 4) targetElement = document.querySelector(".footer");
        else if (i === 5) targetElement = document.querySelector(".small-box");

        if (targetElement) {
          targetElement.style.backgroundImage = "none";
        }
      });
    });
  }

  block3.appendChild(list);

});
