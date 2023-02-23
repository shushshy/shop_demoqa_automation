/// <reference types="cypress" />

//TODO: move this to a separate config file
const username = 'randomusername' + Math.floor(Math.random() * 1000)
const first_name = 'First Name'
const last_name = 'Last Name'
const phone = '+38761123456'

describe('Smoke test', () => {

    // minimal smoke test following common user flow
    it('does not smoke', () => {

        //Register
        cy.log('Register user: ' + username)
        cy.visit('https://shop.demoqa.com/my-account')
        cy.get('#reg_username').type(username)
        cy.get('#reg_email').type(`${username}@test.com`)
        cy.get('#reg_password').type('Testuser@123')
        cy.get('.woocommerce-Button').click()
        cy.contains('Hello ' + username)

        //Set shipping address (form is for shipping, but ids are for billing)
        cy.log('Set shipping address')
        cy.get('.woocommerce-MyAccount-navigation-link--edit-address > a').click()
        cy.get('.u-column1 > .woocommerce-Address-title > .edit').click()
        cy.get('#billing_first_name').clear().type(first_name)
        cy.get('#billing_last_name').clear().type(last_name)
        cy.get('#billing_country').select('BA', { force: true })
        cy.get('#billing_address_1').clear().type('Address 1')
        cy.get('#billing_postcode').clear().type('71000')
        cy.get('#billing_city').clear().type('Sarajevo')
        cy.get('#billing_phone').clear().type(phone)
        cy.get(':nth-child(2) > .button').click()
        cy.get('.woocommerce-message').should('contain', 'Address changed successfully.')

        // Set billing address (form is for billing, but ids are for shipping)
        cy.log('Set billing address')
        cy.get('.u-column2 > .woocommerce-Address-title > .edit').click()
        cy.get('#shipping_first_name').clear().type(first_name)
        cy.get('#shipping_last_name').clear().type(last_name)
        cy.get('#shipping_country').select('US', { force: true })
        cy.get('#shipping_address_1').clear().type('Address 1 New York')
        cy.get('#shipping_city').clear().type('New York')
        cy.get('#shipping_state').select('NY', { force: true })
        cy.get('#shipping_postcode').clear().type('10001')
        cy.get(':nth-child(2) > .button').click()
        cy.get('.woocommerce-message').should('contain', 'Address changed successfully.')

        // //Search for a product
        cy.log('Search for a product')
        cy.get('.noo-search').type('dress')
        cy.get('input[type="search"]').type('{enter}')
        cy.location().should((location) => {
            expect(location.href).to.eq('https://shop.demoqa.com/?s=dress&post_type=product')
        })

        //Add first product to wishlist
        cy.log('Add first product to wishlist')
        cy.get('.products').find('.noo-product-inner').first().find('.add_to_wishlist').click()
        cy.get('#yith-wcwl-message').should('be.visible')

        //View wishlist
        cy.log('View wishlist')
        cy.visit('https://shop.demoqa.com/wishlist')
        cy.get('.wishlist-items-wrapper').should('have.length', 1)

        //Open wishlist product, select color and size, set quantity to 2 and add to cart.
        cy.log('Open wishlist product, select color and size, set quantity to 2 and add to cart.')
        cy.get('.wp-element-button').click()
        cy.get('#pa_color').select(1)
        cy.get('#pa_size').select(1)
        cy.get('.qty-increase').click()
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message').should('contain', 'been added to your cart.')
        cy.get('.cart-name-and-total').should('contain', 'Cart(2)')

        //View cart, verify only 1 item, increment quantity by one and update shopping cart
        cy.log('View cart, verify only 1 item, increment quantity by one and update shopping cart')
        cy.get('.woocommerce-message > .button').click()
        cy.get('.cart_item').should('have.length', 1)
        cy.get('.qty-increase').click()
        cy.get('[name="update_cart"]').click()

        //Proceed to checkout, verify fields are prepopulated from billing address and place order
        cy.log('Proceed to checkout, verify fields are prepopulated from billing address and place order')
        cy.get('.wc-proceed-to-checkout > .checkout-button').click()
        cy.get('.product-quantity').should('contain', '3')
        cy.get('#billing_first_name').should('have.value', first_name)
        cy.get('#billing_last_name').should('have.value', last_name)
        cy.get('#billing_country').should('have.value', 'BA')
        cy.get('#billing_address_1').should('have.value', 'Address 1')
        cy.get('#billing_postcode').should('have.value', '71000')
        cy.get('#billing_city').should('have.value', 'Sarajevo')
        cy.get('#billing_phone').should('have.value', phone)
        cy.get('#terms').check()
        cy.get('#place_order').click()

        //Verify order is placed with correct information
        cy.log('Verify order is placed with correct information')
        cy.get('.woocommerce-thankyou-order-received').contains('Thank you. Your order has been received.')
        cy.get('.product-quantity').should('contain', '3')
        cy.get('.woocommerce-customer-details--phone').contains(phone)
        cy.get('.woocommerce-customer-details--email').contains(`${username}@test.com`)

        //Visit my account and verify order is listed
        cy.log('Visit my account and verify order is listed')
        cy.visit('https://shop.demoqa.com/my-account/orders')
        cy.get('.cart-name-and-total').should('contain', 'Cart(0)')
        cy.get('.account-orders-table').find('tbody').find('tr').should('have.length', 1)

        //Logout and verify user is logged out
        cy.log('Logout and verify user is logged out')
        cy.get('.woocommerce-MyAccount-navigation-link--customer-logout > a').click()
        cy.get('.login').should('be.visible')
    })
})

