import os
import json
from pathlib import Path

def get_individual_json_files(folder_path):
    # Get all JSON files in the specified folder
    return [f for f in folder_path.glob('*.json')]

def merge_json_files(json_files):
    # Initialize an empty list to hold all data
    merged_data = []
    
    for json_file in json_files:
        # Read each JSON file and append its content to the merged data
        with open(json_file, 'r') as f:
            data = json.load(f)
            merged_data.extend(data)  # Assuming each file contains a list of data
    
    return merged_data

def write_merged_data(merged_data, output_path):
    # Write the merged data to the output file
    with open(output_path, 'w') as f:
        json.dump(merged_data, f, indent=4)

def main():
    # Define the paths
    data_folder = Path(__file__).resolve().parent.parent / 'data' / 'individual'
    output_file = Path(__file__).resolve().parent.parent / 'data' / 'q.json'
    
    # Get all the JSON files in the 'individual' folder
    json_files = get_individual_json_files(data_folder)
    
    # Merge the JSON files into one list
    merged_data = merge_json_files(json_files)
    
    # Write the merged data to 'q.json'
    write_merged_data(merged_data, output_file)

    print(f"Successfully merged {len(json_files)} files into {output_file}")

if __name__ == "__main__":
    main()
