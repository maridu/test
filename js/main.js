// Стилизация выпадающих меню
$('.card__select').selecter( {
  mobile: true
});

// Сворачивание мобильного меню при клике на ссылку
var menuLinks = document.querySelectorAll('.navigation__link');

for (var i = 0; i < menuLinks.length; i++) {
  var menuLink = menuLinks[i];
  var menuToggle = document.querySelector('.navigation__toggle');
  menuLink.addEventListener('click', function() {
    menuToggle.checked = false;
  })
}

// Валидация формы

// Сохраняем в переменные
var cardForm = document.querySelector('.card__form');
var submitButton = document.querySelector('.card__button-pay');

// Поля, значения которых проверяем на валидность:
var fields = document.querySelectorAll('.card__input');
var cardNumber = document.querySelectorAll('.card__input-number');
var cardOwner = document.querySelector('.card__input-owner');
var cvv = document.querySelector('.card__input-cvv');

var regNumber = /^\d{4}$/; // проверка номера карты, 4 цифры
var regOwner = /^[a-zA-Z]{4,}$/; // проверка держателя карты, только латинские буквы, минимум 4 символа
var regCvv = /^\d{3}$/; // проверка CVV-кода, 3 цифры

/* По ТЗ условие прохождения валидации для поля держателя карты - только латинские буквы, минимум 4 символа, поэтому пробелы ("Имя Фамилия") в данном случае не предусматривались. Если предположить, что из 4-х символов имя должно содержать минимум 1, а дальше через пробел фамилия, регулярное выражения для проверки было бы /^[a-zA-Z]{1,}[a-zA-Z ]{3,}$/ */

/* Проверка соответствия значений полей заданным регулярным выражениям, при несоответствии добавляет полю класс error */
function isValid (input, reg) {
  if(!input.value.match(reg)) {
    input.classList.add('error');
  } 
}

// Проверка, есть ли в форме неправильно заполненные поля
function isAnyError(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].classList.contains('error')) {
      return true
    }
  }
  return false;
}

// Удаляет класс error при его наличии
function removeValidation(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].classList.contains('error')) {
      arr[i].classList.remove('error');
    }
  }
}

// При нажатии на кнопку "Отправить":
submitButton.addEventListener('click', function(evt) {
   
  evt.preventDefault(); // отменяем отправку формы по умолчанию
  
  removeValidation(fields); // удаляем класс error, если был ранее
  
  for (var i = 0; i < cardNumber.length; i++) {
    isValid(cardNumber[i], regNumber);
  } // проверяем валидность полей с номером карты
  
  isValid(cardOwner, regOwner); // проверяем валидность поля держателя карты
  
  isValid(cvv, regCvv); // проверяем валидность поля c CVV-кодом

  if(!isAnyError(fields)) {
    cardForm.submit();
  } // если в форме нет полей с классом error, отправляем форму
  
});

