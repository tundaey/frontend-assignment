import React from 'react';

export class Nav extends React.Component {
    render(){
        return (
            <nav className="navbar">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img src={"http://bulma.io/images/bulma-logo.png"} width={"112"} height={"28"} />
                    </a>
                </div>
            </nav>
        )
    }
}