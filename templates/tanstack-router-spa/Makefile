.PHONY: setup dev build start test test-watch test-coverage lint lint-fix typecheck \
        playwright-integration playwright-e2e playwright-ui playwright-debug playwright-codegen

setup:
	chmod +x setup.sh && ./setup.sh

dev:
	pnpm dev

build:
	pnpm build

start:
	pnpm start

test:
	pnpm test

test-watch:
	pnpm test:watch

test-coverage:
	pnpm test:coverage

lint:
	pnpm lint

lint-fix:
	pnpm lint:fix

typecheck:
	pnpm typecheck

playwright-integration:
	pnpm playwright:run-integration

playwright-e2e:
	pnpm playwright:run-e2e

playwright-ui:
	pnpm playwright:ui

playwright-debug:
	pnpm playwright:debug

playwright-codegen:
	pnpm playwright:codegen
