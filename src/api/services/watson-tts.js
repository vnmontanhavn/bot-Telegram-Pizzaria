'use strict';

const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

module.exports = {
  synthesize: (params, options) =>
    new Promise((resolve, reject) => {
      const textToSpeech = new TextToSpeechV1({
        authenticator: new IamAuthenticator({
          apikey: process.env.TTS_API_KEY,
        }),
        serviceUrl:
          'https://api.au-syd.text-to-speech.watson.cloud.ibm.com/instances/95aebc61-c722-469c-8bd0-8e60cf4b5542',
      });

      //   const synthesizeParams = {
      //     text: 'Hello world',
      //     accept: 'audio/wav',
      //     voice: 'en-US_AllisonV3Voice',
      //   };

      textToSpeech
        .synthesize(params)
        .then((response) => {
          // The following line is necessary only for
          // wav formats; otherwise, `response.result`
          // can be directly piped to a file.
          return textToSpeech.repairWavHeaderStream(response.result);
        })
        .then((buffer) => {
          fs.writeFileSync(`./voice_output_files/${options.filename}.wav`, buffer);
          resolve();
        })
        .catch((err) => {
          resolve(err);
        });
    }),
};