
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {getAllClass,updateInfo} from '../../actions/index.action';
import { Link } from 'react-router';
import "./HomePage.less";

@connect(state => {
    return {
        Info:state.rootReducer.getInfo.info
    };
}, {
    getAllClass,updateInfo
})
class HomePage extends Component{

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    changeInfo = () => {
        this.props.updateInfo({
            info:"The info is changed"
        });
    };

    render(){
        return(
            <div className="HomeLayout">
                <h2>HomePage</h2>
                <p>{this.props.Info}
                </p>
                <p>
                    <Link to="/subpage" onClick={this.changeInfo}>Go to detail</Link>
                </p>
            </div>
        )
    }
}

export default HomePage;
