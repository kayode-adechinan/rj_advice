## quickstart
```jsx

import React, { Component } from "react";
import axios from "axios";

class Row extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.data.id}</td>
        <td>{this.props.data.name}</td>
      </tr>
    );
  }
}

class App extends Component {
  state = {
    name: "",
    persons: [],
    data: [
      {
        id: 1,
        name: "Foo"
      },
      {
        id: 2,
        name: "Bar"
      }
    ]
  };

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      const persons = res.data;
      this.setState({ persons });
    });
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    console.log(this.state.name);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Que cherchez vous ?:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Ok</button>
        </form>
        <br></br>
        <ul>
          {this.state.persons.map(person => (
            <li key={person.id} >{person.name}</li>
          ))}
        </ul>

        <table>
          <tbody>
            {this.state.data.map((item, i) => (
              <Row key={i} data={item} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default App;
```

## conditionalrendering
```jsx

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

## event handling
```jsx

class EventHandlingDemo extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          ADD
        </button>
        <input onChange={this.handleInput}/>
        {
          this.state.todos.map((item) => {
            return (
              <li onClick={this.handleRemove(item.id)}>
                {item.text}
              </li>
            );
          });
        }
      </div>
    )
  }

  handleClick = () => {
    // "this"
  }

  handleInput = (e) => {
    // "this", "e"
  }

  handleRemove = (id) => (e) => {
    // "this", "e", "id"
  }
}
```

## set interval
```

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);

```


## axios
```jsx

import React from 'react';
import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    id: '',
  }

  handleChange = event => {
    this.setState({ id: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    axios.delete(`https://jsonplaceholder.typicode.com/users/${this.state.id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person ID:
            <input type="text" name="id" onChange={this.handleChange} />
          </label>
          <button type="submit">Delete</button>
        </form>
      </div>
    )
  }
}
```

## next auth
```jsx

// login.js
import React, { Component } from "react";

import cookie from 'js-cookie'
import Router from 'next/router'


export default class Login extends Component {


  login = () => {
    cookie.set('status', "logged", { expires: 1 })
    Router.push('/profile')

  };


  render() {
   

    return (
      <div>
        Click to log in
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

// profile.js
import React, { Component } from "react";

import cookie from 'js-cookie'
import Router from 'next/router'
import nextCookie from 'next-cookies'


export default class Profile extends Component {

  
static async getInitialProps(ctx) {
    const { status } = nextCookie(ctx)
    console.log(status)

    if (ctx.req && !status) {
        ctx.res.writeHead(302, { Location: '/login' })
        ctx.res.end()
        return
    }

    return {status}
}  
    

  logout = () => {
    cookie.remove("status");
    Router.push('/login')

  };

  render() {
    return (
      <div>
      Welcome deny
      <button onClick={this.logout}>Logout</button>
    </div>
    );
  }
}


// profile.js with high order component (HOC)

import React, { Component } from "react";

import cookie from "js-cookie";
import Router from "next/router";
import nextCookie from "next-cookies";

class Profile extends Component {


  render() {
    return (
      <div>
        Welcome deny
        <button onClick={this.props.logout}>Logout</button>
      </div>
    );
  }
}

const withAuthSync = WrappedComponent => {
  return class withAuthSync extends Component {
    static async getInitialProps(ctx) {
      const { status } = nextCookie(ctx);
      console.log(status);

      if (ctx.req && !status) {
        ctx.res.writeHead(302, { Location: "/login" });
        ctx.res.end();
        return;
      }

      return { status };
    }

    logout = () => {
      cookie.remove("status");
      Router.push("/login");
    };

    render() {
      return <WrappedComponent logout={this.logout} />;
    }
  };
};



export default withAuthSync(Profile)
```

## formik
```jsx

import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required")
});

export default class App extends Component {
  render() {
    return (
      <Formik
        initialValues={{ firstName: "", lastName: "" }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={handleChange}
              value={values.firstName}
              name="firstName"
            />
            {errors.firstName}
            <input
              type="text"
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
            />
            {errors.lastName}
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    );
  }
}
```

## formik react native
```jsx

// Formik x React Native example
import React from 'react';
import { Button, TextInput, View } from 'react-native';
import { Formik } from 'formik';

export const MyReactNativeForm = props => (
  <Formik
    initialValues={{ email: '' }}
    onSubmit={values => console.log(values)}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View>
        <TextInput
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
        />
        <Button onPress={handleSubmit} title="Submit" />
      </View>
    )}
  </Formik>
);
```

## next pagination
```jsx

import Link from 'next/link'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
export default class App extends React.Component {
  static async getInitialProps({ query: { page = 1 } }) {
    const r = await fetch(
      `https://chroniclingamerica.loc.gov/search/titles/results/?terms=michigan&format=json&page=page`
    )
    const d = await r.json()
    return {
      items: d.items,
      page: parseInt(page, 10)
    }
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.items.map(({ title, id }) => (
            <li key={id}>{title}</li>
          ))}
        </ul>
        <button
          onClick={() => Router.push(`/?page=${this.props.page - 1}`)}
          disabled={this.props.page <= 1}
        >
          PREV
        </button>
        <button onClick={() => Router.push(`/?page=${this.props.page + 1}`)}>
          NEXT
        </button>
        <Link href="/?page=1">
          <a>First page</a>
        </Link>
      </div>
    )
  }
}
```
