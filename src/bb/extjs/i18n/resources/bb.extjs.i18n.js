(function (root, undef) {
    
    
    
    
    
})(this);

var i18n = function(domain) {
    var data;
    var me = this;
    Ext.Ajax.request({
        url: location.href + '/i18n/' + domain,
        noCache: true,
        success: function(response, opts) {
           me.data = Ext.JSON.decode(response.responseText);
        },
        failure: function(response, opts) {
           console.log('server-side failure with status code ' + response.status);
        }
    });
};