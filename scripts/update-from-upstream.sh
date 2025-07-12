#!/bin/bash
# This script fetches and merges changes from the upstream (template) repo into your client repo, then pushes them to origin.
# Usage: bun run update-upstream

set -e

echo "Fetching changes from upstream..."
git fetch upstream

echo "Merging upstream/main into current branch..."
git merge upstream/main || {
  echo "Merge conflicts detected. Please resolve them manually, then run 'git push origin main' when done.";
  exit 1;
}

echo "Pushing merged changes to origin..."
git push origin main

echo "Update complete!"
