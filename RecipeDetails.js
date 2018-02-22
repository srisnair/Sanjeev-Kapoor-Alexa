process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;
const request = require("request");
const fs = require('fs');
const handler = require('./Handlers');
const parseString = require('xml2js').parseString;
var exports = module.exports = {};

const constants = require('./Constants');



exports.searchRecipes = function(currentObj,limit, callback) {
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
                if (recipeData[i].RecipeName.toLowerCase().startsWith(currentObj.attributes['recipeNameOrIngredientName'].toLowerCase())) {
                    searchedRecipes.push(recipeData[i].RecipeName);
					console.log(currentObj.attributes['countMore']);
					console.log(limit);
					console.log(searchedRecipes);
					count++;
                } else {
                   // console.log("Sorry I don't know about this recipe");
                }
            }  
			
			  console.log(searchedRecipes.slice(currentObj.attributes['countMore'],limit));
			  callback(searchedRecipes.slice(currentObj.attributes['countMore'],limit).join(),count);
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
                if (recipeData[i].RecipeName.toLowerCase() == currentObj.attributes['currentRecipeName'].toLowerCase()) {
                    var searchedRecipedata = recipeData[i];
                    callback(searchedRecipedata);
                } else {
                    console.log("Sorry I don't know about this recipe");
                }
            }
		
			
        }

    });
}