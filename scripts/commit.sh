#!/bin/bash

read -p 'commit msg: ' VAR

git commit -S -m "$VAR"