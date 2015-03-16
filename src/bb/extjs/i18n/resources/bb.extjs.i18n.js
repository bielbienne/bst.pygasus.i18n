(function (root) {

    var i18nMessageObject = function(msgid, defaultmsg, mapping){

        var private = { 
                        msgid: undefined,
                        defaultmsg: undefined,
                        mapping: undefined,
                        message: undefined
                      };


        this.getMapping = function(){
            return private.mapping;
        };

        this.getMsgId = function(){
            return private.msgid;
        };

        this.getDefaultMsg = function(){
            return private.defaultmsg;
        };

        this.setMapping = function(new_mapping){
            private.mapping = new_mapping;
        };

        this.setTranslation = function(new_message){
            if (new_message) {
                private.message = new_message;
            } else {
                if (private.defaultmsg)
                    private.message = defaultmsg;
                else
                    private.message = msgid;
            }
        };

        var _string = function(){
            re = private.message;
            for(var key in private.mapping) {
                re = re.replace('${' + key + '}', private.mapping[key]);
            }
            return re;
        };
        this.toString = _string;
        this.valueOf = _string;


        if (!private.mapping)
            private.mapping = {};

        private.msgid = msgid;
        private.message = null;
        private.defaultmsg = defaultmsg;
        this.setMapping(mapping);
        this.setTranslation(null);
    };
    i18nMessageObject.prototype.__proto__ = String.prototype;


    var data = {};
    i18n = function(domain) {
        var msgobjects = new Array();

        var filldata = function(){
            if (!data[domain])
                return;
            while( msgobj = msgobjects.pop() ) {
                if ( msgobj.getMsgId() in data[domain]['messages'])
                    msgobj.setTranslation(data[domain]['messages'][msgobj.getMsgId()]);
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

        if (domain in data){
            filldata();
        } else {
            data[domain] = null;

            var xhr = new XMLHttpRequest();
            xhr.open('get', location.href + '/i18n/' + domain, true);
            xhr.responseType = 'json';
            xhr.onload = function() {
                var status = xhr.status;
                if (status == 200) {
                    data[domain] = xhr.response;
                    filldata();
                } else {
                    console.log('server-side failure with status code ' + status);
                }
            };
            xhr.send();
        }
        
        return i18nMessageFactory;
    };



})(this);
