# Ensure cat and correct arithmetic operations are available
if [ -f /sys/fs/cgroup/memory/memory.limit_in_bytes ]; then
  MEM_LIMIT=$(cat /sys/fs/cgroup/memory/memory.limit_in_bytes)
  if [ "$MEM_LIMIT" -lt 536870912 ]; then
    export WEB_CONCURRENCY=1
  else
    export WEB_CONCURRENCY=$(($MEM_LIMIT / 1048576000))
  fi
else
  export WEB_CONCURRENCY=1
fi
