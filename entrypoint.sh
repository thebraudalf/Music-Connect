
#!/bin/bash

# Start Fluvio Cluster
fluvio cluster start

# Access listening-history-module current directory
cd utils/fluvio/listening-history-module

# Building Smart Module
smdk build

# Loading Smart Module
smdk load

# Start the application
exec npm run server