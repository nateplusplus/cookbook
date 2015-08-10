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
        navSequence = [ '', '#filters/', '#recipes/', '#steps/' ],
        pageName = '',
        
        
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
        matchedRecipes = [];
    
    
    
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
        }).then(function(){     // After success, put data into appropriate arrays
            
            // Reset arrays so duplicates aren't made
            recipeNames = [];
            allIngredients = []; 
            
            recipes = model.recipes;

            for (a=0; a<recipes.length; a++){
                
                recipeNames.push(recipes[a].name);

                for (b=0; b<recipes[a].ingredients.length; b++){
                    
                    allIngredients.push(recipes[a].ingredients[b].food);
                    
                }

            }
            
            
            // Build each list, with fetched data
            createEl(allIngredients, availableBoxList, 'li');
            createEl(allIngredients, unavailableBoxList, 'li');
            createEl(cupboardAvail, cupboardAvailList, 'li');
            createEl(cupboardUnavail, cupboardUnavailList, 'li');


        }); // Ajax function
    }
    
    
    
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
        
        
        var renderElements = $('#mainSection .'+routeName),
            renderNav = $('#navMenu .'+routeName),
            allMain = $('#mainSection > div'),
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

        console.log('pageName: '+pageName);
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
            thisAvailItem = cupboardList[0].available[i].food;
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
        
        // Reset the controller array
        cupboardAvail = [];

        for (i=0; i<cupboardList[0].available.length; i++){
            cupboardAvail.push(cupboardList[0].available[i].food);
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
        
        // Loop over items in cupboard JSON model and push them into an array
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
        
        // Reset the controller array
        cupboardUnavail = [];

        for (i=0; i<cupboardList[0].unavailable.length; i++){
            cupboardUnavail.push(cupboardList[0].unavailable[i].food);
        }

        event.target.setAttribute('class', 'selected');
        
        // Re-fetch model to update lists
        getModelData();
    };
    
    
    
    /* ============================ NAV CONTROLLERS ================================ */
    
    
    
    function getNavSequence(button) {
        console.log('You clicked '+button);
        
        var sequenceId = '';
        
        if ( window.location.hash == '#'){
            sequenceId = 0;
        } else if (window.location.hash == '') {
            sequenceId = 0;
        } else {
            
            for (i=0; i<navSequence.length; i++) {
                if (window.location.hash == navSequence[i]) {
                    sequenceId = i;
                    
                    break;
                }
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
                page = ''; //Home page
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
    
    
    function findRecipes () {
        
        var availItems = [],
            unavailItems = [];
        
        // Add all items in available and unavailable models into arrays
        for (i=0; i<available.length; i++) { availItems.push(available[i].food); }
        for (i=0; i<available.length; i++) { unavailItems.push(available[i].food); }
        
        for (a=0; a<availItems.length; a++){
            
            for (b=0; b<recipes.length; b++){
                
                for (c=0; c<recipes[].length; c++){
                
                
                
                }
                
            }
        }
        
        
        // recipesWithAvail =  Find recipes that use cupboard ingredients 
        // recipesWithUnavail = Find recipes within recipesWithAvail that use unavailable ingredients
        // recipesMatch = Remove recipesWithUnavail from recipesWithAvail
        
        // return recipesMatch
        
    }
    
    
    
    
}); // DOM ready