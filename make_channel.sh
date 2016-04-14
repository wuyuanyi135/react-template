#!/bin/bash
set -e
function cleanup {
  echo "Killing background processes"
  kill $CMD_PID
  kill $DATA_PID
  kill $NODE_PID
}
trap cleanup EXIT

# channel port
TARGET_DOMAIN=wuyuanyi135.eicp.net
TARGET="$(getent hosts $TARGET_DOMAIN | awk '{print $1}')"
EXTERNAL_CMD_PORT=10000
INTERNAL_CMD_PORT=2121

EXTERNAL_DATA_PORT=10001
INTERNAL_DATA_PORT=10001

node remote.js&
NODE_PID=$!

while ! nc -vz localhost $INTERNAL_CMD_PORT; do sleep 1; echo "Waiting for server up"; done

# connect remote exposed port to local
socat TCP4:$TARGET:$EXTERNAL_CMD_PORT TCP4:localhost:$INTERNAL_CMD_PORT &
CMD_PID=$!
echo LINK CMD PORT $EXTERNAL_CMD_PORT TO $TARGET:$EXTERNAL_CMD_PORT
# data map
socat TCP4-LISTEN:$INTERNAL_DATA_PORT,fork TCP4:$TARGET:$INTERNAL_DATA_PORT &
DATA_PID=$!
echo SET DATA PORT $EXTERNAL_DATA_PORT FWD TO $INTERNAL_DATA_PORT

wait
