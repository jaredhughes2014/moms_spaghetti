module.exports = handler;

var inventory = require("./trailInventory.js")

function handler(body) {
    //body = JSON.parse(body);
    return lambda_handler(body);
}

/*
    attrs = {}
    new = true
    while true:
        text = input()
        ret = lambda_handler({'request': {'type':"IntentRequest", 'intent':{'name':'ConversationIntent', 'slots':{'HaveConversation':{'value':text}}}, 'requestId':'0'}, 'session': {'application': {'applicationId':'amzn1.ask.skill.8f68d286-df3b-46b8-abce-db766372f1fb'}, 'new':new, 'sessionId':'0', 'attributes':attrs}}, null)
        new = false
        attrs = ret.sessionAttributes;
        ret = ret.response
        print(ret.outputSpeech.text)
        print(ret.reprompt.outputSpeech.text)
except EOFError:
    null
*/



function mk_reply(title, output, reprompt, end_session, attrs={}) {
    return {
        version: '1.0',
        sessionAttributes: attrs,
        response: {
            outputSpeech: {
                type: 'PlainText',
                text: output
            },
            card: {
                type: 'Simple',
                title: "SessionSpeechlet - " + title,
                content: "SessionSpeechlet - " + output
            },
            reprompt: {
                outputSpeech: {
                    type: 'PlainText',
                    text: reprompt
                }
            },
            shouldEndSession: end_session
        }
    }
}

// ---------- Config -----------

exit_phrases = ["goodbye", "bye", "quit", "exit", "stop", "cancel"];

my_tree = require('./dungeonTree.js');

// ---------- Functions -----------


function get_slot(intent, slot_name) {
    return intent.slots[slot_name].value;
}


// Define all functions here


function set_str_vars(string, attrs) {
    if (null==string) {
        return string;
    }
    pieces = string.split(/[\[\]]/);
    if (pieces.length%2 == 0) {
        return "error: unmatched brackets in template response";
        //This actually only checks to make sure there are an even number of brackets.
        //It treats 'hi [name]' just like 'hi ]name]'
    }
    string = pieces[0];
    ix = 1;
    while (ix < pieces.length) {
        s = '_'+pieces[ix];
        if (attrs[s]) s = attrs[s];
        else s = "unknown";
        string += s + pieces[ix+1];
        ix += 2;
    }
    return string;
}

function moved_to(tree_index, attrs) {
    node = my_tree[tree_index];
    text = set_str_vars(node.text, attrs);
    retext = set_str_vars(node.retext, attrs);
    if (node.opts) attrs.game_state = tree_index;
    else attrs = {};
    //Possibly do "attrs.game_state = undefined" if we want the rest to persist?
    return mk_reply('Game', text, retext, false, attrs);
}

function handle_conversation(intent, session) {
    body = get_slot(intent, 'HaveConversation').toLowerCase();
    console.log(body);
    attrs = session.attributes || {};
    if (attrs.game_state !== undefined) {
        place = attrs.game_state;
        node = my_tree[place];
        for (opt of node.opts) {
            if (opt.test(body, attrs)) {
                return moved_to(opt.next_index, attrs);
            }
        }
        return mk_reply('Game', node.retext, node.retext, false, attrs);
    }
    if (body.includes('game')) return moved_to(0, attrs);
    for (phrase of exit_phrases) {
        if (body.includes(phrase)) return mk_reply('Conversation', 'Goodbye!', null, true);
    }
    if (body.includes('help')) {
        return mk_reply('Conversation',
            'You can ask to leave, ask for this help, or ask to start the mini game',
            null, false
        );
    }
    if (body.includes('count')){
        return mk_reply('Conversation',
            'The count is now at ' + inventory.incr_count(),
            null, false)
    }
    return mk_reply('Conversation', body, null, false);
}


// --------------- Events ------------------

function on_session_started(request, session){
    //Called when the session starts
    //print("on_session_started requestId=" + request.requestId + ", sessionId=" + session.sessionId)
}


function on_launch(launch_request, session) {
    //Called when the user launches the skill without specifying what they want
    //print("on_launch requestId=" + launch_request.requestId + ", sessionId=" + session.sessionId)

    body = "What would you like to talk about?";
    reprompt = "I'm sorry, I didn't understand that";

    return mk_reply("Welcome", body, reprompt, false);
}


function on_intent(intent_request, session) {
    //Called when the user specifies an intent for this skill

    //print("on_intent requestId=" + intent_request.requestId + ", sessionId=" + session.sessionId)

    intent = intent_request.intent;
    intent_name = intent_request.intent.name;

    // Dispatch to your skill's intent handlers
    if (intent_name == "ConversationIntent") return handle_conversation(intent, session);
    return mk_reply("Unknown Intent Name", "Couldn't handle intent name " + intent_name.replace(/([A-Z])/g, " $1"), null, true);
}


function on_session_ended(session_ended_request, session) {
    /*
    Called when the user ends the session.
    Is not called when the skill returns should_end_session=true
    */
    console.log("on_session_ended requestId=" + session_ended_request.requestId + ", sessionId=" + session.sessionId);
    return mk_reply("So long suckas", "So long suckas", null, true);
}


// --------------- Main handler ------------------

function lambda_handler(evnt, context) {
    /*
    Route the incoming request based on type (LaunchRequest, IntentRequest,
    etc.) The JSON body of the request is provided in the event parameter.
    */
    //print("event.session.application.applicationId=" + event.session.application.applicationId)

    /*
    Uncomment this if statement and populate with your skill's application ID to
    prevent someone else from configuring a skill that sends requests to this
    function.
    */
    if (evnt.session.application.applicationId != "amzn1.ask.skill.8f68d286-df3b-46b8-abce-db766372f1fb") {
        throw "Invalid Application ID";
    }

    if (evnt.session.new) {
        on_session_started({'requestId': evnt.request.requestId},
                           evnt.session);
    }

    if (evnt.request.type == "LaunchRequest") {
        return on_launch(evnt.request, evnt.session);
    } else if (evnt.request.type == "IntentRequest") {
        return on_intent(evnt.request, evnt.session);
    } else if (evnt.request.type == "SessionEndedRequest") {
        return on_session_ended(evnt.request, evnt.session);
    } else {
        return mk_reply("Unknown Request Type", "Couldn't handle request type " + evnt.request.type.replace(/[A-Z]/g, " $1"), null, true);
    }
}
