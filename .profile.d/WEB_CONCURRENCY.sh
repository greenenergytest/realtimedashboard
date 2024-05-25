#!/bin/sh

if [ -n "$WEB_MEMORY" ]; then
  WEB_CONCURRENCY=$(echo "scale=2; $WEB_MEMORY / 512" | bc)
  export WEB_CONCURRENCY=${WEB_CONCURRENCY%.*}
fi
