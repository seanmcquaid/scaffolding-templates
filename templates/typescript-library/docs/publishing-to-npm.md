# Publishing a package to NPM from GHA

Be sure to add a GitHub Token and NPM Token as a secret for GHA before starting this process.

1. Run `pnpm changeset` locally to add a changeset markdown file and commit it to the project
2. Once you push to the main branch, another PR will open giving you the option to merge in the current changeset
3. If you'd like to release, merge in this PR and it will run
