# ANSYS UIDL二次开发-高级程序部署方式

背景介绍：部分开发程序案例直接在Ansys原生的 GRN 文件中进行二次开发，该方式对于多个项目的管理具有不便性，因而本文介绍一种更合理的UIDL程序部署，可针对不同项目进行独立部署。

----

[TOC]

----

## [1、文件结构](#ANSYS UIDL二次开发-高级程序部署方式)

文件结构案例：

```tex
# 目录结构
Project Files
	
	menulist.ans		# Ansys菜单栏设置，类似于 Include 头文件的功能
	MY_MENU.GRN			# 定义用户菜单栏内容
	MY_FUNC.GRN			# 定义用户菜单中关联的各个命令，类似于 callback
	
	MACS				# 宏命令文件列表
		MY_BLOCK.MAC	# 宏命令文件1
	TCLTK				# TCLTK 命令文件列表
		TCL_BLOCK.tcl	# TCLTK 命令文件1
```

以上文件的路径规划：

| 文件名       | 位置描述        | 位置举例                      |
| ------------ | --------------- | ----------------------------- |
| menulist.ans | Ansys UIDL 目录 | %ANSYS222_DIR%\gui\en-us\UIDL |
| MY_MENU.GRN  | Ansys UIDL 目录 | %ANSYS222_DIR%\gui\en-us\UIDL |
| MY_FUNC.GRN  | Ansys UIDL 目录 | %ANSYS222_DIR%\gui\en-us\UIDL |
| *.MAC        | Ansys 工作目录  | E:\scr\APDL\GUI\test          |
| *.tcl        | Ansys 工作目录  | E:\scr\APDL\GUI\test          |
|              |                 |                               |



## [2、程序解析](#ANSYS UIDL二次开发)

```tcl
:! 来自文件"menulist.ans"
%ANSYS222_DIR%\gui\en-us\UIDL\UIMENU.GRN
%ANSYS222_DIR%\gui\en-us\UIDL\UIFUNC1.GRN
%ANSYS222_DIR%\gui\en-us\UIDL\UIFUNC2.GRN
%ANSYS222_DIR%\gui\en-us\UIDL\MECHTOOL.AUI

:! 以下两行为用户自定义菜单栏设置
%ANSYS222_DIR%\gui\en-us\UIDL\MY_MENU.GRN
%ANSYS222_DIR%\gui\en-us\UIDL\MY_FUNC.GRN

```



```tcl
:! 来自文件"MY_MENU.GRN"
:! ----------------------------------------
:S      0,      0,      0
:I      1,     465,     515:F MY_MENU.GRN
:D Menu Control File
:! ----------------------------------------
:! ----------------------------------------
:N Men_MyTest
:S    193,    98,    87T Menu
:T Menu
:A MyTestMenu
:D This is my test program
Fnc_SubMenu_Volume
Fnc_SubMenu_Line
Sep_
Fnc_SubMenu_Macs
Sep_
Fnc_SubMenu_Tcltk
:E END
:! ----------------------------------------
```



```tcl
:! 来自文件"MY_FUNC.GRN"
:! ----------------------------------------
:S      0,      0,      0
:I     12,    4035,    4360:F MY_FUNC.GRN
:D Menu Control File
:! ----------------------------------------
:! ----------------------------------------
:N Fnc_SubMenu_Volume
:S    189,   142,    39Cmd
:T Menu
:C )! Fnc_SubMenu_Volume
:A MyTest_Volume
:D This is a test sub menu program1.
Fnc_MyTest_Block
Fnc_MyTest_Cylinder
:E END
:! ----------------------------------------
:! ----------------------------------------
:N Fnc_SubMenu_Line
:S    177,   136,    33Cmd
:T Menu
:C )! Fnc_SubMenu_Line
:A MyTest_Line
:D This is a test sub menu program2.
Fnc_MyTest_Line
Fnc_MyTest_Arc
:E END
:! ----------------------------------------
:! ----------------------------------------
:N Fnc_SubMenu_Macs
:S    173,   147,    18,       0
:T Menu
:C )! Fnc_SubMenu_Macs
:A My_Macs
:D This is a test sub menu include some macs.
Fnc_MyMacs_BLOCK
:E END
:! ----------------------------------------
:! ----------------------------------------
:N Fnc_SubMenu_Tcltk
:S    208,   151,    49,       0
:T Menu
:C )! Fnc_SubMenu_Tcltk
:A My_Tcltk
:D This is a test sub menu include some Tcltk.
Fnc_MyTk_BLOCK
Fnc_MyTk_HELIX
Fnc_MyTcl_BLOCK
:E END
:! ----------------------------------------
:! ----------------------------------------
:N Fnc_MyTest_Block
:S    319,   304,     7Cmd
:T Command
:C )! Fnc_MyTest_Block
:A MyTest_Block
:D This is a test UIDL program1.
:C )/PREP7
:C )VDELE,ALL
:C )ADELE,ALL
:C )LDELE,ALL
:C )KDELE,ALL
:C )BLOCK,0,1,0,5,0,20,
:C )VPLOT
:C )/VIEW,1,1,1,1
:C )/ANG,1
:C )/AUTO,1
:C )/REP,FAST 
Inp_P
:E END
:! ----------------------------------------
:! ----------------------------------------
:N Fnc_MyTest_Cylinder
:S    331,   316,     7Cmd
:T Command
:C )! Fnc_MyTest_Cylinder
:A MyTest_Cylinder
:D This is a test UIDL program2.
:C )/PREP7
:C )VDELE,ALL
:C )ADELE,ALL
:C )LDELE,ALL
:C )KDELE,ALL
:C )CYLIND,10,5,0,3,0,180,
:C )VPLOT
:C )/VIEW,1,1,1,1
:C )/ANG,1
:C )/AUTO,1
:C )/REP,FAST 
Inp_P
:E END
:! ----------------------------------------
:! ----------------------------------------
:N Fnc_MyTest_Line
:S    341,   326,     7Cmd
:T Command
:C )! Fnc_MyTest_Line
:A MyTest_Line
:D This is a test UIDL program to create a Line.
:C )/PREP7 
:C )VDELE,ALL
:C )ADELE,ALL
:C )LDELE,ALL
:C )KDELE,ALL
:C )K,1001,0,0,0, 
:C )K,1002,100,0,0, 
:C )LSTR, 1001, 1002
:C )LPLOT
:C )/AUTO,1
:C )/REP,FAST 
Inp_P
:E END
:! ----------------------------------------
:! ----------------------------------------
:N Fnc_MyTest_Arc
:S    381,   366,     7Cmd
:T Command
:C )! Fnc_MyTest_Arc
:A MyTest_Arc
:D This is a test UIDL program to create a ArcLine.
:C )/PREP7 
:C )VDELE,ALL
:C )ADELE,ALL
:C )LDELE,ALL
:C )KDELE,ALL
:C )K,1001,0,0,0,   
:C )K,1002,100,0,0, 
:C )K,1003,50,20,0, 
:C )LARC,    1001,    1002,    1003 
:C )LPLOT
:C )/AUTO,1
:C )/REP,FAST 
Inp_P
:E END
:! ----------------------------------------
:! ----------------------------------------
:N Fnc_MyMacs_BLOCK
:S    161,   146,     7,       0
:T Command
:C )! Fnc_MyMacs_BLOCK
:A MyMacs_BLOCK
:D VLIST.
:C )MY_BLOCK,0,1,0,5,0,10
Inp_P
:E END
:! ----------------------------------------
:! ----------------------------------------
:N Fnc_MyTk_BLOCK
:S      0,      0,      0
:T Command
:C )! Fnc_MyTk_BLOCK
:A MyTk_BLOCK
:D Test Tk
:C ) ~eui,'source TK_BLOCK.tcl'
Inp_P
:E END
:! ----------------------------------------
:! ----------------------------------------
:N Fnc_MyTk_HELIX
:S    162,   147,     7,       0
:T Command
:C )! Fnc_MyTk_HELIX
:A MyTk_HELIX
:D Test Tk
:C ) ~eui,'source TK_HELIX.tcl'
Inp_P
:E END
:! ----------------------------------------
:! ----------------------------------------
:N Fnc_MyTcl_BLOCK
:S    169,   154,     7,       0
:T Command
:C )! Fnc_MyTcl_BLOCK
:A MyTcl_BLOCK
:D Test Tcl
:C ) ~eui,'source "TCL_BLOCK.tcl"'
Inp_P
:E END
:! ----------------------------------------

```

