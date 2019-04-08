Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop";

# Redirecting output allows $ErrorActionPreference to act (Couldn't get it to work with gsutil but that's fine...)
[string] $UnitTestsCmd = "npm run test 2>'' "
# NOTE: this task requires some environmental vars to be set for app-signing purposes. Ask the dev-owner if necessary.
[string] $PublishTasksCmd = "npm run publish-pre-reqs 2>'' "

# INSTALL GCP SDG: https://cloud.google.com/sdk/docs/#windows
# https://cloud.google.com/storage/docs/quickstart-gsutil
# NOTE: the destination arg below is a GCP bucket name so keep track of that
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
    # Deliberately dropped '$' from vars below: https://stackoverflow.com/questions/21583850/powershell-manage-errors-with-invoke-expression
    Invoke-Expression $task -ErrorVariable ErrOut -OutVariable StdOut
}
