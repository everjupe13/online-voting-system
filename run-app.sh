#!/bin/bash

# Store the current directory in a variable
current_dir=$(pwd)

# Extract the name of the current directory
current_dir_name=$(basename "$current_dir")

# Print the current directory name
echo "Current directory: $current_dir_name"

# Open a new terminal window and run the first script
osascript -e "tell app \"Terminal\" to do script \"cd $current_dir/server-api && yarn run dev\""

# Run the second script
cd . && yarn run dev
