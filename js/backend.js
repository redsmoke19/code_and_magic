'use strict';

(function() {

  window.load = function(onLoad, onError) {
    let URL = 'https://javascript.pages.academy/code-and-magick/data';
    let xhr = new XMLHttpRequest();

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

    xhr.open('GET', URL);
    xhr.send();
  }

  window.save = function(data, onLoad) {
    let URL = 'https://javascript.pages.academy/code-and-magick';
    let xhr = new this.XMLHttpRequest();

    xhr.addEventListener('load', function() {
      try {
        let data = JSON.parse(xhr.responseText);
        onLoad(data);
        alert('Form post success');
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

    xhr.open('POST', URL);
    xhr.send(data);
  }
})();