from trivia_whizz import extract_from_triviawhizz
from helpers import write_data, get_data_file_path


def main():
    extractor_funcs = [
        extract_from_triviawhizz
    ]

    print(f'Starting data extraction from {len(extractor_funcs)} different sources...')

    q = []
    for func in extractor_funcs:
        data = func()
        q.extend(data)
    
    num_q = len(q)
    data_file = get_data_file_path()
    
    print(f'Successfully extracted {num_q} questions!')
    
    print(f'Writing {num_q} questions to {data_file}...')
    write_data(q)
    print(f'Successfully wrote {num_q} questions to {data_file}!')


if __name__ == '__main__':
    main()