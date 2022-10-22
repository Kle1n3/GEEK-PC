// const path = require('path')
import path from 'path'

/* module.exports = {
    webpack:{
        alias: {
            '@':path.resolve(__dirname,'src')
        }
    }
} */

export default {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
}