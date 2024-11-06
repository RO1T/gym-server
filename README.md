# Сервер для гиманстики

## Запуск API для разработки

Для начала создайте .env файл с нужными данными. (Postgres ДБ и почтовый хост)
Потом введите команды и сервер запустится.

go get .

go build

go install

health api

## Заметки по проекту

1. Нет обработчиков для таблицы users
2. Нет корректное добавление в таблицу stat. [statsController:44], а stat взаимодействуюет с таблицей users [statsController:69]