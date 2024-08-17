import { loadErrorPage } from '../../scripts/commerce.js';
import { fetchPlaceholders } from '../../scripts/aem.js';
import { getFilm } from '../../scripts/star-wars.js';
import { h, render } from '../../scripts/preact.js';
import htm from '../../scripts/htm.js';
import FilmDetails from './FilmDetails.js';

const html = htm.bind(h);

export default async function decorate(block) {
  if (!window.getFilmPromise) {
    window.getFilmPromise = getFilm(this.props.sku);
  }

  const [film, placeholders] = await Promise.all([
    window.getFilmPromise, fetchPlaceholders()]);

  if (!film) {
    await loadErrorPage();
    return Promise.reject();
  }

  render(html`<${FilmDetails} film=${film} placeholders=${placeholders} />`, block);
}
