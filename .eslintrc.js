module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'indent': ['off', 4],//缩进
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        //配置camelcase选项
        'camelcase': [0, {properties: 'always'}],
        'space-before-function-paren': 0,//处理函数名与(之间必须有一个空格
        'no-unused-vars': 0,
        'no-unused-expressions': 0,
        'eqeqeq': 0,//处理两个==的报错
        'object-curly-spacing': 0,//处理对象与字符之间必须有空格
        'prefer-const':0,

    }
}
