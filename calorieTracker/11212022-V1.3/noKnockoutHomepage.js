window.addEventListener('DOMContentLoaded', init);

function init() {
    let foodDiary = getFoodFromStorage();
    addFoodsToDocument(foodDiary);
    initFormHandler();
}

function getFoodFromStorage() {
    var diary = JSON.parse(window.localStorage.getItem('diary'));
    if (diary == null) {
        return [];
    }
    return diary;
}

function addFoodsToDocument(foodDiary) {
    var breakfast_table = document.getElementById('breakfast_table');
    var lunch_table = document.getElementById('lunch_table');
    var dinner_table = document.getElementById('dinner_table');
    for (var i = 0; i < foodDiary.length; i++) {
        var ec = document.createElement('entry-card');
        ec.data = foodDiary[i];
        if (foodDiary[i]['mealType'] == JSON.stringify("breakfast")) {
            breakfast_table.append(ec);
        }
        if (foodDiary[i]['mealType'] == JSON.stringify("lunch")) {
            lunch_table.append(ec);
        }
        if (foodDiary[i]['mealType'] == JSON.stringify("dinner")) {
            dinner_table.append(ec);
        }
    }
}

function saveFoodToDiary(foodDiary) {
    localStorage.diary = JSON.stringify(foodDiary);
}




function initFormHandler() {
   
    
    // Manually creating two entry cards
    let entryCard = document.createElement('entry-card');
    let entry = {};
    entry['id'] = 'apple1';
    entry['foodName'] = 'Apple';
    entryCard.data = entry;

    let entryCard2 = document.createElement('entry-card');
    let entry2 = {};
    entry2['id'] = 'carrots';
    entry2['foodName'] = 'carrots';
    entryCard2.data = entry2;


    // Gets a reference to the breakfast table
    var breakfast_table = document.getElementById('breakfast_table');

    var x = JSON.parse(localStorage.getItem('diary'))

    var deleteButton = document.getElementById('deletefood');

    deleteButton.addEventListener('click', (event) => {
        // bt is the breakfast table of entry cards
        var bt = document.getElementById('breakfast_table');
        // Gets a list of all the entries in breakfast
        var bt_entries = bt.getElementsByTagName('entry-card');

        var lt = document.getElementById('lunch_table');
        var lt_entries = lt.getElementsByTagName('entry-card');

        var dt = document.getElementById('dinner_table');
        var dt_entries = dt.getElementsByTagName('entry-card');


        var toDelete = []
        var diary = getFoodFromStorage();
        // Loops through and finds which indices need to be deleted
        for (var i = 0; i < bt_entries.length; i++) {
            if (bt_entries[i].shadowRoot.querySelectorAll('input')[0].checked == true) {
                toDelete.push(i);
            }
        }
        // Goes and deletes the indices
        for (var i = toDelete.length - 1; i >= 0; i--) {
            diary.splice(toDelete[i], 1);
        }
        saveFoodToDiary(diary);
        location.reload();
       
    })

    var submitButton = document.getElementById('popButton1');
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        var foodType = JSON.stringify(document.getElementById("foodType").value);
        var mealType = JSON.stringify(document.getElementById("mealType").value);
        
        
        var foodEntry = {};
        foodEntry['id'] = 'apple1';
        foodEntry['foodName'] = foodType;
        foodEntry['mealType'] = mealType;
        var foodEntryCard = document.createElement('entry-card');
        foodEntryCard.data = foodEntry;
        
        var alreadyAdded = getFoodFromStorage();
        alreadyAdded.push(foodEntry);
        
        localStorage.diary = JSON.stringify(alreadyAdded);
        
    })
    

}
