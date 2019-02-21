const callsites = require('callsites');
const { dirname, resolve } = require('path');

module.exports = (opts) => {
  const engine = require(opts.name);
  const engineInstance = engine(opts.opts);
  let render;

  if (opts.name === 'beard') {
    render = engineInstance.render.bind(engineInstance);
  }

  return {
    instance: engineInstance,
    render: (template, data, callback) => {
      const from = callsites()[2].getFileName();
      const fromDir = dirname(from);
      const path = resolve(fromDir, template.replace(/^~/, '.'));
      return render(path, data);
    }
  }
}
