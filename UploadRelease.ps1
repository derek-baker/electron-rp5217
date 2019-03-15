Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop";

# INSTALL GCP SDG: https://cloud.google.com/sdk/docs/#windows
# https://cloud.google.com/storage/docs/quickstart-gsutil

gsutil cp ".\electron_dist\RP5217_Setup.exe" gs://sdg_installers_release