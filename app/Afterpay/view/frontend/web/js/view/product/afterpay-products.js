/**
 * Copyright © 2016 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
require(
	[
		"jquery",
		"Magento_Catalog/js/price-utils"
	],
	function ( $, priceUtils, quote ) {

		$(document).ready(function($) {
			setFinalAmount();

			$('body').on('click change', $('form#product_addtocart_form'), function (e) {
				setFinalAmount();
			});
			$('body').on('input', $('form#product_addtocart_form select'), function (e) {
				setTimeout(function() {
					$('form#product_addtocart_form').trigger('change');
				}, 3);
			});
		});

		function setFinalAmount(){

            let price_raw = $(".page-main [data-price-type=finalPrice]:first").text() || '';
            if (!price_raw) price_raw = $('.page-main .product-info-price .price-final_price .price-wrapper:not([data-price-type="oldPrice"]) span.price:first').text();


			var price = price_raw.match(/[\d\.]+/g);

			var product_variant_price=parseFloat($('.page-main .product-info-price span.price-final_price > span[data-price-type="finalPrice"]').attr('data-price-amount'));
			if(price != null){
				if (price[1]) {
					product_variant_price = price[0]+price[1];
				} else {
					product_variant_price = price[0];
				}
			}

			$('afterpay-placement').attr('data-amount',product_variant_price);

		}

	}
);

