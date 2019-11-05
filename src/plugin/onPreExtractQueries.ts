import * as fs from 'fs-extra';

export async function onPreExtractQueries ({ store }) {
  const program = store.getState().program;
  await fs.copy(
    require.resolve(`../../fragments/fragments.js`),
    `${program.directory}/.cache/fragments/awesome-i18next/fragments.js`,
  );
}
