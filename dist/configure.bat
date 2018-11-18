:: NOTE: script needs to be run by an admin


REM // "start": "$env:NODE_ENV=\"dev\"; electron . \"data.sdg\"",

$client = new-object System.Net.WebClient
$client.DownloadFile("http://www.xyz.net/file.txt","C:\tmp\file.txt")
$client.Proxy.Credentials = [System.Net.CredentialCache]::DefaultNetworkCredential

REM TODO: copy exe to user profile dir from zip 
copy %%userprofile%%


Assoc .sdg=sdgfile
Ftype .sdg="C:\Users\dbaker.SDGLOCAL\Documents\Visual Studio 2017\Projects\electron\electron\dist\rp5217 1.0.0.exe" "%%1" /dde

set TARGET='C:\Users\dbaker.SDGLOCAL\Documents\Visual Studio 2017\Projects\electron\electron\dist\rp5217 1.0.0.exe'
set SHORTCUT="%userprofile%\Desktop\test.lnk"
set PWS=powershell.exe -ExecutionPolicy Bypass -NoLogo -NonInteractive -NoProfile

REM %PWS% -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut(%SHORTCUT%); $S.TargetPath = %TARGET%; $S.Save()"
%PWS% -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut($Env:UserProfile+'\Desktop\test.lnk'); $S.TargetPath = %TARGET%; $S.Save()"
pause