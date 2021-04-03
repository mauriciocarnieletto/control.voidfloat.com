import socket
import os

ssid=os.popen("iwgetid -r").read()
## getting the hostname by socket.gethostname() method
hostname = socket.gethostname()
## getting the IP address using socket.gethostbyname() method
ip_address = socket.gethostbyname(hostname)


print ({ssid, hostname, ip_address})
