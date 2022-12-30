({
    saveEdition : function(cmp, newData) {
        console.log('get data --> ',{newData});
        var oldData = cmp.get('v.data');
        console.log({oldData});
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
