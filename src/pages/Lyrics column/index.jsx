import React, {useState} from "react";
import "./index.css";
import Title from "../../components/Title";
import {Route, Routes} from "react-router-dom";
import SongPage from "./Song page";
import DiscoverPage from "./Discover Page";
import MyLike from "./My Like";
import Collection from "./My Collection";
import HistoryPlays from "./History Plays";
import PlaylistPage from "./Playlistpage";
export default function Lyrics(props) {
    const [recommendedSongs, setRecommendedSongs] = useState([props.recommendedSongs]);
    return (
        <div className="Lyrics">
            <Title handlePageLogin={props.handlePageLogin}/>
            <div>
                <Routes>
                    <Route path="/" element={<SongPage recommendedPlaylists={props.recommendedPlaylists}/>}/>
                    <Route path="/SongPage" element={<SongPage recommendedPlaylists={props.recommendedPlaylists}/>}/>
                    <Route path="/PlaylistPage/:id/:coverImgUrl/:name" element={<PlaylistPage RecommendedSongsOnclik={props.RecommendedSongsOnclik}/>} />
                    <Route path="/DiscoverPage" element={<DiscoverPage recommendedSongs={props.recommendedSongs} RecommendedSongsOnclik={props.RecommendedSongsOnclik}/>}/>
                    <Route path="/MyLike" element={<MyLike/>}/>
                    <Route path="/Collection" element={<Collection/>}/>
                    <Route path="/Historyplays" element={<HistoryPlays/>}/>
                </Routes>
                <div className={`PlaylistPageRight ${props.isShow ? 'PlaylistPageRightShow' : ''}`}>
                    <div className="PlaylistPageRightFont">推荐列表</div>
                    {props.recommendedSongs.map((item) => (
                        <div className="RecommendedDailyItem" key={item.id} onClick={()=>{props.RecommendedSongsOnclik(item.id)}}>
                            <div className="RecommendedDailyItemImg"><img className="pictures" src={item.al.picUrl}/></div>
                            <div className="RecommendedDailyItemTitle">{item.name}</div>
                            <div className="RecommendedDailyItemArtist">{item.ar[0].name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
