import Account from "./Account.js"

var accountQF;

class AccountQuickForm extends Account {
    constructor(context) {
        super(context);
    }
    onSave()
    {
        console.log("Account QuickForm saved");
    }
}

export function OnLoad(context) {
    accountQF = new AccountQuickForm(context);    
}
export function OnSave() {
    accountQF.OnSave();    
}