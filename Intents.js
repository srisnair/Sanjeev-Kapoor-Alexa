'use strict';

/**
 * This file contains constant definitions of intents that we're
 * interested in for our skill.
 *
 * Refer to the following link for a list of built-in intents,
 * and what those intents do.
 * https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/standard-intents
 */

/**
 * This are custom intents for our skill. 
 */
const WelcomeIntent = "WelcomeIntent";
const ContinueIntent = "ContinueIntent";
const RecipeNameOrIngredientName = "RecipeNameOrIngredientName";
const UserRepeatRecipeName = "UserRepeatRecipeName";
const HearIngredients = "HearIngredients";
const NewRecipe = "NewRecipe";
const HearMoreRecipes = "HearMoreRecipes";
/**
 * This is an Amazon built-in intent.
 */
const AmazonRepeatIntent = "AMAZON.RepeatIntent";


/**
 * This is an Amazon built-in intent.
 */
const AmazonHelpIntent = "AMAZON.HelpIntent";

/**
 * This is an Amazon built-in intent.
 */
const PositiveIntent = "AMAZON.YesIntent";

/**
 * This is an Amazon built-in intent.
 */
const AmazonPreviousIntent = "AMAZON.PreviousIntent";

/**
 * This is an Amazon built-in intent.
 */
const AmazonStartOverIntent = "AMAZON.StartOverIntent";

/**
 * This is an Amazon built-in intent.
 */
const NegativeIntent = "AMAZON.NoIntent";

/**
 * This is an Amazon built-in intent.
 */
const AmazonCancelIntent = "AMAZON.CancelIntent";

/**
 * This is an Amazon built-in intent.
 */
const AmazonStopIntent = "AMAZON.StopIntent";

module.exports = {
    "WelcomeIntent": WelcomeIntent,
	"RecipeNameOrIngredientName": RecipeNameOrIngredientName,
	"UserRepeatRecipeName": UserRepeatRecipeName,
	"HearIngredients": HearIngredients,
    "ContinueIntent": ContinueIntent,
	"NewRecipe": NewRecipe,
	"HearMoreRecipes": HearMoreRecipes,
    "PositiveIntent": PositiveIntent,
    "NegativeIntent": NegativeIntent,
	"AmazonPreviousIntent": AmazonPreviousIntent,
	"AmazonStartOverIntent": AmazonStartOverIntent,
    "AmazonRepeatIntent": AmazonRepeatIntent,
    "AmazonHelpIntent": AmazonHelpIntent,
    "AmazonCancelIntent": AmazonCancelIntent,
    "AmazonStopIntent": AmazonStopIntent
};