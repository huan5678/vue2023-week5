import {configure, defineRule} from 'vee-validate';
import {required} from '@vee-validate/rules';
import {localize} from '@vee-validate/i18n';

import zh_TW from './locales/zh_TW.json';

defineRule('required', required);

configure({
  generateMessage: localize({
    zh_TW: {
      messages: zh_TW.messages,
    },
  }),
  validateOnInput: true,
});
