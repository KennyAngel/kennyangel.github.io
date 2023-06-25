# 基于Python scipy库实现曲线拟合

<h5 style="color:Aquamarine; font-size:14px">上传时间：2023-06-25</h5>

> Author：			   Kenny Chu
>
> 主页：				   https://kennyangel.github.io/
>
> Date：				  20210820
>

#### 一、指数函数、幂函数拟合

------

##### 1、官方案例展示

使用 scipy.optimize 中的 curve_fit 函数拟合

- 定义待拟合函数方程，如 $y = func(x,a,b,c)$ ，其中 $x$ 为自变量，$a、b、c$ 为待求解系数
- 给定一组测量数据的 x 数组，如 x = [0, 10, 20, 30, 40, 50]
- 给定一组测量数据的 y 数组，如 y = [40.1, 48, 11, 88,  91, 14]
- 调用 curve_fit 函数拟合 $func$ ，如 popt, pcov = curve_fit(func, xdata, ydata)
- 捕捉函数拟合结果，popt 为一个数组，popt[0]、popt[1]、popt[2] 分别对应 $func$ 方程的三个系数 $a、b、c$ 
- 重新调用函数 $func$ 计算拟合后的 y 值
- 借用 matplotlib 将拟合前后的数据绘图对比

```python
# encoding: utf-8
# version:	3.8
# 案例1

from scipy.optimize import curve_fit
import matplotlib.pyplot as plt
import numpy as np

def func(x, a, b, c):
    return a * np.exp(-b * x) + c

xdata = np.linspace(0, 4, 50)
y = func(xdata, 2.5, 1.3, 0.5)
# 加入噪声
ydata = y + 0.2 * np.random.normal(size=len(xdata))
plt.plot(xdata, ydata, 'b-')
popt, pcov = curve_fit(func, xdata, ydata)
# popt数组中，三个值分别是待求参数a,b,c
y2 = [func(i, popt[0], popt[1], popt[2]) for i in xdata]
plt.plot(xdata, y2, 'r--')
plt.show()

print(popt)
```

上述案例计算结果如下图所示，其中红色虚线为拟合结果。

![](Python scipy库实现曲线拟合_img\test1.png)



------

##### 2、蠕变方程计算

使用以上方式，实现修正时间硬化蠕变方程的拟合。

修正时间硬化蠕变方程表达式如下：
$$
\Large \epsilon_{cr} = \frac{C_1 \sigma^{C_2} t^{C_3+1} e^{-\frac{C_4}{T}} } {C_3 + 1}
$$
修正时间硬化蠕变方程拟合源码如下：

```python
# encoding: utf-8

# -----------------------------------------------------------
# author  : Kenny Chu
# data    : 20210820
# des     : Creep - Modified time hardning. Solve C1\C2\C3\C4 by curve fitting.
# version : 3.8
# -----------------------------------------------------------


from scipy.optimize import curve_fit
import matplotlib.pyplot as plt
import numpy as np

# global parameter ----------------
g_stress = 100  #MPa
g_T = 26        #℃

def f_creep_strain(t, stress, temp, c1, c2, c3, c4):
    '''
    基于修正时间硬化的蠕变应变方程

    :param t: 时间
    :param stress: 应力状态
    :param temp: 温度状态
    :param c1: 系数C1
    :param c2: 系数C2
    :param c3: 系数C3
    :param c4: 系数C4
    :return: 蠕变应变方程（Modified time hardning）
    '''
    f = c1 * (stress**c2) * (t**c3) * (np.exp(-c4/temp))
    return f

def f_creep_strain2(t, c1, c2, c3, c4):
    '''
    基于修正时间硬化的蠕变应变方程

    :param t: 时间
    :param c1: 系数C1
    :param c2: 系数C2
    :param c3: 系数C3
    :return: 蠕变应变方程（Modified time hardning）
    '''
    f = c1 * (g_stress**c2) * (t**c3) * (np.exp(-c4/g_T))
    return f

# read csv --------------------------------
x0 = []
y0 = []

f = open('data.csv')
lines = f.readlines()

for line in lines:
    line = line.strip('\n')
    if line != '' :
        s = line.split(',')
        x0.append(float(s[0]))
        y0.append(float(s[1]))

print(x0)
print(y0)
plt.plot(x0, y0, 'b-')

# curve fitting --------------------------------

popt, pcov = curve_fit(f_creep_strain2, x0, y0)
# popt数组中，四个值分别是待求参数c1,c2,c3,c4
y2 = [f_creep_strain2(i, popt[0], popt[1], popt[2], popt[3]) for i in x0]
plt.plot(x0, y2, 'r--')
plt.show()

print(popt)
```

上述案例计算结果如下图所示，其中红色虚线为拟合结果。

![](Python scipy库实现曲线拟合_img\test2.png)

附件，"data.csv"文件内容如下。

```tex
0,0
2045.83959,0.002377715
2267.589628,0.002197933
2516.550037,0.002434705
2762.198865,0.00273801
3001.073431,0.002974631
3236.586049,0.003211201
3465.425138,0.003514255
3701.000715,0.003834056
3939.887872,0.004087322
4175.375307,0.004290601
4861.779251,0.005049948
5087.143069,0.005203137
5319.293739,0.005439657
5551.469593,0.005709469
5786.994803,0.005962685
6500.269145,0.006689143
6735.806946,0.006959005
6971.332156,0.007212221
7206.869957,0.007482084
7442.407759,0.007751946
7677.970744,0.008055101
8145.77254,0.008711297
8374.661995,0.009080935
8606.888215,0.009417332
8835.752488,0.009753678
9064.629352,0.010106669
9293.506216,0.010459661
9525.745027,0.010812704
9757.971247,0.0111491
9986.873294,0.011535384
10212.42599,0.011938264
10441.31544,0.012307902
10892.40823,0.013097015
11259.45233,0.013884869
11697.21065,0.014823595
11862.24829,0.015225568
12077.84105,0.015794758
12296.7454,0.016297413
12512.31298,0.01683331
12727.90574,0.017402499
12936.7872,0.017988233
13088.36445,0.018373359
13149.00542,0.018540726
13354.53753,0.019143056
13984.65718,0.021050124
14173.50546,0.021818663
14476.79847,0.02277202
14787.14275,0.024158276
15087.06122,0.025094937
15238.80216,0.025696461
15821.99306,0.027785931
16294.07598,0.029657339
16816.68886,0.031662672
17213.02094,0.035613678
```

