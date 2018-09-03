/**
 *导数表达式
 */

define( function ( require ,exports,module) {

    var kity = require( "kity" ),
         DerivativeOperator= require( "operator/derivative" );

    return kity.createClass( 'DerivativeExpression', {

        base: require( "expression/compound-exp/binary" ),

        /**
         * 构造开方表达式
         * @param up 上部分 
         * @param down 下部分 
         */
        constructor: function ( up,down) {

            this.callBase(up,down);

            this.setFlag( "Derivative" );

            this.setOperator( new DerivativeOperator() );
        },
        setType:function(row,column){
            console.log("row:%s,column:%s",row,column);
            this.getOperator().setType(row,column);

        },
        addedCall:function(){
            this.callBase();
        }
    } );

} );