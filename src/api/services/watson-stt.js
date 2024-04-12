'use strict';

const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

module.exports = {
  recognize: (params) =>
    new Promise((resolve, reject) => {
      const speechToText = new SpeechToTextV1({
        authenticator: new IamAuthenticator({
          apikey: process.env.STT_API_KEY,
        }),
        serviceUrl:
          'https://api.au-syd.speech-to-text.watson.cloud.ibm.com/instances/bd39b238-1c6d-4c11-9fa4-55271dd60d9f',
      });

      //   const recognizeParams = {
      //     audio: fs.createReadStream(audio_path),
      //     contentType: 'audio/flac',
      //     wordAlternativesThreshold: 0.9,
      //     keywords: ['colorado', 'tornado', 'tornadoes'],
      //     keywordsThreshold: 0.5,
      //   };

      speechToText
        .recognize(params)
        .then((speechRecognitionResults) => {

          resolve(speechRecognitionResults.result.results[0]);
        })
        .catch((err) => {
          reject(err);
        });
    }),
};