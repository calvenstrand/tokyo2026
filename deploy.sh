#!/bin/bash
set -e

RIVERBEACH_DIR="/Users/christofferalvenstrand/Sites/riverbeach-2026"
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
