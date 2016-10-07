'use strict';

const sysctl = require('sysctl');
const undotpath = require('undotpath');

const keys = {
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

sysctl('dev.cpu.0.temperature')
.then(r => console.log(undotpath(r)));

