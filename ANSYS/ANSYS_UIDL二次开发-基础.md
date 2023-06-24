# ANSYS UIDL二次开发-基础

UIDL：Ansys User Interface Design Language

----

[TOC]

----

## [1、文件结构](#ANSYS UIDL二次开发-基础)

<img src="cache\ANSYS_UIDL_1.png" alt="ANSYS UIDL 程序结构" style="zoom:60%;" />

## [2、程序解析](#ANSYS UIDL二次开发-基础)

```tcl
:! 来自文件“UIMENU.GRN”
:! ---------------------- 
:N Men_Block
:S    112,    77,    28
:T Menu
:A    Block
:D Block
:P (mdl2d)
Fnc_BLC4
Fnc_BLC5
Fnc_BLOCK
:E END
:! ----------------------
```



```tcl
:! 来自文件“UIFUNC1.GRN”或者“UIFUNC2.GRN”
:! ----------------------
:N Fnc_BLOCK
:S    417,   149,   261
:T Command
:C )! Fnc_BLOCK
:A By Dimensions
:D Create Block by Dimensions
:K #(PREP7)
:P (mdl2d)
:H Hlp_C_BLOCK
Cmd_BLOCK
 Fld_0
  Typ_Lab
  Prm_[BLOCK]  Create Block by Dimensions
 Fld_2
  Prm_X1,X2  X-coordinates
  Typ_REAL2
  Def_Blank,Blank
 Fld_4
  Prm_Y1,Y2  Y-coordinates
  Typ_REAL2
  Def_Blank,Blank
 Fld_6
  Prm_Z1,Z2  Z-coordinates
  Typ_REAL2
  Def_Blank,Blank
:E END
:! ----------------------
```

## [3、案例测试-单级菜单](#ANSYS UIDL二次开发-基础)

```tcl
:! 来自文件“UIMENU.GRN”
:! ----------------------------------------
:N Men_MyTest
:S    137,    93,    37T Menu
:T Menu
:A MyTestMenu
:D This is my test program
Fnc_MyTest_Block
Fnc_MyTest_Cylinder
:E END
:! ----------------------------------------
```

上文程序关键词释义：

​		表1

| 关键词              | 是否必须定义 | 含义                                                         |
| ------------------- | ------------ | ------------------------------------------------------------ |
| :!                  | 否           | 块代码分割符号，也可作为注释                                 |
| :N                  | 是           | Name，块名称，对象如果是菜单则以 Men_ 开头，如果是函数，则以 Fnc_ 开发 |
| :S                  | 是           | Ansys 占位符，编写代码时可写为三个0，三个0必须位于第9，16，23个字符位置，并且必须使用逗号分割。当启动Ansys 后，Ansys会自动编译，并替换三个0为其他字符，不需要手动再次进行调整 |
| :T                  | 是           | 定义当前Block的类型，对象如为菜单，则使用 :T Menu，如为函数，则使用 :T Command |
| :A                  | 是           | Title                                                        |
| :D                  | 否           | 描述                                                         |
| Fnc_MyTest_Block    | /            | 当前Block的子对象                                            |
| Fnc_MyTest_Cylinder | /            | 当前Block的子对象                                            |
| :E                  | 是           | 当前 Block 定义的结束标记                                    |



```tcl
:! 来自文件“UIFUNC1.GRN”或者“UIFUNC2.GRN”
:! ----------------------------------------
:N Fnc_MyTest_Block
:S    248,   235,     6Cmd
:T Command
:C )! Fnc_MyTest_Block
:A MyTest_Block
:D This is a test UIDL program1.
:C )/PREP7
:C )VDELE,ALL
:C )BLOCK,0,1,0,5,0,20,
:C )/VIEW,1,1,1,1
:C )/ANG,1
:C )/AUTO,1
:C )/REP,FAST 
Inp_P
:E END
:! ----------------------------------------
:! ----------------------------------------
:N Fnc_MyTest_Cylinder
:S    260,   247,     6Cmd
:T Command
:C )! Fnc_MyTest_Cylinder
:A MyTest_Cylinder
:D This is a test UIDL program2.
:C )/PREP7
:C )VDELE,ALL
:C )CYLIND,10,5,0,3,0,180,
:C )/VIEW,1,1,1,1
:C )/ANG,1
:C )/AUTO,1
:C )/REP,FAST 
Inp_P
:E END
:! ----------------------------------------
```

上文程序关键词释义（表1中已有的重复项不进行解释）：

​		表2

| 关键词 | 是否必须定义 | 含义                                                         | 示例       |
| ------ | ------------ | ------------------------------------------------------------ | ---------- |
| :C     | 否           | 当前函数对象需要执行的Ansys命令，可直接引用APDL命令，也可指定一个宏命令。<br />Ansys命令之前需要加一个右括号）。 | :C )/PREP7 |
| Inp_P  | 是           | 当前函数命令的终止符                                         |            |



## [4、案例测试-多级菜单](#ANSYS UIDL二次开发-基础)

```tcl
:! 来自文件“UIMENU.GRN”
:! ----------------------------------------
:N Men_MyTest
:S    141,    93,    41T Menu
:T Menu
:A MyTestMenu
:D This is my test program
Fnc_SubMenu_Volume
Sep_
Fnc_SubMenu_Line
:E END
:! ----------------------------------------
```



```tcl
:! 来自文件“UIFUNC1.GRN”或者“UIFUNC2.GRN”
:! ----------------------------------------
:N Fnc_SubMenu_Volume
:S    180,   136,    37Cmd
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
:S    168,   130,    31Cmd
:T Menu
:C )! Fnc_SubMenu_Line
:A MyTest_Line
:D This is a test sub menu program2.
Fnc_MyTest_Line
Fnc_MyTest_Arc
:E END
:! ----------------------------------------
:! ----------------------------------------
:N Fnc_MyTest_Block
:S    290,   277,     6Cmd
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
:C )/VIEW,1,1,1,1
:C )/ANG,1
:C )/AUTO,1
:C )/REP,FAST 
Inp_P
:E END
:! ----------------------------------------
:! ----------------------------------------
:N Fnc_MyTest_Cylinder
:S    302,   289,     6Cmd
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
:C )/VIEW,1,1,1,1
:C )/ANG,1
:C )/AUTO,1
:C )/REP,FAST 
Inp_P
:E END
:! ----------------------------------------
:! ----------------------------------------
:N Fnc_MyTest_Line
:S    324,   311,     6Cmd
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
:S    361,   348,     6Cmd
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
```







