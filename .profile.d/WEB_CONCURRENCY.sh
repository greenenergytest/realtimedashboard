#!/bin/sh
# Get total memory in MB
if [ -r /sys/fs/cgroup/memory/memory.limit_in_bytes ]; then
  MEMORY=$(< /sys/fs/cgroup/memory/memory.limit_in_bytes)
else
  echo "Error: Unable to read /sys/fs/cgroup/memory/memory.limit_in_bytes"
  exit 1
fi

# Calculate concurrency
WEB_CONCURRENCY=$((MEMORY / 1048576 / 512))

# Ensure at least 1 concurrency
WEB_CONCURRENCY=${WEB_CONCURRENCY:-1}

# Export the variable
export WEB_CONCURRENCY

