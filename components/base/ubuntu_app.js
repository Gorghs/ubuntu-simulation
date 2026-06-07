import React, { Component } from 'react'

export class UbuntuApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
            focused: false
        };
    }

    openApp = () => {
        if (this.props.isExternalApp && this.props.url) {
            window.open(this.props.url, "_blank");
        } else {
            this.props.openApp(this.props.id);
        }
    }

    render() {
        const mcSlotStyle = {
            backgroundColor: 'transparent',
            border: '4px solid transparent',
            boxShadow: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontFamily: "'Press Start 2P', monospace",
            color: '#ffffff', /* Pure white text color */
            textShadow: '2px 2px 0px #000000', /* Solid black shadow for legibility */
            transition: 'all 0.1s ease-in-out',
            imageRendering: 'pixelated',
            outline: 'none',
            transform: 'scale(1)',
        };

        const mcHoverStyle = {
            transform: 'scale(1.12)',
        };

        const mcFocusStyle = {
            // No box or border on focus
        };

        let currentStyle = { ...mcSlotStyle };
        if (this.state.hovered) {
            currentStyle = { ...currentStyle, ...mcHoverStyle };
        }
        if (this.state.focused) {
            currentStyle = { ...currentStyle, ...mcFocusStyle };
        }

        const isAboutMe = this.props.id === "about-me";

        return (
            <>
                {isAboutMe && (
                    <style dangerouslySetInnerHTML={{ __html: `
                        @keyframes soulGlow {
                            0%, 14%, 16%, 19%, 21%, 74%, 76%, 79%, 81%, 100% {
                                filter: drop-shadow(0 0 6px #00f3ff) drop-shadow(0 0 12px #00f3ff) drop-shadow(0 0 24px #00a2ff) drop-shadow(0 0 40px #00a2ff);
                            }
                            15%, 20%, 75%, 80% {
                                filter: drop-shadow(0px 0px 0px transparent);
                            }
                        }
                        .about-me-glow {
                            animation: soulGlow 5s infinite;
                        }
                    ` }} />
                )}
                <div
                    style={currentStyle}
                    id={"app-" + this.props.id}
                    onDoubleClick={this.openApp}
                    onMouseEnter={() => this.setState({ hovered: true })}
                    onMouseLeave={() => this.setState({ hovered: false })}
                    onFocus={() => this.setState({ focused: true })}
                    onBlur={() => this.setState({ focused: false })}
                    tabIndex={0}
                    className="desktop-shortcut-container z-10 select-none relative"
                >
                    <div className={"relative mb-2 " + (isAboutMe ? "about-me-glow" : "")}>
                        <img className="desktop-shortcut-icon" src={this.props.icon} alt={"Ubuntu " + this.props.name} style={{ imageRendering: 'pixelated' }} />
                        {this.props.isExternalApp && (
                            <img 
                                src="./themes/Yaru/status/arrow-up-right.svg" 
                                alt="External Link" 
                                className="w-3.5 h-3.5 absolute -bottom-0.5 -right-0.5 bg-black border border-white p-0.5"
                            />
                        )}
                    </div>
                    <div className="text-center" style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {this.props.name}
                    </div>
                </div>
            </>
        )
    }
}

export default UbuntuApp
