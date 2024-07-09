import requests
import os
import time
from datetime import datetime

url = os.environ['API_PORTAINER']
api_key = os.environ['HEADER_API_KEY']
endpoint_id = os.environ['ENDPOINT_ID']
registry_auth = os.environ['REGISTRY_AUTH']
container_image = os.environ['CONTAINER_IMAGE']
stack_name = os.environ['STACK_NAME']
service_name = os.environ['SERVICE_NAME']
full_service_name = stack_name+"_"+service_name
url_app = os.environ['URL_APP']
headers = {
    "X-API-Key": api_key
}
header_registry_auth = headers.copy()
header_registry_auth["X-Registry-Auth"] = registry_auth
now = datetime.now()
dt_string = now.strftime("%d/%m/%Y %H:%M:%S")

# Get data service
service_data_response = requests.get(url=url+"/endpoints/"+endpoint_id+"/docker/services/"+full_service_name, headers=header_registry_auth)
print(service_data_response)
service_data = service_data_response.json()
service_id = service_data["ID"]
service_version = str(service_data["Version"]["Index"])

# Pull image
print("Pull image: " + container_image)
pull_image_response = requests.post(url=url+"/endpoints/"+endpoint_id+"/docker/images/create?fromImage="+container_image, headers=header_registry_auth)
print(pull_image_response)
print("pull image done")

# Create data body for update service
data = {}
data["Name"] = service_data["Spec"]["Name"]
data["Labels"] = service_data["Spec"]["Labels"]
data["Labels"]["com.docker.stack.image"] = container_image
data["TaskTemplate"] = service_data["Spec"]["TaskTemplate"]
data["TaskTemplate"]["ContainerSpec"]["Image"] = container_image
data["TaskTemplate"]["ContainerSpec"]["Env"] = [ "DATE_UPDATE="+dt_string ]
data["TaskTemplate"]["ForceUpdate"] = 1
data["Mode"] = service_data["Spec"]["Mode"]
data["EndpointSpec"] = service_data["Spec"]["EndpointSpec"]

# Update service
print("Update service")
service_response = requests.post(url=url+"/endpoints/"+endpoint_id+"/docker/services/"+service_id+"/update?version="+service_version, headers=header_registry_auth, json=data)
print(service_response)
service = service_response.json()
print(service)

# Wait service ready
print("Wait service deployment ready")
flag = 0
for i in range(30):
    time.sleep(5)
    status_code = requests.get(url=url_app).status_code
    if status_code == 200:
        print("Update service done")
        flag = 1
        break

if flag == 0:
    print("Service not ready")
