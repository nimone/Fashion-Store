#!/bin/bash
systemctl start mongod
cd ./client && npm run dev | 
sed -e 's/^/[client] /' & 
cd ./api && npm run dev |
sed -e 's/^/[api] /' &&
kill $!