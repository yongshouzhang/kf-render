/**
 * 求和表达式
 */

define( function ( require ) {

    var kity = require( "kity" ),
        SummationOperator = require( "operator/summation" );

    return kity.createClass( 'SummationExpression', {

        base: require( "expression/compound" ),

        /**
         * 构造求和表达式
         * @param expr 求和表达式
         * @param upOperand 上标
         * @param downOperand 下标
         */
        constructor: function ( expr, superscript, subscript ) {

            this.callBase();
            this.setFlag( "Summation" );

            this.setOperator( new SummationOperator() );

            this.setExpr( expr );
            this.setSuperscript( superscript );
            this.setSubscript( subscript );

        },
        addedCall:function(){
            this.callBase();
            /*
            var info= this.getRenderBox();
            this.translate(0, -(info.height+info.y)/2);
            */
        },
        setExpr: function ( expr ) {
            this.setOperand( expr, 0 );
        },
        setType: function () {
            if (arguments[0]) {
                var type = arguments[0][0];
                if (!type) {
                    return false;
                }
                switch(type){
                    case"a":
                    case"v":
                    case"u":
                    case"n":
                    case"p":
                    case"c":
                    type=type.toUpperCase();
                    break;
                }
                this.getOperator().setType(type);
            }
        },
        setSuperscript: function ( sup ) {
            this.setOperand( sup, 1 );
        },

        setSubscript: function ( sub ) {
            this.setOperand( sub, 2 );
        }

    } );

} );
