const automl = require('@google-cloud/automl');
const fs = require('fs');
const path = require('path');
const agenda = require('agenda');
// TODO: slack to notify when the runner has finished and send a report

// Google Vision credentials - service account "rabbit-vision" id: 398b8940018c5c4fd58a0123482bc9dd5781ad8e
const projectId = 'onova-183307';
const computeRegion = 'us-central1';
const modelId = 'ICN6563895301822742528';
// const filePath = './for-sale.jpg';
const filePath = './not-for-sale.jpg';

// score threshold for Prediction of the created model
const scoreThreshold = '0.7';

// start job
// job has the path of the image (local path)

const keyfile = path.join(__dirname, 'Onova-398b8940018c.json');
const credentials = JSON.parse(fs.readFileSync(keyfile));

// Create client for prediction service.
const client = new automl.PredictionServiceClient({ credentials });

// Get the full path of the model.
const modelFullId = client.modelPath(projectId, computeRegion, modelId);

async function analyseImage(post) {
  // Read the image file for prediction.
  let image
  try {
    image = fs.readFileSync(filePath, 'base64');
  } catch (error) {
    console.error('could not read image');
    console.error(error);
  }

  const params = {
    score_threshold: scoreThreshold,
  };

  // Set the payload by giving the image and type of the file.
  const payload = {
    image: { imageBytes: image },
  };

  // params is additional domain-specific parameters.
  // currently there is no additional parameters supported.
  // https://googleapis.dev/nodejs/automl/latest/v1beta1.PredictionServiceClient.html#predict
  // const [response] = await client.predict({
  //   name: modelFullId,
  //   payload,
  //   params,
  // });

  const response = {
    payload: [
      {
        result: {
          annotationSpecId: '3784048431828303872',
          displayName: 'notforsale',
          classification: { score: 0.9999899864196777 },
          detail: 'classification',
        },
      },
    ],
  };

  const { result } = response.payload[0];

  const confident = result.classification.score > 0.7;

  if (!confident) {
    throw new Error({ ...result, confident});
  }

  return result;
}

analyseImage()
.then(res => {
    console.log(`Prediction results:`);
    console.log(`Predicted class name: ${res.displayName}`);
    console.log(`Predicted class score: ${res.classification.score}`);
  })
  .catch(err => {
    console.error(err);
    process.exitCode = 1;
  });
