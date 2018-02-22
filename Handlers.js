'use strict';

const messages = require('./Messages');
const intents = require('./Intents');
const events = require('./Events');
const recipeDetails = require('./RecipeDetails');
var fs = require('fs');
var ssml = require('ssml-builder');
const cardTitle = "Sanjeev Kapoor Recipes";
var limit = 4;
const imageObj = {
    smallImageUrl: "https://s3.amazonaws.com/jetairways/Alexa-Card-image-720x480.png",
    largeImageUrl: "https://s3.amazonaws.com/jetairways/Alexa-Card-image-1200x800.png"
};

//Global Variables
var currentContext = [];
var currentObj = {};
var intentRequest = [];


/**
 * This is the handler for the NewSession event.
 * Refer to the  events.js file for more documentation.
 */
const newSessionRequestHandler = function() {
    console.info("Starting newSessionRequestHandler()");
    if (this.event.request.type === "LaunchRequest") {
        currentContext.push("LaunchRequest");
        console.log("inside LaunchRequest");
        this.emit(events.LaunchRequest);
    } else if (this.event.request.type === "IntentRequest") {
        currentContext.push(this.event.request.intent.name);
        console.log("inside IntentRequest");
        this.emit(this.event.request.intent.name);
    } else {
        console.log("inside Unhandled Request");
        this.emit(events.Unhandled);
    }
    console.info("Ending newSessionRequestHandler()");
};


const launchRequestHandler = function() {
    console.log('inside launch request handler');
    if (currentContext[currentContext.length - 1] == "LaunchRequest") {
        currentContext.push("WelcomeIntent");
        console.log(currentContext);
        var speech = new ssml();
        speech.say('Welcome to Sanjeev Kapoor. Get your favorite recipes from the most celebrated face of Indian cuisine.');
        speech.pause('0.2s');
        speech.say('say the word help anytime and I’ll be there to guide you.”');
        speech.pause('0.2s');
        speech.say('You can get details of our top recipes by saying the recipe name, for example Biryani, or by saying the recipe ingredients, for example Chicken');
        speech.pause('0.2s');
        speech.say('What would you like to make today?”');
        var speechOutput = speech.ssml(true);
        this.emit(":ask", speechOutput, speechOutput);
    } else {
        this.emit(':ask', 'Please tell me one main ingredient name like, Potato or Paneer or a recipe name like ‘Aloo Masala Chat’  or ’Palak Paneer’ etc.? So, what would you like?');

    }

    console.info("Ending launchRequestHandler()");

};

const userRepeatRecipeNameHandler = function() {
    currentObj = this;
    console.log(currentObj);
    console.log(currentObj.event.session);
    currentObj.attributes['currentRecipeName'] = currentObj.event.request.intent.slots.recipeName.value;
    console.log(currentObj.attributes['currentRecipeName'].toString());
    console.log('Inside userRepeatRecipeNameHandler');
    currentContext.push("userRepeatRecipeNameHandler");
    recipeDetails.getRecipeDetails(currentObj, function(recipeData) {
        currentObj.emit(':ask', recipeData.RecipeName + ', ' + recipeData.Description + '. It takes ' + recipeData.PrepTime + ' to prepare and' + recipeData.Cooktime + ' to cook. It can be served to' + recipeData.Serve + ' people. Do you want to hear the ingredients or go back to recipe options? ');
    });
    console.log(currentContext);
}


const hearSearchedRecipes = function() {
    currentObj = this;
    console.log(currentObj);
    console.log(currentObj.event.session.sessionId);
    console.log('Inside hearSearchedRecipes');
    currentContext.push('hearSearchedRecipes');
    console.log(currentContext);
    currentObj.attributes['countMore'] = 0;
    currentObj.attributes['recipeNameOrIngredientName'] = currentObj.event.request.intent.slots.recipeOrIngredient.value;
		recipeDetails.searchRecipes(currentObj, limit, function(recipesName, count) {
			currentObj.emit(':ask', 'Here are our top  4 recipes for' + currentObj.attributes['recipeNameOrIngredientName'] + ', ' + recipesName + ', You can choose any of these dishes for recipe details, or hear more recipe options. What would you like to do?');
		});




};

const getIngredients = function(currentObj, callback) {
    var ingredients = [];
    recipeDetails.getRecipeDetails(currentObj, function(recipeData) {
        console.log('Inside getRecipeDetails');
        console.log(sharedObj.currentRecipeName);
        for (var i = 0; i < recipeData.Ingredients.length; i++) {
            ingredients.push(recipeData.Ingredients[i].Description);
        }
        callback(ingredients.join());


    });
};

const hearIngredients = function() {
    currentObj = this;
    currentContext.push('hearIngredients');
    console.log('Inside hearIngredients');
    console.log(currentContext);
    console.log(currentObj.attributes['recipeOrIngredient']);
    getIngredients(currentObj, function(ingredients) {
        var speech = new ssml();
        speech.say('To make this recipe, you will need, ' + ingredients);
        speech.pause('0.5s');
        speech.say('That completes the ingredient list. I have also sent the ingredient list to your companion app for reference');
        speech.pause('0.2s');
        speech.say('Shall I continue with instructions to make the recipe or repeat the ingredients?');
        var speechOutput = speech.ssml(true);
        var reprompt = 'Shall I continue with instructions to make the recipe or repeat the ingredients?';
        currentObj.emit(':ask', speechOutput, reprompt);
    });
};

const getRecipeInstructions = function(currentObj, callback) {
    var method = [];
    recipeDetails.getRecipeDetails(currentObj, function(recipeData) {
        var countRecipeInstructions = 0;
        for (var i = 0; i < recipeData.Method.length; i++) {
            method.push(recipeData.Method[i].Step);
            countRecipeInstructions++;
        }
        console.log(countRecipeInstructions);
        callback(method.join(), countRecipeInstructions);


    });

};

const continueIntentHandler = function() {
    currentObj = this;
    console.log('Inside continueIntentHandler');
    currentContext.push('continueIntentHandler');
    console.log(currentContext);
    if (currentContext[currentContext.length - 2] == "hearIngredients") {
        currentContext.push('hearInstructions');
        console.log(currentContext);
        getRecipeInstructions(currentObj, function(recipeInstructions, countRecipeInstructions) {
            var speech = new ssml();
            console.log(countRecipeInstructions);
            console.log(recipeInstructions);
            speech.say('Great. Let’s go over the recipe instructions');
            speech.pause('0.2s');
            speech.say(recipeInstructions);
            speech.say('That completes the recipe instructions. I have also sent the instructions to your companion app for reference. Hope you enjoy making this recipe!');
            speech.pause('0.2s');
            speech.say('Do you want to search for a new recipe? I can also repeat the recipe instructions or go back to the start of this recipe');
            var speechOutput = speech.ssml(true);
            var reprompt = 'Do you want to search for a new recipe? I can also repeat the recipe instructions or go back to the start of this recipe';
            currentObj.emit(':ask', speechOutput, reprompt);
        });
    } else {
        this.emit(':ask', 'else part of continueIntentHandler');
    }
};


const newRecipeHandler = function() {
    console.log('inside newRecipeHandler');
    console.log(currentContext);
    if (currentContext[currentContext.length - 1] == "userRepeatRecipeNameHandler" || currentContext[currentContext.length - 1] == "hearInstructions") {
        var speech = new ssml();
        speech.say('You can get details of our top recipes by saying the recipe name or recipe ingredients');
        speech.pause('0.2s');
        speech.say('What would you like to make today?');
        var speechOutput = speech.ssml(true);
        var reprompt = 'Sorry, I didn’t hear anything, If you want to search the recipe by an ingredient like Potato or Paneer say  ‘search by an ingredient name’ or if you want something like ‘Aloo Masala’ or ‘Palak Paneer’ then say search by a ’recipe name’ ';
        this.emit(':ask', speechOutput, reprompt);
    } else {
        this.emit(':ask', 'else part of newRecipeHandler');
    }


};

const amazonRepeatHandler = function() {
    currentObj = this;
    console.log('Inside amazonRepeatHandler');
    console.log(currentContext);
    if (currentContext[currentContext.length - 1] == "hearIngredients") {
        console.log('Inside amazonRepeatHandler for Ingredients');
        getIngredients(currentObj, function(ingredients) {
            var speech = new ssml();
            speech.say('To make this recipe, you will need, ' + ingredients);
            speech.pause('0.5s');
            speech.say('That completes the ingredient list. I have also sent the ingredient list to your companion app for reference');
            speech.pause('0.2s');
            speech.say('Shall I continue with instructions to make the recipe or repeat the ingredients?');
            var speechOutput = speech.ssml(true);
            var reprompt = 'Shall I continue with instructions to make the recipe or repeat the ingredients?';
            console.log(currentContext);
            currentObj.emit(':ask', speechOutput, reprompt);
        });
    } else if (currentContext[currentContext.length - 1] == "hearInstructions") {
        console.log('Inside amazonRepeatHandler for Instructions');
        getRecipeInstructions(currentObj, function(recipeInstructions, countRecipeInstructions) {
            console.log(currentContext);
            var speech = new ssml();
            console.log(countRecipeInstructions);
            console.log(recipeInstructions);
            speech.say('Great. Let’s go over the recipe instructions');
            speech.pause('0.2s');
            speech.say(recipeInstructions);
            speech.say('That completes the recipe instructions. I have also sent the instructions to your companion app for reference. Hope you enjoy making this recipe!');
            speech.pause('0.2s');
            speech.say('Do you want to search for a new recipe? I can also repeat the recipe instructions or go back to the start of this recipe');
            var speechOutput = speech.ssml(true);
            var reprompt = 'Do you want to search for a new recipe? I can also repeat the recipe instructions or go back to the start of this recipe';
            currentObj.emit(':ask', speechOutput, reprompt);
        });
    } else if (currentContext[currentContext.length - 1] == "hearSearchedRecipes") {
        getSearchedRecipes(currentObj, function(recipesName, count) {
            if (count > 1) {
                currentObj.emit(':ask', 'Here are our top 4 recipes for' + currentObj.attributes['recipeNameOrIngredientName'] + ', ' + recipesName + ', You can choose any of these dishes for recipe details, or hear more recipe options. What would you like to do?');
            } else {
                currentObj.emit(':ask', 'Here is our top' + count + 'recipes for' + currentObj.attributes['recipeNameOrIngredientName'] + ', ' + recipesName + ', You can choose any of these dishes for recipe details, or hear more recipe options. What would you like to do?');
            }
        });
    }


};

const amazonPreviousHandler = function() {
    currentObj = this;
    console.log('inside amazonPreviousHandler');
    if (currentContext[currentContext.length - 1] == "userRepeatRecipeNameHandler") {
        getSearchedRecipes(currentObj, function(recipesName, count) {
            if (count > 1) {
                currentObj.emit(':ask', 'Here are our top  4 recipes for' + currentObj.attributes['recipeNameOrIngredientName'] + ', ' + recipesName + ', You can choose any of these dishes for recipe details, or hear more recipe options. What would you like to do?');
            } else {
                currentObj.emit(':ask', 'Here is our top' + count + 'recipes for' + currentObj.attributes['recipeNameOrIngredientName'] + ', ' + recipesName + ', You can choose any of these dishes for recipe details, or hear more recipe options. What would you like to do?');
            }
        });
    }
    console.log(currentContext);
};

const amazonStartOverHandler = function() {
    currentObj = this;
    console.log('Inside amazonStartOverHandler');
    console.log(currentContext);
    if (currentContext[currentContext.length - 1] == "hearInstructions") {
        recipeDetails.getRecipeDetails(currentObj, function(recipeData) {
            currentObj.emit(':ask', recipeData.RecipeName + ', ' + recipeData.Description + '. It takes ' + recipeData.PrepTime + ' to prepare and' + recipeData.Cooktime + ' to cook. It can be served to' + recipeData.Serve + ' people. Do you want to hear the ingredients or go back to recipe options? ');
        });
    }

}




const hearMoreRecipes = function() {
    currentObj = this;
    currentObj.attributes['countMore'] += 4;
    limit += 4;
    recipeDetails.searchRecipes(currentObj, limit, function(searchedRecipes, count) {
		currentObj.emit(':ask', 'Here are more 4 recipes for' + currentObj.attributes['recipeNameOrIngredientName'] + ', ' + searchedRecipes + ', You can choose any of these dishes for recipe details, or hear more recipe options. What would you like to do?');
           
    });

};


const negativeResponseHandler = function() {
    currentObj = this;
    console.log('inside negativeResponseHandler');
    console.log(currentContext);
    if (currentContext[currentContext.length - 1] == "hearInstructions") {
        currentObj.emit(':tell', 'Thanks for using the Sanjeev Kapoor skill, I look forward to seeing you again soon!');
    } else {
        currentObj.emit('else part of negative intent');
    }

};



const positiveResponseHandler = function() {
    console.log('inside positiveResponseHandler');
    console.log(currentContext);
    if (currentContext[currentContext.length - 1] == "hearInstructions") {
        var speech = new ssml();
        speech.say('You can get details of our top recipes by saying the recipe name or recipe ingredients');
        speech.pause('0.2s');
        speech.say('What would you like to make today?');
        var speechOutput = speech.ssml(true);
        var reprompt = 'Sorry, I didn’t hear anything, If you want to search the recipe by an ingredient like Potato or Paneer say  ‘search by an ingredient name’ or if you want something like ‘Aloo Masala’ or ‘Palak Paneer’ then say search by a ’recipe name’ ';
        this.emit(':ask', speechOutput, reprompt);
    }
};


const amazonCancelHandler = function() {
    intentRequest = [];
    console.log('inside amazonCancelHandler');
    currentContext.push("amazonCancelHandler");
    this.emit(':ask', messages.CANCEL);
    console.log(currentContext);
};



const amazonHelpHandler = function() {
    intentRequest = [];
    console.log('inside amazonHelpHandler');
    currentContext.push("amazonHelpHandler");
    this.emit(':ask', messages.HELP);
    console.log(currentContext);
};

const amazonStopHandler = function() {
    intentRequest = [];
    console.log('inside amazonStopHandler');
    currentContext.push("amazonStopHandler");
    this.emit(':tell', messages.STOP);
    console.log(currentContext);
};


const unhandledRequestHandler = function() {
    intentRequest = [];
    currentContext.push("unhandledRequestHandler");
    console.info("Starting unhandledRequestHandler");

};

const sessionEndedRequestHandler = function() {

    //this.emit(":tell", messages.GOODBYE);
    console.info("Ending sessionEndedRequestHandler()");
};

const handlers = {};

//Add event handlers

handlers[events.NewSession] = newSessionRequestHandler;
handlers[events.LaunchRequest] = launchRequestHandler;
handlers[events.SessionEndedRequest] = sessionEndedRequestHandler;
handlers[events.Unhandled] = unhandledRequestHandler;

//Add intent handlers

handlers[intents.PositiveIntent] = positiveResponseHandler;
handlers[intents.NegativeIntent] = negativeResponseHandler;
handlers[intents.WelcomeIntent] = launchRequestHandler;
handlers[intents.RecipeNameOrIngredientName] = hearSearchedRecipes;
handlers[intents.UserRepeatRecipeName] = userRepeatRecipeNameHandler;
handlers[intents.HearIngredients] = hearIngredients;
handlers[intents.NewRecipe] = newRecipeHandler;
handlers[intents.HearMoreRecipes] = hearMoreRecipes;
handlers[intents.ContinueIntent] = continueIntentHandler;
handlers[intents.AmazonRepeatIntent] = amazonRepeatHandler;
handlers[intents.AmazonPreviousIntent] = amazonPreviousHandler;
handlers[intents.AmazonStartOverIntent] = amazonStartOverHandler;
handlers[intents.AmazonCancelIntent] = amazonCancelHandler;
handlers[intents.AmazonStopIntent] = amazonStopHandler;
handlers[intents.AmazonHelpIntent] = amazonHelpHandler;


exports.handlers = handlers;
