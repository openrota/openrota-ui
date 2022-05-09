#!/bin/sh


if [ "x$KEYCLOAK_REALM" = "x" ]
then
  KEYCLOAK_REALM="redhat-external"
fi
if [ "x$KEYCLOAK_URL" = "x" ]
then
  KEYCLOAK_URL="https://sso.redhat.com/auth/"
fi
if [ "x$KEYCLOAK_SSL_REQUIRED" = "x" ]
then
  KEYCLOAK_SSL_REQUIRED="all"
fi
if [ "x$KEYCLOAK_RESOURCE" = "x" ]
then
  KEYCLOAK_RESOURCE="cloud-services"
fi

echo "Generating keycloak.json"
echo "{
  \"realm\": \"$KEYCLOAK_REALM\",
  \"auth-server-url\": \"$KEYCLOAK_URL\",
  \"ssl-required\": \"$KEYCLOAK_SSL_REQUIRED\",
  \"resource\": \"$KEYCLOAK_RESOURCE\",
  \"public-client\": true,
  \"confidential-port\": 0
}" > /opt/app-root/src/keycloak.json

echo "Generated keycloak.json successfully."
cat /opt/app-root/src/keycloak.json
