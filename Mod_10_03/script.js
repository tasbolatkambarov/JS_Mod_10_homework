// Задание 3.

// 1. Реализовать чат на основе эхо-сервера wss://echo.websocket.org/
//    Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
//    При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
//    Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат.
// 2. Добавить в чат механизм отправки гео-локации.
//    При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, не выводить.

const wsUri = "wss://echo.websocket.org/";

function pageLoaded() {
  const infoOutput = document.querySelector(".info_output");
  const output = document.querySelector(".output");
  const input = document.querySelector("input");
  const sendBtn = document.querySelector(".btn__send");
  
  let socket = new WebSocket(wsUri);
  
  socket.onopen = () => {
    infoOutput.innerText = "Соединение установлено";
  }
  
  socket.onmessage = (event) => {
    writeToChat(event.data, true);
  }
  
  socket.onerror = () => {
    infoOutput.innerText = "При передаче данных произошла ошибка";
  }
  
  sendBtn.addEventListener("click", sendMessage);
  
  function sendMessage() {
    if (!input.value) return;
    socket.send(input.value);
    writeToChat(input.value, false);
    input.value === "";
  }

  function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
    output.innerHTML += messageHTML;
  }

  // Geolocation

  const btnGeo = document.querySelector('.btn__geo');
  
  // Функция, выводящая текст об ошибке
  const error = () => {
    let messageHTML = `<div class="sent">Невозможно отправить ваше местоположение</div>`;
    output.innerHTML += messageHTML;
  }
  
  // Функция, срабатывающая при успешном получении геолокации
  const success = (position) => {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let messageHTML = `<div class="sent"><a href = https://www.openstreetmap.org/#map=18/${latitude}/${longitude} target="_blank">Геолокация</a></div>`;
    output.innerHTML += messageHTML;
  }
  
  btnGeo.addEventListener('click', () => {
    if (!navigator.geolocation) {
      let messageHTML = `<div class="sent">Geolocation не поддерживается вашим браузером</div>`;
      output.innerHTML += messageHTML;
    }
    else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  });

}

document.addEventListener("DOMContentLoaded", pageLoaded);