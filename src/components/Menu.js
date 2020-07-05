import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuthContext } from './Provider/AuthProvider';

const Menu = () => {
    const { handleSignOut, } = useContext(firebaseAuthContext);

    return (
        <div className="ui attached stackable menu">
            <div className="ui container">
                <a className="item">
                    <i className="home icon"></i>
                    <Link to='./notes'>Notes</Link>
                </a>
                <a className="item">
                    <i className="pencil alternate icon"></i>
                    <Link to='./newnote'>New Note</Link>
                </a>
                <a className="item">
                    <i className="user icon"></i>
                    <Link to='./' onClick={handleSignOut}>Sign Out</Link>
                </a>
            </div>
        </div>
    );
};

export default Menu;