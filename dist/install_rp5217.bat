:: NOTE: script needs to be run by an admin

@ECHO OFF

NET SESSION >nul 2>&1
    IF %errorLevel% == 0 (
        ECHO Installing application...
    ) ELSE (
        ECHO ERROR: Please Run This Script As Admin. Aborting...
        PAUSE
        EXIT
    )

SET POWERSHELL=powershell.exe -ExecutionPolicy Bypass -NoLogo -NonInteractive -NoProfile

REM download EXE from website
%POWERSHELL% -Command "$client = new-object System.Net.WebClient; $client.Proxy.Credentials = [System.Net.CredentialCache]::DefaultNetworkCredential; $client.DownloadFile('http://localhost:8080/getExe', $Env:UserProfile+'\rp5217.exe')"

REM associate sdg filetype with downloaded exe
ASSOC .sdg=sdgfile > nul 2>&1
FTYPE .sdg=%UserProfile%\rp5217.exe "%%1" /dde > nul 2>&1

REM create desktop shortcut to downloaded EXE
%POWERSHELL% -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut($Env:UserProfile+'\Desktop\RP5217.lnk'); $S.TargetPath = $Env:UserProfile+'\rp5217.exe'; $S.Save()"

COPY %UserProfile%\Desktop\RP5217.lnk  "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\RP5217.lnk" > nul 2>&1

ECHO SUCCESS!
PAUSE