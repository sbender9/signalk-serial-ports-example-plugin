const util = require('util')

module.exports = function(app) {
  var plugin = {}
  var unsubscribes = []

  plugin.id = "spexample"
  plugin.name = "SP Example"
  plugin.description = "Example seriports list use"

  plugin.schema = function() {
    return new Promise((resolve, reject) => {
      app.getSerialPorts()
        .then(ports => {
          resolve({
            type: "object",
            properties: {
              serialPort: {
                title: "SerialPort",
                type: "string",
                "enum": ports
              }
            }
          })
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  plugin.start = function(options) {
  }

  plugin.stop = function() {
  }

  return plugin
}
