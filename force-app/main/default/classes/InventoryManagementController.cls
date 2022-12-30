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
            materialList = [SELECT Id, Name FROM Material__c WHERE Product__c =: recordId];
            return materialList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
