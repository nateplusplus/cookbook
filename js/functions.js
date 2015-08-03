$( document ).ready(function(){
    
    var availableBox = document.getElementById('availableBox'),
        availableBoxList = document.getElementById('availableBoxList'),
        unavailableBoxList = document.getElementById('unavailableBoxList'),
        cupboardAvailList = document.getElementById('cupboardAvailList'),
        cupboardUnavailList = document.getElementById('cupboardUnavailList'),
        testArray = ['test', '1', '2', '3'],
        testArray2 = ['Hello', 'world'],
        testArray3 = ['This', 'rocks'],
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
        cupboardUnavail = [];
    
    
    function createEl(model, parent, child) {
        
        parent.innerHTML = '';

        for (i=0; i<model.length; i++){
            var li = document.createElement(child);
            var txt = document.createTextNode(model[i]);
            li.appendChild(txt);
            parent.appendChild(li);
        }

    }
    
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
                console.log('Ajax request complete');
            }
        }).then(function(){

            recipes = model.recipes;

            for (a=0; a<recipes.length; a++){

                recipeNames.push(recipes[a].name);

                for (b=0; b<recipes[a].ingredients.length; b++){
                    allIngredients.push(recipes[a].ingredients[b].food);
                }

            }

            createEl(allIngredients, availableBoxList, 'li');
            createEl(allIngredients, unavailableBoxList, 'li');
            createEl(cupboardAvail, cupboardAvailList, 'li');
            createEl(cupboardUnavail, cupboardUnavailList, 'li');


        }); // Ajax function
    }
    
    getModelData();
    
    availableBoxList.onclick = function(event){

        var obj = new Object();
        obj.food = event.target.innerHTML;
        cupboardList[0].available.push(obj);

        cupboardAvail = [];

        for (i=0; i<cupboardList[0].available.length; i++){
            cupboardAvail.push(cupboardList[0].available[i].food);
        }
        for (i=0; i<cupboardList[0].unavailable.length; i++){
            cupboardUnavail.push(cupboardList[0].unavailable[i].food);
        }

        console.log('Available: '+cupboardAvail);

        event.target.setAttribute('class', 'selected');
        
        getModelData();
    };

    unavailableBoxList.onclick = function(event){

        var obj = new Object();
        obj.food = event.target.innerHTML;
        cupboardList[0].unavailable.push(obj);

        cupboardUnavail = [];

        for (i=0; i<cupboardList[0].unavailable.length; i++){
            cupboardUnavail.push(cupboardList[0].unavailable[i].food);
        }

        console.log('Unavailable: '+cupboardUnavail);

        event.target.setAttribute('class', 'selected');
        
        getModelData();
    };
    
});