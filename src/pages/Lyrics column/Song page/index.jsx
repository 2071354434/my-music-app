import React, {useEffect, useState} from 'react';
import './index.css';
import axios from "axios";
import {NavLink} from "react-router-dom";
const SongPage = (props) => {
    return (
        <div className="Song-Page">
            {props.recommendedPlaylists.map(item => (
                <div key={item.id} className="RecommendedPlaylistsContentItem">
                    <NavLink
                        to={`/PlaylistPage/${item.id}/${encodeURIComponent(item.coverImgUrl)}/${encodeURIComponent(item.name)}`}
                        className="RecommendedPlaylistsContentItemImg"
                    >
                        <img className="RecommendedPlaylistsPictures" src={item.coverImgUrl}/>
                    </NavLink>
                    <div className="RecommendedPlaylistsContentItemTitle">>{item.name}</div>
                </div>
            ))}
        </div>
    )
}

export default SongPage;