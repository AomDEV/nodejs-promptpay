# nodejs-promptpay
[![Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/aomdev)<br/>
NodeJS - Promptpay API

## Usage
CRC Library (<a href="https://www.npmjs.com/package/crc16-xmodem">Source</a>)<br/>
```
npm i crc16-xmodem
```

### PromptPay
with Mobile Number
```javascript
const PromptPayObj = require('PromptPay');
var PromptPay = new PromptPayObj();
PromptPay.SetPromptPayType(); // PromptPay (Tag: 29)
PromptPay.SetMobileNumber("0900000000");
PromptPay.SetAmount(10.00); // Amount (Optional)
var Payload = PromptPay.Generate();
```
with National ID or Tax ID
```javascript
const PromptPayObj = require('PromptPay');
var PromptPay = new PromptPayObj();
PromptPay.SetPromptPayType(); // PromptPay (Tag: 29)
PromptPay.SetNationID("0000000000000");
PromptPay.SetAmount(10.00); // Amount (Optional)
var Payload = PromptPay.Generate();
```
with E-Wallet ID
```javascript
const PromptPayObj = require('PromptPay');
var PromptPay = new PromptPayObj();
PromptPay.SetPromptPayType(); // PromptPay (Tag: 29)
PromptPay.SetEWalletID("0000000000000");
PromptPay.SetAmount(10.00); // Amount (Optional)
var Payload = PromptPay.Generate();
```

### Bill Payment
```javascript
const PromptPayObj = require('PromptPay');
var PromptPay = new PromptPayObj();
PromptPay.SetBillPaymentType(); // Bill Payment (Tag: 30)
PromptPay.SetBillerID("BillerID");
PromptPay.SetReference1("Ref1");
PromptPay.SetReference2("Ref2");
PromptPay.SetReference3("Ref3");
PromptPay.SetAmount(10.00); // Amount (Optional)
var Payload = PromptPay.Generate();
```

### Generate Base64 Image
You need to install additional libraries. 
For example, Let’s install node-qrcode library.
```
npm install --save qrcode
```

generating a QR Code function
```javascript
const qrcode = require('qrcode');
const generateQRCode = async text => {
  try {
    return await qrcode.toDataURL(text);
  } catch (err) {
    return err;
  }
}
```

Usage
```javascript
generateQRCode(PromptPay.Generate());
```

<i>Reference: <a href="https://arjunphp.com/create-qr-code-node-js/" target="_blank">arjunphp.com</a></i>


### Methods
Set custom tag type
```javascript
// 30 = Bill Payment
// 29 = PromptPay
// See more : https://www.bot.or.th/Thai/PaymentSystems/StandardPS/Documents/ThaiQRCode_Payment_Standard.pdf
PromptPay.SetCustomTagType(TagType)
```
For QR that can be used multiple times 
```javascript
// reusable
PromptPay.SetStaticQR()
```
For a one-time QR code
```javascript
// one-time
PromptPay.SetDynamicQR()
```
In the case of the shop will show the QR for customers to scan. can be defined by calling
```javascript
PromptPay.SetMerchantPresented()
```
In the case of the customer presents the QR Code for the merchant to scan. can be defined by calling
```javascript
PromptPay.SetCustomerPresented()
```


## Reference
<li>Netway: <a href="https://netway.co.th/kb/blog/news-%26-updates/qr-payment-%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%9A%E0%B8%8A%E0%B8%B3%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A-sme" target="_blank">netway.co.th</a></li>
<li>Bank of Thailand: <a href="https://www.bot.or.th/Thai/PaymentSystems/StandardPS/Documents/ThaiQRCode_Payment_Standard.pdf" target="_blank">bot.or.th</a></li>
<li>Github: <a href="https://github.com/dtinth/promptpay-qr" target="_blank">promptpay-qr (dtinth)</a></li>
<li>Github: <a href="https://github.com/saladpuk/PromptPay" target="_blank">PromptPay (saladpuk)</a></li>
