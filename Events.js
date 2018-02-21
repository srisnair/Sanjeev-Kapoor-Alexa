'use strict';

/**
 * This file contains all the events that we'll be
 * interested in outside of a normal intent.
 */

/**
 * Your skill will receive a NewSession event when a
 * session has been started on your skill. An example of this would be
 * when a user says "open skill blah blah blah".
 */
const NewSession = "NewSession";

/**
 * Your service receives a LaunchRequest when the user invokes the skill with the
 * invocation name, but does not provide any command mapping to an intent.
 * Refer to the following URL for documentation:
 * https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/handling-requests-sent-by-alexa#launchrequest
 */
const LaunchRequest = "LaunchRequest";

/**
 * Your service receives a SessionEndedRequest when a currently open session is closed.
 * https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/handling-requests-sent-by-alexa#sessionendedrequest
 */
const SessionEndedRequest = "SessionEndedRequest";

/**
 * Your skill will receive an Unhandled event when it receives an intent that
 * it has not registered for.
 */
const Unhandled = "Unhandled";

module.exports = {
    "NewSession": NewSession,
    "LaunchRequest": LaunchRequest,
    "SessionEndedRequest": SessionEndedRequest,
    "Unhandled": Unhandled
};