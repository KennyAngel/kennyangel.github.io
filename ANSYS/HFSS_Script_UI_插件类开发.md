# 基于HFSS的自定义UI+Script开发

<h5 style="color:Aquamarine; font-size:14px">上传时间：2023-06-25</h5>

> Author：			   Kenny Chu
>
> 主页：				   https://kennyangel.github.io/
>
> Date：				  20220721
>
> AnsysVersion：	2021R2
>

## 方式一：ACT_In_HFSS（流程化操作、向导式操作）

![](HFSS_Script_UI_插件类开发_img\ACT_In_HFSS_1.png)

> 图：在HFSS中使用ACT插件

![](HFSS_Script_UI_插件类开发_img\ACT_In_HFSS_2.png)

> 图：在HFSS中使用ACT插件

## 方式二：ACT_In_HFSS（菜单栏插件或按钮定制）

![](HFSS_Script_UI_插件类开发_img\ACT_Menu实现.png)

> 图：通过ACT实现 HFSS 定制化 Menu 的代码示例。此代码不报错，但是界面显示不出来，同样的方法，在 Mechanical 中正常显示。HFSS ACT 应该还有其他的关键词

![](HFSS_Script_UI_插件类开发_img\ACT_Menu实现2.png)

> 图：HFSS Menu 定制化实现效果

## 方式三：HFSS_Toolkit

#### 程序存放路径

> Toolkit 程序存放位置为：E:\Program Files\ANSYS Inc\AnsysEM\AnsysEM21.2\Win64\syslib\Toolkits\HFSS

新的 Toolkit 程序需要在AEDT菜单中更新一下才可显示出来。可以在该目录中建立文件夹，文件夹内部存放多个py文件，则在HFSS主菜单中会显示二次目录。

![](HFSS_Script_UI_插件类开发_img\Toolkit二级菜单_界面.png)

![](HFSS_Script_UI_插件类开发_img\Toolkit二级菜单_源程序1.png)

![](HFSS_Script_UI_插件类开发_img\Toolkit二级菜单_源程序2.png)



![](HFSS_Script_UI_插件类开发_img\HFSS_Toolkit_2.png)

> 图：通过 Toolkit 加载脚本，UI 布局代码在脚本中实现

## 方式四：外部程序+PyAEDT

基本方法：外部程序可以独立编写，实现 UI 操作的逻辑，后台通过调用 PyAEDT 库控制 AEDT 主程序



