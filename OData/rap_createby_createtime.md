# rap createby createtime changeby changetime lastchangeat

## 1.table cds

貌似需要五个字段一起写才好用（未详细测试）

```sql
  create_date_time      : abp_creation_tstmpl;
  create_by             : abp_creation_user;
  local_last_changed_by : abp_locinst_lastchange_user;
  local_last_changed_at : abp_locinst_lastchange_tstmpl;
  last_changed_at       : abp_lastchange_tstmpl;
```

## 2.behavior

好像需要mapping，也没有详细测试

```sql
managed implementation in class zbp_bemail_dd_email unique;
strict ( 2 );

define behavior for YBEMAIL_DD_EMAIL //alias <alias_name>
persistent table ybemail_dt_email
lock master
authorization master ( instance )
etag master CreateBy
{
  create;
  update;
  delete;

  field ( readonly ) CreateBy, CreateDateTime;

  mapping for ybemail_dt_email
    {
      Email              = email;
      Name               = name;
      Admin              = admin;
      CreateDateTime     = create_date_time;
      CreateBy           = create_by;
      LocalLastChangedBy = local_last_changed_by;
      LocalLastChangedAt = local_last_changed_at;
      LastChangedAt      = last_changed_at;
    }
}
```
