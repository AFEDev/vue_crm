export default {
    install: (app, options) => {
        app.config.globalProperties.$message = (text) => {
            M.toast({html: text})
        }
    
        app.config.globalProperties.$message = (text) => {
        M.toast({html: `[Error]: ${html}` })
        }
  }
}