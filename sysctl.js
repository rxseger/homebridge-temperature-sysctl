'use strict';

const sysctl = require('sysctl');
const undotpath = require('undotpath');

let Service, Characteristic;

module.exports = (homebridge) => {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory('homebridge-sysctl', 'sysctl', SysctlPlugin);
};

class SysctlPlugin
{
 constructor(log, config) {
    this.log = log;

    // Sensors of interest, mapping sysctl name to Homebridge name
    this.sysctls = config.sysctls || {
      'hw.acpi.thermal.tz1.temperature': 'ACPI TZ1',
      'hw.acpi.thermal.tz0.temperature': 'ACPI TZ0',
      'dev.cpu.7.temperature': 'CPU #7',
      'dev.cpu.6.temperature': 'CPU #6',
      'dev.cpu.5.temperature': 'CPU #5',
      'dev.cpu.4.temperature': 'CPU #4',
      'dev.cpu.3.temperature': 'CPU #3',
      'dev.cpu.2.temperature': 'CPU #2',
      'dev.cpu.1.temperature': 'CPU #1',
      'dev.cpu.0.temperature': 'CPU #0',
    };

    this.sensors = [];
    Object.keys(this.sysctls).forEach((sysctlName) => {
      const name = this.sysctls[sysctlName];
      const subtype = sysctlName; // subtype must be unique per uuid
      const tempSensor = new Service.TemperatureSensor(name, subtype);
      tempSensor
        .getCharacteristic(Characteristic.CurrentTemperature)
        .on('get', this.getTemperature.bind(this, sysctlName));
      this.sensors.push(tempSensor);
    });
  }

  getTemperature(sysctlName, cb) {
    sysctl(sysctlName).then(result => {
        let value = undotpath(result);
        value = parseFloat(value);
        console.log(`got sysctl ${sysctlName} = ${value}`);

        // degrees C
        cb(null, value);
    }).catch(err => cb(err));
  }
  // TODO: other services?

  getServices() {
    return this.sensors;
  }
}
