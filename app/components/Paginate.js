import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash'
 
const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number
}


class Paginate extends React.Component {
    constructor(props){
        super(props);
        this.state = { pager: {}}
    }

    componentWillMount(){
        //set page if items array is not empty
        if(this.props.items && this.props.items.length){
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState){
        //reset page if items array has changed
         console.log('default', this.props.initialPage)
        if(this.props.items !== prevProps.items){
            this.setPage(this.props.initialPage)
        }
    }

    setPage(page){
        console.log('page', page)
        let items = this.props.items;
        let pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page);

        // get new page of items from items array
        let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

         // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        console.log('page of items', pageOfItems)
        this.props.onChangePage(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize){
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to iterate over in the pager control
        var pages = _.range(startPage, endPage + 1);
 
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render(){
        let pager = this.state.pager;
 
        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <nav className="pagination">
                <ul className="pagination-list">
                <li >
                    <a
                     className={pager.currentPage === 1 ? 'disabled pagination-link' : 'pagination-link'} 
                     onClick={() => this.setPage(1)}>First</a>
                </li>
                <li>
                    <a
                     className={pager.currentPage === 1 ? 'disabled pagination-link' : 'pagination-link'} 
                     onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index}>
                        <a
                         className={pager.currentPage === page ? 'pagination-link is-current' : 'pagination-link'} 
                         onClick={() => this.setPage(page)}>{page}</a>
                    </li>
                )}
                <li>
                    <a 
                     className={pager.currentPage === pager.totalPages ? 'disabled pagination-link' : 'pagination-link'}
                     onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                </li>
                <li >
                    <a
                     className={pager.currentPage === pager.totalPages ? 'disabled pagination-link' : 'pagination-link'} 
                     onClick={() => this.setPage(pager.totalPages)}>Last</a>
                </li>
            </ul>
            </nav>
        )
    }
}

Paginate.propTypes = propTypes;
Paginate.defaultProps = {
    initialPage: 1
}
export default Paginate;