process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;
const request = require("request");
const fs = require('fs');
const handler = require('./Handlers');
const parseString = require('xml2js').parseString;
var exports = module.exports = {};

const constants = require('./Constants');



exports.searchRecipes = function(currentObj, callback) {
    console.log("Reading File");
    fs.readFile('./RecipeDetails.json', {
        encoding: 'utf8'
    }, function(err, data) {
        if (err) {
            console.log("Error while reading json file");
            currentObj.emit(':tell', 'Sorry there is error in reading JSON file.');
        } else {
            var recipeData = JSON.parse(data);
		    var searchedRecipes = [];
			var count=0;
            for (var i = 0; i < recipeData.length; i++) {
                //console.log("Inside for loop");
                if (recipeData[i].RecipeName.toLowerCase().startsWith(handler.sharedObj.recipeNameOrIngredientName.toLowerCase())) {
                    searchedRecipes.push(recipeData[i].RecipeName);
					count++;
                } else {
                   // console.log("Sorry I don't know about this recipe");
                }
            }
			
			  callback(searchedRecipes,count);
        }

    });
	
};


exports.getRecipeDetails = function(currentObj, callback) {
	console.log("Reading File");
    fs.readFile('./RecipeDetails.json', {
        encoding: 'utf8'
    }, function(err, data) {
        if (err) {
            console.log("Error while reading json file");
            currentObj.emit(':tell', 'Sorry there is error in reading JSON file.');
        } else {
            var recipeData = JSON.parse(data);
            for (var i = 0; i < recipeData.length; i++) {
                console.log("Inside for loop");
                if (recipeData[i].RecipeName.toLowerCase() == handler.sharedObj.currentRecipeName.toLowerCase()) {
                    var searchedRecipedata = recipeData[i];
                    callback(searchedRecipedata);
                } else {
                    console.log("Sorry I don't know about this recipe");
                }
            }
		
			
        }

    });
}