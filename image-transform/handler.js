'use strict';
const sharp = require('sharp');

// module.exports.hello = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };

module.exports.imageTransform = async (event) => {

  // if (!event.body.startsWith('data:')) {
  //   return {
  //     statusCode: 400,
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Credentials': true,
  //       'Access-Control-Request-Headers': '*',
  //     },
  //     body: {
  //       'Error': 'Only Data URLs with prefixes are supported, e.g. data:image/jpeg;base64,'
  //     },
  //   };
  // }

  console.log('Event: ', event);

  // Extract the image data from the base64 encoded string
  const imageData = event.body.split(';base64,').pop()

  // Extract the image type from the base64 encoded string
  const imageTypeEndIndex = event.body.indexOf(';base64,')
  const imageType = event.body.slice(5, imageTypeEndIndex)
  // const imgBuffer = Buffer.from(updatedBody, "binary");
  const imgBuffer = Buffer.from(imageData, 'base64');


  // Use sharp to process the image
  let outputBuffer;
  try {
    outputBuffer = await sharp(imgBuffer)
      .negate()
      .toBuffer();

    // Construct response body with base64 header
    const image = `data:${imageType};base64,${outputBuffer.toString('base64')}`;

    // const dataUrlPrefix = event.queryStringParameters && event.queryStringParameters.dataurl ? 'data:image/png;base64,' : '';
    // const image = `${dataUrlPrefix}${outputBuffer.toString('base64')}`;

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
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Request-Headers': '*',
      },
      body: err,
    };
  }
};