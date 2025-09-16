const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Set the project root to the current directory
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Configure for workspace structure
config.projectRoot = projectRoot;
config.watchFolders = [workspaceRoot];

// Override resolver to handle workspace node_modules correctly
config.resolver = {
  ...config.resolver,
  nodeModulesPaths: [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
  ],
  platforms: ['ios', 'android', 'native', 'web'],
};

module.exports = config;