const callsites = require('callsites');
const getCallsite = (layer) => layer
  .getFileName()
  .replace(/\/[^\/]+$/, '')
  .replace(process.cwd(), '');

module.exports = (opts) => {
  console.log('opts', opts);
  const engine = require(opts.name);
  const engineInstance = engine(opts.opts);
  let render;

  if (opts.name === 'beard') {
    render = engineInstance.render.bind(engineInstance);
  }

  return (template, data, callback) => {
    const path = `${getCallsite(callsites()[2])}/${template}`;
    // console.log('\n');
    // console.log('\n');
    // console.log('path 1', `${getCallsite(callsites()[1])}/${template}`);
    // console.log('path 2', `${getCallsite(callsites()[2])}/${template}`);
    // console.log('path 3', `${getCallsite(callsites()[3])}/${template}`);
    // console.log('\n');
    // console.log('\n');
    // console.log('path', path);
    // console.log('template', template);
    return render(path, data);
  }
}
