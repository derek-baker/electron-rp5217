<!-- electron desktop app (Electron v 3.0.6) -->

<!-- Note that in the NPM scripts in the package.json, env vars are being set with Windows CMD syntax -->

<!-- uses electron builder -->
<!-- https://www.electron.build/configuration/configuration -->


<!-- Auto update is set up -->
<!-- https://www.electron.build/auto-update -->

<!-- You'll need to set an env var that uses a token before you can publish the app
    (the token is not in the local repo, but it can be regenerated from GitHub if necessary) -->

<!-- App uses API endpoint to produce PDFs -->

<!-- App uses API endpoint for contacting SDG -->

<!-- This doesn't appear to work -->
<!-- https://electronjs.org/docs/tutorial/notifications#windows -->

<!-- WHEN YOU MAKE CHANGES, RUN THE TESTS!!! (npm run test) -->

<!-- 
    TO PUBLISH RELEASE:
        make changes
        make sure you run the tests
        if the tests pass, increment version number appropriately in package.json, git commit and git push(so that the changes are associated with the release)
        publish the release: npm run publish
-->

THE APP LOGS AT: %appdata%\rp5217\log.log