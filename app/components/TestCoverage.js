import React from 'react';
import Paginate from './Paginate';
import {Grid} from './Grid';
import {getJsonData} from '../utils/api';
import PropTypes from 'prop-types';

export class TestCoverage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            data : [],
            pageOfItems: []
        }

        this.updateState = this.updateState.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentDidMount(){
        this.updateState()        
    }

    onChangePage(pageOfItems) {
        // update state with new page of files
        this.setState({ pageOfItems: pageOfItems });
    }

    updateState(){
        //fetch and update the state with the list of files
        let data =  getJsonData()
        this.setState(function(){
            return {
                data: data,
                currentPage: 1,
                dataPerPage: 10
            }
        })
    }


    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    render(){
        return (
            <section className="section">
                 <Grid data={this.state.pageOfItems} />
                 <Paginate items={this.state.data} onChangePage={this.onChangePage} />
            </section>
        )
    }
}



