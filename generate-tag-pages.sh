#!/bin/bash

echo "Starting tag pages generation..."

# Remove old tag directory
if [ -d "tags" ]; then
  rm -rf tags
fi
mkdir -p tags

# Function to extract tags from a file
extract_tags() {
  local file=$1
  # More robust tag extraction, handling different formats
  local tag_line=$(grep -m 1 "tags:" "$file")
  
  # Remove "tags:" prefix and possible brackets
  local tags_only=$(echo "$tag_line" | sed -E 's/tags:\s*\[?(.*)\]?/\1/')
  
  # If result still contains "tags:", it means format doesn't match, return empty
  if [[ "$tags_only" == *"tags:"* ]]; then
    echo ""
    return
  fi
  
  # Convert separators to spaces
  echo "$tags_only" | tr ',' ' '
}

# Process each markdown file
for file in _posts/*.md _posts/*.markdown; do
  if [ -f "$file" ]; then
    echo "Checking file: $file"
    
    # Extract tags from the file
    tags=$(extract_tags "$file")
    
    # Process each tag
    for tag in $tags; do
      # Clean the tag
      tag=$(echo "$tag" | tr -d '"' | tr -d "'" | tr -d ' ')
      
      # Skip empty tags
      if [ -z "$tag" ]; then
        continue
      fi
      
      # Create URL-friendly version (replace underscores with hyphens and convert to lowercase)
      url_tag=$(echo "$tag" | tr '_' '-' | tr '[:upper:]' '[:lower:]')
      
      echo "Processing tag: $tag (URL: $url_tag)"
      
      # Create tag directory
      mkdir -p "tags/$url_tag"
      
      # Create index.html file
      cat > "tags/$url_tag/index.html" << EOF
---
layout: tag
tag: $tag
---
EOF
    done
  fi
done

echo "Tag pages generation completed!"