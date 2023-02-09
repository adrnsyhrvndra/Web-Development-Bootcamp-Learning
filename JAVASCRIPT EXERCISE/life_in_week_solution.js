
function lifeWEEK(age){

    var yearsRemaining = 90 - age;

    var days = yearsRemaining * 365;

    var weeks = yearsRemaining * 52;

    var months = yearsRemaining * 12;
    
    console.log("You Have " + days + " days " + weeks + " weeks " + months + " months");

}

lifeWEEK(12);