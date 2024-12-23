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
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  rules: {
    indent: 0,
    quotes: 'off',
    radix: 0,
    // 关闭eslint对 tab健的校验
    'no-tabs': 'off',
    // //强制不使用分号结尾
    semi: ['error', 'always'],
    // 箭头函数中的箭头前后需要留空格
    'arrow-spacing': [2, { before: true, after: true }],
    // 在定义对象或数组时，最后一项不能加逗号
    'comma-dangle': 'off',
    // 该规则规定了在对象字面量语法中，key和value之间的空白，冒号前不要空格，冒号后面需要一个空格
    'key-spacing': [2, { beforeColon: false, afterColon: true }],
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'vue/html-self-closing': [
      'off',
      {
        html: {
          void: 'never',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/max-attributes-per-line': [
      'off',
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'vue/v-bind-style': ['off', 'always'],
    'vue/attributes-order': ['off', 'always'],
    // "vue/script-indent": [
    //   "error",
    //   "tab",
    //   {
    //     baseIndent: 1,
    //     switchCase: 1,
    //     ignores: [],
    //   },
    // ],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    // "vue/html-indent": ["error", "tab", { attribute: 1 }], // html 4个缩进，属性加一级缩进，闭合标签和开始标签对齐
    // 允许使用 v-html
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    // 关闭vue中 绑定的内容 不允许驼峰式 的校验
    'vue/attribute-hyphenation': 'off',
    // 关闭换新的一行校验
    'vue/no-unused-components': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'nuxt/no-cjs-in-config': 0,
    // 禁止使用alert confirm prompt
    // "no-alert": process.env.NODE_ENV === 'production' ? 0 : 'off',
    'no-console': 'off',
    'no-alert': 2,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 暂时关闭未使用变量校验
    'no-unused-vars': 'off',
    // 暂时关闭 无效代码
    'no-unreachable': 'off',
    // 暂时关闭 正则校验
    'no-control-regex': 'off',
    // 禁止在条件中使用常量表达式 if(true) if(1)
    'no-constant-condition': 2,
    // 不能使用看起来像除法的正则表达式/=foo/
    'no-div-regex': 1,
    // 在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-dupe-keys': 2,
    // 函数参数不能重复
    'no-dupe-args': 2,
    // 块语句中的内容不能为空
    'no-empty': 2,
    // 禁止对null使用==或!=运算符
    'no-eq-null': 2,
    // 禁止重复的函数声明
    'no-func-assign': 2,
    // 空行最多不能超过2行
    'no-multiple-empty-lines': 0,
    // 禁止混用tab和空格
    'no-mixed-spaces-and-tabs': [2, false],
    // 禁止使用javascript:void(0)
    'no-script-url': 0,
    // 不能比较自身
    'no-self-compare': 2,
    // 一行结束后面不要有空格
    'no-trailing-spaces': 1,
    'no-restricted-syntax': 0,
    'no-shadow': 0,
    'no-param-reassign': 0,
    'no-unused-expressions': 0,
    'operator-linebreak': 0,
    'no-undef': 'off',
    // 箭头函数用小括号括起来
    'arrow-parens': 0,
    // 不能返回 return;
    'consistent-return': 0,
    'max-len': 0,
    'guard-for-in': 0,
    'prefer-destructuring': 0,
    // 考虑bi，暂时屏蔽
    'no-underscore-dangle': 0,
    // object使用规范校验，暂时不好解决，暂时屏蔽
    'no-prototype-builtins': 0,
    // 此规则在对象文字或解构赋值的大括号内强制执行一致的换行符
    'object-curly-newline': 0,
    'function-paren-newline': 0,
    'import/no-mutable-exports': 0,
    'implicit-arrow-linebreak': 0,
    'func-names': 0
  }
};
