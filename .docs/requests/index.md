# Запросы

Возможно везде 500-ая ошибка, 403 - нет доступа

## 1 Получение информации о текущем пользователе (кратко)

### Method
GET

### Request

URL: `/api/me`

### Responce

```json
{
    "id": "string",
    "picture": "string",
    "name": "string",
    "email": "string",
    "level": "number",
    "role": "string роль в проекте PROJECT_ADMIN | PROJECT_USER",
    "pointsToLevelUp": "number",
    "points": "number",
    "project": {
        "id": "number",
        "name": "string"
    }
}
```

picture - аватар пользователя

Status: 

- 200 - ok

## 2 Получение ачивок пользователя

### Method
GET

### Request

URL: `/api/me/personal`

### Responce

```json
{
    "achievements": [
        {
            "id": "number",
            "name": "string",
            "description": "string",
            "points": "number"
        }
    ]
}
```

picture - аватар пользователя

Status: 

- 200 - ok

## 3 Получение картинки достижения

### Method
GET

### Request

URL: `/api/achievement/:id/picture`

### Responce

```json
{
    "picture": "string",
}
```

Status: 

- 200 - ok


## 4 Получение списка досок

### Method
GET

### Request

URL: `/api/project/:id/board` 

### Responce

```json
{
    "boards": [
        {
            "id": "number",
            "name": "string"
        }
    ]
}
```

Status: 

- 200 - ok

## 5 Получение информации о доске

### Method
GET

### Request

URL: `/api/board/:id` 

### Responce

```json
{
    "id": "name",
    "name": "string",
    "description": "string",
    "statuses": [
        {
            "id": "number",
            "name": "string",
            "order": "number"
        }
    ],
    "tasks": [
        {
            "id": "number",
            "name": "string",
            "statusId": "number",
            "storyPoints": "number",
            "executor": {
                "name": "string",
                "picture": "string"
            }
        }
    ]
}
```

Status: 

- 200 - ok

## 6 Выдача доступа к проекту

### Method
POST

### Request

URL: `/api/project/access`

```json
{
    "email": "string",
    "projectId": "number"
}
```

### Responce

Status: 

- 200 - ok

- 404 - не найден пользователь

## 7 Создание доски

### Method
POST

### Request

URL: `/api/board`

```json
{
    "projectId": "number",
    "name": "string",
    "description": "string"
}
```

### Responce

```json
{
    "boardId": "number",
    "name": "string",
    "description": "string"
}
```

Status:

- 200 - ok

## 8 Добавление статуса

### Method: 
POST

### Request

URL: `/api/board/:boardId/status`

```json
{
    "value": "string",
    "order": "number"
}
```

### Responce
```json
[
    {
        "id": "number",
        "value": "string"
    }
]
```

Status: 

- 200 - ok


## 9 Создание задачи

### Method: 
POST

### Request

URL: `/api/board/:boardId/task`

```json
{
    "name": "string",
    "description": "stirng",
    "storyPoints": "number",
    "executorEmail": "string",
}
```

### Responce
```json
{
    "id": "number",
    "name": "string",
    "description": "stirng",
    "storyPoints": "number",
    "status": "string название",
    "boardId": "number",
    "executor": {
        "name": "string",
        "picture": "string"
    }
}
```

Status: 

- 200 - ok

## 10 Получение задачи

### Method: 
GET

### Request

URL: `/api/task/:taskId`

### Responce
```json
{
    "id": "number",
    "name": "string",
    "description": "stirng",
    "status": "string название",
    "storyPoints": "number",
    "boardId": "number",
    "executor": {
        "name": "string",
        "picture": "string"
    }
}
```

Status: 

- 200 - ok

## 11 Изменение задачи

### Method: 
PUT

### Request

URL: `/api/task/:taskId`

```json
{
    "name": "string",
    "description": "stirng",
    "storyPoints": "number",
    "executorEmail": "string",
    "statusId": "number"
}
```

### Responce
```json
{
    "id": "number",
    "name": "string",
    "description": "stirng",
    "storyPoints": "number",
    "status": "string название",
    "boardId": "number",
    "executor": {
        "name": "string",
        "picture": "string"
    }
}
```

Status: 

- 200 - ok

## 12 Получение статусов

### Method: 
GET

### Request

URL: `/api/board/:boardId/taskstatuses`

### Responce
```json
[
    {
        "id": "number",
        "name": "string",
        "order": "number"
    }
]
```

Status: 

- 200 - ok

## 13 Создание ачивки

### Method: 
POST

### Request

URL: `/api/achievement`
```json
{
    "name": "string",
    "description": "string",
    "points": "number",
    "picture": "string"
}
```

### Responce
```json
{
    "id": "number",
    "name": "string",
    "description": "string",
    "points": "number"
}
```

Status: 

- 200 - ok

## 14 Выдача ачивки

### Method: 
POST

### Request

URL: `/api/achievement/:achievementId/assign`

```json
{
    "email": "string"
}
```

### Responce

Status: 

- 200 - ok

- 404 - пользователь не найден

## 15 Отобрать ачивку

### Method: 
POST

### Request

URL: `/api/achievement/:achievementId/deprive`

```json
{
    "email": "string"
}
```

### Responce

Status: 

- 200 - ok

- 400 - пользователь не имел ачивки

- 404 - пользователь не найден


## 16 Получение информации о проекте

### Request

Method: GET

URL: `/api/project/:projectId`

### Responce

```json
{
    "id": "number",
    "name": "string",
    "description": "string",
    "achievements": [
        {
            "id": "number",
            "name": "string",
            "description": "string",
            "points": "number"
        }
    ]
}
```

Status: 

- 200 - ok
