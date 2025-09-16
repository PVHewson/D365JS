import FormClass from  './src/js/classes/FormClass.js';
import RibbonClass from  './src/js/classes/RibbonClass.js';
import XrmUtilityClass from  './src/js/classes/XrmUtilityClass.js';
import XrmWebApiClass from  './src/js/classes/XrmWebApiClass.js';

String.prototype.StripBraces = function ()
{
    return this.replace(/[{}]/g, "").toLowerCase();
}

/**
 * Checks if the string contains only Latin characters, punctuation, numbers, symbols, separators, and optionally emojis.
 * @param {any} allowEmoji
 * @returns
 */
String.prototype.IsLatin = function (allowEmoji=false) {
  if (this.length === 0) {
    return true; // Empty string is considered valid
  }
  const emojiRegex = /[\u{1F600}-\u{1F64F}]/u
  if (emojiRegex.test(this) && !allowEmoji) {
    return false; // Contains emoji, not valid
  }

  return /^[\p{Script=Latin}\p{General_Category=Punctuation}\p{General_Category=Number}\p{General_Category=Symbol}\p{General_Category=Separator}\n]+$/u.test(this);
}

export {FormClass, RibbonClass, XrmUtilityClass, XrmWebApiClass};
