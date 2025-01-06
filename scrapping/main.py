from scrappers.trivia_whizz import extract_from_triviawhizz
from scrappers.science_of_people import extract_from_sop
from scrappers.buzzfeed import extract_from_buzzfeed170
from scrappers.today import extract_from_today
from helpers import add_new_field_w_default_value
import json


def add_field_to_file():
    filepath = '../data/individual/readersdigest.json', 'r'
    with open(filepath) as file:
        data = json.load(file)
        updated_data = add_new_field_w_default_value(data, 'flag', False)
    
    with open(filepath, 'w') as file:
        json.dump(updated_data, file)



def main():
    extractor_funcs = [
        extract_from_today
        # extract_from_buzzfeed170
        # extract_from_sop,
        # extract_from_triviawhizz
    ]

    print(f'Starting data extraction from {len(extractor_funcs)} different sources...')

    q = []
    for func in extractor_funcs:
        print('\n---')
        data = func()
        print('---\n')
        q.extend(data)


if __name__ == '__main__':
    main()