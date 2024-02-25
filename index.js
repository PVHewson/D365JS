import FormClass from  './src/js/classes/FormClass.js';
import RibbonClass from  './src/js/classes/RibbonClass.js';
import XrmUtilityClass from  './src/js/classes/XrmUtilityClass.js';
import XrmWebApiClass from  './src/js/classes/XrmWebApiClass.js';

String.prototype.StripBraces = function ()
{
    return this.replace(/[{}]/g, "").toLowerCase();
}

export {FormClass, RibbonClass, XrmUtilityClass, XrmWebApiClass};