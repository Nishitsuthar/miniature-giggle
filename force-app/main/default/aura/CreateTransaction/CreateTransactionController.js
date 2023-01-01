({
    init : function(cmp, event, helper) {
        cmp.set('v.columns', [
            {label: 'Material name', fieldName: 'Name', type: 'text', editable: false, typeAttributes: { required: true }},
            {label: 'Quantity', fieldName: 'Current_Quantity__c', type: 'number', editable: true, typeAttributes: { required: true } },
        ]);
        helper.getProductList(cmp, event, helper);
        helper.getBatchList(cmp, event, helper);
    },

    handleSaveEdition: function (cmp, event, helper) {
        var Id = cmp.find("batchPicklist").get('v.value');
        if (Id) {
            var draftValues = event.getParam('draftValues');
            helper.saveEdition(cmp, draftValues);
        }else{
            helper.showToast('Error', 'Please Select Batch', 'error')
        }
    },

    getMaterialData: function(cmp){
        $A.get("e.c:SpinnerEvent").setParams({"action" : "SHOW" }).fire();
        var Id = cmp.find("productPicklist").get('v.value');
        var action = cmp.get("c.materialList");
        action.setParams({ 
            recordId : Id
         });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                $A.get("e.c:SpinnerEvent").setParams({"action" : "HIDE" }).fire();
                var result = response.getReturnValue();
                //* for resetting the value to zero
                result.forEach(data => {
                    data.Current_Quantity__c = 0;
                });
                cmp.set("v.data", result);
            }
        });
        $A.enqueueAction(action);
    },
})
