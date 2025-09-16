import Account from "./Account.js"

var accountForm;

class AccountForm extends Account {
    constructor(context) {
        super(context);
        this.setValue('name', 'Temporary name set by JS');
        this.addOnChange('websiteurl', ()=>accountForm.setValue('tickersymbol', 'D365'));
    }

    OnSave()
    {
        console.log("Account Form OnSave method has been triggered");
    }
    
    ensureFieldsAreLatin(fields = []) {
      if (!Array.isArray(fields) || fields.length === 0) {
        fields = this.formContext.getAttribute().map(a => a.getName());
      }

      fields.forEach(field => {
        this.getAttribute(field).addOnChange(() => {
          const value = this.getValue(field);
          if (value && typeof value === 'string' && !value.IsLatin()) {
            this.getAttribute(field).setIsValid(false, "Please use only Latin characters (a-z, A-Z)");
          }
        });
      });
    }
}

export function OnLoad(context) {
    accountForm = new AccountForm(context);    
}
export function OnSave() {
    accountForm.OnSave();    
}
