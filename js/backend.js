'use strict';

(function() {
  let URL = 'https://javascript.pages.academy/code-and-magick/data';
  let xhr = new XMLHttpRequest();
  window.load = function(onLoad, onError) {
    xhr.addEventListener('load', function() {
      try {
        let data = JSON.parse(xhr.responseText);
        onLoad(data);
      } catch (error) {
        onError(error);
      }
    });
    xhr.addEventListener('error', function() {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function() {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  }

  xhr.open('GET', URL);
  xhr.send();
})();