import React, { Component } from 'react';
import BackgroundImage from '../util components/background-image';
import SideBar from './side_bar';
import apps from '../../apps.config';
import Window from '../base/window';
import UbuntuApp from '../base/ubuntu_app';
import AllApplications from '../screen/all-applications'
import DesktopMenu from '../context menus/desktop-menu';
import DefaultMenu from '../context menus/default';
import $ from 'jquery';
import ReactGA from 'react-ga4';
import Draggable from 'react-draggable';

function StickyNote(props) {
    const [hovered, setHovered] = React.useState(false);
    return (
        <div 
            onClick={() => props.openApp("about-me")}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="sticky-note-card z-10 cursor-pointer duration-200 select-none flex flex-col"
            style={{
                transform: hovered ? 'rotate(-2deg) scale(1.05)' : 'rotate(-2deg)',
                backgroundColor: '#e7dfcb', /* Minecraft map color */
                border: '4px solid #574635', /* Dark wood border */
                boxShadow: '8px 8px 0px rgba(0, 0, 0, 0.4)',
                fontFamily: "monospace",
                padding: '16px',
                color: '#322518',
                imageRendering: 'pixelated',
                transition: 'transform 0.2s ease-in-out'
            }}
        >
            {/* Pinned top block */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 border-2 border-black rounded-sm" style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}></div>
            
            <h3 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '2px solid #574635', paddingBottom: '4px', textAlign: 'center', color: '#1a1108' }}>
                KARTHICK V
            </h3>
            <h4 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '12px', textAlign: 'center', color: '#322518' }}>
                AI & Backend Developer
            </h4>
            <ul className="list-none text-left" style={{ fontSize: '12px', lineHeight: '1.5', marginBottom: '12px', paddingLeft: '0', listStyleType: 'none' }}>
                <li style={{ marginBottom: '4px' }}>• Building AI Agents</li>
                <li style={{ marginBottom: '4px' }}>• Creating Automation Systems</li>
                <li style={{ marginBottom: '4px' }}>• Developing Scalable APIs</li>
                <li style={{ marginBottom: '4px' }}>• Turning Ideas Into Products</li>
            </ul>
            <div style={{ borderTop: '2px dashed #574635', paddingTop: '8px', fontSize: '11px' }}>
                <span style={{ fontWeight: 'bold', display: 'block', color: '#1a1108' }}>Current Mission:</span>
                Build useful AI tools that solve real-world problems.
            </div>
            <div style={{ fontSize: '7.5px', color: '#a02020', marginTop: '12px', textAlign: 'center', fontFamily: "'Press Start 2P', monospace", letterSpacing: '0.2px', whiteSpace: 'nowrap' }}>
                [ CLICK TO ENTER PORTFOLIO ]
            </div>
        </div>
    );
}

export class Desktop extends Component {
    constructor() {
        super();
        this.app_stack = [];
        this.initFavourite = {};
        this.allWindowClosed = false;
        this.state = {
            focused_windows: {},
            closed_windows: {},
            allAppsView: false,
            overlapped_windows: {},
            disabled_apps: {},
            favourite_apps: {},
            hideSideBar: false,
            minimized_windows: {},
            desktop_apps: [],
            context_menus: {
                desktop: false,
                default: false,
            },
            showNameBar: false,
        }
    }

    componentDidMount() {
        // google analytics
        ReactGA.send({ hitType: "pageview", page: "/desktop", title: "Custom Title" });

        this.fetchAppsData();
        this.setContextListeners();
        this.setEventListeners();
        this.checkForNewFolders();

        window.addEventListener("resize", this.handleMobileTerminalShortcut);
        this.handleMobileTerminalShortcut();

        // Droste Setup
        this.targetDepth = 1.0;
        this.currentDepth = 1.0;
        this.animatingDroste = false;

        const desktopContainer = document.querySelector(".window-parent");
        if (desktopContainer) {
            desktopContainer.addEventListener("wheel", this.handleDrosteWheel, { passive: false });
            desktopContainer.addEventListener("scroll", this.handleDrosteScroll, { passive: true });
        }
        this.startDrosteLoop();
    }

    componentWillUnmount() {
        this.removeContextListeners();
        window.removeEventListener("resize", this.handleMobileTerminalShortcut);

        const desktopContainer = document.querySelector(".window-parent");
        if (desktopContainer) {
            desktopContainer.removeEventListener("wheel", this.handleDrosteWheel);
            desktopContainer.removeEventListener("scroll", this.handleDrosteScroll);
        }
        this.stopDrosteLoop();
    }

    handleMobileTerminalShortcut = () => {
        if (typeof window !== "undefined") {
            if (window.innerWidth <= 768) {
                // Reset zoom depth and DOM elements to ensure the background is static on mobile
                this.targetDepth = 1.0;
                this.currentDepth = 1.0;
                const baseEl = document.getElementById("droste-layer-base");
                const nextEl = document.getElementById("droste-layer-next");
                if (baseEl && nextEl) {
                    baseEl.style.transform = 'scale(1) translateY(0vh)';
                    baseEl.style.opacity = '1.0';
                    nextEl.style.transform = 'scale(0.9)';
                    nextEl.style.opacity = '0.0';
                }

                if (!this.state.desktop_apps.includes("terminal")) {
                    const trashIndex = this.state.desktop_apps.indexOf("trash");
                    const updated = [...this.state.desktop_apps];
                    if (trashIndex !== -1) {
                        updated.splice(trashIndex + 1, 0, "terminal");
                    } else {
                        updated.push("terminal");
                    }
                    this.setState({ desktop_apps: updated });
                }
            } else {
                if (this.state.desktop_apps.includes("terminal")) {
                    this.setState(prevState => ({
                        desktop_apps: prevState.desktop_apps.filter(id => id !== "terminal")
                    }));
                }
            }
        }
    }

    handleDrosteWheel = (e) => {
        // Disable scroll zooming on mobile viewports (<= 768px)
        if (typeof window !== "undefined" && window.innerWidth <= 768) return;

        // Only trigger Droste zoom on background elements, preventing scrolling in open app iframes/terminals
        const isDesktopBackground = 
            e.target.dataset.context === "desktop-area" || 
            e.target.classList.contains("window-parent") || 
            e.target.classList.contains("bg-ubuntu-img") ||
            e.target.id === "monitor-screen";

        if (!isDesktopBackground) return;

        e.preventDefault();

        // Target depth bounds: 1.0 to 2.0 (only two levels: cabin and still building)
        // Slightly faster scroll sensitivity for responsive but cinematic feel
        const delta = e.deltaY * 0.0004;
        this.targetDepth += delta;
        if (this.targetDepth < 1.0) this.targetDepth = 1.0;
        if (this.targetDepth > 2.0) this.targetDepth = 2.0;
    }

    handleDrosteScroll = (e) => {
        // Disable scroll zooming on mobile viewports (<= 768px)
        if (typeof window !== "undefined" && window.innerWidth <= 768) return;

        const container = e.target;
        if (!container) return;
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        if (scrollHeight - clientHeight > 10) {
            const scrollPercent = scrollTop / (scrollHeight - clientHeight);
            // Maps mobile scroll percentage exactly to the 1.0 to 2.0 range
            this.targetDepth = 1.0 + scrollPercent * 1.0;
        }
    }

    startDrosteLoop = () => {
        this.animatingDroste = true;
        const update = () => {
            if (!this.animatingDroste) return;
            const diff = this.targetDepth - this.currentDepth;
            if (Math.abs(diff) > 0.0001) {
                // Responsive interpolation coefficient (0.035) for swift but smooth transitions
                this.currentDepth += diff * 0.035;

                const f = this.currentDepth - 1.0;

                // Direct DOM updates for 60fps buttery smooth performance without React re-render lag
                const baseEl = document.getElementById("droste-layer-base");
                const nextEl = document.getElementById("droste-layer-next");
                if (baseEl && nextEl) {
                    baseEl.style.transformOrigin = '50% 65%'; // Anchor zoom origin vertically to the doorway opening center
                    
                    if (f <= 0.6) {
                        // Phase 1: Zoom exponentially into the cabin doorway and center it vertically
                        const scaleBase = Math.pow(9, f / 0.6);
                        const translateY = -15 * (f / 0.6); // smooth pan up from 65% to 50% viewport center
                        baseEl.style.transform = `translateY(${translateY}vh) scale(${scaleBase})`;
                        baseEl.style.opacity = '1.0';
                        
                        nextEl.style.transform = 'scale(0.9)';
                        nextEl.style.opacity = '0.0';
                    } else if (f > 0.6 && f <= 0.7) {
                        // Phase 2: Fade cabin to black, hold darkness briefly
                        const scaleBase = 9.0;
                        const translateY = -15;
                        const opacityBase = Math.max(0, 1.0 - (f - 0.6) / 0.05);
                        baseEl.style.transform = `translateY(${translateY}vh) scale(${scaleBase})`;
                        baseEl.style.opacity = opacityBase.toString();
                        
                        nextEl.style.transform = 'scale(0.9)';
                        nextEl.style.opacity = '0.0';
                    } else {
                        // Phase 3: Fade in and reveal the "Still Building..." scene
                        baseEl.style.opacity = '0.0';
                        
                        const t = (f - 0.7) / 0.3;
                        const opacityNext = t;
                        const scaleNext = 0.9 + 0.1 * t;
                        nextEl.style.transform = `scale(${scaleNext})`;
                        nextEl.style.opacity = opacityNext.toString();
                    }
                }
            }
            this.drosteLoopId = requestAnimationFrame(update);
        };
        this.drosteLoopId = requestAnimationFrame(update);
    }

    stopDrosteLoop = () => {
        this.animatingDroste = false;
        if (this.drosteLoopId) {
            cancelAnimationFrame(this.drosteLoopId);
        }
    }

    checkForNewFolders = () => {
        var new_folders = localStorage.getItem('new_folders');
        if (new_folders === null && new_folders !== undefined) {
            localStorage.setItem("new_folders", JSON.stringify([]));
        }
        else {
            new_folders = JSON.parse(new_folders);
            new_folders.forEach(folder => {
                apps.push({
                    id: `new-folder-${folder.id}`,
                    title: folder.name,
                    icon: './themes/Yaru/system/folder.png',
                    disabled: true,
                    favourite: false,
                    desktop_shortcut: true,
                    screen: () => { },
                });
            });
            this.updateAppsData();
        }
    }

    setEventListeners = () => {
        const openSettings = document.getElementById("open-settings");
        if (openSettings) {
            openSettings.addEventListener("click", () => {
                this.openApp("settings");
            });
        }
    }

    setContextListeners = () => {
        document.addEventListener('contextmenu', this.checkContextMenu);
        // on click, anywhere, hide all menus
        document.addEventListener('click', this.hideAllContextMenu);
    }

    removeContextListeners = () => {
        document.removeEventListener("contextmenu", this.checkContextMenu);
        document.removeEventListener("click", this.hideAllContextMenu);
    }

    checkContextMenu = (e) => {
        e.preventDefault();
        this.hideAllContextMenu();
        switch (e.target.dataset.context) {
            case "desktop-area":
                ReactGA.event({
                    category: `Context Menu`,
                    action: `Opened Desktop Context Menu`
                });
                this.showContextMenu(e, "desktop");
                break;
            default:
                ReactGA.event({
                    category: `Context Menu`,
                    action: `Opened Default Context Menu`
                });
                this.showContextMenu(e, "default");
        }
    }

    showContextMenu = (e, menuName /* context menu name */) => {
        let { posx, posy } = this.getMenuPosition(e);
        let contextMenu = document.getElementById(`${menuName}-menu`);

        if (posx + $(contextMenu).width() > window.innerWidth) posx -= $(contextMenu).width();
        if (posy + $(contextMenu).height() > window.innerHeight) posy -= $(contextMenu).height();

        posx = posx.toString() + "px";
        posy = posy.toString() + "px";

        contextMenu.style.left = posx;
        contextMenu.style.top = posy;

        this.setState({ context_menus: { ...this.state.context_menus, [menuName]: true } });
    }

    hideAllContextMenu = () => {
        let menus = this.state.context_menus;
        Object.keys(menus).forEach(key => {
            menus[key] = false;
        });
        this.setState({ context_menus: menus });
    }

    getMenuPosition = (e) => {
        var posx = 0;
        var posy = 0;

        if (!e) e = window.event;

        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
        }
        return {
            posx, posy
        }
    }

    fetchAppsData = () => {
        let focused_windows = {}, closed_windows = {}, disabled_apps = {}, favourite_apps = {}, overlapped_windows = {}, minimized_windows = {};
        let desktop_apps = [];
        apps.forEach((app) => {
            focused_windows = {
                ...focused_windows,
                [app.id]: false,
            };
            closed_windows = {
                ...closed_windows,
                [app.id]: true,
            };
            disabled_apps = {
                ...disabled_apps,
                [app.id]: app.disabled,
            };
            favourite_apps = {
                ...favourite_apps,
                [app.id]: app.favourite,
            };
            overlapped_windows = {
                ...overlapped_windows,
                [app.id]: false,
            };
            minimized_windows = {
                ...minimized_windows,
                [app.id]: false,
            }
            if (app.desktop_shortcut) desktop_apps.push(app.id);
        });
        this.setState({
            focused_windows,
            closed_windows,
            disabled_apps,
            favourite_apps,
            overlapped_windows,
            minimized_windows,
            desktop_apps
        });
        this.initFavourite = { ...favourite_apps };
    }

    updateAppsData = () => {
        let focused_windows = {}, closed_windows = {}, favourite_apps = {}, minimized_windows = {}, disabled_apps = {};
        let desktop_apps = [];
        apps.forEach((app) => {
            focused_windows = {
                ...focused_windows,
                [app.id]: ((this.state.focused_windows[app.id] !== undefined || this.state.focused_windows[app.id] !== null) ? this.state.focused_windows[app.id] : false),
            };
            minimized_windows = {
                ...minimized_windows,
                [app.id]: ((this.state.minimized_windows[app.id] !== undefined || this.state.minimized_windows[app.id] !== null) ? this.state.minimized_windows[app.id] : false)
            };
            disabled_apps = {
                ...disabled_apps,
                [app.id]: app.disabled
            };
            closed_windows = {
                ...closed_windows,
                [app.id]: ((this.state.closed_windows[app.id] !== undefined || this.state.closed_windows[app.id] !== null) ? this.state.closed_windows[app.id] : true)
            };
            favourite_apps = {
                ...favourite_apps,
                [app.id]: app.favourite
            }
            if (app.desktop_shortcut) desktop_apps.push(app.id);
        });
        this.setState({
            focused_windows,
            closed_windows,
            disabled_apps,
            minimized_windows,
            favourite_apps,
            desktop_apps
        });
        this.initFavourite = { ...favourite_apps };
    }

    renderDesktopApps = () => {
        if (Object.keys(this.state.closed_windows).length === 0) return;
        let appsJsx = [];
        this.state.desktop_apps.forEach((appId, index) => {
            const app = apps.find(a => a.id === appId);
            if (!app) return;

            const props = {
                name: app.title,
                id: app.id,
                icon: app.icon,
                openApp: this.openApp,
                isExternalApp: app.isExternalApp,
                url: app.url
            }

            let style = { position: 'absolute' };
            appsJsx.push(
                <Draggable key={index} bounds="parent">
                    <div style={style} className={"pointer-events-auto app-shortcut-" + app.id}>
                        <UbuntuApp {...props} />
                    </div>
                </Draggable>
            );
        });
        return appsJsx;
    }

    renderWindows = () => {
        let windowsJsx = [];
        apps.forEach((app, index) => {
            if (this.state.closed_windows[app.id] === false) {

                const props = {
                    title: app.title,
                    id: app.id,
                    screen: app.screen,
                    addFolder: this.addToDesktop,
                    closed: this.closeApp,
                    openApp: this.openApp,
                    focus: this.focus,
                    isFocused: this.state.focused_windows[app.id],
                    hideSideBar: this.hideSideBar,
                    hasMinimised: this.hasMinimised,
                    minimized: this.state.minimized_windows[app.id],
                    changeBackgroundImage: this.props.changeBackgroundImage,
                    bg_image_name: this.props.bg_image_name,
                    startMaximized: app.id === "firefox" ? this.state.firefoxStartMaximized : false,
                    firefoxUrl: app.id === "firefox" ? this.state.firefoxUrl : null,
                    firefoxDisplayUrl: app.id === "firefox" ? this.state.firefoxDisplayUrl : null,
                }

                windowsJsx.push(
                    <Window key={index} {...props} />
                )
            }
        });
        return windowsJsx;
    }

    hideSideBar = (objId, hide) => {
        if (hide === this.state.hideSideBar) return;

        if (objId === null) {
            if (hide === false) {
                this.setState({ hideSideBar: false });
            }
            else {
                for (const key in this.state.overlapped_windows) {
                    if (this.state.overlapped_windows[key]) {
                        this.setState({ hideSideBar: true });
                        return;
                    }  // if any window is overlapped then hide the SideBar
                }
            }
            return;
        }

        if (hide === false) {
            for (const key in this.state.overlapped_windows) {
                if (this.state.overlapped_windows[key] && key !== objId) return; // if any window is overlapped then don't show the SideBar
            }
        }

        let overlapped_windows = this.state.overlapped_windows;
        overlapped_windows[objId] = hide;
        this.setState({ hideSideBar: hide, overlapped_windows });
    }

    hasMinimised = (objId) => {
        let minimized_windows = this.state.minimized_windows;
        var focused_windows = this.state.focused_windows;

        // remove focus and minimise this window
        minimized_windows[objId] = true;
        focused_windows[objId] = false;
        this.setState({ minimized_windows, focused_windows });

        this.hideSideBar(null, false);

        this.giveFocusToLastApp();
    }

    giveFocusToLastApp = () => {
        // if there is atleast one app opened, give it focus
        if (!this.checkAllMinimised()) {
            for (const index in this.app_stack) {
                if (!this.state.minimized_windows[this.app_stack[index]]) {
                    this.focus(this.app_stack[index]);
                    break;
                }
            }
        }
    }

    checkAllMinimised = () => {
        let result = true;
        for (const key in this.state.minimized_windows) {
            if (!this.state.closed_windows[key]) { // if app is opened
                result = result & this.state.minimized_windows[key];
            }
        }
        return result;
    }

    openApp = (objId) => {

        // google analytics
        ReactGA.event({
            category: `Open App`,
            action: `Opened ${objId} window`
        });

        if (objId === "about-me") {
            this.setState({ 
                firefoxUrl: "./about-me/index.html",
                firefoxDisplayUrl: "http://localhost:3000/about-me",
                firefoxStartMaximized: true 
            }, () => {
                this.openApp("firefox");
            });
            return;
        }

        if (objId === "firefox") {
            if (this.state.firefoxUrl === undefined || this.state.firefoxUrl === null) {
                this.setState({
                    firefoxUrl: null,
                    firefoxDisplayUrl: null,
                    firefoxStartMaximized: false
                });
            }
        }

        // if the app is disabled
        if (this.state.disabled_apps[objId]) return;

        if (this.state.minimized_windows[objId]) {
            // focus this app's window
            this.focus(objId);

            // set window's last position
            var r = document.querySelector("#" + objId);
            r.style.transform = `translate(${r.style.getPropertyValue("--window-transform-x")},${r.style.getPropertyValue("--window-transform-y")}) scale(1)`;

            // tell childs that his app has been not minimised
            let minimized_windows = this.state.minimized_windows;
            minimized_windows[objId] = false;
            this.setState({ minimized_windows: minimized_windows });
            return;
        }

        //if app is already opened
        if (this.app_stack.includes(objId)) this.focus(objId);
        else {
            let closed_windows = this.state.closed_windows;
            let favourite_apps = this.state.favourite_apps;
            var frequentApps = localStorage.getItem('frequentApps') ? JSON.parse(localStorage.getItem('frequentApps')) : [];
            var currentApp = frequentApps.find(app => app.id === objId);
            if (currentApp) {
                frequentApps.forEach((app) => {
                    if (app.id === currentApp.id) {
                        app.frequency += 1; // increase the frequency if app is found 
                    }
                });
            } else {
                frequentApps.push({ id: objId, frequency: 1 }); // new app opened
            }

            frequentApps.sort((a, b) => {
                if (a.frequency < b.frequency) {
                    return 1;
                }
                if (a.frequency > b.frequency) {
                    return -1;
                }
                return 0; // sort according to decreasing frequencies
            });

            localStorage.setItem("frequentApps", JSON.stringify(frequentApps));

            setTimeout(() => {
                favourite_apps[objId] = true; // adds opened app to sideBar
                closed_windows[objId] = false; // openes app's window
                this.setState({ closed_windows, favourite_apps, allAppsView: false }, this.focus(objId));
                this.app_stack.push(objId);
            }, 200);
        }
    }

    closeApp = (objId) => {

        // remove app from the app stack
        this.app_stack.splice(this.app_stack.indexOf(objId), 1);

        this.giveFocusToLastApp();

        this.hideSideBar(null, false);

        if (objId === "firefox") {
            this.setState({
                firefoxUrl: null,
                firefoxDisplayUrl: null,
                firefoxStartMaximized: false
            });
        }

        // close window
        let closed_windows = this.state.closed_windows;
        let favourite_apps = this.state.favourite_apps;

        if (this.initFavourite[objId] === false) favourite_apps[objId] = false; // if user default app is not favourite, remove from sidebar
        closed_windows[objId] = true; // closes the app's window

        this.setState({ closed_windows, favourite_apps });
    }

    focus = (objId) => {
        // removes focus from all window and 
        // gives focus to window with 'id = objId'
        var focused_windows = this.state.focused_windows;
        focused_windows[objId] = true;
        for (let key in focused_windows) {
            if (focused_windows.hasOwnProperty(key)) {
                if (key !== objId) {
                    focused_windows[key] = false;
                }
            }
        }
        this.setState({ focused_windows });
    }

    addNewFolder = () => {
        this.setState({ showNameBar: true });
    }

    addToDesktop = (folder_name) => {
        folder_name = folder_name.trim();
        let folder_id = folder_name.replace(/\s+/g, '-').toLowerCase();
        apps.push({
            id: `new-folder-${folder_id}`,
            title: folder_name,
            icon: './themes/Yaru/system/folder.png',
            disabled: true,
            favourite: false,
            desktop_shortcut: true,
            screen: () => { },
        });
        // store in local storage
        var new_folders = JSON.parse(localStorage.getItem('new_folders'));
        new_folders.push({ id: `new-folder-${folder_id}`, name: folder_name });
        localStorage.setItem("new_folders", JSON.stringify(new_folders));

        this.setState({ showNameBar: false }, this.updateAppsData);
    }

    showAllApps = () => { this.setState({ allAppsView: !this.state.allAppsView }) }

    renderNameBar = () => {
        let addFolder = () => {
            let folder_name = document.getElementById("folder-name-input").value;
            this.addToDesktop(folder_name);
        }

        let removeCard = () => {
            this.setState({ showNameBar: false });
        }

        return (
            <div className="absolute rounded-md top-1/2 left-1/2 text-center text-white font-light text-sm bg-ub-cool-grey transform -translate-y-1/2 -translate-x-1/2 sm:w-96 w-3/4 z-50">
                <div className="w-full flex flex-col justify-around items-start pl-6 pb-8 pt-6">
                    <span>New folder name</span>
                    <input className="outline-none mt-5 px-1 w-10/12  context-menu-bg border-2 border-yellow-700 rounded py-0.5" id="folder-name-input" type="text" autoComplete="off" spellCheck="false" autoFocus={true} />
                </div>
                <div className="flex">
                    <div onClick={addFolder} className="w-1/2 px-4 py-2 border border-gray-900 border-opacity-50 border-r-0 hover:bg-ub-warm-grey hover:bg-opacity-10 hover:border-opacity-50">Create</div>
                    <div onClick={removeCard} className="w-1/2 px-4 py-2 border border-gray-900 border-opacity-50 hover:bg-ub-warm-grey hover:bg-opacity-10 hover:border-opacity-50">Cancel</div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className={" h-full w-full flex flex-col items-end justify-start content-start flex-wrap-reverse pt-2 bg-transparent relative overflow-hidden overscroll-none window-parent"}>

                {/* Window Area */}
                <div className="window-area-container absolute h-full w-full bg-transparent" data-context="desktop-area">
                    {this.renderWindows()}
                </div>

                {/* Background Image */}
                <BackgroundImage img={this.props.bg_image_name} />

                {/* Pinned Sticky Note */}
                <StickyNote openApp={this.openApp} />

                {/* Ubuntu Side Menu Bar */}
                <SideBar apps={apps}
                    hide={this.state.hideSideBar}
                    hideSideBar={this.hideSideBar}
                    favourite_apps={this.state.favourite_apps}
                    showAllApps={this.showAllApps}
                    allAppsView={this.state.allAppsView}
                    closed_windows={this.state.closed_windows}
                    focused_windows={this.state.focused_windows}
                    isMinimized={this.state.minimized_windows}
                    openAppByAppId={this.openApp} />

                {/* Desktop Apps */}
                {this.renderDesktopApps()}

                {/* Context Menus */}
                <DesktopMenu active={this.state.context_menus.desktop} openApp={this.openApp} addNewFolder={this.addNewFolder} />
                <DefaultMenu active={this.state.context_menus.default} />

                {/* Folder Input Name Bar */}
                {
                    (this.state.showNameBar
                        ? this.renderNameBar()
                        : null
                    )
                }

                { this.state.allAppsView ?
                    <AllApplications apps={apps}
                        recentApps={this.app_stack}
                        openApp={this.openApp} /> : null}

            </div>
        )
    }
}

export default Desktop