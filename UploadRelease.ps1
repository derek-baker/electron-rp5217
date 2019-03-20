Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop";

# Redirecting output allows $ErrorActionPreference to act (Couldn't get it to work with gsutil but that's fine...)
[string] $UnitTestsCmd = "npm run test 2>'' "
[string] $PublishTasksCmd = "npm run publish-pre-reqs 2>'' "

# INSTALL GCP SDG: https://cloud.google.com/sdk/docs/#windows
# https://cloud.google.com/storage/docs/quickstart-gsutil
[string] $GcpExeReleaseCmd = "gsutil cp '.\electron_dist\RP5217_Setup.exe' gs://sdg_installers_release"

[string[]] $Tasks = @( `
    $UnitTestsCmd, `
    $PublishTasksCmd, `
    $GcpExeReleaseCmd
);

[string] $ErrOut = ""
[string] $StdOut = ""
foreach($task in $Tasks) {
    Write-Host -ForegroundColor Green "`nRUNNING COMMAND: $task"
    # Deliberately dropped '$' from vars below for this reason: https://stackoverflow.com/questions/21583850/powershell-manage-errors-with-invoke-expression
    Invoke-Expression $task -ErrorVariable ErrOut -OutVariable StdOut
}
