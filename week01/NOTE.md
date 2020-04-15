# 每周总结可以写在这里

## 作业

### 你能不能在 ECMA 中找到所有的类型（Type）

#### ECMAScript Data Types

- Undefined
- Null
- Boolean
- String
- Number
- BigInt:
- Symbol: 唯一且不可变更: 原子
- Object

##### 判断数据类型

- typeof:
  - Undefined Boolean String Number BigInt Symbol
  - Null: 返回 object
  - Array: 返回 object
  - Object: 返回 object
  - Function: 返回 function
- instanceof: 只可以操作引用类型(a instanceof b)
  - Array
    - [] instanceof Array: true
    - [] instanceof Object: true
- Object.prototype.toString.call(xxx): 返回调用者的数据类型

---

    class C{}
    const cc = new C

    typeof C: function  //  JS 中的类是构造函数模拟的
    typeof cc: object   //  cc 实例化

#### ECMAScript specification types

- Reference
- List
- Completion
- Property Descriptor
- Lexical Environment
- Environment Record
- and Data Block
