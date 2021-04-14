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

  console.log(event);

  let updatedBody;
  if (event.isBase64Encoded) {
    updatedBody = Buffer.from(event.body, 'base64');
    console.log('*******Updated body: ', updatedBody);
  }

  // Extract image type from the request header
  const imageType = 'image/png';//event.headers["Content-Type"];

  // Extract the image data from the base64 encoded string
  //const imageData = updatedBody.split(';base64,').pop() // returns an array, ok?
  //const imgBuffer = Buffer.from(updatedBody, "binary");

  // Use sharp to process the image
  let outputBuffer;
  try {
    outputBuffer = await sharp(updatedBody)
      .negate()
      .toBuffer();


    const dataUrlPrefix = event.queryStringParameters && event.queryStringParameters.dataurl ? 'data:image/png;base64,' : '';
    const image = `${dataUrlPrefix}${outputBuffer.toString('base64')}`;

    console.log('IMAGE:', image);


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
  } catch (err) {
    console.log(`error: ${err}`)
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

  // Construct response body with base64 header
  // const image = `data:${imageType};base64,${outputBuffer.toString('base64')}`;

};