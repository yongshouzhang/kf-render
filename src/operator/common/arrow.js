/*
* 箭头符号
*/
define(function(require){
    var kity = require( "kity" );

    var reverseShape= function(path,reverseX,reverseY){
        var reg=/([A-Z])\s*?(\-{0,1}\d+(\.\d+)?)\s*?,(\-{0,1}\d+(\.\d+)?)\s*?/gi;
        var data="",tmp=null;
        while((tmp=reg.exec(path))!=null&&reg.lastIndex!=data.length){
            var x= +tmp[2],y=+tmp[4];
            data += (tmp[1] + " " + (reverseX?-x:x) + "," + (reverseY?-y:y));
        }
        return data;
    };

    var generateArrow= function (width,type){
        width= width-12;
        var dla=function(innerWidth){
            return "M0,6  L12,0 L0,-6 L3 ,-3  L-"+
            innerWidth+" ,-3 L-"+
            innerWidth+",-2  L4,-2 L 6,0 L4,2 L-"+
            innerWidth+",2 L-"+
            innerWidth+",3 L3,3 z";
        },
        sa=function(innerWidth){
            return "M0,6  L12,0 L0,-6 L5.5 ,-0.5  L-"+
            innerWidth+" ,-0.5  L-"+
            innerWidth+",0.5  L5.5,0.5 L 6,0  z";
        },
        da= function(innerWidth){
            innerWidth-=12;
            return "M0,6  L12,0 L0,-6 L5.5 ,-0.5  L-" +
            innerWidth+" ,-0.5 L-"+(innerWidth-5.5)+",6 L-"+(innerWidth+6.5)+",0 L-"+(innerWidth-5.5)+",-6  L-"+
            innerWidth+",0.5  L5.5,0.5 L 6,0  z";
        },
        ha=function(innerWidth){
            return "M0,-6  L12.5,0.5  L-"+
            innerWidth+" ,0.5  L-"+
            innerWidth+",-0.5  L5.5,-0.5 L 0,-6  z";
        },sar=function(innerWidth){
                return reverseShape( sa(innerWidth),true);
        },dlar=function(innerWidth){
            return reverseShape(dla(innerWidth),true);
        },har=function(innerWidth){
            return reverseShape(ha(innerWidth),true);
        };
        return ({
            sar:sar,
            dlar:dlar,
            har:har,
            dla: dla,
            sa:sa,
            da:da,
            ha:ha}[type]||function(){})(width);
    };
    return kity.createClass("ArrowOperator",{
         
        base:require( "operator/operator" ),

        constructor: function (width,type) {
            this.width=width; 
            this.callBase( 'Arrow' );
            this.type=type;
            this.applyOperand();
        },
        applyOperand: function () {
            var data= generateArrow(this.width,this.type);
            var operator = new kity.Path(data).fill("black"),
            operatorShape = new kity.Group();
        operatorShape.addShape(operator);
         this.addOperatorShape( operatorShape );
        }
    });

});
