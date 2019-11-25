import React, { useState } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./modal.scss";

const ScenesList = ({
  img,
  sceneName,
  likes,
  isliked,
  index,
  likeIncrement,
  likeDecrement
}) => {
  const [like, setLike] = useState(isliked);
  const onLikeSelect = _ => {
    setLike(!like);
    if (!like) {
      likeIncrement(index, sceneName);
    } else {
      likeDecrement(index, sceneName);
    }
  };
  return (
    <div>
      <img src={img} alt="SceneImage" />
      <div className="sceneDetails">
        <div>
          <p>{sceneName}</p>
        </div>
        <div className="likeDetails">
          <FontAwesomeIcon
            className="icon"
            onClick={onLikeSelect}
            style={{ color: like ? "blue" : "#000" }}
            icon={faThumbsUp}
          />
          &nbsp;
          <p>{likes}</p>
        </div>
      </div>
    </div>
  );
};

class MovieModal extends React.Component {
  state = {
    like: true
  };
  componentDidMount() {
    document.body.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    document.body.removeEventListener("keydown", this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.keyCode === 27) this.props.closeModal();
  };
  actorsList = actors => {
    let actorsArr = actors.split(", ");
    const actorsList = actorsArr.map(actor => <p>{actor}</p>);
    return actorsList;
  };

  render() {
    const { closeModal, src } = this.props;
    if (!src) {
      return null;
    }
    return (
      <div>
        <div className="modal-overlay" onClick={closeModal}></div>
        <div className="modal">
          <div className="modal-body">
            <a
              href="#"
              className="modal-close"
              onClick={closeModal}
              onKeyDown={this.handleKeyDown}
            >
              &times;
            </a>
            <div className="movieDetails">
              <img src={this.props.src.Poster} />
              <div className="movieSubDetails">
                <h1>{this.props.src.Title}</h1>
                <h3>Actors</h3>
                {this.actorsList(this.props.src.Actors)}
              </div>
            </div>
            <h2>Scene List</h2>
            <div className="movieScenes">
              {this.props.src.scenes.map(s => (
                <ScenesList
                  likeDecrement={this.props.likeDecrement}
                  likeIncrement={this.props.likeIncrement}
                  key={s.sceneName}
                  index={this.props.index}
                  {...s}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({ selectedMovie: state.selectedMovie });
export default connect(mapStateToProps, null)(MovieModal);
