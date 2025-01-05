import requests


def get_raw_html(url) -> str:
    response = requests.get(url)
    return response.text


def format_question_data(question, answer, difficulty=None, book=None) -> dict:
    return {
        'q': question,
        'a': answer,
        'difficulty': difficulty,
        'book': book
    }