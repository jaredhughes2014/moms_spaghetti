/**
 * Created by Roper on 3/23/2017.
 */

// Inventory variables
var budget = 0;
var medicine = 0;
var clothes = 0;
var ox = 0;

// Test count variable
var count = 0;

// Sets all inventory variables to zero
function init_inventory(){
    budget = 100;
    medicine = 0;
    clothes = 0;
    ox = 0;
    count = 0;
}

// Increments and returns the count
function incr_count(){
    count++;
    return count;
}

// Receives a body of input and will either increment
// or reset the count
function handle_inventory(body){
    var response;

    if (body.includes('reset')) {
        init_inventory();
        response = 'The count has been reset';
    }
    else {
        response = 'The count is now at ' + incr_count();
    }

    return response;
}

// Exports
module.exports = {
    handle_inventory
}