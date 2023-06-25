# CAE-蠕变分析材料模型-ANSYS

<a href="https://kennyangel.github.io/">

<h5 style="color:Aquamarine; font-size:14px">作者：Kenny Chu | 主页：https://kennyangel.github.io/ | 更新时间：2023-06-25</h5>

</a>

<h5 style="color:Aquamarine; font-size:14px">上传时间：2023-06-25</h5>

#### 1、常用蠕变方程

------

以下是Ansys Mechanical中可用的隐士蠕变方程

| 蠕变方程（英）                        | 蠕变方程（中）           | 类型      |
| ------------------------------------- | ------------------------ | --------- |
| Strain Hardening                      | 应变硬化方程             | Primary   |
| Time Hardening                        | 时间硬化方程             | Primary   |
| Generalized Exponent                  | 广义指数                 | Primary   |
| Generalized Graham                    | 广义Graham               | Primary   |
| Generalized Blackbum                  | 广义Blackbum             | Primary   |
| Modified Time Hardening               | 修正时间硬化方程         | Primary   |
| Modified Strain Hardening             | 修正应变硬化方程         | Primary   |
| Generalized Garofalo(Hyperbolic sine) | 广义Garofalo（双曲正弦） | Secondary |
| Exponential Form                      | 指数形式                 | Secondary |
| Norton                                | Norton                   | Secondary |
| Time Hardening                        | 时间硬化方程             | Both      |
| Rational Polynomial                   | 理想多项式               | Both      |
| Generalized Time Hardening            | 广义时间硬化             | Primary   |
| User Creep                            |                          |           |

以下是蠕变模型使用的总结，具体取决于测试中可用的蠕变数据类型。

> **Here is a summary of the creep model to be used depending on the creep data types available from tests.**

[^Tip1]: 下表中表头括号中的字符串表示经典 Ansys 中对应的关键词

| Creep Model                           | **Equivalent Creep Strain**（creq） | **Equivalent Creep Strain Rate（dcreq）** | Time（time） | **Equivalent Stress（seqv）** | **Temperature（temp）** |
| ------------------------------------- | :---------------------------------: | :---------------------------------------: | :----------: | :---------------------------: | :---------------------: |
| Strain Hardening                      |                  x                  |                     x                     |              |               x               |            x            |
| Time Hardening                        |                                     |                     x                     |      x       |               x               |            x            |
| Generalized Exponent                  |                                     |                     x                     |      x       |               x               |            x            |
| Generalized Graham                    |                                     |                     x                     |      x       |               x               |            x            |
| Generalized Blackbum                  |                                     |                     x                     |      x       |               x               |                         |
| Modified Time Hardening               |                  x                  |                                           |      x       |               x               |            x            |
| Modified Strain Hardening             |                  x                  |                     x                     |              |               x               |            x            |
| Generalized Garofalo(Hyperbolic sine) |                                     |                     x                     |              |               x               |            x            |
| Exponential Form                      |                                     |                     x                     |              |               x               |            x            |
| Norton                                |                                     |                     x                     |              |               x               |            x            |
| Combined Time Hardening               |                  x                  |                                           |      x       |               x               |            x            |
| Prim+Sec Rational Polynomial          |                                     |                     x                     |      x       |               x               |                         |
| Generalized Time Hardening            |                  x                  |                                           |      x       |               x               |            x            |



#### 2、蠕变

------

蠕变是固体材料在一段时间内的非弹性、不可逆变形。它是结构寿命的一个限制因素，依赖于应力、应变、温度和时间等变量。这种依赖关系可以建模为：
$$
\large \epsilon_{cr}' = f(\sigma,\epsilon,T,t)
$$
上式中，

​		*$\large \epsilon_{cr}'$ ——蠕变应变率。*



#### 3、Modified Time Hardening - 修正时间硬化方程

------

基于时间硬化理论的 Norton-Bailey 蠕变规律认为：在给定的应力和温度条件下，其蠕变应变率仅取决于时间，一般表达式为 $\epsilon_{cr}' = f(\sigma,t,T)$。而通常蠕变试验测得的数据是在给定应力$\sigma$、温度 $T$ 下应变与时间的关系，于是演化出修正时间硬化理论，即在给定的应力和温度条件下，蠕变应变仅决定于时间。

蠕变应变其数学表达式为蠕变应变率的时间积分，可以写作 $\epsilon_{cr} = \int({ \epsilon_{cr}' })dt$ .

考虑应力、温度、时间对蠕变应变率的相应，同时温度对应变率的影响引入阿伦尼乌斯公式（Arrhenius equation），故蠕变应变率 $\epsilon_{cr}'$ 的表达式可写作如下形式：
$$
\large \epsilon_{cr}' = C_1  \sigma^{C_2}  t^{C_3}  e^{-\frac{C_4}{T}}
$$
因此基于修正时间硬化理论的蠕变应变方程表达式为：
$$
\Large \epsilon_{cr} = \int({ \epsilon_{cr}' })dt = \frac{C_1 \sigma^{C_2} t^{C_3+1} e^{-\frac{C_4}{T}} } {C_3 + 1}
$$
上式中，

​		*$\large \epsilon_{cr}$ —— 蠕变应变*

​		*$C_1$ —— 系数1*

​		*$C_2$ —— 系数2*

​		*$C_3$ —— 系数3*

​		*$C_4$ —— 系数4*

​		*$t$ —— 时间*

​		*$T$ —— 温*度











