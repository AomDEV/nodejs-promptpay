/**
 * 
 * Developed by @AOM
 * https://github.com/AomDEV/nodejs-promptpay
 * 
 * **/

const crc16 = require('crc');
class PromptPay{

    Version = {Tag:"00",Value:"01"};

    TagType = 30;
    IsCustomerPresented = true;
    IsDomesticMerchant = true;
    InitialMethod = "11";
    CurrencyCode = "764";
    CountryCode = "TH";

    // Bill Payment
    BillerID = null;
    Reference1 = null;
    Reference2 = null;
    Reference3 = null;

    // PromptPay
    MobileNumber = null;
    NationID = null;
    eWalletID = null;
    BankAccount = null;

    Amount = null;
    SetMobileNumber(Mobile){
        this.MobileNumber = Mobile;
    }
    SetNationID(NationID){
        this.NationID = NationID;
    }
    SetEWalletID(eWalletID){
        this.eWalletID = eWalletID;
    }
    SetBankAccount(BankAccount){
        this.BankAccount = BankAccount;
    }
    SetCountryCode(CountryCode){
        this.CountryCode = CountryCode;
    }
    SetCurrencyCode(CurrencyCode){
        this.CurrencyCode = CurrencyCode;
    }
    SetCustomerPresented(){
        this.IsCustomerPresented = true;
    }
    SetMerchantPresented(){
        this.IsCustomerPresented = false;
    }
    SetDomesticMerchant(){
        this.IsDomesticMerchant = true;
    }
    SetCrossBorderMerchant(){
        this.IsDomesticMerchant = false;
    }
    SetStaticQR(){
        this.InitialMethod = "11";
    }
    SetDynamicQR(){
        this.InitialMethod = "12";
    }
    SetTagType(Type){
        this.TagType = 30;
    }
    SetBillerID(BillerID){
        this.BillerID = BillerID;
    }
    SetReference1(Ref1){
        this.Reference1 = Ref1;
    }
    SetReference2(Ref2){
        this.Reference2 = Ref2;
    }
    SetReference3(Ref3){
        this.Reference3 = Ref3;
    }
    SetAmount(Amount){
        this.Amount = Amount;
    }
    StandardFormat(Obj,Size = 2){
        if(Array.isArray(Obj.Value)) Obj.Value = Obj.Value.join("");
        var Tag = ('0000'+Obj.Tag).slice(-1 * Size);
        var Length = ('0000'+(Obj.Value.length)).slice(-2);
        var Value = ('0000'+Obj.Value).slice(-1 * Obj.Value.length);
        return Tag + Length + Value;
    }
    GenerateTerminalID(){
        var Payload = [];
        Payload.push(this.StandardFormat({Tag: "07", Value: this.Reference3}));
        return Payload;
    }
    GenerateIdentity(){
        var Payload = [];
        if(this.TagType === 30){
            // Bill Payment
            Payload.push(this.StandardFormat({Tag: "00", Value: ((this.IsDomesticMerchant)?"A000000677010112":"A000000677012006")}));
            Payload.push(this.StandardFormat({Tag: "01", Value: this.BillerID}));
            Payload.push(this.StandardFormat({Tag: "02", Value: this.Reference1}));
            Payload.push(this.StandardFormat({Tag: "03", Value: this.Reference2}));
        } else{
            // PromptPay
            Payload.push(this.StandardFormat({Tag: "00", Value: ((this.IsCustomerPresented)?"A000000677010114":"A000000677010111")}));
            if(this.MobileNumber !== null) Payload.push(this.StandardFormat({Tag: "01", Value: this.MobileNumber}));
            if(this.NationID !== null) Payload.push(this.StandardFormat({Tag: "02", Value: this.NationID}));
            if(this.eWalletID !== null) Payload.push(this.StandardFormat({Tag: "03", Value: this.eWalletID}));
            if(this.BankAccount !== null) Payload.push(this.StandardFormat({Tag: "04", Value: this.BankAccount}));
        }
        return Payload;
    }
    Generate(){
        var Payload = [];
        // Release Version of QR
        Payload.push(this.StandardFormat(this.Version));
        // Initial Method
        Payload.push(this.StandardFormat({Tag:"01", Value:this.InitialMethod}));
        // Information to identity merchant
        Payload.push(this.StandardFormat({Tag:this.TagType, Value:this.GenerateIdentity()}));
        // Country Code
        Payload.push(this.StandardFormat({Tag:"58", Value:this.CountryCode}));
        // Amount
        if(this.Amount !== null) Payload.push(this.StandardFormat({Tag:"54", Value:this.Amount.toFixed(2)}));
        // Currency Code
        Payload.push(this.StandardFormat({Tag:"53", Value:this.CurrencyCode}));
        // Additional Data
        if(this.Reference3 !== null) Payload.push(this.StandardFormat({Tag: "62", Value: this.GenerateTerminalID()}));
        // CRC
        var PayloadRaw = Payload.join("");
        var CRCRaw = PayloadRaw + "6304";
        Payload.push(this.StandardFormat({Tag: "63", Value: crc16.crc16xmodem(CRCRaw, 0xffff).toString(16).toUpperCase()}));

        return Payload.join("");
    }
}
module.exports = PromptPay;