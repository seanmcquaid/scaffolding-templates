module.exports = function (api) {
  api.cache(true);
  
  const plugins = [];
  
  // Only add NativeWind plugin when not running Jest
  if (process.env.NODE_ENV !== 'test') {
    plugins.push('nativewind/babel');
  }
  
  return {
    presets: [
      [
        'babel-preset-expo',
        process.env.NODE_ENV !== 'test' ? {
          jsxImportSource: 'nativewind',
        } : {},
      ],
    ],
    plugins,
  };
};
