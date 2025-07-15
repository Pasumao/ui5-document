# Application job

## 0.[官方文档](https://help.sap.com/docs/SAP_S4HANA_CLOUD/6aa39f1ac05441e5a23f484f31e477e7/0abb3f205d4645ac82ef03bbf47b3427.html?mt=zh-CN)

## 1. Class

需要实现接口 if_apj_dt_exec_object 和 if_apj_rt_exec_object.

```abap
CLASS zcl_apj_email_allow DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_apj_dt_exec_object .
    INTERFACES if_apj_rt_exec_object .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.

CLASS zcl_apj_email_allow IMPLEMENTATION.
  METHOD if_apj_dt_exec_object~get_parameters.
  ENDMETHOD

  METHOD if_apj_rt_exec_object~execute.
    SELECT * FROM ybemail_dt_email
        WHERE is_allow = ''
        INTO TABLE @DATA(lt_email).

    DATA(config_instance) = cl_bcs_mail_system_config=>create_instance( ).
    LOOP AT lt_email into data(ls_email).
        DATA recipient_domains TYPE cl_bcs_mail_system_config=>tyt_recipient_domains.
        DATA sender_domains TYPE cl_bcs_mail_system_config=>tyt_sender_domains.
        recipient_domains = VALUE #(
            ( CONV cl_bcs_mail_system_config=>ty_recipient_domain( ls_email-email ) )
        ).
        TRY.
            config_instance->set_address_check_active( abap_true ).
            config_instance->add_allowed_recipient_domains( recipient_domains ).
            ls_email-is_allow = 'X'.
          CATCH cx_root INTO DATA(write_error).
            "handle exception
        ENDTRY.
        MODIFY lt_email FROM ls_email.
    ENDLOOP.
    MODIFY ENTITIES OF YBEMAIL_DD_EMAIL
        ENTITY YBEMAIL_DD_EMAIL
        UPDATE FIELDS ( is_allow )
        WITH VALUE #( FOR LINE IN lt_email ( %key = LINE-email is_Allow = LINE-is_allow ) ).
    COMMIT ENTITIES.
  ENDMETHOD.
ENDCLASS.
```

## 2.创建作业目录条目(Application Job Catalog Entries)

选择刚才创建的类即可

## 3.创建作业模板(Application Job Templates)

选择刚才创建的作业条目

## 4.创建作业

1. 到fiori lunchpad中搜索Application Jobs 然后创建

2. 选择作业模板

3. 选择时间，执行次数，间隔时间等

4. 输入参数

5. 创建

## 5. 测试

如果想单独调试class中的代码，直接如下运行即可

```abap
CLASS zcl_yb_test DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .
  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
ENDCLASS.



CLASS zcl_yb_test IMPLEMENTATION.
  METHOD if_oo_adt_classrun~main.
    out->write( |Start| ).

    data(lo) = new zcl_apj_email_allow(  ).
    lo->if_apj_rt_exec_object~execute( it_parameters = VALUE #(  )  ).
ENDCLASS.
```
