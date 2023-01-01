public with sharing class InventoryManagementController {

    @AuraEnabled
    public static List<Product2> productList(){
        try {
            List<Product2> productList = new List<Product2>();
            productList = [SELECT Id, Name FROM Product2];
            return productList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Batch__c> batchList(){
        try {
            List<Batch__c> batchList = new List<Batch__c>();
            batchList = [SELECT Id, Name FROM Batch__c];
            return batchList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Material__c> materialList(String recordId){
        try {
            List<Material__c> materialList = new List<Material__c>();
            materialList = [SELECT Id, Name FROM Material__c WHERE Product__c =: recordId ORDER BY CreatedDate DESC];
            return materialList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static void createTransaction(String batchId,String productId, List<Material__c> dataList){
        try {
            List<Transactions__c> newTransactionList = new List<Transactions__c>();
            for (Material__c material : dataList) {
                Transactions__c trans = new Transactions__c();
                trans.Material__c = material.Id;
                trans.Quantity_Requested_Kgs__c = material.Current_Quantity__c;
                trans.Batch__c = batchId;
                trans.Product__c = productId;
                trans.Status__c = 'Created';
                newTransactionList.add(trans);
            }
            insert newTransactionList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
