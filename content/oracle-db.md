# 자주 쓰는 쿼리

``` sql
SELECT nullable
  FROM all_tab_cols
 WHERE table_name = UPPER('테이블명')
   AND column_name = UPPER('컬럼명')
```

## Related
- [[db-lock]]
- [[db-normalization]]
- [[db-schema-tools]]
- [[db-transation]]
- [[derby]]
- [[jdbc]]
- [[jdbc-url]]
- [[mysql]]
- [[no-sql]]
