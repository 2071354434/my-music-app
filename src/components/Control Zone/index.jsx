import React, { useState, useRef, useEffect,forwardRef, useImperativeHandle } from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';

const ControlZone = forwardRef((props,ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const medioAudioRef = useRef(null);

    useEffect(() => {
        loadAudio(); // 在组件挂载时加载音频
    }, []); // 通过空数组作为依赖项，确保仅在组件挂载时执行一次

    const loadAudio = () => {
        if (medioAudioRef.current) {
            medioAudioRef.current.crossOrigin = 'anonymous';
            medioAudioRef.current.volume = volume;
        }
    };

    const play = () => {
        if (medioAudioRef.current) {
            if (!isPlaying) {
                medioAudioRef.current.play(); // 播放音频
            } else {
                medioAudioRef.current.pause(); // 暂停音频
            }
            setIsPlaying((prevIsPlaying) => !prevIsPlaying); // 切换播放状态
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (medioAudioRef.current) {
            medioAudioRef.current.volume = newVolume;
        }
    };
    useImperativeHandle(ref, () => ({
        play: () => {
            play();
        },
    }));

    const buttonClass = isPlaying ? 'Pause' : 'Play'; // 根据播放状态确定按钮样式

    return (
        <div className="controlZone">
            <div className="ProgressBar"></div>
            <div className="ControlArea">
                <div className="PlayControls">
                    <div className="PreviousOne"></div>
                    <button className={buttonClass} onClick={play}></button>
                    {/* 播放/暂停按钮 */}
                    <div className="NextOne"></div>
                </div>
                <div className="Ribbon">
                    <div className="HowPlay"></div>
                    <div className="Volume">
                        <div className="VolumeBackground">
                            <input
                                className={"VolumeSlider"}
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={(e) => handleVolumeChange(e)}
                            />
                        </div>
                    </div>
                    <div className="Playlist" onClick={props.onClickPlaylistPageRightShow}></div>
                </div>
                {props.recommendedSongsUrl !== '' ? (
                    <audio style={{ display: 'none' }} ref={medioAudioRef} controls src={props.recommendedSongsUrl} volume={volume}></audio>
                ) : null}
                {/* 音频元素 */}
            </div>
        </div>
    );
});

export default ControlZone;
