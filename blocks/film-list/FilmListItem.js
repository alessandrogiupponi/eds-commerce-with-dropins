/* eslint-disable object-curly-spacing, class-methods-use-this */
import { h, Component } from '../../scripts/preact.js';
import htm from '../../scripts/htm.js';

const html = htm.bind(h);

class FilmListItem extends Component {
  constructor(props) {
    super(props);
    this.director = props.film.director;
    this.title = props.film.title;
    this.releaseDate = props.film.releaseDate;
    this.producers = props.film.producers;
    this.id = props.film.id;
  }

  clicked(id) {
    window.location.href = `/films/film/${id.replaceAll('=', '-')}`;
  }

  render() {
    return html`<div class="table-row">
            <div class="table-body-cell clickable" onclick=${() => this.clicked(this.id)}>${this.title}</div>
            <div class="table-body-cell">${this.director}</div>
            <div class="table-body-cell">${this.releaseDate}</div>
            <div class="table-body-cell">
                ${this.producers.map((producer) => html`<div>${producer}</div>`)}
            </div>
        </div>`;
  }
}

export default FilmListItem;
