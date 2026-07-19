#!/usr/bin/env python3
import subprocess
import sys
import os

os.chdir('.')

# Step 1: Commit
print("Step 1: Creating commit...")
try:
    result = subprocess.run(
        ['git', 'commit', '-m', 'Initial ContentPulse commit - Full-stack system'],
        capture_output=True,
        text=True
    )
    print(result.stdout)
    if result.returncode != 0:
        print("Error:", result.stderr)
        sys.exit(1)
except Exception as e:
    print(f"Commit failed: {e}")
    sys.exit(1)

# Step 2: Add remote
print("\nStep 2: Adding GitHub remote...")
try:
    result = subprocess.run(
        ['git', 'remote', 'add', 'origin', 'https://github.com/vattamsanhth/codebenders.git'],
        capture_output=True,
        text=True
    )
    if result.returncode != 0 and 'already exists' not in result.stderr:
        print("Error:", result.stderr)
        sys.exit(1)
    else:
        print("Remote configured")
except Exception as e:
    print(f"Remote add failed: {e}")

# Step 3: Set main branch
print("\nStep 3: Setting main branch...")
try:
    result = subprocess.run(
        ['git', 'branch', '-M', 'main'],
        capture_output=True,
        text=True
    )
    print(result.stdout)
    if result.returncode != 0:
        print("Error:", result.stderr)
except Exception as e:
    print(f"Branch rename failed: {e}")

# Step 4: Push
print("\nStep 4: Pushing to GitHub...")
try:
    result = subprocess.run(
        ['git', 'push', '-u', 'origin', 'main'],
        capture_output=True,
        text=True
    )
    print(result.stdout)
    print(result.stderr)
    if result.returncode != 0:
        print("Push returned code:", result.returncode)
except Exception as e:
    print(f"Push failed: {e}")
    sys.exit(1)

print("\n✅ All steps completed!")
