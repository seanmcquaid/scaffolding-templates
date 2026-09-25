#!/usr/bin/env bash
set -euo pipefail

template="${1:?Usage: check-standalone-template.sh <template-path>}"
repo_root="$(git rev-parse --show-toplevel)"
source_dir="$repo_root/templates/$template"

if [[ ! -f "$source_dir/package.json" ]]; then
  echo "Template does not contain package.json: $template" >&2
  exit 1
fi

temp_root="$(mktemp -d "${RUNNER_TEMP:-${TMPDIR:-/tmp}}/standalone-template.XXXXXX")"
trap 'rm -rf "$temp_root"' EXIT
standalone_dir="$temp_root/$template"
mkdir -p "$standalone_dir"
cp -R "$source_dir/." "$standalone_dir/"

cd "$standalone_dir"

# These variables are required by app templates when their environment schema
# is evaluated during tests or production builds. They are harmless for the
# TypeScript library.
export VITE_APP_ENVIRONMENT=dev
export VITE_APP_MSW_ENABLED=false
export NEXT_PUBLIC_APP_ENVIRONMENT=dev

pnpm install --no-frozen-lockfile
pnpm lint
pnpm test
pnpm build
