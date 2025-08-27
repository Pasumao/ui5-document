# HTTP 请求

用abap发送http请求的示例类

```abap
CLASS zcl_simple_http DEFINITION
  PUBLIC
  CREATE PUBLIC .
  "*******************************************************************************
  PUBLIC SECTION.

    METHODS constructor
      IMPORTING url    TYPE string
                domain TYPE string.

    METHODS  get
      IMPORTING path              TYPE string
                header            TYPE if_web_http_request=>name_value_pairs OPTIONAL
                url_parameters    TYPE if_web_http_request=>name_value_pairs OPTIONAL
      RETURNING VALUE(r_response) TYPE REF TO if_web_http_response.

    METHODS  connect
      IMPORTING path              TYPE string
                header            TYPE if_web_http_request=>name_value_pairs OPTIONAL
                url_parameters    TYPE if_web_http_request=>name_value_pairs OPTIONAL
      RETURNING VALUE(r_response) TYPE REF TO if_web_http_response.

    METHODS  post
      IMPORTING path              TYPE string
                header            TYPE if_web_http_request=>name_value_pairs OPTIONAL
                body              TYPE if_web_http_request=>name_value_pairs OPTIONAL
                url_parameters    TYPE if_web_http_request=>name_value_pairs OPTIONAL
      RETURNING VALUE(r_response) TYPE REF TO if_web_http_response.

    METHODS  put
      IMPORTING path              TYPE string
                header            TYPE if_web_http_request=>name_value_pairs OPTIONAL
                body              TYPE if_web_http_request=>name_value_pairs OPTIONAL
                url_parameters    TYPE if_web_http_request=>name_value_pairs OPTIONAL
      RETURNING VALUE(r_response) TYPE REF TO if_web_http_response.

    METHODS  delete
      IMPORTING path              TYPE string
                header            TYPE if_web_http_request=>name_value_pairs OPTIONAL
                body              TYPE if_web_http_request=>name_value_pairs OPTIONAL
                url_parameters    TYPE if_web_http_request=>name_value_pairs OPTIONAL
      RETURNING VALUE(r_response) TYPE REF TO if_web_http_response.

    METHODS  head
      IMPORTING path              TYPE string
                header            TYPE if_web_http_request=>name_value_pairs OPTIONAL
                url_parameters    TYPE if_web_http_request=>name_value_pairs OPTIONAL
      RETURNING VALUE(r_response) TYPE REF TO if_web_http_response.

    METHODS  options
      IMPORTING path              TYPE string
                header            TYPE if_web_http_request=>name_value_pairs OPTIONAL
                url_parameters    TYPE if_web_http_request=>name_value_pairs OPTIONAL
      RETURNING VALUE(r_response) TYPE REF TO if_web_http_response.

    METHODS  patch
      IMPORTING path              TYPE string
                header            TYPE if_web_http_request=>name_value_pairs OPTIONAL
                body              TYPE if_web_http_request=>name_value_pairs OPTIONAL
                url_parameters    TYPE if_web_http_request=>name_value_pairs OPTIONAL
      RETURNING VALUE(r_response) TYPE REF TO if_web_http_response.

    METHODS  trace
      IMPORTING path              TYPE string
                header            TYPE if_web_http_request=>name_value_pairs OPTIONAL
                url_parameters    TYPE if_web_http_request=>name_value_pairs OPTIONAL
      RETURNING VALUE(r_response) TYPE REF TO if_web_http_response.

    METHODS request
      IMPORTING method            TYPE if_web_http_client=>method
                path              TYPE string
                header            TYPE if_web_http_request=>name_value_pairs OPTIONAL
                body              TYPE if_web_http_request=>name_value_pairs OPTIONAL
                url_parameters    TYPE if_web_http_request=>name_value_pairs OPTIONAL
      RETURNING VALUE(r_response) TYPE REF TO if_web_http_response.

    CLASS-METHODS fetch
      IMPORTING method            TYPE if_web_http_client=>method
                url               TYPE string
                header            TYPE if_web_http_request=>name_value_pairs OPTIONAL
                body              TYPE if_web_http_request=>name_value_pairs OPTIONAL
      RETURNING VALUE(r_response) TYPE REF TO if_web_http_response.
    "*******************************************************************************
  PROTECTED SECTION.

    METHODS get_full_url
      IMPORTING path           TYPE string
                url_parameters TYPE if_web_http_request=>name_value_pairs
      RETURNING VALUE(r_url)   TYPE string.
    "*******************************************************************************
  PRIVATE SECTION.

    DATA:
      server_domain TYPE string,
      server_url    TYPE string.
    "*******************************************************************************
ENDCLASS.



CLASS ZCL_SIMPLE_HTTP IMPLEMENTATION.


  METHOD connect.
    r_response = request(
        header = header
        method = if_web_http_client=>trace
        path = path
        url_parameters = url_parameters
    ).
  ENDMETHOD.


  METHOD constructor.
    me->server_url = url.
    server_domain = domain.
  ENDMETHOD.


  METHOD delete.
    r_response = request(
        body = body
        header = header
        method = if_web_http_client=>delete
        path = path
        url_parameters = url_parameters
    ).
  ENDMETHOD.


  METHOD fetch.
    TRY.
        DATA(destination) = cl_http_destination_provider=>create_by_url( url ).
      CATCH cx_http_dest_provider_error INTO DATA(e).
        RETURN.
    ENDTRY.

    TRY.
        DATA(http_client) = cl_web_http_client_manager=>create_by_http_destination( destination ).
      CATCH cx_web_http_client_error INTO DATA(e2).
        RETURN.
    ENDTRY.

    DATA(request) = http_client->get_http_request( ).

    IF header IS NOT INITIAL.
      request->set_header_fields( header ).
    ENDIF.

    IF body IS NOT INITIAL.
      request->set_form_fields( body ).
    ENDIF.

    TRY.
        r_response = http_client->execute( method ).
      CATCH cx_web_http_client_error INTO DATA(e3).
        RETURN.
    ENDTRY.
  ENDMETHOD.


  METHOD get.
    r_response = request(
        header = header
        method = if_web_http_client=>get
        path = path
        url_parameters = url_parameters
    ).
  ENDMETHOD.


  METHOD get_full_url.
    DATA: lv_base_url     TYPE string,
          lv_param_string TYPE string.

    lv_base_url = |{ server_domain }{ server_url }{ path }|.

    LOOP AT url_parameters INTO DATA(ls_param).
      IF lv_param_string IS INITIAL.
        lv_param_string = |{ ls_param-name }={ ls_param-value }|.
      ELSE.
        lv_param_string = |{ lv_param_string }&{ ls_param-name }={ ls_param-value }|.
      ENDIF.
    ENDLOOP.

    IF lv_param_string IS NOT INITIAL.
      r_url = lv_base_url && '?' && lv_param_string.
    ELSE.
      r_url = lv_base_url.
    ENDIF.
  ENDMETHOD.


  METHOD head.
    r_response = request(
        header = header
        method = if_web_http_client=>head
        path = path
        url_parameters = url_parameters
    ).
  ENDMETHOD.


  METHOD options.
    r_response = request(
        header = header
        method = if_web_http_client=>options
        path = path
        url_parameters = url_parameters
    ).
  ENDMETHOD.


  METHOD patch.
    r_response = request(
        body = body
        header = header
        method = if_web_http_client=>patch
        path = path
        url_parameters = url_parameters
    ).
  ENDMETHOD.


  METHOD post.
    r_response = request(
        body = body
        header = header
        method = if_web_http_client=>post
        path = path
        url_parameters = url_parameters
    ).
  ENDMETHOD.


  METHOD put.
    r_response = request(
        body = body
        header = header
        method = if_web_http_client=>put
        path = path
        url_parameters = url_parameters
    ).
  ENDMETHOD.


  METHOD request.
    DATA(lc_url) = me->get_full_url( path = path url_parameters = url_parameters ).

    r_response = fetch(
        url = lc_url
        method = method
        header = header
        body = body
    ).
  ENDMETHOD.


  METHOD trace.
    r_response = request(
        header = header
        method = if_web_http_client=>trace
        path = path
        url_parameters = url_parameters
    ).
  ENDMETHOD.
ENDCLASS.
```

下面是再封装了一层带token的版本，用来请求odata服务

```abap
CLASS zcl_is_http DEFINITION
  PUBLIC
  INHERITING FROM zcl_simple_http
  FINAL
  CREATE PUBLIC .

  "*******************************************************************************
  PUBLIC SECTION.
    METHODS constructor
      IMPORTING url TYPE string.

    METHODS get_token
      RETURNING VALUE(r_token) TYPE string.

    METHODS request REDEFINITION.
    METHODS get REDEFINITION.
    METHODS post REDEFINITION.
    METHODS put REDEFINITION.
    METHODS delete REDEFINITION.
    METHODS connect REDEFINITION.
    METHODS options REDEFINITION.
    METHODS patch REDEFINITION.
    METHODS trace REDEFINITION.
    METHODS head REDEFINITION.

    "*******************************************************************************
  PROTECTED SECTION.

    "*******************************************************************************
  PRIVATE SECTION.
    DATA token TYPE string.
ENDCLASS.



CLASS ZCL_IS_HTTP IMPLEMENTATION.


  METHOD connect.
    r_response = request(
        header = header
        method = if_web_http_client=>trace
        path = path
        url_parameters = url_parameters
    ).
  ENDMETHOD.


  METHOD constructor.
    DATA lv_domain TYPE string.
    DATA:lt_config TYPE TABLE OF ybcpit_config.

    SELECT * FROM ybcpit_config WHERE ctype = '02' INTO TABLE @lt_config.

    lv_domain = lt_config[ category = 'URL' ]-value.

    super->constructor( url = url domain = lv_domain ).

    me->token = get_token(  ).
  ENDMETHOD.


  METHOD delete.
    r_response = request(
        body = body
        header = header
        method = if_web_http_client=>delete
        path = path
        url_parameters = url_parameters
    ).
  ENDMETHOD.


  METHOD get.
    r_response = request(
        header = header
        method = if_web_http_client=>get
        path = path
        url_parameters = url_parameters
    ).
  ENDMETHOD.


  METHOD get_token.
    DATA:lt_token TYPE TABLE OF ybcpit_config.

    SELECT * FROM ybcpit_config WHERE ctype = '01' INTO TABLE @lt_token .

    DATA(lv_url_token) = lt_token[ category = 'URL' ]-value.
    DATA(lv_id_token) = lt_token[ category = 'ID' ]-value.
    DATA(lv_pw_token) = lt_token[ category = 'PW' ]-value.

    DATA(response) = fetch(
        method = if_web_http_client=>post
        url = |{ lv_url_token }|
        header = VALUE #(
            ( name = 'Content-Type' value = 'application/x-www-form-urlencoded' )
        )
        body = VALUE #(
           ( name = 'client_id' value = lv_id_token )
           ( name = 'client_secret' value = lv_pw_token )
           ( name = 'grant_type' value = 'client_credentials' )
        )
    ).

    DATA: BEGIN OF ls_token,
            access_token TYPE string,
          END OF ls_token.

    /ui2/cl_json=>deserialize( EXPORTING json = response->get_text( ) CHANGING data = ls_token ).

    r_token = ls_token-access_token.
  ENDMETHOD.


  METHOD head.
    r_response = request(
        header = header
        method = if_web_http_client=>head
        path = path
        url_parameters = url_parameters
    ).
  ENDMETHOD.


  METHOD options.
    r_response = request(
        header = header
        method = if_web_http_client=>options
        path = path
        url_parameters = url_parameters
    ).
  ENDMETHOD.


  METHOD patch.
    r_response = request(
        body = body
        header = header
        method = if_web_http_client=>patch
        path = path
        url_parameters = url_parameters
    ).
  ENDMETHOD.


  METHOD post.
    r_response = request(
        body = body
        header = header
        method = if_web_http_client=>post
        path = path
        url_parameters = url_parameters
    ).
  ENDMETHOD.


  METHOD put.
    r_response = request(
        body = body
        header = header
        method = if_web_http_client=>put
        path = path
        url_parameters = url_parameters
    ).
  ENDMETHOD.


  METHOD request.
    DATA(lc_url) = me->get_full_url( path = path url_parameters = url_parameters ).

    IF token IS NOT INITIAL.
      DATA: header_1 TYPE if_web_http_request=>name_value_pairs.
      header_1 = header.
      APPEND VALUE #( name  = 'Authorization' value = |Bearer { me->token }| ) TO header_1.
    ENDIF.

    r_response = fetch(
        url = lc_url
        method = method
        header = header_1
        body = body
    ).
  ENDMETHOD.


  METHOD trace.
    r_response = request(
        header = header
        method = if_web_http_client=>trace
        path = path
        url_parameters = url_parameters
    ).
  ENDMETHOD.
ENDCLASS.
```

使用示例

```abap
DATA(lv_url) = `/api/v1`.
DATA(lo_is) = NEW zcl_is_http( url = lv_url ).
DATA(lv_path) = '/MessageProcessingLogs'.

DATA(response) = lo_is->get(
    path = |{ lv_path }|
    url_parameters = VALUE #(
        ( name = '$format' value = 'json' )
    )
).

response->get_text(  ).
```
