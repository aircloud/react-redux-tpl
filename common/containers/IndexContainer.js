/**
 * Created by Xiaotao.Nie on 2017/3/13.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */
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