# 중복파일 삭제

    dir /b > file.list
    for /f %i in (file.list) do del ..\%i
