from helpers import get_raw_html, format_question_data, get_data_file_path, write_data
from bs4 import BeautifulSoup

URL = 'https://www.today.com/life/inspiration/harry-potter-trivia-rcna138373'

def extract_from_today() -> list[dict]:
    print(f'Starting data extraction from "{URL}"...')

    html = get_raw_html(URL)
    soup = BeautifulSoup(html, 'html.parser')

    # Get all the question containers
    q_containers = soup.find_all('ul', {'class': 'body-list-el'}).find_all('li')

    questions = []
    for q in q_containers:
        # Get the actual question
        q_text_element = q.find('div', {'class': 'wp-block-cover'}).find('p')
        q_text = q_text_element.text

        # Get the answer
        a_text_element = q.find('div', {'class': 'be-answer', 'data-correct': 'true'}).find('p', {'class': 'be-answer-title'})
        a_text = a_text_element.text

        questions.append(format_question_data(q_text, a_text))
    
    num_q = len(questions)
    data_file = get_data_file_path('today')
    
    print(f'Success: Extracted {num_q} questions from "{URL}"')

    print(f'\nWriting {num_q} to {data_file}...')
    write_data(questions, data_file)
    print(f'Success: {num_q} questions written to {data_file}')
    
    return questions


if __name__ == '__main__':
    extract_from_today()