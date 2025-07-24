# Email

## 1.增加收信人域

```abap
DATA recipient_domains TYPE cl_bcs_mail_system_config=>tyt_recipient_domains.
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
```

相当于加白名单，要不然发不出去

## 2. 发邮件

```abap
TRY.
    DATA(lo_mail) = cl_bcs_mail_message=>create_instance( ).
    "可以不填sender
    lo_mail->set_sender( 'do.not.reply@my407000.mail.s4hana.cloud.sap' ).
    lo_mail->add_recipient( 'psm0509@aspnc.com' ).
    "抄送
    lo_mail->add_recipient( iv_address = 'chenxu@aspnc.com' iv_copy = cl_bcs_mail_message=>cc ).
    lo_mail->set_subject( 'Test Mail' ).

    lo_mail->set_main( cl_bcs_mail_textpart=>create_instance(
        iv_content      = '<h1>Hello</h1><p>Hello world send from RAP!</p>'
        iv_content_type = 'text/html' ) ).

    lo_mail->send( IMPORTING et_status = DATA(lt_status) ).

    out->write( lt_status ).
  CATCH cx_bcs_mail INTO DATA(lo_err).
    out->write( lo_err->get_longtext( ) ).
ENDTRY.
```

## 3.删除域

```abap
TRY.
    config_instance->delete_allowed_rec_domains( allowed_recipient_domains ).
    config_instance->delete_allowed_sender_domains( allowed_sender_domains ).
    config_instance->delete_default_sender_addr( default_sender_address ).
  CATCH cx_bcs_mail_config INTO DATA(deletion_error).
   "handle exception
ENDTRY.
```

## 4.查看域

```abap
DATA(allowed_recipient_domains) = config_instance->read_allowed_recipient_domains( ).
DATA(allowed_sender_domains) = config_instance->read_allowed_sender_domains( ).
config_instance->read_default_sender_address(
    IMPORTING
        ev_default_sender_address = DATA(default_sender_address)
        ev_default_sender_name = DATA(default_sender_name) 
).
```
