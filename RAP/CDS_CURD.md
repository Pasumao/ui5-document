# CDS CURD

## Read

```sql
SELECT * FROM ybemail_dt_email
    WHERE is_allow = ''
    INTO TABLE @DATA(lt_email).
```

可以用正常的select语句，也可以用read entities 但是read entities只能通过主键过滤

## Update

```abap
MODIFY ENTITIES OF YBEMAIL_DD_EMAIL
    ENTITY YBEMAIL_DD_EMAIL
    UPDATE FIELDS ( is_allow )
    WITH VALUE #( FOR LINE IN lt_email ( %key = LINE-email is_Allow = LINE-is_allow ) ).
COMMIT ENTITIES.
```

如果是behavior内部操作则不需要commit entities，如果是外部代码则需要commit entities.
