


Feature: Ecommerce Validations   

  @Regression
  Scenario: Placing an Order
  Given Login to Ecommerce application with "jeetcc@gmail.com" and "Test@1234"   
  When Add "ZARA COAT 3" to Cart
  Then Verify "ZARA COAT 3" is displayed in the cart
  When Enter Valid details and place the order
  Then Verify Order is present in the order history




        @Incorrectcheck
		Scenario Outline: Verifying incorrect message
		Given a login to Ecommerce2 application with "<username>" and "<password>"  
		Then Verify Error message is displayed

		 Examples:
          | username    	  | 	password  |
          | anshikaw@gmail.com | Learning@830$3mK3   |
          | jeetcc@gmail.com   | Test@1234           |

