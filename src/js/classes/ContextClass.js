export default class ContextClass {
  formContext;
  formType;
  userRoles;

  static RequiredState(required)
  {
      return required === true || required == 'required' ? 'required' : 'none';
  }

  constructor(formContext) {
    this.formContext = formContext;
  }

  get allAttributes() {
    return this.formContext.getData().getEntity().attributes.getAll();
  }

  get allControls() {
    return this.formContext.ui.controls.getAll();
  }

  get allAttributeNames() {
    return this.allAttributes.map((a) => a.getName());
  }

  getAttribute(name) {
    return this.formContext.getAttribute(name);
  }

  getControl(control) {
    return this.formContext.getControl(control);
  }

  getTab(tabName) {
    return this.formContext.ui.tabs.get(tabName);
  }

  getValue(name) {
    return this.getAttribute(name)?.getValue();
  }
  setAttributes(settings, ...attributes) {
    for (const attributeName of attributes) {
      const attribute = this.getAttribute(attributeName);
      if (attribute) {
        if (Object.hasOwn(settings, "value"))
          attribute.setValue(settings.value);
        if (Object.hasOwn(settings, "required"))
          attribute.setRequiredLevel(
            ContextClass.RequiredState(settings.required)
          );
        if (Object.hasOwn(settings, "disabled"))
          attribute.controls.forEach((c) => {
            c.setDisabled(settings.disabled);
          });

        if (Object.hasOwn(settings, "visible"))
          attribute.controls.forEach((c) => {
            c.setVisible(settings.visible);
          });
      }
    }
  }

  setControls(settings, ...controls) {
    controls.forEach((ctrl) => {
      const control = typeof ctrl == "string" ? this.getControl(ctrl) : ctrl;
      if (control) {
        if (Object.hasOwn(settings, "disabled") && control.getDisabled) {
          control.setDisabled(settings.disabled);
        }
        if (Object.hasOwn(settings, "visible")) {
          control.setVisible(settings.visible);
        }
      }
    });
  }

  setTabs(settings, ...tabs) {
    tabs.forEach((tab) => {
      const control = typeof tab == "string" ? this.getTab(tab) : tab;
      if (control) {
        if (Object.hasOwn(settings, "disabled") && control.getDisabled) {
          control.setDisabled(settings.disabled);
        }
        if (Object.hasOwn(settings, "visible")) {
          control.setVisible(settings.visible);
        }
      }
    });
  }

  setLabel(control, label) {
    this.getControl(control)?.setLabel(label);
  }

  setValue(name, value) {
    this.getAttribute(name)?.setValue(value);

    return this.getAttribute(name);
  }

  showControls(...controls) {
    this.setControls({ visible: true }, ...controls);
  }

  hideControls(...controls) {
    this.setControls({ visible: false }, ...controls);
  }

  addOnChange(attribute, callback) {
    this.getAttribute(attribute).addOnChange(callback);
  }

  addOnSave(callback) {
    this.formContext.data.entity.addOnSave(callback);
  }

  addOnPostSave(callback) {
    this.formContext.data.entity.addOnPostSave(callback);
  }

  addPreSearch(callback, ...attributes) {
    attributes.forEach((attribute) =>
      this.getControl(attribute)?.addPreSearch(callback)
    );
  }
}
