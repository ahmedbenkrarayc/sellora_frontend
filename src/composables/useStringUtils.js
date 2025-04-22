export function useStringUtils(){
    const uppercaseFirstLetter = (str) => {
      if (!str) return ''
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  
    return {
        uppercaseFirstLetter
    }
}
  