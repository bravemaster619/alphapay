[![build](https://github.com/bravemaster619/alphapay/workflows/build/badge.svg)](https://github.com/bravemaster619/alphapay/actions)
[![npm downloads](https://img.shields.io/npm/dt/alphapay?label=npm%20downloads&style=plastic)](https://www.npmjs.com/package/alphapay)

# Overview

Node.js implementation for alphapay

See [official doc](https://www.alphapay.com/api/CAD_en.html)

# Install

```console
npm i -S alphapay
```

# Example 

## Generate payment url

Create an Alphapay instance

```javascript
const alphapay = new Alphapay(PARTNER_CODE, CREDENTIAL_CODE);
```

Create a QR Code payment

```javascript
const resp = await alphapay.createQRCodePayment("your-order-id", {
  description: 'Developer Test',
  price: Number((total * 100)).toFixed(0), // price should be an integer of the base unit of the currency 
  currency: CurrencyType.CAD, // CAD or CNY
  notify_url: "https://your.domain.backend/api/alphapay-success",
  channel: ChannelType.WECHAT // ALIPAY or UNION_PAY, some channel might not be available for different payment gateways
});
```

Handle alphapay response

```javascript
if (resp.return_code != 'SUCCESS') {
  // handle exception
  return;
}
const redirectUrl = alphapay.getQRCodePaymentPageUrl("your-order-id", `https://your.domain.frontend/payment-success?orderId=your-order-id`);
```

Pass `redirectUrl` to the frontend

## Redirect browser to the payment page

Redirect the page to the url generated in the backend:

```javascript
window.location.href = redirectUrl;
```

## Handle success notification in backend

Alphapay will post [SuccessNotification](https://github.com/bravemaster619/alphapay/blob/master/src/types/success-notification.ts) [**up to 3 times**](https://www.alphapay.com/api/CAD_en.html#PaymentSuccessPage)  to `notify_url` when payment succceeds.

```javascript
const notification: SuccessNotification = req.body;
if (!alphapay.isNotificationValid(notification)) {
  // you can ignore validation for some alphapay apis
  // https://www.alphapay.com/api/CAD_en.html#PaymentSuccessPage
  // handle exception
  return;
}
const orderId = notification.partner_order_id; // your-order-id
const alphaOrder = await alphapay.getOrderStatus(orderId);
// IMPORTANT: your backend should be able to handle the repeated success notifications
doSomethingElseInYourBackend(orderId, alphaOrder);
```

## Check payment status in `redirectUrl`

In `redirectUrl` you may want to check if `SuccessNotification` is properly handled in your backend.

For more info, see [test file](https://github.com/bravemaster619/alphapay/blob/master/src/test/alphapay.spec.ts) and [live demo](https://demo.alphapay.ca/)
