# Domains

## 创建

没什么好说的

## CDS调用

```sql
@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'Cycle ValueHelp'
@Metadata.ignorePropagatedAnnotations: true
@ObjectModel.usageType:{
    serviceQuality: #X,
    sizeCategory: #S,
    dataClass: #MIXED
}
define view entity ZGDV_VH_0014
  as select from DDCDS_CUSTOMER_DOMAIN_VALUE_T( p_domain_name : 'ZGDD_0010' )
{
      @UI.hidden: true
  key domain_name,
      @UI.hidden: true
  key value_position,
      @UI.hidden: true
  key language,
  
      @UI.lineItem: [{ position: 10, importance: #HIGH, label: '작성주기' }]
      value_low,
      @UI.lineItem: [{ position: 20, importance: #HIGH }]
      @Search.defaultSearchElement: true
      text
}
```

所有的domain都从DDCDS_CUSTOMER_DOMAIN_VALUE_T这个CDS表里拿，传parameter：p_domain_name是domain的名。
