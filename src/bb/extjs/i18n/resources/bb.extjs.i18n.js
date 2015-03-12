(function (root) {

    var i18nMessageObject = function(msgid, defaultmsg, mapping){

        this.setMapping = function(mapping){
            self.mapping = mapping;
        };

        this.setTranslation = function(message){
            if (message){
                self.message = message;
            } else {
                if (self.defaultmsg)
                    self.message = self.defaultmsg;
                else
                    self.message = self.msgid;
            }
        };

        this.toString = function(){
            re = self.message;
            for(var key in self.mapping) {
                re = re.replace('${' + key + '}', mapping[key]);
            }
            return re;
        };
        
        var self = this;
        if (!mapping)
            mapping = {};

        self.msgid = msgid;
        self.message = null;
        self.defaultmsg = defaultmsg;
        self.setMapping(mapping);
    };


    i18n = function(domain) {
        var data = null;
        var msgobjects = new Array();
        Ext.Ajax.request({
            url: location.href + '/i18n/' + domain,
            noCache: false,
            success: function(response, opts) {
               data = Ext.JSON.decode(response.responseText);
               filldata();
            },
            failure: function(response, opts) {
               console.log('server-side failure with status code ' + response.status);
            }
        });
        
        var filldata = function(){
            if (!(msgobjects.length && data))
                return;
            while( msgobj = msgobjects.pop() ) {
                if (msgobj.msgid in data['messages'])
                    msgobj.setTranslation(data['messages'][msgobj.msgid]);
                else
                    msgobj.setTranslation(null);
            }
        };
        
        var i18nMessageFactory = function(msgid, defaultmsg, mapping){
            var msgobj = new i18nMessageObject(msgid, defaultmsg, mapping);
            msgobjects.push(msgobj);
            filldata();
            return msgobj;
        };
        
        return i18nMessageFactory;
    };


})(this);
