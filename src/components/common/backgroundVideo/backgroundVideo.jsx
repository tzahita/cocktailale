import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './BackgroundVideo.module.css';

const BackgroundVideo = () => {
  return (
    <div className="row">
      <div className=" col-md-12 col-sm-12">
        <div className={classes.Container}>
          <video
            autoPlay="autoplay"
            loop="loop"
            muted
            className={classes.Video}
          >
            <source
              src={require('../../../img/coverr-cocktail7-0026.mp4')}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          <div className={classes.Content}>
            <div className={classes.SubContent}>
              <h1 className="col-md-12" className={classes.title}>
                CocktaiLale
              </h1>
              <p className="col-md-12">Learn how to make spical cocktails!</p>
              <NavLink to={'/getStarted'} className=" col-md-12" href="/">
                <button
                  type="button"
                  className="btn btn-outline-dark pr-5 pl-5"
                >
                  Get Started
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundVideo;
