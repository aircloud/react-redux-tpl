
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {getAllClass,updateInfo} from '../../actions/index.action';
import { Link } from 'react-router';
import "./SubPage.less";

@connect(state => {
    return {
        Info:state.rootReducer.getInfo.info
    };
}, {
    getAllClass,updateInfo
})
class SubPage extends Component{

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render(){
        return(
            <div className="SubPageLayout">
                <h2>SubPage</h2>
                {this.props.Info}
                <p><Link to="/">Home</Link></p>
            </div>
        )
    }
}

export default SubPage;
