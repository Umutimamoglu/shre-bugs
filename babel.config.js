module.exports = function (api) {
    api.cache(true); // Babel cache'ini etkinleştir
    return {
        presets: ['babel-preset-expo'], // Expo için Babel preset'i
        plugins: ['react-native-reanimated/plugin'], // React Native Reanimated için gerekli plugin
    };
};
