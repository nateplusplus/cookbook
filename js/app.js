/*================ global variables =================*/

var recipes = [],
    
    // Define the sequence of pages - navSequence
    navSequence = [ '', '#filters/', '#recipes/', '#steps/' ];
    
    
    
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
            console.error('ajax request failed');
            console.error( "Error: " + errorThrown );
            console.error( "Status: " + status );
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
// Return hash string without special characters
function getCurrentHash() {
    
    return window.location.hash.replace( /\W/g, '' );
}

function getHashName() {
    
    // get the current hash name
    var hashName = getCurrentHash();
    
    if ( hashName === "" || hashName === "#" ){
        hashName = 'index';
    }
    
    return hashName;
}


// Check Current Hash Index
function getHashIndex() {

    var hash = getCurrentHash();
    var hashIndex = 0;
    
    // Search navSequence for a string pattern matching the current hash
    
    for(var i=0; i<navSequence.length; i++){
        if(navSequence[i].match(hash)){
            // Get index of current hash on navSequence
            hashIndex = navSequence.indexOf(navSequence[i]);
            break;
        }
    }

    return hashIndex;

} // getHashIndex


// Render Elements (DOM selector)
function renderElements(selector) {

    // get all items on dom with selector
    var elements = document.querySelectorAll(selector);

    // get the current hash name
    var hashName = getHashName();

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
    
    var parentEl = document.querySelector(parent);

    // Empty the parent to write over old data
    parentEl.innerHTML = '';

    for (i=0; i<model.length; i++){
        var li = document.createElement(child);
        var txt = document.createTextNode(model[i]);
        li.appendChild(txt);
        parentEl.appendChild(li);
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
function compileLists(){
    
    
    
    // initialize cupboardModel (JSON OBJ) - Holds selected avail and unavail items
    var cupboardModel = [
            {
                available   : [ 'Chicken' ],
                unavailable : [ 'Basil' ]
            }
        ];
    

    // Initialize list arrays

    // get all ingredients
    var getAllIngredients = function(){
        
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
    };
    var allIngredients = getAllIngredients();

    
    // availCupboard
    // returns array of all selected ingredients
    var availCupboard = cupboardModel[0].available;

    
    // unavailCupboard - any items from cupboardModel.unavail
    var unavailCupboard = cupboardModel[0].unavailable;
    
    
    // unavailRecipes
    // Return all recipes that match what's in the unavailCupboard array
    // returns array of recipe objects
    var unavailRecipes = searchRecipeIngredients(unavailCupboard); // Needed for generating availList
    
    
    // availRecipes
    // Return all recipes that match what's in the availCupboard array
    // returns array of recipe objects
    var getAvailRecipes = function(){
        
        var availRecipesArray = [],
            unavailRecipeNames = [],
            recipeResults = [];
        
        if( availCupboard.length > 0 ){
            
            // If availCupboard has items, add recipes containing those items
            availRecipesArray = searchRecipeIngredients(availCupboard);
        } else {
            
            // If availCupboard empty, add all recipes
            availRecipesArray = searchRecipeIngredients(allIngredients);
        }
        
        if( unavailRecipes.length > 0 ){
            
            // If unavailRecipes has items, add those recipe names
            for (var i=0; i<unavailRecipes.length; i++){
                
                var arrayCheck = unavailRecipes.indexOf(unavailRecipes[i].name);
                
                if( arrayCheck < 0 ){
                    unavailRecipeNames.push(unavailRecipes[i].name);
                }
            }
        }
        
        for (var i=0; i<availRecipesArray.length; i++){
            
            var unavailQuery = unavailRecipeNames.indexOf(availRecipesArray[i].name);
            
            if( unavailQuery >= 0 ){
                availRecipesArray.splice(i, 1);
            }
            
        }
        
        return availRecipesArray;
        
    };
    
    var availRecipes = getAvailRecipes();
    
    
    var availRecipeNames = function(){
        
        var results = [];
        
        for( var i=0; i<availRecipes.length; i++ ){
            var arrayCheck = results.indexOf(availRecipes[i].name);
            
            if( arrayCheck < 0 ){
                results.push(availRecipes[i].name);
            }
        }
        
        return results;
    }
    
    // availList
    // returns array of filtered ingredients:
    // Ingredients from all recipes except those that contain unavail items,
    // and except ingredients already added to cupboard.
    var getAvailList = function(){
        
        var filteredIngredients = [],
            unavailIngredientsArray = [],
            availIngredientsArray = [];
        
        for (var i=0; i<unavailCupboard.length; i++){
            var arrayCheck = unavailIngredientsArray.indexOf(unavailCupboard[i]);

            if(arrayCheck < 0){
                unavailIngredientsArray.push(unavailCupboard[i]);
            }
        }
        
        for (var i=0; i<availCupboard.length; i++){
                
                var arrayCheck = availIngredientsArray.indexOf(availCupboard[i]);
                
                if( arrayCheck < 0 ){
                    availIngredientsArray.push(availCupboard[i]);
                }
        }
        
        
        // Build the ingredients list by recipe
        // Skip a RECIPE if it contains unavail ingredients
        // Skip any INGREDIENTS that are already listed as available
        for(var i=0; i<recipes.length; i++){
            
            var recipeIngredients = [],
                unavailIngredientsQuery = [],
                availIngredientsQuery = [],
                recipeFlag = 0;
            
            for(var a=0; a<recipes[i].ingredients.length; a++){
                
                unavailIngredientsQuery = unavailIngredientsArray.indexOf(recipes[i].ingredients[a].food);
                
                if( unavailIngredientsQuery >= 0 ){
                    recipeFlag = 1;
                    break;
                }
                
            }
            
            if( recipeFlag === 0 ){
                for(var a=0; a<recipes[i].ingredients.length; a++){
                    var availIngredientsQuery = availIngredientsArray.indexOf(recipes[i].ingredients[a].food);
                    
                    if ( availIngredientsQuery < 0 ){
                        
                        var arrayCheck = filteredIngredients.indexOf(recipes[i].ingredients[a].food);
                        
                        if( arrayCheck < 0 ){
                            filteredIngredients.push(recipes[i].ingredients[a].food);
                        }
                    }
                }
            }
            
            
            
        }
        
        return filteredIngredients;
    };
    var availList = getAvailList();

    // Call createEl function passing each model array, parent element, and desired tag name
    createEl(availList, '#availableBoxList', 'li');
    createEl(availList, '#unavailableBoxList', 'li');
    createEl(availCupboard, '#cupboardAvailList', 'li');
    createEl(unavailCupboard, '#cupboardUnavailList', 'li');
    createEl(availRecipeNames(), '#recipeList', 'li');

} // compileLists


// Set Hash (current hash value, modifier)
function setHash(currentHashIndex, modifier) {
    
    var newHashIndex = currentHashIndex+modifier;
    
    // Check navSequence for values at the array position which matches currentHashIndex plus modifier
    if (newHashIndex >= 0 || newHashIndex <= navSequence.length){

        // Set the window hash to the corrosponding pageSequence name
        window.location.hash = navSequence[newHashIndex];

    } else {
        console.error('Error in setHash function. Hash value plus modifier is not within nav sequence.');
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
            // If current hash is not the last page in the nav sequence...
            if (currentHashIndex < navSequence.length) {
                
                // Call Set Hash function and advance in the sequence by one
                setHash(currentHashIndex, 1);
            }
            break;

        // Back Button
        case 'back':
            
            // If current hash is greater than 0
            if (currentHashIndex > 0) {
                // Call Set Hash function and pass in getHashIndex value, and -1
                setHash(currentHashIndex, -1);
             }
            break;

        // Find Recipes Button
        case 'findRecipes':
            
            // Change current hash to 'recipes'
            window.location.hash = '#recipes/';
            break;
        
        default:
            
            console.error( 'Button unknown. Running default behavior - returning home.' );
            
            window.location.hash = '#';
            
            break;
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
       
                 
                 
    // FOOTER NAV
    // Get the Nav buttons
    var backButton = document.getElementById('back');
    var nextButton = document.getElementById('next');
    var findRecipes = document.getElementById('findRecipes');
    
    // Bind proper events to each button
    backButton.addEventListener( 'mouseup', function(){ pageNav('back') }, false );
    backButton.addEventListener( 'touchend', function(){ pageNav('back') }, false );
    
    nextButton.addEventListener( 'mouseup', function(){ pageNav('next') }, false );
    nextButton.addEventListener( 'touchend', function(){ pageNav('next') }, false );
    
    findRecipes.addEventListener( 'mouseup', function(){ pageNav('findRecipes') }, false );
    findRecipes.addEventListener( 'touchend', function(){ pageNav('findRecipes') }, false );
    
    
    // Cupboard
    // When cupboard avail item is clicked or touched
        // set cupboard.avail to value of Remove Item function, passing cupboard.avail and clicked item
        // Call getModelData function

    // When cupboard unavail item is clicked or touched
        // set cupboard.unavail to value of Remove Item function, passing cupboard.unavail and clicked item
        // Call getModelData function
    
                 
                 
    // Home Page
    // When avail item is clicked or touched
    document.getElementById('availableBoxList').addEventListener('mouseup', function(){ console.log('clicked available '+event.target.innerHTML); }, false );
    document.getElementById('availableBoxList').addEventListener('touchend', function(){ console.log('clicked available '+event.target.innerHTML); }, false );
        // set cupboard.avail to value of Add Item function, passing cupboard.avail and clicked item
        // Call getModelData function
    
                 
                 
    // Filters Page
    // When unavail item is clicked
    document.getElementById('unavailableBoxList').addEventListener('mouseup', function(){ console.log('clicked unavailable '+event.target.innerHTML); }, false );
    document.getElementById('unavailableBoxList').addEventListener('touchend', function(){ console.log('clicked unavailable '+event.target.innerHTML); }, false );
        // set cupboard.unavail to value of Add Item function, passing cupboard.unavail and clicked item
        // Call getModelData function
    
                 
                 
    // Recipes Page
    // When a recipe is clicked
        // Change hash to 'steps'
    
});