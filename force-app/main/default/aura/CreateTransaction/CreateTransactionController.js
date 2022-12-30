({
    init : function(cmp, event, helper) {
        cmp.set('v.columns', [
            {label: 'Material name', fieldName: 'Name', type: 'text', editable: true, typeAttributes: { required: true }},
            {label: 'Quantity', fieldName: 'Quantity', type: 'number', editable: true, typeAttributes: { required: true } },
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
        var Id = cmp.find("industryPicklist").get('v.value');
        console.log('Id ',Id);
        var action = cmp.get("c.materialList");
        action.setParams({ 
            recordId : Id
         });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                //* for resetting the value to zero
                result.forEach(data => {
                    data.Quantity = 0;
                });
                cmp.set("v.data", result);
            }
        });
        $A.enqueueAction(action);
    },
})
