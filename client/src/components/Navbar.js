import './navbar.css'
import {Link} from "react-router-dom";

function Navbar() {
    return(
        <header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar addColorNav">
            <div className="toRightNAV navbar-nav-scroll">
                <ul className=" navbar-nav bd-navbar-nav flex-row">
                    <li className="nav-item">
                        <Link className="nav-link " to="/" title="Home page">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/books"
                              title="List of all books">Books</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/authors"
                              title="List of all authors">Authors</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link " to="/bookById"
                              title="find book by id">Book by id</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link " to="/authorById" title="find author by id">Author by id</Link>
                    </li>
                    <li className="nav-item">
                        <noindex><a className="nav-link"
                                    href="https://codepen.io/honeybunnyhhhhhhhhh/pen/WNZPYde" title="Песочница">codepen</a></noindex>
                    </li>

                </ul>

            </div>
        </header>
        )
}

export default  Navbar