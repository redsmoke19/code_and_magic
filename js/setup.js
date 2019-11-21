'use strict';

var setupBlock = document.querySelector('.setup');
setupBlock.classList.remove('hidden');

var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

var WIZARDS_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_LASTNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZADRS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZADRS_EYE = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZADRS_HAND = ['black', 'red', 'blue', 'yellow', 'green'];

// Получаем случайное число от 0 до n (где n - это длинна массива)
function randomInt(n) {
  return Math.floor(Math.random() * n);
}

// Получаем случайный элемент из массива
function randomElement(array) {
  return array[randomInt(array.length)];
}

// Создаем функцию которая будет генерировать определенное количесвто волшебников и записывать их в массив
function getWizards() {
  var wizardsArray = [];
  for (var i = 0; i <= 3; i++) {
    var wizard = {
      name: randomElement(WIZARDS_NAME) + ' ' + randomElement(WIZARDS_LASTNAME),
      coatColor: randomElement(WIZADRS_COLOR),
      eyesColor: randomElement(WIZADRS_EYE),
      handColor: randomElement(WIZADRS_HAND)
    };
    wizardsArray.push(wizard);
  }
  return wizardsArray;
}
var wizards = getWizards();

// Нахожу элементы на страницы
var similarListElement = document.querySelector('.setup-similar-list');
var documentTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Создаю функцию, которая создает волшебника из шаблона 
function getWizardsSimilar (wizardsArray) {
  var wizardElement = documentTemplate.cloneNode(true);
  var wizardName = wizardElement.querySelector('.setup-similar-label');
  wizardName.textContent = wizardsArray.name;
  var wizardColor = wizardElement.querySelector('.wizard-coat');
  wizardColor.style.fill = wizardsArray.coatColor;
  var wizardEye = wizardElement.querySelector('.wizard-eyes');
  wizardEye.style.fill = wizardsArray.eyesColor;
  return wizardElement;
}

// Создал фрагмент и в него записал всех созданных волшебников
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(getWizardsSimilar(wizards[i]));
}

// Передал фрагмент в котором храняться все волшебники в список для отрисовки их на странице
similarListElement.appendChild(fragment);
