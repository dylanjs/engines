const callsites = require('callsites');

module.exports = (opts) => {
  const engine = require(opts.name);
  const engineInstance = engine(opts.opts);
  let render;

  if (opts.name === 'beard') {
    render = engineInstance.render.bind(engineInstance);
  }

  return (template, data, callback) => {
    const callsitePath = callsites()[2]
      .getFileName()
      .replace(/\/[^\/]+$/, '')
      .replace(opts.opts.root, '');
    const path = `${callsitePath}/${template}`;
    return render(path, data);
  }
}
