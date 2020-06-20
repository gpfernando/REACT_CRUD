import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import firebase from "./firebase";
import SimpleStorage from "react-simple-storage";

import Header from "./components/Header";
import Message from "./components/Message";
import Posts from "./components/Posts";
import Post from "./components/Post";
import PostForm from "./components/PostForm";
import Login from "./components/Login";
import NotFound from "./components/NotFound";

import "./App.css";

class App extends Component {
  state = {
    isAuthenticated: false,
    posts: [],
    message: null
  };
  onLogin = (email, password) => {
    console.log(email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ isAuthenticated: true });
      })
      .catch(error => console.error(error));
  };
  onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ isAuthenticated: false });
      })
      .catch(error => console.error(error));
  };
  getNewSlugFromTitle = name =>
    encodeURIComponent(
      name
        .toLowerCase()
        .split(" ")
        .join("-")
    );
  addNewPost = post => {
    const postsRef = firebase.database().ref("posts");
    post.slug = this.getNewSlugFromTitle(post.name);
    delete post.key;
    postsRef.push(post);
    this.setState({
      message: "saved"
    });
    setTimeout(() => {
      this.setState({ message: null });
    }, 1600);
  };
  updatePost = post => {
    const postRef = firebase.database().ref("posts/" + post.key);
    postRef.update({
      slug: this.getNewSlugFromTitle(post.name),
      name: post.name,
      address: post.address,
      city: post.city,
      state: post.state,
      phone: post.phone,
      comment: post.comment
    });
    this.setState({ message: "updated" });
    setTimeout(() => {
      this.setState({ message: null });
    }, 1600);
  };
  deletePost = post => {
    if (window.confirm("Delete this post?")) {
      const postRef = firebase.database().ref("posts/" + post.key);
      postRef.remove();
      this.setState({ message: "deleted" });
      setTimeout(() => {
        this.setState({ message: null });
      }, 1600);
    }
  };
  componentDidMount() {
    const postsRef = firebase.database().ref("posts");
    postsRef.on("value", snapshot => {
      const posts = snapshot.val();
      const newStatePosts = [];
      for (let post in posts) {
        newStatePosts.push({
          key: post,
          slug: posts[post].slug,
          name: posts[post].name,
          address: posts[post].address,
          city: posts[post].city,
          state: posts[post].state,
          phone: posts[post].phone,
          comment: posts[post].comment,
        });
      }
      this.setState({ posts: newStatePosts });
    });
  }
  render() {
    return (
      <Router>
        <div className="App">
          <SimpleStorage parent={this} />
          <Header
            isAuthenticated={this.state.isAuthenticated}
            onLogout={this.onLogout}
          />
          {this.state.message && <Message type={this.state.message} />}
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Posts
                  isAuthenticated={this.state.isAuthenticated}
                  posts={this.state.posts}
                  deletePost={this.deletePost}
                />
              )}
            />
            <Route
              path="/post/:postSlug"
              render={props => {
                const post = this.state.posts.find(
                  post => post.slug === props.match.params.postSlug
                );
                if (post) {
                  return <Post post={post} />;
                } else {
                  return <Redirect to="/" />;
                }
              }}
            />
            <Route
              exact
              path="/login"
              render={() =>
                !this.state.isAuthenticated ? (
                  <Login onLogin={this.onLogin} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/new"
              render={() =>
                this.state.isAuthenticated ? (
                  <PostForm
                    addNewPost={this.addNewPost}
                    post={{ key: null, slug: "", name: "", address: "", city: "", state:"", phone:"", comment:""  }}
                  />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              path="/edit/:postSlug"
              render={props => {
                const post = this.state.posts.find(
                  post => post.slug === props.match.params.postSlug
                );
                if (post && this.state.isAuthenticated) {
                  return <PostForm updatePost={this.updatePost} post={post} />;
                } else {
                  return <Redirect to="/" />;
                }
              }}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
