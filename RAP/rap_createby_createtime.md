# rap createby createtime changeby changetime lastchangeat

## 1.cds

貌似需要五个字段一起写才好用（未详细测试）

在有子表时生成没有效果

```sql
  create_date_time      : abp_creation_tstmpl;
  create_by             : abp_creation_user;
  local_last_changed_by : abp_locinst_lastchange_user;
  local_last_changed_at : abp_locinst_lastchange_tstmpl;
  last_changed_at       : abp_lastchange_tstmpl;
```

## 2.cds

```cds
      @Semantics.systemDateTime.createdAt: true
      create_date_time           as CreateDate,

      @Semantics.user.createdBy: true
      create_by             as CreateBy,

      @Semantics.user.localInstanceLastChangedBy: true
       local_last_changed_by as LocalLastChangedBy,

      @Semantics.systemDateTime.localInstanceLastChangedAt: true
      local_last_changed_at as LocalLastChangedAt,

      @Semantics.systemDateTime.lastChangedAt: true
      last_changed_at       as LastChangedAt
```

## 3.behavior

```sql
managed implementation in class zbp_psm0020_i_grp unique;
strict ( 2 );
with draft;

define behavior for YPSM0020_I_GRP //alias <alias_name>
persistent table ypsm0020_dt_grp
draft table ypsm0020_dt_grpd
lock master
total etag LastChangedAt
authorization master ( instance )
etag master LastChangedAt
{
  create ( authorization : global );
  update;
  delete;
  field ( readonly: update ) GroupId;
  field ( mandatory : create ) GroupId;

  draft action Edit;
  draft action Activate optimized;
  draft action Discard;
  draft action Resume;
  draft determine action Prepare;

  mapping for ypsm0020_dt_grp
    {
      CreateBy           = create_by;
      CreateDate         = create_date_time;
      GroupId            = group_id;
      LastChangedAt      = last_changed_at;
      LocalLastChangedAt = local_last_changed_at;
      LocalLastChangedBy = local_last_changed_by;
    }
}
```
