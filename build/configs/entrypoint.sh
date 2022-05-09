#!/bin/sh

echo "---------------------------------------------"
echo "Performing the Initial Setup..."
echo "---------------------------------------------"
source /usr/local/bin/configure-keycloak.sh

echo "---------------------------------------------"
echo "Setup Complete. Nginx Server Started....."
echo "---------------------------------------------"
source /usr/libexec/s2i/run
