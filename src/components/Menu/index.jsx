import React from "react";
import "./index.css";
import {NavLink} from "react-router-dom";
export default function Menu() {
    return (
        <div className="Menu-body">
            <div className="Menu-img"></div>
            <div className="Menu-font">坤坤音乐</div>
            <NavLink className={({isActive}) => 'recommend' + (isActive ? ' ClickActive' : '')} to="/SongPage">
                <div className="recommend-img"></div>
                <div className="recommend-font">发现</div>
            </NavLink>
            <NavLink className={({isActive}) => 'found' + (isActive ? ' ClickActive' : '')} to="/DiscoverPage">
                <div className="found-img"></div>
                <div className="found-font">每日推荐</div>
            </NavLink>
            <div className="My-Music">
                <div className="My-Music-font">我的音乐</div>
                <NavLink className={({isActive}) => 'My-like' + (isActive ? ' ClickActive' : '')} to="/MyLike">
                    <div className="My-like-img"></div>
                    <div className="My-like-font">我喜欢的音乐</div>

                </NavLink>
                <NavLink className={({isActive}) => 'My-collection' + (isActive ? ' ClickActive' : '')} to="/Collection">
                    <div className="My-collection-img"></div>
                    <div className="My-collection-font">我收藏的音乐</div>

                </NavLink>
                <NavLink className={({isActive}) => 'History-plays' + (isActive ? ' ClickActive' : '')} to="/Historyplays">
                    <div className="History-plays-img"></div>
                    <div className="History-plays-font">历史播放</div>
                </NavLink>
                <div className="My-playlists">
                    <div className="My-playlists-font">我创建的歌单
                        <div className="My-playlists-click">+</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
