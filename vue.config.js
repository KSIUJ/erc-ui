module.exports = {
    'transpileDependencies': [
        'vuetify',
    ],
    devServer: {
        proxy: {
            '/api*': {
                // Forward frontend dev server request for /api to django dev server
                target: 'http://127.0.0.1:8000/',
            },
            '/accounts*': {
                target: 'http://127.0.0.1:8000/',
            },
        },
    },
};
