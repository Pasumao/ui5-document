# TreeTable

## CDS

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
      MenuSeq,

      /* Associations */
      _Form       : redirected to parent ZGDV_C_0010,
      _Menu       : redirected to ZGDV_C_0011,
      _ParentMenu : redirected to ZGDV_C_0011,
      _MenuText   : redirected to composition child ZGDV_C_0013
}

// ZGDV_H_0011
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

//ZGDV_R_0011
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
