import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import Menu from "../Menu";
import Lyrics from "../../pages/Lyrics column/index";
import ControlZone from "../Control Zone";
import LoginPage from "../LoginPage";
import http from "../../network/axios";

const Home = () => {
    // 推荐歌单列表的状态
    const [recommendedPlaylists, setRecommendedPlaylists] = useState([]);

    // 推荐歌单 ID 列表的状态
    const [recommendedPlaylistsId, setRecommendedPlaylistsId] = useState([]);

    // 创建一个 ref 用于获取 ControlZone 组件的实例
    const childRef = useRef();

    // 控制登录页面的显示状态
    const [displayPage, setDisplayPage] = useState(false);

    // 推荐歌曲列表及其音频地址的状态
    const [recommendedSongs, setRecommendedSongs] = useState([]);
    const [recommendedSongsUrl, setRecommendedSongsUrl] = useState(['']);

    // 控制播放列表是否显示的状态
    const [isShow, setIsShow] = useState(true);

    // 使用 useEffect 模拟 componentDidMount，在组件挂载时获取推荐歌曲列表
    useEffect(() => {
        fetchRecommendedSongs();
        fetchRecommendedPlaylists();
    }, []);

    // 异步函数，获取推荐歌单列表
    const fetchRecommendedPlaylists = async () => {
        try {
            const apiUrl = '/top/playlist/highquality?limit=100';
            const response = await http.get(apiUrl);
            const playlists = response.data.playlists;

            setRecommendedPlaylists(playlists);

            // 将推荐歌单的 ID 添加到 recommendedPlaylistsId 状态中
            playlists.forEach(item => {
                setRecommendedPlaylistsId(prev => [...prev, item.id]);
            });

        } catch (error) {
            console.error('Error:', error);
        }
    }

    // 异步函数，获取推荐歌曲列表
    const fetchRecommendedSongs = async () => {
        try {
            const apiUrl = '/recommend/songs';
            const response = await http.get(apiUrl);
            const songs = response.data.data.dailySongs;
            setRecommendedSongs(songs);
        } catch (error) {
            console.error('获取RecommendedSongs时发生错误：', error);
        }
    };

    // 点击推荐歌曲时的处理函数，获取歌曲的音频地址并播放
    const recommendedSongsOnClick = async (id) => {
        try {
            const apiUrl = '/song/url?id=' + id;
            const response = await http.get(apiUrl);
            const songUrl = response.data.data[0].url;
            setRecommendedSongsUrl(songUrl);

            // 如果 ControlZone 组件的实例存在，调用其播放方法
            if (childRef.current) {
                childRef.current.play();
            }
        } catch (error) {
            console.error('获取recommendedSongsUrl时发生错误：', error);
        }
    };

    // 关闭登录页面的处理函数
    const handlePageClose = () => {
        setDisplayPage(false);
    };

    // 打开登录页面的处理函数
    const handlePageLogin = () => {
        setDisplayPage(true);
    };

    // 控制歌单页面右侧显示或隐藏的处理函数
    const onClickPlaylistPageRightShow = () => {
        setIsShow(!isShow);
    };

    return (
        <div className="Home-body">
            {/* 菜单和歌词组件 */}
            <div style={{ display: "flex", width: "100%" }}>
                <Menu />
                <Lyrics
                    recommendedPlaylists={recommendedPlaylists}
                    handlePageLogin={handlePageLogin}
                    recommendedSongs={recommendedSongs}
                    RecommendedSongsOnclik={recommendedSongsOnClick}
                    isShow={isShow}
                />
            </div>

            {/* 音乐控制区域组件 */}
            <ControlZone
                recommendedSongsUrl={recommendedSongsUrl}
                onClickPlaylistPageRightShow={onClickPlaylistPageRightShow}
                ref={childRef}
            />

            {/* 登录页面组件 */}
            <LoginPage
                Home={displayPage}
                displayPage={displayPage}
                handlePageClose={handlePageClose}
            />
        </div>
    );
};

export default Home;
