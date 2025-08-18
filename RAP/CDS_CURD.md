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

## 结构

```abap
MODIFY ENTITIES OF ypsm0010_i_form IN LOCAL MODE
```

这里是主cds，如果你要操作一个cds他有父表这里就要写父表

```abap
ENTITY ypsm0010_i_form
```

这里才是你要操作的实体，也就是cds

```abap
DELETE FROM VALUE #( FOR formid IN it_formid ( %key = formid ) ).
```

下面开始堆对这个实体的操作

从第二部开始可以往下一直堆，比如说ypsm0010_i_form里面有子实体ypsm0011_i_form，ypsm0012_i_form就可以写出

```abap
MODIFY ENTITIES OF ypsm0010_i_form IN LOCAL MODE
    ENTITY ypsm0010_i_form
        DELETE FROM VALUE #( FOR formid IN it_formid ( %key = formid ) )
    ENTITY ypsm0011_i_form
        DELETE FROM VALUE #( FOR formid IN it_formid ( %key = formid ) )
    ENTITY ypsm0012_i_form
        DELETE FROM VALUE #( FOR formid IN it_formid ( %key = formid ) ).
```

这种语法也是合法的。
