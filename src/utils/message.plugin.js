export default {
    install: (app, options) => {
        app.config.globalProperties.$message = (text) => {
            M.toast({html: text})
        }
    
        app.config.globalProperties.$eMessage = (text) => {
        M.toast({html: `[Error]: ${text}` })
        }
  }
}