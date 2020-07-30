### After running npm install
    run npm postinstall


### INSTALL AND CONFIGURE GCP SDK: https://cloud.google.com/sdk/docs/#windows
    https://cloud.google.com/storage/docs/quickstart-gsutil 
    gcloud init 
    OR 
    gcloud auth login 
    gcloud config set project single-odyssey-201216


### TO PUBLISH RELEASE:
    Satisfy this:
        https://www.electron.build/configuration/publish#recommended-github-releases-workflow
        https://www.electron.build/configuration/publish#githuboptions
    Run a command similar to the one below to enable Github publishing:
        [Environment]::SetEnvironmentVariable("GH_TOKEN","<THE_TOKEN>","User")
    make sure you have the file: DoNotCommit.ps1 (it's not in source control)
    make changes
    make sure you run the tests
    if the tests pass, increment version number appropriately in package.json
    git commit && git push (so that the changes are associated with the release)
    publish the release: npm run publish
        If the code-signing fails, check that the cert isn't expired and the password is correct. 


### THE npm publish SCRIPT 
    MAY APPEAR NON-INUITIVE, BUT TRUST IT (it wouldn't hurt to read through it).


### THE APP LOGS AT: 
    %appdata%\sdg-rp5217\log.log (but you may need to verify that if you change the app name)


### This project uses electron builder 
    https://www.electron.build/configuration/configuration 


### Auto update is set up 
    https://www.electron.build/auto-update 

    You'll need to set an env var that uses a token before you can publish the app
    (the token is not in the local repo, but it can be regenerated from GitHub if necessary)
