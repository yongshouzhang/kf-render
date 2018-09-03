/**
 * 纵向组合二元操作符
 */

define( function ( require,exports,module ) {

    var kity = require( "kity" ),ArrowOperator= require("operator/common/arrow"),
    Text= require("char/text");
    var opMapList=[
        [function(w){
            return new ArrowOperator(w,"sa");
        },function(w){
            return new ArrowOperator(w,"sar");
        },function(w){
            return new ArrowOperator(w,"ha");
        },function(w){
            return new ArrowOperator(w,"har");
        },function(w){
            return new ArrowOperator(w,"da");
        }],
        [
            function(){
                return new Text("\u2024");
            },function(){
                return new Text("\u2024\u2024");
            },function(){
                return new Text("\u2024\u2024\u2024");
            },
            function(w){
                w=w-10;
                return  new kity.Line(0,0,w,0).fill("black").stroke("black");
            },function(w){
                w=w-10;
                var line= new kity.Line(0,0,w,0).fill("black").stroke("black");
                var d= line.pathdata+"M0,-5L"+w+",-5";
                line.node.setAttribute("d",d);
                return line;
            }
        ],
        [function(){
            return new Text("\u2032");
        },function(){
            return new Text("\u2035");
        }],
        [],
    ];

    return kity.createClass( 'DerivativeOperator', {

        base: require( "operator/operator" ),

        constructor: function () {

            this.callBase( 'Derivative' );

        },
        applyOperand: function (up,down) {

            var opWidth = Math.max(up.getRenderBox().width, down.getRenderBox().width);
            this.addOperatorShape(this.opFn(opWidth));
            var maxWidth=0 ,infoCache=[];
            
            kity.Utils.each([this, up, down], function (operand, index) {
                var info = operand.getRenderBox();
                operand.translate(-info.x, -info.y);
                maxWidth = Math.max(maxWidth, info.width);
                infoCache.push(info);
            });
            kity.Utils.each([this, up, down], function (operand, index) {
                var info = infoCache[index], offset = (maxWidth - info.width) / 2;
                operand.translate(offset, 0);
            });
            up.translate(0,-infoCache[1].height);
            down.translate(0,infoCache[0].height);
        },
        setType:function(row,column){
            this.opFn= opMapList[row-1][column-1];
        }
    } );

});