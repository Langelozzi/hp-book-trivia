from helpers import get_raw_html, format_question_data
from bs4 import BeautifulSoup

URL = 'https://triviawhizz.com/harry-potter/'

def extract_from_triviawhizz() -> list[dict]:
    html = get_raw_html(URL)
    soup = BeautifulSoup(html, 'html.parser')

    # Get all the question containers
    q_containers = soup.find_all('div', {'class': 'be-question'})

    questions = []
    for q in q_containers:
        # Get the actual question
        q_text_element = q.find('div', {'class': 'wp-block-cover'}).find('p')
        q_text = q_text_element.text

        # Get the answer
        a_text_element = q.find('div', {'class': 'be-answer', 'data-correct': 'true'}).find('p', {'class': 'be-answer-title'})
        a_text = a_text_element.text

        questions.append(format_question_data(q_text, a_text))
    
    print(f'Extracted {len(questions)} questions from {URL}')
    return questions


if __name__ == '__main__':
    extract_from_triviawhizz()