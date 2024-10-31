// Подгрузили данные
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"
import * as data from "../helpers/default_data.json"

describe('Проверка формы логина и пароля', function () {

    beforeEach('Начало теста', function () { // Предпроверки
        cy.visit('/'); // Заходим на сайт
        cy.get(main_page.title).should('be.visible'); // Заголовок виден
        cy.get(main_page.title).contains('Форма логина'); // Заголовок содержит нужные нам слова
        cy.get(main_page.fogot_pass_btn).should('be.visible') // Кнопка "Забыл пароль" видна
          });

    afterEach('Конец теста', function () { // Постпроверки
        cy.get(result_page.close).should('be.visible'); // Крестик виден
           });

    it('Валидный логин и валидный пароль', function () { 
         cy.get(main_page.email).type(data.login); // Нашли поле ввода логина, ввели правильный логин
         cy.get(main_page.password).type(data.password); // Нашли поле ввода пароля, ввели правильный пароль
         cy.get(main_page.login_button).click(); // Нашли кнопку Войти, нажали
         cy.get(result_page.title).contains('Авторизация прошла успешно'); // Заголовок содержит нужные нам слова
     })

     it('Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // Нашли кнопку "Забыл пароль", нажали
        cy.get(recovery_password_page.title).should('be.visible'); // Заголовок виден
        cy.get(recovery_password_page.email).type(data.login); // Нашли поле ввода логина, ввели нужный логин
        cy.get(recovery_password_page.send_button).click(); // Нашли кнопку Отправить, нажали
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Заголовок содержит нужные нам слова
    })

    it('Валидный логин и невалидный пароль', function () {
        cy.get(main_page.email).type(data.login); // Нашли поле ввода логина, ввели правильный логин
        cy.get(main_page.password).type('axaxaxxaxaxa'); // Нашли поле ввода пароля, ввели неправильный пароль
        cy.get(main_page.login_button).click(); // Нашли кнопку Войти, нажали
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Заголовок содержит нужные нам слова
    })

    it('Невалидный логин и валидный пароль', function () {
        cy.get(main_page.email).type('axaxa@axaxa.ru'); // Нашли поле ввода логина, ввели неверный логин
        cy.get(main_page.password).type(data.password); // Нашли поле ввода пароля, ввели правильный пароль
        cy.get(main_page.login_button).click(); // Нашли кнопку Войти, нажали
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Заголовок содержит нужные нам слова
    })

    it('Наличие @ в логине', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // Нашли поле ввода логина, ввели логин без @
        cy.get(main_page.password).type(data.password); // Нашли поле ввода пароля, ввели правильный пароль
        cy.get(main_page.login_button).click(); // Нашли кнопку Войти, нажали
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Заголовок содержит нужные нам слова
    })

    it('Приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Нашли поле ввода логина, ввели логин с разным регистром
        cy.get(main_page.password).type(data.password); // Нашли поле ввода пароля, ввели правильный пароль
        cy.get(main_page.login_button).click(); // Нашли кнопку Войти, нажали
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Заголовок содержит нужные нам слова
    })
 }) 