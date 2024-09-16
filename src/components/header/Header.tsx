import {useState} from 'react';
import avatar from './images/avatar.png'
import arrow from './images/arrow.svg'
import Style from '../../Styles/Header.module.css'

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const userHandler = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={"container header-container"}>
            <header className={Style.header}>
                <h1 className={Style.header__logo}>Awesome Kanban Board</h1>
                <div
                    className={Style.header__user}
                    onClick={userHandler}
                >
                    <div className={Style.header__imgWrapper}>
                        <img src={avatar} alt={"Error"}/>
                    </div>
                    <div
                        className={
                        `
                        ${Style.arrowWrapper}
                        ${isOpen ? Style.rotated : ""}
                        `
                    }>
                        <img src={arrow} alt={"Arrow"}/>
                    </div>
                    <ul className={
                        `${Style.header__menu}
                        ${(isOpen ?
                            Style.header__menu_active 
                            :
                            Style.header__menu_inactive
                            )}
                        `
                    }>
                        <li className={Style.menu__link}>Profile</li>
                        <li className={Style.menu__link}>Log Out</li>
                        <div className={Style.mortalDiv}></div>
                    </ul>
                </div>
            </header>
        </div>
    );
}

export default Header;