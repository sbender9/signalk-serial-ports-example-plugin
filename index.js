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
          title: "Serial Port",
          type: "string",
        },
        manualSerialPort: {
          title: "Manual Serial Port",
          type: "string",
        }
      }
    }
    return new Promise((resolve, reject) => {
      app.getSerialPorts()
        .then(ports => {
          schema.properties.serialPort.enum = [ '[Enter Manually]', ...ports.serialports.map(port=> port.path) ]
          schema.properties.serialPort.enumNames = [ '[Enter Manually]', ...ports.serialports.map(port => `${port.path} ${port.manufacturer || ""}`)]
          resolve(schema)
        })
        .catch(err => {
          console.error(err)
          resolve(schema)
        })
    })
  }

  plugin.start = function(options) {
    const port = options.serialPort === '[Enter Manually]' ? options.manualSerialPort : options.serialPort
    app.debug('Serial Port is %s', port)
  }

  plugin.stop = function() {
  }

  return plugin
}
