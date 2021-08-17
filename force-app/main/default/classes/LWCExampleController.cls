public with sharing class LWCExampleController {

    @AuraEnabled
    public static list<Patient_Information__c> retrivePats(String strMRecord) {
        strMRecord = '%' + strMRecord + '%';
        
        list<Patient_Information__c> lstPat = [SELECT  Id, Name, Medical_Record__c, Email__c, Contact_Phone__c From Patient_Information__c WHERE Medical_Record__c LIKE :strMRecord];

        if(lstPat.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return lstPat; 
    }
} 