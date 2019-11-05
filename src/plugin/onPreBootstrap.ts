import * as fs from 'fs-extra';

export function onPreBootstrap ({ store, reporter }) {
  const activity = reporter.activityTimer('awesome-i18next: copy redirect component');
  activity.start();

  const program = store.getState().program;

  const module = `
      const { Redirect } = require('@dontepsu/gatsby-plugin-awesome-i18next');
      module.exports = Redirect;
  `;

  const dir = `${program.directory}/.cache/awesome-i18next`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(`${dir}/redirect.js`, module);

  activity.end();
}
