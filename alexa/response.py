

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


def build_response(title, output, reprompt, should_end_session):
    """
    Template response function from Amazon modified to use the Alexa response helper
    class
    :param session_attributes:
    :return:
    """
    alexa_resp = AlexaResponse(title=title, output=output, reprompt=reprompt, end_session=should_end_session)
    return {
        'version': '1.0',
        'sessionAttributes': {},
        'response': alexa_resp.export()
    }
