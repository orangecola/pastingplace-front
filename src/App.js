import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Header from './Header'
import { Switch, Route, Link } from 'react-router-dom'

var formValue = {}

//Ensure the header is added to every request
const App = () => (
  <div>
  <Header />
  <Main />
  </div>
)

//Request Routing
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={AddPaste}/>
      <Route exact path='/recent' component={RecentPaste}/>
      <Route path='/paste/:number' component={PasteInfo}/>
    </Switch>
  </main>
)

class AddPaste extends React.Component {

  handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent());
    formValue = e.target.getContent();
  }

 submit() {
   console.log('Content was submitted:', formValue);
   var body = JSON.stringify({paste: {content: formValue} })
  fetch('/api/v1/pastes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    })
    .then(function(response) {
      response = response.json();
      return response;
    }).then(function(myJson) {
      console.log(myJson);
      window.alert('Paste Successful!');
      window.location.replace('/paste/'.concat(myJson.id))
    })
 }

  render() {
    return (
      <div>
      <h1> Add your paste here! </h1>
      <Editor
        apiKey="s8jcw985zzytpyqu3zwq39sg2s920uw1wqdja3mjtbfmy91m"
        selector="textarea"
        init={{
          menubar: false,
          plugins: 'link image code lists',
          toolbar: 'bold italic underline | bullist numlist | image link',
          images_upload_url: '/api/v1/photos',
          images_upload_base_path: 'http://127.0.0.1/rails/'
        }}
        onChange={this.handleEditorChange}
      />

        <button onClick={this.submit}>
          Paste it!
        </button>
        </div>
    );
  }
}

class RecentPaste extends React.Component {

  constructor(props) {
		super(props)
		this.state = { data: [] }
	}
  getRecent() {
    fetch('/api/v1/pastes/recent')
    .then(response => response.json())
		.then(data => {
				this.setState({data: data })
		})
  }

  componentDidMount() {
    this.getRecent();
  }
  render() {
    return (
      <div>
      <h1> Last 5 Recent Pastes </h1>
      <ul>
      {this.state.data.map(function(user, i){
       return <p key={i}><Link to={'/paste/'.concat(user.id)} >Date Created: {user.created_at}</Link></p>
     })}
      </ul>
      </div>
    );
  }
}

class PasteInfo extends React.Component {

  constructor(props) {
		super(props)
		this.state = { data: [] }
	}
  getPaste() {
    fetch('/api/v1/pastes/'.concat(this.props.match.params.number))
    .then(response => response.json())
		.then(data => {
				this.setState({data: data })
		})
  }

  componentDidMount() {
    this.getPaste();
  }
  render() {
    return (
      <div>
      <h1> Paste Created time: {this.state.data.created_at} </h1>
      <Editor
        apiKey="s8jcw985zzytpyqu3zwq39sg2s920uw1wqdja3mjtbfmy91m"
        initialValue={this.state.data.content}
        selector="textarea"
        init={{
          menubar: false,
          toolbar: false,
          readonly: 1
        }}
      />
      </div>
    );
  }
}

export default App;
