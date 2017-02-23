from django.http import HttpResponse


def index(request):
    """
    Processes the user's response and sends back a reply

    :param request: HTTP request containing the user's text
    :return: None
    """

    if request.body is None:
        text = str(request.body)
        return HttpResponse(text)
    else:
        return HttpResponse("Braden Suxxxxx")
