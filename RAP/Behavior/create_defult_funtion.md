# default function

```sql
create
{
    default function GetDefaultsForMenu;
}
```

他会在创建弹窗出现前调用,方法名一定要以GetDefaultsFor开头

class

```abap
  METHOD getdefaultsformenu.
    result = VALUE #( FOR key IN keys (
        %tky = key-%tky
        %param = VALUE #( formid = key-formid )
     ) ).
  ENDMETHOD.
```
