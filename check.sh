#!/bin/bash

# Source nvm setup script to make it available in this script
source ~/.nvm/nvm.sh

# Activate the desired Node.js version using nvm
nvm use 18

# Run the commands
tsc --project .
eslint .
