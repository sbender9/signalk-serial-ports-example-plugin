const util = require('util')

module.exports = function(app) {
  var plugin = {}
  var unsubscribes = []

  plugin.id = "spexample"
  plugin.name = "SP Example"
  plugin.description = "Example seriports list use"

  plugin.schema = function() {
    const schema = {
      type: "object",
      properties: {
        serialPort: {
          title: "SerialPort",
          type: "string",
        }
      }
    }
    return new Promise((resolve, reject) => {
      app.getSerialPorts()
        .then(ports => {
          schema.properties.serialPort.enum = ports
          resolve(schema)
        })
        .catch(err => {
          resolve(schema)
        })
    })
  }

  plugin.start = function(options) {
  }

  plugin.stop = function() {
  }

  return plugin
}
