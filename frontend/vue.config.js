module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: `
                @import "~@/styles/colors.scss";
                @import "~@/styles/variables.scss";
                `
            },
        }
    }
}