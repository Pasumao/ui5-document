# TreeTable

[参考文档](https://help.sap.com/docs/abap-cloud/abap-rap/editable-treeviews-with-draft-capabilities?locale=en-US)

## Table

```sql
@EndUserText.label : 'Menu TABLE'
@AbapCatalog.enhancement.category : #NOT_EXTENSIBLE
@AbapCatalog.tableCategory : #TRANSPARENT
@AbapCatalog.deliveryClass : #A
@AbapCatalog.dataMaintenance : #RESTRICTED
define table zgdt0011 {

  key client            : abap.clnt not null;
  key form_id           : abap.char(10) not null;
  key menu_id           : abap.char(10) not null;
  parent_menu           : abap.char(10);
  menu_seq_out          : abap.int4;
  menu_seq              : abap.int4;

}
```

- form_id：父表的主键
- parent_menu：父节点的id
- menu_seq：树的排序用字段（必须）
- menu_seq_out：用来修改menu_seq用的外显字段（非必须）

## CDS

### R

```sql
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'Menu'
@Metadata.ignorePropagatedAnnotations: true
define view entity ZGDV_R_0011
  as select from ZGDV_I_0011

  association              to parent ZGDV_R_0010 as _Form       on  $projection.FormId = _Form.FormId

  association of many      to one ZGDV_R_0011    as _ParentMenu on  $projection.FormId     = _ParentMenu.FormId
                                                                and $projection.ParentMenu = _ParentMenu.MenuId

  association of one       to many ZGDV_R_0011   as _Menu       on  $projection.FormId = _Menu.FormId
                                                                and $projection.MenuId = _Menu.ParentMenu
{
  key FormId,
  key MenuId,
      ParentMenu,
      _Text.Menutext       as MenuName,
      _ParentText.Menutext as ParentMenuName,
      SeqOut,
      MenuSeq,
      CreateDate,
      CreateBy,
      LocalLastChangedBy,
      LocalLastChangedAt,
      LastChangedAt,
      _Form,
      _ParentMenu,
      _Menu
}
```

### C

```sql
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: '주석양식 메뉴정보'
@Metadata.ignorePropagatedAnnotations: true

@OData.hierarchy.recursiveHierarchy: [{entity.name: 'ZGDV_H_0011'}]

@Metadata.allowExtensions: true
define view entity ZGDV_C_0011
  as projection on ZGDV_R_0011
{
  key FormId,
  key MenuId,
      ParentMenu,
      SeqOut,
      MenuSeq,

      /* Associations */
      _Form       : redirected to parent ZGDV_C_0010,
      _Menu       : redirected to ZGDV_C_0011,
      _ParentMenu : redirected to ZGDV_C_0011,
      _MenuText   : redirected to composition child ZGDV_C_0013
}
```

## hierarchy CDS

```sql
@AccessControl.authorizationCheck: #NOT_REQUIRED
define hierarchy ZGDV_H_0011
  with parameters
    P_FormId : abap.char(10)
  as parent child hierarchy(
    source ZGDV_R_0011
    child to parent association _ParentMenu
    directory _Form filter by
      FormId = $parameters.P_FormId
    start where
      ParentMenu is initial
    siblings order by
      MenuSeq
  )
{
  key FormId,
  key MenuId,
      ParentMenu,
      MenuName,
      ParentMenuName,
      MenuSeq
}
```

## Behavior

```sql
define behavior for ZGDV_R_0011 //alias <alias_name>
persistent table zgdt0011
draft table zgdt0011_d
lock dependent by _Form
authorization dependent by _Form
etag master LastChangedAt
{
  update;
  delete;

  field ( readonly : update ) ParentMenu, MenuId;
  field ( readonly ) FormId, MenuName, ParentMenuName, MenuSeq;
  field ( mandatory : create ) MenuId, SeqOut;

  association _Form { with draft; }
  association _MenuText { with draft; create; }

  determination setMenuSeq on modify { field SeqOut; }

  side effects {
    field SeqOut affects field MenuSeq;
  }

  association _ParentMenu
  {
    with draft;
    link action linkParentMenu;
    unlink action unlinkParentMenu;
  }

  association _Menu { with draft; }

  instance hierarchy zgdv_h_0011
  {
    managed reorder action changeSeq;
    field ( hierarchy-index ) MenuSeq;
    ascending association _ParentMenu;
    descending association _Menu { with cascading delete; }
  }

  mapping for zgdt0011
    {
      CreateBy           = create_by;
      CreateDate         = create_date;
      FormId             = form_id;
      LastChangedAt      = last_changed_at;
      LocalLastChangedAt = local_last_changed_at;
      LocalLastChangedBy = local_last_changed_by;
      MenuId             = menu_id;
      MenuSeq            = menu_seq;
      SeqOut             = menu_seq_out;
      ParentMenu         = parent_menu;
    }
}

// C
define behavior for ZGDV_C_0011 //alias <alias_name>
{
  use update;
  use delete;

  use association _Form { with draft; }
  use association _Menu { with draft; }
  use association _MenuText { create; with draft; }

  use association _ParentMenu
  {
    with draft;
    link action linkParentMenu;
    unlink action unlinkParentMenu;
  }
}

```

- 修改MenuSeqOut字段时，MenuSeq字段也跟着修改

```sql
determination setMenuSeq on modify { field SeqOut; }

side effects {
  field SeqOut affects field MenuSeq;
}
```

- 实现树节点的拖拽功能

```sql
association _ParentMenu
{
  with draft;
  link action linkParentMenu;
  unlink action unlinkParentMenu;
}
```

- 实现树节点的排序功能

```sql
instance hierarchy zgdv_h_0011
{
  managed reorder action changeSeq;
  field ( hierarchy-index ) MenuSeq;
  ascending association _ParentMenu;
  descending association _Menu { with cascading delete; }
}
```

managed reorder action changeSeq;:要在用户界面上将层次结构节点移动到其同级节点中的指定位置，必须在实例层次结构的行为定义中声明重新排序操作

field ( hierarchy-index ) MenuSeq;:它必须是 INT 或 NUMC 类型

ascending association _ParentMenu;
descending association_Menu { with cascading delete; }:对于托管重新排序操作，您还必须声明一个升序关联（即层次到父关联）和一个相应的反向关联（即降序关联）。在这里，你可以选择添加声明 { with cascading delete; }。有了这个声明，每当删除一个层次结构节点时，框架也会删除它的所有子节点。

## Class

```abap
CLASS lhc_zgdv_r_0011 DEFINITION INHERITING FROM cl_abap_behavior_handler.
  PRIVATE SECTION.

    METHODS get_instance_authorizations FOR INSTANCE AUTHORIZATION
      IMPORTING keys REQUEST requested_authorizations FOR zgdv_r_0011 RESULT result.
    METHODS setmenuseq FOR DETERMINE ON MODIFY
      IMPORTING keys FOR zgdv_r_0011~setmenuseq.

ENDCLASS.

CLASS lhc_zgdv_r_0011 IMPLEMENTATION.

  METHOD get_instance_authorizations.
  ENDMETHOD.

  METHOD setmenuseq.

    READ ENTITIES OF zgdv_r_0010 IN LOCAL MODE
        ENTITY zgdv_r_0011
            ALL FIELDS WITH
            CORRESPONDING #( keys )
            RESULT DATA(lt_data).

    MODIFY ENTITIES OF zgdv_r_0010 IN LOCAL MODE
        ENTITY zgdv_r_0011
            UPDATE FIELDS ( menuseq )
            WITH VALUE #(
                FOR ls_data IN lt_data (
                    %control-MenuSeq = if_abap_behv=>mk-on
                    %tky = ls_data-%tky
                    menuseq = ls_data-seqout
                )
            ).
  ENDMETHOD.

ENDCLASS.
```
