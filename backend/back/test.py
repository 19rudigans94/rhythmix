import requests

# # URL для регистрации
# url = "http://127.0.0.1:8000/api/v1/users/login/"

# # Данные для регистрации
# data = {
#     "user": {
#         "email": "sabina@gmail.com",
#         "username": "vassabiiш",
#         "password": "qwerty123"
#     }
# }

# response = requests.post(url, json=data)

# # Проверка и вывод результата
# if response.status_code == 200:  # Статус 201 обычно означает успешное создание
#     print("Пользователь успешно зарегистрирован:", response.json())
# else:
#     print("Ошибка регистрации:", response.status_code)
#     print("Текст ответа:", response.text)



# url = 'http://127.0.0.1:8000/api/v1/users/login/'

# data = {
#     'user' :{
#         'email': 'vassabi@gmail.com',
#         'password': '12345678',
#         'username': 'vassabi'
#     }
# }
# response = requests.post(url, json=data)

# if response.status_code == 200:  
#     print("Пользователь успешно авторизован:", response.json())
# else:
#     print("Ошибка авторизации:", response.status_code)
#     print("Текст ответа:", response.text)


# jwt_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZXhwIjoxNzMwOTA4NDkxfQ.LfHWHJD_f_o3x_6uxaxJ_a58mjn_ucyXNn_5CAuOkNk'


# url = 'http://172.28.0.245:8000/api/v1/import-track-spotify/'

# headers = {
#     'Authorization': f'Bearer {jwt_token}',
#     'Content-Type': 'application/json'  
# }

# data = {
#     'track_name': 'hahah'
# }

# response = requests.post(url, headers=headers, json=data)


# if response.status_code == 200:
#     print('Успешный импорт трека:', response.json())
# else:
#     print('Ошибка:', response.status_code, response.text)



url = 'http://127.0.0.1:8000/api/v1/track-search/'
jwt_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNzMxNjAwMzU5fQ.4grGSK9gJ4MYMEfFTR7QWnPPRrX3l1kjHw_gaRth4NQ'

headers = {
    'Authorization': f'Bearer{jwt_token}',
    'Content-Type': 'application/json'
}

data = {
    'track_name' : 'Ползать'
}


response = requests.post(url= url, headers=headers, json=data)

if response.status_code == 200:
    print('Успешный поиск трека:', response.json())
else:
    print('Ошибка:', response.status_code, response.text)  # 401 Unauthorized