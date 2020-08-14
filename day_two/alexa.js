// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const https = require('https');
require('dotenv').config();

const analyzeText = (text) => {
  return new Promise((resolve, reject) => {
    var options = {
      host: 'gateway.watsonplatform.net',
      path: `${process.env.IBM_API_ROUTE}&text=${encodeURI(text)}`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: process.env.AUTH_TOKEN,
      },
    };

    const request = https.request(options, (response) => {
      response.setEncoding('utf8');
      let returnData = '';

      response.on('data', (chunk) => {
        returnData += chunk;
      });

      response.on('end', () => {
        resolve(JSON.parse(returnData));
      });

      response.on('error', (error) => {
        reject(error);
      });
    });
    request.end();
  });
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
    );
  },
  handle(handlerInput) {
    const speakOutput = 'Hello Eric, how has your day been so far?';
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt()
      .getResponse();
  },
};
const FeelingIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'FeelingIntent'
    );
  },
  async handle(handlerInput) {
    const text =
      handlerInput.requestEnvelope.request.intent.slots.feeling.value;
    const speakOutput = await analyzeText(text);

    const { tone_id } = speakOutput.document_tone.tones[0];
    if (tone_id === 'sadness') {
      return handlerInput.responseBuilder
        .speak(
          'I am so sorry to hear you are sad, is there any way I can help? Do you need me to call anyone?'
        )
        .reprompt()
        .getResponse();
    } else if (tone_id === 'tentative') {
      return handlerInput.responseBuilder
        .speak(
          "You don't sound very sure of yourself, are you sure everything is ok? Do you need to reach out to a friend?"
        )
        .reprompt()
        .getResponse();
    } else if (tone_id === 'confident') {
      return handlerInput.responseBuilder
        .speak(
          'Wow, it sounds like you had a very boosting day today! How is all of your at home treatment and medication? Have you noticed any abnormalities or symptoms that you would like to note?'
        )
        .reprompt()
        .getResponse();
    } else if (tone_id === 'joy') {
      return handlerInput.responseBuilder
        .speak(
          'I am so happy to hear you are happy. You are a warrior! How is your at home treatment and medication? Have you noticed any abnormalities or symptoms that you would like to note?'
        )
        .reprompt()
        .getResponse();
    } else if (tone_id === 'fear') {
      return handlerInput.responseBuilder
        .speak(
          'You sound very fearful, take a deep breath and talk me through what is going on. Is there anything I can do to help you immediately?'
        )
        .reprompt()
        .getResponse();
    } else if (tone_id === 'anger') {
      return handlerInput.responseBuilder
        .speak(
          'I am sorry you seem so angry. Do not let small things get in the way of your bigger goals, is there anything I can help with to calm you down?'
        )
        .reprompt()
        .getResponse();
    }
  },
};
const ReachOutIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'ReachOutIntent'
    );
  },
  handle(handlerInput) {
    const person =
      handlerInput.requestEnvelope.request.intent.slots.person.value;
    const speakOutput = `Ok, I will reach out to  ${person} immediately after our conversation!  How is your at home treatment and medication? Have you noticed any abnormalities or symptoms that you would like to note?`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt()
      .getResponse();
  },
};
const InterventionIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'InterventionIntent'
    );
  },
  handle(handlerInput) {
    const person =
      handlerInput.requestEnvelope.request.intent.slots.person.value;
    const speakOutput = `Ok, I have alerted the authorities that you are feeling suicidal. Please stay calm and stay put.`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt()
      .getResponse();
  },
};
const TreatmentLogIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'TreatmentLogIntent'
    );
  },
  handle(handlerInput) {
    const person =
      handlerInput.requestEnvelope.request.intent.slots.description.value;
    const speakOutput = `Ok, I will reach out to your doctor and make them aware of these symptoms. Is there anything else I can help you with regarding your treatment and medications?`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt()
      .getResponse();
  },
};
const MedicationLogIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        'MedicationLogIntent'
    );
  },
  handle(handlerInput) {
    const speakOutput =
      'It looks like your medication is due for a refill on November 23rd. Is there anything else I can help with?';
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt()
      .getResponse();
  },
};
const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent'
    );
  },
  handle(handlerInput) {
    const speakOutput = 'You can say hello to me! How can I help?';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt()
      .getResponse();
  },
};
const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        'AMAZON.CancelIntent' ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          'AMAZON.StopIntent')
    );
  },
  handle(handlerInput) {
    const speakOutput = 'Ok, Goodbye!';
    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      'SessionEndedRequest'
    );
  },
  handle(handlerInput) {
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse();
  },
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
    );
  },
  handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = `You just triggered ${intentName}`;

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`~~~~ Error handled: ${error.stack}`);
    const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    FeelingIntentHandler,
    ReachOutIntentHandler,
    InterventionIntentHandler,
    TreatmentLogIntentHandler,
    MedicationLogIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
