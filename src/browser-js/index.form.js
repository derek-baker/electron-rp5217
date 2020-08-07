window.addEventListener('load', function() {
    'use strict';

    // Uncheck 4A-C if Parent checkbox is unchecked
    const fourPartOfParcelCheckbox = document.getElementById('fourPartOfParcelCheckbox');
    fourPartOfParcelCheckbox.addEventListener('click', () => {
        if (viewModel.fourPartOfParcelCheckbox === true) {
            viewModel.fourSubDivAuthExists = false;
            viewModel.fourSubDivApprovalRequired = false;
            viewModel.fourParcelApprovedWithMap = false;
            viewModel.fourPartOfParcelCheckbox = false;
        }
    });

    const partialConditionCheckboxCollection = 
        document.getElementsByClassName('partialConditionCheckboxes');

    for (let i = 0; i < partialConditionCheckboxCollection.length; i++) {
        partialConditionCheckboxCollection[i].addEventListener('click', () => {
            if (viewModel.fourPartOfParcelCheckbox === false) {
                // Wait without blocking to avoid race condition
                setTimeout(() => {
                    viewModel.fourSubDivAuthExists = false;
                    viewModel.fourSubDivApprovalRequired = false;
                    viewModel.fourParcelApprovedWithMap = false;
                }, 400);
                alert('Please check "Part of parcel" checkbox before checking this box.');
            }
        });
    };

    // Mutex Validation for 15A-I and 15J
    const noneConditionCheckbox = document.getElementById('saleInfoCheckJ');
    noneConditionCheckbox.addEventListener('click', function() {
        viewModel.uncheckSaleConditionsCheckboxes();
        viewModel.saleInfoCheckJ = true;
    });
    const conditionCheckboxCollection = document.getElementsByClassName('saleCondition');
    for (let i = 0; i < conditionCheckboxCollection.length; i++) {
        conditionCheckboxCollection[i].addEventListener('click', function() {
            viewModel.saleInfoCheckJ = false;
            viewModel[conditionCheckboxCollection[i].id] = true;
        });
    }

    // Event fires before file-download dialog opens(to hide spinner)
    // Spinner is triggered by Vue instance's validateBeforeSubmit method
    window.addEventListener('beforeunload', function() {
        setTimeout(() => {
            document.getElementById('spinner').className = '';
            // alert('Please be patient. A file dialog will open shortly.')                                
        }, 1000);
    });

    // init Bootstrap tooltip(s) (has to be done manually)
    $(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });


    const _postButtonActionOverride = function() {
        /** Users can't have date input placeholders flattened onto their PDF */
        const hideDateInputPlaceholders = () => {
            const contractNode = document.getElementById('saleContractDate');
            if (contractNode && contractNode.value.length === 0) {
                contractNode.setAttribute('style', 'font-size: 0;');
            }
            const transferNode = document.getElementById('saleTransferDate');
            if (transferNode && transferNode.value.length === 0) {
                transferNode.setAttribute('style', 'font-size: 0;');
            }
        };
        const showDateInputPlaceholders = (
            contractNode = document.getElementById('saleContractDate'),
            transferNode = document.getElementById('saleTransferDate')
        ) => {
            if (contractNode && contractNode.value.length === 0) {
                contractNode.setAttribute('style', '');
            }
            if (transferNode && transferNode.value.length === 0) {
                transferNode.setAttribute('style', 'font-size: ');
            }
        };

        if (
            document.getElementById('form').reportValidity()
            &&
            viewModel.validateBeforeSubmit()
        ) {
            alert(
                'Before printing, please set paper size in printer settings to Legal(8.5" x 14").\n\n' +
                'In the \'Print\' dialog that opens when printing a document: \n' +
                'Highlight a printer > Preferences > Advanced > Select \'Legal\' in the \'Paper Size\' dropdown'
            );
            hideDateInputPlaceholders();
            window.print();
            showDateInputPlaceholders();
        }
    };
    const addTriggerPrintListener = function() {        
        // Specify behavior for 'Create PDF' buttons
        const downloadButton = document.getElementById('postButton');
        downloadButton.addEventListener('click', function(event) {
            _postButtonActionOverride();            
        });
        const downloadButtonBottom = document.getElementById('postButtonBottom');
        downloadButtonBottom.addEventListener('click', function(event) {
            _postButtonActionOverride();            
        });
    };
    addTriggerPrintListener();
});

