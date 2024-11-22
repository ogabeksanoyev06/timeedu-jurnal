import useVuelidate from '@vuelidate/core'
import { reactive, ref } from 'vue'

/**
 * useForm funksiyasi, initialValues va validations ni qabul qiladi,
 * va Vuelidate yordamida formani boshqaradi.
 *
 * @param {Object} initialValues - Formdagi boshlang'ich qiymatlar
 * @param {Object} validations - Validation qoidalari
 * @param {Object} [vuelidateConfig] - (ixtiyoriy) Vuelidate konfiguratsiyasi
 * @returns {{ values: Object, $v: Object }} Form qiymatlari va Vuelidate obyekti
 */
export function useForm(initialValues, validations, vuelidateConfig) {
  const values = reactive(initialValues)
  const $v = useVuelidate(validations, values, vuelidateConfig)

  return { values, $v }
}
