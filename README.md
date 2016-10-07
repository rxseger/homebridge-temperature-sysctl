# homebridge-temperature-sysctl

`sysctl` system/CPU temperature plugin for [Homebridge](https://github.com/nfarina/homebridge)

Tested on FreeBSD using the [coretemp](https://www.freebsd.org/cgi/man.cgi?coretemp) Intel Core on-die
digital thermal sensor driver, but this plugin is sufficiently generic it should work on any system
which exposes temperatures over sysctl.

## Installation

1.	Install Homebridge using `npm install -g homebridge`
2.	Install this plugin `npm install -g homebridge-sysctl`
3.	Update your configuration file - see below for an example

## Configuration

* `accessory`: "temperature-sysctl"
* `name`: descriptive name
* `sysctls`: an object mapping the sysctl names to Homebridge names

Example configuration:

```json
    "accessories": [
	{
		"accessory": "temperature-sysctl",
		"name": "temperature-sysctl",
		"sysctls": {
		      "hw.acpi.thermal.tz1.temperature": "ACPI TZ1",
		      "hw.acpi.thermal.tz0.temperature": "ACPI TZ0",
		      "dev.cpu.7.temperature": "CPU #7",
		      "dev.cpu.6.temperature": "CPU #6",
		      "dev.cpu.5.temperature": "CPU #5",
		      "dev.cpu.4.temperature": "CPU #4",
		      "dev.cpu.3.temperature": "CPU #3",
		      "dev.cpu.2.temperature": "CPU #2",
		      "dev.cpu.1.temperature": "CPU #1",
		      "dev.cpu.0.temperature": "CPU #0"
	    }
	}
    ]
```

A TemperatureSensor service will be created for each sysctl.

## License

MIT

