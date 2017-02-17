
from alexa.response import build_response


def get_slot(intent, slot_name):
    """
    Gets a slot with a given name from the given intent object

    :param intent: The intent dictionary
    :param slot_name: The name of the slot to get
    :return: The value of the slot object
    """
    return intent['slots'][slot_name]['value']


# Define all functions here


def handle_conversation(intent, session):
    """
    Handles a user intending to have a conversation

    :param intent: The intent object
    :param session: The current session
    :return: Response object built from the conversation request
    """

    # TODO: while testing, simply repeat what the user said
    body = get_slot(intent, 'HaveConversation')
    return build_response('Conversation', body, None, False)
