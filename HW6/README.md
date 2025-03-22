### Домашнее задание 6. "Защита CRUD-операций для товаров и категорий на сервере посредством авторизации с использованием JWT"

Структура проекта:
```
HW6/
├── backend/
├── frontend/
├── docker-compose.yml
├── init.sql
└── README.md
```

Для запуска проекта необходимо **два раза** выполнить в корневой папке (HW6) команду:
```
docker-compose up --build -d
```

После запуска проект доступен по http://localhost:3000
___
В базе данных хранится два пользователя:
* name: 'user', email: 'user@example.com', password: 'qwertyuiop', role: 'user'. Может только просматривать товары и категории
* name: 'admin', email: 'admin@example.com', password 'qwertyuiop', role: 'admin'. Может просматривать/добавлять/редактировать/удалять товары и категории