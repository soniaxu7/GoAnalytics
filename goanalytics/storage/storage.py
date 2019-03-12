from google.cloud import storage

def run_storage():
    client = storage.Client()
    # https://console.cloud.google.com/storage/browser/[bucket-id]/
    bucket = client.get_bucket('goanalytics-data')
    # Then do other things...
    blob = bucket.get_blob('file.txt')
    print(blob.download_as_string())
    blob.upload_from_string('New contents!')
    blob2 = bucket.blob('storage.txt')
    blob2.upload_from_filename(filename='path.txt')
