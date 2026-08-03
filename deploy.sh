#!/bin/bash
set -e

# Pick whichever checkout of the riverbeach repo exists on this machine.
# Override with RIVERBEACH_DIR=... ./deploy.sh if you keep it somewhere else.
CANDIDATES=(
  "$RIVERBEACH_DIR"
  "/Users/christofferalvenstrand/Sites/riverbeach-2026"
  "/c/dev/rbd"
  "C:/dev/rbd"
)

RIVERBEACH_DIR=""
for d in "${CANDIDATES[@]}"; do
  if [ -n "$d" ] && [ -d "$d" ]; then
    RIVERBEACH_DIR="$d"
    break
  fi
done

if [ -z "$RIVERBEACH_DIR" ]; then
  echo "deploy.sh: could not find the riverbeach repo. Set RIVERBEACH_DIR." >&2
  exit 1
fi

TARGET="$RIVERBEACH_DIR/public/tokyo26"

if [ -n "$1" ]; then
  MSG="tokyo26: $1"
else
  LAST=$(git log -1 --pretty=%s)
  MSG="tokyo26: $LAST"
fi

echo "Building..."
npm run build

echo "Copying to riverbeach repo..."
rm -rf "$TARGET"
cp -r dist/ "$TARGET"

echo "Committing and pushing..."
cd "$RIVERBEACH_DIR"
git add public/tokyo26/
git commit -m "$MSG"
git push

echo "Done. Deploying to riverbeach.se/tokyo26/"
