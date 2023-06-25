# ANSYS DesignModeler JS 脚本开发方法

<h5 style="color:Aquamarine; font-size:14px">上传时间：2023-06-24</h5>

> Author：			   Kenny Chu
>
> 主页：				   https://kennyangel.github.io/
>
> Date：				  20211029
>
> AnsysVersion：	2021R2
>
> Abstract：
>
> ​		DesignModeler（DM）目前为止支持两种开发方式：ACT Python、JavaScript。由于Ansys目前主要更新SpaceClaim（SCDM），DM更新进度缓慢，因而目前来说 DM 对于 ACT Python 的支持不足，很多函数并未进行封装。因而 JS 仍有开发的需求。
>
> ​		但是Ansys官方给出的 JS 文档过少，以下记录部分 JS 调试的方法。

## 1、js 脚本运行示例

> 延申，两个网上的案例：
>
> [How to use scripts to generate a plane wing using ANSYS Design Modeler 15.0 – Technical Content (esss.co)](https://support.esss.co/hc/en-us/articles/205250985-How-to-use-scripts-to-generate-a-plane-wing-using-ANSYS-Design-Modeler-15-0)
>
> [[DesignModeler\] DesignModeler Scripting: How to get Full Command Access -- CFD Online Discussion Forums (cfd-online.com)](https://www.cfd-online.com/Forums/ansys-meshing/105109-designmodeler-scripting-how-get-full-command-access.html)
>
> 

### EX-1

```javascript
// start from clear scratch
ag.gui.NewFile();
ag.m.ClearAllErrors();
ag.m.NewSession (true);
ag.gui.setUnits(ag.c.UnitMillimeter, ag.c.UnitDegree, ag.c.No);

// Create a Sphere
feature = ag.gui.CreatePrimitive(1);	// Sphere
// feature = ag.gui.CreatePrimitive(2);	// Box
// feature = ag.gui.CreatePrimitive(3);	// Parallelepiped
// feature = ag.gui.CreatePrimitive(4);	// Cylinder
// feature = ag.gui.CreatePrimitive(5);	// Cone
// feature = ag.gui.CreatePrimitive(6);	// Prism
// feature = ag.gui.CreatePrimitive(7);	// Pyramid
// feature = ag.gui.CreatePrimitive(8);	// Torus
// feature = ag.gui.CreatePrimitive(9);	// Bend

// CreateSlice
var s1=ag.gui.CreateSlice();
s1.Name="mySlice"
s1.PutBasePlane(ag.b.GetXYPlane());

```

### EX-2

```javascript
// start from clear scratch
ag.gui.NewFile();
ag.m.ClearAllErrors();
ag.m.NewSession (true);
ag.gui.setUnits(ag.c.UnitMillimeter, ag.c.UnitDegree, ag.c.No);

// import file
var imp1=ag.b.Import("myFile.igs");  // IAnsImport
imp1.Name="CAD_geom";
imp1.Operation=ag.c.Frozen;
imp1.PutBasePlane(ag.b.GetXYPlane());

ag.b.Regen();
ag.gui.ZoomFit();

// get the actual model bounds
var medges=ag.m.ModelEdges(); // IAnsEdges3D
var maxX=0, minX=0 , maxY=0, minY=0 , maxZ=0, minZ=0;
for(var i=1;i<= medges.Count;i++)
{
  var eg=medges.Item(i);  // IAnsEdge3D
  if(eg.EdgeCoord(0)>maxX) maxX=eg.EdgeCoord(0);
  if(eg.EdgeCoord(0)<minX) minX=eg.EdgeCoord(0);
  if(eg.EdgeCoord(1)>maxY) maxY=eg.EdgeCoord(1);
  if(eg.EdgeCoord(1)<minY) minY=eg.EdgeCoord(1);
  if(eg.EdgeCoord(2)>maxZ) maxZ=eg.EdgeCoord(2);
  if(eg.EdgeCoord(2)<minZ) minZ=eg.EdgeCoord(2);
}

// create scetch object
var bX=(maxX+minX)/2.0*1e3;  // EdgeCoord() gives "m" but we need 'mm'
var bY=(maxY+minY)/2.0*1e3;
var lX=Math.abs(maxX-minX)*1e3+4; // add 2 mm to each bound
var lY=Math.abs(maxY-minY)*1e3+4;

var skPlane  = ag.b.GetXYPlane(); // IAnsPlane
var Sk1 = skPlane.NewSketch();   // IAnsSketch
Sk1.Name = "base_sketch";
Sk1.Line(bX-lX/2.0, bY-lY/2.0, bX+lX/2.0, bY-lY/2.0);
Sk1.Line(bX+lX/2.0, bY-lY/2.0, bX+lX/2.0, bY+lY/2.0);
Sk1.Line(bX+lX/2.0, bY+lY/2.0, bX-lX/2.0, bY+lY/2.0);
Sk1.Line(bX-lX/2.0, bY+lY/2.0, bX-lX/2.0, bY-lY/2.0);

// NOTE how to select sketch before CreateSurfSk feature !!!
ag.selectedFeature = ag.gui.TreeviewFeature(Sk1.Name, 0);
var SSk1=ag.gui.CreateSurfSk();  // IAnsFSurfSk
SSk1.Name="ERI_base";
SSk1.Operation=ag.c.Frozen;
SSk1.WithPlaneNormal=ag.c.Yes;
```

## 2、DM 脚本编写

> Ansys安装完成后，DM的官方程序路径为：E:\Program Files\ANSYS Inc\v212\aisol\AGP\AGPages\scripts
>
> Mechanical的官方程序路径为：E:\Program Files\ANSYS Inc\v212\aisol\DesignSpace\DSPages\scripts
>
> 我们在调试脚本时需要从 "agEventHandler.js" 文件中查找官方的基础操作函数。

"agEventHandler.js" 摘录

```javascript
case 301:  feature = ag.gui.CreatePlane();          break;
case 302:  feature = ag.gui.CreateBlend();          break;
case 303:  feature = ag.gui.CreateVBlend();         break;
case 304:  feature = ag.gui.CreateChamfer();        break;
case 335:  feature = ag.gui.CreateVertexBlend();    break;
case 305:  feature = ag.gui.CreateExtrusion();      break;
case 306:  feature = ag.gui.CreateRevolution();     break;
case 307:  feature = ag.gui.CreateSweep();          break;
case 308:  feature = ag.gui.CreateSkin();           break;
case 309: feature = ag.gui.CreateShell();           break;
case 1604: feature = ag.gui.CreateWire();           break;
case 1664: feature = ag.gui.CreateLinePt();         break;
case 1665: feature = ag.gui.CreateLineSk();         break;
case 1666: feature = ag.gui.CreateLineEd();         break;
case 1606: feature = ag.gui.CreateUnfreeze();       break;
case 1608: feature = ag.gui.CreateFaceDelete();     break;
case 1609: feature = ag.gui.CreateSpot();           break;
case 1612: feature = ag.gui.CreateWireSplit();      break;
case 1613: feature = ag.gui.CreateWireSheet();      break;
case 1614: feature = ag.gui.CreateAttribute();      break;
case 1617: feature = ag.gui.CreateSlice();          break;
case 1618: feature = ag.gui.CreateBodyOp(8);         break;
case 1619: feature = ag.gui.CreateSelectionSet();   break;
case 1620: feature = ag.gui.CreateJoint();          break;
case 1621: feature = ag.gui.CreateSurfaceExt();     break;
case 1632: feature = ag.gui.CreateSolidExt();       break;  //Solid Extension
case 1668: feature = ag.gui.CreateSurfSk();         break;
case 1669: feature = ag.gui.CreateMidSurf();        break;
case 1670: feature = ag.gui.CreateCap();            break;
case 1671: feature = ag.gui.CreateCurve();          break;
case 1672: feature = ag.gui.CreatePattern();        break;
case 1673: feature = ag.gui.CreateWinding();        break; 
case 1689: feature = ag.gui.CreateSymmetry();       break;
case 1691: feature = ag.gui.CreateBoolean();        break;
case 1692: feature = ag.gui.CreateSurfacePatch();   break;
case 1693: feature = ag.gui.CreateFlip();           break;
case 1694: feature = ag.gui.CreateCyclicSymmetry(); break;
case 1695: feature = ag.gui.CreateMerge();          break;
case 1696: feature = ag.gui.CreateConnect();        break;
case 1697: feature = ag.gui.CreateFinalize();       break;
case 1698: feature = ag.gui.CreateProjection();     break;
case 1631: feature = ag.gui.CreateConversion();     break;
```

## 3、DM脚本运行

在Mechanical中可以通过Python发送以下命令。但是该方法对于DM不适用。对于DM而言，应先保存好 JS 脚本文件，通过 File -> Run Script 运行，或者通过 WB 脚本 SendCommand 函数发送命令。

```python
ExtAPI.Application.ScriptByName("jscript").ExecuteCommand("DS.Script.setResultScale(1)")
ExtAPI.Application.ScriptByName("jscript").ExecuteCommand("DS.Script.doUndeformedWireFrameResultView()")
ExtAPI.Application.ScriptByName("jscript").ExecuteCommand("DS.Script.doBandedContoursResultView()")
```

### 4、从Workbench开始执行命令

在WB中可以通过以下代码向各个子模块发送命令。

```python
# encoding: utf-8

def edit_Mech():
    '''
    	wb 驱动 Mechanical
    '''
    system1 = GetSystem(Name="SYS")
    modelComponent1 = system1.GetComponent(Name="Model")
    modelComponent1.Refresh()
    model1 = system1.GetContainer(ComponentName="Model")
    model1.Edit(Interactive=True)
    script=open("mech-bcs.py","r")
    scriptcommand=script.read()
    script.close()
    model1.SendCommand(Language="Python",Command=scriptcommand)

def edit_Geo_DM_PY():
    '''
    	wb 驱动 DM
    '''
    system1 = GetSystem(Name="SYS")
    modelComponent1 = system1.GetComponent(Name="Model")
    modelComponent1.Refresh()
    geo1 = system1.GetContainer(ComponentName="Geometry")
    geo1.Edit(IsSpaceClaimGeometry=False, Interactive=True)
    # IsSpaceClaimGeometry=False/True 用来控制几何软件为DM还是SCDM
    script=open("mech-bcs.py","r")
    scriptcommand=script.read()
    script.close()
    geo1.SendCommand(Language="Python",Command=scriptcommand)
    
def edit_Geo_DM_JS():
    '''
    	wb 驱动 DM
    '''
    system1 = GetSystem(Name="SYS")
    modelComponent1 = system1.GetComponent(Name="Model")
    modelComponent1.Refresh()
    geo1 = system1.GetContainer(ComponentName="Geometry")
    geo1.Edit(IsSpaceClaimGeometry=False, Interactive=True)
    script=open("mech-bcs.js","r")
    scriptcommand=script.read()
    script.close()
    geo1.SendCommand(Language="JavaScript",Command=scriptcommand)
```



