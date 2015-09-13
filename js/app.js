/*================ global variables =================*/

var availCupboard = [], unavailCupboard = [], recipes = [], allIngredients = [],
    
    // Define the sequence of pages - navSequence
    navSequence = [ '', '#filters/', '#recipes/', '#steps/' ],
    
    // initialize cupboardModel (JSON OBJ) - Holds selected avail and unavail items
    cupboardModel = [
            {
                available   : [ 'Chicken' ],
                unavailable : [ 'Basil' ]
            }
        ];


/* ================ functions ================ */

// Get Model Data - Send ajax request
function getModelData() {

    console.log( 'Running getModelData' );
    
    
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
    console.log( 'Running getCurrentHash' );
    
    return window.location.hash.replace( /\W/g, '' );
}

function getHashName() {
    
     console.log( 'Running getHashName' );
    
    // get the current hash name
    var hashName = getCurrentHash();
    
    if ( hashName === "" || hashName === "#" ){
        hashName = 'index';
    }
    
    return hashName;
}


// Check Current Hash Index
function getHashIndex() {
    
     console.log( 'Running getHashIndex' );

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
    
     console.log( 'Running renderElements' );

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
    
     console.log( 'Running renderPage' );

    // call Render Elements function passing in main selector
    renderElements('#scroller > div');

    // call Render Elements function passing in nav selector
    renderElements('#navMenu > div');
}


// createEl (model, parent element, tag name) - Create and append the element to document
function createEl(model, parent, child) {
    
    console.log( 'Running createEl' );
    
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
    
     console.log( 'Running searchRecipeIngredients' );
    
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
    
    console.log( 'Running compileLists' );

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
    allIngredients = getAllIngredients();

    
    // availCupboard
    // returns array of all selected ingredients, or otherwise all ingredients
    var getAvailCupboard = function(){
        
        // get the avail ingredients from cupboard model
        var availCupboardIngredients = cupboardModel[0].available;
        
        // if no items exist...
        /*if (availCupboardIngredients.length < 1){
            
            // push all ingredients from recipe model
            for (var i=0; i<allIngredients.length; i++){
                availCupboardIngredients.push( allIngredients[i] );
            }
            
        }*/
        
        return availCupboardIngredients;
    };
    availCupboard = getAvailCupboard();

    
    // unavailCupboard - any items from cupboardModel.unavail
    var unavailCupboard = cupboardModel[0].unavailable;
    
    // availRecipes
    // Return all recipes that match what's in the availCupboard array
    // returns array of recipe objects
    var availRecipes = searchRecipeIngredients(availCupboard);  // If availCupboard empty, add all recipes here

    // unavailRecipes
    // Return all recipes that match what's in the unavailCupboard array
    // returns array of recipe objects
    var unavailRecipes = searchRecipeIngredients(unavailCupboard);

    // availList
    // returns array of filtered ingredients
    var getAvailList = function(){
        
        var filteredIngredients = [],
            unavailIngredientsArray = [],
            availIngredientsArray = [];
        
        for (var i=0; i<unavailRecipes.length; i++){
            for (var a=0; a<unavailRecipes[i].ingredients.length; a++){
                var arrayCheck = unavailIngredientsArray.indexOf(unavailRecipes[i].ingredients[a].food);
                
                if(arrayCheck < 0){
                    unavailIngredientsArray.push(unavailRecipes[i].ingredients[a].food);
                }
            }
        }
        
        for (var i=0; i<availRecipes.length; i++){
            for (var a=0; a<availRecipes[i].ingredients.length; a++){
                
                var arrayCheck = availIngredientsArray.indexOf(availRecipes[i].ingredients[a].food);
                
                if(arrayCheck < 0){
                availIngredientsArray.push(availRecipes[i].ingredients[a].food);
                }
            }
        }
        
        console.log('availIngredientsArray: '+availIngredientsArray);
        
        for(var i=0; i<allIngredients.length; i++){
            
            var allIngredientsQuery = unavailIngredientsArray.indexOf(allIngredients[i]);
            
            if( allIngredientsQuery < 0 ) {
                filteredIngredients.push(allIngredients[i]);
            }
            
        }
        
        return filteredIngredients;
    };
    
    // Unavail List
    // Returns array of filtered ingredients which are in recipes that contain selected avail ingredients
    var getUnavailList = function(){
        var availList = getAvailList(),
            filteredIngredients = [];
        
        
        // If there's data in avail cupboard
        if ( availCupboard.length > 0 ){
            
            console.log( 'availCupboard has items' );
            
            for( var i=0; i<availRecipes.length; i++){
                for( var a=0; a<availRecipes[i].ingredients.length; a++){
                    
                    // Check whether each ingredient is already added to the array
                    var arrayCheck = filteredIngredients.indexOf(availRecipes[i].ingredients[a].food);
                    
                    // if not already added, add it
                    if( arrayCheck < 0 ){
                        filteredIngredients.push(availRecipes[i].ingredients[a].food);
                    }
                }
            } // availRecipes loop
        } else {
            console.log( 'availCupboard has NO items' );
            //If no data in avail cupboard, print ingredients of all recipes which are not unavailable
            
            for ( var i=0; i<availList.length; i++){
                filteredIngredients.push(availList[i]);
            }
            
            console.log( 'availList: '+availList );
        }
        
        // If there's data in unavail cupboard
        
        return filteredIngredients;
        
    };

    // Call createEl function passing each model array, parent element, and desired tag name
    createEl(getAvailList(), '#availableBoxList', 'li');
    createEl(getUnavailList(), '#unavailableBoxList', 'li');
/*    createEl(availCupboard, '#cupboardAvailList', 'li');
    createEl(unavailCupboard, '#cupboardUnavailList', 'li');
    createEl(availRecipes, '#recipeList', 'li');*/

} // compileLists


// Set Hash (current hash value, modifier)
function setHash(currentHashIndex, modifier) {
    
    console.log( 'Running setHash' );
    
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
    
    console.log( 'Running pageNav' );

    // Set currentHashIndex variable to value of getHashIndex function
    var currentHashIndex = getHashIndex();

    // Check which button was clicked
    switch (button) {
        // Next Button
        case 'next':
            // If current hash is not the last page in the nav sequence...
            if (currentHashIndex < navSequence.length) {
                
                console.log( 'Running switch next statement' );
                
                // Call Set Hash function and advance in the sequence by one
                setHash(currentHashIndex, 1);
            }
            break;

        // Back Button
        case 'back':
            
            console.log( 'Running switch back statement' );
            
            // If current hash is greater than 0
            if (currentHashIndex > 0) {
                // Call Set Hash function and pass in getHashIndex value, and -1
                setHash(currentHashIndex, -1);
             }
            break;

        // Find Recipes Button
        case 'findRecipes':
            
            console.log( 'Running switch findRecipes statement' );
            
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
    
    console.log( 'Running onLoad' );
    
    // On first load, Get model data, build lists, and append data to page based on hash
    getModelData();
    
    
    // When window hash changes...
    $(window).on('hashchange',  function(){
        
        console.log( 'Running on hashchange' );
        
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