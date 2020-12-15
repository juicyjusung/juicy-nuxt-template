import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Validation extends Vue {
  required = (propertyType: string) => {
    return (v: string) => (v && v.length > 0) || `You must input a ${propertyType}`;
  };

  minLength = (propertyType: string, minLength: number) => {
    return (v: string) => (v && v.length >= minLength) || `${propertyType} must be at least ${minLength} characters`;
  };

  maxLength = (propertyType: string, maxLength: number) => {
    return (v: string) => (v && v.length <= maxLength) || `${propertyType} must be less than ${maxLength} characters`;
  };

  emailFormat = () => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,24})+$/;
    return (v: string) => (v && regex.test(v)) || 'Must be a valid email';
  };
}
