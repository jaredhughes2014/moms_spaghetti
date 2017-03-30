/**
 * Created by Roper on 3/23/2017.
 */

var budget = 0;
var medicine = 0;
var clothes = 0;
var ox = 0;

var count = 0;

function init_inventory(){
    budget = 100;
    medicine = 0;
    clothes = 0;
    ox = 0;
    count = 0;
}

function incr_count(){
    count++;
    return count;
}

function handle_inventory(body){
    var response;

    if (body.includes('reset')) {
        response = 'The count is now at ' + incr_count();
    }
    else {
        init_inventory();
        response = 'The count has been reset';
    }


    return response;
}

module.exports = {
    incr_count,
    handle_inventory
}