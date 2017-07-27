
import React from 'react';
import Nav from './Nav';

const IndexContainer = (props) =>
    <div className="frame">
        <div className="header">
            <Nav />
        </div>
        <div className="container">
            {props.children}
        </div>
    </div>;

export default IndexContainer;