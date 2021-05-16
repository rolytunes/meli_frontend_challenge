const LocalStorage = {
    
  setItem: (key: string, value: string) => {
    window.localStorage.setItem(key, value)
  },

  getItem: (key: string) => {
    return window.localStorage.getItem(key)
  },

  clearAll: () => {
    window.localStorage.clear()
  },

  removeItem: (key: string) => {
    window.localStorage.removeItem(key)
  }
}

export default LocalStorage
