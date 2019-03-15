# https://cloud.google.com/storage/docs/uploading-objects#storage-upload-object-nodejs

# https://developers.google.com/oauthplayground/

curl -X POST --data-binary @[OBJECT] \
    -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    -H "Content-Type: [OBJECT_CONTENT_TYPE]" \
    "https://www.googleapis.com/upload/storage/v1/b/[BUCKET_NAME]/o?uploadType=media&name=[OBJECT_NAME]"