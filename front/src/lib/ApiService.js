import config from "#/dev.json";

export default class ApiService{
    static _getXmlHttp(){
        let xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest !== 'undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    }
    static send(url, options={}, data={}){
        return new Promise((res,rej)=>{
            let req = ApiService._getXmlHttp();
            req.open(options.method, `${config.server}/api${url}`, true);
            req.onreadystatechange = function() {
                if (req.readyState === 4) {
                    if(req.status === 200) {
                        res();
                    }
                }
            };
            req.send(null);
        });
    }
}