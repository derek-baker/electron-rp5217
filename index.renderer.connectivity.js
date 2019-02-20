const dns = require('dns');

const createAlert = function() {
    alert(
        'It appears you do not have internet connectivity. ' + 
        'You\'ll be unable to generate PDFs if you aren\'t connected to the internet.'
    );
}

const checkConnectivity = function() {    
    dns.lookupService('8.8.8.8', 53, function (err, hostname, service) {                
        if (hostname) {            
            dns.lookup('systemsdevelopmentgroup.com', function (err, address, family) {        
                if (address) {                     
                    return; // Return without creating any alerts
                }      
                createAlert();
            });
        }
        else {
            createAlert();
        }               
    });    
};

module.exports = { checkConnectivity };

