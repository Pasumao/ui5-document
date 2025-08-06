# CDS CURD

## Read

```sql
SELECT * FROM ybemail_dt_email
    WHERE is_allow = ''
    INTO TABLE @DATA(lt_email).
```

```abap
READ ENTITIES OF ypsm0010_i_form IN LOCAL MODE
    ENTITY ypsm0010_i_menu
    FROM VALUE #( FOR key IN keys ( formid = key-formid ) )
    RESULT DATA(lt_menu).
"或者如果你有keys的话，可以这样
READ ENTITIES OF ypsm0010_i_form IN LOCAL MODE
    ENTITY ypsm0010_i_form
    ALL FIELDS WITH
    CORRESPONDING #( keys )
    RESULT DATA(lt_data).
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

## Delete

```abap
MODIFY ENTITIES OF ypsm0010_i_form IN LOCAL MODE
    ENTITY ypsm0010_i_form
    DELETE FROM VALUE #( FOR formid IN it_formid ( %key = formid ) ).
```
