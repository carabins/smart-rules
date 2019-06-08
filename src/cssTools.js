export const setCssVar = (name, value) => {
  if (process.browser) {
    document.documentElement.style.setProperty(name, value)
  }
}
