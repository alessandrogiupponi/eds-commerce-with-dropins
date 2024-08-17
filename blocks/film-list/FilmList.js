/* eslint-disable object-curly-spacing, class-methods-use-this */
import { h, Component } from '../../scripts/preact.js';
import htm from '../../scripts/htm.js';
import query from '../../tools/film-data/queries/films.graphql.js';
import FilmListItem from './FilmListItem.js';

const html = htm.bind(h);

class FilmList extends Component {
  constructor(props) {
    super(props);
    this.swapiDetails = props.swapiDetails;
    this.state = {
      loading: true,
      films: [],
    };
  }

  componentDidMount() {
    fetch(this.swapiDetails.swapiEndPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        this.setState({
          loading: false,
          films: data.data.allFilms.films,
        });
      });
  }

  render(props, state) {
    if (state.loading) return html`<div>Loading...</div>`;
    return html`<div class="table">
        <div class="table-header">
            <div class="table-header-cell">
                Title
            </div>
            <div class="table-header-cell">
                Director
            </div>
            <div class="table-header-cell">
                Release Date
            </div>
            <div class="table-header-cell">
                Producers
            </div>
        </div>
        <div class="table-body">
            ${state.films.map((film) => html`<${FilmListItem} film=${film} />`)}
        </div>
       </div>`;
  }
}

export default FilmList;
