// @ts-ignore
import { extend } from 'vee-validate';
import { required, alpha, digits, min, max, regex, email } from 'vee-validate/dist/rules';

extend('digits', {
  ...digits,
  message: '{_field_} needs to be {length} digits. ({_value_})',
});

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
});

extend('min', {
  ...min,
  message: '{_field_} may not be less than {length} characters',
});

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
});

extend('regex', {
  ...regex,
  message: '{_field_} {_value_} does not match {regex}',
});

extend('email', {
  ...email,
  message: 'Email must be valid',
});

extend('password', {
  params: ['target'],
  validate(value, targetObj) {
    const { target } = targetObj as { target: string };
    return value === target;
  },
  message: 'Password confirmation does not match',
});
