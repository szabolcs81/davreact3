import React, { Component } from 'react';
import * as movieService from "../services/fakeMovieService";


class Table extends Component {
    state = {
        movieList: [],
        ascend: true,
        icon: "fa fa-sort-desc"
    }
    componentDidMount() {
        const allMovie = movieService.getMovies();
        this.setState({ movieList: allMovie });
        console.log("compdidM");
    }

    handleDeleteMovie = (id) => {
        movieService.deleteMovie(id);
        const updatedMovie = movieService.getMovies();
        this.setState({ movieList: updatedMovie });


    }
    handleSortByName = () => {
        let arrow;
        this.state.ascend ? arrow = "fa fa-sort-asc" : arrow = "fa fa-sort-desc";

        this.setState({ ascend: !this.state.ascend, icon: arrow });

    }
    render() {
        const { movieList, ascend, icon } = this.state;
        let orderedList = [...movieList];
        if (ascend) orderedList.sort((a, b) => a.title < b.title ? 1 : -1);
        else orderedList.sort((a, b) => a.title > b.title ? 1 : -1);
        return (<div>
            <table className="table">
                <thead>
                    <tr>
                        <th onClick={this.handleSortByName} >title<i className={icon} /></th>
                        <th>genre</th>
                        <th>stock</th>
                        <th>rate</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {orderedList.map((movie) =>
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td><button onClick={() => this.handleDeleteMovie(movie._id)} className="btn btn-outline-danger" >delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>);
    }
}

export default Table;