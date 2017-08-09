import React from 'react';
import {Nav} from './Nav';
import {TestCoverage} from './TestCoverage'

export class App extends React.Component {
    render(){
        return (
           <div className="container">
                <Nav />
                <TestCoverage/>
            </div>
        )
    }
}
