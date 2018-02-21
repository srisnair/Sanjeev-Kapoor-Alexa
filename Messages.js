'use strict';

/**
 * This file contains a map of messages used by the skill.
 */

const WELCOME = "Hi,  I can help you get details of recipe by recipe name or Ingredient. Which option would you prefer?";

const WHAT_DO_YOU_WANT = "What do you want to ask?";

const ERROR = "Uh Oh. Looks like something went wrong.";

const TELL_RECIPE_NAME = "Ok, tell me recipe name";

const TELL_INGREDIENT_NAME = "Ok, tell me ingredient name";

const GOODBYE = "Thank you for using the Sanjeev Kapoor Recipes skill. Have a nice day.";

const UNHANDLED = "I can get details of recipe by recipe name or Ingredient. Which option would you prefer?";

const UNHANDLED_RECIPE_NAME = "This is not a recipe, please tell me recipe name again";

const UNHANDLED_INGREDIENT_NAME = "This is not ingredient, Please tell me Ingredient name again";

const UNHANDLED_CONTINUE_REPEAT_DESCRIPTION =	"Please say continue to hear ingredients name or say repeat to repeat to hear description again";

const UNHANDLED_CONTINUE_REPEAT_INGREDIENTS =	"Please say continue to hear cooking steps name or say repeat to repeat to hear ingredients again";

const UNHANDLED_REPEAT_COOKING_STEPS =	"Please say repeat to repeat cooking steps or say done if you are done";

const HELP = "Sanjeev Kapoor Recipes skill can help you to get details of recipe by recipe name or Ingredient. Few questions you could try asking, How to cook Paneer Butter Masala or, What are the recipes for Paneer ? ";

const STOP = "Thank you for using Sanjeev Kapoor Recipes Skill. Have a nice day.";

module.exports = {
    "WELCOME": WELCOME,
    "WHAT_DO_YOU_WANT": WHAT_DO_YOU_WANT,
    "ERROR": ERROR,
	"TELL_RECIPE_NAME":TELL_RECIPE_NAME,
	"TELL_INGREDIENT_NAME":TELL_INGREDIENT_NAME,
	"UNHANDLED_RECIPE_NAME":UNHANDLED_RECIPE_NAME,
	"UNHANDLED_INGREDIENT_NAME":UNHANDLED_INGREDIENT_NAME,
	"UNHANDLED_CONTINUE_REPEAT_DESCRIPTION":UNHANDLED_CONTINUE_REPEAT_DESCRIPTION,
	"UNHANDLED_CONTINUE_REPEAT_INGREDIENTS":UNHANDLED_CONTINUE_REPEAT_INGREDIENTS,
	"UNHANDLED_REPEAT_COOKING_STEPS":UNHANDLED_REPEAT_COOKING_STEPS,
    "GOODBYE": GOODBYE,
    "UNHANDLED": UNHANDLED,
    "HELP": HELP,
    "STOP": STOP,

};