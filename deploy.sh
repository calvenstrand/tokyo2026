#!/bin/bash
set -e

RIVERBEACH_DIR="/Users/christofferalvenstrand/Sites/riverbeach-2026"
TARGET="$RIVERBEACH_DIR/public/tokyo26"

echo "Building..."
npm run build

echo "Copying to riverbeach repo..."
rm -rf "$TARGET"
cp -r dist/ "$TARGET"

echo "Committing and pushing..."
cd "$RIVERBEACH_DIR"
git add public/tokyo26/
git commit -m "Update tokyo26 build"
git push

echo "Done. Deploying to riverbeach.se/tokyo26/"
