import React, { Component } from "react";

export class SideBarApp extends Component {
    constructor() {
        super();
        this.state = {
            showTitle: false,
            scaleImage: false,
            hovered: false,
            focused: false
        };
    }

    scaleImage = () => {
        setTimeout(() => {
            this.setState({ scaleImage: false });
        }, 1000);
        this.setState({ scaleImage: true });
    }

    openApp = () => {
        if (!this.props.isMinimized[this.props.id] && this.props.isClose[this.props.id]) {
            this.scaleImage();
        }
        this.props.openApp(this.props.id);
        this.setState({ showTitle: false });
    };

    render() {
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
            imageRendering: 'pixelated',
            position: 'relative',
            outline: 'none',
            transform: 'scale(1)',
        };

        const hoverStyle = {
            transform: 'scale(1.12)',
        };

        const focusStyle = {
            // No box or border on focus
        };

        const activeAppFocusStyle = {
            // No box or border on active focus
        };

        let currentStyle = { ...slotStyle };
        if (this.state.hovered) {
            currentStyle = { ...currentStyle, ...hoverStyle };
        }
        if (this.state.focused) {
            currentStyle = { ...currentStyle, ...focusStyle };
        }
        if (this.props.isClose[this.props.id] === false && this.props.isFocus[this.props.id]) {
            currentStyle = { ...currentStyle, ...activeAppFocusStyle };
        }

        return (
            <div
                tabIndex="0"
                onClick={this.openApp}
                onMouseEnter={() => {
                    this.setState({ showTitle: true, hovered: true });
                }}
                onMouseLeave={() => {
                    this.setState({ showTitle: false, hovered: false });
                }}
                onFocus={() => this.setState({ focused: true })}
                onBlur={() => this.setState({ focused: false })}
                style={currentStyle}
                id={"sidebar-" + this.props.id}
            >
                <img className="z-10" src={this.props.icon} alt="Ubuntu App Icon" style={{ imageRendering: 'pixelated', width: '48px', height: '48px' }} />
                <img className={(this.state.scaleImage ? " scale " : "") + " scalable-app-icon absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"} src={this.props.icon} alt="" style={{ imageRendering: 'pixelated', width: '48px', height: '48px' }} />
                <div
                    className={
                        (this.state.showTitle ? " visible " : " invisible ") +
                        " w-max py-0.5 px-1.5 absolute top-1.5 left-full ml-5 text-ubt-grey text-opacity-90 text-sm bg-ub-grey bg-opacity-70 border-gray-400 border border-opacity-40 rounded-md z-50"
                    }
                >
                    {this.props.title}
                </div>
            </div>
        );
    }
}

export default SideBarApp;
