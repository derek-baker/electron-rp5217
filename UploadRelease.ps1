Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop";

$originalLocation = Get-Location
Set-Location $PSScriptRoot

# Redirecting output allows $ErrorActionPreference to stop execution
# TODO: get it to work with gsutil but that's fine...
[string] $UnitTestsCmd = "npm run test 2>'' "
# NOTE: this task requires some environmental vars to be set for app-signing purposes.
# See the readme for more info.

[string] $BuildCmd = "npm run publish-pre-reqs 2>'' "

# INSTALL gcloud and gsutil: https://cloud.google.com/sdk/docs/#windows
# https://cloud.google.com/storage/docs/quickstart-gsutil
# NOTE: the destination arg below is a GCP bucket name so keep track of that
# NOTE: Other apps (IMO) download the installer from Cloud Storage.
[string] $GcpExeReleaseCmd = "gsutil cp '.\electron_dist\RP5217_Setup.exe' gs://sdg_installers_release"

[string[]] $Tasks = @( `
    # $UnitTestsCmd, `
    $BuildCmd, `
    $GcpExeReleaseCmd
);

[string] $ErrOut = ""
[string] $StdOut = ""

try {
    foreach($task in $Tasks) {
        Write-Host -ForegroundColor Green "`nRUNNING COMMAND: $task"
        # Deliberately dropped '$' from vars below: https://stackoverflow.com/questions/21583850/powershell-manage-errors-with-invoke-expression
        Invoke-Expression $task -ErrorVariable ErrOut -OutVariable StdOut
    }
}
catch {
    $_
}
finally {
    Set-Location $originalLocation
}


