import { h, Component } from '../../scripts/preact.js';
import htm from '../../scripts/htm.js';

const html = htm.bind(h);

class FilmDetails extends Component {
  constructor(props) {
    super(props);
    this.film = props.film;
  }

  render() {
    return html`<div>
        <h1>${this.film.title}</h1>by ${this.film.director}
        <div class="quote">
            <blockquote>${this.film.openingCrawl}</blockquote>
        </div>
    </div>`;
  }
}

export default FilmDetails;
