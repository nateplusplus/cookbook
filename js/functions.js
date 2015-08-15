// Returns Array 1 with added items from Array 2, without duplicating anything
function blendArrays(arry1, arry2) {
	
	// Loop through all items in Array 2
	for (i=0; i<arry2.length; i++) {
		
		// Get the current item in the loop
		var thisArray2 = arry2[i],
		
			// Search Array 1 for any occurrence of the current item in the loop
			// A match will return the index number of that occurrence
			// No match will return -1
			arryIndex = arry1.indexOf(thisArray2);
			
			// If there's no match, push the result to Array 1
			if (arryIndex < 0) {
				arry1.push(thisArray2);
				
			// If there is a match, simply replace it with the same value
			} else {
				arry1.splice(arryIndex, 1, thisArray2);
			}
	}
	
	return arry1;
	
}




$( document ).ready(function(){
    
    
    
    // Initialize variables
    var mainSection = document.getElementById('mainSection'),
        navMenu = document.getElementById('navMenu'),
        availableBoxList = document.getElementById('availableBoxList'),
        unavailableBoxList = document.getElementById('unavailableBoxList'),
        cupboardAvailList = document.getElementById('cupboardAvailList'),
        cupboardUnavailList = document.getElementById('cupboardUnavailList'),
        nextButton = document.getElementById('next'),
        backButton = document.getElementById('back'),
        findRecipesButton = document.getElementById('findRecipes'),
        cupboardLabel = document.getElementById('cupboardLabel'),
        cupboardLists = document.getElementById('cupboardLists'),
        cupboardCount = document.getElementById('cupboardCount'),
        navSequence = [ '', '#filters/', '#recipes/', '#steps/' ],
        pageName = '',
        recipeList = document.getElementById('recipeList'),
        recipeTitle = document.getElementById('recipeTitle'),
        stepList = document.getElementById('stepList'),
        missing = document.getElementById('missing'),
        shopping = document.getElementById('shopping'),
        
        
    /* ============================ MODELS ================================ */
        
        // Initialize Model Arrays
        model = [],
        ingredients = [],
        recipes = [],
        recipeNames = [],
        allIngredients = [],
        cupboardList = [
            {
                'available'    : [],
                'unavailable'  : []
            }
        ],
        cupboardAvail = [],
        cupboardUnavail = [],
        unavailIngredients = [],
        matchedRecipes = [],
        cupboardAvailDisplayed = [];
    
    function compileAllIngredients() {
        
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
    
    
    
    /* ====================== APPLICATION CONTROLLERS ========================== */
    
    
    // Create specified child element
    // Append specified model as text
    // Append to specified parent
    function createEl(model, parent, child) {
        
        // Empty the parent to write over old data
        parent.innerHTML = '';

        for (i=0; i<model.length; i++){
            var li = document.createElement(child);
            var txt = document.createTextNode(model[i]);
            li.appendChild(txt);
            parent.appendChild(li);
        }

    }
    
    
    
    // AJAX request - update all model data
    function getModelData(clickedRecipe) {
        
        
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
        }).then(function(){     // After success, put data into appropriate arrays
            
            // Reset arrays so duplicates aren't made
            allIngredients = []; 
            
            recipes = model.recipes;
            
            allIngredients = compileAllIngredients();
            
            cupboardAvail = resetControllerArray(cupboardList[0].available);
            cupboardAvailDisplayed = resetControllerArray(cupboardList[0].available);
            cupboardUnavail = resetControllerArray(cupboardList[0].unavailable);
            
            checkInput(cupboardAvail, allIngredients);
            
            var availRecipes = findRecipes(cupboardAvail),
                unavailRecipes = findRecipes(cupboardUnavail),
                filteredRecipes = filterRecipes(availRecipes, unavailRecipes),
                recipeSteps = getSteps(clickedRecipe),
                clickedRecipeTitle = getRecipeTitle(clickedRecipe),
                totalCupboard = getCupboardCount(cupboardAvailDisplayed, cupboardUnavail);
            
            // Reset the unavailable controller array
            unavailIngredients = filterIngredients();
            
            
            // Build each list, with fetched data
            createEl(allIngredients, availableBoxList, 'li');
            createEl(unavailIngredients, unavailableBoxList, 'li');
            createEl(cupboardAvailDisplayed, cupboardAvailList, 'li');
            createEl(cupboardUnavail, cupboardUnavailList, 'li');
            createEl(filteredRecipes, recipeList, 'li'),
            createEl(clickedRecipeTitle, recipeTitle, 'h3'),
            createEl(recipeSteps, stepList, 'p');
            
            
            
            cupboardCount.innerHTML = totalCupboard;
            
             activateScroller();


        }); // Ajax .then function
    } // getModelData function
    
    
    
    // Call the Ajax function - Initial model data fetch
    getModelData();
    
    
    
    /* ================================ ROUTERS ================================ */
    
    // Render Route Function
    function renderRoute(routeName) {
        
        var hiddenElements = $(':hidden');
        
        hiddenElements.each(function(){
            if($(this).attr('id')) {
                $(this).show();
            }
        });
        
        
        var renderElements = $('#scroller .'+routeName),
            renderNav = $('#navMenu .'+routeName),
            allMain = $('#scroller > div'),
            allNav = $('#navMenu > div');
        
        var test = $(renderElements).length;
        var test2 = $(renderNav).length;

        
        renderElements.each(function(){
            var renderId = $(this).attr('id');
            
            allMain.each( function(i, el) {
                
                var elementId = $(el).attr('id');
                
                    if( renderId == elementId ){
                        allMain[i] = '';
                        return false;
                    }
            });
            
        });
        
        allMain.each(function(){
            
            if ($(this).attr('id')) {
                $(this).hide();
            }
        });
        
        
        
        
        renderNav.each(function(){
            
            var renderId = $(this).attr('id');
        
            allNav.each( function(i, el) {
                var elementId = $(el).attr('id');

                    if( renderId == elementId ){
                        allNav[i] = '';
                        return false;
                    }
            });
            
        });
        
        allNav.each(function(){
            
            if ($(this).attr('id')) {
                $(this).hide();
            }
        });
    } // Render Route Function
    
    
    // Get the url hash
    function getCurrentHash () {
        
        var hash = window.location.hash.replace( /\W/g, '' );

        switch (hash) {
            case '':
                pageName = 'index';
                break;
            case '#':
                pageName = 'index';
                break;
            case 'filters':
                pageName = 'filters';
                break;
            case 'recipes':
                pageName = 'recipes';
                break;
            case 'steps':
                pageName = 'steps';
                break;
            default:
                pageName = 'index';
        }
    }
    
    //Render initial route
    getCurrentHash();
    renderRoute(pageName);
    
    // Bind an event to window.onhashchange that, when the hash changes, gets the
    // hash and adds the class "selected" to any matching nav link.
    $(window).on('hashchange',  function(){
        
        getCurrentHash();
        renderRoute(pageName);

    });
    
    
    /* ============================ PAGE CONTROLLERS ================================ */
    
    
    
    // On-click, get the text of clicked element
    // Add text to the cupboard.available model
    availableBoxList.onclick = function(event){
        
        // Prevent default behavior when clicked
        event.preventDefault();
        
        // Initialize array
        var cupboardAvailArray = [],
            // Create an array for the clicked item to work within blendArrays function
            clickedItem = [];
            
            clickedItem.push(event.target.innerHTML);
        
        // Loop over items in cupboard JSON model and push them into an array
        for (i=0; i<cupboardList[0].available.length; i++) {
            var thisAvailItem = cupboardList[0].available[i].food;
            cupboardAvailArray.push(thisAvailItem);
        }
        
        // Add the clicked item to the array if it isn't already added
        blendArrays(cupboardAvailArray, clickedItem);
        
        // Reset the cupboard json model to accept new data
        cupboardList[0].available = [];
        
        // Loop over each item of the cupboardAvailArray
        for (i=0; i<cupboardAvailArray.length; i++){
            
            // For each item, create an object and put the value in a new food property
            var obj = new Object();
            obj.food = cupboardAvailArray[i];
            
            // Push each object to the cupboard list to create new json data
            cupboardList[0].available.push(obj);
        }
        
        // Re-fetch model to update lists
        getModelData();
        
    };
    
    
    // On-click, get the text of clicked element
    // Add text to the cupboard.unavailable model
    unavailableBoxList.onclick = function(event){
        
        // Prevent default behavior when clicked
        event.preventDefault();
        
        // Initialize array
        var cupboardUnavailArray = [],
            // Create an array for the clicked item to work within blendArrays function
            clickedItem = [];
            
        
        clickedItem.push(event.target.innerHTML);
        
        // Loop over Unavailable items in cupboard JSON model and push them into an array
        for (i=0; i<cupboardList[0].unavailable.length; i++) {
            thisUnavailItem = cupboardList[0].unavailable[i].food;
            
            cupboardUnavailArray.push(thisUnavailItem); 
        }
        
        // Add the clicked item to the array if it isn't already added
        blendArrays(cupboardUnavailArray, clickedItem);
        
        // Reset the cupboard json model to accept new data
        cupboardList[0].unavailable = [];
        
        // Loop over each item of the cupboardAvailArray
        for (i=0; i<cupboardUnavailArray.length; i++){
            
            // For each item, create an object and put the value in a new food property
            var obj = new Object();
            obj.food = cupboardUnavailArray[i];
            
            // Push each object to the cupboard list to create new json data
            cupboardList[0].unavailable.push(obj);
        }

        event.target.setAttribute('class', 'selected');
        
        // Re-fetch model to update lists
        getModelData();
    };
    
    
    function resetControllerArray(data){
        
        // Reset the controller array
        array = [];

        for (i=0; i<data.length; i++){
            array.push(data[i].food);
        }
        
        return array;
        
    }
    
    function checkInput(array, model) {
        
        if (array.length <= 0) {
            
            for(i=0; i < model.length; i++){
                
                array.push(model[i]);
                
            }
            
        }
    }
    
    
    
    // On-click, get the text of clicked element
    // Add text to the cupboard.unavailable model
    recipeList.onclick = function(event){
        
        // Prevent default behavior when clicked
        event.preventDefault();
        
        // Initialize array
        var clickedItem = event.target.innerHTML;
        
        window.location.hash = 'steps/';

        event.target.setAttribute('class', 'selected');
        
        // Re-fetch model to update lists
        getModelData(clickedItem);
    };
    
    
    function checkRecipes(cupboardModel) {
        
        var filteredRecipes = [];
        
        for (a=0; a<recipes.length; a++){
            
            var thisRecipe = recipes[a],
                thisRecipeIngredients = [];
            
            for (b=0; b<thisRecipe.ingredients.length; b++){
                thisRecipeIngredients.push(thisRecipe.ingredients[b].food);
            }
            
            for (c=0; c<cupboardModel.length; c++){
                var searchRecipe = thisRecipeIngredients.indexOf(cupboardModel[c]);
                
                if (searchRecipe >= 0) {
                    filteredRecipes.push(thisRecipe.name);
                }
            }
            
        }
        
        return filteredRecipes;
    }
    
    
    function filterIngredients() {
        
        var availRecipeIngredients = [],
            unavailRecipes = checkRecipes(cupboardUnavail),
            availRecipes = checkRecipes(cupboardAvail);
        
        for (i=0; i<recipes.length; i++){
            
            var thisRecipe = recipes[i],
                thisRecipeIngredients = [],
                searchUnavail = unavailRecipes.indexOf(thisRecipe.name),
                searchAvail = availRecipes.indexOf(thisRecipe.name);
            
            
            if (searchUnavail < 0 && searchAvail >= 0) {
                
                for (b=0; b<thisRecipe.ingredients.length; b++){
                    
                    var checkArray = availRecipeIngredients.indexOf(thisRecipe.ingredients[b].food);
                    
                    if (checkArray < 0) {
                        availRecipeIngredients.push(thisRecipe.ingredients[b].food);
                    }
                    
                }

            }
        }
        
        return availRecipeIngredients;
        
    }
    
    
    function getCupboardCount(avail, unavail) {
        
        var count = avail.length + unavail.length;
        
        if ( count === 0 ) {
            count = '';
        }
        
        return count;
        
    }
    
    
    /* ============================ NAV CONTROLLERS ================================ */
    
    
    
    function getNavSequence(button) {
        
        var sequenceId = '';
        
        if ( window.location.hash == '#'){
            sequenceId = 0;
        } else if (window.location.hash == '') {
            sequenceId = 0;
        } else {
            
            var searchSequence = navSequence.indexOf(window.location.hash);
            
            if (searchSequence >= 0) {
                sequenceId = searchSequence;
            } else {
                console.warn('Error in getNavSequence');
            }
            
        }
        
        
        var page = '';
        
        switch (button) {
            case 'next':
                if (sequenceId < 3) {
                    page = navSequence[sequenceId+1];
                } else {
                    page = window.location.hash;
                }
                break;
            case 'back':
                 if (sequenceId > 0) {
                    page = navSequence[sequenceId-1];
                 } else {
                    page = window.location.hash;
                }
                break;
            case 'findRecipes':
                page = '#recipes/';
                break;
            default:
                page = ''; // Home page
        }
        
        return page;
    }
    
    
    
    nextButton.onclick = function(event){
        
        event.preventDefault();
        
        window.location.hash = getNavSequence('next');
    };
    
    backButton.onclick = function(event){
        
        event.preventDefault();
        
        window.location.hash = getNavSequence('back');
        
    };
    
    findRecipesButton.onclick = function(event){
        
        event.preventDefault();
        
        window.location.hash = getNavSequence('findRecipes');
    };
    
    
    /* ========================= SEARCH CONTROLLER ============================= */
    
    
    function findRecipes(filter) {
        
        var matchedRecipes = [];
        
        if ( filter.length > 0 ) {
        
            var cupboardItems = [];

            // Add all items in available and unavailable models into arrays
            for (i=0; i<filter.length; i++) { cupboardItems.push(filter[i]); }

            for (a=0; a<cupboardItems.length; a++){

                for (b=0; b<recipes.length; b++){

                    var thisRecipe = recipes[b].name,
                        theseIngredients = [];

                    for (c=0; c<recipes[b].ingredients.length; c++){

                        theseIngredients.push(recipes[b].ingredients[c].food);

                    }
                        
                    var searchIngredients = theseIngredients.indexOf(cupboardItems[a]);

                    if(searchIngredients >= 0){
                        
                        var checkArray = matchedRecipes.indexOf(thisRecipe);
                        
                        if ( checkArray < 0){
                        
                            matchedRecipes.push(thisRecipe);
                            
                        } else {
                            matchedRecipes.splice(checkArray, 1, thisRecipe);
                        }
                    }
                    
                }
            } // for - outer loop
        } // if cupboardList array is populated
        
        return matchedRecipes;
        
    } // findRecipes function
    
    function filterRecipes (avail, unavail) {
        
        var filtered = [];
        
        for (i=0; i<avail.length; i++) {
            
            var searchMatchedRecipes = unavail.indexOf(avail[i]);
            
            if ( searchMatchedRecipes < 0 ) {
                
                var checkArray = filtered.indexOf(avail[i]);
                
                if (checkArray < 0){
                    filtered.push(avail[i]);
                }
            }
        }
        
        return filtered;
    }
    
    
    /* ========================= STEPS CONTROLLER ============================= */
    
    function getSteps(selection) {
        
        var recipeSteps = [];

        for (a=0; a<recipes.length ; a++) {

            if ( recipes[a].name === selection) {

                for (b=0; b<recipes[a].directions.length; b++) {
                    recipeSteps.push(recipes[a].directions[b].step);
                }

            }
        }

        if (recipeSteps.length === 0) {
            recipeSteps.push('Error finding recipe!');
        }

        return recipeSteps;

    }
    
    function getRecipeTitle(clickedRecipe) {
        
        var recipeTitle = [];
        
        if (clickedRecipe) {
            var recipeTitle = [clickedRecipe];
        }
        
        return recipeTitle;
    }
    
    
     /* ========================= CUPBOARD CONTROLLER ============================= */
    
    cupboardLabel.onclick = function(event) {
        event.preventDefault();
        
        
        if ( cupboardLists.className == 'closed') {
            cupboardLists.setAttribute('class', 'open');
        } else {
            cupboardLists.setAttribute('class', 'closed');
        }
    }
    
    function removeClickedItem (event, model) {
        
        event.preventDefault();
        
        
        for (i=0; i<model.length; i++){
            var thisItem = model[i].food;
            
            if (thisItem === event.target.innerHTML){
                model.splice(i, 1);
                break;
            }
        }
        
        getModelData();
    }
    
    
    cupboardAvailList.onclick = function(event) {
        removeClickedItem(event, cupboardList[0].available);
    }
    cupboardUnavailList.onclick = function(event) {
        removeClickedItem(event, cupboardList[0].unavailable);
    }
    
    /* ========================= ISCROLL ============================= */
    
    
    function activateScroller() {
    
        // Prevent page from scrolling normally
        function preventDefaultScrolling(event) { event.preventDefault(); }
        document.addEventListener( 'touchmove', preventDefaultScrolling, false );


        var myScroller = new iScroll(
            'mainSection',
            {
                hScroll: false, 
                vScrollbar: false,
                bounce: false,
                mouseWheel: true
            }
        );
    }
    
    
}); // DOM ready