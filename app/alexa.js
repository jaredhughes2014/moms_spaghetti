db = require('./db');

module.exports = lambda_handler;

//var inventory = require("./trailInventory.js")

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

// ---------- Functions -----------


function get_slot(intent, slot_name) {
    return intent.slots[slot_name].value;
}


// Define all functions here

function handle_node(body, attrs) {
    let ret;
    db.getConversation(attrs.conv_name, ({conversation}) =>
    {
        db.getNode({conversationName: attrs.conv_name, nodeName: attrs.node_name}, ({node}) =>
        {
            while (true)
            {
                let prompts = node.prompts;

                //Handle their reply
                if (attrs.prompts_given > 0 && attrs.prompts_given <= prompts.length)
                {
                    let p = prompts[attrs.prompts_given-1];
                    attrs['_'+p.target] = body;
                }
                else if (attrs.prompts_given > prompts.length) {
                    db.getNodeByKeywords({conversationName: attrs.conv_name, nodeName: attrs.node_name, phrase: body}, (arg) =>
                    {
                        //We can't expand the arguments, because we need to keep the old meaning of identifier 'node'
                        const node2 = arg.node;
                        if (!node2)
                        {
                            //I'd like to be more helpful, but repeating the prompt isn't so terrible
                            ret = mk_reply('Conversation', node.text, node.text, false, attrs);
                            return;
                        }
                        attrs.node_name = node2.name;
                        console.log("=== Jumping to " + node2.name);
                        attrs.prompts_given = 0;
                        node = node2;
                        ret = null;
                        return;
                    });
                    if (ret == null) continue; //Try the child node
                    return;
                }

                //Give a reply of our own
                if (attrs.prompts_given < prompts.length)
                {
                    let text = prompts[attrs.prompts_given++].text;
                    ret = mk_reply('Conversation', text, text, false, attrs);
                    return;
                }
                else
                {
                    attrs.prompts_given++;
                    ret = mk_reply('Conversation', node.text, node.text, false, attrs);
                    return;
                }
            }
        });
    });
    return ret;
}

function handle_conversation(intent, session) {
    body = get_slot(intent, 'HaveConversation').toLowerCase();
    console.log(body);
    attrs = session.attributes || {};
    if (!attrs.conv_name) {
        let ret;
        db.getConversationByKeywords({phrase: body}, ({conversation}) =>
        {
            if (!conversation)
            {
                ret = mk_reply('No Conversation', "I'm not sure how to talk about that. Please pick another topic.", "What do you want to talk about?", false);
                return;
            }
            attrs.conv_name = conversation.name;
            db.getNode({conversationName: attrs.conv_name, nodeName: 'Start'}, ({node}) =>
            {
                if (!node)
                {
                    ret = mk_reply('Broken Conversation', "The given conversation has no start node. Please pick another topic.", "What do you want to talk about?", false);
                    return;
                }
                attrs.node_name = 'Start';
                attrs.prompts_given = 0;
                ret = handle_node(body, attrs);
                return;
            });
        });
        return ret;
    }
    return handle_node(body, attrs);
    /*
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

    // Handle counting
    if (body.includes('count'))
        return mk_reply('Conversation',
            inventory.handle_inventory(body),
            null, false
        );

    return mk_reply('Conversation', body, null, false);
    */
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
