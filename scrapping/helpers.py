import requests
import json
import os


def get_raw_html(url) -> str:
    response = requests.get(url)
    return response.text


def format_question_data(question, answer, difficulty=None, book=None) -> dict:
    return {
        'q': question,
        'a': answer,
        'difficulty': difficulty,
        'book': book,
        'duplicate': False
    }


def get_data_file_path(site_name: str) -> str:
    filename = f'{site_name}.json'
    script_dir = os.path.dirname(os.path.abspath(__file__))
    data_file_path = os.path.join(script_dir, '..', 'data', filename)
    return os.path.abspath(data_file_path)


def write_data(q, file_path):
    with open(file_path, 'w') as data_file:
        json.dump(q, data_file)