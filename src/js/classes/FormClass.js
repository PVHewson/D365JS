export default class FormClass {
  formContext;
  formType;
  userRoles;

  constructor(context) {
      this.formContext = context.getFormContext();
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

  getControl(control) {
      return this.formContext.getControl(control);
  }

  setLabel(control, label) {
      this.getControl(control).setLabel(label);
  }

  getAttribute(name) {
      return this.formContext.getAttribute(name);
  }

  getValue(name) {
      return this.getAttribute(name).getValue();
  }

  setValue(name, value) {
      this.getAttribute(name).setValue(value);

      return this.getAttribute(name)
  }

  setControls(settings, ...controls) {
      controls.forEach(controlName => {
          const control = this.getControl(controlName);
          if (control) {
              if (Object.hasOwn(settings, 'disabled')) control.setValue(settings.disabled);
              if (Object.hasOwn(settings, 'visible')) control.setVisible(settings.visible);
          }
      })
  }

  showControls(...controls) {
      this.setControls({ visible: true }, ...controls)
  }

  hideControls(...controls) {
      this.setControls({ visible: false }, ...controls)
  }

  setAttributes(settings, ...attributes) {
      attributes.map(attributeName => {
          const attribute = this.getAttribute(attributeName);
          if (attribute) {
              if (Object.hasOwn(settings, 'value')) attribute.setValue(settings.value);
              if (Object.hasOwn(settings, 'required')) attribute.setRequiredLevel(settings.required);
          }
      })

      if (Object.hasOwn(settings, 'visible')) this.setControls({ visible: settings.visible }, attributes);
  }

  addOnChange(attribute, callback) {
      this.getAttribute(attribute).addOnChange(callback);
  }

  userHasRole(...securityRoles) {
      if (securityRoles.length > 0) {
          return this.userRoles.filter(r => securityRoles.includes(r.name)).length > 0;
      }
      return false;
  };
}

