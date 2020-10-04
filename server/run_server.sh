#!/bin/bash
# Delete generated client files in server directory
rm -rf public

# Build client files
cd ../client
yarn && yarn run build


# Start server
cd ../server
go run server.go
