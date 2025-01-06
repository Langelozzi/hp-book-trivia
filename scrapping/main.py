from scrappers.trivia_whizz import extract_from_triviawhizz
from scrappers.science_of_people import extract_from_sop
from helpers import write_data


def main():
    extractor_funcs = [
        extract_from_sop
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