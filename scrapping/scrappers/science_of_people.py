from helpers import get_raw_html, format_question_data, get_data_file_path, write_data
from bs4 import BeautifulSoup

URL = 'https://www.scienceofpeople.com/harry-potter-trivia/'

def extract_from_sop() -> list[dict]:
    print(f'Starting data extraction from "{URL}"...')

    html = get_raw_html(URL)
    soup = BeautifulSoup(html, 'html.parser')

    # Get all the question containers
    q_containers = soup.find_all('ol', {'class': 'wp-block-list', 'start': True})

    questions = []
    for q in q_containers:
        # Get the actual question
        q_text_element = q.find('li')
        q_text = q_text_element.text

        # Get the answer
        a_text_element = q.find_next_sibling()
        a_text = a_text_element.text

        questions.append(format_question_data(q_text, a_text))
    
    num_q = len(questions)
    data_file = get_data_file_path('scienceofpeople')
    
    print(f'Success: Extracted {num_q} questions from "{URL}"')

    print(f'\nWriting {num_q} to {data_file}...')
    write_data(questions, data_file)
    print(f'Success: {num_q} questions written to {data_file}')
    
    return questions


if __name__ == '__main__':
    extract_from_sop()