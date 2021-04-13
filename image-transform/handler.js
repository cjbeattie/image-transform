'use strict';
// const { type } = require('node:os');
const sharp = require('sharp');

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.imageTransform = async (event) => {

  console.log(event);
  // const transformer = sharp()
  //   .negate()
  //   .toBuffer(function (err, outputBuffer, info) {
  //     // outputBuffer contains 200px high JPEG image data,
  //     // auto-rotated using EXIF Orientation tag
  //     // info.width and info.height contain the dimensions of the resized image
  //   });
  // readableStream.pipe(transformer);

  // Extract the image type from the base64 encoded string
  // const imageTypeEndIndex = event.body.indexOf(';base64,')
  // const imageType = event.body.slice(5, imageTypeEndIndex)
  // const headers = JSON.parse(event.headers);
  // console.log("*** obj is: ", obj);
  // const imageType = headers.content - type;

  const imageType = event.headers["Content-Type"];

  // Extract the image data from the base64 encoded string
  const imageData = event.body.split(';base64,').pop() // returns an array, ok?
  const imgBuffer = Buffer.from(imageData, 'base64');

  const outputBuffer = await sharp(imgBuffer)
    .negate()
    .toBuffer()
    .catch(err => console.log(`error: ${err}`))

  const image = `data:${imageType};base64,${outputBuffer.toString('base64')}`;
  // .then(data => {
  //   console.log('success: ', data)
  //   console.log(`data:image/png;base64,${data.toString('base64')}`)
  // })


  return {
    statusCode: 200,
    headers: {
      'Content-Type': imageType,
      // 'Content-Type': 'application/json',
      // 'Content-Type': 'image/jpeg',
    },
    body: image,
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};