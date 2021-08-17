import { LightningElement, track, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import PATIENT_OBJECT from '@salesforce/schema/Patient_Information__c';
import PATIENT_GENDER from '@salesforce/schema/Patient_Information__c.Gender__c';
import PATIENT_MARITALSTATUS from '@salesforce/schema/Patient_Information__c.Marital_Status__c';
import PATIENT_SPECIALITY from '@salesforce/schema/Patient_Information__c.Specialty__c';
import PATIENT_PREFERRED_THERAPY_DAY from '@salesforce/schema/Patient_Information__c.Preferred_day_of_the_week_therapy__c';
import PATIENT_PREFERRED_THERAPY_TIME from '@salesforce/schema/Patient_Information__c.Preferred_time_of_day_therapy__c';
import PATIENT_SUPPORTIVE_CARE from '@salesforce/schema/Patient_Information__c.Supportive_Care__c';
import PATIENT_SERVICE from '@salesforce/schema/Patient_Information__c.Service__c';
import PATIENT_PREFERRED_NURSING_DAY from '@salesforce/schema/Patient_Information__c.Preferred_day_of_the_week_nursing__c';
import PATIENT_PREFERRED_NURSING_TIME from '@salesforce/schema/Patient_Information__c.Preferred_time_of_day_nursing__c';
import { createRecord } from 'lightning/uiRecordApi';


export default class InsertPatientLwc extends LightningElement {

delayInMilliseconds = 1000;

value = '';
valueMaritalStatus = '';
FirstName;
message='';
dobChange = '';
medicalRecord = '';
phoneChange = '';
emailChange = '';
specialityChange = '';
preferredTherapyDayChange = '';
preferredTherapyTimeChange = '';
therapyMessage = '';
supportiveCare = '';
nursingService = '';
preferredNursingDayChange = '';
preferredNursingTimeChange = '';
nursingMessage = '';
threpyMessage = '';
@track errorMsg

@wire(getObjectInfo, { objectApiName: PATIENT_OBJECT })
patientMetadata;

@wire(getPicklistValues,
      {
          recordTypeId: '$patientMetadata.data.defaultRecordTypeId', 
          fieldApiName: PATIENT_GENDER
      })
genderPicklist;

@wire(getPicklistValues,
      {
          recordTypeId: '$patientMetadata.data.defaultRecordTypeId', 
          fieldApiName: PATIENT_MARITALSTATUS
      })
maritalPicklist;

@wire(getPicklistValues,
      {
          recordTypeId: '$patientMetadata.data.defaultRecordTypeId', 
          fieldApiName: PATIENT_SPECIALITY
      })
specialityPicklist;

@wire(getPicklistValues,
      {
          recordTypeId: '$patientMetadata.data.defaultRecordTypeId', 
          fieldApiName: PATIENT_PREFERRED_THERAPY_DAY
      })
preferredTherapyDayPicklist;

@wire(getPicklistValues,
      {
          recordTypeId: '$patientMetadata.data.defaultRecordTypeId', 
          fieldApiName: PATIENT_PREFERRED_THERAPY_TIME
      })
preferredTherapyTimePicklist;

@wire(getPicklistValues,
      {
          recordTypeId: '$patientMetadata.data.defaultRecordTypeId', 
          fieldApiName: PATIENT_SUPPORTIVE_CARE
      })
supportiveCarePicklist;

@wire(getPicklistValues,
      {
          recordTypeId: '$patientMetadata.data.defaultRecordTypeId', 
          fieldApiName: PATIENT_SERVICE
      })
servicePicklist;  

@wire(getPicklistValues,
      {
          recordTypeId: '$patientMetadata.data.defaultRecordTypeId', 
          fieldApiName: PATIENT_PREFERRED_NURSING_DAY
      })
preferredNursingDayPicklist;

@wire(getPicklistValues,
      {
          recordTypeId: '$patientMetadata.data.defaultRecordTypeId', 
          fieldApiName: PATIENT_PREFERRED_NURSING_TIME
      })
preferredNursingTimePicklist;         

patientChange(event){
    this.FirstName = event.detail.value;
}

handleChange(event){
    this.value = event.detail.value;
}

handleMaritalChange(event){
    this.valueMaritalStatus = event.detail.value;
}

handledobChange(event){
    this.dobChange = event.detail.value;
}

handlemedicalRecordChange(event){
    this.medicalRecord = event.detail.value;
}

handlephoneChange(event){
    this.phoneChange = event.detail.value;
}

handleEmailChange(event){
    this.emailChange = event.detail.value;
}

handleSpecialityChange(event){
    this.specialityChange = event.detail.value;
}

handlepreferredTherapyDayChange(event){
    this.preferredTherapyDayChange = event.detail.value;
}
handlepreferredTherapyTimePicklist(event){
    this.preferredTherapyTimeChange = event.detail.value;
}

handleTherapyMessage(event){
    this.therapyMessage = event.detail.value;
}
handlesupportiveCarePicklist(event){
    this.supportiveCare = event.detail.value;
}
handleservicePicklist(event){
    this.nursingService = event.detail.value;
}
handlepreferredNursingDayChange(event){
    this.preferredNursingDayChange = event.detail.value;
}
handlepreferredNursingTimePicklist(event){
    this.preferredNursingTimeChange = event.detail.value;
}
handleNursingMessageChange(event){
    this.nursingMessage = event.detail.value;
}
handleCreatePatient(){

    if(!this.FirstName) {
        const toastEvent = new ShowToastEvent({
            message:'Please Enter Name and Medical Record to Proceed',
            variant:'error'
          });
          this.dispatchEvent(toastEvent); 
    return;    
    }
   
    const fields = {'Name': this.FirstName , 'Gender__c': this.value, 'Marital_Status__c' : this.valueMaritalStatus, 'Date_Of_Birth__c' :this.dobChange ,
                    'Medical_Record__c' :  this.medicalRecord,'Contact_Phone__c' : this.phoneChange,'Email__c' : this.emailChange,
                    'Specialty__c' : this.specialityChange, 
                    'Preferred_day_of_the_week_therapy__c' : this.preferredTherapyDayChange,
                    'Preferred_time_of_day_therapy__c' : this.preferredTherapyTimeChange,
                    'Message_therapy__c' : this.therapyMessage,
                    'Supportive_Care__c' : this.supportiveCare,
                    'Service__c': this.nursingService,
                    'Preferred_day_of_the_week_nursing__c' : this.preferredNursingDayChange,
                    'Preferred_time_of_day_nursing__c' : this.preferredNursingTimeChange,
                    'Message_nursing__c' : this.nursingMessage}
    
    const recordInput = {apiName: 'Patient_Information__c', fields};
                         createRecord(recordInput).then(response =>{
                            
                        const toastEvent = new ShowToastEvent({
                                title:'Success!',
                                message:'Patient created successfully',
                                variant:'success'
                              });
                              this.dispatchEvent(toastEvent);    
                              setTimeout(function(){
                                window.location.reload()
                            }, 3000);
                         
                        }).catch(error=>{
                            const toastEvent = new ShowToastEvent({
                                message:'Patient With Entered Medical Record Already Exist!',
                                variant:'error'
                              });
                              this.dispatchEvent(toastEvent);      
                         
                        })
                        
                      }

                        }