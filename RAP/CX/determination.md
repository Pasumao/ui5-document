### **determination DetName on modify/save { CRUD1; CRUD2; ... } | { field Field1, Field2, ... ; }**

### 

* #### Modify

当我们需要根据触发条件计算几个字段的值并在保存前向用户显示计算值时。在保存之前和保存时，只要满足触发条件，都会触发确定。



* ###### Example:
```
determination DetName on modify { field layover;create; }
```


* #### Save

当我们需要根据触发条件计算几个字段的值并在保存后向用户显示计算值时。这可能包含在 UI 级别隐藏但用于某些内部计算的字段。仅在满足触发条件时才会在保存时触发确定。



* ###### Example:
```
determination DetName on save { field layover; }
```






### 括号内部触发条件 Create / Update / Delete / Field



* ###### Create

创建 -> 每当创建实例时，即根据确定级别创建新记录/新行项目时，它都会触发确定。



* ###### Update

更新 -> 每当实例更新时，即更新任何字段值，它都会触发确定。



* ###### Delete

删除 -> 每当删除实例时，即根据确定级别删除记录/行项目时，它都会触发确定。



* ###### Field

字段 -> 每当更新该特定字段（字段）的值时，它都会触发确定。



* ## Example:
```
determination DetName on modify { field layover;create; update; }
determination DetName on save { field layover; delete; }
```

#### Example(1):
> 但点击create按钮时触发，获取技术名称给到字段 ( UserName ) 
> 
Behavior
```
  determination set_username on modify { create; }
```

classes
```
  METHOD set_username.
        " 获取当前用户的技术名称
    DATA(lv_user_technical_name) = cl_abap_context_info=>get_user_technical_name( ).

    " 更新创建的记录，设置 username 字段
    MODIFY ENTITIES OF ycx_test001_data IN LOCAL MODE
      ENTITY ycx_test001_data
        UPDATE FIELDS ( UserName )
        WITH VALUE #( FOR key IN keys
                      ( %tky         = key-%tky
                        UserName     = lv_user_technical_name ) )
      REPORTED DATA(lt_reported).

  ENDMETHOD.
```

#### Example(2):

```
managed implementation in class zbp_cx_test001_data unique;
strict ( 2 );
with draft;

define behavior for YCX_TEST001_DATA //alias <alias_name>
persistent table ycxcreatedata
draft table ycxcreatedata_d
...
{
  ...
  association _PROJECT { with draft; create; }

  ...
  determination CalculatePoint on modify { field BonusPoints; }
  side effects
  {
    field BonusPoints affects field TotalPoints;
  }

  internal action ReCalcTotalTotalPoints;

  ...

}

define behavior for YCX_TEST001_PROJECT //alias <alias_name>
persistent table ycxproject001
draft table ycxproject001_d
lock dependent by _DATA
authorization dependent by _DATA
etag master Id
//etag master <field_name>
{
  ...
  association _DATA { with draft; }

  determination CalculateProjectPoint on modify { field Point; delete; }
  side effects
  {
    field Point affects field _DATA.TotalPoints;
  }
  ...
}
```



```
CLASS lhc_ycx_test001_project DEFINITION INHERITING FROM cl_abap_behavior_handler.

  PRIVATE SECTION.

    METHODS CalculateProjectPoint FOR DETERMINE ON MODIFY
      IMPORTING keys FOR ycx_test001_project~CalculateProjectPoint.

ENDCLASS.

CLASS lhc_ycx_test001_project IMPLEMENTATION.

  METHOD CalculateProjectPoint.
    READ ENTITIES OF ycx_test001_data IN LOCAL MODE
    ENTITY ycx_test001_data
    BY \_project
    FIELDS ( Point )
     WITH CORRESPONDING #( keys )
     RESULT DATA(lt_points).

    IF lt_points IS INITIAL.   "For delete booking scenario - this table is empty
      SELECT SINGLE * FROM ycxproject001_d WHERE id = @( keys[ 1 ]-id )
        INTO @DATA(ls_point).
      IF sy-subrc = 0.
        lt_points = VALUE #( (  %is_draft = '01' id = ls_point-parentid ) ).
      ENDIF.
    ENDIF.

    "update involved instances
    MODIFY ENTITIES OF ycx_test001_data IN LOCAL MODE
      ENTITY ycx_test001_data
        EXECUTE ReCalcTotalTotalPoints
        FROM VALUE #( FOR <fs_key> IN lt_points ( %tky = <fs_key>-%tky ) ).
  ENDMETHOD.

ENDCLASS.

CLASS lhc_YCX_TEST001_DATA DEFINITION INHERITING FROM cl_abap_behavior_handler.
  PRIVATE SECTION.

    ...

    METHODS recalctotaltotalpoints FOR MODIFY
      IMPORTING keys FOR ACTION ycx_test001_data~recalctotaltotalpoints.

    METHODS calculatepoint FOR DETERMINE ON MODIFY
      IMPORTING keys FOR ycx_test001_data~calculatepoint.


ENDCLASS.

CLASS lhc_YCX_TEST001_DATA IMPLEMENTATION.

  ...

  METHOD ReCalcTotalTotalPoints.
    READ ENTITIES OF ycx_test001_data IN LOCAL MODE
    ENTITY ycx_test001_data
    FIELDS ( BonusPoints )
    WITH CORRESPONDING #( keys )
    RESULT DATA(lt_bouspoints).

    LOOP AT lt_bouspoints ASSIGNING FIELD-SYMBOL(<fs_bouspoint>).
      <fs_bouspoint>-TotalPoints = <fs_bouspoint>-BonusPoints.

      READ ENTITIES OF ycx_test001_data IN LOCAL MODE
       ENTITY ycx_test001_data
       BY \_project
       FIELDS ( Point )
        WITH VALUE #( ( %tky = <fs_bouspoint>-%tky ) )
        RESULT DATA(lt_points).

      LOOP AT lt_points ASSIGNING FIELD-SYMBOL(<fs_point>).
        <fs_bouspoint>-TotalPoints = <fs_bouspoint>-TotalPoints + <fs_point>-Point.
      ENDLOOP.
    ENDLOOP.


    MODIFY ENTITIES OF ycx_test001_data IN LOCAL MODE
      ENTITY ycx_test001_data
        UPDATE FIELDS ( TotalPoints )
        WITH VALUE #( FOR bouspoint IN lt_bouspoints  (
                           %tky      = bouspoint-%tky
                           TotalPoints  = bouspoint-TotalPoints ) ).



  ENDMETHOD.

  METHOD CalculatePoint.
    MODIFY ENTITIES OF ycx_test001_data IN LOCAL MODE
      ENTITY ycx_test001_data
        EXECUTE ReCalcTotalTotalPoints
        FROM CORRESPONDING #( keys ).
  ENDMETHOD.


ENDCLASS.
```


![alt text](GIF/Example(2).gif)