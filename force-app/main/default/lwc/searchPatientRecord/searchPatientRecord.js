import { LightningElement, track } from 'lwc';

import serachPats from '@salesforce/apex/LWCExampleController.retrivePats';

// datatable columns
const columns = [
    {
        label: 'Name',
        fieldName: 'PatName',
        type: 'url',
        typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}
    }, {
        label: 'Medical Record',
        fieldName: 'Medical_Record__c',
    }, {
        label: 'Email',
        fieldName: 'Email__c',
        type: 'email',
    }, {
        label: 'Contact Phone',
        fieldName: 'Contact_Phone__c',
        type: 'phone'
    },
];
export default class CustomSearchInLWC extends LightningElement {
    @track searchData;
    @track columns = columns;
    @track errorMsg = '';
    strSearchPatName = '';
    

    handleMedicalRecord(event) {
        this.strSearchPatName = event.detail.value;
    }

    handleSearch() {
        if(!this.strSearchPatName) {
            this.errorMsg = 'Please enter patient medical record to search.';
            this.searchData = undefined;
            return;
        }

        serachPats({strMRecord : this.strSearchPatName})
        .then(result => {
            result.forEach((record) => {
                record.PatName = '/' + record.Id;
                this.errorMsg = 'Record Found';
            });

            this.searchData = result;
            
        })
        .catch(error => {
            this.searchData = undefined;
            window.console.log('error =====> '+JSON.stringify(error));
            if(error) {
                this.errorMsg = error.body.message;
            }
        }) 
    }

}