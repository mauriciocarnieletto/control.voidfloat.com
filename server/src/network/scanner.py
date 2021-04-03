
import networkscan
import requests
from ..helpers import log

def scan():
    devices = get_network_devices()
    identify_voids(devices)

def get_network_devices():
    log.debug('Getting network devices')

    my_network = "192.168.0.0/24"
    my_scan = networkscan.Networkscan(my_network)
    my_scan.run()

    log.debug('Found {0} devices'.format(len(my_scan.list_of_hosts_found)))
    return my_scan.list_of_hosts_found

def identify_voids(devices):
    log.debug('Starting to identify wich devices are voids')
    for device in devices:
        try:
            log.debug('Pinging {0}'.format(device))
            ping = requests.get("http://{0}:3000/ping".format(device))
            print(ping)
        except:
            log.debug('Device {0} is not a void'.format(device))