#!/bin/sh

set -e
ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)

if command -v npm >/dev/null 2>&1; then
  FRONTEND_PM=npm
elif command -v pnpm >/dev/null 2>&1; then
  FRONTEND_PM=pnpm
else
  echo "Node.js com npm ou pnpm e necessario para executar o frontend." >&2
  exit 1
fi

if [ ! -d "$ROOT_DIR/apps/frontend/node_modules" ]; then
  (cd "$ROOT_DIR/apps/frontend" && "$FRONTEND_PM" install)
fi

(cd "$ROOT_DIR/apps/backend" && ./mvnw spring-boot:run) &
BACKEND_PID=$!
(cd "$ROOT_DIR/apps/frontend" && "$FRONTEND_PM" run dev) &
FRONTEND_PID=$!

cleanup() {
  kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
}

trap cleanup INT TERM EXIT
wait
