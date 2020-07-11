import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuthContext } from './Provider/AuthProvider';

const Menu = () => {
    const { handleSignOut, } = useContext(firebaseAuthContext);

    return (
        <div className="ui attached stackable menu">
            <div className="ui container">
                <li className="item">
                    <i className="home icon"></i>
                    <Link to='./notes'>Notes</Link>
                </li>
                <li className="item">
                    <i className="pencil alternate icon"></i>
                    <Link to='./newnote'>New Note</Link>
                </li>
                <li className="item">
                    <i className="user icon"></i>
                    <Link to='./' onClick={handleSignOut}>Sign Out</Link>
                </li>
            </div>
            <div className="right menu">
                <div className="item">
                    <div className="ui transparent icon input">
                        <input type="text" placeholder="Search..." />
                        <i className="search link icon"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;