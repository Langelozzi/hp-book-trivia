from helpers import get_raw_html, format_question_data, get_data_file_path, write_data
from bs4 import BeautifulSoup

URL = 'https://www.today.com/life/inspiration/harry-potter-trivia-rcna138373'

def extract_from_today() -> list[dict]:
    print(f'Starting data extraction from "{URL}"...')

    html = get_raw_html(URL)
    soup = BeautifulSoup(html, 'html.parser')

    # Get all the question containers
    q_containers = soup.select('ul.body-list-el > li')

    questions = []
    for q in q_containers:
        text_parts = q.text.split('Answer:')
        
        # Get the actual question
        q_text = text_parts[0].strip()

        # Get the answer
        a_text = text_parts[1].strip()

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