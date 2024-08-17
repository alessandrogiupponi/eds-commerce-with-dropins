export default `query FilmQuery($filmId: ID) {
  film(id: $filmId) {
    director
    openingCrawl
    title
    producers
    planetConnection {
      planets {
        name
        id
      }
    }
    characterConnection {
      characters {
        name
        id
      }
    }
    speciesConnection {
      species {
        name
        id
      }
    }
    starshipConnection {
      starships {
        name
        id
      }
    }
    vehicleConnection {
      vehicles {
        name
        id
      }
    }
  }
}`;
