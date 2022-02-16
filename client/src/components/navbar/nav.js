import React from 'react'
import './index.css'
import {Link} from "react-router-dom";
import logo from './yellow-logo.png'
import menuLogo from './menu.png'

function Nav(){
    return(
        <header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar addColorNav">
            <div className="toRightNAV navbar-nav-scroll">
                <ul className=" navbar-nav bd-navbar-nav flex-row">
                    <div className=" menuBlock">
                        <img className="menuLogo" src={menuLogo} alt="menu logo~"/>
                        <div className="textMenuNav">меню</div>
                    </div>

                    <li className="nav-item">
                        <Link className="nav-link" to="/grafik"
                              title="График работ">График</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/staff"
                              title="Список сотрудников">Сотрудники</Link>
                    </li>
                    <li>
                        <img src={logo} alt="Logo" />
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link " to="/finance"
                              title="Работа с финансами">Финансы</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link " to="/dogovor" title="Работа с договорами">Договоры</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="https://codepen.io/honeybunnyhhhhhhhhh/pen/WNZPYde" title="Песочница">codepen</a>
                    </li>
                </ul>
            </div>
        </header>
            // <header className="header justify-content-between">
            //         <ul className="header addColorNav">
            //             <div className=" menuBlock">
            //                 <img className="menuLogo" src={menuLogo} alt="menu logo~"/>
            //                 <div className="textMenuNav">меню</div>
            //             </div>
            //
            //             <li className="nav-item">
            //                 <Link className="nav-link" to="/grafik" title="График работ">График</Link>
            //             </li>
            //             <li className="nav-item">
            //                 <Link className="nav-link" to="/staff" title="Список сотрудников">Сотрудники</Link>
            //             </li>
            //         </ul>
            //
            //         <img src={logo} alt="Logo" />
            //
            //         <ul className="header addColorNav">
            //             <li className="nav-item">
            //                 <Link className="nav-link " to="/finance" title="Работа с финансами">Финансы</Link>
            //             </li>
            //             <li className="nav-item">
            //                 <Link className="nav-link " to="/dogovor" title="Работа с договорами">Договоры</Link>
            //             </li>
            //             <li className="nav-item">
            //                 <a className="nav-link"
            //                    href="https://codepen.io/honeybunnyhhhhhhhhh/pen/WNZPYde" title="Песочница">codepen</a>
            //             </li>
            //         </ul>
            // </header>
    )
}
export default Nav