import {Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure} from "vee-validate";
import { required, min, max, alpha_spaces as alphaSpaces, email, confirmed } from "@vee-validate/rules"

export default {
    install(app) {
        app.component("VeeForm", VeeForm);
        app.component("VeeField", VeeField);
        app.component("ErrorMessage", ErrorMessage);

        defineRule('required', required);
        defineRule('min', min);
        defineRule('max', max);
        defineRule('alphaSpaces', alphaSpaces);
        defineRule('email', email);
        defineRule('confirmed', confirmed);

        configure ({
            generateMessage: (ctx)=> {
                const messages = {
                    required: `The field ${ctx.field} is required. Please eneter the valid ${ctx.field}.`,
                    min: `Please try again. The field ${ctx.field} must have at least 8 characters.`,
                    max: `Please enter the value of the field ${ctx.field} that is not longer than 100 characters.`,
                    alpha_spaces: `The field ${ctx.field} may contain only alphabetical characters and spaces. Please try again.`,
                    email: `Please eneter valid ${ctx.field}.`,
                    termsOdService: `Please try again. When you accept Terms registration will proceed.`,
                    confirmed: `Password and confirmed password must be exacly the same. Please try again.`
                }
                const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is invalid.`;
                return message;
            }
        })
    }
}