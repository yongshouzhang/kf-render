/**
 * 纵向组合二元操作符
 */

define( function ( require,exports,module ) {

    var kity = require( "kity" );

    return kity.createClass( 'VerticalOperator', {

        base: require( "operator/operator" ),

        constructor: function () {

            this.callBase( 'Vertical' );

        },
        applyOperand: function () {

                // 偏移量
            var offsetY=0,
                // 操作数
                operands = arguments,
                cached = [],
                maxWidth=0;
                // 偏移集合

            kity.Utils.each( operands, function ( operand ) {

                var box = operand.getFixRenderBox();
                    //offsetY = operand.getOffset();

               //box.height -= offsetY.top + offsetY.bottom;
                cached.push( box );
                maxWidth= Math.max(box.width,maxWidth);
                /*
                offsets.push( offsetY );
                maxOffsetTop = Math.max( offsetY.top, maxOffsetTop );
                maxOffsetBottom = Math.max( offsetY.bottom, maxOffsetBottom );
                maxHeight = Math.max( box.height, maxHeight );
                */

            } );

            kity.Utils.each( operands, function ( operand, index ) {

                var box = cached[ index ];

                operand.translate( (maxWidth-box.width)/2, offsetY);

                offsetY += box.height;

            } );
          //  this.parentExpression.setOffset( maxOffsetTop, maxOffsetBottom );
            this.parentExpression.updateBoxSize();

        }

    } );

});