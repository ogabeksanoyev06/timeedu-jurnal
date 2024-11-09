export const clearSpaces = (text) => {
  return text.replaceAll(' ', '')
}

export const removePhonePrefix = (phone) => {
  return clearSpaces(phone.startsWith('+998') ? phone.slice(4) : phone)
}

export const getInitials = (firstName, lastName) => {
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : ''
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : ''
  return firstInitial + lastInitial
}
