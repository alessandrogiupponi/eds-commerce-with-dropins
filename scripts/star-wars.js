/* eslint-disable import/prefer-default-export, import/no-cycle */
import filmsGraphqlQuery from '../tools/film-data/queries/films.graphql.js';
import filmGraphql from '../tools/film-data/queries/film.graphql.js';
import { getConfigValue } from './configs.js';

export async function performSwapiQuery(swapiQuery, swapiVariables) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  return fetch(await getConfigValue('swapi-endpoint'), {
    method: 'POST',
    headers,
    body: swapiVariables ? JSON.stringify({
      query: swapiQuery,
      variables: swapiVariables,
    }) : JSON.stringify({
      query: swapiQuery,
    }),
  }).then((response) => {
    if (!response.ok) {
      return null;
    }
    return response.json();
  }).then((data) => data);
}

export async function getFilms() {
  return performSwapiQuery(filmsGraphqlQuery).then((filmsData) => {
    if (!filmsData?.data?.allFilms?.films) {
      return null;
    }

    return filmsData?.data?.allFilms?.films;
  });
}

export function getFilmIDFromUrl() {
  const path = window.location.pathname;
  const result = path.match(/\/films\/film\/([\w|-]+)$/);
  return result?.[1].replaceAll('-', '=');
}

const filmCache = {};
export async function getFilm(sku) {
  if (filmCache[sku]) {
    return filmCache[sku];
  }
  const filmPromise = performSwapiQuery(filmGraphql, { filmId: sku }).then((filmData) => {
    if (!filmData?.data?.film) {
      return null;
    }

    return filmData?.data?.film;
  });

  filmCache[sku] = filmPromise;
  return filmPromise;
}
