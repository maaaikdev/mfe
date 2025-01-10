import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App'

//Mount function to start up the app
const mount = (el, { onSignIn, onNavigate, defaulttHistory, initialPath }) => {
    const history = defaulttHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });

    if(onNavigate){
        history.listen(onNavigate);
    }

    ReactDOM.render(<App onSignIn={onSignIn} history={history} />,el);

    return {
        onParentNavigate({ pathname: nextPathname }){
            const { pathname } = history.location;
            console.log(nextPathname)
            if(pathname !== nextPathname){
                history.push(nextPathname)
                console.log(location);
            }
        }
    };
};

// If we are in development and in isolation
// call mount inmediately
if(process.env.NODE_ENV === 'development'){
    const devRoot = document.querySelector("#_auth-dev-root");

    if(devRoot){
        mount(devRoot, { defaulttHistory: createBrowserHistory() });
    }
}

// We are running through container
// and we should export the miunt function
export { mount }