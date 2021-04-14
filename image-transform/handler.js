'use strict';
const sharp = require('sharp');

const VALID_FORMATS = ['jpeg', 'png', 'gif', 'webp'];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Request-Headers': '*',
};

module.exports.imageTransform = async (event) => {

  // // Check input is the correct format
  if (!VALID_FORMATS.some(format => event.body.startsWith(`data:image/${format}`))) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: {
        'Error': 'Input must be an image, must be encoded as a data URL and be one of the following formats: jpeg, png, gif, webp.'
      },
    };
  }

  // Extract the content type from the base64 encoded string
  const imageTypeEndIndex = event.body.indexOf(';base64,')
  const imageType = event.body.slice(5, imageTypeEndIndex)

  // Extract the image data from the base64 encoded string
  const imageData = event.body.split(';base64,').pop()
  const imgBuffer = Buffer.from(imageData, 'base64');

  // Use sharp to process the image
  let outputBuffer;
  try {
    outputBuffer = await sharp(imgBuffer)
      .removeAlpha() // required for png files so they don't turn transparent when negated
      .negate()
      .toBuffer();

    // Construct response body with base64 header
    const image = `data:${imageType};base64,${outputBuffer.toString('base64')}`;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': imageType,
        ...CORS_HEADERS
      },
      body: image,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: error,
    };
  }
};