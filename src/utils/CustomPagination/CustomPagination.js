import PropTypes from "prop-types";
import React, { Component } from "react";

class CustomPagination extends Component {
    state = {
        pages: [],
    };

    componentDidMount = () => {
        const { pageSize } = this.props;
        if (pageSize > 0) {
            let pageArray = Array.apply(null, { length: pageSize }).map(
                Number.call,
                Number
            );
            this.setState({
                pages: pageArray,
            });
        }
    };

    handleLink = (e, page) => {
        e.preventDefault();
        this.props.goToPage(page);
    };

    goBack = (e) => {
        e.preventDefault();
        const { currentPage } = this.props;
        this.props.goToPage(currentPage - 1);
    };

    goFront = (e) => {
        e.preventDefault();
        const { currentPage } = this.props;
        this.props.goToPage(currentPage + 1);
    };

    render = () => {
        const { currentPage } = this.props;
        const { pages } = this.state;
        return (
            <div className="container customPagination">
                <ul className="pagination">
                    <li className="page-item">
                        <a
                            className="page-link"
                            href="#!"
                            disabled={!(currentPage > 0)}
                            onClick={this.goBack}
                        >
                            Prev
                        </a>
                    </li>

                    {pages.map((item, i) => (
                        <li
                            className={
                                "page-item " +
                                (currentPage === item ? "active" : "")
                            }
                            key={i}
                        >
                            <a
                                className="page-link"
                                href="#!"
                                onClick={(e) => this.handleLink(e, item)}
                            >
                                {item + 1}
                            </a>
                        </li>
                    ))}

                    <li className="page-item">
                        <a
                            className="page-link"
                            href="#!"
                            disabled={!(currentPage < pages.length - 1)}
                            onClick={this.goFront}
                        >
                            Next
                        </a>
                    </li>
                </ul>
            </div>
        );
    };
}

CustomPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  goToPage: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired
}

export default CustomPagination;
