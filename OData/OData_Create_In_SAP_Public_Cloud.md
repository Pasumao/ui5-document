# 流程

## 1.创建Database Table

```sql
@EndUserText.label : 'YBEMAIL_DT'
@AbapCatalog.enhancement.category : #NOT_EXTENSIBLE
@AbapCatalog.tableCategory : #TRANSPARENT
@AbapCatalog.deliveryClass : #A
@AbapCatalog.dataMaintenance : #RESTRICTED
define table ybemail_dt {

  key client       : abap.clnt not null;
  key email        : abap.char(255) not null;
  name             : abap.char(255);
  admin            : abap.char(1);
  create_date_time : abap.dats;
  create_by        : unam;

}
```

## 2.创建Data Definitions (CDS)

```sql
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'YBEMAIL_DD'
@Metadata.ignorePropagatedAnnotations: true
define root view entity YBEMAIL_DD as select from YBEMAIL_DT

{
    key email as Email,
    name as Name,
    admin as Admin,
    create_date_time as CreateDateTime,
    create_by as CreateBy
}
```

## 3.创建Service Definition

```sql
@EndUserText.label: 'YBEMAIL_SD'
define service YBEMAIL_SD {
  expose YBEMAIL_DD as A_Email;
}
```

## 4.创建Service Binding

选择需要的odata服务类型，然后点击public 发布

## 5.创建Communication Scenarios

再发布odata服务后会自动生成inbound文件,在Communication Scenarios中的Inbound中添加上述生成的inbound文件

## 6.添加权限

到SAP Public Cloud中搜索Communication Arrangements，新建一个，选择上面创建的Communication Scenarios，然后在Communication System字段添加基于权限的权限组，保存即可
