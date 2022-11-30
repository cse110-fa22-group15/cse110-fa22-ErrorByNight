window.addEventListener('DOMContentLoaded', init);

function init() {
    let breakfastDiary = getFoodFromStorage()[0];
    let lunchDiary = getFoodFromStorage()[1];
    let dinnerDiary = getFoodFromStorage()[2];
    addFoodsToDocument(breakfastDiary, lunchDiary, dinnerDiary);
    initFormHandler();
}

function getFoodFromStorage() {
    var breakfastDiary = JSON.parse(window.localStorage.getItem('breakfastDiary'));
    var lunchDiary = JSON.parse(window.localStorage.getItem('lunchDiary'));
    var dinnerDiary = JSON.parse(window.localStorage.getItem('dinnerDiary'));

    if (breakfastDiary == null) {
        breakfastDiary = [];
    }
    if (lunchDiary == null) {
        lunchDiary = [];
    }
    if (dinnerDiary == null) {
        dinnerDiary = []
    }
    return [breakfastDiary, lunchDiary, dinnerDiary];
}

function addFoodsToDocument(breakfastDiary, lunchDiary, dinnerDiary) {
    var breakfastTable = document.getElementById('breakfastTable');
    var lunchTable = document.getElementById('lunchTable');
    var dinnerTable = document.getElementById('dinnerTable');

    for (var i = 0; i < breakfastDiary.length; i++) {
        var ec = document.createElement('entry-card');
        ec.data = breakfastDiary[i];
        breakfastTable.append(ec);
    }

    for (var i = 0; i < lunchDiary.length; i++) {
        var ec = document.createElement('entry-card');
        ec.data = lunchDiary[i];
        lunchTable.append(ec);
    }

    for (var i = 0; i < dinnerDiary.length; i++) {
        var ec = document.createElement('entry-card');
        ec.data = dinnerDiary[i];
        dinnerTable.append(ec);
    }

}

function saveFoodToDiary(breakfastDiary, lunchDiary, dinnerDiary) {
    localStorage.breakfastDiary = JSON.stringify(breakfastDiary);
    localStorage.lunchDiary = JSON.stringify(lunchDiary);
    localStorage.dinnerDiary = JSON.stringify(dinnerDiary);
}

function initFormHandler() {
    var username = localStorage.getItem('username');
    document.getElementsByName("name")[0].placeholder = username;

    // var sex = localStorage.getItem('sex');
    // document.getElementsByID("sex")= sex;

    var age = localStorage.getItem('age');
    document.getElementsByName("age")[0].placeholder = age;

    var currentWeight = localStorage.getItem('currentWeight');
    document.getElementsByName("weight1")[0].placeholder = currentWeight;

    var goalWeight = localStorage.getItem('goalWeight');
    document.getElementsByName("weight2")[0].placeholder = goalWeight;

    // Set default date to today
    var datePicker = document.getElementById('datepicker');
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
    datePicker.value = today;

    

    // Deletion function relies on the delete button and checkmarks
    var deleteButton = document.getElementById('deletefood');
    deleteButton.addEventListener('click', (event) => {
        // Find the breakfast, lunch, and dinner tables and grab all the entry cards for each respective
        // table
        var bt = document.getElementById('breakfastTable');
        var bt_entries = bt.getElementsByTagName('entry-card');

        var lt = document.getElementById('lunchTable');
        var lt_entries = lt.getElementsByTagName('entry-card');

        var dt = document.getElementById('dinnerTable');
        var dt_entries = dt.getElementsByTagName('entry-card');

        // Loop through each diaries entry cards and inspects if the checkmark is checked
        // Adds all the indices into an array and goes back and deletes entries from the diaries
        var toDelete = []
        var breakfastDiary = getFoodFromStorage()[0];
        for (var i = 0; i < bt_entries.length; i++) {
            if (bt_entries[i].shadowRoot.querySelectorAll('input')[0].checked == true) {
                toDelete.push(i);
            }
        }

        for (var i = toDelete.length - 1; i >= 0; i--) {
            breakfastDiary.splice(toDelete[i], 1);
        }

        // Does the same thing as above but for lunch
        toDelete = [];
        var lunchDiary = getFoodFromStorage()[1];
        for (var i = 0; i < lt_entries.length; i++) {
            if (lt_entries[i].shadowRoot.querySelectorAll('input')[0].checked == true) {
                toDelete.push(i);
            }
        }
        for (var i = toDelete.length - 1; i >= 0; i--) {
            lunchDiary.splice(toDelete[i], 1);
        }

        // Does the same thing as above but for dinner
        toDelete = [];
        var dinnerDiary = getFoodFromStorage()[2];
        for (var i = 0; i < dt_entries.length; i++) {
            if (dt_entries[i].shadowRoot.querySelectorAll('input')[0].checked == true) {
                toDelete.push(i);
            }
        }

        for (var i = toDelete.length - 1; i >= 0; i--) {
            dinnerDiary.splice(toDelete[i], 1);
        }

        // Change the values in local storage for each diary
        saveFoodToDiary(breakfastDiary, lunchDiary, dinnerDiary);
        location.reload();
       
    })

    var submitButton = document.getElementById('popButton1');
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();

        // Create two variables that grab the values from the form
        var foodType = document.getElementById("foodType").value; 
        var mealType = document.getElementById("mealType").value;
        var calories = document.getElementById("calories1").value;
        
        // Create the foodEntry data which will be set to the entry card's data
        var foodEntry = {};
        foodEntry['foodName'] = foodType;
        foodEntry['mealType'] = mealType;
        foodEntry['calories'] = calories;
        var foodEntryCard = document.createElement('entry-card');
        foodEntryCard.data = foodEntry;

        // Checks which meal to append the card to based on what the user chooses
        if (mealType == "breakfast") {
            var alreadyAddedToBreakfast = getFoodFromStorage()[0];
            alreadyAddedToBreakfast.push(foodEntry);
            localStorage.breakfastDiary = JSON.stringify(alreadyAddedToBreakfast);
        }

        if (mealType == "lunch") {
            var alreadyAddedToLunch = getFoodFromStorage()[1];
            alreadyAddedToLunch.push(foodEntry);
            localStorage.lunchDiary = JSON.stringify(alreadyAddedToLunch);
        }
        
        if (mealType == "dinner") {
            var alreadyAddedToDinner = getFoodFromStorage()[2];
            alreadyAddedToDinner.push(foodEntry);
            localStorage.dinnerDiary = JSON.stringify(alreadyAddedToDinner);
        }
        
    })
}