/*================ global variables =================*/

var availCupboard = [], unavailCupboard = [], availList = [], unavailList = [], recipes = [],
    
    // Define the sequence of pages - navSequence
    navSequence = [ '', '#filters/', '#recipes/', '#steps/' ],
    
    // initialize cupboardModel (JSON OBJ) - Holds selected avail and unavail items
    cupboardModel = [
            {
                available   : [],
                unavailable : []
            }
        ];


/* ================ functions ================ */

// Get Model Data - Send ajax request
function getModelData() {


    // Using the core $.ajax() method
    $.ajax({

        // The URL for the request
        url: "js/models/cookbook.json",

        // Whether this is a POST or GET request
        type: "GET",

        // The type of data we expect back
        dataType : "json",

        // Code to run if the request succeeds;
        // the response is passed to the function
        success: function( json ) {
            model = json;
        },

        // Code to run if the request fails; the raw request and
        // status codes are passed to the function
        error: function( xhr, status, errorThrown ) {
            console.log('ajax request failed');
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
            console.dir( xhr );
        },

        // Code to run regardless of success or failure
        complete: function( xhr, status ) {
        }
    }).then(function(){

        // Return an array which holds all recipe objects
        recipes = model.recipes
        
        // Call Render Page function
        renderPage();

        // Compile all lists, passing in recipes model data
        compileLists(recipes);

    }); // ajax then function
} // getModelData


// Check the current URL hash
function getCurrentHash() {
    return window.location.hash.replace( /\W/g, '' );
}


// Check Current Hash Index
function getHashIndex() {

    var hash = getCurrentHash();

    // Get index of current hash on navSequence
    var hashIndex = navSequence.indexOf(hash);

    // If no matches, default to 0 (home page)
    if (hashIndex < 0){
        hashIndex = 0;
    }

    return hashIndex;

} // getHashIndex


// Render Elements (DOM selector)
function renderElements(selector) {

    // get all items on dom with selector
    var elements = $(selector);

    // get the current hash name
    var hashName = navSequence[getHashIndex()];

    // for each item...
    for(i=0; i<elements.length; i++ ){
        // hide the element using jquery's hide method
        $(elements[i]).hide();

        // make array of class names for the current element
        var classes = elements[i].getAttribute('class').split(' ');

        // search the array for matches with current hash
        var arrayCheck = classes.indexOf(hashName);

        // if the class attribute contains current hash in it
        if ( arrayCheck >= 0 ){

            // show element using jquery's show method
            $(elements[i]).show();
        }
    }

}

// Render Page
function renderPage(){

    // call Render Elements function passing in main selector
    renderElements('#scroller > div');

    // call Render Elements function passing in nav selector
    renderElements('#navMenu > div');
}


// createEl (model, parent element, tag name) - Create and append the element to document
function createEl(model, parent, child) {

    // Empty the parent to write over old data
    $(parent).innerHTML = '';

    for (i=0; i<model.length; i++){
        var li = document.createElement(child);
        var txt = document.createTextNode(model[i]);
        li.appendChild(txt);
        parent.appendChild(li);
    }

} // createEl


// Find recipes for given array of ingredients
// Returns an array of recipe objects
var searchRecipeIngredients = function (ingredientsQuery){
    
    // Initialize matched recipes array
    var matchedRecipes = [];
    
    // Loop through each recipe
    for (a=0; a<recipes.length; a++) {
        // Get this recipe object
        var thisRecipe = recipes[a];
        // Loop through each ingredient of each recipe
        for (b=0; b<thisRecipe.ingredients.length; b++) {
            // Get this ingredient name
            var thisIngredient = thisRecipe.ingredients[b].food;
            // Check if this ingredient name exists within the ingredientsQuery array
            var queryMatch = ingredientsQuery.indexOf(thisIngredient);
            // If there's a match...
            if( queryMatch >= 0 ){
                // Check if this recipe is already added to matchedRecipes
                var arrayCheck = matchedRecipes.indexOf(thisRecipe);
                // If arrayCheck returns negative, it hasn't been added
                if (arrayCheck < 0) {
                    // Add this recipe to matchedRecipes
                    matchedRecipes.push(thisRecipe);
                }
            }
            
        }
    }
    
    // Return all matched recipes
    return matchedRecipes;
}


// Compile Lists (recipes model)
function compileLists(recipes){

    // Initialize list arrays

    // allIngredients
    var allIngredients = function(recipes){
        // get all ingredients from recipe model
        var recipeIngredients = [];

            for (a=0; a<recipes.length; a++) {
                for (b=0; b<recipes[a].ingredients.length; b++) {
                    var arrayCheck = recipeIngredients.indexOf(recipes[a].ingredients[b].food);

                    if (arrayCheck < 0) {
                        recipeIngredients.push(recipes[a].ingredients[b].food);
                    }

                }
            }

        return recipeIngredients;
    }

    // availCupboard
    var availCupboard = function(){
        
        // get the avail ingredients from cupboard model
        var ingredients = cupboardModel.avail;
        
        // if no items exist...
        if (ingredients.length < 1){
            
            // push all ingredients from recipe model
            for (i=0; allIngredients.length; i++){
                ingredients.push( allIngredients[i] );
            }
            
        }
    }

    // unavailCupboard - any items from cupboardModel.unavail
    var unavailCupboard = cupboardModel.unavail;
    
    // availRecipes
    // returns array of recipe objects
    var availRecipes = function(){
        
        // Return all recipes that match what's in the availCupboard array
        return searchRecipeIngredients(availCupboard);
    }

    // unavailRecipes
    // returns array of recipe objects
    var unavailRecipes = function(){
        
        // Return all recipes that match what's in the unavailCupboard array
        return searchRecipeIngredients(unavailCupboard);
    }

    // availList
    // returns array of filtered ingredients
    var availList = function(){
        
        var filteredIngredients = [];
        
        // check allIngredients for any matches with unavailCupboard
            // add anything that doesn't match
        // check cupboardModel.avail for any matches
            // splice any matches
        
        return filteredIngredients;
    }

    // unavailList
    // returns array of filtered ingredients
    var unavailList = function(){
        
        var filteredIngredients = [];
        
        // iterate through recipes model
            // if a recipe does not match unavailRecipes and does match availRecipes...
                // push all the ingredients of that recipe
        
        return filteredIngredients;
    }

    // Call createEl function passing each model array, parent element, and desired tag name
    createEl(availList, '#availableBoxList', 'li');
    createEl(unavailList, '#unavailableBoxList', 'li');
    createEl(availCupboard, '#cupboardAvailList', 'li');
    createEl(unavailCupboard, '#cupboardUnavailList', 'li');
    createEl(availRecipes, '#recipeList', 'li');

} // compileLists


// Set Hash (current hash value, modifier)
function setHash(currentHashIndex, modifier) {

    // Check navSequence for values at the array position which matches currentHashIndex plus modifier
    if (navSequence[currentHashIndex+modifier]){

        // Set the window hash to the corrosponding pageSequence name
        window.location.hash = navSequence[currentHashIndex+modifier];

    } else {
        console.warn('Error in setHash function');
    }

} // setHash

// Page Nav (clicked button)
function pageNav(button) {

    // Set currentHashIndex variable to value of getHashIndex function
    var currentHashIndex = getHashIndex();

    // Check which button was clicked
    switch (button) {
        // Next Button
        case 'next':
            // If current hash is less than 3
            if (currentHashIndex < navSequence.length) {
                // Call Set Hash function and pass in getHashIndex value, and 1
                setHash(currentHashIndex, 1);
            }

        // Back Button
        case 'back':
            // If current hash is greater than 0
            if (currentHashIndex > 0) {
                // Call Set Hash function and pass in getHashIndex value, and -1
                setHash(currentHashIndex, -1);
             }

        // Find Recipes Button
        case 'findRecipes':
            // Change current hash to 'recipes'
            window.location.hash = '#recipes/';
    } // switch
} // pageNav

// Remove Item (from, clicked item)
    // Find index of clicked item in 'from' array
        // if the index is 0 or higher
            // splice the item out of the array at the index
    // Return 'from' array

// Add Item (to, clicked item)
    // Find index of clicked item in 'to' array
        // if the index is less than 0
            // push the item to the array
    // Return 'to' array



/* ================  ACTIONS  ================ */

// When document is loaded
$( document ).ready(function(){
    
    // On first load, Get model data, build lists, and append data to page based on hash
    getModelData();
    
    
    // When window hash changes...
    $(window).on('hashchange',  function(){
        
        // Get model data, build lists, and append data to page based on hash
        getModelData();
        
    });
       
                 
                 
    // Footer Nav
    // Get the Nav buttons
    var backButton = document.getElementById('back');
    var nextButton = document.getElementById('next');
    var findRecipes = document.getElementById('findRecipes');
    
    // Bind proper events to each button
    backButton.addEventListener( 'click', pageNav('back') );
    nextButton.addEventListener( 'click', pageNav('next') );
    findRecipes.addEventListener( 'click', pageNav('findRecipes') );
    
    
    // Cupboard
    // When cupboard avail item is clicked
        // set cupboard.avail to value of Remove Item function, passing cupboard.avail and clicked item
        // Call getModelData function

    // When cupboard unavail item is clicked
        // set cupboard.unavail to value of Remove Item function, passing cupboard.unavail and clicked item
        // Call getModelData function
    
                 
                 
    // Home Page
    // When avail item is clicked
        // set cupboard.avail to value of Add Item function, passing cupboard.avail and clicked item
        // Call getModelData function
    
                 
                 
    // Filters Page
    // When unavail item is clicked
        // set cupboard.unavail to value of Add Item function, passing cupboard.unavail and clicked item
        // Call getModelData function
    
                 
                 
    // Recipes Page
    // When a recipe is clicked
        // Change hash to 'steps'
    
});