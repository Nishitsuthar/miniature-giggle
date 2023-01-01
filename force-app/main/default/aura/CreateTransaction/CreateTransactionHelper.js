({
    saveEdition : function(cmp, newData) {
        $A.get("e.c:SpinnerEvent").setParams({"action" : "SHOW" }).fire();
        cmp.find("dtTable").set("v.draftValues", null);
        var batchId = cmp.find("batchPicklist").get('v.value');
        var productId = cmp.find("productPicklist").get('v.value');
        var oldData = cmp.get('v.data');
        var tableData = [];
        oldData.forEach((oldEle, oldIndex) => {
            newData.forEach((newEle, newIndex) => {
                if ('row-'+oldIndex == newEle.id) {
                    oldEle.Current_Quantity__c = newEle.Current_Quantity__c;
                    tableData.push(oldEle);
                }
            });
        });
        var action = cmp.get("c.createTransaction");
        action.setParams({
            batchId : batchId,
            productId : productId,
            dataList : tableData
        })
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                $A.get("e.c:SpinnerEvent").setParams({"action" : "HIDE" }).fire();
                helper.showToast('Success', 'Transaction has been Created', 'success');           
            }else{
                $A.get("e.c:SpinnerEvent").setParams({"action" : "HIDE" }).fire();
                helper.showToast('Error', 'Something went wrong', 'error');         
            }
        });
        $A.enqueueAction(action);
    },
    getProductList : function(cmp, event, helper){
        var action = cmp.get("c.productList");
        action.setParams({  });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                cmp.set("v.Products", result);
            }
        });
        $A.enqueueAction(action);
    },
    getBatchList : function(cmp, event, helper){
        var action = cmp.get("c.batchList");
        action.setParams({  });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                cmp.set("v.Batch", result);
            }
        });
        $A.enqueueAction(action);
    },
    showToast : function(title, message, type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message,
            "type": type,
            "duration": 3000
        });
        toastEvent.fire();
    }
})
