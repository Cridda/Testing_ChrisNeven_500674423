#!/bin/sh

while ! nc -z config-ms 8888 ; do
    echo "Waiting for the Config Service"
    sleep 3
done
while ! nc -z discovery-ms 8761 ; do
    echo "Waiting for the Discovery Service"
    sleep 3
done

java -jar /root/account-ms.jar