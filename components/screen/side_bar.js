import React, { useState } from 'react'
import SideBarApp from '../base/side_bar_app';

let renderApps = (props) => {
    let sideBarAppsJsx = [];
    props.apps.forEach((app, index) => {
        if (props.favourite_apps[app.id] === false) return;
        sideBarAppsJsx.push(
            <SideBarApp key={index} id={app.id} title={app.title} icon={app.icon} isClose={props.closed_windows} isFocus={props.focused_windows} openApp={props.openAppByAppId} isMinimized={props.isMinimized} openFromMinimised={props.openFromMinimised} />
        );
    });
    return sideBarAppsJsx;
}

export default function SideBar(props) {

    function showSideBar() {
        props.hideSideBar(null, false);
    }

    function hideSideBar() {
        setTimeout(() => {
            props.hideSideBar(null, true);
        }, 2000);
    }

    return (
        <>
            <div className={(props.hide ? " -translate-x-full " : "") + " ubuntu-sidebar-dock absolute transform duration-300 select-none z-40 left-0 top-0 h-full pt-3 w-auto flex flex-col justify-start items-center border-r-4 border-black border-opacity-80 bg-[#1e1e1e] bg-opacity-95"}>
                {
                    (
                        Object.keys(props.closed_windows).length !== 0
                            ? renderApps(props)
                            : null
                    )
                }
                <AllApps showApps={props.showAllApps} />
            </div>
            <div onMouseEnter={showSideBar} onMouseLeave={hideSideBar} className={"sidebar-hover-trigger w-1 h-full absolute top-0 left-0 bg-transparent z-50"}></div>
        </>
    )
}

export function AllApps(props) {
    const [title, setTitle] = useState(false);
    const [hovered, setHovered] = useState(false);

    const slotStyle = {
        backgroundColor: 'transparent',
        border: '3px solid transparent',
        boxShadow: 'none',
        width: '64px',
        height: '64px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '6px 4px',
        cursor: 'pointer',
        transition: 'all 0.1s ease-in-out',
        position: 'relative',
        marginTop: 'auto',
        outline: 'none',
        imageRendering: 'pixelated',
        transform: 'scale(1)',
    };

    const hoverStyle = {
        transform: 'scale(1.12)',
    };

    const currentStyle = hovered ? { ...slotStyle, ...hoverStyle } : slotStyle;

    return (
        <div
            style={currentStyle}
            onMouseEnter={() => {
                setTitle(true);
                setHovered(true);
            }}
            onMouseLeave={() => {
                setTitle(false);
                setHovered(false);
            }}
            onClick={props.showApps}
        >
            <div className="relative flex justify-center items-center">
                <img className="w-9 h-9" src="./themes/Yaru/system/view-app-grid-symbolic.svg" alt="Ubuntu view app" style={{ imageRendering: 'pixelated', width: '36px', height: '36px' }} />
                <div
                    className={
                        (title ? " visible " : " invisible ") +
                        " w-max py-0.5 px-1.5 absolute top-1.5 left-full ml-5 text-ubt-grey text-opacity-90 text-sm bg-ub-grey bg-opacity-70 border-gray-400 border border-opacity-40 rounded-md z-50"
                    }
                >
                    Show Applications
                </div>
            </div>
        </div>
    );
}