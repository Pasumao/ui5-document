# @UI.chart

## 1. BulletChart

### 定义

```abap
@UI.chart: [
  {
    qualifier: 'bulletChart',
    title: 'Bullet Micro Chart (#BulletMicroChart)',
    description: 'This is Bullet Micro Chart',
    chartType: #BULLET,
    measures: ['AValue'],
    measureAttributes: [
      {
        measure: 'AValue',
        role: #AXIS_1,
        asDataPoint: true
      }
    ]
  }
]

  @UI:{
    dataPoint: { 
      qualifier: 'AValue',
      targetValueElement: 'BValue',
      forecastValue: 'CValue',
      criticality: 'DValue',
      minimumValue: 0
    }
  }
  @EndUserText.label: 'Value A'
  AValue;
```

在Chart中定义图表类型后measures选定字段，然后去字段上的@UI.dataPoint设定其他变量

在BulletChart中

qualifier表示实际数量 图中为深色部分
targetValueElement表示目标数量 图中为竖线
forecastValue表示预测数量 图中为浅色部分
criticality表示主题颜色

![BulletChart](./image/@UI.chart.BulletChart.png)

### 在表中

```abap
  @UI:{
    lineItem: [
        {
            label: 'bulletChart',
            position: 25,
            type: #AS_CHART,
            importance: #HIGH,
            valueQualifier: 'bulletChart'
        }
    ]
  }
```

### 在facet中

```abap
  @UI:{
    facet: [
      {
        parentId   : 'FacetCollection',
        type       : #CHART_REFERENCE,
        targetQualifier: 'bulletChart'
      }
    ]
  }
```
