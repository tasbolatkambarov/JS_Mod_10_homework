// Задание 2.
// Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert.
// https://developer.mozilla.org/ru/docs/Web/API/Window/alert


const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
  alert(`Размер вашего экрана: ${screen.width} х ${screen.height} пикселей.`)
});