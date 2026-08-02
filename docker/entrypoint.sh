#!/bin/sh
set -e

echo "=== VetClinic Startup ==="

# Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Optionally seed the database
if [ "$SEED_DB" = "true" ]; then
  echo "Seeding database..."
  npx prisma db seed
  echo "Seeding complete."
fi

echo "Starting VetClinic server..."
exec node main.js
