import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './index.css';
import axios from "axios";

const PlaylistPage = (props, Id) => {
    const [recommendedPlaylistPages, setRecommendedPlaylistPages] = useState([]);
    const {id, coverImgUrl, name} = useParams();

    const fetchData = async () => {
        try {
            const apiUrl = `https://netease-cloud-music-api-eight-delta-50.vercel.app/playlist/track/all?id=${id}&limit=100&offset=0`;
            const response = await axios.get(apiUrl);
            setRecommendedPlaylistPages(response.data.songs);
        } catch (error) {
            console.error('获取PlaylistPage时发生错误:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [props.id]);

    return (
        <div className="PlaylistPage">
            <div className="PlaylistIntroduction">
                <div className="PlaylistPageCover">
                    <img src={coverImgUrl}/>
                </div>
                <div className="PlaylistPageTitle">{name}</div>
            </div>

            {recommendedPlaylistPages.map(item => (
                <div
                    className="PlaylistPageList"
                    key={item.id}
                    onClick={() => props.RecommendedSongsOnclik(item.id)}
                >
                    <div className="PlaylistPageListImg">
                        <img className="PlaylistPagPictures" src={item.al.picUrl}/>
                    </div>

                    <div className="PlaylistPageListTitle">{item.name}</div>
                    <div className="PlaylistPageListArtist">{item.ar[0].name}</div>
                </div>
            ))}
        </div>
    );
}

export default PlaylistPage;