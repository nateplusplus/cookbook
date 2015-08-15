/*================ global variables =================*/

var availCupboard = [], unavailCupboard = [], availList = [], unavailList = [], recipes = [];


$( document ).ready(function(){
    
    
    /* ================ functions ================ */
    
    // Get Model Data
        // Send ajax request
        // Return an array which holds all recipe objects
    
    // Check Current Hash
        // Get index of current hash on pageSequence
        // If no matches, default to 0 (home page)
    
    // Render Elements (DOM selector, currentHash)
        // get all items on dom with selector
            // for each item...
                // hide the element using jquery's hide method
                // if the class attribute contains currentHash in it
                    // show element using jquery's show method
    
    // Render Page (currentHash)
        // call Render Elements function passing in main selector and currentHash
        // call Render Elements function passing in nav selector and currentHash
    
    // Append Elements (model, parent element, tag name)
        // Create and append the element to document
    
    // Compile Lists (recipes model)
        // Initialize list arrays
            // allIngredients
                // get all ingredients from recipe model
            // availRecipes
                // get the avail ingredients from cupboard model
                // check for recipes matching those ingredients
                    // if it matches, push the name of that recipe
            // unavailRecipes
                // get the unavail ingredients from cupboard model
                // check for recipes matching those ingredients
                    // if it matches, push the name of that recipe
            // availCupboard
                // push any items from cupboardModel.avail
                // if no items, push all ingredients from recipe model
            // unavailCupboard
                // push any items from cupboardModel.unavail
            // availList
                // check allIngredients for any matches with unavailCupboard
                    // add anything that doesn't match
                // check cupboardModel.avail for any matches
                    // splice any matches
            // unavailList
                // iterate through recipes model
                    // if a recipe does not match unavailRecipes and does match availRecipes...
                        // push all the ingredients of that recipe
        // Call Append Elements function passing each model array, parent element, and desired tag name
                
    
    // Set Hash (current hash value, modifier)
        // Check pageSequence for values at the array position which matches current hash value plus modifier
        // Set the window hash to the corrosponding pageSequence name
    
    // Page Nav (clicked button)
        // Define the sequence of pages - pageSequence
        // Call Check Current Hash function
        // Check which button was clicked
            // Next Button
                // If current hash is greater than pageSequence[0]
                    // Call Set Hash function and pass in Current Hash value, and 1
            // Back Button
                // If current hash is less than pageSequence[pageSequence.length]
                    // Call Set Hash function and pass in Current Hash value, and -1
            // Find Recipes Button
                // Change current hash to 'recipes'
    
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
    
    // When Window Loads
        // Call Render Page function passing in window hash
        // initialize cupboardModel (JSON OBJ) - Holds selected avail and unavail items
        // Set recipes array to the value of the Get Model Data function
        // Call Compile Lists function, passing in recipes array
        
    // When window hash changes
        // Call Render Page function passing in window hash
        
    // Footer Nav
        // When any button is clicked
            // Call Page Nav function, passing the name of the clicked button
    
    // Cupboard
        // When cupboard avail item is clicked
            // set cupboard.avail to value of Remove Item function, passing cupboard.avail and clicked item
            // Call Compile Lists function, passing in recipes array
    
        // When cupboard unavail item is clicked
            // set cupboard.unavail to value of Remove Item function, passing cupboard.unavail and clicked item
            // Call Compile Lists function, passing in recipes array
    
    // Home Page
        // When avail item is clicked
            // set cupboard.avail to value of Add Item function, passing cupboard.avail and clicked item
            // Call Compile Lists function, passing in recipes array
    
    // Filters Page
        // When unavail item is clicked
            // set cupboard.unavail to value of Add Item function, passing cupboard.unavail and clicked item
            // Call Compile Lists function, passing in recipes array
    
    // Recipes Page
        // When a recipe is clicked
            // Change hash to 'steps'
    
});