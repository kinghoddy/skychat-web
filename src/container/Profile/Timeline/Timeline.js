import React, { Component } from "react";
import classes from "./Timeline.css";
import { withRouter, Link } from "react-router-dom";
import firebase from "../../../firebase";
import "firebase/auth";
import "firebase/storage";
import Spinner from "../../../component/UI/Spinner/Spinner";
import Friends from "../../../component/Friends/Friends";
import Request from "../../../component/Friends/Request";
import Alert from "../../../component/UI/Alert/Alert";
import Post from '../../../component/Posts/Posts';
import NewPost from '../../../component/Forms/NewPost/NewPost';
import play from '../../../component/Audio/Audio'

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.progBar = React.createRef()
  }
  state = {
    profileData: {
      username: "",
      coverPhoto: "",
      uid: null
    },

    isUser: false,
    loading: false,
    profile: "",
    errorMessage: null,
    changeStyle: false,
<<<<<<< HEAD
    modalMessage: null,
    postTitle: "",
    postBody: "",
    type: null
=======
    showPostForm: true,
    modalMessage: null,
    postTitle: "",
    postBody: "",
    type: null,
    src: null
>>>>>>> 3133f985b69791eda1883a2f7977345286f0d432
  };

  componentDidMount() {
    this.load(this.props.profile);

    var metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", ' #171e25');
  }
  titleChanged = e => {
    this.setState({
      postTitle: e.target.value
    })
  }
  bodyChanged = e => {
    this.setState({
      postBody: e.target.value
    })
  }

  componentDidUpdate() {
    if (this.props.match.params.profile !== this.state.profile) {
      this.setState({ profile: this.props.match.params.profile });
      this.load(this.props.match.params.profile);
    }
  }
  sendPost = e => {
    this.setState({ play: null })
    e.preventDefault();
    var Post = {
      title: this.state.postTitle,
      icon: this.state.profileData.profilePicture,
      username: this.state.profileData.username,
      body: this.state.postBody.split("\n").join("<br/>"),
      type: this.state.type,
      date: Date.now(),
<<<<<<< HEAD
      uid: this.state.profileData.uid
    }
    firebase.database().ref('posts/')
      .push(Post).then(res => {

        play('success')
      })
    this.setState({ postBody: '', postTitle: "" })
  }

  upload = (types) => {
    const type = types
    // File or Blob named mountains.jpg
    // this.setState({ loading: true, message: "Uploading image" })
    var files = document.createElement('input')

    files.click()
    files.onchange = e => {
      const storageRef = firebase.storage().ref('/' + this.state.userData.username.toLowerCase())

      const file = files.files[0];

      const uploadTask = storageRef.child(type + "/" + file.name).put(file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        this.setState({ loading: false })
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        var progressMessage = 'Upload is ' + Math.floor(progress) + '% Done. (' + (snapshot.totalBytes / 1000000).toFixed(2) + ' mb) '
        this.setState({ progressMessage: progressMessage })
        this.progBar.current.style.width = progress + '%'
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            this.setState({ progressMessage: 'Upload is paused' })

            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            break;
          default:
            break;
        }
      }, (error) => {
        this.setState({ loading: false })
=======
      src: this.state.src,
      uid: this.state.profileData.uid
    }
    if (!Post.tittle && !Post.body && !Post.src) {

      this.setState({ error: 'Type something or pick a media to upload a post' })
    } else {

      firebase.database().ref('posts/')
        .push(Post).then(res => {
          play('success')
        })
      this.setState({ postBody: '', postTitle: "", src: null, type: null, error: null })
    }
  }

  upload = (type) => {

    var files = document.createElement('input')
    files.type = 'file'
    if (type === 'images') {
      files.accept = 'image/*'
    } else {
      files.accept = 'video/*'
    }
    this.setState({ showPostForm: false })
    files.click()
    files.onchange = e => {
      console.log(files);
      const storageRef = firebase.storage().ref('/' + this.state.profileData.username.toLowerCase())
>>>>>>> 3133f985b69791eda1883a2f7977345286f0d432

        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            this.setState({
              error: "You don't have permission to access the object"
            })
            break;
          case 'storage/canceled':
            this.setState({ error: "Upload canceled" })
            break;
          case 'storage/unknown':
            this.setState({ error: "Unknown error occurred" })
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            this.setState({ error: "Unknown error occurred" })
            break;
        }
      }, () => {
        this.setState({ loading: true, progressMessage: null })

        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          firebase.database().ref('users/' + this.state.userData.uid + "/" + type)
            .set(downloadURL).then(cur => {
              this.setState({ loading: false })
            }).catch(err => {
              this.setState({ loading: false, error: err })
              console.log(err);
            });
          var user = firebase.auth().currentUser;

          if (type === 'profilePicture') {
            user.updateProfile({
              photoURL: downloadURL
            }).catch(function (error) {
              this.setState({ error: error })
              // An error happened.
            })
          }
        });

      })
    }
  }

      const file = files.files[0];

      if (file.size > 1000000 * 10) {
        alert('File to big \n Maximum file size is 10mb')
        this.setState({ showPostForm: true })

      } else {
        const uploadTask = storageRef.child(type + "/" + file.name).put(file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          var progressMessage = 'Upload is ' + Math.floor(progress) + '% Done. (' + (snapshot.totalBytes / 1000000).toFixed(2) + ' mb) '
          this.setState({ progressMessage: progressMessage })
          this.progBar.current.style.width = progress + '%'
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              this.setState({ progressMessage: 'Upload is paused' })

              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              break;
          }
        }, (error) => {
          this.setState({ showPostForm: true })
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              this.setState({
                error: "You don't have permission to access the object"
              })
              break;
            case 'storage/canceled':
              this.setState({ error: "Upload canceled" })
              break;
            case 'storage/unknown':
              this.setState({ error: "Unknown error occurred" })
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.setState({ showPostForm: true, progressMessage: null })
            this.setState({ type: type, src: downloadURL.replace(file.name, file.name.split('.').join('_400x400.')) })
            console.log(this.state.src, downloadURL);


          });

        })
      }
    }
  }

  load = uname => {
    this.setState({ loading: true });
    var ref = firebase.database().ref("users/");
    ref.on("value", s => {
      var userExist = false;
      if (uname) {
        document.title = uname + " | Skychat";

        var username = uname.toLowerCase();
        for (let keys in s.val()) {
          // fetch the profile data
          if (username === s.val()[keys].username) {
            userExist = true;
            const profiledata = {
              ...this.state.profileData
            };
            for (let key in s.val()[keys]) {
              profiledata[key] = s.val()[keys][key];
            }
            profiledata.uid = keys;

            this.setState({
              profileData: profiledata
            });
          }
        }
        if (!userExist) {
          this.setState({
            errorMessage: (
              <span>
                User <strong className="text-capitalize">{username}</strong> not
                found
              </span>
            )
          });
        }
        if (username === this.props.userData.username) {
          this.setState({
            isUser: true
          });
        } else {
          this.setState({
            isUser: false
          });
        }
        this.setState({ loading: false });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.errorMessage ? (
          <Alert type="danger" show={true}>
            {this.state.errorMessage}{" "}
          </Alert>
        ) : null}
        <div className="container ">
          <div className="row ">
            <div className="col-lg-8 p-0 order-lg-2 px-lg-3">
              <div className="row no-gutters bg-white">
                <div className={classes.cover + " col "}>
                  <img src={this.state.profileData.coverPhoto} alt="" />
                  <div className={classes.dp}>
                    <img src={this.state.profileData.profilePicture} alt="" />
                  </div>
                  {this.state.loading ? (
                    <Spinner style={{ background: "var(--secondary)" }} />
                  ) : (
                      <h3 className={classes.username}>
                        {!this.state.isUser ? (
                          this.state.profileData.username
                        ) : (
                            <span>
                              {this.state.profileData.username} <small>(You)</small>
                            </span>
                          )}
                      </h3>
                    )}

                </div>
              </div>
              {this.state.isUser ? <div className="bg-white  text-center"> <Link to="/edit-profile" className="btn  btn-outline-dark rounded-pill px-5 mx-auto btn-sm" >Edit profile</Link></div> : null}
<<<<<<< HEAD
              <Friends uid={this.state.profileData.uid} />

              {this.state.isUser ? <NewPost
=======
              <Friends {...this.state.profileData} />
              {this.state.isUser ?
                <Request hideAll={true} userData={this.props.userData} /> : null}

              {this.state.isUser ? this.state.progressMessage ? null : !this.state.showPostForm ? <div style={{ height: '10rem' }} className="bg-white"> <Spinner fontSize="8px" /> </div> : <NewPost
>>>>>>> 3133f985b69791eda1883a2f7977345286f0d432
                titleChanged={this.titleChanged}
                bodyChanged={this.bodyChanged}
                title={this.state.postTitle}
                upload={this.upload}
<<<<<<< HEAD
                body={this.state.postBody}
                sendPost={this.sendPost}
              /> : null}
=======

                src={this.state.src}
                type={this.state.type}
                body={this.state.postBody}
                sendPost={this.sendPost}
              /> : null}
              {this.state.error ? (
                <Alert type="warning" show={true}>
                  {this.state.error}
                </Alert>
              ) : null}
>>>>>>> 3133f985b69791eda1883a2f7977345286f0d432
              {this.state.progressMessage ? <div className={'row no-gutters pb-4 px-4 mb-2 bg-white'}>
                <h4 className="h5 font-weight-bold">{this.state.progressMessage}</h4>
                <div className={classes.progressBar}>
                  <span ref={this.progBar} ></span>
                </div>
              </div> : null}
              {this.state.profileData.uid ?
<<<<<<< HEAD
                <Post uid={this.state.profileData.uid} /> : null}
=======
                <Post uid={this.state.profileData.uid} likeeId={this.props.userData.uid} /> : null}
>>>>>>> 3133f985b69791eda1883a2f7977345286f0d432

            </div>

            <div className="col-lg-4 order-lg-1 bg-white ">
              <div className="row no-gutters">
                <div className={" col "}></div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Timeline);
// https://firebasestorage.googleapis.com/v0/b/skymail-920ab.appspot.com/o/noel%20odunmilade%2Fimages%2Fcomment_400x400.JPG?alt=media&token=00113e3e-3cfb-4fde-ba0c-81403f49e798

// https://firebasestorage.googleapis.com/v0/b/skymail-920ab.appspot.com/o/noel%20odunmilade%2Fimages%2Fcomment.JPG?alt=media&token=430fa42c-fe53-47e7-92f6-f7e09dd01db1

gs://skymail-920ab.appspot.com/noel odunmilade/images/comment_400x400.JPG