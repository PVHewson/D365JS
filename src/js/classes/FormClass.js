import ContextClass from './ContextClass.js';

export default class FormClass extends ContextClass
{
  constructor(context) {
    super(context.getFormContext());
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
}

