# Python导入库自定义路径

> 作者：Kenny Chu
>
> 主页：https://kennyangel.github.io/
>
> 编辑：20231007
>
> 上传：20231007
>
> 摘要：
>
> ​	Python中 import 导入外部库经常会碰到找不到库路径的问题，在使用各种 embed 版本 python 时比较棘手。本文介绍一种方便的形式，自定义外部库导入搜索路径。
>
> 标签：python，外部库导入，import出错



找到所使用的python解释器路径，在 Lib\site-packages 文件夹中新建一个文件：“*.pth”，名称可自定义，如“nx.pth”，编辑文件内容如下所示：

```markdown
E:\Program Files\Siemens\NX1926\NXBIN\python 
```

在pth文件中添加任意需要搜索的python库文件夹路径即可