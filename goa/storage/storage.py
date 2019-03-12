from google.cloud import storage

def run_storage():
    client = storage.Client()
    # https://console.cloud.google.com/storage/browser/[bucket-id]/

    # bucket = client.get_bucket('goanalytics-data')

    # GET
    # blob = bucket.get_blob('Helloworld_Regulation.csv')
    # with open("test.csv", "wb") as file_obj:
        # blob.download_to_file(file_obj)

    # UPLOAD
    # blob2 = bucket.blob('upload_initiative.csv')
    # blob2.upload_from_filename(filename='dataset/initiative.csv')

    # DELETE
    # blob3 = bucket.blob('Helloworld_Initiative.csv')
    # blob3.delete()
