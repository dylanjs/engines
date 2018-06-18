const callsites = require('callsites');
const getCallsite = (layer) => layer
  .getFileName()
  .replace(/\/[^\/]+$/, '')
  .replace(process.cwd(), '');

module.exports = (opts) => {
  const engine = require(opts.name);
  const engineInstance = engine(opts.opts);
  let render;

  if (opts.name === 'beard') {
    render = engineInstance.render.bind(engineInstance);
  }

  return (template, data, callback) => {
    const path = `${getCallsite(callsites()[2])}/${template}`;
    return render(path, data);
  }
}
