import { getConfigValue } from '../../scripts/configs.js';
import filmsGraphql from '../../tools/film-data/queries/films.graphql.js';
import { readBlockConfig } from '../../scripts/aem.js';
import { h, render } from '../../scripts/preact.js';
import htm from '../../scripts/htm.js';
import FilmList from './FilmList.js';

const html = htm.bind(h);

export default async function decorate(block) {
  const config = readBlockConfig(block);
  const swapiDetails = {
    swapiEndPoint: await getConfigValue('swapi-endpoint'),
  };

  render(html`<${FilmList} ...${config} block=${block} swapiDetails=${swapiDetails} />`, block);
}
