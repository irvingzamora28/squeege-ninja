#!/bin/bash

# Check for git
if ! command -v git >/dev/null 2>&1; then
  echo "Error: git is not installed. Please install git and try again."
  exit 1
fi

# Usage: ./create-client-site.sh <client-repo-url> <client-folder>
# Example:
#   ./create-client-site.sh https://github.com/your-org/client-site.git client-site

set -e

MAIN_REPO_URL="https://github.com/imzodev/ALLSET-template.git"
CLIENT_REPO_URL="$1"
CLIENT_FOLDER="$2"

if [ -z "$CLIENT_REPO_URL" ] || [ -z "$CLIENT_FOLDER" ]; then
  echo "Usage: $0 <client-repo-url> <client-folder>"
  exit 1
fi

echo "Cloning main repo..."
git clone "$MAIN_REPO_URL" "$CLIENT_FOLDER"
cd "$CLIENT_FOLDER"

echo "Setting new origin to client repo..."
git remote rename origin upstream
git remote add origin "$CLIENT_REPO_URL"

echo "Pushing to client repo (first push)..."
git push -u origin main

echo "Setup complete!"
echo ""
echo "To update this client site from the main repo in the future, run:"
echo "  cd $CLIENT_FOLDER"
echo "  git fetch upstream"
echo "  git merge upstream/main"
echo "  # Resolve any conflicts, then:"
echo "  git push origin main"
