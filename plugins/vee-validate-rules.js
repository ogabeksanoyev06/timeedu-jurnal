import { defineRule } from 'vee-validate'

export default defineNuxtPlugin(() => {
  // required rule for general fields
  defineRule('required', (value) => {
    if (!value) {
      return "Maydon to'ldirilishi shart!"
    }
    return true
  })

  defineRule('phone', (value) => {
    if (!value || !value.length) {
      return true
    }
    if (!/^\+?\d{9,}$/g.test(value)) {
      return "Telefon raqam to'g'ri formatda emas"
    }
    return true
  })

  // Email validation
  defineRule('email', (value) => {
    if (!value || !value.length) {
      return true
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(value)) {
      return "Email manzilning to'g'ri formatda bo'lishi kerak!"
    }

    return true
  })

  // Checkbox validation
  defineRule('checkboxRequired', (value) => {
    if (!value) {
      return 'Bu maydonni tanlashingiz shart!'
    }
    return true
  })

  // Password format validation
  defineRule('passwordformat', (value) => {
    if (!value || !value.length) {
      return true
    }

    return true
  })

  // Confirmed password validation
  defineRule('confirmed', (value, [target]) => {
    if (value === target) {
      return true
    }
    return 'Parol mos kelmadi!'
  })

  // Integer validation
  defineRule('integer', (value) => {
    if (value === undefined || value === null || value === '') {
      return true
    }
    if (!Number.isInteger(Number(value))) {
      return "Son butun bo'lishi kerak!"
    }
    return true
  })
})
