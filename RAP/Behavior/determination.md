# determination

## sample

### 1.一个字段带着其他字段变化

```sql
//behavior
determination setMenuSeq on modify { field SeqOut; }
//setMenuSeq为方法名  SeqOut为字段
side effects {
    field SeqOut affects field MenuSeq;
}
// MenuSeq这里写被改变的字段，如果有多个用逗号连接

//class
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
//一定要%control-MenuSeq = if_abap_behv=>mk-on这段，要不然不会变
```
