public class ContactHandler {
    
    /*****************************Trigger to Update the Custom Last Modified Date
     Field in the Parent Object When the Records 
     in the Child Object is Updated Using Apex Trigger in Salesforce ***************************/
    
    public static void createAccount(List<Contact> conList){
        List<Contact> conVarList = new List<Contact>();
        
        for(Contact conVar:conList ){
            if(conVar.accountID == NUll ){
                conVarList.add(conVar); 
            }
        }
        if(conVarList.size()>0){
            Map<String,contact> conNameMap = new Map<String, Contact>();
            List<Account> createAccount = new List <Account>();
            
            for(Contact con: conVarList){
                String accountName = con.firstName +' '+con.LastName ; 
                conNameMap.put(accountName,con);
                Account accObj = new Account();
                accObj.Name = accountName;
                createAccount.add(accObj);
            }
            Insert createAccount;
            
            for(Account acc: createAccount){
                
                if(conNameMap.containskey(acc.Name)){
                    conNameMap.get(acc.Name).accountID = acc.Id;
                }
                
            }
        }  
        
    }
    
    /**********************************Write a Apex trigger to Add the Contact First Name 
    /and Last Name to Associated Account Custom Field 
    /Whenever the Contact inserted or Updated in Salesforce*****************************/
    
    public static void updateFieldOnAccount(List<Contact> conList){
       Set<id> accountIdSet = new Set<Id>();
        for(Contact con: conList) {
            if(con.AccountId <> NUll){
                accountIdSet.add(con.AccountId);
            }
            
            List<Account> accQuery = [Select id, Contact_Full_Name__c from Account Where Id =: accountIdSet];
            
            for(Contact conVar: conList){
                for(Account accVar : accQuery){
                    accVar.Contact_Full_Name__c = conVar.firstName +' '+conVar.LastName ;
                    update accVar;
                }
            }
        }
    }

}
