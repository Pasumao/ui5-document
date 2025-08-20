# Annotation

## @UI

### @UI.headerInfo

主页表名 typeNamePlural
详情页大标题 title

```sql
@UI.headerInfo: { 
    typeNamePlural: '주석양식 리스트',
    title: { 
        value: 'FormId' //字段
    }
}
```

### @UI.facet

详情页内容

```sql
  @UI.facet: [
      {
          purpose: #STANDARD,
          position: 10,
          type: #PRESENTATIONVARIANT_REFERENCE,
          targetElement: '_Text',
          targetQualifier: 'TEXT_Variant',
          label: '주석양식 텍스트',
          id: 'idTextTable'
      },
      {
           purpose:       #STANDARD,
           position: 20,
           type:          #LINEITEM_REFERENCE,
           label:         '메뉴리스트',
           targetElement: '_Menu'
      }，
      { 
        purpose: #STANDARD,
        type: #FIELDGROUP_REFERENCE,
        label: '주석양식 텍스트',
        targetQualifier: 'Detail',
        position: 30 
    }
  ]
```

### @UI.lineItem

表相关

```sql
@UI.lineItem: [{  
        position: 20
    }]
```

### @UI.fieldGroup

给几个字段绑成一组

```sql
@UI.fieldGroup:[{ position: 20, qualifier: 'Detail' }]
```

### @UI.presentationVariant

并不是很清楚具体的用意，但是是和上面的PRESENTATIONVARIANT_REFERENCE联动使用，也是导入表,但是实际上你使用LINEITEM_REFERENCE就不用写这个了，不明白意义在哪。

```sql
@UI.presentationVariant: [{  
      qualifier: 'TEXT_Variant',
      maxItems: 5,
      visualizations: [{type: #AS_LINEITEM}]
}]
```

下面正常定义lineitem就可以，也不需要写qualifier，这个qualifier是给父程序调用用的。

## @Consumption

### @Consumption.valueHelpDefinition

value help用

```sql
  @Consumption.valueHelpDefinition: [{
      entity: { name: 'ZGDV_VH_0011', element: 'MenuId' },
      additionalBinding: [
          { element: 'FormId', localElement: 'FormId', usage: #FILTER },
          { element: 'MenuId', localElement: 'ParentMenu', usage: #RESULT }
      ],
      useForValidation: true
  }]
```

useForValidation加上这个会让他自动校验是否为valuehelp的值

默认element就是#RESULT，不需要填，这个是给选一行给好几个字段填充时用的，filter要注意一定要有数据在当前行，要不然没作用,解决方法如下.

```abap
// behavior
association _Menu
  {
    create
    {
      default function GetDefaultsForMenu;
    }
    with draft;
  }

//在子表
field ( readonly ) FormId

// class
METHOD GetDefaultsForMenu.
    result = VALUE #( for key in keys (
            %tky = key-%tky
            %param = VALUE #( formid = key-FormId )
        ) ).
ENDMETHOD.
```

## @ObjectModel

### @ObjectModel.resultSet

@ObjectModel.resultSet.sizeCategory: #XS   会使valuehelp变为下拉框
