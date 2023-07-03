# Readme_PLY文件格式



> 作者: 					Kenny Chu
>
> 主页: 					https://kennyangel.github.io/
>
> 编辑：				  20230703
>
> 上传: 					20230703
>
> 摘要: 
>
> ​		 PLY文件的格式介绍。

## 1、相关的参考资料

PLY文件格式：[PLY - Polygon File Format (paulbourke.net)](http://paulbourke.net/dataformats/ply/)

Python 库 plyfile 中关于PLY文件格式的描述：[Wayback Machine (archive.org)](https://web.archive.org/web/20161221115231/http://www.cs.virginia.edu/~gfx/Courses/2001/Advanced.spring.01/plylib/Ply.txt)

CSDN_Q81：“三角形网格”之“PLY文件”：[https://blog.csdn.net/libing_zeng/article/details/61195502](https://blog.csdn.net/libing_zeng/article/details/61195502)

CSDN_计算机视觉基石--PLY文件基础与读写：[https://blog.csdn.net/u012348774/article/details/107948948](https://blog.csdn.net/u012348774/article/details/107948948)

## 2、关键词介绍

以下关键词格式注释在前一行

```python
ply 

# 文件格式
format ascii 1.0
# comment 为注释行
comment author: Kenny Chu 
comment home page: https://kennyangel.github.io/ 

# 当前文件中单元的所有的顶点个数
element vertex 134585 
# 单元顶点数据表达形式，下三行分别为顶点 xyz 格式
property float x 
property float y 
property float z 

# 当前文件中单元的所有的边线个数
element edge 2639490 
# 单元边数据表达形式，下两行分别为顶点1和顶点2的ID
property int vertex1_ID
property int vertex2_ID 

# 当前文件中单元面的总个数
element face 1759660 
# 单元面的数据表达形式，各个名词释义如下：
# list：表示该行数据为一个列表
# int： 表示该 list 的大小，如3、4、5
# int： 表示该 list 中的元素类型为int
# vertex_indices：表示顶点索引
property list int int vertex_indices 

# ply 头文件的结束标识
end_header 

# 顶点数据举例（xyz坐标）
3170.67822 648.709595 -0.5
3169.36133 649.124634 -0.5
3169.36133 649.124634 0.0
3170.67822 648.709594 0.0
...
# 单元边数据举例（vertex1_ID, vertex2_ID）
33099 32959 
41094 33099 
41094 52089 
41094 22325 
...
# 单元面数据举例（list int int vertex_indices）
3 44533 44729 25772 
3 44729 25772 37848 
3 25772 37848 44533 
...
```



## 3、PLY实例

以下为PLY的简单测试文件，保存为Test.ply后，通过3D查看器或MeshLab打开。

```python
ply
format ascii 1.0         
comment made by Greg Turk  
comment this file is a cube
element vertex 12         
property float x           
property float y         
property float z         
element face 10            
property list uchar int vertex_index            
end_header                 
0 0 0                      
0 0 1
0 1 1
0 1 0
1 0 0
1 0 1
1 1 1
1 1 0
1.1 1.1 0
2.1 1.1 0
1.1 2.1 0
1.1 1.1 1
4 0 1 2 3                 
4 7 6 5 4
4 0 4 5 1
4 1 5 6 2
4 2 6 7 3
4 3 7 4 0
3 8 9 10
3 8 9 11
3 8 10 11
3 9 10 11
```







