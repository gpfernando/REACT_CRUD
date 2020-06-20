import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Quill from "react-quill";

class PostForm extends Component {
  state = {
    post: {
      key: this.props.post.key,
      slug: this.props.post.slug,
      name: this.props.post.name,
      address: this.props.post.address,
      city: this.props.post.city,
      state: this.props.post.state,
      phone: this.props.post.phone,
      comment: this.props.post.comment
    },
    saved: false
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.post.key !== this.props.post.key) {
      this.setState({
        post: {
          key: this.props.post.key,
          slug: this.props.post.slug,
          name: this.props.post.name,
          address: this.props.post.address,
          city: this.props.post.city,
          state: this.props.post.state,
          phone: this.props.post.phone,
          comment: this.props.post.comment
        }
      });
    }
  }
  handleAddNewPost = e => {
    e.preventDefault();
    if (this.state.post.name) {
      if (this.props.updatePost) {
        this.props.updatePost(this.state.post);
      } else {
        this.props.addNewPost(this.state.post);
      }
      this.setState({ saved: true });
    } else {
      alert("Name Required");
    }
  };
  render() {
    if (this.state.saved === true) {
      return <Redirect to="/" />;
    }
    return (
      <form className="container" onSubmit={this.handleAddNewPost}>
        <h1>Add a New Customer</h1>
        <p>
          <label htmlFor="form-title">Name:</label>
          <br />
          <input
            defaultValue={this.props.name}
            id="form-title"
            value={this.state.post.name}
            onChange={e =>
              this.setState({
                post: {
                  ...this.state.post,
                  name: e.target.value
                }
              })
            }
          />
        </p>
        <p>
          <label htmlFor="form-title">Address:</label>
          <br />
          <input
            defaultValue={this.props.address}
            id="form-title"
            value={this.state.post.address}
            onChange={e =>
              this.setState({
                post: {
                  ...this.state.post,
                  address: e.target.value
                }
              })
            }
          />
        </p>        
        <p>
          <label htmlFor="form-title">City:</label>
          <br />
          <input
            defaultValue={this.props.city}
            id="form-title"
            value={this.state.post.city}
            onChange={e =>
              this.setState({
                post: {
                  ...this.state.post,
                  city: e.target.value
                }
              })
            }
          />
        </p>
        <p>
          <label htmlFor="form-title">State:</label>
          <br />
          <input
            defaultValue={this.props.state}
            id="form-title"
            value={this.state.post.state}
            onChange={e =>
              this.setState({
                post: {
                  ...this.state.post,
                  state: e.target.value
                }
              })
            }
          />
        </p>
        <p>
          <label htmlFor="form-title">Phone:</label>
          <br />
          <input
            defaultValue={this.props.phone}
            id="form-title"
            value={this.state.post.phone}
            onChange={e =>
              this.setState({
                post: {
                  ...this.state.post,
                  phone: e.target.value
                }
              })
            }
          />
        </p>
        <p>
          <label htmlFor="form-content">Comment:</label>
        </p>
        <Quill
          defaultValue={this.state.post.comment}
          onChange={(address, delta, source, editor) => {
            this.setState({
              post: {
                ...this.state.post,
                comment: editor.getContents()
              }
            });
          }}
        />
        <p>
          <button type="submit">Save</button>
        </p>
      </form>
    );
  }
}
export default PostForm;
