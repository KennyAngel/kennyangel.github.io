# pip命令参考

<a href="https://kennyangel.github.io/">

<h5 style="color:Aquamarine; font-size:14px">作者：Kenny Chu | 主页：https://kennyangel.github.io/ | 更新时间：2023-06-24</h5>

</a>

pip下载加速：

```powershell
: pip 下载加速：
pip install -i https://pypi.douban.com/simple/ %pkgName%

: pip 提取当前编译器环境
pip freeze > requirements.txt

: pip 提取当前项目的编译器环境
: step1 ----
pip install pipreqs
: step2 ----
cd /d %ProjectPath%
pipreqs ./ --encoding==utf8 --force

: pip 安装库
pip install %pkgName%
pip install -r requirements.txt
```

