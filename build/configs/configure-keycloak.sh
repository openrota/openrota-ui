#!/bin/sh


if [ "x$KEYCLOAK_REALM" = "x" ]
then
  KEYCLOAK_REALM="EmployeeIDP"
fi
if [ "x$KEYCLOAK_URL" = "x" ]
then
  KEYCLOAK_URL="https://auth.stage.redhat.com/auth/"
fi
if [ "x$KEYCLOAK_SSL_REQUIRED" = "x" ]
then
  KEYCLOAK_SSL_REQUIRED="all"
fi
if [ "x$KEYCLOAK_RESOURCE" = "x" ]
then
  KEYCLOAK_RESOURCE="openrota"
fi
if [ "x$SECRET" = "x" ]
then
  echo "Secret Not Set. Aborting the process..."
  exit 1;
fi

echo "Generating keycloak.json"
echo "{
  \"realm\": \"$KEYCLOAK_REALM\",
  \"auth-server-url\": \"$KEYCLOAK_URL\",
  \"ssl-required\": \"$KEYCLOAK_SSL_REQUIRED\",
  \"resource\": \"$KEYCLOAK_RESOURCE\",
  \"credentials\": {
    \"secret\": \"$SECRET\"
  },
  \"confidential-port\": 0
}" > /opt/app-root/src/keycloak.json

echo "Generated keycloak.json successfully."
cat /opt/app-root/src/keycloak.json
