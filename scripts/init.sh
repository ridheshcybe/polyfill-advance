#!/bin/bash

git add .
read -p 'commit message: ' VAR
git commit -S -m "$VAR"
git push origin main