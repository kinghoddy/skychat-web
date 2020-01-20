import React from "react";
import classes from "./Timeline.css";
import { Link } from "react-router-dom";
import Avatar from "../../../assets/Image/avatar.png";

const Timeline = props => {
    console.log(props);

    var data = { ...props };

    return (
        <div className="container ">
            <div className="row ">
                <div className="col-lg-4 bg-success ">
                    <div className="row no-gutters">
                        <div className={" col "}></div>
                    </div>
                </div>
                <div className="col-lg-8 p-0 px-lg-3">
                    <div className="row no-gutters bg-white">
                        <div className={classes.cover + " col "}>
                            <img src={data.profileData.coverPhoto} alt="cover" />
                            <div className={classes.dp}>
                                <img src={data.profileData.profilePicture} alt="dp" />
                            </div>
                            <h4 className={classes.username}>
                                {!data.isUser ? (
                                    data.profileData.username
                                ) : (
                                        <span>
                                            {data.profileData.username} <small>( You )</small>
                                        </span>
                                    )}
                            </h4>
                        </div>
                    </div>
                    <div className="row bg-white no-gutters">
                        <div className="col-12 px-3 d-flex align-items-center">
                            <i className="material-icons md-36 pr-2">perm_identity</i>
                            <h4 className="mb-0">
                                Friends{" "}
                                <span className="pl-2 font-weight-light">
                                    {data.profileData.friendsId.length}
                                </span>
                            </h4>
                        </div>
                        <div className="col-12 px-3">
                            <div className={classes.horizontal_scroll + " row "}>
                                {data.profileData.friendsId.map(cur => (
                                    <div className="col-4 col-lg-2"
                                        key={cur}
                                    >
                                        <Link
                                            to={"/dunmilade"}
                                            className={classes.friendCard}
                                        >
                                            <div className="card-picture bg-secondary">
                                                <img
                                                    className="card-img-top"
                                                    src={Avatar}
                                                    alt="cover"
                                                />
                                            </div>
                                            <div className="card-body p-1">username</div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timeline;
