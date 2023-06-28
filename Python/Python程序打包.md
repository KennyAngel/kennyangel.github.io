# Python程序打包

<h5 style="color:Aquamarine; font-size:14px">上传时间：2023-06-25</h5>

> Author：			   Kenny Chu
>
> 主页：				   https://kennyangel.github.io/
>
> Date：				  20210820
>
> 简介：				  将python程序打包为exe

#### 介绍

将python程序打包为exe

#### pyinstaller 安装
```powershell
pip install pyinstaller
```


#### 参数说明

````powershell
cmd 控制台或者终端运行以下命令：
pyinstaller -D -p F:\Python27\Lib -i logo.ico mian.py
pyinstaller -F -p E:\Programs\Python36\Lib mian.py

-F：打包后只生成单个exe格式文件；
-D：默认选项，创建一个目录，包含exe文件以及大量依赖文件；
-c：默认选项，使用控制台(就是类似cmd的黑框)；
-w：不使用控制台；
-p：添加搜索路径，让其找到对应的库（python库路径）；
-i：改变生成程序的icon图标。
logo.ico：图标文件路径
mian.py：要打包的文件

注：
- 上述打包命令需要在终端执行
- main.py与logo.ico必须放在同一个目录下
- 最后一排加上--noconsole，就是无窗口运行
- 部分第三方库未注册，则无法自动打包，需要将未注册第三方库放在main.exe同路径中
````

#### 多进程打包

如果py程序是多进程的话，使用pyinstaller打包会出现错误，这个时候只要加上一行代码
```python
import subprocess

if __name__=='__mian__':
    # 新增下面一行代码即可打包多进程
    subprocess.multiprocessing.freeze_support()  
```

