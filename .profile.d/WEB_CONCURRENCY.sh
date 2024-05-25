#!/bin/sh
# Get total memory in MB
MEMORY=$(cat /sys/fs/cgroup/memory/memory.limit_in_bytes)
# Calculate concurrency
WEB_CONCURRENCY=$((MEMORY / 1048576 / 512))
# Ensure at least 1 concurrency
WEB_CONCURRENCY=${WEB_CONCURRENCY:-1}
# Export the variable
export WEB_CONCURRENCY
