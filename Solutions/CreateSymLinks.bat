@echo off

:: BatchGotAdmin
:-------------------------------------
REM  --> Check for permissions
    IF "%PROCESSOR_ARCHITECTURE%" EQU "amd64" (
>nul 2>&1 "%SYSTEMROOT%\SysWOW64\cacls.exe" "%SYSTEMROOT%\SysWOW64\config\system"
) ELSE (
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
)

REM --> If error flag set, we do not have admin.
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    set params= %*
    echo UAC.ShellExecute "cmd.exe", "/c ""%~s0"" %params:"=""%", "", "runas", 1 >> "%temp%\getadmin.vbs"

    "%temp%\getadmin.vbs"
    del "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    pushd "%CD%"
    CD /D "%~dp0"
:--------------------------------------    


cd F:\git\awdware\Solutions\Awdware.Presentation\AwdwarePresentationFull\src\app
F:

rmdir awdware-shared
rmdir awdware-core
rmdir awdware-led
rmdir awdware-games

del awdware-shared
del awdware-core
del awdware-led
del awdware-games

mklink awdware-shared F:\git\awdware\Src\Awdware.Shared\Awdware.Shared.Presentation\projects\awdware-shared /D
mklink awdware-core F:\git\awdware\Src\Awdware.Core\Awdware.Core.Presentation\projects\awdware-core /D
mklink awdware-led F:\git\awdware\Src\Awdware.Led\Awdware.Led\Awdware.Led.Presentation\projects\awdware-led /D
mklink awdware-games F:\git\awdware\Src\Awdware.Games\Awdware.Games.Presentation\projects\awdware-games /D

mkdir F:\git\awdware\Solutions\Awdware.Presentation\AwdwarePresentationFull\src\node_modules
cd F:\git\awdware\Solutions\Awdware.Presentation\AwdwarePresentationFull\src\node_modules
rmdir awdware-shared
del awdware-shared
mklink awdware-shared F:\git\awdware\Src\Awdware.Shared\Awdware.Shared.Presentation\projects\awdware-shared /D

cd F:\git\awdware\Solutions\Awdware.Presentation\AwdwarePresentationFull\node_modules
rmdir awdware-shared
del awdware-shared
mklink awdware-shared F:\git\awdware\Src\Awdware.Shared\Awdware.Shared.Presentation\projects\awdware-shared /D

cd F:\git\awdware\Solutions\Awdware.Presentation\AwdwarePresentationFull\src
rmdir environments
del environments
mklink environments F:\git\awdware\Src\Awdware.Host\Awdware.Host.Presentation\src\environments /D

cd F:\git\awdware\Solutions\Awdware.Presentation\AwdwarePresentationFull\src
rmdir assets
del assets
mklink assets F:\git\awdware\Src\Awdware.Host\Awdware.Host.Presentation\src\assets /D

pause