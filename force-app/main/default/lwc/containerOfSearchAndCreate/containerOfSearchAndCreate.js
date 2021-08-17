import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class LdsCreateRecord extends LightningElement {

    navigateToTab() {
        alert('Inside nav');
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                //Name of any CustomTab. Visualforce tabs, web tabs, Lightning Pages, and Lightning Component tabs
                apiName: New_Patient_Creation
            },
        });
    }
}
    