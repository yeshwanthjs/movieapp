import React from "react";
import MovieModal from "../movieModal";
import { connect } from "react-redux";
import "./movieGallery.scss";
import { getMovies } from "../../actions/getMoviesAction";
import { likeIncrement, likeDecrement } from "../../actions/likesAction";

class MovieGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentIndex: null };
  }

  componentDidMount() {
    this.props.getMovies();
  }
  renderImageContent = (src, index) => {
    return (
      <div key={src.Title} onClick={e => this.openModal(e, index)}>
        <img src={src.Poster} alt="MovieImage" key={src} />
      </div>
    );
  };
  openModal = (e, index) => {
    this.setState({ currentIndex: index });
  };
  closeModal = e => {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState({ currentIndex: null });
  };

  render() {
    const { fetching, list } = this.props;
    return (
      <div className="gallery-container">
        <div className="gallery-grid">
          {!fetching && list.map(this.renderImageContent)}
        </div>
        {!fetching && (
          <MovieModal
            closeModal={this.closeModal}
            index={this.state.currentIndex}
            src={list[this.state.currentIndex]}
            likeDecrement={this.props.likeDecrement}
            likeIncrement={this.props.likeIncrement}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  const {
    getMovies: { list, fetching }
  } = state;
  return {
    list,
    fetching
  };
};
const mapDispatchToProps = dispatch => ({
  getMovies: result => dispatch(getMovies(result)),
  likeIncrement: (index, sceneName) =>
    dispatch(likeIncrement(index, sceneName)),
  likeDecrement: (index, sceneName) => dispatch(likeDecrement(index, sceneName))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieGallery);
