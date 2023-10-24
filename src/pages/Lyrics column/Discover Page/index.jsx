import './index.css';
import axios from "axios";
import {useState} from "react";
export default function DiscoverPage(props) {
    return (
        <div className="DiscoverPage">
            <div className="RecommendedDailyTitle">每日推荐</div>
            <div className="RecommendedDaily">
                {props.recommendedSongs.map((item) => (
                    <div className="RecommendedDailyContentItem" key={item.id} onClick={()=>{props.RecommendedSongsOnclik(item.id)}}>
                        <div className="RecommendedDailyContentItemImg"><img className="pictures" src={item.al.picUrl}/></div>
                        <div className="RecommendedDailyContentItemTitle">{item.name}</div>
                        <div className="RecommendedDailyContentItemArtist">{item.ar[0].name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
