import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const url = 'https://adlinc-api.onrender.com/api/slaschapp/auth/login/owner';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: '5e86809283e28b96d2d38537',
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Samkelo Zondi',
        email: 'samkelo@adlinc.com'
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = async (email, password) => {

    const response = await axios.post(url, { email: email, password: password }, {
      Headers: {
        'Content-Type': 'application/json'
      },
      //withCredentials: false
    });
   
   const accessToken = response.data.token.token;
   localStorage.setItem('myToken', accessToken);
   const userId = response.data.owner.id;
   localStorage.setItem('userId', userId);
   const userEmail = response.data.owner.email;
   localStorage.setItem('userEmail', userEmail);
   const name = response.data.owner.name;
   localStorage.setItem('name', name);
   const surname = response.data.owner.surname;
   localStorage.setItem('surname', surname);
   
    
    console.log(email, password);
    console.log(accessToken);
    console.log(userId);
    console.log(userEmail);
    console.log(response.data);
    


    if (response.status !== 200) {
      throw new Error('There was an error logging in');
    }


    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: response.data.owner.name,
      email: 'samkelo@adlinc'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signUp = async (firstname, secondname, surname, profilePicture, phoneNumber, email, password, AcceptTermsAndConditions, locationOrAddress, birthday, IdNumber, IdDocumentLink, gender) => {
    try {
      const userData = {
        firstname: firstname,
        secondname: secondname,
        surname: surname,
        profilePicture: profilePicture,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        AcceptTermsAndConditions: AcceptTermsAndConditions,
        locationOrAddress: locationOrAddress,
        birthday: birthday,
        IdNumber: IdNumber,
        IdDocumentLink: IdDocumentLink,
        gender: gender
      };
  
      const response = await axios.post('https://adlinc-api.onrender.com/api/slaschapp/auth/register/owner', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status !== 201) {
        throw new Error('There was an error registering the user');
      }

      console.log(response.data.id);
  
      const user = {
        id: response.data.id,
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: response.data.name,
        email: response.data.email
      };
  
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user
      });
    } catch (error) {
      console.error(error);
    }
  };

  /* const signUp = async (email, name, password) => {
    throw new Error('Sign up is not implemented');
  }; */

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
