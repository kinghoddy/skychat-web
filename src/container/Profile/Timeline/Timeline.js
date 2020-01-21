import React from "react";
import classes from "./Timeline.css";
import { Link } from "react-router-dom";

const Timeline = props => {

    var data = { ...props };
    return (
        <div className="container ">
            <div className="row ">
                <div className="col-lg-8 p-0 order-lg-2 px-lg-3">
                    <div className="row no-gutters bg-white">
                        <div className={classes.cover + " col "}>
                            <img src={data.profileData.coverPhoto} alt="cover" />
                            <div className={classes.dp}>
                                <img src={data.profileData.profilePicture} alt="dp" />
                            </div>
                            <h3 className={classes.username}>
                                {!data.isUser ? (
                                    data.profileData.username
                                ) : (
                                        <span>
                                            {data.profileData.username} <small>(You)</small>
                                        </span>
                                    )}
                            </h3>
                        </div>
                    </div>
                    <div className="row bg-white no-gutters">
                        <div className="col-12 px-3 d-flex align-items-center">
                            <i className="material-icons md-36 pr-2">perm_identity</i>
                            <h4 className="mb-0">
                                Friends{" "}
                                <span className="pl-2 font-weight-light">
                                    {data.profileData.friendsData.length}
                                </span>
                            </h4>
                        </div>
                        <div className="col-12 px-3">
                            <div className={classes.horizontal_scroll + " row "}>
                                {data.profileData.friendsData.map(cur => (
                                    <div className="col-4 col-lg-3"
                                        key={cur}
                                    >
                                        <Link
                                            to={"/" + cur.username}
                                            className={classes.friendCard}
                                        // onClick={props.loadProfile}
                                        >
                                            <div className="card-picture bg-secondary rounded-lg overflow-hidden">
                                                <img
                                                    className="card-img-top "
                                                    src={cur.profilePicture}
                                                    alt="cover"
                                                />
                                            </div>
                                            <div style={{ fontSize: ' .9rem ' }} className="card-body p-1">{cur.username}</div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 order-lg-1 bg-white ">
                    <div className="row no-gutters">
                        <div className={" col "}>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima nobis facere dolorem ipsam? Autem optio quas tempora corrupti non vitae totam esse? Est, ipsum fuga. Dolores, ratione. Debitis, sapiente iure?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima nobis facere dolorem ipsam? Autem optio quas tempora corrupti non vitae totam esse? Est, ipsum fuga. Dolores, ratione. Debitis, sapiente iure?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timeline;
