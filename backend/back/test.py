# import requests 

# url = 'http://127.0.0.1:8000/api/v1/users/login/'

# data = {
#     "user": {
#         "email": "sabina@mail.ru",
#         "password": "qwertyui"
#     }
# }

# response = requests.post(url, json=data)


# if response.status_code == 200:
#     print("Успешный вход:", response.json())
# else:
#     print("Ошибка входа:", response.status_code, response.text)


import requests 

url = 'http://127.0.0.1:8000/api/v1/import-track-spotify/'

data = {
    "track_name": "78 flow"
}

headers = {
    'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNzMxMDc4NTI3fQ.CZ4A-8MZTdZ8-_xh0Mv5IyH0nHM4OzMrrvqYEpfszUQ',
    'Content-Type': 'application/json'  
}

response = requests.post(url, json=data, headers=headers)


if response.status_code == 200:
    print("Успешный запрос:", response.json())
else:
    print("Ошибка запроса:", response.status_code, response.text)

