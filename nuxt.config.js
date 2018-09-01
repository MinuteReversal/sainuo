module.exports = {
    css: [
        '~/static/css/theme/default.css',
        '~/static/css/schema.default.css',
        '~/static/css/rich_media_content.css',
        '~/assets/css/app.scss',
        '~/static/css/fontawesome/font-awesome-4.7.0/css/font-awesome.css',
    ],
    /*
    ** Headers of the page
    */
    head: {
        title: '赛诺制药',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width,user-scalable=no' },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'format-detection', content: 'email=no' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'apple-touch-fullscreen', content: 'yes' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /**
   *  Customize router mode
   */
    router: {
        mode: 'history',// "hash" | "history" | "abstract"
        /*
        ** Router config
        *https://zh.nuxtjs.org/api/pages-middleware
        */
        middleware: 'auth'
    },
    /*
    ** Customize the progress bar color
    */
    loading: { color: '#3B8070' },
    plugins: [
        '~/plugins/element-ui',
        '~/plugins/loaderwindow',
        "~/plugins/axios-global-error",
        "~/plugins/vue-filters",
        "~/plugins/v-permission"
    ],
    /*
    ** Build configuration
    */
    build: {
        /*
        ** Run ESLint on save
        */
        extend(config, { isDev, isClient }) {
            //https://babeljs.io/docs/en/babel-polyfill
            config.entry.babelpolyfill = "babel-polyfill";
            //https://zh.nuxtjs.org/faq/pre-processors
            const vueLoader = config.module.rules.find((rule) => rule.loader === 'vue-loader');
            vueLoader.options.loaders.sass = 'vue-style-loader!css-loader!sass-loader';

            if (isDev && isClient) {
                config.devtool = "inline-source-map";
                config.entry.eventsourcepolyfill = "eventsource-polyfill";
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });
            }
        }
    }
}
