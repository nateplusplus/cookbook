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
            
            // Filter data based on any user input
            filterRecipeData(cupboardAvail);
            
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
        
        event.preventDefault();

        var obj = new Object();
        obj.food = event.target.innerHTML;
        cupboardList[0].available.push(obj);
        
        // Reset the controller array
        cupboardAvail = [];

        for (i=0; i<cupboardList[0].available.length; i++){
            cupboardAvail.push(cupboardList[0].available[i].food);
        }
        
        event.target.setAttribute('class', 'selected');
        
        // Re-fetch model to update lists
        getModelData();
    };
    
    
    // On-click, get the text of clicked element
    // Add text to the cupboard.unavailable model
    unavailableBoxList.onclick = function(event){
        
        event.preventDefault();

        var obj = new Object();
        obj.food = event.target.innerHTML;
        cupboardList[0].unavailable.push(obj);
        
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
    
    
    function filterRecipeData (available) {
        
        for (i=0; i<available.length; i++) {
            
            var thisCupboardItem = available[i];
            
            for (a=0; a<recipes.length; a++) {
            
                var thisRecipe = recipes[a];
                
                for (b=0; b<thisRecipe.ingredients.length; b++) {
                    
                    var thisIngredient = thisRecipe.ingredients[b].food;
                    
                    if( thisCupboardItem === thisIngredient ) {
                        
                        var recipeId = recipes.indexOf(thisRecipe);
                        
                        if ( matchedRecipes.length > 0 ){
                        
                            for ( c=0; c<matchedRecipes.length; c++ ) {
                                
                                var thisMatchedRecipe = matchedRecipes[c];
                                
                                
                                // How to compare and NOT add matches???

                                if ( recipeId === thisMatchedRecipe ) {
                                    continue;
                                } 
                                
                                console.log();
                            }
                            
                        } else {
                            
                            matchedRecipes.push(recipeId);
                            
                        }
                        
                        
                        console.log('Recipe ids: '+matchedRecipes);
                    }
                    
                }
                
            }
        }
        
        
        // recipesWithAvail =  Find recipes that use cupboard ingredients 
        // recipesWithUnavail = Find recipes within recipesWithAvail that use unavailable ingredients
        // recipesMatch = Remove recipesWithUnavail from recipesWithAvail
        
        // return recipesMatch
        
    }
    
    
    
    
}); // DOM ready