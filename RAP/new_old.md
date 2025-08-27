# 总览

| Area              | Old                   | New                                           | Hint      | Example                          |
|-------------------|-----------------------|-----------------------------------------------|-----------|----------------------------------|
| User ID           | SY-UNAME              | `cl_abap_context_info=>get_user_alias( )`     | Both      | [内部教程](#cl_abap_context_info)    |
| Actual date       | SY-DATUM              | `cl_abap_context_info=>get_system_date( )`    | Deprecated| [内部教程](#cl_abap_context_info)    |
| Actual time       | SY-UZEIT              | `cl_abap_context_info=>get_system_time( )`    | Deprecated| [内部教程](#cl_abap_context_info)    |
| Application Log   | SLG0, SLG1            | ADT, ABAP API, ReUse Components               | Deprecated|                                  |
| Jobs              | SM36, SM37, Program   | Application Job (Catalog & Template)          | Deprecated| [内部教程](/RAP/Application_job.md)/[外部教程](https://software-heroes.com/en/blog/abap-cloud-jobs-en) |
| E Mail            | CL_BCS                | CL_BCS_MAIL_MESSAGE                           | Deprecated| [内部教程](/RAP/email.md)/[外部教程](https://software-heroes.com/en/blog/abap-cloud-mails-en) |
| Programming model | BOPF                  | RAP                                           | Deprecated|                                  |
| Table maintenance | SM30                  | Business Configuration                        | Deprecated| [外部教程](https://software-heroes.com/en/blog/btp-business-configuration-creation) |
| Package structure | Classic               | Software Components                           | Enhanced  | [外部教程](https://software-heroes.com/en/blog/abap-cloud-3-tier-model) |
| JSON Conversion   | /UI2/CL_JSON          | XCO_CP_JSON                                   | Both      | [外部教程](https://software-heroes.com/en/blog/abap-cloud-json-conversion) |
| Parallel processing| ... NEW TASK         | `CL_ABAP_PARALLEL`                            | Enhanced  | [外部教程](https://software-heroes.com/en/blog/abap-cloud-parallel-processing) |
| Async processing  | ... BACKGROUND UNIT   | bgPF                                          | Enhanced  | [外部教程](https://software-heroes.com/en/blog/abap-cloud-background-processing) |
| SAP Query         | SQ01, SQ02            |                                               | Deprecated|                                  |
| HTTP Client       | CL_HTTP_CLIENT        | `CL_WEB_HTTP_CLIENT_MANAGER`                  | Deprecated| [外部教程](https://software-heroes.com/en/blog/abap-cloud-http-client-en) |
| HTTP Utility      | CL_HTTP_UTILITY       | `CL_WEB_HTTP_UTILITY`                         | Deprecated| [外部教程](https://software-heroes.com/en/blog/abap-cloud-http-client-en) |
| Translation       | SE63                  | Maintain translations                         | Deprecated| [外部教程](https://software-heroes.com/en/blog/abap-cloud-translation) |
| Read SAP data     | Tables                | Core Data Services                            | Deprecated| [外部教程](https://software-heroes.com/en/blog/abap-cloud-translation) |
| Number ranges     | SNRO                  | `CL_NUMBERRANGE_OBJECTS`                      | Deprecated| [外部教程](https://software-heroes.com/en/blog/abap-cloud-number-ranges) |
| Locks             | ENQUEUE, DEQUEUE      | `CL_ABAP_LOCK_OBJECT_FACTORY`                 | Both      | [外部教程](https://software-heroes.com/en/blog/abap-cloud-number-ranges) |
| XML Conversion    | Transformation        | `CL_SXML_STRING_READER`<br>`CL_SXML_STRING_WRITER` | Both      | [外部教程](https://software-heroes.com/en/blog/abap-cloud-read-xml)<br>[外部教程](https://software-heroes.com/en/blog/abap-cloud-create-xml) |
| Change documents  | CDHDR, CDPOS          |                                               | Deprecated|                                  |
| Documentation     | Longtexts             | ABAP Doc, KTD                                 | Deprecated| [外部教程](https://software-heroes.com/blog/abap-cloud-dokumentation) |

## CL_ABAP_CONTEXT_INFO

| New Method                                      | Old environment             |
|-------------------------------------------------|-----------------------------|
| `GET_SYSTEM_DATE`                               | SYST-DATUM                  |
| `GET_SYSTEM_TIME`                               | SYST-UZEIT                  |
| `GET_USER_TECHNICAL_NAME`                       | SYST-UNAME                  |
| `GET_USER_LANGUAGE_ABAP_FORMAT`                 | SYST-LANGU                  |
| `GET_USER_LANGUAGE_ISO_FORMAT`                  | ISO format for language     |
| `GET_USER_TIME_ZONE`                            | SYST-TZONE                  |
| `GET_USER_ALIAS`                                | Alias of user master data (Cloud) |
| `GET_SYSTEM_URL`                                | URL of the system (Cloud)   |
| `GET_USER_FORMATTED_NAME`                       | `BAPI_USER_GET_DETAIL`      |
| `GET_USER_DESCRIPTION`                          | `BAPI_USER_GET_DETAIL`      |
| `GET_USER_BUSINESS_PARTNER_ID`                  | Business-Partner-ID of the user (Cloud) |

用法是CL_ABAP_CONTEXT_INFO=>GET_SYSTEM_DATE( ) 他就等于以前的SY-DATUM
旧SY也是可以用的，但是不建议
