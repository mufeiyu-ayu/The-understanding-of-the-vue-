## template -> 编译 .... -> 形成真实DOM

- 1、获取到template
- 2、template -> AST树

-    AST Abstract syntax tree  抽象语法树
-    源代码的抽象语法结构的树状描述

- 3、AST -> render函数 ->  _c   _v _s
- 4、render函数 -> 虚拟节点
- 5、设置PATCH -> 打补丁到真实DOM

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

## 源码、答疑、咨询系统课程：vx jsppxiaoye