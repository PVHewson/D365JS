import ContextClass from './ContextClass.js';

export default class FormClass extends ContextClass
{
  formType;

  constructor(context) {
    super(context.getFormContext());
    this.formType = this.formContext.ui.getFormType();
    this.formContext.ui.tabs.forEach(
          tab =>
              tab.addTabStateChange(
                  executionContext => {
                      const formContext = executionContext.getFormContext();
                      if (formContext.ui.tabs.get(executionContext._eventSource._controlName).getDisplayState() === 'expanded') {
                          this.formContext = formContext;
                      }
                  }
              ).bind(this)
      )
  }

  isCreateEvent() {
      return this.formType == 1;
  }
}

