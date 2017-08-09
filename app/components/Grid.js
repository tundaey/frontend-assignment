import React from 'react';
import PropTypes from 'prop-types'

export function Grid(props){
    let {data} = props
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Files Name</th>
                    <th>Number of lines with test coverage</th>
                    <th>Total number of lines of code</th>
                </tr>
            </thead>
            
            <tbody>
                {data.map((key)=> {
                    let row = data[key]
                    return (
                        <tr key={key.file}>
                            <th>{key.file}</th>
                            <td>{key.code[0]}</td>
                            <td>{key.code[1]}</td>
                        </tr>
                    )
                })}                    
            </tbody>
        </table>
    )
}

Grid.propTypes = {
    data : PropTypes.array.isRequired
}