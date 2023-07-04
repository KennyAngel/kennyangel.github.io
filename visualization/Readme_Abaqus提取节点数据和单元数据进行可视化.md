# Readme_Abaqus提取节点数据和单元数据进行可视化



> 作者：Kenny Chu
>
> 主页：https://kennyangel.github.io/
>
> 编辑：20230704
>
> 上传：20230704
>
> 摘要：
>
> ​		 PLY文件是一种较好的轻量化数据文件格式，此文件中还可以对节点添加场变量数据，基于此文件可以进行仿真结果数据的自定义可视化功能开发。本文将介绍可视化的第一步，即从CAE软件中提取节点和单元数据，并进行可视化。后续将更新文章对PLY文件追加场变量实现仿真结果场数据的可视化。
>
> 标签：仿真可视化、Abaqus网格数据提取、PLY生成

## 1、相关的参考资料

关于PLY文件的参考资料：[PLY文件格式](https://kennyangel.github.io/visualization/Readme_PLY%E6%96%87%E4%BB%B6%E6%A0%BC%E5%BC%8F.html)

## 2、Abaqus提取节点信息

以下程序需在Abaqus内置的python解释器中运行。

```python
# encoding: utf-8

# -----------------------------------------------------------
# author  : Kenny chu
# data    : 20230615
# des     : Abaqus提取ODB数据，获得节点坐标
#           
# version : python 2.7.18（Abaqus中的python版本为2.7.x）
# -----------------------------------------------------------

from abaqus import *
from abaqusConstants import *
from driverUtils import *
import numpy as np
import os

executeOnCaeStartup()

workDir = 'E:\\temp\\abaqus'
scrDir = 'E:\\scr\\test'

os.chdir(workDir)

# Open output database
odb = session.openOdb(name='test.odb')
assembly=odb.rootAssembly

part=assembly.instances['PART-1-1']

# 写出节点坐标
f = open(scrDir + '\\nodes_coordinates.txt', 'w')
# nodes=[]
for node in part.nodes:
    n = np.array([node.label, node.coordinates[0], node.coordinates[1], node.coordinates[2]])
    # nodes.append(node.coordinates)
    # nodes.append(n)
    f.write(str(n) + '\n')
f.close()

```

上述代码运行得到的文件 <nodes_coordinates.txt> 内容如下所示：

> 在该文件中，共有四列数据，分别为：nodeID, X, Y, Z

```tex
[  1.00000000e+00   3.17067822e+03   6.48709595e+02  -5.00000000e-01]
[  2.00000000e+00   3.16936133e+03   6.49124634e+02  -5.00000000e-01]
[  3.00000000e+00   3.16936133e+03   6.49124634e+02   0.00000000e+00]
[    4.          3170.67822266   648.70959473     0.        ]
[  5.00000000e+00   2.94982568e+03   3.61169338e-01  -5.00000000e-01]
[  6.00000000e+00   2.86015039e+03  -5.50320862e+02  -5.00000000e-01]
[    7.          2860.15039062  -550.32086182     0.        ]
[  8.00000000e+00   2.94982568e+03   3.61169338e-01   0.00000000e+00]
[  9.00000000e+00   2.86205103e+03  -5.54866516e+02  -5.00000000e-01]
[   10.          2862.05102539  -554.86651611     0.        ]
[  1.10000000e+01   3.16928931e+03  -6.48607300e+02  -5.00000000e-01]
[   12.          3169.28930664  -648.6072998      0.        ]
[  1.30000000e+01   3.17059595e+03  -6.48187439e+02  -5.00000000e-01]
[   14.          3170.59594727  -648.18743896     0.        ]
[  1.50000000e+01   3.33831372e+03   3.70012343e-01  -5.00000000e-01]
[  1.60000000e+01   3.33831372e+03   3.70012343e-01   0.00000000e+00]
[  1.70000000e+01   2.86218872e+03   5.55480591e+02  -5.00000000e-01]
[   18.          2862.1887207    555.48059082     0.        ]
[   19.          2860.28295898   550.94909668     0.        ]
[  2.00000000e+01   2.86028296e+03   5.50949097e+02  -5.00000000e-01]
[  2.10000000e+01   3.18022656e+03   4.96049042e+02   1.50000000e+00]
[  2.20000000e+01   3.24878003e+03   3.45517904e-01   1.50000000e+00]
[  2.30000000e+01   3.18018457e+03  -4.95485291e+02   1.50000000e+00]
[  2.40000000e+01   3.20997339e+03  -4.86264313e+02   1.50000000e+00]
[  2.50000000e+01   3.27198584e+03  -9.66209335e+01   1.50000000e+00]
```



## 3、Abaqus提取单元信息

以下代码在abaqus内置python解释器中运行。

```python
# encoding: utf-8

# -----------------------------------------------------------
# author  : Kenny chu
# data    : 20230615
# des     : Abaqus提取ODB数据，获得单元信息
#           
# version : python 2.7.18
# -----------------------------------------------------------

from abaqus import *
from abaqusConstants import *
from driverUtils import *
import numpy as np
import os
# from odbAccess import*

executeOnCaeStartup()

workDir = 'E:\\temp\\abaqus'
scrDir = 'E:\\scr\\test'

os.chdir(workDir)

# Open output database
odb = session.openOdb(name='test.odb')
assembly=odb.rootAssembly

part=assembly.instances['PART-1-1']

# 写出单元信息
f = open(scrDir + '\\elements_info.txt', 'w')
for elem in part.elements:
    ss = elem.label, elem.type, elem.instanceName, elem.connectivity
    f.write(str(ss) + '\n')
f.close()

```

上述代码的运行得到的文件 <elements_info.txt> 内容示例如下：

> 在该文件中，共有4列数据，分别为：单元ID，单元类型，实例名，关联节点。其中关联节点数据为该单元所关联的节点ID的列表。

```tex
(1, 'DC3D4E', 'PART-1-1', (55364, 36440, 55026, 20999))
(2, 'DC3D4E', 'PART-1-1', (39641, 55738, 36944, 55830))
(3, 'DC3D4E', 'PART-1-1', (36523, 39641, 55462, 55327))
(4, 'DC3D4E', 'PART-1-1', (55730, 55830, 39641, 20888))
(5, 'DC3D4E', 'PART-1-1', (18940, 32082, 37688, 50834))
(6, 'DC3D4E', 'PART-1-1', (39641, 55730, 20888, 55462))
(7, 'DC3D4E', 'PART-1-1', (40410, 36741, 55724, 21654))
(8, 'DC3D4E', 'PART-1-1', (40410, 55828, 21654, 55834))
(9, 'DC3D4E', 'PART-1-1', (55477, 40627, 37061, 55402))
(10, 'DC3D4E', 'PART-1-1', (55477, 55535, 37061, 36942))
```



## 4、将网格信息写出PLY文件

以下代码为读取 <nodes_coordinates.txt> 和 <elements_info.txt> 文件，并生成一个PLY格式的轻量化网格文件。PLY中完整的网格数据应包括：顶点、单元边、单元面，由于单元面涉及到法线问题，因而当前演示的程序中对单元面的输出代码做了注释。有懂的小伙伴欢迎在聊天室交流交流。聊天室链接：https://app.gitter.im/#/room/#kennyangel:gitter.im

另外需注意的是，当前使用的测试模型中所有网格均为四面体网格，因而每个单元均有4个顶点、6个边、4个面，如网格中包含了不同的单元类型，需要在此代码基础上进行网格形状的判断。具体方案落地时，小伙伴们自行发挥。

```python
# encoding: utf-8

# -----------------------------------------------------------
# author  : Kenny Chu
# data    : 20230630
# des     : 生成ply格式网格文件
#           参考资料：https://blog.csdn.net/libing_zeng/article/details/61195502
#           节点数据读取自: nodes_coordinates.txt
#           单元数据读取自: elements_info.txt
#           
# version : python 3.9.13
# -----------------------------------------------------------

import numpy as np

scrPath = __file__[0: __file__.rindex('\\')]

# region 节点数据
points = []
f = open(scrPath + '\\nodes_coordinates.txt', 'r')
for line in f.readlines():
    line = line.strip('\n')
    line = line.strip('[')
    line = line.strip(']')
    ss = line.split(' ')
    ss = list(filter(None, ss))
    p0 = np.array([float(ss[0]), float(ss[1]), float(ss[2]), float(ss[3])])
    points.append(p0)
f.close()
# endregion

# region 单元数据
elems = []
f = open(scrPath + '\\elements_info.txt', 'r')
for line in f.readlines():
    line = line.strip('\n')
    line = line.replace('(','')
    line = line.replace(')','')
    ss = line.split(',')
    ss = list(filter(None, ss))
    elem = np.array([float(ss[0]), ss[1], ss[2], int(ss[3]), int(ss[4]), int(ss[5]), int(ss[6])])
    elems.append(elem)
f.close()
# endregion

f = open(scrPath + '\\mesh.ply', 'w')
f.write('ply \n')
f.write('format ascii 1.0 \n')
f.write('comment author: Kenny Chu \n')
f.write('comment home page: https://kennyangel.github.io/ \n')

# 单元 4 个顶点
points_count = len(points)
f.write('element vertex ' + str(points_count) + ' \n')
f.write('property float x \n')
f.write('property float y \n')
f.write('property float z \n')

# 单元 6 条边
element_edge_count = len(elems) * 6
f.write('element edge ' + str(element_edge_count) + ' \n')
f.write('property int vertex1 \n')
f.write('property int vertex2 \n')

# # 单元 4 个面
# element_face_count = len(elems) * 4
# f.write('element face ' + str(element_face_count) + ' \n')
# f.write('property list int int vertex_indices \n')

# 结束头文件
f.write('end_header \n')

# 写出顶点数据
for p in points:
    f.write(str(p[1]) + ' ' + str(p[2]) + ' ' + str(p[3]) + '\n')

# 写出单元边线
for elem in elems:
    f.write(str(int(elem[3]) - 1) + ' ' + str(int(elem[4]) - 1) + ' \n')
    f.write(str(int(elem[3]) - 1) + ' ' + str(int(elem[5]) - 1) + ' \n')
    f.write(str(int(elem[3]) - 1) + ' ' + str(int(elem[6]) - 1) + ' \n')
    f.write(str(int(elem[4]) - 1) + ' ' + str(int(elem[5]) - 1) + ' \n')
    f.write(str(int(elem[4]) - 1) + ' ' + str(int(elem[6]) - 1) + ' \n')
    f.write(str(int(elem[5]) - 1) + ' ' + str(int(elem[6]) - 1) + ' \n')

# # 写出单元面
# for elem in elems:
#     f.write('3 ' + str(int(elem[3]) - 1) + ' ' + str(int(elem[4]) - 1) + ' ' + str(int(elem[5]) - 1) + ' \n')
#     f.write('3 ' + str(int(elem[4]) - 1) + ' ' + str(int(elem[5]) - 1) + ' ' + str(int(elem[6]) - 1) + ' \n')
#     f.write('3 ' + str(int(elem[5]) - 1) + ' ' + str(int(elem[6]) - 1) + ' ' + str(int(elem[3]) - 1) + ' \n')
#     f.write('3 ' + str(int(elem[3]) - 1) + ' ' + str(int(elem[5]) - 1) + ' ' + str(int(elem[6]) - 1) + ' \n')

f.close()

```

上述代码生成的文件 <mesh.ply> 文件，可导入MeshLib中进行查看，或使用 win 系统的3D查看器进行查看。

![3D查看器查看PLY文件](img\PLY_3D查看器.png)

![MeshLib中查看PLY文件](img\PLY_MeshLib.png)



