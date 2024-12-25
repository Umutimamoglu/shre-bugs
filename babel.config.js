module.exports = function (api) {
    api.cache(true); // Babel cache'ini etkinleştir
    return {
        presets: ['babel-preset-expo'], // Expo için Babel preset'i

    };
};
