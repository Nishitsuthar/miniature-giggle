public without sharing class TransactionTriggerHandler{
    private boolean triggerIsExecuting;
    private integer triggerSize;
    public TransactionTriggerHandler(Boolean triggerIsExecuting, integer triggerSize) {
        this.triggerIsExecuting = triggerIsExecuting;
        this.triggerSize = triggerSize;
    }

    public void beforeInsert(List<Transactions__c> newTransactions){
        //call sObjectTriggerHelper methods
        // Transactions__c tran = new Transactions__c();
        // Approval.ProcessSubmitRequest req1 = new Approval.ProcessSubmitRequest();
        // req1.setComments('Submitting Transactions for approval.');
        // req1.setObjectId(tran.id);
        
        // // Submit on behalf of a specific submitter
        // // req1.setSubmitterId(user1.Id);
        
        // // Submit the record to specific process and skip the criteria evaluation
        // req1.setProcessDefinitionNameOrId('PTO_Request_Process');
        // req1.setSkipEntryCriteria(true);
        
        // // Submit the approval request for the account
        // Approval.ProcessResult result = Approval.process(req1);
    }
    public void beforeUpdate(List<Transactions__c> newTransactions, List<Transactions__c> oldTransactions, Map<Id,sObject> newTransactionsMap, Map<Id,sObject> oldTransactionsMap){
       //call sObjectTriggerHelper methods
    }

    public void beforeDelete(List<Transactions__c> oldAccounts, Map<Id,SObject> oldTransactionsMap){
        //call sObjectTriggerHelper methods
    }

    public void afterInsert(List<Transactions__c> newTransactions, Map<Id,SObject> newTransactionsMap){
        //call sObjectTriggerHelper methods

    }
    public void afterUpdate(List<Transactions__c> newTransactions, List<Transactions__c> oldAccounts, Map<Id,SObject> newTransactionsMap, Map<Id,SObject> oldTransactionsMap){
        //call sObjectTriggerHelper methods
        List<Consignment__c> ConsignmentList=new List<Consignment__c>();
        
        for (Transactions__c trans : newTransactions) {
            System.debug('status --> '+trans.Status__c );
            System.debug('Consignment__c --> '+trans.Consignment__c );
            if (trans.Status__c == 'Approved' && trans.Consignment__c != null) {
                Consignment__c obj=new Consignment__c();
                obj.id=trans.Consignment__c;
                System.debug('obj --> '+obj);
                System.debug('parent quantity before --> '+trans.Consignment__r.Name);
                System.debug('parent quantity before --> '+trans.Quantity_Requested_Kgs__c);
                obj.Current_Quantity__c = trans.Consignment__r.Current_Quantity__c - trans.Quantity_Requested_Kgs__c;
                System.debug('parent quantity after --> '+obj.Current_Quantity__c);
                ConsignmentList.add(obj);
            }
        }
        update ConsignmentList;
    }

    public void afterDelete(List<Transactions__c> oldAccounts, Map<Id,SObject> oldTransactionsMap){
        //call sObjectTriggerHelper methods
    }

    public void afterUndelete(List<Transactions__c> newTransactions, Map<Id,SObject> newTransactionsMap){
        //call sObjectTriggerHelper methods
    }
}