import React from "react";

const WorkshopContext = React.createContext();

export const WorkshopComsumer = WorkshopContext.Consumer;

export function WorkshopConnect(params = []) {
  return function WorkShopConnectedComponent(Component) {
    return function ConnectedComponentParameter(props) {
      return (
        <WorkshopComsumer>
          {state => {
            let requestedState = {};
            params.forEach(param => {
              if (state[param] !== undefined) {
                requestedState[param] = state[param];
              }
            });
            return <Component {...props} {...requestedState} />;
          }}
        </WorkshopComsumer>
      );
    };
  };
}

export class WorkshopProvider extends React.Component {
  state = {
    banners: null,
    genres: null
  };

  getSpecificBanner = bannerId =>
    this.state.banners.find(({ id }) => id === bannerId);

  getSpecificGenre = genreId =>
    this.state.genres.find(({ id }) => id === genreId);

  setBanners = banners => this.setState({ banners });

  setGenres = genres => this.setState({ genres });

  getBanners = () => this.state.banners;

  getGenres = () => this.state.genres;

  render() {
    return (
      <WorkshopContext.Provider
        value={{
          genres: this.state.genres,
          banners: this.state.banners,
          getSpecificGenre: this.getSpecificGenre,
          getSpecificBanner: this.getSpecificBanner,
          setBanners: this.setBanners,
          setGenres: this.setGenres,
          getBanners: this.getBanners,
          getGenres: this.getGenres
        }}
      >
        {this.props.children}
      </WorkshopContext.Provider>
    );
  }
}
