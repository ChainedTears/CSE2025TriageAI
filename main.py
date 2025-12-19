import requests

endpoint = "https://cs-api.pltw.org/triageai/reset?password=8054"

print(requests.post(endpoint).text)

#8054

# cs-api.pltw.org/IncidentDispatch?text=
