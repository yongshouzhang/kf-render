/**
 * 求和操作符：∑
 */

define( function ( require ) {

    var kity = require( "kity" ),
        ScriptController = require( "operator/common/script-controller" );

    return kity.createClass( 'SummationOperator', {

        base: require( "operator/operator" ),

        constructor: function () {

            this.callBase( "Summation" );

            this.displayType = "equation";

        },
        setType: function () {
            this.sumType = arguments[0];
        },
        applyOperand: function ( expr, sup, sub ) {

            var opShape = this.getOperatorShape();
             var   expBox = expr.getFixRenderBox(),
                padding = 0,
                space = new ScriptController( this, opShape, sup, sub ).applyUpDown(),
                diff = ( space.height - space.top - space.bottom - expBox.height ) / 2;

            if ( diff >= 0 ) {
                expr.translate( space.width + padding, diff + space.bottom );
            } else {
                diff = -diff;
                opShape.translate( 0, diff );
                sup.translate( 0, diff );
                sub.translate( 0, diff );
                expr.translate( space.width + padding, space.bottom );
            }

            this.parentExpression.setOffset( space.top, space.bottom );
            this.parentExpression.expand( padding, padding * 2 );
            this.parentExpression.translateElement( padding, padding );

        },

        getOperatorShape: function () {

            var pathData = "M0.672,33.603c-0.432,0-0.648,0-0.648-0.264c0-0.024,0-0.144,0.24-0.432l12.433-14.569L0,0.96c0-0.264,0-0.72,0.024-0.792   C0.096,0.024,0.12,0,0.672,0h28.371l2.904,6.745h-0.6C30.531,4.8,28.898,3.72,28.298,3.336c-1.896-1.2-3.984-1.608-5.28-1.8   c-0.216-0.048-2.4-0.384-5.617-0.384H4.248l11.185,15.289c0.168,0.24,0.168,0.312,0.168,0.36c0,0.12-0.048,0.192-0.216,0.384   L3.168,31.515h14.474c4.608,0,6.96-0.624,7.464-0.744c2.76-0.72,5.305-2.352,6.241-4.848h0.6l-2.904,7.681H0.672z",
                pathDataA = "M17.732,0L31,33.584h-4.578L17.269,9.186c-0.694-1.832-1.303-3.664-1.825-5.499c-0.479,1.712-1.072,3.543-1.781,5.499  L4.855,33.584H0L13.131,0H17.732L17.732,0z",
                pathDataV = "M17.732,33.584L31,0h-4.578l-9.154,24.398c-0.694,1.832-1.303,3.664-1.825,5.499c-0.479-1.712-1.072-3.543-1.781-5.499  L4.855,0H0l13.131,33.584H17.732L17.732,33.584z",
                pathDataN="M22.552,31.652c0,0.976,0,1.952-0.812,1.952s-0.812-0.976-0.812-1.952V12.086c0-1.463,0-4.932-3.122-7.588c-2.15-1.845-4.707-2.33-6.532-2.33c-3.041,0-9.651,1.734-9.651,9.863v19.621c0,0.976,0,1.952-0.812,1.952S0,32.628,0,31.652V11.76C0,3.793,6.002,0,11.275,0C16.344,0,22.55,3.577,22.55,11.814v19.837L22.552,31.652L22.552,31.652z",
                pathDataU= "M22.551,21.844c0,7.966-6.003,11.76-11.276,11.76C6.205,33.604,0,30.027,0,21.79V1.95C0,0.975,0,0,0.81,0c0.811,0,0.811,0.975,0.811,1.95v19.566c0,1.463,0,4.932,3.124,7.587c2.149,1.844,4.705,2.331,6.53,2.331c3.042,0,9.653-1.734,9.653-9.864V1.95c0-0.976,0-1.95,0.812-1.95c0.811,0,0.811,0.975,0.811,1.95L22.551,21.844",
                pathDataSU = "M22.772,1.769h-1.77v30.068h0.884v0.883h0.886v0.885h-0.886h-0.884h-1.769H18.35h-0.884V32.72h0.884v-0.883h0.884V1.769H3.317v30.068h0.885v0.883h0.884v0.885H4.202H3.317H1.548H0.664H-0.22V32.72h0.884v-0.883h0.884V1.769H0.664V0.883h-1.768v-0.884h24.76v0.884h-0.884V1.769L22.772,1.769z",
                pathDataSN= "M-1.105,32.719h1.769v-0.885h0.884V1.77H0.664V0.884h-0.885V0h0.884h0.884h1.768H4.2h0.884v0.884H4.2v0.885H3.315v30.065h15.917V1.77h-0.884V0.884h-0.884V0h0.884h0.884h1.769h0.883h0.886v0.884h-0.886v0.885h-0.883v30.065h1.77v0.885h0.884v0.885h-24.76V32.719L-1.105,32.719z";
                
                switch(this.sumType){
                    case"A":pathData= pathDataA;break;
                    case"V":pathData= pathDataV;break;
                    case"U":pathData= pathDataU;break;
                    case"N":pathData= pathDataN;break;
                    case"P":pathData= pathDataSU;break;
                    case"C":pathData= pathDataSN;break;
                }
            var operator = new kity.Path(pathData).fill("black"),
                operatorShape = new kity.Group();
            operatorShape.addShape(operator);

            var opBgShape = new kity.Rect(0, 0, 0, 0).fill("transparent"),
                group = new kity.Group(),
                opRenderBox = null;

            group.addShape(opBgShape);
            group.addShape(operatorShape);

            operatorShape.scale(1.6);

            this.addOperatorShape(group);

            opRenderBox = operatorShape.getFixRenderBox();

            if (this.displayType === "inline") {
                operatorShape.translate(5, 15);
                opBgShape.setSize(opRenderBox.width + 10, opRenderBox.height + 25);
            } else {
                operatorShape.translate(2, 5);
                opBgShape.setSize(opRenderBox.width + 4, opRenderBox.height + 8);
            }
             // 为操作符图形创建baseline和meanline方法
             group.getBaseline = function () {
                return operatorShape.getFixRenderBox().height;
            };

            group.getMeanline = function () {
                return 10;
            };

            return group;

        }

    } );

} );

