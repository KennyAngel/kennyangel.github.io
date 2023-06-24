# Python_embed 版环境配置

<a href="https://kennyangel.github.io/">

<h5 style="color:Aquamarine; font-size:14px">作者：Kenny Chu | 主页：https://kennyangel.github.io/ | 更新时间：2023-06-24</h5>

</a>

## 1、Python下载

py 各版本下载链接：[Index of /ftp/python/](https://www.python.org/ftp/python/)

python3.7.9 embed （或称为 release版本） 版下载链接：[Index of /ftp/python/3.7.9/](https://www.python.org/ftp/python/3.7.9/)

## 2、pip下载

pip 下载链接：[Installation - pip documentation v22.2.2 (pypa.io)](https://pip.pypa.io/en/stable/installation/#get-pip-py)

在pip下载网页中，查找 "`get-pip.py`" 的下载链接，右键另存为即可下载该文件

下载 get-pip.py 后，在python embed目录中执行cmd命令，输入命令“python get-pip.py”并敲击回车运行命令，安装完成后，文件夹中会增加Lib和Scripts两个文件夹

## 3、修改python37._pth文件

记事本打开python37._pth，去除import site的注释，最终修改如下：

```python
python37.zip
.
 
# Uncomment to run site.main() automatically
import site
```

## 4、安装第三方库

### 4.1  查看已安装lib

运行cmd，目录切换至python-3.7.3rc1-embed-win32，输入python.exe .\Scripts\pip3.exe list，结果如下：

```python
D:\software\python-3.7.3rc1-embed-win32>python.exe .\Scripts\pip3.exe list
Package    Version
---------- -------
pip        19.2.1
pywin32    224
pywinauto  0.6.7
setuptools 41.0.1
six        1.12.0
wheel      0.33.4
```

### 4.2 安装新的lib

以安装django为例，输入python.exe .\Scripts\pip3.exe install django==1.10.1

```python
D:\software\python-3.7.3rc1-embed-win32>python.exe .\Scripts\pip3.exe install django==1.10.1
```

## 5、运行Python

```batch
D:\software\python-3.7.3rc1-embed-win32>python
Python 3.7.3rc1 (tags/v3.7.3rc1:69785b2127, Mar 12 2019, 21:42:06) [MSC v.1916 32 bit (Intel)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>>
```



