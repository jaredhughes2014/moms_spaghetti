"""
This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well
as testing instructions are located at http://amzn.to/1LzFrj6

For additional samples, visit the Alexa Skills Kit Getting Started guide at
http://amzn.to/1LGWsLG
"""

from __future__ import print_function


class AlexaResponse:
    """
    Wrapper class for generating responses to send to the user.
    """

    def __init__(self, title, output, reprompt, end_session):
        """
        Builds a response to send to Alexa after processing the user's text

        :param title: The title of the response
        :param output: The text to speak to the user
        :param reprompt: The text to send to the user urging them to speak again
        :param end_session: If true, the session should be ended
        """
        self.title = title
        self.output = output
        self.reprompt = reprompt
        self.end_session = end_session

        # Types
        self.reprompt_type = 'PlainText'
        self.output_type = 'PlainText'
        self.card_type = 'Simple'

    def export(self):
        """
        Converts this response into a dictionary form so it can be emitted to
        Alexa

        :return: Dictionary formatted for return to Alexa
        """
        return {
            'outputSpeech': {
                'type': self.output_type,
                'text': self.output
            },
            'card': {
                'type': self.card_type,
                'title': "SessionSpeechlet - " + self.title,
                'content': "SessionSpeechlet - " + self.output
            },
            'reprompt': {
                'outputSpeech': {
                    'type': self.reprompt_type,
                    'text': self.reprompt
                }
            },
            'shouldEndSession': self.end_session
        }


def build_response(title, output, reprompt, should_end_session, attrs={}):
    """
    Template response function from Amazon modified to use the Alexa response helper
    class
    :param session_attributes:
    :return:
    """
    alexa_resp = AlexaResponse(title=title, output=output, reprompt=reprompt, end_session=should_end_session)
    return {
        'version': '1.0',
        'sessionAttributes': attrs,
        'response': alexa_resp.export()
    }
    
# ---------- Config -----------

exitPhrases = ["goodbye", "bye", "quit", "exit", "stop", "cancel"];

my_tree = [
    {
        'text':'You come to a fork in the road. A troll invites you to a fighting festival down the right path. He\'s betting on last year\'s champion - Right Hook Steve. Which path do you take?',
        'retext':'Right for fighting festival, left to continue past',
        'left':1,
        'right':2
    },
    {
        'text':'You continue on, content with your life as it is. Congrats on being fulfilled. You win.',
        'retext':None,
    },
    {
        'text':'You enter the festival and quickly progress to the finals! Your opponent Steve throws a punch - which way do you dodge?',
        'retext':'Dodge right or left?',
        'left':3,
        'right':4
    },
    {
        'text':'You dodge to your left - Steve\'s right. His famous right hook hits you squarely in the jaw, and you\'re down for the count! You lose.',
        'retext':None
    },
    {
        'text':'You dodge to your right - Steve\'s left. You nimbly avoid his famous right hook, and swipe his legs! He goes down like a ton of bricks, and you win fame and riches beyond your wildest dreams. You win!',
        'retext':None
    }
]

# ---------- Functions -----------


def get_slot(intent, slot_name):
    """
    Gets a slot with a given name from the given intent object

    :param intent: The intent dictionary
    :param slot_name: The name of the slot to get
    :return: The value of the slot object
    """
    return intent['slots'][slot_name]['value']


# Define all functions here


def moved_to(tree_index):
    node = my_tree[tree_index]
    if 'left' in node:
        attrs = {'game_state':tree_index}
    else:
        attrs = {}
    return build_response('Game', node['text'], node['retext'], False, attrs)

def handle_conversation(intent, session):
    """
    Handles a user intending to have a conversation

    :param intent: The intent object
    :param session: The current session
    :return: Response object built from the conversation request
    """

    # TODO: while testing, simply repeat what the user said
    body = get_slot(intent, 'HaveConversation').lower()
    if ('game_state' in session['attributes']):
	place = session['attributes']['game_state']
	node = session[place];
	l = "left" in body;
	r = "right" in body;
	if l and r:
	    return build_response('Game', 'Pick one. '+node['retext'], node['retext'], False, {'game_state':place})
	if not (l or r):
	    return build_response('Game', node['retext'], node['retext'], False, {'game_state':place})
	if l:
	    return moved_to(node['left'])
	else:
	    return moved_to(node['right'])
    if ("game" in body):
	return moved_to(0);
    if (body in exitPhrases):
        return build_response('Conversation', 'Goodbye!', None, True)
    if ("help" in body):
        return build_response('Conversation',
            'You can ask to leave, ask for this help, or ask to start the mini game',
            None, False
        )
    return build_response('Conversation', body, None, False)


# --------------- Events ------------------

def on_session_started(request, session):
    """
    Called when the session starts
    """
    print("on_session_started requestId=" + request['requestId'] + ", sessionId=" + session['sessionId'])


def on_launch(launch_request, session):
    """
    Called when the user launches the skill without specifying what they want
    """
    print("on_launch requestId=" + launch_request['requestId'] + ", sessionId=" + session['sessionId'])

    body = "What would you like to talk about?"
    reprompt = "I'm sorry, I didn't understand that"

    return build_response("Welcome", body, reprompt, False)


def on_intent(intent_request, session):
    """
    Called when the user specifies an intent for this skill
    """

    print("on_intent requestId=" + intent_request['requestId'] + ", sessionId=" + session['sessionId'])

    intent = intent_request['intent']
    intent_name = intent_request['intent']['name']

    # Dispatch to your skill's intent handlers
    if intent_name == "ConversationIntent":
        return handle_conversation(intent, session)
    else:
        raise ValueError("Invalid intent")


def on_session_ended(session_ended_request, session):
    """
    Called when the user ends the session.
    Is not called when the skill returns should_end_session=true
    """
    print("on_session_ended requestId=" + session_ended_request['requestId'] + ", sessionId=" + session['sessionId'])


# --------------- Main handler ------------------

def lambda_handler(event, context):
    """
    Route the incoming request based on type (LaunchRequest, IntentRequest,
    etc.) The JSON body of the request is provided in the event parameter.
    """
    print("event.session.application.applicationId=" + event['session']['application']['applicationId'])

    """
    Uncomment this if statement and populate with your skill's application ID to
    prevent someone else from configuring a skill that sends requests to this
    function.
    """
    if event['session']['application']['applicationId'] != "amzn1.ask.skill.8f68d286-df3b-46b8-abce-db766372f1fb":
        raise ValueError("Invalid Application ID")

    if event['session']['new']:
        on_session_started({'requestId': event['request']['requestId']},
                           event['session'])

    if event['request']['type'] == "LaunchRequest":
        return on_launch(event['request'], event['session'])
    elif event['request']['type'] == "IntentRequest":
        return on_intent(event['request'], event['session'])
    elif event['request']['type'] == "SessionEndedRequest":
        return on_session_ended(event['request'], event['session'])
