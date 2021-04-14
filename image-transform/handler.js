'use strict';
const sharp = require('sharp');

module.exports.imageTransform = async (event) => {

  // Check input is the correct format
  if (!event.body.startsWith('data:')) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Request-Headers': '*',
      },
      body: {
        'Error': 'Image must be encoded as a data URL.'
      },
    };
  }

  if (!event.body.startsWith('data:image')) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Request-Headers': '*',
      },
      body: {
        'Error': 'Only image files are supported.'
      },
    };
  }

  console.log('Event: ', event);

  // Extract the image data from the base64 encoded string
  const imageData = event.body.split(';base64,').pop()

  // Extract the image type from the base64 encoded string
  const imageTypeEndIndex = event.body.indexOf(';base64,')
  const imageType = event.body.slice(5, imageTypeEndIndex)

  // Create Buffer
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

    console.log('IMAGE OUTPUT:', image);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': imageType,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Request-Headers': '*',
      },
      body: image,
    };
  } catch (error) {
    console.log(`Error: ${error}`)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Request-Headers': '*',
      },
      body: error,
    };
  }
};