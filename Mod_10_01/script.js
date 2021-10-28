// Задание 1.
// Сверстайте кнопку, которая будет содержать в себе icon_01 (как в примере в последнем видео). При клике на кнопку иконка должна меняться на icon_02. Повторный клик меняет иконку обратно.


function pageLoaded() {
    const btn = document.querySelector(".btn");
    const btnOn = document.querySelector("#icon_on");
    const btnOff = document.querySelector("#icon_off");
    let isVisible = true;
  
    btn.addEventListener("click", clickEvent);
  
    function clickEvent() {
      if (isVisible) {
        btnOn.style.display = "none";
        btnOff.style.display = "inline";
      } else {
        btnOn.style.display = "inline";
        btnOff.style.display = "none";
      }
      isVisible = !isVisible;
      return isVisible;
    }
  }
  
  document.addEventListener("DOMContentLoaded", pageLoaded);