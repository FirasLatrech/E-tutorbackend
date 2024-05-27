pg_dump -h localhost -U postgres -p 5433 -Fc -d e-tutor > ./src/backup/dataBase.backup
#@echo off
#set PGHOST=localhost
#set PGUSER=your_username
#set PGPASSWORD=your_password
#set PGPORT=5432
#set PGDATABASE=your_database_name
#
#set BACKUP_DIR=src\backup
#set BACKUP_FILE=%BACKUP_DIR%\database.backup
#
#if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"
#
#"C:\Program Files\PostgreSQL\13\bin\pg_dump.exe" -h %PGHOST% -U %PGUSER% -p %PGPORT% -Fc -d %PGDATABASE% > %BACKUP_FILE%
Nآ