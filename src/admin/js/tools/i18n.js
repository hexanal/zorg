export let lang = document.documentElement.getAttribute('lang')

export const t = strings => strings[lang] || '[translation is missing]'
