# Image Transformer

## Endpoint
[POST] https://grxe35576l.execute-api.us-east-1.amazonaws.com/dev/imageTransform

Performs a simple colour inversion on the image. Accepts one image as a base64-encoded data URL. Supported image formats are .jpeg, .png, webp, .gif (static).

Response is a base64-encoded data URL with the transformed image in the same format as the original.

## Test app
https://cjbeattie.github.io/image-transform/test-app/index.html

(supports multiple file uploads)