#!/bin/bash

read -p 'commit msg: ' VAR

git commit -S -am $VAR