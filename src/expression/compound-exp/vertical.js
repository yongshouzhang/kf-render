/**
 *二元纵向结合操作符 
 */

define( function ( require ,exports,module) {

    var kity = require( "kity" ),
         VerticalOperator= require( "operator/vertical" );

    return kity.createClass( 'VerticalExpression', {

        base: require( "expression/compound-exp/binary" ),

        /**
         * 构造开方表达式
         * @param up 上部分 
         * @param down 下部分 
         */
        constructor: function ( up, down ) {

            this.callBase();

            this.setFlag( "Vertical" );

            this.setOperator( new VerticalOperator() );
             kity.Utils.each( arguments, function ( operand, index ) {

                this.setOperand( operand, index );

            }, this );

        },
        addedCall:function(){
            this.callBase();
        }
    } );

} );
