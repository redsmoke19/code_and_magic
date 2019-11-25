'use strict';

var inputName = document.querySelector('.setup-user-name');
var setupBlock = document.querySelector('.setup');
var setupOpenBotton = document.querySelector('.setup-open');
var setupCloseButton = document.querySelector('.setup-close');
var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

// Валидация формы, а именно поля ввода имени input

function checkScript() {
    var forms = document.querySelectorAll('.novalidate');
    for (var i = 0; i < forms.length; i++) {
        forms[i].setAttribute('novalidate', true);
    }
    document.addEventListener('blur', function(evt) {
        var error = evt.target.validity;
        console.log(error);
    }, true);
}

checkScript();
// function checkScript() {
//     if (inputName.value == '') {
//         inputName.setCustomValidity('Это обязательное поле, пожалуйста заполните его');
//         document.querySelector('.error-message').innerHTML = inputName.validationMessage;
//         return false;
//     } else if (inputName.value.length < 2) {
//         inputName.setCustomValidity('Имя должно состоять минимум из двух символов');
//         document.querySelector('.error-message').innerHTML = inputName.validationMessage;
//         return false;
//     }
//     return true;
// }

// inputName.addEventListener('invalid', function(evt) {
//   if (this.validity.tooShort) {
//     this.setCustomValidity('Имя должно быть минимум из 2 символов');
//   } else if (this.validity.tooLong) {
//     this.setCustomValidity('Имя должно быть максимум 25 символов');
//   } else if (this.validity.valueMissing) {
//     this.setCustomValidity('Пожалуйтса, заполните это поле');
//   } else {
//     this.setCustomValidity('');
//   }
//   if (!this.checkValidity()) {
//     document.querySelector('.error-message').innerHTML = this.validationMessage;
//   }
// })

// Логира работы попапа и кода. Тут описывается логика открытия окна и его закрытие. Обработчики события существуют отдельно от кода, который описывает поведение попапа, это хорошая практика, потому что если это все смешать то логика работы попапа и логика обработки события будут перемешаны и функции станет читать сложно и не удобно редактировать.

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Проверяем, если поле ввода имени не активный элемент, то ESC работает, а если поле ввода имени активно, то клавишей ESC мы не можем закрыть окнно
function onPopupEscPress(evt) {
    if (document.activeElement !== inputName) {
        if (evt.keyCode === ESC_KEYCODE) {
            closePopup();
        }
    }
}

function openPopup() {
    setupBlock.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
}

function closePopup() {
    setupBlock.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
}

setupOpenBotton.addEventListener('click', function() {
    openPopup();
});

setupOpenBotton.addEventListener('keydown', function(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
        openPopup();
    }
});

setupCloseButton.addEventListener('click', function() {
    closePopup();
});

setupCloseButton.addEventListener('keydown', function(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
        closePopup();
    }
});

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
function getWizardsSimilar(wizardsArray) {
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